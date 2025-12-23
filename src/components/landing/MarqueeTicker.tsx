const MarqueeTicker = () => {
  const items = [
    "АРМРЕСТЛИНГ",
    "ТУЛА",
    "ТЕХНИКА",
    "ТРЕНИРОВКИ",
    "РЕЗУЛЬТАТ",
    "АРМРЕСТЛИНГ",
    "ТУЛА",
    "ТЕХНИКА",
    "ТРЕНИРОВКИ",
    "РЕЗУЛЬТАТ",
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden bg-white py-4">
      <div className="marquee-container flex whitespace-nowrap">
        <div className="marquee-content flex animate-marquee">
          {items.map((item, index) => (
            <span
              key={index}
              className="mx-8 text-2xl md:text-3xl font-bold text-[hsl(0_0%_12%)] uppercase tracking-wider flex items-center"
            >
              {item}
              <span className="mx-8 text-[hsl(30_80%_55%)]">✦</span>
            </span>
          ))}
        </div>
        <div className="marquee-content flex animate-marquee" aria-hidden="true">
          {items.map((item, index) => (
            <span
              key={`dup-${index}`}
              className="mx-8 text-2xl md:text-3xl font-bold text-[hsl(0_0%_12%)] uppercase tracking-wider flex items-center"
            >
              {item}
              <span className="mx-8 text-[hsl(30_80%_55%)]">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarqueeTicker;
