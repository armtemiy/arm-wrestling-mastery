import { useState, useRef, useEffect } from "react";
import { Send, CheckCircle2, Terminal, Loader2, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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
  const cleaned = phone.replace(/[\s\-\(\)]/g, "");
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

const TerminalContactForm = () => {
  const [step, setStep] = useState<FormStep>("name");
  const [isActive, setIsActive] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState(""); // Honeypot field
  const [formLoadTime] = useState(Date.now()); // Track when form loaded
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "system", content: "ARMWRESTLING TULA // Система заявок v2.0", timestamp: getCurrentTime() },
    { type: "system", content: "Инициализация соединения..." },
    { type: "system", content: "Соединение установлено. Готов к приёму данных." },
    { type: "prompt", content: "Введите ваше имя:" },
  ]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

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

  const addLine = (line: TerminalLine) => {
    setLines(prev => [...prev, line]);
  };

  // Check rate limiting
  const isRateLimited = (): boolean => {
    const now = Date.now();
    // Clean old timestamps
    while (submissionTimestamps.length > 0 && submissionTimestamps[0] < now - RATE_LIMIT_WINDOW) {
      submissionTimestamps.shift();
    }
    return submissionTimestamps.length >= MAX_SUBMISSIONS_PER_WINDOW;
  };

  // Anti-bot check: form filled too quickly (less than 3 seconds)
  const isBot = (): boolean => {
    const timeSinceLoad = Date.now() - formLoadTime;
    return timeSinceLoad < 3000 || honeypot.length > 0;
  };

  const sendToTelegram = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("send-telegram", {
        body: { name: name.trim(), phone: phone.trim(), message: message.trim() },
      });

      if (error) throw error;
      
      // Record successful submission for rate limiting
      submissionTimestamps.push(Date.now());
      
      return { success: true };
    } catch (err: any) {
      console.error("Telegram send error:", err);
      return { success: false, error: err.message };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === "name" && name.trim()) {
      if (!isValidName(name.trim())) {
        addLine({ type: "error", content: "✗ Некорректное имя. Попробуйте ещё раз." });
        return;
      }
      addLine({ type: "input", content: `> ${name}` });
      setTimeout(() => {
        addLine({ type: "system", content: `Привет, ${name}! Рад знакомству.` });
        addLine({ type: "prompt", content: "Введите номер телефона:" });
        setStep("phone");
      }, 300);
    } else if (step === "phone" && phone.trim()) {
      if (!isValidPhone(phone.trim())) {
        addLine({ type: "error", content: "✗ Неверный формат телефона. Пример: +7 999 123-45-67" });
        return;
      }
      addLine({ type: "input", content: `> ${phone}` });
      setTimeout(() => {
        addLine({ type: "system", content: "Номер записан." });
        addLine({ type: "prompt", content: "Опишите вашу цель (можно кратко):" });
        setStep("message");
      }, 300);
    } else if (step === "message" && message.trim()) {
      if (!isValidMessage(message.trim())) {
        addLine({ type: "error", content: "✗ Некорректное сообщение. Попробуйте ещё раз." });
        return;
      }

      // Anti-bot checks
      if (isBot()) {
        addLine({ type: "error", content: "✗ Ошибка проверки безопасности." });
        setStep("error");
        return;
      }

      // Rate limiting
      if (isRateLimited()) {
        addLine({ type: "error", content: "✗ Слишком много заявок. Подождите минуту." });
        setStep("error");
        return;
      }

      addLine({ type: "input", content: `> ${message}` });
      setStep("sending");
      
      addLine({ type: "system", content: "Отправка заявки..." });
      
      setTimeout(() => {
        addLine({ type: "system", content: "Проверка безопасности..." });
      }, 400);
      
      setTimeout(() => {
        addLine({ type: "system", content: "Передача на сервер..." });
      }, 800);

      const result = await sendToTelegram();
      
      if (result.success) {
        addLine({ type: "success", content: "✓ ЗАЯВКА УСПЕШНО ОТПРАВЛЕНА" });
        addLine({ type: "system", content: `Данные: ${name} | ${phone}` });
        addLine({ type: "system", content: "Ожидайте ответа в течение 24 часов." });
        addLine({ type: "system", content: "Спасибо за интерес к армрестлингу!" });
        setStep("success");
      } else {
        addLine({ type: "error", content: "✗ ОШИБКА ОТПРАВКИ" });
        addLine({ type: "system", content: "Попробуйте ещё раз или напишите напрямую в Telegram." });
        setStep("error");
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const resetForm = () => {
    setStep("name");
    setName("");
    setPhone("");
    setMessage("");
    setLines([
      { type: "system", content: "ARMWRESTLING TULA // Система заявок v2.0", timestamp: getCurrentTime() },
      { type: "system", content: "Сессия сброшена. Готов к новой заявке." },
      { type: "prompt", content: "Введите ваше имя:" },
    ]);
  };

  const getCurrentValue = () => {
    switch (step) {
      case "name": return name;
      case "phone": return phone;
      case "message": return message;
      default: return "";
    }
  };

  const setCurrentValue = (value: string) => {
    switch (step) {
      case "name": setName(value); break;
      case "phone": setPhone(value); break;
      case "message": setMessage(value); break;
    }
  };

  const getPlaceholder = () => {
    switch (step) {
      case "name": return "Александр";
      case "phone": return "+7 (999) 123-45-67";
      case "message": return "Хочу начать тренировки";
      default: return "";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[hsl(0_0%_12%)] rounded-t-lg border border-b-0 border-[hsl(0_0%_100%/0.1)]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[hsl(0_70%_50%)]" />
          <div className="w-3 h-3 rounded-full bg-[hsl(45_70%_50%)]" />
          <div className="w-3 h-3 rounded-full bg-[hsl(142_70%_45%)]" />
        </div>
        <div className="flex items-center gap-2 ml-4 text-[hsl(0_0%_100%/0.5)] text-sm terminal-form">
          <Terminal className="w-4 h-4" />
          <span>contact@armwrestling.tula</span>
        </div>
      </div>

      {/* Terminal body */}
      <div 
        ref={terminalRef}
        className="bg-[hsl(0_0%_8%)] border border-[hsl(0_0%_100%/0.1)] rounded-b-lg p-4 md:p-6 min-h-[300px] max-h-[400px] overflow-y-auto terminal-form"
      >
        {/* Terminal lines */}
        <div className="space-y-2 text-sm md:text-base">
          {lines.map((line, index) => (
            <div 
              key={index} 
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
                <div className="text-[hsl(30_80%_55%)] mt-3">{line.content}</div>
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
          ))}
        </div>

        {/* Input area */}
        {step !== "sending" && step !== "success" && step !== "error" && (
          <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2">
            <span className="text-[hsl(142_76%_45%)]">{">"}</span>
            <input
              ref={inputRef}
              type={step === "phone" ? "tel" : "text"}
              value={getCurrentValue()}
              onFocus={() => setIsActive(true)}
              onChange={(e) => setCurrentValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={getPlaceholder()}
              className="terminal-input flex-1 text-[hsl(0_0%_100%)] text-sm md:text-base placeholder:text-[hsl(0_0%_100%/0.2)]"
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
            <span className="terminal-cursor w-2 h-5 bg-[hsl(30_80%_55%)]" />
            <button
              type="submit"
              className="ml-2 p-2 rounded bg-[hsl(30_80%_55%/0.2)] hover:bg-[hsl(30_80%_55%/0.3)] text-[hsl(30_80%_55%)] transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Sending state */}
        {step === "sending" && (
          <div className="mt-4 flex items-center gap-2 text-[hsl(0_0%_100%/0.6)]">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Обработка...</span>
          </div>
        )}

        {/* Success/Error state - new session button */}
        {(step === "success" || step === "error") && (
          <button
            onClick={resetForm}
            className="mt-6 text-sm text-[hsl(0_0%_100%/0.4)] hover:text-[hsl(0_0%_100%/0.7)] transition-colors underline underline-offset-4"
          >
            [Начать новую сессию]
          </button>
        )}
      </div>

      {/* Hints */}
      <div className="mt-3 flex items-center justify-between text-xs text-[hsl(0_0%_100%/0.3)] terminal-form">
        <span>Press Enter to submit</span>
        <span>Защита: активна</span>
      </div>
    </div>
  );
};

export default TerminalContactForm;
