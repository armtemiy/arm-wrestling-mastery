import { COMMON_STYLES } from "./common-styles";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const MarqueeTicker = () => {
  const prefersReducedMotion = useReducedMotion();

  const items = [
    { text: "СИЛА", emoji: "💪" },
    { text: "ТЕХНИКА", emoji: "🎯" },
    { text: "ПОБЕДА", emoji: "🏆" },
    { text: "Armtemiy Lab", emoji: "🧪" },
    { text: "ТУЛА", emoji: "📍" },
    { text: "АРМРЕСТЛИНГ", emoji: "🤝" },
    { text: "РЕЗУЛЬТАТ", emoji: "⚡" },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-background" aria-hidden="true">
      <div className={`relative ${prefersReducedMotion ? 'py-4' : '-rotate-2 scale-[1.02] sm:scale-110 my-4 sm:my-6'}`}>
        <div className={`relative bg-gradient-to-r from-primary via-secondary to-primary py-4 sm:py-5 ${prefersReducedMotion ? '' : 'shadow-[0_0_40px_hsl(var(--primary)/0.3)] sm:shadow-[0_0_80px_hsl(var(--primary)/0.4)]'}`}>
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />

          {prefersReducedMotion ? (
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 px-4">
              {items.map((item, index) => (
                <span
                  key={`static-${index}`}
                  className="flex items-center text-xs sm:text-sm md:text-base font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white drop-shadow-sm"
                  style={COMMON_STYLES.satoshi}
                >
                  <span className="mr-2 sm:mr-3 text-base sm:text-xl drop-shadow-lg">{item.emoji}</span>
                  {item.text}
                </span>
              ))}
            </div>
          ) : (
            <div className="marquee-track flex will-change-transform">
              {[...Array(4)].map((_, setIndex) => (
                <div key={setIndex} className="flex shrink-0">
                  {items.map((item, index) => (
                    <span
                      key={`${setIndex}-${index}`}
                      className="flex items-center mx-4 sm:mx-8 md:mx-12 text-xs sm:text-sm md:text-base font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white drop-shadow-sm whitespace-nowrap"
                      style={COMMON_STYLES.satoshi}
                    >
                      <span className="mr-2 sm:mr-3 text-base sm:text-xl drop-shadow-lg">{item.emoji}</span>
                      {item.text}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </div>

        {!prefersReducedMotion && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine pointer-events-none" />
        )}
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none !important;
          }
          .animate-shine {
            animation: none !important;
          }
        }
        @media (max-width: 640px) {
          .marquee-track {
            animation-duration: 40s;
          }
        }
      `}</style>
    </div>
  );
};

export default MarqueeTicker;
