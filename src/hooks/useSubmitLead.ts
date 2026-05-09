import { useCallback, useState } from "react";

export interface SubmitLeadPayload {
  name: string;
  phone: string;
  message: string;
  pageUrl: string;
  referrer?: string;
  userAgent: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
}

export type SubmitLeadResult =
  | { success: true }
  | { success: false; error: string; status?: number };

interface RequestError extends Error {
  status?: number;
}

interface SubmitLeadResponse {
  success?: boolean;
  ok?: boolean;
  error?: string;
  message?: string;
}

function parseResponse(rawResponse: string): SubmitLeadResponse | null {
  if (!rawResponse) return null;

  try {
    const result: unknown = JSON.parse(rawResponse);
    return typeof result === "object" && result !== null
      ? (result as SubmitLeadResponse)
      : null;
  } catch {
    return null;
  }
}

export function useSubmitLead() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitLead = useCallback(
    async (payload: SubmitLeadPayload): Promise<SubmitLeadResult> => {
      setIsSubmitting(true);

      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as
          | string
          | undefined;
        const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as
          | string
          | undefined;

        console.log("[useSubmitLead] Starting submission...", { supabaseUrl: supabaseUrl?.slice(0, 20) + "..." });

        if (!supabaseUrl || !supabaseKey) {
          console.error("[useSubmitLead] Missing credentials");
          throw new Error("Supabase credentials missing");
        }

        const endpoint = `${supabaseUrl}/functions/v1/send-telegram`;
        console.log("[useSubmitLead] Calling endpoint:", endpoint);

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
          },
          body: JSON.stringify(payload),
        });

        console.log("[useSubmitLead] Response status:", response.status);

        const rawResponse = await response.text();
        console.log("[useSubmitLead] Raw response:", rawResponse.slice(0, 200));
        const result = parseResponse(rawResponse);

        if (!response.ok || (!result?.success && !result?.ok)) {
          console.error("[useSubmitLead] Response not OK:", { status: response.status, result });
          const error = new Error(
            result?.error || result?.message || "Request failed",
          ) as RequestError;
          error.status = response.status;
          throw error;
        }

        console.log("[useSubmitLead] Success!");

        return { success: true };
      } catch (error: unknown) {
        console.error("[useSubmitLead] Catch error:", error);

        if (error instanceof TypeError) {
          return {
            success: false,
            error: "Network error. Check CORS settings or internet connection.",
          };
        }

        const message =
          error instanceof Error ? error.message : "Unknown error";
        const status =
          error instanceof Error && "status" in error
            ? (error as RequestError).status
            : undefined;

        return { success: false, error: message, status };
      } finally {
        setIsSubmitting(false);
      }
    },
    [],
  );

  return { submitLead, isSubmitting };
}
