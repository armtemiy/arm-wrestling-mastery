import { useEffect, useRef, useState } from "react";

type UseScrollRevealOptions = IntersectionObserverInit & {
  once?: boolean;
};

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const {
    once = true,
    threshold = 0.15,
    root = null,
    rootMargin = "0px",
  } = options;

  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, threshold, root, rootMargin]);

  return {
    ref,
    isVisible,
    isInView: isVisible,
    revealed: isVisible,
  };
}

export default useScrollReveal;
