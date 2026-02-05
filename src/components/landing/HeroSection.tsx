import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { EnergyButton } from "@/components/ui/energy-button";
import { ArrowRight, MapPin } from "lucide-react";
import Particles from "./Particles";
import { COMMON_STYLES } from "./common-styles";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const scrollProgress = Math.max(0, Math.min(1, -rect.top / (rect.height * 0.5)));
      setScrollY(scrollProgress);
    }
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // 3D transform values based on scroll - useMemo for optimization
  const transformStyles = useMemo(() => {
    const rotateX = scrollY * 15;
    const scale = 1 - scrollY * 0.1;
    const translateY = scrollY * 50;
    const opacity = 1 - scrollY * 0.5;

    return {
      transform: `rotateX(${rotateX}deg) scale(${scale}) translateY(${translateY}px)`,
      opacity: opacity,
      transformOrigin: 'center top' as const,
    };
  }, [scrollY]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden h-screen flex items-center justify-center bg-[hsl(15_8%_6%)] pt-20"
      style={{ perspective: '1200px' }}
    >
      {/* Cinematic atmosphere */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(hsl(5_85%_60%) 1px, transparent 1px), linear-gradient(90deg, hsl(5_85%_60%) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-[hsl(5_85%_60%)] rounded-full blur-[250px] opacity-[0.1]" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[hsl(15_90%_50%)] rounded-full blur-[200px] opacity-[0.08]" />
      </div>

      <Particles />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 right-1/4 w-[1px] h-[500px] bg-gradient-to-b from-[hsl(5_85%_60%)]/40 to-transparent"
          style={{ transform: 'rotate(-35deg)' }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[1px] h-[400px] bg-gradient-to-t from-[hsl(15_90%_50%)]/30 to-transparent"
          style={{ transform: 'rotate(-35deg)' }}
        />
      </div>

      <div
        className="relative container mx-auto px-4 transition-transform duration-100 ease-out"
        style={transformStyles}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <h1
              className={`font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={COMMON_STYLES.clashDisplay}
            >
              <span className="block text-white mb-2 md:mb-3">ВЫИГРЫВАЙ</span>
              <span className="block relative">
                <span
                  className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[hsl(5_85%_60%)] via-[hsl(15_90%_50%)] to-[hsl(5_85%_60%)] animate-gradient-x"
                  style={{ backgroundSize: '200% 100%' }}
                >
                  БОРЬБУ
                </span>
                <div
                  className={`absolute -bottom-3 left-1/2 h-1.5 bg-gradient-to-r from-transparent via-[hsl(5_85%_60%)] to-transparent rounded-full transition-all duration-1000 delay-500 ${
                    isLoaded ? 'w-48 -translate-x-1/2 opacity-100' : 'w-0 -translate-x-1/2 opacity-0'
                  }`}
                  style={{ boxShadow: '0 0 30px hsl(5_85%_60%), 0 0 60px hsl(15_90%_50%)' }}
                />
              </span>
            </h1>

            <p
              className={`mt-8 md:mt-12 text-xl md:text-2xl text-white/40 font-light italic tracking-tight transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={COMMON_STYLES.satoshi}
            >
              а не надейся на удачу
            </p>
          </div>

          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-5 md:gap-7 transition-all duration-1000 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[hsl(5_85%_60%)] to-[hsl(15_90%_50%)] rounded-full blur-xl opacity-40 group-hover:opacity-80 transition-opacity duration-500 animate-pulse-slow" />
              <Button
                asChild
                className="relative bg-gradient-to-br from-[hsl(5_85%_60%)] to-[hsl(15_90%_50%)] hover:brightness-110 text-white font-black text-lg md:text-xl px-10 py-6 md:px-12 md:py-7 rounded-full shadow-[0_0_50px_rgba(235,68,54,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
              >
                <a href="https://t.me/armtemiy_lab_bot" target="_blank" rel="noopener noreferrer">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <span className="relative flex items-center gap-2 md:gap-3">
                    СТАТЬ СИЛЬНЕЕ
                    <ArrowRight size={22} strokeWidth={3} className="group-hover:translate-x-2 transition-transform" />
                  </span>
                </a>
              </Button>
            </div>

            <EnergyButton
              onClick={() => document.querySelector("#training")?.scrollIntoView({ behavior: "smooth" })}
              icon={<MapPin size={18} className="text-[hsl(5_85%_60%)]" />}
              className="text-sm md:text-base px-10 py-5"
            >
              АРМ НА ДОМУ
            </EnergyButton>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[hsl(5_85%_60%)]/20 animate-float"
            style={{
              width: `${8 + i * 4}px`,
              height: `${8 + i * 4}px`,
              top: `${20 + i * 15}%`,
              left: `${10 + i * 20}%`,
              animationDelay: `${i * 0.8}s`,
              filter: 'blur(4px)',
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x { animation: gradient-x 4s ease infinite; }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-30px) rotate(10deg); opacity: 0.5; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.05); opacity: 0.6; }
        }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

const MemoizedHeroSection = React.memo(HeroSection);
export default MemoizedHeroSection;
