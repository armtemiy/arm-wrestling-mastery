import { useScrollReveal } from "@/hooks/useScrollReveal";
import TerminalContactForm from "./TerminalContactForm";

const CTASection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal();

  return (
    <section 
      id="contact"
      className="relative py-24 md:py-32 overflow-hidden section-charcoal"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[hsl(25_60%_45%/0.1)] blur-[120px]" />
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
            <span className="inline-block px-4 py-2 rounded-full bg-[hsl(30_80%_55%/0.15)] text-[hsl(30_80%_55%)] text-sm font-medium mb-6">
              Связаться
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Оставить заявку
            </h2>
            <p className="text-[hsl(0_0%_100%/0.6)] text-lg max-w-lg mx-auto">
              Заполни форму — отвечу в течение 24 часов
            </p>
          </div>

          {/* Terminal Form */}
          <TerminalContactForm />
        </div>
      </div>
    </section>
  );
};

export default CTASection;
