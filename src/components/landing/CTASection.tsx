import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Send, MessageCircle } from "lucide-react";

const CTASection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal();

  return (
    <section
      id="contact"
      className="relative py-20 md:py-28 bg-metal-800 bg-noise overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.03]" />

      {/* Rust gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rust-600 rounded-full blur-[200px] opacity-[0.05]" />

      <div
        ref={sectionRef}
        className={`relative container mx-auto px-4 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-metal-900 border border-rust-600 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-rust-600 animate-pulse" />
              <span className="font-mono text-xs text-rust-500 uppercase tracking-widest">
                Контакт
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-metal-50 mb-4" style={{ textShadow: '3px 3px 0 hsl(24 98% 32%)' }}>
              СВЯЗЬ
            </h2>
            <p className="font-body text-lg text-metal-400 max-w-xl mx-auto">
              Вопросы? Сомнения? Напиши — отвечу в течение дня.
            </p>
          </div>

          {/* Brutal contact card */}
          <div className="bg-metal-900 border-3 border-metal-700 p-8 md:p-12 shadow-brutal-lg relative">
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-6 h-6 border-l-3 border-t-3 border-rust-600" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-r-3 border-b-3 border-rust-600" />

            <div className="grid md:grid-cols-2 gap-8">
              {/* Direct Telegram CTA */}
              <div className="space-y-6">
                <div>
                  <p className="font-mono text-xs text-rust-500 uppercase tracking-widest mb-2">
                    // Прямая связь
                  </p>
                  <p className="font-body text-metal-400">
                    Telegram — быстрый способ получить ответ
                  </p>
                </div>

                <a
                  href="https://t.me/assistemiy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 w-full px-8 py-6 bg-rust-600 text-metal-50 font-body font-bold text-lg uppercase tracking-wide border-none rounded-sm shadow-brutal hover:bg-rust-500 hover:shadow-brutal-lg hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200"
                >
                  <MessageCircle size={20} />
                  <span>Написать в Telegram</span>
                </a>

                <div className="pt-4 border-t border-metal-700">
                  <p className="font-mono text-xs text-metal-600">
                    @assistemiy
                  </p>
                </div>
              </div>

              {/* Program purchase CTA */}
              <div className="space-y-6">
                <div>
                  <p className="font-mono text-xs text-rust-500 uppercase tracking-widest mb-2">
                    // Система
                  </p>
                  <p className="font-body text-metal-400">
                    Готовая программа тренировок
                  </p>
                </div>

                <a
                  href="https://t.me/assistemiy?text=Хочу%20программу"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 w-full px-8 py-6 bg-metal-700 text-metal-50 font-body font-bold text-lg uppercase tracking-wide border-2 border-metal-600 hover:border-rust-600 hover:bg-metal-600 hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200"
                >
                  <Send size={20} />
                  <span>Забрать программу</span>
                </a>

                <div className="pt-4 border-t border-metal-700">
                  <p className="font-mono text-xs text-metal-600">
                    1500₽ • Доступ навсегда
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-metal-800 via-rust-600 to-metal-800" />
    </section>
  );
};

export default CTASection;
