import { Button } from "@/components/ui/button";
import { Target, Dumbbell, Brain, RefreshCw, ArrowRight, Check, BookOpen, Video, MessageCircle } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useStaggeredReveal } from "@/hooks/useStaggeredReveal";

const features = [
  {
    icon: Target,
    title: "Техника, которая работает",
    description: "Постановка руки, углы атаки, рычаги — разложено по полочкам",
  },
  {
    icon: Dumbbell,
    title: "Тренировки под армрестлинг",
    description: "Не качалка ради качалки, а упражнения для победы за столом",
  },
  {
    icon: Brain,
    title: "Тактика и фишки",
    description: "Старт, захват, психология — то, что отличает победителя",
  },
  {
    icon: RefreshCw,
    title: "Без травм и выгорания",
    description: "Как тренироваться стабильно и не убить локти через месяц",
  },
];

const modules = [
  "Основы биомеханики армрестлинга",
  "Техника «Верх» (Top Roll) — пошагово",
  "Техника «Крюк» (Hook) — когда и как",
  "Боковое давление — секрет силы",
  "Тренировка кисти и предплечья",
  "Программа на 4 недели",
  "Разбор типичных ошибок",
  "Восстановление и профилактика травм",
];

const includes = [
  { icon: Video, text: "Видео-разборы техники" },
  { icon: BookOpen, text: "Текстовые материалы" },
  { icon: MessageCircle, text: "Ответы на вопросы" },
];

const ProgramSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal();
  const { containerRef: cardsRef, visibleItems } = useStaggeredReveal(features.length, {
    staggerDelay: 120,
  });

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
          <span className="inline-block px-4 py-1 rounded-full bg-[hsl(150_70%_45%/0.15)] text-[hsl(150_70%_50%)] text-sm font-medium mb-4">
            Программа
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Перестань гуглить — <span className="text-gradient">начни побеждать</span>
          </h2>
          <p className="text-[hsl(0_0%_100%/0.6)] text-lg max-w-xl mx-auto">
            Всё, что нужно знать об армрестлинге, собрано в одном месте. Без воды, без «посмотри ещё 50 видео»
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 mb-12 items-stretch">
            {/* Left: Features */}
            <div className="relative h-full">
              <div className="absolute -inset-4 rounded-3xl bg-[hsl(150_70%_45%/0.03)] blur-2xl" />
              <div className="relative glass-strong rounded-3xl p-8 h-full flex flex-col">
                <h3 className="text-xl font-bold text-white mb-6">Что ты получишь</h3>
                <div ref={cardsRef} className="space-y-4 flex-1">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className={`stagger-item group flex gap-4 p-4 rounded-2xl bg-[hsl(0_0%_100%/0.05)] hover:bg-[hsl(0_0%_100%/0.08)] transition-all duration-300 ${
                        visibleItems[index] ? 'visible' : ''
                      }`}
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[hsl(150_70%_45%/0.2)] flex items-center justify-center group-hover:bg-[hsl(150_70%_45%/0.3)] group-hover:scale-110 transition-all duration-300">
                        <feature.icon className="text-[hsl(150_70%_50%)] group-hover:rotate-6 transition-transform duration-300" size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-[hsl(0_0%_100%/0.6)]">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Modules */}
            <div className="relative h-full">
              <div className="absolute -inset-4 rounded-3xl bg-[hsl(150_70%_45%/0.03)] blur-2xl" />
              <div className="relative glass-strong rounded-3xl p-8 h-full flex flex-col">
                <h3 className="text-xl font-bold text-white mb-6">Содержание программы</h3>
                <div className="grid gap-3 flex-1">
                  {modules.map((module, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-xl bg-[hsl(0_0%_100%/0.03)] hover:bg-[hsl(0_0%_100%/0.06)] transition-colors duration-200"
                    >
                      <div className="w-6 h-6 rounded-full bg-[hsl(150_70%_45%/0.2)] flex items-center justify-center flex-shrink-0">
                        <Check className="w-3.5 h-3.5 text-[hsl(150_70%_50%)]" />
                      </div>
                      <span className="text-[hsl(0_0%_100%/0.8)] text-sm">{module}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom: Price card */}
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute -inset-4 rounded-3xl bg-[hsl(150_70%_45%/0.08)] blur-2xl" />
            <div className="relative glass-strong rounded-3xl p-8 md:p-10 border border-[hsl(150_70%_45%/0.2)]">
              {/* What's included */}
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                {includes.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-[hsl(0_0%_100%/0.7)]">
                    <item.icon className="w-5 h-5 text-[hsl(150_70%_50%)]" />
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-[hsl(0_0%_100%/0.2)] to-transparent mb-8" />

              {/* Guarantee badge */}
              <div className="flex items-center justify-center gap-3 mb-8 p-4 rounded-2xl bg-[hsl(142_76%_36%/0.1)] border border-[hsl(142_76%_36%/0.2)]">
                <div className="w-10 h-10 rounded-full bg-[hsl(142_76%_36%/0.2)] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[hsl(142_76%_45%)]">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                    <path d="m9 12 2 2 4-4"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[hsl(142_76%_45%)] font-medium text-sm">3 дня на тест</p>
                  <p className="text-[hsl(0_0%_100%/0.5)] text-xs">Не зашло — верну деньги без вопросов</p>
                </div>
              </div>

              {/* Price and CTA */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <p className="text-[hsl(0_0%_100%/0.6)] text-sm mb-1">
                    Текст + видео в Telegram. Доступ навсегда.
                  </p>
                  <div className="flex items-baseline gap-2 justify-center md:justify-start">
                    <span className="text-5xl font-bold text-white">
                      1500₽
                    </span>
                    <span className="text-[hsl(0_0%_100%/0.5)]">
                      один раз
                    </span>
                  </div>
                </div>

                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-[hsl(150_70%_45%)] hover:bg-[hsl(150_70%_50%)] text-black font-semibold px-8 py-6 text-base shadow-[0_0_30px_hsl(150_70%_45%/0.4)] hover:shadow-[0_0_40px_hsl(150_70%_45%/0.6)] transition-all duration-300"
                >
                  <a
                    href="https://t.me/assistemiy?text=Хочу%20программу"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Забрать программу
                    <ArrowRight className="ml-2" size={20} />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator as divider */}
      <div className="relative py-12 md:py-16 flex flex-col items-center gap-2 text-[hsl(0_0%_100%/0.4)]">
        <span className="text-xs uppercase tracking-widest">Листай вниз</span>
        <div className="w-6 h-10 rounded-full border-2 border-current flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-current animate-bounce" />
        </div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(0_0%_100%/0.15)] to-transparent" />
    </section>
  );
};

export default ProgramSection;
