import React, { useCallback } from "react";
import {
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
  MessageCircle,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { COMMON_STYLES } from "./common-styles";
import { SOCIAL_LINKS } from "@/data/social";

const communityPoints = [
  "общение с сильными ребятами, практиками и такими же заряженными людьми",
  "вопросы по технике, тренировкам, ошибкам и ситуациям за столом",
  "обсуждения материалов, мыслей и движухи вокруг Базы Армтемия",
  "здоровый уровень адекватности: вход по заявкам, без анонимного шума",
];

const chatPreview = [
  {
    label: "technique",
    text: "Как понять, где ломается позиция — в кисти, плече или угле?",
  },
  {
    label: "training",
    text: "Разобрали подход к подсобке под топролл без бессмысленного добивания рук.",
  },
  {
    label: "table IQ",
    text: "Не просто сильнее тянуть, а быстрее читать, что происходит в захвате.",
  },
];

const CommunitySection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.18 });
  const prefersReducedMotion = useReducedMotion();

  const handleProductScroll = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      document
        .querySelector("#product")
        ?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
    },
    [prefersReducedMotion],
  );

  return (
    <section
      ref={sectionRef}
      id="community"
      className="relative overflow-hidden bg-[hsl(15_7%_9%)] py-12 sm:py-16 md:py-20 scroll-mt-[var(--header-offset)]"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[260px] w-[620px] -translate-x-1/2 rounded-full bg-[hsl(5_85%_60%/0.07)] blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[220px] w-[420px] rounded-full bg-[hsl(15_90%_50%/0.05)] blur-[120px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[hsl(5_85%_60%/0.22)] to-transparent" />
      </div>

      <div
        className={`relative container mx-auto px-4 sm:px-6 ${
          prefersReducedMotion
            ? "opacity-100"
            : `transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`
        }`}
      >
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border border-[hsl(15_5%_24%)] bg-[linear-gradient(135deg,hsl(15_8%_12%/0.92),hsl(15_8%_9%/0.96))] p-5 shadow-[0_24px_80px_hsl(0_0%_0%/0.26)] sm:p-7 md:p-8 lg:p-10">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[hsl(5_85%_60%/0.14)] blur-3xl" />
            <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-[hsl(15_90%_50%/0.08)] blur-3xl" />
            <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  "linear-gradient(hsl(5 85% 60%) 1px, transparent 1px), linear-gradient(90deg, hsl(5 85% 60%) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />

            <div className="relative z-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <span
                  className="mb-5 inline-flex items-center gap-2 rounded-full border border-[hsl(5_85%_60%/0.28)] bg-[hsl(5_85%_60%/0.10)] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[hsl(5_85%_60%)]"
                  style={COMMON_STYLES.satoshi}
                >
                  <LockKeyhole size={15} />
                  Вход по заявкам
                </span>

                <h2
                  className="mb-5 max-w-3xl text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl"
                  style={COMMON_STYLES.clashDisplay}
                >
                  Закрытый чат Армтемия для армрестлинг-комьюнити
                </h2>

                <p
                  className="mb-6 max-w-2xl text-base leading-relaxed text-[hsl(15_10%_74%)] sm:text-lg"
                  style={COMMON_STYLES.satoshi}
                >
                  Я собираю вокруг личного бренда живую среду для тех, кто хочет понимать борьбу глубже: техника, тренировки, разборы, вопросы, опыт сильных ребят и нормальное общение без пустого шума.
                </p>

                <div className="mb-7 grid gap-3 sm:grid-cols-2">
                  {communityPoints.map((point) => (
                    <div key={point} className="flex gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[hsl(5_85%_60%)]" />
                      <p
                        className="text-sm leading-relaxed text-[hsl(15_10%_72%)]"
                        style={COMMON_STYLES.satoshi}
                      >
                        {point}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href={SOCIAL_LINKS.telegramChat}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group inline-flex min-h-[48px] items-center justify-center rounded-full bg-[hsl(5_85%_60%)] px-6 py-3 text-sm font-black uppercase tracking-wider text-white shadow-[0_0_26px_hsl(5_85%_60%/0.28)] hover:bg-[hsl(5_95%_65%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(5_85%_60%)] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(15_7%_9%)] ${
                      prefersReducedMotion ? "" : "transition-all duration-300 hover:-translate-y-0.5"
                    }`}
                    style={COMMON_STYLES.satoshi}
                  >
                    Подать заявку в чат
                    <ArrowRight size={18} className={`ml-2 ${prefersReducedMotion ? "" : "group-hover:translate-x-1 transition-transform"}`} />
                  </a>

                  <a
                    href="#product"
                    onClick={handleProductScroll}
                    className={`inline-flex min-h-[48px] items-center justify-center rounded-full border border-[hsl(15_5%_30%)] px-6 py-3 text-sm font-bold uppercase tracking-wider text-[hsl(15_10%_84%)] hover:border-[hsl(5_85%_60%/0.55)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(5_85%_60%)] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(15_7%_9%)] ${
                      prefersReducedMotion ? "" : "transition-all duration-300"
                    }`}
                    style={COMMON_STYLES.satoshi}
                  >
                    Сначала посмотреть Базу
                  </a>
                </div>
              </div>

              <div className="rounded-[1.65rem] border border-[hsl(15_5%_24%)] bg-[hsl(15_8%_10%/0.92)] p-4 sm:p-5">
                <div className="mb-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[hsl(5_85%_60%/0.16)] text-[hsl(5_85%_60%)]">
                        <Users size={21} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white" style={COMMON_STYLES.satoshi}>
                          Armtemiy Community
                        </p>
                        <p className="text-xs text-[hsl(15_10%_56%)]" style={COMMON_STYLES.satoshi}>
                          закрытый чат • вход по заявкам
                        </p>
                      </div>
                    </div>
                    <ShieldCheck size={22} className="text-[hsl(5_85%_60%)]" />
                  </div>

                  <div className="space-y-3">
                    {chatPreview.map((item, index) => (
                      <div
                        key={item.label}
                        className="rounded-2xl border border-white/[0.06] bg-white/[0.045] p-4"
                        style={{ opacity: 1 - index * 0.08 }}
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-[hsl(5_85%_60%)]" />
                          <span
                            className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[hsl(5_85%_60%)]"
                            style={COMMON_STYLES.jetBrainsMono}
                          >
                            {item.label}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-[hsl(15_10%_72%)]" style={COMMON_STYLES.satoshi}>
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 rounded-2xl border border-[hsl(5_85%_60%/0.22)] bg-[hsl(5_85%_60%/0.08)] px-4 py-3">
                    <div className="flex items-center gap-2 text-[hsl(15_10%_80%)]">
                      <MessageCircle size={17} className="text-[hsl(5_85%_60%)] shrink-0" />
                      <span className="text-sm font-medium leading-snug" style={COMMON_STYLES.satoshi}>
                        Заявка вместо автоприёма
                      </span>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-[hsl(5_85%_60%)] shrink-0 self-start sm:self-center" style={COMMON_STYLES.satoshi}>
                      filter
                    </span>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MemoizedCommunitySection = React.memo(CommunitySection);
export default MemoizedCommunitySection;
