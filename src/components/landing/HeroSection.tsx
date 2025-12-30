import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import Particles from "./Particles";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative overflow-hidden h-screen flex items-center bg-[hsl(0_0%_6%)] pt-16">
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

      <div className="relative container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Main heading */}
          <div className="text-center mb-8 md:mb-10">
            <h1 
              className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <span className="block text-white mb-2">ВЫИГРЫВАЙ</span>
              <span className="block relative">
                <span 
                  className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#36E2A8] via-[#4FFFB0] to-[#36E2A8]"
                  style={{ 
                    textShadow: '0 0 80px rgba(54,226,168,0.5)',
                  }}
                >
                  БОРЬБУ
                </span>
                {/* Underline accent */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 h-1.5 bg-gradient-to-r from-transparent via-[#36E2A8] to-transparent rounded-full" />
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
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#36E2A8] to-[#2BC295] rounded-full blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-300" />
              
              <Button 
                asChild 
                className="relative bg-gradient-to-r from-[#36E2A8] to-[#2BC295] hover:from-[#2BC295] hover:to-[#36E2A8] text-black font-bold text-lg px-10 py-7 rounded-full shadow-[0_0_40px_rgba(54,226,168,0.3)] hover:shadow-[0_0_60px_rgba(54,226,168,0.5)] transition-all duration-300 hover:scale-105"
              >
                <a href="https://t.me/assistemiy?text=Хочу%20программу" target="_blank" rel="noopener noreferrer">
                  <span className="flex items-center gap-2">
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
              className="group px-8 py-7 text-lg rounded-full text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#36E2A8]/50 transition-all duration-300"
            >
              <MapPin size={18} className="mr-2 text-[#36E2A8]" />
              Тренировки в Туле
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[hsl(0_0%_8%)] to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
