import React from "react";
import { MapPin, Clock, Users, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { COMMON_STYLES } from "./common-styles";

const TrainingSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal();
  const prefersReducedMotion = useReducedMotion();

  const details = [
    { icon: MapPin, text: "Тула, своя комната с оборудованием" },
    { icon: Clock, text: "От 500₽ за час работы" },
    { icon: Users, text: "Можно прийти с другом" },
  ];

  return (
    <section
      id="training"
      className="relative py-12 sm:py-16 md:py-24 lg:py-32 bg-[hsl(15_7%_9%)]"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/3 w-[400px] sm:w-[700px] h-[250px] sm:h-[400px] rounded-full bg-[hsl(5_85%_60%/0.08)] blur-[120px] sm:blur-[200px]" />
        <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[200px] sm:h-[300px] rounded-full bg-[hsl(15_90%_50%/0.06)] blur-[100px] sm:blur-[160px]" />
      </div>
      <div
        ref={sectionRef}
        className={`container mx-auto px-4 sm:px-6 ${
          prefersReducedMotion ? 'opacity-100' : `transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <div className="relative order-2 md:order-1">
              <div className="aspect-square rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[hsl(15_8%_12%)] to-[hsl(15_8%_10%)] border border-[hsl(15_5%_20%)] overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center p-6 sm:p-8">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full bg-[hsl(5_85%_60%/0.15)] flex items-center justify-center">
                      <MapPin size={24} className="text-[hsl(5_85%_60%)] sm:w-7 sm:h-7" />
                    </div>
                    <p className="text-[hsl(15_10%_60%)] text-sm" style={COMMON_STYLES.satoshi}>
                      Фото комнаты/оборудования
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-16 h-16 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl bg-[hsl(15_90%_50%/0.1)] -z-10" />
            </div>

            <div className="order-1 md:order-2">
              <span 
                className="inline-block px-3 sm:px-4 py-1 rounded-full bg-[hsl(5_85%_60%/0.15)] text-[hsl(5_85%_60%)] text-xs sm:text-sm font-medium mb-4" 
                style={COMMON_STYLES.satoshi}
              >
                ЖИВЫЕ ТРЕНИРОВКИ
              </span>
              <h2 
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-5" 
                style={COMMON_STYLES.clashDisplay}
              >
                Разберём твою технику вживую
              </h2>
              <p 
                className="text-[hsl(15_10%_60%)] text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed" 
                style={COMMON_STYLES.satoshi}
              >
                Видео — это хорошо, но ничто не заменит живую работу. Увижу твои ошибки, поставлю руку, покажу как чувствовать рычаг. За одну тренировку поймёшь больше, чем за месяц самостоятельных попыток.
              </p>

              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {details.map((detail, index) => (
                  <div
                    key={index}
                    className={`group flex items-center gap-3 ${prefersReducedMotion ? '' : 'transition-all duration-300'}`}
                    style={{ transitionDelay: prefersReducedMotion ? '0ms' : `${index * 100}ms` }}
                  >
                    <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[hsl(5_85%_60%/0.15)] flex items-center justify-center shrink-0 ${prefersReducedMotion ? '' : 'group-hover:bg-[hsl(5_85%_60%/0.25)] group-hover:scale-110 transition-all duration-300'}`}>
                      <detail.icon className={`text-[hsl(5_85%_60%)] w-5 h-5 ${prefersReducedMotion ? '' : 'group-hover:rotate-6 transition-transform duration-300'}`} />
                    </div>
                    <span className="text-white text-sm sm:text-base" style={COMMON_STYLES.satoshi}>{detail.text}</span>
                  </div>
                ))}
              </div>

              <a
                href="https://t.me/armtemiy_lab_bot?start=training"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center rounded-full bg-[hsl(5_85%_60%)] hover:bg-[hsl(5_95%_65%)] text-white font-semibold px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base min-h-[48px] shadow-[0_0_30px_hsl(5_85%_60%/0.3)] hover:shadow-[0_0_50px_hsl(5_85%_60%/0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(5_85%_60%)] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(15_7%_9%)] ${prefersReducedMotion ? '' : 'transition-all duration-300'}`}
              >
                Записаться на тренировку
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(15_5%_20%)] to-transparent" />
    </section>
  );
};

const MemoizedTrainingSection = React.memo(TrainingSection);
export default MemoizedTrainingSection;
