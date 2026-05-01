import React from "react";
import { ArrowRight, BookOpen, LockKeyhole, MessageCircle } from "lucide-react";
import { SOCIAL_LINKS } from "@/data/social";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import TerminalContactForm from "./TerminalContactForm";
import { COMMON_STYLES } from "./common-styles";

const CTASection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="contact"
      className="relative py-12 sm:py-16 md:py-24 lg:py-32 bg-[hsl(15_5%_10%)]"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[200px] sm:h-[300px] rounded-full bg-[hsl(5_85%_60%/0.1)] blur-[80px] sm:blur-[120px]" />
      </div>

      <div
        ref={sectionRef as React.RefObject<HTMLDivElement>}
        className={`relative container mx-auto px-4 sm:px-6 ${
          prefersReducedMotion
            ? "opacity-100"
            : `transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <span
              className="inline-block px-3 sm:px-4 py-2 rounded-full bg-[hsl(5_85%_60%/0.15)] text-[hsl(5_85%_60%)] text-xs sm:text-sm font-medium mb-4 sm:mb-6"
              style={COMMON_STYLES.satoshi}
            >
              ВЫБЕРИ ТОЧКУ ВХОДА
            </span>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4"
              style={COMMON_STYLES.clashDisplay}
            >
              Зайди в экосистему Armtemiy
            </h2>
            <p
              className="text-[hsl(15_10%_70%)] text-base sm:text-lg max-w-lg mx-auto leading-relaxed"
              style={COMMON_STYLES.satoshi}
            >
              База, крафтовая консультация или закрытый чат — выбери формат,
              который сейчас ближе. Если сомневаешься, просто напиши: разберём
              задачу без давления.
            </p>
          </div>

          <div className="mb-8 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: BookOpen,
                title: "База",
                text: "Система, материалы и приватный слой для глубокого понимания борьбы.",
                href: "#product",
                label: "Смотреть",
              },
              {
                icon: LockKeyhole,
                title: "Чат",
                text: "Комьюнити по заявкам: вопросы, обсуждения, опыт сильных ребят.",
                href: SOCIAL_LINKS.telegramChat,
                label: "Подать заявку",
                external: true,
              },
              {
                icon: MessageCircle,
                title: "Консультация",
                text: "Точная настройка под антропометрию, стиль, ограничения и цели.",
                href: "#consultations",
                label: "Выбрать",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.title}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  onClick={(event) => {
                    if (item.external) return;
                    event.preventDefault();
                    document
                      .querySelector(item.href)
                      ?.scrollIntoView({
                        behavior: prefersReducedMotion ? "auto" : "smooth",
                      });
                  }}
                  className={`group rounded-2xl border border-[hsl(15_5%_24%)] bg-[hsl(15_8%_12%/0.72)] p-5 text-left hover:border-[hsl(5_85%_60%/0.38)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(5_85%_60%)] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(15_5%_10%)] ${prefersReducedMotion ? "" : "transition-all duration-300 hover:-translate-y-1"}`}
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[hsl(5_85%_60%/0.13)] text-[hsl(5_85%_60%)]">
                    <Icon size={20} />
                  </div>
                  <h3
                    className="mb-2 text-lg font-bold text-white"
                    style={COMMON_STYLES.clashDisplay}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="mb-4 text-sm leading-relaxed text-[hsl(15_10%_66%)]"
                    style={COMMON_STYLES.satoshi}
                  >
                    {item.text}
                  </p>
                  <span
                    className="inline-flex items-center text-xs font-bold uppercase tracking-[0.18em] text-[hsl(5_85%_60%)]"
                    style={COMMON_STYLES.satoshi}
                  >
                    {item.label}
                    <ArrowRight
                      size={15}
                      className={`ml-2 ${prefersReducedMotion ? "" : "group-hover:translate-x-1 transition-transform"}`}
                    />
                  </span>
                </a>
              );
            })}
          </div>

          <TerminalContactForm />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(5_85%_60%/0.3)] to-transparent" />
    </section>
  );
};

const MemoizedCTASection = React.memo(CTASection);
export default MemoizedCTASection;
