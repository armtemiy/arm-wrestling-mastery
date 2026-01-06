import { Button } from "@/components/ui/button";
import { Target, Dumbbell, Brain, RefreshCw, ArrowRight, Check, Video, BookOpen, MessageCircle } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useStaggeredReveal } from "@/hooks/useStaggeredReveal";

const features = [
  {
    icon: Target,
    title: "БИОМЕХАНИКА РУКИ",
    description: "Углы атаки, рычаги, точки давления — анатомия победы",
  },
  {
    icon: Dumbbell,
    title: "ТРЕНИРОВКА ПОД АРМРЕСТЛИНГ",
    description: "Не качалка — упражнения для силы за столом",
  },
  {
    icon: Brain,
    title: "ТАКТИКА И ПСИХОЛОГИЯ",
    description: "Старт, захват, чтение соперника — ментальная игра",
  },
  {
    icon: RefreshCw,
    title: "ПРОФИЛАКТИКА ТРАВМ",
    description: "Тренируйся стабильно, не убивая локти",
  },
];

const modules = [
  "Биомеханика армрестлинга",
  "Top Roll — пошаговая техника",
  "Hook — когда и как применять",
  "Боковое давление — секрет силы",
  "Тренировка кисти и предплечья",
  "4-недельная программа",
  "Разбор ошибок новичков",
  "Восстановление и питание",
];

const includes = [
  { icon: Video, text: "Видео-разборы" },
  { icon: BookOpen, text: "Текстовые материалы" },
  { icon: MessageCircle, text: "Вопрос-ответ" },
];

const ProgramSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal();
  const { containerRef: cardsRef, visibleItems } = useStaggeredReveal(features.length, {
    staggerDelay: 100,
  });

  return (
    <section
      id="program"
      className="relative py-20 md:py-28 bg-metal-800 bg-noise overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.03]" />

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-rust-600 opacity-20" />

      <div
        ref={sectionRef}
        className={`container mx-auto px-4 relative transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-metal-900 border border-rust-600 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-rust-600 animate-pulse" />
            <span className="font-mono text-xs text-rust-500 uppercase tracking-widest">
              Программа
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-metal-50 mb-4" style={{ textShadow: '3px 3px 0 hsl(24 98% 32%)' }}>
            ЧТО ПОЛУЧИШЬ
          </h2>
          <p className="font-body text-lg md:text-xl text-metal-400 max-w-2xl mx-auto">
            Система армрестлинга без лишней теории. Только практика, которая даёт результат за столом.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main content grid - asymmetric */}
          <div className="grid lg:grid-cols-12 gap-6 mb-8">
            {/* Features - 7 cols */}
            <div className="lg:col-span-7">
              <div className="bg-metal-900 border-2 border-metal-700 p-6 shadow-brutal-sm h-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-mono text-sm text-rust-500 uppercase tracking-widest">
                    // Модули системы
                  </h3>
                  <div className="font-mono text-xs text-metal-600">
                    04 UNITS
                  </div>
                </div>
                <div ref={cardsRef} className="space-y-3">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className={`stagger-item group border-l-2 border-metal-700 pl-4 py-2 hover:border-rust-600 transition-all duration-300 ${
                        visibleItems[index] ? 'visible' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-metal-800 border border-metal-600 flex items-center justify-center flex-shrink-0 group-hover:bg-rust-600 group-hover:border-rust-600 transition-all duration-300">
                          <feature.icon className="text-metal-300 group-hover:text-metal-900" size={18} />
                        </div>
                        <div>
                          <h4 className="font-body font-semibold text-metal-200 mb-1 group-hover:text-rust-500 transition-colors">
                            {feature.title}
                          </h4>
                          <p className="font-body text-sm text-metal-500">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modules list - 5 cols */}
            <div className="lg:col-span-5">
              <div className="bg-metal-900 border-2 border-metal-700 p-6 shadow-brutal-sm h-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-mono text-sm text-rust-500 uppercase tracking-widest">
                    // Содержание
                  </h3>
                  <div className="font-mono text-xs text-metal-600">
                    08 ITEMS
                  </div>
                </div>
                <div className="space-y-2">
                  {modules.map((module, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 py-2 px-3 bg-metal-800 border border-metal-700 hover:border-rust-600 transition-all duration-200"
                    >
                      <div className="w-5 h-5 bg-metal-900 border border-metal-600 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-rust-600" />
                      </div>
                      <span className="font-body text-sm text-metal-300">
                        {module}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Price card - brutal CTA */}
          <div className="bg-metal-900 border-3 border-rust-600 p-8 md:p-10 shadow-brutal-lg relative">
            {/* Corner decoration */}
            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-rust-500" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-rust-500" />

            {/* What's included */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {includes.map((item, index) => (
                <div key={index} className="flex items-center gap-2 font-mono text-sm text-metal-400">
                  <item.icon className="w-4 h-4 text-rust-600" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-metal-700 mb-8" />

            {/* Guarantee badge */}
            <div className="flex items-center justify-center gap-4 mb-8 p-4 bg-metal-800 border border-metal-700 max-w-md mx-auto">
              <div className="w-10 h-10 bg-rust-600 border border-rust-700 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-metal-900">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
              </div>
              <div className="text-left">
                <p className="font-mono text-xs text-rust-500 font-bold uppercase">3 дня на тест</p>
                <p className="font-body text-sm text-metal-400">Не зашло — верну деньги без вопросов</p>
              </div>
            </div>

            {/* Price and CTA */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="text-center lg:text-left">
                <p className="font-mono text-xs text-metal-500 mb-2">
                  Telegram • Доступ навсегда
                </p>
                <div className="flex items-baseline gap-2 justify-center lg:justify-start">
                  <span className="font-display text-5xl text-metal-50" style={{ textShadow: '2px 2px 0 hsl(24 98% 32%)' }}>
                    1500₽
                  </span>
                  <span className="font-mono text-sm text-metal-500">
                    / ОДИН РАЗ
                  </span>
                </div>
              </div>

              <a
                href="https://t.me/assistemiy?text=Хочу%20программу"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-10 py-6 bg-rust-600 text-metal-50 font-body font-bold text-lg uppercase tracking-wide border-none rounded-sm shadow-brutal hover:bg-rust-500 hover:shadow-brutal-lg hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200"
              >
                <span>Забрать систему</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-metal-800 via-rust-600 to-metal-800" />
    </section>
  );
};

export default ProgramSection;
