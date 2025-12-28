const MarqueeTicker = () => {
  const items = [
    "АРМРЕСТЛИНГ",
    "ТУЛА",
    "ТЕХНИКА",
    "СИЛА",
    "ТРЕНИРОВКИ",
  ];

  return (
    <div className="w-full overflow-hidden bg-[hsl(0_0%_6%)] border-t border-b border-[hsl(0_0%_100%/0.05)] py-6 my-12 md:my-16">
      <div className="marquee-track flex">
        {[...Array(4)].map((_, setIndex) => (
          <div key={setIndex} className="flex shrink-0">
            {items.map((item, index) => (
              <span
                key={`${setIndex}-${index}`}
                className="flex items-center mx-6 md:mx-10 text-sm md:text-base font-medium uppercase tracking-[0.2em] text-[hsl(0_0%_100%/0.4)]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[hsl(30_80%_55%/0.6)] mr-6 md:mr-10" />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeTicker;
