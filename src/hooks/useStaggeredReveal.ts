import { useEffect, useRef, useState } from "react";

type UseStaggeredRevealOptions = IntersectionObserverInit & {
  itemCount: number;
  once?: boolean;
  staggerMs?: number;
};

export function useStaggeredReveal(options: UseStaggeredRevealOptions) {
  const {
    itemCount,
    once = true,
    staggerMs = 80,
    threshold = 0.1,
    root = null,
    rootMargin = "0px",
  } = options;

  const containerRef = useRef<HTMLElement | null>(null);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    Array.from({ length: itemCount }, () => false)
  );

  useEffect(() => {
    setVisibleItems(Array.from({ length: itemCount }, () => false));
  }, [itemCount]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    let timeouts: number[] = [];

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeouts = Array.from({ length: itemCount }, (_, i) =>
            window.setTimeout(() => {
              setVisibleItems((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * staggerMs)
          );

          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setVisibleItems(Array.from({ length: itemCount }, () => false));
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      timeouts.forEach((id) => clearTimeout(id));
    };
  }, [itemCount, once, staggerMs, threshold, root, rootMargin]);

  return {
    containerRef,
    visibleItems,
  };
}

export default useStaggeredReveal;
