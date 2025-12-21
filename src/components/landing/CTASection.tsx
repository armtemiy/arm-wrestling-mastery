import { Button } from "@/components/ui/button";
import { ArrowRight, Send } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  return (
    <section 
      ref={ref}
      className={`relative py-24 md:py-32 overflow-hidden section-charcoal transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[hsl(25_60%_45%/0.1)] blur-[120px]" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Glass card */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-primary/10 blur-2xl" />

            <div className="relative glass-strong rounded-3xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-[hsl(var(--hero-foreground))] mb-4">
                Готов начать?
              </h2>
              <p className="text-[hsl(var(--hero-foreground)/0.7)] text-lg mb-10 max-w-lg mx-auto">
                Выбери что ближе: полная программа или личная тренировка в Туле
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                <Button
                  asChild
                  variant="cta"
                  size="xl"
                  className="rounded-full shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.6)] transition-all"
                >
                  <a
                    href="https://t.me/assistemiy?text=Хочу%20программу"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Получить программу
                    <ArrowRight className="ml-2" size={20} />
                  </a>
                </Button>

                <Button
                  asChild
                  variant="cta"
                  size="lg"
                  className="rounded-full border-2 border-[hsl(0_0%_100%/0.2)] bg-[hsl(0_0%_100%/0.05)] hover:bg-[hsl(0_0%_100%/0.1)] text-[hsl(var(--hero-foreground))]"
                >
                  <a
                    href="https://t.me/assistemiy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Send className="mr-2" size={20} />
                    Написать мне
                  </a>
                </Button>
              </div>

              {/* Social links */}
              <div className="flex items-center justify-center gap-6 text-[hsl(var(--hero-foreground)/0.6)]">
                <a
                  href="https://t.me/armtemiy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Канал @armtemiy
                </a>
                <span className="w-1 h-1 rounded-full bg-current" />
                <a
                  href="https://t.me/assistemiy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
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
