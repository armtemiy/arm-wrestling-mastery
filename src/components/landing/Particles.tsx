import React, { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

const Particles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const isInViewRef = useRef(false);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  const createParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const particles: Particle[] = [];
    const particleCount = Math.floor((canvas.width * canvas.height) / 15000);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    particlesRef.current = particles;
  }, []);

  const stopAnimation = useCallback(() => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  const animate = useCallback(() => {
    if (!isInViewRef.current) {
      stopAnimation();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      stopAnimation();
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      stopAnimation();
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current.forEach((particle) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      if (particle.x > canvas.width) particle.x = 0;
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.y > canvas.height) particle.y = 0;
      if (particle.y < 0) particle.y = canvas.height;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
      ctx.fill();
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [stopAnimation]);

  const startAnimation = useCallback(() => {
    if (!isInViewRef.current || animationRef.current !== null) {
      return;
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [animate]);

  useEffect(() => {
    resizeCanvas();
    createParticles();

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    window.addEventListener("resize", handleResize);

    const canvas = canvasRef.current;
    let observer: IntersectionObserver | null = null;

    if (canvas && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          const isInView = entry?.isIntersecting ?? false;
          isInViewRef.current = isInView;

          if (isInView) {
            startAnimation();
            return;
          }

          stopAnimation();
        },
        {
          threshold: 0.01,
          rootMargin: "50px 0px 50px 0px",
        }
      );

      observer.observe(canvas);
    } else {
      isInViewRef.current = true;
      startAnimation();
    }

    return () => {
      stopAnimation();
      observer?.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [resizeCanvas, createParticles, startAnimation, stopAnimation]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

const MemoizedParticles = React.memo(Particles);
export default MemoizedParticles;