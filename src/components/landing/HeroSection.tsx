import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import Particles from "./Particles";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollProgress = Math.max(0, Math.min(1, -rect.top / (rect.height * 0.5)));
        setScrollY(scrollProgress);
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3D transform values based on scroll
  const rotateX = scrollY * 15; // Rotate up to 15 degrees
  const scale = 1 - scrollY * 0.1; // Scale down slightly
  const translateY = scrollY * 50; // Move up
  const opacity = 1 - scrollY * 0.5;

  return (
    <section 
      ref={containerRef}
      className="relative overflow-hidden min-h-screen flex items-center bg-[hsl(0_0%_6%)] pt-16"
      style={{ perspective: '1000px' }}
    >
      {/* Animated background layers */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(54,226,168,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(54,226,168,0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Radial gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#36E2A8] rounded-full blur-[200px] opacity-[0.07]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#36E2A8] rounded-full blur-[180px] opacity-[0.05]" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#36E2A8] rounded-full blur-[150px] opacity-[0.04]" />
      </div>

      {/* Animated particles */}
      <Particles />

      {/* Diagonal accent lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 right-0 w-[2px] h-[300px] bg-gradient-to-b from-[#36E2A8]/50 to-transparent"
          style={{ transform: 'rotate(-45deg) translateX(100px)' }}
        />
        <div 
          className="absolute bottom-0 left-0 w-[2px] h-[200px] bg-gradient-to-t from-[#36E2A8]/30 to-transparent"
          style={{ transform: 'rotate(-45deg) translateX(-50px)' }}
        />
      </div>

      {/* Main content with 3D scroll effect */}
      <div 
        className="relative container mx-auto px-4 transition-transform duration-100 ease-out"
        style={{
          transform: `rotateX(${rotateX}deg) scale(${scale}) translateY(${translateY}px)`,
          opacity: opacity,
          transformOrigin: 'center top',
        }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Main heading */}
          <div className="text-center mb-8 md:mb-10">
            <h1 
              className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <span className="block text-white mb-2">ВЫИГРЫВАЙ</span>
              <span className="block relative">
                <span 
                  className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#36E2A8] via-[#4FFFB0] to-[#36E2A8] animate-gradient-x"
                  style={{ 
                    backgroundSize: '200% 100%',
                  }}
                >
                  БОРЬБУ
                </span>
                {/* Animated underline */}
                <div 
                  className={`absolute -bottom-2 left-1/2 h-1.5 bg-gradient-to-r from-transparent via-[#36E2A8] to-transparent rounded-full transition-all duration-1000 delay-500 ${
                    isLoaded ? 'w-48 -translate-x-1/2 opacity-100' : 'w-0 -translate-x-1/2 opacity-0'
                  }`}
                  style={{
                    boxShadow: '0 0 20px rgba(54,226,168,0.5), 0 0 40px rgba(54,226,168,0.3)',
                  }}
                />
              </span>
            </h1>
            
            <p 
              className={`mt-6 text-2xl md:text-3xl text-white/40 font-light transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              а не надейся на удачу
            </p>
          </div>

          {/* Subheading */}
          <p 
            className={`text-center text-lg md:text-xl text-white/50 mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            Система тренировок и техники армрестлинга от практика.
            <br className="hidden md:block" />
            <span className="text-white/70">Без воды — только то, что работает.</span>
          </p>

          {/* CTA Buttons */}
          <div 
            className={`flex flex-col sm:flex-row items-center justify-center gap-5 transition-all duration-1000 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Primary CTA */}
            <div className="relative group">
              {/* Animated glow ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#36E2A8] via-[#4FFFB0] to-[#36E2A8] rounded-full blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-300 animate-pulse-slow" />
              
              <Button 
                asChild 
                className="relative bg-gradient-to-r from-[#36E2A8] to-[#2BC295] hover:from-[#2BC295] hover:to-[#36E2A8] text-black font-bold text-lg px-10 py-7 rounded-full shadow-[0_0_40px_rgba(54,226,168,0.3)] hover:shadow-[0_0_60px_rgba(54,226,168,0.5)] transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <a href="https://t.me/assistemiy?text=Хочу%20программу" target="_blank" rel="noopener noreferrer">
                  {/* Shine effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative flex items-center gap-2">
                    Хочу побеждать
                    <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
              </Button>
            </div>

            {/* Secondary CTA */}
            <Button
              variant="ghost"
              onClick={() => {
                const el = document.querySelector("#training");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group px-8 py-7 text-lg rounded-full text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#36E2A8]/50 transition-all duration-300 overflow-hidden relative"
            >
              {/* Hover glow */}
              <span className="absolute inset-0 bg-gradient-to-r from-[#36E2A8]/0 via-[#36E2A8]/5 to-[#36E2A8]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <MapPin size={18} className="mr-2 text-[#36E2A8]" />
              <span className="relative">Тренировки в Туле</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Floating elements for depth */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating orbs */}
        <div 
          className="absolute top-1/4 left-[10%] w-3 h-3 rounded-full bg-[#36E2A8]/30 animate-float"
          style={{ animationDelay: '0s' }}
        />
        <div 
          className="absolute top-1/3 right-[15%] w-2 h-2 rounded-full bg-[#36E2A8]/20 animate-float"
          style={{ animationDelay: '1s' }}
        />
        <div 
          className="absolute bottom-1/3 left-[20%] w-4 h-4 rounded-full bg-[#36E2A8]/15 animate-float"
          style={{ animationDelay: '2s' }}
        />
        <div 
          className="absolute bottom-1/4 right-[10%] w-2 h-2 rounded-full bg-[#36E2A8]/25 animate-float"
          style={{ animationDelay: '0.5s' }}
        />
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[hsl(0_0%_8%)] to-transparent pointer-events-none" />

      {/* CSS for animations */}
      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
