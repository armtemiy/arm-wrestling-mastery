import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useEffect, useState, useRef } from "react";
import { Clock, Users, Shield, Zap } from "lucide-react";
import { COMMON_STYLES } from "./common-styles";

const stats = [
  {
    value: 3,
    suffix: "+",
    label: "ГОДА В АРМЕ",
    description: "изучения техники и биомеханики",
    icon: Clock,
  },
  {
    value: 50,
    suffix: "+",
    label: "УЧЕНИКОВ",
    description: "прошли авторскую программу",
    icon: Users,
  },
  {
    value: 100,
    suffix: "%",
    label: "РЕЗУЛЬТАТ",
    description: "гарантия прогресса или возврат",
    icon: Shield,
  },
  {
    value: 24,
    suffix: "/7",
    label: "ДОСТУП",
    description: "пожизненное владение базой",
    icon: Zap,
  },
];

const useCountUp = (end: number, duration: number = 2000, start: boolean = false) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      countRef.current = Math.floor(easeOutQuart * end);
      setCount(countRef.current);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, start]);

  return count;
};

const StatCard = ({ stat, index, isVisible }: { stat: typeof stats[0], index: number, isVisible: boolean }) => {
  const count = useCountUp(stat.value, 2000, isVisible);
  const Icon = stat.icon;

  return (
    <div
      className="relative group opacity-0"
      style={{
        animation: isVisible ? `statCardEnter 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.1}s forwards` : 'none',
      }}
    >
      <div className="relative h-full flex flex-col items-center p-8 rounded-xl bg-[hsl(15_8%_8%)] border border-[hsl(15_8%_15%)] transition-all duration-500 overflow-hidden group-hover:border-[hsl(5_85%_60%)]/50 group-hover:shadow-[0_0_50px_-12px_rgba(239,68,68,0.3)] group-hover:-translate-y-2">
        {/* Background Forge Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(5_85%_60%)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Powerful Icon Base */}
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-lg bg-[hsl(5_85%_60%)]/10 flex items-center justify-center border border-[hsl(5_85%_60%)]/20 group-hover:scale-110 group-hover:bg-[hsl(5_85%_60%)]/20 transition-all duration-500">
            <Icon className="text-[hsl(5_85%_60%)]" size={28} strokeWidth={1.5} />
          </div>
          <div className="absolute -inset-1 rounded-lg bg-[hsl(5_85%_60%)]/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Glowing Number */}
        <div className="relative flex items-baseline gap-1 mb-2" style={COMMON_STYLES.clashDisplay}>
          <span className="text-6xl md:text-7xl font-bold tracking-tight text-white tabular-nums drop-shadow-[0_0_15px_rgba(239,68,68,0.3)] group-hover:text-[hsl(5_85%_60%)] transition-colors duration-500">
            {count}
          </span>
          <span className="text-3xl md:text-4xl font-bold text-[hsl(5_85%_60%)]">
            {stat.suffix}
          </span>
        </div>

        <div className="text-white text-sm tracking-[0.2em] mb-3 opacity-90" style={COMMON_STYLES.clashDisplay}>
          {stat.label}
        </div>

        <div className="text-[hsl(15_8%_60%)] text-xs font-medium uppercase tracking-wider text-center max-w-[140px] leading-relaxed group-hover:text-white transition-colors duration-500" style={COMMON_STYLES.satoshi}>
          {stat.description}
        </div>

        {/* Vertical Accent Line */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[hsl(5_85%_60%)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
  );
};

const StatsSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal();

  return (
    <section className="relative py-24 bg-[hsl(15_8%_6%)] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[hsl(5_85%_60%)]/5 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div ref={sectionRef} className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes statCardEnter {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default StatsSection;
