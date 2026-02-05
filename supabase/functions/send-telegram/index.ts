import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_SUBMISSIONS_PER_IP = 3;
const rateLimit = new Map<string, { count: number; resetAt: number }>();

interface ContactRequest {
  name: string;
  phone: string;
  message: string;
  pageUrl?: string;
  referrer?: string;
  userAgent?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
}

const handler = async (req: Request): Promise<Response> => {
  const requestId = getRequestId(req);
  console.log(JSON.stringify({ level: "info", msg: "send-telegram invoked", requestId }));

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ip = getClientIp(req);

    if (!isAllowed(ip)) {
      console.log(JSON.stringify({ level: "warn", msg: "rate limit", requestId, ip }));
      return new Response(
        JSON.stringify({ success: false, error: "Too many requests" }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const {
      name,
      phone,
      message,
      pageUrl,
      referrer,
      userAgent,
      utmSource,
      utmMedium,
      utmCampaign,
      utmContent,
      utmTerm,
    }: ContactRequest = await req.json();
    console.log(JSON.stringify({ level: "info", msg: "payload received", requestId, ip }));

    if (!isValidPayload(name, phone, message)) {
      console.log(JSON.stringify({ level: "warn", msg: "invalid payload", requestId }));
      return new Response(
        JSON.stringify({ success: false, error: "Invalid payload" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const botToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
    const chatId = Deno.env.get("TELEGRAM_CHAT_ID");

    if (!botToken || !chatId) {
      console.error("Missing Telegram credentials");
      throw new Error("Telegram credentials not configured");
    }

    const supabaseUrl = Deno.env.get("SB_URL");
    const supabaseAnonKey = Deno.env.get("SB_ANON_KEY");

    if (supabaseUrl && supabaseAnonKey) {
      await insertLead({
        supabaseUrl,
        supabaseAnonKey,
        payload: {
          name,
          phone,
          message,
          pageUrl,
          referrer,
          userAgent: userAgent || req.headers.get("user-agent") || undefined,
          utmSource,
          utmMedium,
          utmCampaign,
          utmContent,
          utmTerm,
          ip,
          requestId,
        },
      });
    }

    // Format message for Telegram
    const telegramMessage = `
🔔 *Новая заявка с сайта*

👤 *Имя:* ${escapeMarkdown(name)}
📞 *Телефон:* ${escapeMarkdown(phone)}
💬 *Сообщение:* ${escapeMarkdown(message)}

📅 _${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}_
    `.trim();

    console.log(JSON.stringify({ level: "info", msg: "telegram send", requestId }));

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramMessage,
          parse_mode: "Markdown",
        }),
      }
    );

    const telegramResult = await telegramResponse.json();
    console.log(JSON.stringify({ level: "info", msg: "telegram response", requestId, ok: telegramResult?.ok }));

    if (!telegramResult.ok) {
      throw new Error(`Telegram API error: ${telegramResult.description}`);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Message sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error(JSON.stringify({ level: "error", msg: "send-telegram failed", requestId, error: errorMessage }));
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

// Escape special Markdown characters to prevent injection attacks
function escapeMarkdown(text: string): string {
  if (!text) return '';
  // Escape backslash first, then all other special Markdown characters
  return text
    .replace(/\\/g, '\\\\')
    .replace(/([_*[\]()~`>#+=|{}.!\-])/g, '\\$1');
}

function getRequestId(req: Request): string {
  const fromHeader = req.headers.get("x-request-id") || req.headers.get("sb-request-id");
  if (fromHeader) return fromHeader;
  return crypto.randomUUID();
}

function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for") || "";
  const cfConnectingIp = req.headers.get("cf-connecting-ip") || "";
  const realIp = req.headers.get("x-real-ip") || "";
  const ip = forwarded.split(",")[0].trim() || cfConnectingIp || realIp || "unknown";
  return ip;
}

function isAllowed(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || entry.resetAt <= now) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_SUBMISSIONS_PER_IP) {
    return false;
  }

  entry.count += 1;
  rateLimit.set(ip, entry);
  return true;
}

function isValidPayload(name: string, phone: string, message: string): boolean {
  if (!name || !phone || !message) return false;
  if (name.length < 2 || name.length > 50) return false;
  if (message.length < 2 || message.length > 500) return false;
  const cleanedPhone = phone.replace(/[\s\-()]/g, "");
  if (!/^\+?[0-9]{10,15}$/.test(cleanedPhone)) return false;
  return true;
}

async function insertLead({
  supabaseUrl,
  supabaseAnonKey,
  payload,
}: {
  supabaseUrl: string;
  supabaseAnonKey: string;
  payload: {
    name: string;
    phone: string;
    message: string;
    pageUrl?: string;
    referrer?: string;
    userAgent?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmContent?: string;
    utmTerm?: string;
    ip?: string;
    requestId?: string;
  };
}): Promise<void> {
  const response = await fetch(`${supabaseUrl}/rest/v1/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      name: payload.name,
      phone: payload.phone,
      message: payload.message,
      page_url: payload.pageUrl,
      referrer: payload.referrer,
      user_agent: payload.userAgent,
      utm_source: payload.utmSource,
      utm_medium: payload.utmMedium,
      utm_campaign: payload.utmCampaign,
      utm_content: payload.utmContent,
      utm_term: payload.utmTerm,
      ip: payload.ip,
      request_id: payload.requestId,
      source: "terminal",
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("Failed to insert lead:", text);
  }
}

serve(handler);
