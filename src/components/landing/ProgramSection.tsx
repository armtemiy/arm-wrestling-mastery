import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Brain, Users, Calculator, Crosshair, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useStaggeredReveal } from "@/hooks/useStaggeredReveal";
import { COMMON_STYLES } from "./common-styles";

const highlights = [
  {
    icon: Brain,
    title: "Диагностический движок",
    description: "5–7 вопросов и чёткий разбор. Рабочий модуль",
  },
  {
    icon: Calculator,
    title: "Калькулятор периодизации",
    description: "План на 4 недели для силы в базовых упражнениях. Рабочий модуль",
  },
  {
    icon: Users,
    title: "Поиск спарринг-партнёров",
    description: "Подбор людей для практики рядом с тобой. В разработке",
  },
  {
    icon: Crosshair,
    title: "Матрица контр-приёмов",
    description: "Подсказки, чем отвечать на стили соперников. В разработке",
  },
];

const ProgramSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal();
  const { containerRef: cardsRef, visibleItems } = useStaggeredReveal(highlights.length, {
    staggerDelay: 120,
  });

  return (
    <section
      id="lab"
      className="relative pt-20 pb-10 md:pt-28 md:pb-16 bg-[hsl(15_6%_8%)]"
    >
      <div
        ref={sectionRef}
        className={`container mx-auto px-4 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[hsl(5_85%_60%/0.15)] text-[hsl(5_85%_60%)] text-sm font-medium mb-4" style={COMMON_STYLES.satoshi}>
            <Sparkles size={14} />
            Armtemiy Lab
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3" style={COMMON_STYLES.clashDisplay}>
            Карманная лаборатория армрестлера
          </h2>
          <p className="text-[hsl(15_10%_60%)] text-lg max-w-2xl mx-auto" style={COMMON_STYLES.satoshi}>
            Инструменты для диагностики и быстрых решений. Коротко, рационально, без воды.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-[hsl(5_85%_60%/0.04)] blur-2xl" />
            <div className="relative glass-strong rounded-3xl p-8 md:p-10 border border-[hsl(5_85%_60%/0.18)]">
              <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4" style={COMMON_STYLES.clashDisplay}>
                    Коротко о Lab
                  </h3>
                  <div ref={cardsRef} className="space-y-3">
                    {highlights.map((feature, index) => (
                      <div
                        key={index}
                        className={`stagger-item group flex gap-3 p-3 rounded-2xl bg-[hsl(15_5%_15%/0.55)] hover:bg-[hsl(15_5%_20%/0.8)] transition-all duration-300 ${
                          visibleItems[index] ? 'visible' : ''
                        }`}
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[hsl(5_85%_60%/0.2)] flex items-center justify-center group-hover:bg-[hsl(5_85%_60%/0.3)] group-hover:scale-110 transition-all duration-300">
                          <feature.icon className="text-[hsl(5_85%_60%)] group-hover:rotate-6 transition-transform duration-300" size={20} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-1" style={COMMON_STYLES.satoshi}>
                            {feature.title}
                          </h4>
                          <p className="text-sm text-[hsl(15_10%_60%)]" style={COMMON_STYLES.satoshi}>
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center md:text-left">
                  <p className="text-[hsl(15_10%_60%)] text-sm mb-3" style={COMMON_STYLES.satoshi}>
                    Telegram Mini App. Доступно на телефоне в пару кликов.
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full bg-[hsl(5_85%_60%)] hover:bg-[hsl(5_95%_65%)] text-white font-semibold px-8 py-6 text-base shadow-[0_0_30px_hsl(5_85%_60%/0.4)] hover:shadow-[0_0_40px_hsl(5_85%_60%/0.6)] transition-all duration-300"
                  >
                    <a
                      href="https://t.me/armtemiy_lab_bot"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Перейти в Lab
                      <ArrowRight className="ml-2" size={20} />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(15_5%_20%)] to-transparent" />
    </section>
  );
};

const MemoizedProgramSection = React.memo(ProgramSection);
export default MemoizedProgramSection;
