import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { Send, CheckCircle2, Terminal, Loader2, XCircle } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSubmitLead } from "@/hooks/useSubmitLead";

// Debug version marker - check console to verify code update
console.log("[TerminalContactForm] Loaded v2 - debug enabled");
// eslint-disable-next-line no-debugger
if (typeof window !== "undefined" && window.location.hostname === "armtemiy.ru") {
  // Alert for debug - remove after fixing
  // alert("Terminal v2 loaded");
}

type FormStep = "name" | "phone" | "message" | "sending" | "success" | "error";

interface TerminalLine {
  type: "system" | "prompt" | "input" | "success" | "error";
  content: string;
  timestamp?: string;
}

const INPUT_ID = "terminal-contact-input";
const INPUT_HINT_ID = "terminal-contact-input-hint";
const INPUT_ERROR_ID = "terminal-contact-input-error";

const submissionTimestamps: number[] = [];
const RATE_LIMIT_WINDOW = 60000;
const MAX_SUBMISSIONS_PER_WINDOW = 3;

const isValidPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/[\s\-()]/g, "");
  return /^\+?[0-9]{10,15}$/.test(cleaned);
};

const isValidName = (name: string): boolean => {
  if (name.length < 2 || name.length > 50) return false;
  const suspicious =
    /<|>|javascript:|http:|https:|www\.|SELECT|INSERT|DELETE|DROP|UNION/i;
  return !suspicious.test(name);
};

const isValidMessage = (message: string): boolean => {
  if (message.length < 2 || message.length > 500) return false;
  const suspicious = /<script|javascript:|onclick|onerror/i;
  return !suspicious.test(message);
};

function getCurrentTime() {
  return new Date().toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getSubmitErrorHint(status: number | undefined, error: string) {
  if (status === 403 || error.toLowerCase().includes("cors")) {
    return "Не прошёл доступ с этого домена. Напиши напрямую в Telegram: @armtemiy";
  }

  if (status === 429) {
    return "Подожди минуту и попробуй снова.";
  }

  if (error.toLowerCase().includes("network")) {
    return "Похоже на сетевую ошибку. Если не уйдёт — напиши напрямую в Telegram: @armtemiy";
  }

  return "Открой Telegram и напиши напрямую: @armtemiy";
}

const TerminalLineComponent = React.memo(
  ({ line, index }: { line: TerminalLine; index: number }) => (
    <div
      className="terminal-line"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {line.type === "system" && (
        <div className="flex gap-2">
          {line.timestamp && (
            <span className="text-[hsl(0_0%_100%/0.3)]">
              [{line.timestamp}]
            </span>
          )}
          <span className="text-[hsl(0_0%_100%/0.6)]">{line.content}</span>
        </div>
      )}
      {line.type === "prompt" && (
        <div className="text-[hsl(150_70%_50%)] mt-3">{line.content}</div>
      )}
      {line.type === "input" && (
        <div className="text-[hsl(0_0%_100%/0.9)] font-medium">
          {line.content}
        </div>
      )}
      {line.type === "success" && (
        <div className="text-[hsl(142_76%_45%)] font-bold mt-3 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          {line.content}
        </div>
      )}
      {line.type === "error" && (
        <div className="text-[hsl(0_70%_50%)] font-bold mt-3 flex items-center gap-2">
          <XCircle className="w-4 h-4" />
          {line.content}
        </div>
      )}
    </div>
  ),
);

const TerminalContactForm = () => {
  const [step, setStep] = useState<FormStep>("name");
  const [isActive, setIsActive] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      type: "system",
      content: "ARMTEMIY // Форма связи",
      timestamp: getCurrentTime(),
    },
    { type: "system", content: "Подключение..." },
    { type: "system", content: "Готов. Давай познакомимся." },
    { type: "prompt", content: "Как тебя зовут?" },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const pendingTimeoutsRef = useRef<number[]>([]);
  const firstInteractionAtRef = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { submitLead, isSubmitting } = useSubmitLead();

  const clearPendingTimeouts = useCallback(() => {
    pendingTimeoutsRef.current.forEach((timeoutId) =>
      window.clearTimeout(timeoutId),
    );
    pendingTimeoutsRef.current = [];
  }, []);

  const scheduleAction = useCallback(
    (callback: () => void, delay: number) => {
      if (prefersReducedMotion || delay <= 0) {
        callback();
        return;
      }

      const timeoutId = window.setTimeout(() => {
        pendingTimeoutsRef.current = pendingTimeoutsRef.current.filter(
          (id) => id !== timeoutId,
        );
        callback();
      }, delay);

      pendingTimeoutsRef.current.push(timeoutId);
    },
    [prefersReducedMotion],
  );

  useEffect(() => {
    const el = terminalRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) {
      setIsActive(true);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, []);

  useEffect(() => {
    if (!isActive) return;
    inputRef.current?.focus();
  }, [step, isActive]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(
    () => () => {
      clearPendingTimeouts();
    },
    [clearPendingTimeouts],
  );

  useEffect(() => {
    setFieldError(null);
  }, [step]);

  const addLine = useCallback((line: TerminalLine) => {
    setLines((prev) => [...prev, line]);
  }, []);

  const markInteraction = useCallback(() => {
    if (firstInteractionAtRef.current === null) {
      firstInteractionAtRef.current = Date.now();
    }
  }, []);

  const isRateLimited = useCallback((): boolean => {
    const now = Date.now();
    while (submissionTimestamps.length > 0) {
      const oldestTimestamp = submissionTimestamps[0];
      if (
        oldestTimestamp === undefined ||
        oldestTimestamp >= now - RATE_LIMIT_WINDOW
      )
        break;
      submissionTimestamps.shift();
    }
    return submissionTimestamps.length >= MAX_SUBMISSIONS_PER_WINDOW;
  }, []);

  const getBotCheckError = useCallback((): string | null => {
    if (honeypot.length > 0) {
      return "Ошибка проверки. Обнови форму и попробуй снова.";
    }

    const firstInteractionAt = firstInteractionAtRef.current;
    // DEBUG: Log the timing check values
    const timeSinceFirstInteraction = firstInteractionAt ? Date.now() - firstInteractionAt : 0;
    console.log("[BotCheck] time since first interaction:", timeSinceFirstInteraction, "ms");

    if (!firstInteractionAt || Date.now() - firstInteractionAt < 1000) {
      return "Форма заполнена слишком быстро. Подожди секунду и попробуй снова.";
    }

    return null;
  }, [honeypot]);

  const handleSubmit = useCallback(
    async (
      e:
        | React.FormEvent<HTMLFormElement>
        | React.KeyboardEvent<HTMLInputElement>,
    ) => {
      e.preventDefault();

      if (isSubmitting || step === "sending") {
        return;
      }

      setFieldError(null);

      if (step === "name" && name.trim()) {
        if (!isValidName(name.trim())) {
          const errorText = "Хм, что-то не так с именем. Попробуй ещё раз.";
          setFieldError(errorText);
          addLine({ type: "error", content: `✕ ${errorText}` });
          return;
        }

        addLine({ type: "input", content: `> ${name}` });
        scheduleAction(() => {
          addLine({
            type: "system",
            content: `Приятно познакомиться, ${name}!`,
          });
          addLine({ type: "prompt", content: "Куда позвонить или написать?" });
          setStep("phone");
        }, 300);
        return;
      }

      if (step === "phone" && phone.trim()) {
        if (!isValidPhone(phone.trim())) {
          const errorText = "Не похоже на номер. Пример: +7 999 123-45-67";
          setFieldError(errorText);
          addLine({ type: "error", content: `✕ ${errorText}` });
          return;
        }

        addLine({ type: "input", content: `> ${phone}` });
        scheduleAction(() => {
          addLine({ type: "system", content: "Записал." });
          addLine({
            type: "prompt",
            content:
              "Что тебя интересует? (Armtemiy Lab, консультация, вопрос)",
          });
          setStep("message");
        }, 300);
        return;
      }

      if (step === "message" && message.trim()) {
        console.log("[TerminalContactForm] Submitting message step...");

        if (!isValidMessage(message.trim())) {
          const errorText = "Что-то пошло не так. Попробуй переформулировать.";
          setFieldError(errorText);
          addLine({ type: "error", content: `✕ ${errorText}` });
          return;
        }

        const botCheckError = getBotCheckError();
        console.log("[TerminalContactForm] Bot check:", { botCheckError, honeypot, firstInteractionAt: firstInteractionAtRef.current });
        if (botCheckError) {
          setFieldError(botCheckError);
          addLine({ type: "error", content: `✕ ${botCheckError}` });
          return;
        }

        const rateLimited = isRateLimited();
        console.log("[TerminalContactForm] Rate limit check:", { rateLimited });
        if (rateLimited) {
          addLine({
            type: "error",
            content: "✕ Слишком много заявок. Подожди минутку.",
          });
          setStep("error");
          return;
        }

        addLine({ type: "input", content: `> ${message}` });
        setStep("sending");
        addLine({ type: "system", content: "Отправляю..." });
        scheduleAction(() => {
          addLine({ type: "system", content: "Почти готово..." });
        }, 600);

        const searchParams = new URLSearchParams(window.location.search);
        const result = await submitLead({
          name: name.trim(),
          phone: phone.trim(),
          message: message.trim(),
          pageUrl: window.location.href,
          referrer: document.referrer || undefined,
          userAgent: navigator.userAgent,
          utmSource: searchParams.get("utm_source") || undefined,
          utmMedium: searchParams.get("utm_medium") || undefined,
          utmCampaign: searchParams.get("utm_campaign") || undefined,
          utmContent: searchParams.get("utm_content") || undefined,
          utmTerm: searchParams.get("utm_term") || undefined,
        });

        // Debug logging for troubleshooting
        if (!result.success) {
          console.error("[TerminalContactForm] Submit failed:", {
            status: result.status,
            error: result.error,
            origin: window.location.origin,
          });
        }

        if (result.success) {
          submissionTimestamps.push(Date.now());
          addLine({ type: "success", content: "✓ ЗАЯВКА ПРИНЯТА" });
          addLine({
            type: "system",
            content: `${name}, заявка отправлена Артемию.`,
          });
          addLine({ type: "system", content: "Скоро напишу." });
          setStep("success");
          return;
        }

        if (result.status === 429) {
          addLine({ type: "error", content: "✕ СЛИШКОМ МНОГО ЗАЯВОК" });
          addLine({
            type: "system",
            content: "Подожди минуту и попробуй снова.",
          });
          setStep("error");
          return;
        }

        const errorHint = getSubmitErrorHint(result.status, result.error);
        addLine({ type: "error", content: "✕ ЧТО-ТО ПОШЛО НЕ ТАК" });
        addLine({
          type: "system",
          content: errorHint,
        });
        setStep("error");
      }
    },
    [
      isSubmitting,
      step,
      name,
      phone,
      message,
      addLine,
      getBotCheckError,
      isRateLimited,
      scheduleAction,
      submitLead,
    ],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      markInteraction();

      if (e.key === "Enter") {
        handleSubmit(e);
      }
    },
    [handleSubmit, markInteraction],
  );

  const resetForm = useCallback(() => {
    clearPendingTimeouts();
    setStep("name");
    setName("");
    setPhone("");
    setMessage("");
    setHoneypot("");
    setFieldError(null);
    firstInteractionAtRef.current = null;
    setLines([
      {
        type: "system",
        content: "ARMTEMIY // Форма связи",
        timestamp: getCurrentTime(),
      },
      { type: "system", content: "Начинаем заново. Готов." },
      { type: "prompt", content: "Как тебя зовут?" },
    ]);
  }, [clearPendingTimeouts]);

  const getCurrentValue = useCallback(() => {
    switch (step) {
      case "name":
        return name;
      case "phone":
        return phone;
      case "message":
        return message;
      default:
        return "";
    }
  }, [step, name, phone, message]);

  const setCurrentValue = useCallback(
    (value: string) => {
      markInteraction();
      setFieldError(null);
      switch (step) {
        case "name":
          setName(value);
          break;
        case "phone":
          setPhone(value);
          break;
        case "message":
          setMessage(value);
          break;
        default:
          break;
      }
    },
    [step, markInteraction],
  );

  const getPlaceholder = useCallback(() => {
    switch (step) {
      case "name":
        return "Саша";
      case "phone":
        return "+7 999 123-45-67";
      case "message":
        return "Хочу Armtemiy Lab / на консультацию";
      default:
        return "";
    }
  }, [step]);

  const getInputLabel = useCallback(() => {
    switch (step) {
      case "name":
        return "Введите имя";
      case "phone":
        return "Введите номер телефона";
      case "message":
        return "Введите сообщение";
      default:
        return "Поле ввода";
    }
  }, [step]);

  const getAutoComplete = useCallback(() => {
    switch (step) {
      case "name":
        return "name";
      case "phone":
        return "tel";
      case "message":
        return "off";
      default:
        return "off";
    }
  }, [step]);

  const getInputMode =
    useCallback((): React.HTMLAttributes<HTMLInputElement>["inputMode"] => {
      switch (step) {
        case "phone":
          return "tel";
        default:
          return "text";
      }
    }, [step]);

  const placeholder = useMemo(() => getPlaceholder(), [getPlaceholder]);
  const currentValue = useMemo(() => getCurrentValue(), [getCurrentValue]);
  const inputLabel = useMemo(() => getInputLabel(), [getInputLabel]);
  const autoComplete = useMemo(() => getAutoComplete(), [getAutoComplete]);
  const inputMode = useMemo(() => getInputMode(), [getInputMode]);
  const inputDescribedBy = fieldError
    ? `${INPUT_HINT_ID} ${INPUT_ERROR_ID}`
    : INPUT_HINT_ID;
  const statusAnnouncement = useMemo(() => {
    switch (step) {
      case "sending":
        return "Заявка отправляется";
      case "success":
        return "Заявка успешно отправлена";
      case "error":
        return "Ошибка отправки заявки";
      default:
        return "";
    }
  }, [step]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-[hsl(0_0%_12%)] rounded-t-lg border border-b-0 border-[hsl(0_0%_100%/0.1)]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[hsl(0_70%_50%)]" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[hsl(45_70%_50%)]" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[hsl(142_70%_45%)]" />
        </div>
        <div className="flex items-center gap-2 ml-3 sm:ml-4 text-[hsl(0_0%_100%/0.6)] text-xs sm:text-sm terminal-form">
          <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>armtemiy.contact</span>
        </div>
      </div>

      <div
        ref={terminalRef}
        className="bg-[hsl(0_0%_8%)] border border-[hsl(0_0%_100%/0.1)] rounded-b-lg p-4 sm:p-5 md:p-6 min-h-[240px] sm:min-h-[280px] md:min-h-[320px] max-h-[320px] sm:max-h-[380px] md:max-h-[420px] overflow-y-auto terminal-form"
      >
        <div
          className="space-y-2 text-sm md:text-base"
          role="log"
          aria-live="polite"
          aria-relevant="additions text"
        >
          {lines.map((line, index) => (
            <TerminalLineComponent key={index} line={line} index={index} />
          ))}
        </div>

        {statusAnnouncement && (
          <p className="sr-only" role="status" aria-live="polite">
            {statusAnnouncement}
          </p>
        )}

        {step !== "sending" && step !== "success" && step !== "error" && (
          <form
            onSubmit={handleSubmit}
            className="mt-4 flex items-center gap-2"
          >
            <label htmlFor={INPUT_ID} className="sr-only">
              {inputLabel}
            </label>
            <span className="text-[hsl(142_76%_45%)]">{">"}</span>
            <input
              id={INPUT_ID}
              ref={inputRef}
              type={step === "phone" ? "tel" : "text"}
              value={currentValue}
              onFocus={() => setIsActive(true)}
              onPointerDown={markInteraction}
              onChange={(e) => setCurrentValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="terminal-input flex-1 text-[hsl(0_0%_100%)] text-base placeholder:text-[hsl(0_0%_100%/0.2)] min-h-[44px]"
              autoComplete={autoComplete}
              inputMode={inputMode}
              aria-invalid={Boolean(fieldError)}
              aria-describedby={inputDescribedBy}
            />
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="absolute -left-[9999px] opacity-0 pointer-events-none"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <span id={INPUT_HINT_ID} className="sr-only">
              Нажмите Enter или кнопку отправки для перехода к следующему шагу.
            </span>
            {fieldError && (
              <p
                id={INPUT_ERROR_ID}
                className="sr-only"
                role="alert"
                aria-live="assertive"
              >
                {fieldError}
              </p>
            )}
            <span className="terminal-cursor w-2 h-5 bg-[hsl(150_70%_50%)]" />
            <button
              type="submit"
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
              className="ml-2 p-2.5 sm:p-3 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-[hsl(150_70%_45%/0.2)] hover:bg-[hsl(150_70%_45%/0.3)] text-[hsl(150_70%_50%)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(150_70%_50%)] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(0_0%_8%)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-[hsl(150_70%_45%/0.2)]"
              aria-label="Отправить"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </form>
        )}

        {step === "sending" && (
          <div
            className="mt-4 flex items-center gap-2 text-[hsl(0_0%_100%/0.6)]"
            role="status"
            aria-live="polite"
          >
            <Loader2
              className={`w-4 h-4 ${prefersReducedMotion ? "" : "animate-spin"}`}
            />
            <span>Обработка...</span>
          </div>
        )}

        {(step === "success" || step === "error") && (
          <button
            onClick={resetForm}
            className="mt-6 min-h-[44px] px-4 py-2 text-sm text-[hsl(0_0%_100%/0.4)] hover:text-[hsl(0_0%_100%/0.7)] transition-colors underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(0_0%_8%)] rounded-lg"
          >
            [Начать новую сессию]
          </button>
        )}
      </div>

      <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[hsl(0_0%_100%/0.5)] terminal-form px-1">
        <span>Enter - отправить</span>
        <span>Защита: активна</span>
      </div>
    </div>
  );
};

const MemoizedTerminalContactForm = React.memo(TerminalContactForm);
export default MemoizedTerminalContactForm;
