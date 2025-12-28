import { useState, useEffect, RefObject } from "react";

interface ParallaxOptions {
  speed?: number; // 0.1 = slow, 1 = match scroll
  direction?: "up" | "down";
}

export const useParallax = (
  ref: RefObject<HTMLElement>,
  options: ParallaxOptions = {}
) => {
  const { speed = 0.3, direction = "up" } = options;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far the element is from center of viewport
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distanceFromCenter = viewportCenter - elementCenter;
      
      // Apply parallax based on distance
      const parallaxOffset = distanceFromCenter * speed * (direction === "up" ? 1 : -1);
      setOffset(parallaxOffset);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref, speed, direction]);

  return offset;
};
