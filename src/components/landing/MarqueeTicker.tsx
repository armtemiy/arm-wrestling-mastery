import { COMMON_STYLES } from "./common-styles";

const MarqueeTicker = () => {
  const items = [
    { text: "СИЛА", emoji: "💪" },
    { text: "ТЕХНИКА", emoji: "🎯" },
    { text: "ПОБЕДА", emoji: "🏆" },
    { text: "НАБОР ОТКРЫТ", emoji: "🔥" },
    { text: "ТУЛА", emoji: "📍" },
    { text: "АРМРЕСТЛИНГ", emoji: "🤝" },
    { text: "РЕЗУЛЬТАТ", emoji: "⚡" },
  ];

  return (
    <div className="relative overflow-hidden bg-[hsl(15_8%_10%)]">
      {/* Diagonal stripe effect */}
      <div className="relative -rotate-2 scale-110 my-6">
        {/* Main gradient background with glow */}
        <div className="relative bg-gradient-to-r from-[hsl(5_85%_60%)] via-[hsl(15_90%_50%)] to-[hsl(5_85%_60%)] py-5 shadow-[0_0_80px_hsl(5_85%_60%/0.4)]">
          {/* Top edge highlight */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />

          {/* Animated marquee */}
          <div className="marquee-track flex">
            {[...Array(4)].map((_, setIndex) => (
              <div key={setIndex} className="flex shrink-0">
                {items.map((item, index) => (
                  <span
                    key={`${setIndex}-${index}`}
                    className="flex items-center mx-8 md:mx-12 text-sm md:text-base font-black uppercase tracking-[0.2em] text-white drop-shadow-sm"
                    style={COMMON_STYLES.satoshi}
                  >
                    <span className="mr-3 text-xl drop-shadow-lg">{item.emoji}</span>
                    {item.text}
                  </span>
                ))}
              </div>
            ))}
          </div>

          {/* Bottom edge highlight */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </div>

        {/* Shine effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine pointer-events-none" />
      </div>
    </div>
  );
};

export default MarqueeTicker;
