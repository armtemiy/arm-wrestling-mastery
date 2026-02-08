import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Send, CheckCircle2, Terminal, Loader2, XCircle } from "lucide-react";
import { COMMON_STYLES } from "./common-styles";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type FormStep = "name" | "phone" | "message" | "sending" | "success" | "error";

interface TerminalLine {
  type: "system" | "prompt" | "input" | "success" | "error";
  content: string;
  timestamp?: string;
}

// Rate limiting: track submission timestamps in memory
const submissionTimestamps: number[] = [];
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_SUBMISSIONS_PER_WINDOW = 3;

// Simple phone validation
const isValidPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/[\s\-()]/g, "");
  return /^\+?[0-9]{10,15}$/.test(cleaned);
};

// Name validation (no links, scripts, etc.)
const isValidName = (name: string): boolean => {
  if (name.length < 2 || name.length > 50) return false;
  // Block URLs, scripts, SQL injection attempts
  const suspicious = /<|>|javascript:|http:|https:|www\.|SELECT|INSERT|DELETE|DROP|UNION/i;
  return !suspicious.test(name);
};

// Message validation
const isValidMessage = (message: string): boolean => {
  if (message.length < 2 || message.length > 500) return false;
  const suspicious = /<script|javascript:|onclick|onerror/i;
  return !suspicious.test(message);
};

// Memoized TerminalLine component
const TerminalLineComponent = React.memo(({ line, index }: { line: TerminalLine; index: number }) => (
  <div
    className="terminal-line"
    style={{ animationDelay: `${index * 50}ms` }}
  >
    {line.type === "system" && (
      <div className="flex gap-2">
        {line.timestamp && (
          <span className="text-[hsl(0_0%_100%/0.3)]">[{line.timestamp}]</span>
        )}
        <span className="text-[hsl(0_0%_100%/0.6)]">{line.content}</span>
      </div>
    )}
    {line.type === "prompt" && (
      <div className="text-[hsl(150_70%_50%)] mt-3">{line.content}</div>
    )}
    {line.type === "input" && (
      <div className="text-[hsl(0_0%_100%/0.9)] font-medium">{line.content}</div>
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
));

const TerminalContactForm = () => {
  const [step, setStep] = useState<FormStep>("name");
  const [isActive, setIsActive] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState(""); // Honeypot field
  const [formLoadTime] = useState(Date.now()); // Track when form loaded
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "system", content: "ARMTEMIY // Форма связи", timestamp: getCurrentTime() },
    { type: "system", content: "Подключение..." },
    { type: "system", content: "Готов. Давай знакомиться." },
    { type: "prompt", content: "Как тебя зовут?" },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const pendingTimeoutsRef = useRef<number[]>([]);
  const prefersReducedMotion = useReducedMotion();

  const clearPendingTimeouts = useCallback(() => {
    pendingTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    pendingTimeoutsRef.current = [];
  }, []);

  const scheduleAction = useCallback((callback: () => void, delay: number) => {
    if (prefersReducedMotion || delay <= 0) {
      callback();
      return;
    }

    const timeoutId = window.setTimeout(() => {
      pendingTimeoutsRef.current = pendingTimeoutsRef.current.filter((id) => id !== timeoutId);
      callback();
    }, delay);

    pendingTimeoutsRef.current.push(timeoutId);
  }, [prefersReducedMotion]);

  function getCurrentTime() {
    return new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
  }

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

  useEffect(() => {
    return () => {
      clearPendingTimeouts();
    };
  }, [clearPendingTimeouts]);

  const addLine = useCallback((line: TerminalLine) => {
    setLines(prev => [...prev, line]);
  }, []);

  // Check rate limiting
  const isRateLimited = useCallback((): boolean => {
    const now = Date.now();
    // Clean old timestamps
    while (submissionTimestamps.length > 0 && submissionTimestamps[0] < now - RATE_LIMIT_WINDOW) {
      submissionTimestamps.shift();
    }
    return submissionTimestamps.length >= MAX_SUBMISSIONS_PER_WINDOW;
  }, []);

  // Anti-bot check: form filled too quickly (less than 3 seconds)
  const isBot = useCallback((): boolean => {
    const timeSinceLoad = Date.now() - formLoadTime;
    return timeSinceLoad < 3000 || honeypot.length > 0;
  }, [formLoadTime, honeypot]);

  const sendToTelegram = useCallback(async () => {
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
      const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

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
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          message: message.trim(),
          pageUrl: window.location.href,
          referrer: document.referrer || undefined,
          userAgent: navigator.userAgent,
          utmSource: new URLSearchParams(window.location.search).get("utm_source") || undefined,
          utmMedium: new URLSearchParams(window.location.search).get("utm_medium") || undefined,
          utmCampaign: new URLSearchParams(window.location.search).get("utm_campaign") || undefined,
          utmContent: new URLSearchParams(window.location.search).get("utm_content") || undefined,
          utmTerm: new URLSearchParams(window.location.search).get("utm_term") || undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result?.success) {
        const errorText = result?.error || "Request failed";
        const error = new Error(errorText);
        (error as Error & { status?: number }).status = response.status;
        throw error;
      }

      // Record successful submission for rate limiting
      submissionTimestamps.push(Date.now());

      return { success: true };
    } catch (err: unknown) {
      console.error("Telegram send error:", err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      const status = err instanceof Error && "status" in err ? (err as Error & { status?: number }).status : undefined;
      return { success: false, error: errorMessage, status };
    }
  }, [name, phone, message]);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>) => {
    if ("preventDefault" in e) {
      e.preventDefault();
    }

    if (step === "name" && name.trim()) {
      if (!isValidName(name.trim())) {
        addLine({ type: "error", content: "✗ Хм, что-то не так с именем. Попробуй ещё раз." });
        return;
      }
      addLine({ type: "input", content: `> ${name}` });
      scheduleAction(() => {
        addLine({ type: "system", content: `Приятно познакомиться, ${name}!` });
        addLine({ type: "prompt", content: "Куда позвонить или написать?" });
        setStep("phone");
      }, 300);
    } else if (step === "phone" && phone.trim()) {
      if (!isValidPhone(phone.trim())) {
        addLine({ type: "error", content: "✗ Не похоже на номер. Пример: +7 999 123-45-67" });
        return;
      }
      addLine({ type: "input", content: `> ${phone}` });
      scheduleAction(() => {
        addLine({ type: "system", content: "Записал." });
        addLine({ type: "prompt", content: "Что тебя интересует? (Armtemiy Lab, тренировки, вопрос)" });
        setStep("message");
      }, 300);
    } else if (step === "message" && message.trim()) {
      if (!isValidMessage(message.trim())) {
        addLine({ type: "error", content: "✗ Что-то пошло не так. Попробуй переформулировать." });
        return;
      }

      // Anti-bot checks
      if (isBot()) {
        addLine({ type: "error", content: "✗ Ошибка проверки." });
        setStep("error");
        return;
      }

      // Rate limiting
      if (isRateLimited()) {
        addLine({ type: "error", content: "✗ Слишком много заявок. Подожди минутку." });
        setStep("error");
        return;
      }

      addLine({ type: "input", content: `> ${message}` });
      setStep("sending");

      addLine({ type: "system", content: "Отправляю..." });

      scheduleAction(() => {
        addLine({ type: "system", content: "Почти готово..." });
      }, 600);

      const result = await sendToTelegram();

      if (result.success) {
        addLine({ type: "success", content: "✓ ЗАЯВКА ПРИНЯТА" });
        addLine({ type: "system", content: `${name}, заявка отправлена в Armtemiy Lab.` });
        addLine({ type: "system", content: "Скоро напишу." });
        setStep("success");
      } else {
        if (result.status === 429) {
          addLine({ type: "error", content: "✗ СЛИШКОМ МНОГО ЗАЯВОК" });
          addLine({ type: "system", content: "Подожди минуту и попробуй снова." });
          setStep("error");
          return;
        }
        addLine({ type: "error", content: "✗ ЧТО-ТО ПОШЛО НЕ ТАК" });
        addLine({ type: "system", content: "Открой Telegram и напиши боту: @armtemiy_lab_bot" });
        setStep("error");
      }
    }
  }, [step, name, phone, message, addLine, isBot, isRateLimited, sendToTelegram, scheduleAction]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  }, [handleSubmit]);

  const resetForm = useCallback(() => {
    clearPendingTimeouts();
    setStep("name");
    setName("");
    setPhone("");
    setMessage("");
    setLines([
      { type: "system", content: "ARMTEMIY // Форма связи", timestamp: getCurrentTime() },
      { type: "system", content: "Начинаем заново. Готов." },
      { type: "prompt", content: "Как тебя зовут?" },
    ]);
  }, [clearPendingTimeouts]);

  const getCurrentValue = useCallback(() => {
    switch (step) {
      case "name": return name;
      case "phone": return phone;
      case "message": return message;
      default: return "";
    }
  }, [step, name, phone, message]);

  const setCurrentValue = useCallback((value: string) => {
    switch (step) {
      case "name": setName(value); break;
      case "phone": setPhone(value); break;
      case "message": setMessage(value); break;
    }
  }, [step]);

  const getPlaceholder = useCallback(() => {
    switch (step) {
      case "name": return "Саша";
      case "phone": return "+7 999 123-45-67";
      case "message": return "Хочу Armtemiy Lab / на тренировку";
      default: return "";
    }
  }, [step]);

  const placeholder = useMemo(() => getPlaceholder(), [getPlaceholder]);
  const currentValue = useMemo(() => getCurrentValue(), [getCurrentValue]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Terminal header */}
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

      {/* Terminal body */}
      <div
        ref={terminalRef}
        className="bg-[hsl(0_0%_8%)] border border-[hsl(0_0%_100%/0.1)] rounded-b-lg p-4 sm:p-5 md:p-6 min-h-[240px] sm:min-h-[280px] md:min-h-[320px] max-h-[320px] sm:max-h-[380px] md:max-h-[420px] overflow-y-auto terminal-form"
      >
        {/* Terminal lines */}
        <div className="space-y-2 text-sm md:text-base">
          {lines.map((line, index) => (
            <TerminalLineComponent key={index} line={line} index={index} />
          ))}
        </div>

        {/* Input area */}
        {step !== "sending" && step !== "success" && step !== "error" && (
          <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2">
            <span className="text-[hsl(142_76%_45%)]">{">"}</span>
            <input
              ref={inputRef}
              type={step === "phone" ? "tel" : "text"}
              value={currentValue}
              onFocus={() => setIsActive(true)}
              onChange={(e) => setCurrentValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="terminal-input flex-1 text-[hsl(0_0%_100%)] text-base placeholder:text-[hsl(0_0%_100%/0.2)] min-h-[44px]"
              autoComplete="off"
            />
            {/* Honeypot field - invisible to users */}
            <input
              type="text"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="absolute -left-[9999px] opacity-0 pointer-events-none"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <span className="terminal-cursor w-2 h-5 bg-[hsl(150_70%_50%)]" />
            <button
              type="submit"
              className="ml-2 p-2.5 sm:p-3 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-[hsl(150_70%_45%/0.2)] hover:bg-[hsl(150_70%_45%/0.3)] text-[hsl(150_70%_50%)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(150_70%_50%)] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(0_0%_8%)]"
              aria-label="Отправить"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </form>
        )}

        {/* Sending state */}
        {step === "sending" && (
          <div className="mt-4 flex items-center gap-2 text-[hsl(0_0%_100%/0.6)]">
            <Loader2 className={`w-4 h-4 ${prefersReducedMotion ? '' : 'animate-spin'}`} />
            <span>Обработка...</span>
          </div>
        )}

        {/* Success/Error state - new session button */}
        {(step === "success" || step === "error") && (
          <button
            onClick={resetForm}
            className="mt-6 min-h-[44px] px-4 py-2 text-sm text-[hsl(0_0%_100%/0.4)] hover:text-[hsl(0_0%_100%/0.7)] transition-colors underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(0_0%_8%)] rounded-lg"
          >
            [Начать новую сессию]
          </button>
        )}
      </div>

      {/* Hints */}
      <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[hsl(0_0%_100%/0.5)] terminal-form px-1">
        <span>Enter — отправить</span>
        <span>Защита: активна</span>
      </div>
    </div>
  );
};

const MemoizedTerminalContactForm = React.memo(TerminalContactForm);
export default MemoizedTerminalContactForm;
