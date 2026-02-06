import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "npm:zod@3.23.8";

const DEFAULT_ALLOWED_ORIGINS = ["https://armtemiy.ru"];
const RATE_LIMIT_WINDOW_SECONDS = 60;
const RATE_LIMIT_MAX_REQUESTS = 3;

const ContactSchema = z.object({
  name: z.string().trim().min(2).max(50),
  phone: z
    .string()
    .trim()
    .transform((value) => value.replace(/[\s\-()]/g, ""))
    .refine((value) => /^\+?[0-9]{10,15}$/.test(value), "Invalid phone format"),
  message: z.string().trim().min(2).max(500),
  pageUrl: z.string().url().optional(),
  referrer: z.string().url().optional(),
  userAgent: z.string().max(500).optional(),
  utmSource: z.string().max(120).optional(),
  utmMedium: z.string().max(120).optional(),
  utmCampaign: z.string().max(120).optional(),
  utmContent: z.string().max(120).optional(),
  utmTerm: z.string().max(120).optional(),
});

type ContactRequest = z.infer<typeof ContactSchema>;

type ApiErrorCode =
  | "method_not_allowed"
  | "forbidden_origin"
  | "validation_error"
  | "rate_limited"
  | "internal_error";

function getRequestId(req: Request): string {
  return req.headers.get("x-request-id") || req.headers.get("sb-request-id") || crypto.randomUUID();
}

function getAllowedOrigins(): string[] {
  const raw = Deno.env.get("CORS_ALLOWED_ORIGINS");
  if (!raw) return DEFAULT_ALLOWED_ORIGINS;
  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return false;
  const allowed = getAllowedOrigins();
  return allowed.includes(origin);
}

function buildCorsHeaders(origin: string | null): Record<string, string> {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-request-id",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin",
  };

  if (isOriginAllowed(origin)) {
    headers["Access-Control-Allow-Origin"] = origin!;
  }

  return headers;
}

function jsonResponse(body: Record<string, unknown>, status: number, origin: string | null): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...buildCorsHeaders(origin),
    },
  });
}

function apiError(
  params: {
    code: ApiErrorCode;
    message: string;
    requestId: string;
    errors?: Array<{ field: string; message: string }>;
    retryAfter?: number;
  },
  status: number,
  origin: string | null
): Response {
  return jsonResponse(
    {
      ok: false,
      code: params.code,
      message: params.message,
      errors: params.errors,
      retryAfter: params.retryAfter,
      requestId: params.requestId,
    },
    status,
    origin
  );
}

function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for") || "";
  const cfConnectingIp = req.headers.get("cf-connecting-ip") || "";
  const realIp = req.headers.get("x-real-ip") || "";
  return forwarded.split(",")[0].trim() || cfConnectingIp || realIp || "unknown";
}

async function sha256(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function checkRateLimit(params: {
  supabaseUrl: string;
  supabaseServiceKey: string;
  key: string;
  windowSeconds: number;
  maxRequests: number;
}): Promise<{ allowed: boolean; retryAfter: number }> {
  const response = await fetch(`${params.supabaseUrl}/rest/v1/rpc/check_rate_limit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: params.supabaseServiceKey,
      Authorization: `Bearer ${params.supabaseServiceKey}`,
    },
    body: JSON.stringify({
      p_key: params.key,
      p_window_seconds: params.windowSeconds,
      p_max_requests: params.maxRequests,
    }),
  });

  if (!response.ok) {
    throw new Error(`rate_limit_rpc_failed_${response.status}`);
  }

  const data = await response.json();

  return {
    allowed: Boolean(data?.allowed),
    retryAfter: Number(data?.retry_after ?? params.windowSeconds),
  };
}

function escapeMarkdown(text: string): string {
  if (!text) return "";
  return text.replace(/\\/g, "\\\\").replace(/([_*[\]()~`>#+=|{}.!-])/g, "\\$1");
}

async function insertLead(params: {
  supabaseUrl: string;
  supabaseServiceKey: string;
  payload: {
    name: string;
    phone: string;
    message: string;
    page_url?: string;
    referrer?: string;
    user_agent?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
    ip_hash?: string;
    request_id?: string;
    source?: string;
  };
}): Promise<void> {
  const response = await fetch(`${params.supabaseUrl}/rest/v1/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: params.supabaseServiceKey,
      Authorization: `Bearer ${params.supabaseServiceKey}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(params.payload),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error(
      JSON.stringify({
        level: "error",
        msg: "insert_lead_failed",
        status: response.status,
        details: text.slice(0, 300),
      })
    );
  }
}

serve(async (req: Request): Promise<Response> => {
  const requestId = getRequestId(req);
  const origin = req.headers.get("origin");

  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: buildCorsHeaders(origin),
    });
  }

  if (req.method !== "POST") {
    return apiError(
      {
        code: "method_not_allowed",
        message: "Method not allowed",
        requestId,
      },
      405,
      origin
    );
  }

  if (!isOriginAllowed(origin)) {
    return apiError(
      {
        code: "forbidden_origin",
        message: "Origin is not allowed",
        requestId,
      },
      403,
      origin
    );
  }

  try {
    const rawPayload = await req.json();
    const parsed = ContactSchema.safeParse(rawPayload);

    if (!parsed.success) {
      return apiError(
        {
          code: "validation_error",
          message: "Invalid request payload",
          errors: parsed.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
          requestId,
        },
        400,
        origin
      );
    }

    const payload: ContactRequest = parsed.data;
    const ip = getClientIp(req);
    const userAgent = payload.userAgent || req.headers.get("user-agent") || "unknown";

    const supabaseUrl = Deno.env.get("SB_URL");
    const supabaseServiceKey = Deno.env.get("SB_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("supabase_not_configured");
    }

    const rateLimitKey = await sha256(`${ip}|${userAgent}`);
    const rateLimitResult = await checkRateLimit({
      supabaseUrl,
      supabaseServiceKey,
      key: rateLimitKey,
      windowSeconds: RATE_LIMIT_WINDOW_SECONDS,
      maxRequests: RATE_LIMIT_MAX_REQUESTS,
    });

    if (!rateLimitResult.allowed) {
      return apiError(
        {
          code: "rate_limited",
          message: "Too many requests. Try again later.",
          retryAfter: rateLimitResult.retryAfter,
          requestId,
        },
        429,
        origin
      );
    }

    const botToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
    const chatId = Deno.env.get("TELEGRAM_CHAT_ID");

    if (!botToken || !chatId) {
      throw new Error("telegram_not_configured");
    }

    await insertLead({
      supabaseUrl,
      supabaseServiceKey,
      payload: {
        name: payload.name,
        phone: payload.phone,
        message: payload.message,
        page_url: payload.pageUrl,
        referrer: payload.referrer,
        user_agent: userAgent,
        utm_source: payload.utmSource,
        utm_medium: payload.utmMedium,
        utm_campaign: payload.utmCampaign,
        utm_content: payload.utmContent,
        utm_term: payload.utmTerm,
        ip_hash: await sha256(ip),
        request_id: requestId,
        source: "terminal",
      },
    });

    const telegramMessage = `
🔔 *Новая заявка с сайта*

👤 *Имя:* ${escapeMarkdown(payload.name)}
📞 *Телефон:* ${escapeMarkdown(payload.phone)}
💬 *Сообщение:* ${escapeMarkdown(payload.message)}

📅 _${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}_
    `.trim();

    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: "Markdown",
      }),
    });

    const telegramResult = await telegramResponse.json();

    if (!telegramResult?.ok) {
      throw new Error("telegram_send_failed");
    }

    return jsonResponse(
      {
        ok: true,
        code: "ok",
        message: "Message sent successfully",
        requestId,
      },
      200,
      origin
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "unknown_error";
    console.error(JSON.stringify({ level: "error", msg: "send_telegram_failed", requestId, error: message }));

    return apiError(
      {
        code: "internal_error",
        message: "Internal server error",
        requestId,
      },
      500,
      origin
    );
  }
});
