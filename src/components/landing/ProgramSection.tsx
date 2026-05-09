import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Users,
  Calculator,
  Crosshair,
  ArrowRight,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { COMMON_STYLES } from "./common-styles";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  programCards,
  type ProgramIconKey,
  type ProgramPreviewKey,
} from "@/data/program";

function SkeletonTwo() {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-white/10 p-4 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 opacity-20">
        <BarChart3 size={60} className="text-white" />
      </div>
      <div className="z-10 text-2xl font-bold text-white font-mono">
        1RM: 45kg
      </div>
    </div>
  );
}

function SkeletonThree() {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-white/10 p-4 relative overflow-hidden">
      <div className="flex -space-x-2 overflow-hidden p-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="inline-block h-8 w-8 rounded-full ring-2 ring-neutral-900 bg-white/20"
          />
        ))}
      </div>
    </div>
  );
}

function SkeletonFour() {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-white/10 p-4 relative overflow-hidden flex-col justify-end">
      <div className="flex gap-2">
        <div className="px-2 py-1 rounded bg-red-500/20 text-red-500 text-xs border border-red-500/30">
          Toproll
        </div>
        <div className="px-2 py-1 rounded bg-green-500/20 text-green-500 text-xs border border-green-500/30">
          Hook
        </div>
      </div>
    </div>
  );
}

const programIconMap = {
  calculator: Calculator,
  users: Users,
  crosshair: Crosshair,
} satisfies Record<ProgramIconKey, LucideIcon>;

const programPreviewMap = {
  partners: SkeletonThree,
  periodization: SkeletonTwo,
  counterMoves: SkeletonFour,
} satisfies Record<ProgramPreviewKey, React.ComponentType>;

const ProgramSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="lab"
      className="relative py-12 md:py-20 lg:py-28 bg-[hsl(15_6%_8%)] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-[hsl(5_85%_60%/0.08)] blur-[200px]" />
        <div className="absolute bottom-0 right-0 w-[700px] h-[400px] rounded-full bg-[hsl(15_90%_50%/0.06)] blur-[180px]" />
      </div>

      <div
        ref={sectionRef as React.RefObject<HTMLDivElement>}
        className={`container mx-auto px-4 ${prefersReducedMotion ? "" : "transition-all duration-700"} ${
          prefersReducedMotion || isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center mb-8 md:mb-12">
          <span
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[hsl(5_85%_60%/0.15)] text-[hsl(5_85%_60%)] text-sm font-medium mb-4"
            style={COMMON_STYLES.satoshi}
          >
            <Sparkles size={14} />
            ВСПОМОГАТЕЛЬНЫЕ ИНСТРУМЕНТЫ
          </span>
          <h2
            className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3"
            style={COMMON_STYLES.clashDisplay}
          >
            Лаборатория Армтемия
          </h2>
          <p
            className="text-[hsl(15_10%_60%)] text-base sm:text-lg max-w-2xl mx-auto"
            style={COMMON_STYLES.satoshi}
          >
            Бесплатный Telegram Mini App через @armtemiy_lab_bot. Спарринг-профиль,
            поиск партнёров рядом и вспомогательные инструменты для практики.
          </p>
        </div>

        <BentoGrid className="max-w-4xl mx-auto mb-8 md:mb-12">
          {programCards.map((card) => {
            const Icon = programIconMap[card.icon];
            const Preview = programPreviewMap[card.preview];

            return (
              <BentoGridItem
                key={card.id}
                title={card.title}
                description={card.description}
                header={<Preview />}
                icon={<Icon className="h-4 w-4 text-neutral-500" />}
                className={card.className}
                status={card.status}
                tone={card.tone}
              />
            );
          })}
        </BentoGrid>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            className={`min-h-[48px] min-w-[48px] w-full sm:w-auto rounded-full bg-[hsl(5_85%_60%)] hover:bg-[hsl(5_95%_65%)] text-white font-semibold px-6 sm:px-8 py-4 sm:py-5 text-base shadow-[0_0_30px_hsl(5_85%_60%/0.4)] hover:shadow-[0_0_40px_hsl(5_85%_60%/0.6)] ${prefersReducedMotion ? "" : "transition-all duration-300"}`}
          >
            <a
              href="https://t.me/armtemiy_lab_bot"
              target="_blank"
              rel="noopener noreferrer"
            >
              ОТКРЫТЬ LAB
              <ArrowRight className="ml-2" size={20} />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

const MemoizedProgramSection = React.memo(ProgramSection);
export default MemoizedProgramSection;
