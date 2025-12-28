import { useEffect, useRef, useState } from "react";

interface UseStaggeredRevealOptions {
  threshold?: number;
  rootMargin?: string;
  staggerDelay?: number;
  triggerOnce?: boolean;
}

export const useStaggeredReveal = (
  itemCount: number,
  options: UseStaggeredRevealOptions = {}
) => {
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -50px 0px",
    staggerDelay = 100,
    triggerOnce = true,
  } = options;

  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    new Array(itemCount).fill(false)
  );
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          // Stagger the visibility of each item
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleItems((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * staggerDelay);
          }
          if (triggerOnce) {
            setHasTriggered(true);
            observer.unobserve(container);
          }
        } else if (!entry.isIntersecting && !triggerOnce) {
          setVisibleItems(new Array(itemCount).fill(false));
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [itemCount, threshold, rootMargin, staggerDelay, triggerOnce, hasTriggered]);

  return { containerRef, visibleItems };
};
