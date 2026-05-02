import React from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import TerminalContactForm from "./TerminalContactForm";
import { COMMON_STYLES } from "./common-styles";

const CTASection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="contact"
      className="relative py-12 sm:py-16 md:py-24 lg:py-32 bg-[hsl(15_5%_10%)]"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[200px] sm:h-[300px] rounded-full bg-[hsl(5_85%_60%/0.1)] blur-[80px] sm:blur-[120px]" />
      </div>

      <div
        ref={sectionRef as React.RefObject<HTMLDivElement>}
        className={`relative container mx-auto px-4 sm:px-6 ${
          prefersReducedMotion
            ? "opacity-100"
            : `transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <span
              className="inline-block px-3 sm:px-4 py-2 rounded-full bg-[hsl(5_85%_60%/0.15)] text-[hsl(5_85%_60%)] text-xs sm:text-sm font-medium mb-4 sm:mb-6"
              style={COMMON_STYLES.satoshi}
            >
              ГОТОВ НАЧАТЬ?
            </span>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4"
              style={COMMON_STYLES.clashDisplay}
            >
              Напиши — разберёмся
            </h2>
            <p
              className="text-[hsl(15_10%_70%)] text-base sm:text-lg max-w-lg mx-auto leading-relaxed"
              style={COMMON_STYLES.satoshi}
            >
              Есть вопросы? Не уверен что подойдёт? Просто напиши — отвечу в
              течение дня
            </p>
          </div>

          <TerminalContactForm />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(5_85%_60%/0.3)] to-transparent" />
    </section>
  );
};

const MemoizedCTASection = React.memo(CTASection);
export default MemoizedCTASection;
