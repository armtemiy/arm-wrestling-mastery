import React, { useState, useCallback, useMemo } from "react";
import { Send, MessageSquare, Check } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { COMMON_STYLES } from "./common-styles";
import { consultationOptions, buildTelegramUrl } from "@/data/consultations";

const ConsultationSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal();
  const prefersReducedMotion = useReducedMotion();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleOption = useCallback((id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  }, []);

  const telegramUrl = useMemo(() => buildTelegramUrl(selectedIds), [selectedIds]);

  const handleScrollToContact = useCallback(() => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
    }
  }, [prefersReducedMotion]);

  return (
    <section
      id="consultations"
      className="relative py-8 sm:py-12 md:py-16 lg:py-20 bg-[hsl(15_7%_9%)]"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/3 w-[400px] sm:w-[700px] h-[250px] sm:h-[400px] rounded-full bg-[hsl(5_85%_60%/0.08)] blur-[120px] sm:blur-[200px]" />
        <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[200px] sm:h-[300px] rounded-full bg-[hsl(15_90%_50%/0.06)] blur-[100px] sm:blur-[160px]" />
      </div>

      <div
        ref={sectionRef}
        className={`container mx-auto px-4 sm:px-6 ${
          prefersReducedMotion ? "opacity-100" : `transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-5 sm:mb-6">
            <span
              className="inline-block px-3 sm:px-4 py-1.5 rounded-full bg-[hsl(5_85%_60%/0.15)] text-[hsl(5_85%_60%)] text-xs sm:text-sm font-medium mb-4 sm:mb-5"
              style={COMMON_STYLES.satoshi}
            >
              ИНДИВИДУАЛЬНЫЙ ФОРМАТ
            </span>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4"
              style={COMMON_STYLES.clashDisplay}
            >
              Крафтовые консультации
            </h2>
            <p
              className="text-[hsl(15_10%_70%)] text-lg sm:text-xl md:text-2xl"
              style={COMMON_STYLES.satoshi}
            >
              Индивидуальный стратегический разбор под твои реальные условия
            </p>
          </div>

          <div className="max-w-3xl mx-auto mb-5 sm:mb-6">
            <p
              className="text-[hsl(15_10%_70%)] text-sm sm:text-base md:text-lg mb-2 leading-relaxed text-center"
              style={COMMON_STYLES.satoshi}
            >
              Это не шаблон и не «общая программа». Я вхожу в твою ситуацию: цели, доступный инвентарь, опыт, антропометрия, ограничения — и выстраиваю стратегию под тебя.
            </p>
            <p
              className="text-[hsl(15_10%_70%)] text-sm sm:text-base md:text-lg leading-relaxed text-center"
              style={COMMON_STYLES.satoshi}
            >
              Разбираем технику, стиль борьбы, нейротип, слабые звенья и точки роста. Без воды. Только то, что даст реальный прирост.
            </p>
          </div>

          <div className="mb-4 sm:mb-5">
            <p
              className="text-[hsl(5_85%_60%)] text-sm sm:text-base font-medium mb-3 text-center"
              style={COMMON_STYLES.satoshi}
            >
              Выбери направления, которые хочешь разобрать — и нажми «Записаться в Telegram»
            </p>
            <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
              {consultationOptions.map((option) => {
                const isSelected = selectedIds.includes(option.id);
                return (
                  <button
                    key={option.id}
                    onClick={() => toggleOption(option.id)}
                    className={`group relative inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium min-h-[36px] sm:min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(5_85%_60%)] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(15_7%_9%)] ${
                      prefersReducedMotion ? "" : "transition-all duration-300"
                    } ${
                      isSelected
                        ? "bg-[hsl(5_85%_60%)] text-white shadow-[0_0_20px_hsl(5_85%_60%/0.4)]"
                        : "bg-[hsl(15_8%_15%)] text-[hsl(15_10%_80%)] hover:bg-[hsl(15_8%_20%)] border border-[hsl(15_5%_25%)] hover:border-[hsl(5_85%_60%/0.5)]"
                    }`}
                    style={COMMON_STYLES.satoshi}
                    aria-pressed={isSelected}
                  >
                    {isSelected && (
                      <Check size={14} className="shrink-0" />
                    )}
                    <span>{option.label}</span>
                    {option.link && (
                      <a
                        href={option.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[hsl(15_10%_50%)] hover:text-[hsl(5_85%_60%)] text-[10px]"
                        onClick={(e) => e.stopPropagation()}
                      >
                        ↗
                      </a>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-3">
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center rounded-full bg-[hsl(5_85%_60%)] hover:bg-[hsl(5_95%_65%)] text-white font-semibold px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base min-h-[44px] min-w-[44px] shadow-[0_0_30px_hsl(5_85%_60%/0.3)] hover:shadow-[0_0_50px_hsl(5_85%_60%/0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(5_85%_60%)] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(15_7%_9%)] ${
                prefersReducedMotion ? "" : "transition-all duration-300"
              }`}
              style={COMMON_STYLES.satoshi}
            >
              <Send size={18} className="mr-2" />
              Записаться в Telegram
            </a>

            <button
              onClick={handleScrollToContact}
              className={`inline-flex items-center justify-center rounded-full bg-transparent text-[hsl(15_10%_80%)] font-medium px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base min-h-[44px] min-w-[44px] border border-[hsl(15_5%_30%)] hover:border-[hsl(5_85%_60%/0.5)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(5_85%_60%)] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(15_7%_9%)] ${
                prefersReducedMotion ? "" : "transition-all duration-300"
              }`}
              style={COMMON_STYLES.satoshi}
            >
              <MessageSquare size={18} className="mr-2" />
              Написать через форму
            </button>
          </div>

          <p
            className="text-[hsl(15_10%_50%)] text-xs sm:text-sm text-center"
            style={COMMON_STYLES.satoshi}
          >
            После нажатия откроется Telegram с уже сформированным запросом
          </p>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(15_5%_20%)] to-transparent" />

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

const MemoizedConsultationSection = React.memo(ConsultationSection);
export default MemoizedConsultationSection;