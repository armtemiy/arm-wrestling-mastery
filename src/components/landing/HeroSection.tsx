import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import Particles from "./Particles";
import { useParallax } from "@/hooks/useParallax";
import MarqueeTicker from "./MarqueeTicker";

const HeroSection = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const glowParallax = useParallax(glowRef, { speed: 0.08, direction: "down" });

  return (
    <section className="relative hero-gradient overflow-hidden flex flex-col">
      {/* Animated particles */}
      <Particles />
      
      {/* Background decoration - subtle glow effects with parallax */}
      <div 
        ref={glowRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ transform: `translateY(${glowParallax}px)` }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-[hsl(25_70%_45%/0.12)] blur-[150px]" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-[hsl(25_60%_50%/0.08)] blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[hsl(25_50%_40%/0.06)] blur-[80px]" />
      </div>

      <div className="relative container mx-auto px-4 pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-4xl mx-auto text-center">

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Всё об армрестлинге —{" "}
            <span className="text-gradient">от техники до готовых программ</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-[hsl(0_0%_100%/0.7)] max-w-2xl mx-auto mb-10">
            Систематизированные знания от топовых рукоборцев. Без воды, без
            догадок — только то, что работает
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button asChild variant="cta" size="xl" className="rounded-full">
              <a href="https://t.me/assistemiy?text=Хочу%20программу" target="_blank" rel="noopener noreferrer">
                Получить программу
                <ArrowRight className="ml-2" size={20} />
              </a>
            </Button>

            <Button 
              variant="ghost-cta" 
              onClick={() => {
                const el = document.querySelector("#training");
                el?.scrollIntoView({ behavior: "smooth" });
              }} 
              className="group flex items-center gap-2 px-6 py-3 text-[hsl(0_0%_100%/0.8)] hover:text-white transition-all border border-[hsl(0_0%_100%/0.15)] rounded-full hover:border-[hsl(30_80%_60%/0.5)] hover:shadow-[0_0_20px_hsl(30_80%_60%/0.2)]"
            >
              <Play size={18} className="text-[hsl(30_80%_60%)] group-hover:scale-110 transition-transform" />
              <span>Или запишись на тренировку</span>
            </Button>
          </div>

          {/* Hero image placeholder - NO parallax */}
          <div className="relative mx-auto max-w-3xl">
            <div className="aspect-video rounded-2xl glass-strong overflow-hidden">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[hsl(0_0%_8%)] to-[hsl(0_0%_15%)]">
                <div className="text-center p-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[hsl(30_80%_60%/0.2)] flex items-center justify-center">
                    <Play size={32} className="text-[hsl(30_80%_60%)] ml-1" />
                  </div>
                  <p className="text-[hsl(0_0%_100%/0.5)] text-sm">
                    Здесь будет фото или видео
                  </p>
                </div>
              </div>
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-4 rounded-3xl bg-[hsl(30_80%_60%/0.1)] blur-2xl -z-10" />
          </div>
        </div>
      </div>

      {/* Marquee ticker as divider between hero and next section */}
      <MarqueeTicker />
    </section>
  );
};

export default HeroSection;
