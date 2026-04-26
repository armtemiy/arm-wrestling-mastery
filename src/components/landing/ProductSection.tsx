import React from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Layers3,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { COMMON_STYLES } from "./common-styles";
import {
  productAccessFormats,
  productOutcomes,
  releaseModules,
  type AccessFormat,
  type ProductModule,
} from "@/data/product";

interface AccessCardProps {
  format: AccessFormat;
  prefersReducedMotion: boolean;
}

const AccessCard = ({ format, prefersReducedMotion }: AccessCardProps) => {
  const Icon = format.isPrimary ? MessageCircle : BookOpen;

  return (
    <article
      className={`relative overflow-hidden rounded-2xl border p-5 sm:p-6 ${
        format.isPrimary
          ? "border-[hsl(5_85%_60%/0.55)] bg-[linear-gradient(135deg,hsl(5_85%_60%/0.20),hsl(15_9%_13%/0.96)_44%,hsl(15_90%_50%/0.16))] shadow-[0_0_46px_hsl(5_85%_60%/0.20)]"
          : "border-[hsl(15_5%_24%)] bg-[hsl(15_8%_12%/0.88)]"
      } ${prefersReducedMotion ? "" : "transition-all duration-300 hover:-translate-y-1 hover:border-[hsl(5_85%_60%/0.6)]"}`}
    >
      {format.isPrimary && (
        <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[hsl(5_85%_60%/0.22)] blur-3xl" />
      )}
      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-5 flex items-center justify-between gap-4">
          <span
            className="text-xs font-bold uppercase tracking-[0.24em] text-[hsl(5_85%_60%)]"
            style={COMMON_STYLES.satoshi}
          >
            {format.label}
          </span>
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl ${
              format.isPrimary ? "bg-[hsl(5_85%_60%)] text-white" : "bg-white/8 text-[hsl(5_85%_60%)]"
            }`}
          >
            <Icon size={21} />
          </div>
        </div>
        <h3 className="mb-3 text-xl font-bold text-white sm:text-2xl" style={COMMON_STYLES.clashDisplay}>
          {format.title}
        </h3>
        <p className="mb-6 text-sm leading-relaxed text-[hsl(15_10%_72%)] sm:text-base" style={COMMON_STYLES.satoshi}>
          {format.description}
        </p>
        <a
          href={format.href}
          className={`mt-auto inline-flex min-h-[44px] items-center justify-center rounded-full px-5 py-3 text-sm font-bold uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(5_85%_60%)] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(15_7%_9%)] ${
            format.isPrimary
              ? "bg-[hsl(5_85%_60%)] text-white shadow-[0_0_28px_hsl(5_85%_60%/0.34)] hover:bg-[hsl(5_95%_65%)]"
              : "border border-[hsl(15_5%_30%)] text-[hsl(15_10%_88%)] hover:border-[hsl(5_85%_60%/0.55)] hover:text-white"
          } ${prefersReducedMotion ? "" : "transition-all duration-300"}`}
          style={COMMON_STYLES.satoshi}
        >
          {format.cta}
          <ArrowRight size={17} className="ml-2" />
        </a>
      </div>
    </article>
  );
};

interface ModuleCardProps {
  module: ProductModule;
  index: number;
  prefersReducedMotion: boolean;
}

const ModuleCard = ({ module, index, prefersReducedMotion }: ModuleCardProps) => {
  return (
    <article
      className={`rounded-2xl border border-[hsl(15_5%_24%)] bg-[hsl(15_8%_12%/0.78)] p-5 ${
        prefersReducedMotion ? "" : "transition-all duration-300 hover:-translate-y-1 hover:border-[hsl(5_85%_60%/0.45)]"
      }`}
    >
      <div
        className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(5_85%_60%/0.14)] text-sm font-bold text-[hsl(5_85%_60%)]"
        style={COMMON_STYLES.jetBrainsMono}
      >
        {index}
      </div>
      <h3 className="mb-2 text-lg font-bold text-white" style={COMMON_STYLES.clashDisplay}>
        {module.title}
      </h3>
      <p className="text-sm leading-relaxed text-[hsl(15_10%_66%)]" style={COMMON_STYLES.satoshi}>
        {module.description}
      </p>
    </article>
  );
};

const ProductSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      id="product"
      className="relative overflow-hidden bg-[hsl(15_7%_9%)] py-12 sm:py-16 md:py-24 lg:py-28 scroll-mt-[var(--header-offset)]"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-[hsl(5_85%_60%/0.10)] blur-[180px]" />
        <div className="absolute bottom-20 right-0 h-[320px] w-[520px] rounded-full bg-[hsl(15_90%_50%/0.07)] blur-[150px]" />
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(5 85% 60%) 1px, transparent 1px), linear-gradient(90deg, hsl(5 85% 60%) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div
        className={`relative container mx-auto px-4 sm:px-6 ${
          prefersReducedMotion
            ? "opacity-100"
            : `transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`
        }`}
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <span
                className="mb-5 inline-flex items-center gap-2 rounded-full bg-[hsl(5_85%_60%/0.15)] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[hsl(5_85%_60%)] sm:text-sm"
                style={COMMON_STYLES.satoshi}
              >
                <Sparkles size={15} />
                ОПРЕДЕЛЯЮЩИЙ ПРОДУКТ
              </span>
              <h2
                className="mb-5 text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
                style={COMMON_STYLES.clashDisplay}
              >
                База Армтемия
              </h2>
              <p
                className="mb-4 max-w-3xl text-lg leading-relaxed text-[hsl(15_10%_78%)] sm:text-xl"
                style={COMMON_STYLES.satoshi}
              >
                Закрытая база материалов и сообщество для тех, кто хочет понимать армрестлинг, а не собирать случайные советы по роликам.
              </p>
              <p
                className="mb-5 max-w-3xl text-base leading-relaxed text-[hsl(15_10%_66%)] sm:text-lg"
                style={COMMON_STYLES.satoshi}
              >
                Исток — «Армрестлинг Релиз»: фундаментальная система, которая ведет от первопринципов и биомеханики к технике, контрам и переходам.
              </p>
              <p
                className="max-w-3xl border-l-2 border-[hsl(5_85%_60%/0.65)] pl-4 text-sm leading-relaxed text-[hsl(15_10%_72%)] sm:text-base"
                style={COMMON_STYLES.satoshi}
              >
                Это не очередной набор шаблонов уровня «делай вот так и будет сила». Здесь ты получаешь инструмент анализа, чтобы видеть, что происходит за столом, откуда это берется и почему одно решение работает, а другое нет.
              </p>
            </div>

            <div className="relative rounded-2xl border border-[hsl(5_85%_60%/0.28)] bg-[hsl(15_8%_12%/0.78)] p-5 sm:p-6">
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[hsl(5_85%_60%/0.18)] blur-2xl" />
              <div className="relative z-10">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[hsl(5_85%_60%)]" style={COMMON_STYLES.satoshi}>
                      Ядро запуска
                    </p>
                    <p className="mt-1 text-2xl font-bold text-white" style={COMMON_STYLES.clashDisplay}>
                      Армрестлинг Релиз
                    </p>
                  </div>
                  <Layers3 className="text-[hsl(5_85%_60%)]" size={30} />
                </div>
                <div className="space-y-3">
                  {["Первопринципы", "Биомеханика", "Техники", "Контры и переходы"].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-xl bg-white/[0.045] px-4 py-3">
                      <CheckCircle2 size={18} className="shrink-0 text-[hsl(5_85%_60%)]" />
                      <span className="text-sm text-[hsl(15_10%_78%)]" style={COMMON_STYLES.satoshi}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 sm:mt-12">
            <p className="mb-5 max-w-3xl text-sm leading-relaxed text-[hsl(15_10%_66%)] sm:text-base" style={COMMON_STYLES.satoshi}>
              Контентное ядро одинаковое. Разница в том, что Telegram дает второй слой: живое сообщество и прямое взаимодействие.
            </p>
            <div className="grid gap-4 md:grid-cols-2 md:gap-6">
              {productAccessFormats.map((format) => (
                <AccessCard key={format.id} format={format} prefersReducedMotion={prefersReducedMotion} />
              ))}
            </div>
          </div>

          <div className="mt-12 sm:mt-16">
            <p className="mb-6 text-base leading-relaxed text-[hsl(15_10%_76%)] sm:text-lg" style={COMMON_STYLES.satoshi}>
              Первым материалом внутри Базы выходит «Армрестлинг Релиз» — авторский фундамент по армрестлингу.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {releaseModules.map((module, index) => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  index={index}
                  prefersReducedMotion={prefersReducedMotion}
                />
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <h3 className="mb-4 text-2xl font-bold text-white sm:text-3xl" style={COMMON_STYLES.clashDisplay}>
                Что ты получаешь на выходе
              </h3>
              <div className="space-y-3">
                {productOutcomes.map((outcome) => (
                  <div key={outcome} className="flex gap-3">
                    <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-[hsl(5_85%_60%)]" />
                    <p className="text-sm leading-relaxed text-[hsl(15_10%_72%)] sm:text-base" style={COMMON_STYLES.satoshi}>
                      {outcome}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[hsl(15_5%_24%)] bg-[hsl(15_8%_12%/0.72)] p-5 sm:p-6">
              <h3 className="mb-3 text-xl font-bold text-white" style={COMMON_STYLES.clashDisplay}>
                Что будет дальше в Базе
              </h3>
              <p className="mb-5 text-sm leading-relaxed text-[hsl(15_10%_70%)] sm:text-base" style={COMMON_STYLES.satoshi}>
                После ядра в Базе будут выходить материалы по нейротипологии, биохакингу, питанию, разбор техник всех упражнений, готовые программы и другое.
              </p>
              <div className="rounded-2xl border border-dashed border-[hsl(5_85%_60%/0.32)] bg-black/20 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[hsl(5_85%_60%)]" style={COMMON_STYLES.satoshi}>
                  Social proof
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[hsl(15_10%_62%)]" style={COMMON_STYLES.satoshi}>
                  Скрины модулей, интерфейса канала, топиков и структуры чата добавить после готовности материалов.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-[hsl(5_85%_60%/0.24)] bg-[hsl(5_85%_60%/0.08)] p-5 text-center sm:p-6">
            <p className="mx-auto max-w-3xl text-sm leading-relaxed text-[hsl(15_10%_78%)] sm:text-base" style={COMMON_STYLES.satoshi}>
              Если тебе нужна не база и не сообщество, а точная подгонка под твою антропометрию, инвентарь, стиль, ограничения и задачи — ниже крафтовые консультации.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(5_85%_60%/0.35)] to-transparent" />
    </section>
  );
};

const MemoizedProductSection = React.memo(ProductSection);
export default MemoizedProductSection;
