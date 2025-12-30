import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useEffect, useState, useRef } from "react";
import { Clock, Users, Shield, Zap } from "lucide-react";

const stats = [
  {
    value: 3,
    suffix: "+",
    label: "года в армрестлинге",
    description: "изучения техники и биомеханики",
    icon: Clock,
    color: "#36E2A8",
  },
  {
    value: 50,
    suffix: "+",
    label: "учеников",
    description: "прошли через тренировки",
    icon: Users,
    color: "#36E2A8",
  },
  {
    value: 100,
    suffix: "%",
    label: "возврат",
    description: "если не подойдёт за 3 дня",
    icon: Shield,
    color: "#36E2A8",
  },
  {
    value: 24,
    suffix: "/7",
    label: "доступ",
    description: "к материалам навсегда",
    icon: Zap,
    color: "#36E2A8",
  },
];

// Animated counter hook
const useCountUp = (end: number, duration: number = 2000, start: boolean = false) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      countRef.current = Math.floor(easeOutQuart * end);
      setCount(countRef.current);
      
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
      className="relative group"
      style={{ 
        transitionDelay: `${index * 150}ms`,
        animation: isVisible ? `statCardEnter 0.6s ease-out ${index * 0.15}s forwards` : 'none',
        opacity: 0,
      }}
    >
      {/* Glow effect behind card */}
      <div 
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{ background: `radial-gradient(circle, ${stat.color}20 0%, transparent 70%)` }}
      />
      
      {/* Card */}
      <div className="relative text-center p-8 rounded-3xl bg-gradient-to-br from-[hsl(0_0%_12%)] to-[hsl(0_0%_8%)] border border-[hsl(0_0%_100%/0.08)] hover:border-[hsl(150_70%_45%/0.4)] transition-all duration-500 overflow-hidden group-hover:scale-[1.02] group-hover:-translate-y-1">
        
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#36E2A8] rounded-full blur-[80px] opacity-10" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#36E2A8] rounded-full blur-[60px] opacity-10" />
        </div>
        
        {/* Top accent line with animation */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 rounded-full bg-gradient-to-r from-transparent via-[#36E2A8] to-transparent w-0 group-hover:w-20 transition-all duration-500" />
        
        {/* Icon with pulse */}
        <div className="relative mb-4 inline-flex">
          <div className="w-14 h-14 rounded-2xl bg-[#36E2A8]/10 flex items-center justify-center group-hover:bg-[#36E2A8]/20 transition-all duration-300">
            <Icon 
              className="text-[#36E2A8] group-hover:scale-110 transition-transform duration-300" 
              size={28} 
              strokeWidth={2}
            />
          </div>
          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-2xl border-2 border-[#36E2A8]/30 animate-ping opacity-0 group-hover:opacity-75" style={{ animationDuration: '2s' }} />
        </div>
        
        {/* Animated number */}
        <div className="relative mb-2">
          <span 
            className="text-5xl md:text-6xl font-black tabular-nums"
            style={{ 
              color: stat.color,
              textShadow: `0 0 40px ${stat.color}40`,
            }}
          >
            {count}
          </span>
          <span 
            className="text-4xl md:text-5xl font-bold"
            style={{ color: stat.color }}
          >
            {stat.suffix}
          </span>
        </div>
        
        {/* Label */}
        <div className="text-white font-semibold text-lg mb-1 group-hover:text-[#36E2A8] transition-colors duration-300">
          {stat.label}
        </div>
        
        {/* Description */}
        <div className="text-[hsl(0_0%_100%/0.5)] text-sm group-hover:text-[hsl(0_0%_100%/0.7)] transition-colors duration-300">
          {stat.description}
        </div>
        
        {/* Bottom shine effect */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#36E2A8]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
  );
};

const StatsSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal();

  return (
    <section className="relative py-20 md:py-24 bg-[hsl(0_0%_8%)] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-[#36E2A8] rounded-full blur-[150px] opacity-[0.03]" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-[#36E2A8] rounded-full blur-[150px] opacity-[0.03]" />
      </div>
      
      <div 
        ref={sectionRef}
        className="container mx-auto px-4"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(0_0%_100%/0.1)] to-transparent" />
      
      {/* CSS for card entrance animation */}
      <style>{`
        @keyframes statCardEnter {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
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
