import { Button } from "@/components/ui/button";
import { ArrowRight, Send } from "lucide-react";
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
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Оставить заявку
            </h2>
            <p className="text-[hsl(0_0%_100%/0.6)] text-lg max-w-lg mx-auto">
              Заполни форму или напиши напрямую — отвечу в течение 24 часов
            </p>
          </div>

          {/* Terminal Form */}
          <div className="mb-16">
            <TerminalContactForm />
          </div>

          {/* Alternative CTA */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-[hsl(30_80%_60%/0.05)] blur-2xl" />

            <div className="relative glass rounded-2xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    Предпочитаешь напрямую?
                  </h3>
                  <p className="text-[hsl(0_0%_100%/0.5)] text-sm">
                    Пиши в Telegram — там быстрее всего
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <Button
                    asChild
                    variant="cta"
                    size="lg"
                    className="rounded-full"
                  >
                    <a
                      href="https://t.me/assistemiy?text=Хочу%20программу"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Получить программу
                      <ArrowRight className="ml-2" size={18} />
                    </a>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    className="group rounded-full border border-[hsl(0_0%_100%/0.15)] bg-transparent hover:bg-[hsl(0_0%_100%/0.05)] text-white transition-all duration-300"
                  >
                    <a
                      href="https://t.me/assistemiy"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Send className="mr-2 group-hover:rotate-12 transition-transform duration-300" size={18} />
                      Написать
                    </a>
                  </Button>
                </div>
              </div>

              {/* Social links */}
              <div className="mt-6 pt-6 border-t border-[hsl(0_0%_100%/0.1)] flex items-center justify-center gap-6 text-sm text-[hsl(0_0%_100%/0.5)]">
                <a
                  href="https://t.me/armtemiy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[hsl(30_80%_60%)] transition-colors"
                >
                  Канал @armtemiy
                </a>
                <span className="w-1 h-1 rounded-full bg-current" />
                <a
                  href="https://t.me/assistemiy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[hsl(30_80%_60%)] transition-colors"
                >
                  Личка @assistemiy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
