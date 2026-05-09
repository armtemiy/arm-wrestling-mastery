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

        if (!supabaseUrl || !supabaseKey) {
          throw new Error("Supabase credentials missing");
        }

        const response = await fetch(
          `${supabaseUrl}/functions/v1/send-telegram`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
            },
            body: JSON.stringify(payload),
          },
        );

        const rawResponse = await response.text();
        const result = parseResponse(rawResponse);

        if (!response.ok || (!result?.success && !result?.ok)) {
          const error = new Error(
            result?.error || result?.message || "Request failed",
          ) as RequestError;
          error.status = response.status;
          throw error;
        }

        return { success: true };
      } catch (error: unknown) {
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
