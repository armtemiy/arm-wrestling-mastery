import React from "react";
import { Award, BookOpen, Dumbbell, type LucideIcon } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { OptimizedImage } from "@/components/OptimizedImage";
import { COMMON_STYLES } from "./common-styles";
import {
  aboutHighlights,
  type AboutHighlightIconKey,
} from "@/data/features";

const aboutIconMap = {
  bookOpen: BookOpen,
  dumbbell: Dumbbell,
  award: Award,
} satisfies Record<AboutHighlightIconKey, LucideIcon>;

const AboutSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="relative py-12 sm:py-16 md:py-24 lg:py-32 bg-[hsl(15_6%_8%)]"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/3 w-[400px] sm:w-[700px] h-[240px] sm:h-[380px] rounded-full bg-[hsl(5_85%_60%/0.06)] blur-[120px] sm:blur-[200px]" />
        <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[180px] sm:h-[300px] rounded-full bg-[hsl(15_90%_50%/0.05)] blur-[100px] sm:blur-[160px]" />
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <div className="relative order-2 md:order-1">
              <div className="aspect-[4/5] rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[hsl(15_8%_12%)] to-[hsl(15_8%_10%)] border border-[hsl(15_5%_20%)] overflow-hidden">
                <OptimizedImage
                  src="/images/armtemiy.jpg"
                  alt="Артемий Кривошапов"
                  className="w-full h-full object-cover object-center"
                  priority
                />
              </div>
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-[hsl(15_90%_50%/0.1)] -z-10" />
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-[hsl(5_85%_60%/0.05)] -z-10" />
            </div>

            <div className="order-1 md:order-2">
              <span
                className="inline-block px-3 sm:px-4 py-1 rounded-full bg-[hsl(5_85%_60%/0.15)] text-[hsl(5_85%_60%)] text-xs sm:text-sm font-medium mb-4"
                style={COMMON_STYLES.satoshi}
              >
                КТО Я
              </span>
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6"
                style={COMMON_STYLES.clashDisplay}
              >
                Артемий Кривошапов
              </h2>
              <p
                className="text-[hsl(15_10%_60%)] text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed"
                style={COMMON_STYLES.satoshi}
              >
                Я не чемпион мира. Но я перелопатил тонну информации: от учебников по биомеханике до разборов топовых спортсменов. Тренировался сам, общался с профессионалами, набивал шишки.
              </p>
              <p
                className="text-[hsl(15_10%_60%)] text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed"
                style={COMMON_STYLES.satoshi}
              >
                Теперь делюсь тем, что реально работает. Без понтов, без «секретных техник» — просто система, которая даёт результат.
              </p>

              <div className="space-y-3 sm:space-y-4">
                {aboutHighlights.map((item, index) => {
                  const Icon = aboutIconMap[item.icon];

                  return (
                    <div
                      key={item.id}
                      className={`group flex items-center gap-3 ${prefersReducedMotion ? "" : "transition-all duration-300"}`}
                      style={{ transitionDelay: prefersReducedMotion ? "0ms" : `${index * 100}ms` }}
                    >
                      <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[hsl(5_85%_60%/0.15)] flex items-center justify-center shrink-0 ${prefersReducedMotion ? "" : "group-hover:bg-[hsl(5_85%_60%/0.25)] group-hover:scale-110 transition-all duration-300"}`}>
                        <Icon className={`text-[hsl(5_85%_60%)] w-5 h-5 ${prefersReducedMotion ? "" : "group-hover:rotate-6 transition-transform duration-300"}`} />
                      </div>
                      <span className="text-sm sm:text-base text-white" style={COMMON_STYLES.satoshi}>{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MemoizedAboutSection = React.memo(AboutSection);
export default MemoizedAboutSection;