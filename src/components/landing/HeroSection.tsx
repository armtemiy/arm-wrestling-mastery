import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
const HeroSection = () => {
  return <section className="relative min-h-screen hero-gradient overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="relative container mx-auto px-4 pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
            
            <span className="text-sm font-medium text-[hsl(var(--hero-foreground)/0.8)]">
              Армрестлинг • Тула
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[hsl(var(--hero-foreground))] leading-tight mb-6">
            Всё об армрестлинге —{" "}
            <span className="text-gradient">от техники до готовых программ</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-[hsl(var(--hero-foreground)/0.7)] max-w-2xl mx-auto mb-10">
            Систематизированные знания от топовых рукоборцев. Без воды, без
            догадок — только то, что работает
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button asChild variant="cta" size="xl" className="rounded-full shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.6)] transition-all">
              <a href="https://t.me/assistemiy?text=Хочу%20программу" target="_blank" rel="noopener noreferrer">
                Получить программу
                <ArrowRight className="ml-2" size={20} />
              </a>
            </Button>

            <Button variant="ghost-cta" onClick={() => {
            const el = document.querySelector("#training");
            el?.scrollIntoView({
              behavior: "smooth"
            });
          }} className="flex items-center gap-2 px-6 py-3 text-[hsl(var(--hero-foreground)/0.8)] hover:text-primary transition-all">
              <Play size={18} className="text-primary" />
              <span>Или запишись на тренировку</span>
            </Button>
          </div>

          {/* Hero image placeholder */}
          <div className="relative mx-auto max-w-3xl">
            <div className="aspect-video rounded-2xl glass-strong overflow-hidden">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[hsl(var(--hero-bg))] to-[hsl(220_20%_15%)]">
                <div className="text-center p-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <Play size={32} className="text-primary ml-1" />
                  </div>
                  <p className="text-[hsl(var(--hero-foreground)/0.5)] text-sm">
                    Здесь будет фото или видео
                  </p>
                </div>
              </div>
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl -z-10" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[hsl(var(--hero-foreground)/0.4)]">
        <span className="text-xs uppercase tracking-widest">Листай вниз</span>
        <div className="w-6 h-10 rounded-full border-2 border-current flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-current animate-bounce" />
        </div>
      </div>
    </section>;
};
export default HeroSection;