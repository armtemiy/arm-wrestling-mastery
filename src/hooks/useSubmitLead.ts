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

export function useSubmitLead() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitLead = useCallback(
    async (payload: SubmitLeadPayload): Promise<SubmitLeadResult> => {
      setIsSubmitting(true);

      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
        const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as
          | string
          | undefined;

        if (!supabaseUrl || !supabaseKey) {
          throw new Error("Supabase credentials missing");
        }

        const response = await fetch(`${supabaseUrl}/functions/v1/send-telegram`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
          },
          body: JSON.stringify(payload),
        });

        const result: unknown = await response.json();
        const typedResult =
          typeof result === "object" && result !== null
            ? (result as { success?: boolean; error?: string })
            : null;

        if (!response.ok || !typedResult?.success) {
          const error = new Error(typedResult?.error || "Request failed") as RequestError;
          error.status = response.status;
          throw error;
        }

        return { success: true };
      } catch (error: unknown) {
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
    []
  );

  return { submitLead, isSubmitting };
}