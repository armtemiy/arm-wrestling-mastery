import { useEffect, useState, useRef } from "react";
import { ArrowRight, MapPin } from "lucide-react";

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

  const translateY = scrollY * 30;
  const opacity = 1 - scrollY * 0.3;

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center bg-metal-900 bg-noise overflow-hidden"
      style={{ opacity, transform: `translateY(${translateY}px)` }}
    >
      {/* Industrial background layers */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid opacity-[0.05]" />

        {/* Diagonal rust gradient mesh */}
        <div className="absolute inset-0 bg-mesh-rust opacity-50" />

        {/* Industrial stripe overlay */}
        <div className="absolute inset-0 diagonal-stripe opacity-[0.03]" />
      </div>

      {/* Corner accent decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-4 border-t-4 border-rust-600 opacity-40" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-4 border-b-4 border-rust-600 opacity-40" />
      <div className="absolute top-1/4 right-16 w-2 h-2 rounded-full bg-rust-600 animate-pulse-aggressive" />
      <div className="absolute bottom-1/3 left-16 w-3 h-3 rounded-full bg-rust-600 animate-pulse-subtle" style={{ animationDelay: '1s' }} />

      {/* Main content - Grid-breaking asymmetric layout */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          {/* Left column - Main headline (spans 8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Status badge */}
            <div
              className={`inline-flex items-center gap-3 px-4 py-2 bg-metal-800 border-2 border-rust-600 rounded-sm transition-all duration-500 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <div className="w-2 h-2 rounded-full bg-rust-600 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-metal-300">
                Набор открыт • Тула
              </span>
            </div>

            {/* Main headline - Anton display font */}
            <h1
              className={`font-display text-6xl sm:text-7xl md:text-8xl lg:text-display-md leading-none tracking-tight transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: '200ms',
                color: 'hsl(var(--metal-50))',
                textShadow: '4px 4px 0 hsl(24 98% 32%)',
              }}
            >
              СИСТЕМА
              <br />
              <span className="text-rust-500">АРМРЕСТЛИНГА</span>
            </h1>

            {/* Subheadline - Industrial brutal copy */}
            <p
              className={`font-body text-xl md:text-2xl text-metal-400 max-w-2xl leading-relaxed transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              Биомеханика. Техника. Сила.
              <br />
              <span className="text-metal-300 font-semibold">Без воды — только то, что ломает руку соперника.</span>
            </p>

            {/* CTA Buttons - Brutal styling */}
            <div
              className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4 transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              {/* Primary CTA - Brutal button */}
              <a
                href="https://t.me/assistemiy?text=Хочу%20программу"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-5 bg-rust-600 text-metal-50 font-body font-bold text-lg uppercase tracking-wide border-none rounded-sm shadow-brutal hover:shadow-brutal-lg transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Забрать систему
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </a>

              {/* Secondary CTA - Outline button */}
              <button
                onClick={() => {
                  const el = document.querySelector("#training");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-5 bg-transparent text-metal-300 font-body font-bold text-lg uppercase tracking-wide border-3 border-metal-600 rounded-sm hover:border-rust-600 hover:text-rust-500 transition-all duration-200"
              >
                <MapPin size={18} className="text-rust-600" />
                <span>Тренировки в Туле</span>
              </button>
            </div>
          </div>

          {/* Right column - Technical specs (spans 4 cols) */}
          <div
            className={`hidden lg:block lg:col-span-4 space-y-4 transition-all duration-700 delay-500 ${
              isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            {/* Technical data card */}
            <div className="bg-metal-800 border-2 border-metal-700 p-6 shadow-brutal-sm">
              <div className="font-mono text-xs text-rust-500 uppercase tracking-widest mb-4">
                // Технические данные
              </div>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex justify-between items-center border-b border-metal-700 pb-2">
                  <span className="text-metal-400">FORMAT:</span>
                  <span className="text-metal-200">Telegram</span>
                </div>
                <div className="flex justify-between items-center border-b border-metal-700 pb-2">
                  <span className="text-metal-400">ACCESS:</span>
                  <span className="text-metal-200">Lifetime</span>
                </div>
                <div className="flex justify-between items-center border-b border-metal-700 pb-2">
                  <span className="text-metal-400">LANGUAGE:</span>
                  <span className="text-metal-200">RU / EN</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-metal-400">PRICE:</span>
                  <span className="text-rust-500 font-bold">1500₽</span>
                </div>
              </div>
            </div>

            {/* Module count */}
            <div className="bg-rust-600 border-2 border-rust-700 p-4 shadow-brutal-sm">
              <div className="text-metal-900 font-mono text-sm font-bold">
                8 MODULES
              </div>
              <div className="text-metal-800 font-mono text-xs mt-1">
                From biomechanics to pro
              </div>
            </div>
          </div>
        </div>

        {/* Bottom scrolling indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-metal-500">
          <span className="font-mono text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 rounded-sm border-2 border-current flex justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-current animate-bounce" />
          </div>
        </div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-rust-600 via-rust-500 to-rust-600" />

      {/* Inline animations for unique effects */}
      <style>{`
        @keyframes brutalPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        .animate-pulse {
          animation: brutalPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
