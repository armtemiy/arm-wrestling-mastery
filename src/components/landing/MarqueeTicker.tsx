import { useEffect, useRef, useState } from "react";

const MarqueeTicker = () => {
  const [scrollSpeed, setScrollSpeed] = useState(1);
  const targetSpeed = useRef(1);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    // Smooth interpolation towards target speed
    const animate = () => {
      setScrollSpeed((prev) => {
        const diff = targetSpeed.current - prev;
        // Smooth easing - move 8% towards target each frame
        if (Math.abs(diff) < 0.01) return targetSpeed.current;
        return prev + diff * 0.08;
      });
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollTimeout: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY);
      
      // Gentle speed increase - max 1.5x speed
      targetSpeed.current = Math.min(1 + scrollDelta * 0.008, 1.5);
      lastScrollY = currentScrollY;

      // Reset speed after scrolling stops
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        targetSpeed.current = 1;
      }, 200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  const items = [
    "АРМРЕСТЛИНГ",
    "ТУЛА", 
    "ТЕХНИКА",
    "СИЛА",
    "ТРЕНИРОВКИ",
  ];

  const animationDuration = 35 / scrollSpeed;

  return (
    <div className="w-full overflow-hidden bg-[hsl(0_0%_6%)] border-t border-b border-[hsl(0_0%_100%/0.05)] py-6 my-12 md:my-16">
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
