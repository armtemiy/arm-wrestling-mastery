import { Button } from "@/components/ui/button";
import { Target, Dumbbell, Brain, RefreshCw, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ProgramSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  
  const features = [
    {
      icon: Target,
      title: "Техника и биомеханика",
      description: "Как бороться правильно: постановка руки, углы, рычаги",
    },
    {
      icon: Dumbbell,
      title: "Тренировки",
      description: "Упражнения, периодизация, тренировочные циклы",
    },
    {
      icon: Brain,
      title: "Тактика",
      description: "Фишки старта, захват, легальные приёмы",
    },
    {
      icon: RefreshCw,
      title: "Восстановление",
      description: "Как не убить руки и тренироваться стабильно",
    },
  ];

  return (
    <section 
      id="program" 
      ref={ref}
      className={`relative py-24 md:py-32 bg-muted/30 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Главный продукт
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Что внутри программы
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Полный гайд по армрестлингу: от азов до продвинутых техник
          </p>
        </div>

        {/* Glass card with program details */}
        <div className="relative max-w-4xl mx-auto">
          {/* Background glow */}
          <div className="absolute -inset-4 rounded-3xl bg-primary/5 blur-2xl" />

          <div className="relative border border-border bg-card rounded-3xl p-8 md:p-12 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 rounded-2xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <feature.icon className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

            {/* Price and CTA */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-muted-foreground text-sm mb-1">
                  Формат: текст + видео в Telegram
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-foreground">
                    1500₽
                  </span>
                  <span className="text-muted-foreground">
                    разовый платёж
                  </span>
                </div>
              </div>

              <Button
                asChild
                variant="cta"
                size="xl"
                className="rounded-full shadow-[0_0_30px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.5)] transition-all"
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramSection;
