import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Brain, Users, Calculator, Crosshair, ArrowRight, Activity, BarChart3 } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { COMMON_STYLES } from "./common-styles";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

const ProgramSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal();

  return (
    <section
      id="lab"
      className="relative pt-20 pb-12 md:pt-28 md:pb-20 bg-[hsl(15_6%_8%)] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-[hsl(5_85%_60%/0.08)] blur-[200px]" />
        <div className="absolute bottom-0 right-0 w-[700px] h-[400px] rounded-full bg-[hsl(15_90%_50%/0.06)] blur-[180px]" />
      </div>
      
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
            Карманная лаборатория
          </h2>
          <p className="text-[hsl(15_10%_60%)] text-base sm:text-lg max-w-2xl mx-auto" style={COMMON_STYLES.satoshi}>
            Инструменты для диагностики и быстрых решений.
          </p>
        </div>

        <BentoGrid className="max-w-4xl mx-auto mb-12">
          <BentoGridItem
            title="Диагностический движок"
            description="5–7 вопросов и точный разбор, где теряется сила."
            header={<SkeletonOne />}
            icon={<Brain className="h-4 w-4 text-neutral-500" />}
            className="md:col-span-2"
            status="Рабочий"
            tone="ready"
          />
          <BentoGridItem
            title="Калькулятор периодизации"
            description="План на 4 недели для силы в базовых упражнениях."
            header={<SkeletonTwo />}
            icon={<Calculator className="h-4 w-4 text-neutral-500" />}
            className="md:col-span-1"
            status="Рабочий"
            tone="ready"
          />
          <BentoGridItem
            title="Поиск спарринг-партнёров"
            description="Подбор людей для практики рядом с тобой."
            header={<SkeletonThree />}
            icon={<Users className="h-4 w-4 text-neutral-500" />}
            className="md:col-span-1"
            status="В разработке"
            tone="soon"
          />
          <BentoGridItem
            title="Матрица контр-приёмов"
            description="Подсказки, чем отвечать на стили соперников."
            header={<SkeletonFour />}
            icon={<Crosshair className="h-4 w-4 text-neutral-500" />}
            className="md:col-span-2"
            status="В разработке"
            tone="soon"
          />
        </BentoGrid>

        <div className="text-center">
           <Button
            asChild
            size="lg"
            className="rounded-full bg-[hsl(5_85%_60%)] hover:bg-[hsl(5_95%_65%)] text-white font-semibold px-8 py-5 text-base shadow-[0_0_30px_hsl(5_85%_60%/0.4)] hover:shadow-[0_0_40px_hsl(5_85%_60%/0.6)] transition-all duration-300"
          >
            <a
              href="https://t.me/armtemiy_lab_bot"
              target="_blank"
              rel="noopener noreferrer"
            >
              Открыть Lab
              <ArrowRight className="ml-2" size={20} />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

const SkeletonOne = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-white/10 p-4 relative overflow-hidden">
     <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <Activity size={80} className="text-[hsl(5_85%_60%)]" />
     </div>
     <div className="z-10 space-y-2">
        <div className="h-2 w-1/2 bg-white/20 rounded-full" />
        <div className="h-2 w-3/4 bg-white/20 rounded-full" />
        <div className="h-2 w-1/3 bg-[hsl(5_85%_60%)] rounded-full" />
     </div>
  </div>
);

const SkeletonTwo = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-white/10 p-4 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 opacity-20">
        <BarChart3 size={60} className="text-white" />
      </div>
      <div className="z-10 text-2xl font-bold text-white font-mono">
        1RM: 45kg
      </div>
  </div>
);

const SkeletonThree = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-white/10 p-4 relative overflow-hidden">
    <div className="flex -space-x-2 overflow-hidden p-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-neutral-900 bg-white/20" />
      ))}
    </div>
  </div>
);

const SkeletonFour = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-white/10 p-4 relative overflow-hidden flex-col justify-end">
     <div className="flex gap-2">
        <div className="px-2 py-1 rounded bg-red-500/20 text-red-500 text-xs border border-red-500/30">Toproll</div>
        <div className="px-2 py-1 rounded bg-green-500/20 text-green-500 text-xs border border-green-500/30">Hook</div>
     </div>
  </div>
);

const MemoizedProgramSection = React.memo(ProgramSection);
export default MemoizedProgramSection;
