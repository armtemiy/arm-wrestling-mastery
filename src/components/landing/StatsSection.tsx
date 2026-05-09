import React from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useEffect, useState, useRef } from "react";
import { Clock, Users, Shield, Zap } from "lucide-react";
import { COMMON_STYLES } from "./common-styles";

const stats = [
  {
    value: 3,
    suffix: "+",
    label: "ГОДА В АРМЕ",
    description: "изучения техники, захвата и биомеханики",
    icon: Clock,
  },
  {
    value: 50,
    suffix: "+",
    label: "УЧЕНИКОВ",
    description: "получили разбор и ориентиры",
    icon: Users,
  },
  {
    value: 4,
    suffix: "",
    label: "БЛОКА ЯДРА",
    description: "оптика, биомеханика, техники и контры",
    icon: Shield,
  },
  {
    value: 24,
    suffix: "/7",
    label: "ФОРМАТ",
    description: "материалы, чат и личная траектория",
    icon: Zap,
  },
];

const useCountUp = (
  end: number,
  duration: number = 2000,
  start: boolean = false,
  skipAnimation: boolean = false,
) => {
  const [count, setCount] = useState(skipAnimation ? end : 0);
  const countRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (skipAnimation) {
      setCount(end);
      return;
    }

    if (!start) {
      countRef.current = 0;
      startTimeRef.current = null;
      setCount(0);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = Math.min(
        (timestamp - startTimeRef.current) / duration,
        1,
      );
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      countRef.current = Math.floor(easeOutQuart * end);
      setCount(countRef.current);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [end, duration, start, skipAnimation]);

  return count;
};

const StatCard = ({
  stat,
  index,
  isVisible,
  prefersReducedMotion,
}: {
  stat: (typeof stats)[0];
  index: number;
  isVisible: boolean;
  prefersReducedMotion: boolean;
}) => {
  const count = useCountUp(stat.value, 2000, isVisible, prefersReducedMotion);
  const Icon = stat.icon;

  return (
    <div
      className={prefersReducedMotion ? "opacity-100" : "opacity-0"}
      style={{
        animation: prefersReducedMotion
          ? "none"
          : isVisible
            ? `statCardEnter 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.1}s forwards`
            : "none",
      }}
    >
      <div
        className={`relative h-full flex flex-col items-center p-5 sm:p-6 md:p-8 rounded-xl bg-[hsl(15_8%_8%)] border border-[hsl(15_8%_15%)] overflow-hidden ${prefersReducedMotion ? "" : "transition-all duration-500 group-hover:border-[hsl(5_85%_60%)]/50 group-hover:shadow-[0_0_50px_-12px_rgba(239,68,68,0.3)] group-hover:-translate-y-2"}`}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-b from-[hsl(5_85%_60%)]/5 to-transparent ${prefersReducedMotion ? "opacity-0" : "opacity-0 group-hover:opacity-100 transition-opacity duration-500"}`}
        />

        <div className="relative mb-4 sm:mb-6">
          <div
            className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg bg-[hsl(5_85%_60%)]/10 flex items-center justify-center border border-[hsl(5_85%_60%)]/20 ${prefersReducedMotion ? "" : "group-hover:scale-110 group-hover:bg-[hsl(5_85%_60%)]/20 transition-all duration-500"}`}
          >
            <Icon
              className="text-[hsl(5_85%_60%)] w-6 h-6 sm:w-7 sm:h-7"
              strokeWidth={1.5}
            />
          </div>
          <div
            className={`absolute -inset-1 rounded-lg bg-[hsl(5_85%_60%)]/20 blur ${prefersReducedMotion ? "opacity-0" : "opacity-0 group-hover:opacity-100 transition-opacity duration-500"}`}
          />
        </div>

        <div
          className="relative flex items-baseline gap-0.5 sm:gap-1 mb-2"
          style={COMMON_STYLES.clashDisplay}
        >
          <span
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white tabular-nums ${prefersReducedMotion ? "" : "drop-shadow-[0_0_15px_rgba(239,68,68,0.3)] group-hover:text-[hsl(5_85%_60%)] transition-colors duration-500"}`}
          >
            {count}
          </span>
          <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[hsl(5_85%_60%)]">
            {stat.suffix}
          </span>
        </div>

        <div
          className="text-white text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] mb-2 sm:mb-3 opacity-90"
          style={COMMON_STYLES.clashDisplay}
        >
          {stat.label}
        </div>

        <div
          className={`text-[hsl(15_8%_60%)] text-xs sm:text-sm font-medium uppercase tracking-wider text-center max-w-[140px] sm:max-w-[160px] leading-relaxed ${prefersReducedMotion ? "" : "group-hover:text-white transition-colors duration-500"}`}
          style={COMMON_STYLES.satoshi}
        >
          {stat.description}
        </div>

        <div
          className={`absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[hsl(5_85%_60%)] to-transparent ${prefersReducedMotion ? "opacity-0" : "opacity-0 group-hover:opacity-100 transition-opacity duration-500"}`}
        />
      </div>
    </div>
  );
};

const StatsSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-[hsl(15_8%_6%)]">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute top-1/2 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[hsl(5_85%_60%)]/4 rounded-full blur-[80px] sm:blur-[120px] ${prefersReducedMotion ? "" : "animate-pulse"}`}
        />
      </div>

      <div
        ref={sectionRef as React.RefObject<HTMLDivElement>}
        className="container mx-auto px-4 sm:px-6 relative z-10"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="group">
              <StatCard
                stat={stat}
                index={index}
                isVisible={isVisible}
                prefersReducedMotion={prefersReducedMotion}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes statCardEnter {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes statCardEnter {
            from { opacity: 1; transform: none; }
            to { opacity: 1; transform: none; }
          }
        }
      `}</style>
    </section>
  );
};

const MemoizedStatsSection = React.memo(StatsSection);
export default MemoizedStatsSection;
