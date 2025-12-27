import { Button } from "@/components/ui/button";
import { Target, Dumbbell, Brain, RefreshCw, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const ProgramSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal();

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
      className="relative pt-24 pb-12 md:pt-32 md:pb-16 section-dark"
    >
      <div 
        ref={sectionRef}
        className={`container mx-auto px-4 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-[hsl(30_80%_60%/0.15)] text-[hsl(30_80%_60%)] text-sm font-medium mb-4">
            Главный продукт
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Что внутри программы
          </h2>
          <p className="text-[hsl(0_0%_100%/0.6)] text-lg max-w-xl mx-auto">
            Полный гайд по армрестлингу: от азов до продвинутых техник
          </p>
        </div>

        {/* Glass card with program details */}
        <div className="relative max-w-4xl mx-auto">
          {/* Background glow */}
          <div className="absolute -inset-4 rounded-3xl bg-[hsl(30_80%_60%/0.05)] blur-2xl" />

          <div className="relative glass-strong rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group flex gap-4 p-4 rounded-2xl bg-[hsl(0_0%_100%/0.05)] hover:bg-[hsl(0_0%_100%/0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_hsl(0_0%_0%/0.3)]"
                  style={{ transitionDelay: `${index * 75}ms` }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[hsl(30_80%_60%/0.2)] flex items-center justify-center group-hover:bg-[hsl(30_80%_60%/0.3)] group-hover:scale-110 transition-all duration-300">
                    <feature.icon className="text-[hsl(30_80%_60%)] group-hover:rotate-6 transition-transform duration-300" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-[hsl(0_0%_100%/0.6)]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-[hsl(0_0%_100%/0.2)] to-transparent mb-8" />

            {/* Price and CTA */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-[hsl(0_0%_100%/0.6)] text-sm mb-1">
                  Формат: текст + видео в Telegram
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">
                    1500₽
                  </span>
                  <span className="text-[hsl(0_0%_100%/0.5)]">
                    разовый платёж
                  </span>
                </div>
              </div>

              <Button
                asChild
                variant="cta"
                size="xl"
                className="rounded-full"
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

      {/* Scroll indicator as divider - centered in spacing area */}
      <div className="relative py-12 md:py-16 flex flex-col items-center gap-2 text-[hsl(0_0%_100%/0.4)]">
        <span className="text-xs uppercase tracking-widest">Листай вниз</span>
        <div className="w-6 h-10 rounded-full border-2 border-current flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-current animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default ProgramSection;
