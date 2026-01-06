const MarqueeTicker = () => {
  const items = [
    { text: "СИЛА", label: "STRENGTH" },
    { text: "ТЕХНИКА", label: "TECHNIQUE" },
    { text: "ПОБЕДА", label: "VICTORY" },
    { text: "НАБОР ОТКРЫТ", label: "OPEN" },
    { text: "ТУЛА", label: "TULA" },
    { text: "АРМРЕСТЛИНГ", label: "ARMWRESTLING" },
    { text: "РЕЗУЛЬТАТ", label: "RESULTS" },
    { text: "BIOMECHANICS", label: "БИОМЕХАНИКА" },
  ];

  return (
    <div className="relative overflow-hidden bg-rust-600">
      {/* Brutal marquee with rust background */}
      <div className="py-6 relative">
        {/* Marquee track */}
        <div className="marquee-track flex">
          {[...Array(4)].map((_, setIndex) => (
            <div key={setIndex} className="flex shrink-0">
              {items.map((item, index) => (
                <div
                  key={`${setIndex}-${index}`}
                  className="flex items-center gap-6 mx-8 md:mx-16"
                >
                  <span className="font-display text-2xl md:text-3xl text-metal-900 uppercase tracking-wider">
                    {item.text}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-metal-900" />
                  <span className="font-mono text-xs md:text-sm text-metal-800 uppercase tracking-widest">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Top and bottom brutal borders */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-metal-900" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-metal-900" />
      </div>
    </div>
  );
};

export default MarqueeTicker;
