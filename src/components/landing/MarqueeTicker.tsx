import { useEffect, useRef, useState } from "react";

const MarqueeTicker = () => {
  const [scrollSpeed, setScrollSpeed] = useState(1);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);
      
      // Increase speed based on scroll velocity
      const newSpeed = Math.min(1 + scrollDelta * 0.05, 5);
      setScrollSpeed(newSpeed);
      
      lastScrollY.current = currentScrollY;

      // Reset speed after scrolling stops
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = setTimeout(() => {
        setScrollSpeed(1);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  const items = [
    "АРМРЕСТЛИНГ",
    "ТУЛА", 
    "ТЕХНИКА",
    "СИЛА",
    "ТРЕНИРОВКИ",
  ];

  const animationDuration = 30 / scrollSpeed;

  return (
    <div className="w-full overflow-hidden bg-[hsl(0_0%_6%)] border-t border-b border-[hsl(0_0%_100%/0.05)] py-5">
      <div 
        className="flex whitespace-nowrap"
        style={{
          animation: `marquee ${animationDuration}s linear infinite`,
        }}
      >
        {[...Array(3)].map((_, setIndex) => (
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
