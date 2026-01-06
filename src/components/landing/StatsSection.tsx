import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useEffect, useState, useRef } from "react";
import { Clock, Users, Shield, Zap } from "lucide-react";

const stats = [
  {
    value: 3,
    suffix: "+",
    label: "ГОДА АРМРЕСТЛИНГА",
    description: "Изучения биомеханики и техники",
    icon: Clock,
    color: "rust",
  },
  {
    value: 50,
    suffix: "+",
    label: "УЧЕНИКОВ",
    description: "Прошли через систему",
    icon: Users,
    color: "rust",
  },
  {
    value: 100,
    suffix: "%",
    label: "ВОЗВРАТ",
    description: "Гарантия 3 дня",
    icon: Shield,
    color: "rust",
  },
  {
    value: 24,
    suffix: "/7",
    label: "ДОСТУП",
    description: "Навсегда после покупки",
    icon: Zap,
    color: "rust",
  },
];

// Animated counter hook
const useCountUp = (end: number, duration: number = 2000, start: boolean = false) => {
  const [count, setCount] = useState(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);

      // Mechanical easing - more aggressive
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
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
      className="group"
      style={{
        animation: isVisible ? `statCardEnter 0.5s cubic-bezier(0.08, 0.74, 0.34, 1) ${index * 0.1}s forwards` : 'none',
        opacity: 0,
      }}
    >
      {/* Brutal card with offset border effect */}
      <div className="relative bg-metal-800 border-2 border-metal-700 p-6 shadow-brutal-sm group-hover:border-rust-600 transition-all duration-300 group-hover:-translate-y-1 group-hover:-translate-x-1 group-hover:shadow-brutal">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-metal-700 group-hover:bg-rust-600 transition-colors duration-300" />

        {/* Icon */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-metal-900 border border-metal-600 flex items-center justify-center group-hover:bg-rust-600 group-hover:border-rust-600 transition-all duration-300">
            <Icon className="text-metal-300 group-hover:text-metal-900 transition-colors duration-300" size={24} strokeWidth={2} />
          </div>
          <div className="font-mono text-xs text-metal-500">
            0{index + 1}
          </div>
        </div>

        {/* Number */}
        <div className="mb-2">
          <span className="font-display text-5xl md:text-6xl text-metal-50" style={{ textShadow: '2px 2px 0 hsl(24 98% 32%)' }}>
            {count}
          </span>
          <span className="font-display text-3xl md:text-4xl text-rust-500">
            {stat.suffix}
          </span>
        </div>

        {/* Label */}
        <div className="font-mono text-sm text-rust-500 font-bold tracking-wider mb-1">
          {stat.label}
        </div>

        {/* Description */}
        <div className="font-body text-sm text-metal-400">
          {stat.description}
        </div>
      </div>
    </div>
  );
};

const StatsSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal();

  return (
    <section className="relative py-20 md:py-24 bg-metal-900 bg-noise overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.03]" />

      <div
        ref={sectionRef}
        className="container mx-auto px-4 relative"
      >
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-metal-800 border border-metal-700 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-rust-600 animate-pulse" />
            <span className="font-mono text-xs text-metal-400 uppercase tracking-widest">
              Цифры
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-metal-50" style={{ textShadow: '2px 2px 0 hsl(24 98% 32%)' }}>
            МЕТРИКИ СИСТЕМЫ
          </h2>
        </div>

        {/* Stats grid - brutal layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              stat={stat}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>

      {/* Section divider - brutal line */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-metal-800 via-rust-600 to-metal-800" />

      {/* Animation keyframes */}
      <style>{`
        @keyframes statCardEnter {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  );
};

export default StatsSection;
