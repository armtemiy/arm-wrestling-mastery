import { useScrollReveal } from "@/hooks/useScrollReveal";
import TerminalContactForm from "./TerminalContactForm";
import { COMMON_STYLES } from "./common-styles";

const CTASection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal();

  return (
    <section
      id="contact"
      className="relative py-20 md:py-32 bg-[hsl(15_5%_10%)] overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[hsl(5_85%_60%/0.1)] blur-[120px]" />
      </div>

      <div
        ref={sectionRef}
        className={`relative container mx-auto px-4 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-[hsl(5_85%_60%/0.15)] text-[hsl(5_85%_60%)] text-sm font-medium mb-6" style={COMMON_STYLES.satoshi}>
              ГОТОВ НАЧАТЬ?
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4" style={COMMON_STYLES.clashDisplay}>
              Напиши — разберёмся
            </h2>
            <p className="text-[hsl(15_10%_70%)] text-base sm:text-lg max-w-lg mx-auto" style={COMMON_STYLES.satoshi}>
              Есть вопросы? Не уверен что подойдёт? Просто напиши — отвечу в течение дня
            </p>
          </div>

          {/* Terminal Form */}
          <TerminalContactForm />
        </div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(5_85%_60%/0.3)] to-transparent" />
    </section>
  );
};

export default CTASection;
