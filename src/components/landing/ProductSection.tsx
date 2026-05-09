import React from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Compass,
  Layers3,
  LockKeyhole,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { COMMON_STYLES } from "./common-styles";
import {
  productAccessFormats,
  productOutcomes,
  productPillars,
  productRoadmap,
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
      className={`relative overflow-hidden rounded-3xl border p-5 sm:p-6 ${
        format.isPrimary
          ? "border-[hsl(5_85%_60%/0.42)] bg-[linear-gradient(135deg,hsl(5_85%_60%/0.15),hsl(15_8%_12%/0.96)_42%,hsl(15_8%_9%/0.98))] shadow-[0_22px_70px_hsl(0_0%_0%/0.28)]"
          : "border-[hsl(15_5%_24%)] bg-[hsl(15_8%_11%/0.84)]"
      } ${prefersReducedMotion ? "" : "transition-all duration-300 hover:-translate-y-1 hover:border-[hsl(5_85%_60%/0.45)]"}`}
    >
      {format.isPrimary && (
        <>
          <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[hsl(5_85%_60%/0.16)] blur-3xl" />
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[hsl(5_85%_60%/0.46)] to-transparent" />
        </>
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
            className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
              format.isPrimary
                ? "bg-[hsl(5_85%_60%)] text-white"
                : "bg-white/[0.06] text-[hsl(5_85%_60%)]"
            }`}
          >
            <Icon size={21} />
          </div>
        </div>

        <h3
          className="mb-3 text-xl font-bold text-white sm:text-2xl"
          style={COMMON_STYLES.clashDisplay}
        >
          {format.title}
        </h3>
        <p
          className="mb-6 text-sm leading-relaxed text-[hsl(15_10%_72%)] sm:text-base"
          style={COMMON_STYLES.satoshi}
        >
          {format.description}
        </p>
        <a
          href={format.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-auto inline-flex min-h-[46px] items-center justify-center rounded-full px-5 py-3 text-sm font-bold uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(5_85%_60%)] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(15_7%_9%)] ${
            format.isPrimary
              ? "bg-[hsl(5_85%_60%)] text-white shadow-[0_0_24px_hsl(5_85%_60%/0.28)] hover:bg-[hsl(5_95%_65%)]"
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

const ModuleCard = ({
  module,
  index,
  prefersReducedMotion,
}: ModuleCardProps) => {
  const formattedIndex = String(index).padStart(2, "0");

  return (
    <article
      className={`rounded-3xl border border-[hsl(15_5%_24%)] bg-[hsl(15_8%_11%/0.78)] p-5 ${
        prefersReducedMotion
          ? ""
          : "transition-all duration-300 hover:-translate-y-1 hover:border-[hsl(5_85%_60%/0.38)] hover:bg-[hsl(15_8%_12%/0.9)]"
      }`}
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[hsl(5_85%_60%/0.12)] text-xs font-bold text-[hsl(5_85%_60%)]"
          style={COMMON_STYLES.jetBrainsMono}
        >
          {formattedIndex}
        </div>
        <span className="h-px flex-1 bg-gradient-to-r from-[hsl(5_85%_60%/0.24)] to-transparent" />
      </div>
      <h3
        className="mb-2 text-lg font-bold text-white"
        style={COMMON_STYLES.clashDisplay}
      >
        {module.title}
      </h3>
      <p
        className="text-sm leading-relaxed text-[hsl(15_10%_66%)]"
        style={COMMON_STYLES.satoshi}
      >
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
        <div className="absolute left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-[hsl(5_85%_60%/0.075)] blur-[180px]" />
        <div className="absolute bottom-20 right-0 h-[320px] w-[520px] rounded-full bg-[hsl(15_90%_50%/0.045)] blur-[150px]" />
        <div
          className="absolute inset-0 opacity-[0.032]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(5 85% 60%) 1px, transparent 1px), linear-gradient(90deg, hsl(5 85% 60%) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
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
          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div>
              <span
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-[hsl(5_85%_60%/0.28)] bg-[hsl(5_85%_60%/0.10)] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[hsl(5_85%_60%)] sm:text-sm"
                style={COMMON_STYLES.satoshi}
              >
                <LockKeyhole size={15} />
                Закрытая база знаний
              </span>
              <h2
                className="mb-5 text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
                style={COMMON_STYLES.clashDisplay}
              >
                База Армтемия
              </h2>
              <p
                className="mb-4 max-w-3xl text-lg leading-relaxed text-[hsl(15_10%_80%)] sm:text-xl"
                style={COMMON_STYLES.satoshi}
              >
                Авторская система, материалы и закрытая среда для тех, кто хочет
                видеть армрестлинг глубже, чем набор приемов и случайных
                советов.
              </p>
              <p
                className="mb-6 max-w-3xl text-base leading-relaxed text-[hsl(15_10%_66%)] sm:text-lg"
                style={COMMON_STYLES.satoshi}
              >
                Ядро Базы — «Армрестлинг Релиз»: фундамент, который ведет от
                первопринципов и биомеханики к технике, контрам, переходам и
                самостоятельному чтению борьбы.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {productPillars.map((pillar) => (
                  <div
                    key={pillar}
                    className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.035] px-4 py-3"
                  >
                    <Sparkles
                      size={16}
                      className="shrink-0 text-[hsl(5_85%_60%)]"
                    />
                    <span
                      className="text-sm text-[hsl(15_10%_76%)]"
                      style={COMMON_STYLES.satoshi}
                    >
                      {pillar}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[1.85rem] border border-[hsl(5_85%_60%/0.26)] bg-[hsl(15_8%_10%/0.84)] p-3 shadow-[0_24px_90px_hsl(0_0%_0%/0.32)] sm:p-4">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[hsl(5_85%_60%/0.15)] blur-3xl" />
              <div className="relative z-10 rounded-[1.45rem] border border-white/[0.08] bg-black/20 p-5 sm:p-6">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <p
                      className="text-xs uppercase tracking-[0.22em] text-[hsl(5_85%_60%)]"
                      style={COMMON_STYLES.satoshi}
                    >
                      Ядро запуска
                    </p>
                    <p
                      className="mt-1 text-2xl font-bold text-white"
                      style={COMMON_STYLES.clashDisplay}
                    >
                      Армрестлинг Релиз
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(5_85%_60%/0.13)] text-[hsl(5_85%_60%)]">
                    <Layers3 size={28} />
                  </div>
                </div>

                <div className="mb-6 space-y-3">
                  {[
                    [
                      "01",
                      "Оптика",
                      "армрестлинг как система, а не набор фишек",
                    ],
                    [
                      "02",
                      "Биомеханика",
                      "векторы, углы, источники силы и опасные положения",
                    ],
                    [
                      "03",
                      "Техника",
                      "хук, топролл, пресс, стили и логика переходов",
                    ],
                    [
                      "04",
                      "Контры",
                      "как читать чужое решение и менять позицию",
                    ],
                  ].map(([index, title, description]) => (
                    <div
                      key={title}
                      className="grid grid-cols-[auto_1fr] gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.04] p-4"
                    >
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-[hsl(5_85%_60%/0.12)] text-xs font-bold text-[hsl(5_85%_60%)]"
                        style={COMMON_STYLES.jetBrainsMono}
                      >
                        {index}
                      </span>
                      <div>
                        <p
                          className="text-sm font-bold text-white"
                          style={COMMON_STYLES.satoshi}
                        >
                          {title}
                        </p>
                        <p
                          className="mt-1 text-sm leading-relaxed text-[hsl(15_10%_62%)]"
                          style={COMMON_STYLES.satoshi}
                        >
                          {description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-[hsl(5_85%_60%/0.22)] bg-[hsl(5_85%_60%/0.075)] p-4">
                  <div className="mb-2 flex items-center gap-2 text-[hsl(5_85%_60%)]">
                    <Compass size={17} />
                    <span
                      className="text-xs font-bold uppercase tracking-[0.18em]"
                      style={COMMON_STYLES.satoshi}
                    >
                      Главная идея
                    </span>
                  </div>
                  <p
                    className="text-sm leading-relaxed text-[hsl(15_10%_76%)]"
                    style={COMMON_STYLES.satoshi}
                  >
                    Не заучивать чужие шаблоны, а понимать, почему положение
                    работает, когда оно ломается и что делать дальше.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 sm:mt-16">
            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <h3
                  className="text-2xl font-bold text-white sm:text-3xl"
                  style={COMMON_STYLES.clashDisplay}
                >
                  Форматы доступа
                </h3>
                <p
                  className="mt-3 max-w-3xl text-sm leading-relaxed text-[hsl(15_10%_66%)] sm:text-base"
                  style={COMMON_STYLES.satoshi}
                >
                  Контентное ядро одинаковое. Разница в том, нужен ли тебе
                  только доступ к материалам или полноценный Telegram-слой с
                  комьюнити и прямым взаимодействием.
                </p>
              </div>
              <span
                className="w-fit rounded-full border border-[hsl(5_85%_60%/0.24)] bg-[hsl(5_85%_60%/0.08)] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[hsl(5_85%_60%)]"
                style={COMMON_STYLES.satoshi}
              >
                доступ через личку
              </span>
            </div>
            <div className="grid gap-4 md:grid-cols-2 md:gap-6">
              {productAccessFormats.map((format) => (
                <AccessCard
                  key={format.id}
                  format={format}
                  prefersReducedMotion={prefersReducedMotion}
                />
              ))}
            </div>
          </div>

          <div className="mt-12 sm:mt-16">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <h3
                  className="text-2xl font-bold text-white sm:text-3xl"
                  style={COMMON_STYLES.clashDisplay}
                >
                  Что внутри ядра
                </h3>
                <p
                  className="mt-3 max-w-3xl text-sm leading-relaxed text-[hsl(15_10%_66%)] sm:text-base"
                  style={COMMON_STYLES.satoshi}
                >
                  «Армрестлинг Релиз» — первый фундаментальный материал внутри
                  Базы и точка сборки всей методологии.
                </p>
              </div>
            </div>
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

          <div className="mt-12 grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div className="rounded-3xl border border-[hsl(15_5%_24%)] bg-[hsl(15_8%_11%/0.72)] p-5 sm:p-6">
              <h3
                className="mb-5 text-2xl font-bold text-white sm:text-3xl"
                style={COMMON_STYLES.clashDisplay}
              >
                Что меняется после Базы
              </h3>
              <div className="space-y-4">
                {productOutcomes.map((outcome) => (
                  <div key={outcome} className="flex gap-3">
                    <CheckCircle2
                      size={19}
                      className="mt-0.5 shrink-0 text-[hsl(5_85%_60%)]"
                    />
                    <p
                      className="text-sm leading-relaxed text-[hsl(15_10%_72%)] sm:text-base"
                      style={COMMON_STYLES.satoshi}
                    >
                      {outcome}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-[hsl(15_5%_24%)] bg-[hsl(15_8%_11%/0.72)] p-5 sm:p-6">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h3
                    className="text-2xl font-bold text-white sm:text-3xl"
                    style={COMMON_STYLES.clashDisplay}
                  >
                    База как живой продукт
                  </h3>
                  <p
                    className="mt-2 text-sm leading-relaxed text-[hsl(15_10%_66%)]"
                    style={COMMON_STYLES.satoshi}
                  >
                    Без фейковых скринов и отзывов: сейчас показываю честную
                    структуру развития продукта.
                  </p>
                </div>
                <ShieldCheck
                  className="hidden shrink-0 text-[hsl(5_85%_60%)] sm:block"
                  size={28}
                />
              </div>

              <div className="space-y-3">
                {productRoadmap.map((item, index) => (
                  <div
                    key={item.label}
                    className="grid grid-cols-[auto_1fr] gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.035] p-4"
                  >
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[hsl(5_85%_60%/0.12)] text-xs font-bold text-[hsl(5_85%_60%)]"
                      style={COMMON_STYLES.jetBrainsMono}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <p
                        className="text-xs font-bold uppercase tracking-[0.18em] text-[hsl(5_85%_60%)]"
                        style={COMMON_STYLES.satoshi}
                      >
                        {item.label}
                      </p>
                      <h4
                        className="mt-2 text-base font-bold text-white"
                        style={COMMON_STYLES.clashDisplay}
                      >
                        {item.title}
                      </h4>
                      <p
                        className="mt-2 text-sm leading-relaxed text-[hsl(15_10%_66%)]"
                        style={COMMON_STYLES.satoshi}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(5_85%_60%/0.28)] to-transparent" />
    </section>
  );
};

const MemoizedProductSection = React.memo(ProductSection);
export default MemoizedProductSection;
