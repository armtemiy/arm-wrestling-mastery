import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import Particles from "./Particles";
import { COMMON_STYLES } from "./common-styles";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleScroll = useCallback(() => {
    if (prefersReducedMotion) return;
    
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const scrollProgress = Math.max(0, Math.min(1, -rect.top / (rect.height * 0.5)));
      setScrollY(scrollProgress);
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    setIsLoaded(true);
    if (!prefersReducedMotion) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll, prefersReducedMotion]);

  const transformStyles = useMemo(() => {
    if (prefersReducedMotion) return {};
    
    const rotateX = scrollY * 15;
    const scale = 1 - scrollY * 0.1;
    const translateY = scrollY * 50;
    const opacity = 1 - scrollY * 0.5;

    return {
      transform: `rotateX(${rotateX}deg) scale(${scale}) translateY(${translateY}px)`,
      opacity: opacity,
      transformOrigin: 'center top' as const,
    };
  }, [scrollY, prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden min-h-[85svh] sm:min-h-[88svh] flex items-center bg-background pt-20 sm:pt-16 md:pt-12 pb-8 sm:pb-10"
      style={{ perspective: '1200px' }}
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] lg:w-[1200px] h-[400px] sm:h-[600px] lg:h-[800px] bg-primary rounded-full blur-[150px] sm:blur-[200px] lg:blur-[250px] opacity-[0.1]" />
        <div className="absolute bottom-0 right-0 w-[400px] sm:w-[600px] lg:w-[800px] h-[400px] sm:h-[600px] lg:h-[800px] bg-secondary rounded-full blur-[120px] sm:blur-[160px] lg:blur-[200px] opacity-[0.08]" />
      </div>

      {!prefersReducedMotion && <Particles />}

      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
        <div
          className="absolute top-0 right-1/4 w-[1px] h-[300px] md:h-[500px] bg-gradient-to-b from-primary/40 to-transparent"
          style={{ transform: 'rotate(-35deg)' }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[1px] h-[250px] md:h-[400px] bg-gradient-to-t from-secondary/30 to-transparent"
          style={{ transform: 'rotate(-35deg)' }}
        />
      </div>

      <div
        className="relative container mx-auto px-4 sm:px-6 transition-transform duration-100 ease-out"
        style={transformStyles}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h1
              className={`font-display text-[clamp(2rem,10vw,4.5rem)] sm:text-[clamp(3rem,8vw,5.5rem)] font-black leading-[0.9] tracking-tighter ${prefersReducedMotion ? '' : 'transition-all duration-1000 delay-200'} ${prefersReducedMotion || isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={COMMON_STYLES.clashDisplay}
            >
              <span className="block text-foreground mb-3 sm:mb-4">ВЫИГРЫВАЙ</span>
              <span className="block relative">
                <span
                  className={`relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary ${prefersReducedMotion ? '' : 'animate-gradient-x'} pb-2`}
                  style={{ backgroundSize: '200% 100%' }}
                >
                  БОРЬБУ
                </span>
                <div
                  className={`absolute -bottom-2 sm:-bottom-4 left-1/2 h-1.5 sm:h-2 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full blur-sm ${prefersReducedMotion ? '' : 'transition-all duration-1000 delay-500'} ${
                    prefersReducedMotion || isLoaded ? 'w-32 sm:w-48 md:w-64 -translate-x-1/2 opacity-80' : 'w-0 -translate-x-1/2 opacity-0'
                  }`}
                  style={{ boxShadow: '0 0 30px hsl(var(--primary)), 0 0 60px hsl(var(--secondary))' }}
                />
              </span>
            </h1>

            <p
              className={`text-center text-base sm:text-lg text-muted-foreground mt-6 sm:mt-8 mb-8 sm:mb-10 max-w-md sm:max-w-xl md:max-w-3xl mx-auto leading-relaxed px-2 ${prefersReducedMotion ? '' : 'transition-all duration-1000 delay-500'} ${prefersReducedMotion || isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={COMMON_STYLES.satoshi}
            >
              а не надейся на удачу
            </p>
          </div>

          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 px-4 sm:px-0 ${prefersReducedMotion ? '' : 'transition-all duration-1000 delay-600'} ${prefersReducedMotion || isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="relative group w-full xs:w-auto min-w-[200px] sm:min-w-0">
              <div className={`absolute -inset-1.5 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-40 ${prefersReducedMotion ? '' : 'group-hover:opacity-80 transition-opacity duration-500 animate-pulse-slow'}`} />
              <Button
                asChild
                className={`relative w-full sm:w-auto bg-gradient-to-br from-primary to-secondary hover:brightness-110 text-primary-foreground font-black text-base sm:text-lg px-6 sm:px-8 md:px-10 py-5 sm:py-6 rounded-full shadow-[0_0_20px_hsl(var(--primary)/0.3)] overflow-hidden min-h-[52px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${prefersReducedMotion ? '' : 'transition-all duration-300 hover:scale-105 active:scale-95'}`}
              >
                <a href="https://t.me/armtemiy_lab_bot" target="_blank" rel="noopener noreferrer">
                  <span className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent ${prefersReducedMotion ? 'translate-x-0 opacity-0' : '-translate-x-full group-hover:translate-x-full transition-transform duration-1000'}`} />
                  <span className="relative flex items-center justify-center gap-2 sm:gap-3">
                    СТАТЬ СИЛЬНЕЕ
                    <ArrowRight size={20} strokeWidth={3} className={prefersReducedMotion ? '' : 'group-hover:translate-x-2 transition-transform'} />
                  </span>
                </a>
              </Button>
            </div>

            <Button
              variant="ghost"
              onClick={() => document.querySelector("#training")?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" })}
              className={`group w-full xs:w-auto min-w-[200px] sm:min-w-0 min-h-[52px] px-6 sm:px-8 py-5 text-base font-bold rounded-full text-foreground/90 hover:text-foreground bg-white/8 border border-white/20 hover:border-primary/55 relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${prefersReducedMotion ? '' : 'transition-all duration-300'}`}
            >
              <span className={`absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 ${prefersReducedMotion ? 'opacity-0' : 'opacity-0 group-hover:opacity-100 transition-opacity'}`} />
              <MapPin size={18} className={`mr-2 sm:mr-2.5 text-primary ${prefersReducedMotion ? '' : 'group-hover:scale-110 transition-transform'}`} />
              <span className="relative">АРМ НА ДОМУ</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden sm:block">
        {!prefersReducedMotion && [0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/20 animate-float"
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

      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-36 bg-gradient-to-t from-background to-transparent pointer-events-none" />

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
        @media (prefers-reduced-motion: reduce) {
          .animate-gradient-x, .animate-float, .animate-pulse-slow {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

const MemoizedHeroSection = React.memo(HeroSection);
export default MemoizedHeroSection;
