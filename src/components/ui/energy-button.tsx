import React, { useRef, useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface EnergyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const EnergyButton = React.forwardRef<HTMLButtonElement, EnergyButtonProps>(
  ({ className, children, icon, ...props }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Animation state
    const progressRef = useRef(0);
    const animationIdRef = useRef<number | null>(null);
    const trailRef = useRef<{ x: number; y: number }[]>([]);

    // Geometry cache
    const INSET = 20;
    const cssSizeRef = useRef({ w: 0, h: 0 });
    const geomRef = useRef({ trackW: 0, trackH: 0, r: 0, straightLen: 0, arcLen: 0, perimeter: 0 });
    const dprRef = useRef(1);

    // Calculate track geometry
    const recalcGeometry = useCallback(() => {
      const { w, h } = cssSizeRef.current;
      const trackW = w - (INSET * 2);
      const trackH = h - (INSET * 2);
      const r = trackH / 2;
      const straightLen = trackW - (2 * r);
      const arcLen = Math.PI * r;
      const perimeter = (straightLen * 2) + (arcLen * 2);

      geomRef.current = { trackW, trackH, r, straightLen, arcLen, perimeter };
    }, []);

    // Get point at progress percentage around rounded rectangle
    const getPointAtProgress = useCallback((p: number): { x: number; y: number } => {
      const { trackW, trackH, r, straightLen, arcLen, perimeter } = geomRef.current;
      let dist = (p / 100) * perimeter;

      // Top straight segment (left to right)
      if (dist <= straightLen) {
        return { x: INSET + r + dist, y: INSET };
      }
      dist -= straightLen;

      // Top-right arc
      if (dist <= arcLen) {
        const angle = (dist / arcLen) * Math.PI - (Math.PI / 2);
        return {
          x: INSET + trackW - r + Math.cos(angle) * r,
          y: INSET + r + Math.sin(angle) * r
        };
      }
      dist -= arcLen;

      // Bottom straight segment (right to left)
      if (dist <= straightLen) {
        return { x: INSET + trackW - r - dist, y: INSET + trackH };
      }
      dist -= straightLen;

      // Bottom-left arc
      const angle = (dist / arcLen) * Math.PI + (Math.PI / 2);
      return {
        x: INSET + r + Math.cos(angle) * r,
        y: INSET + r + Math.sin(angle) * r
      };
    }, []);

    // Draw frame
    const draw = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const { w, h } = cssSizeRef.current;

      // Clear canvas
      ctx.clearRect(0, 0, w, h);

      // Get current head position
      const headPos = getPointAtProgress(progressRef.current);
      trailRef.current.unshift(headPos);

      // Limit trail length
      const TRAIL_LENGTH = 40;
      if (trailRef.current.length > TRAIL_LENGTH) {
        trailRef.current.pop();
      }

      // Draw trail
      if (trailRef.current.length > 1) {
        const timeHue = (performance.now() / 20) % 360;

        ctx.globalCompositeOperation = 'lighter';
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        const LINE_WIDTH = 3;
        const GLOW_AMOUNT = 15;

        for (let i = 0; i < trailRef.current.length - 1; i++) {
          const point = trailRef.current[i];
          const nextPoint = trailRef.current[i + 1];
          const alpha = 1 - (i / trailRef.current.length);

          // Red brand color (5-15 hue range instead of rainbow)
          const hue = 5 + (Math.sin(timeHue / 30 + i * 0.1) * 10);

          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(nextPoint.x, nextPoint.y);

          ctx.lineWidth = LINE_WIDTH * alpha;
          ctx.strokeStyle = `hsla(${hue}, 85%, 60%, ${alpha})`;
          ctx.shadowBlur = GLOW_AMOUNT * alpha;
          ctx.shadowColor = `hsla(${hue}, 90%, 50%, 1)`;

          ctx.stroke();
        }

        ctx.globalCompositeOperation = 'source-over';
      }
    }, [getPointAtProgress]);

    // Animation loop
    const loop = useCallback(() => {
      const SPEED = 0.5;
      progressRef.current += SPEED;
      if (progressRef.current >= 100) progressRef.current = 0;
      draw();
      animationIdRef.current = requestAnimationFrame(loop);
    }, [draw]);

    // Resize handler
    const resize = useCallback(() => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;

      const rect = container.getBoundingClientRect();
      const w = rect.width + 40;
      const h = rect.height + 40;

      cssSizeRef.current = { w, h };

      // Cap DPR for performance
      dprRef.current = Math.min(window.devicePixelRatio || 1, 2);

      // Set canvas size
      canvas.width = Math.round(w * dprRef.current);
      canvas.height = Math.round(h * dprRef.current);

      // Set transform to work in CSS coordinates
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.setTransform(dprRef.current, 0, 0, dprRef.current, 0, 0);
      }

      recalcGeometry();
      trailRef.current = [];
    }, [recalcGeometry]);

    // Setup on mount
    useEffect(() => {
      resize();

      // ResizeObserver for reactive resizing
      if ('ResizeObserver' in window && containerRef.current) {
        const ro = new ResizeObserver(() => {
          resize();
        });
        ro.observe(containerRef.current);
        return () => ro.disconnect();
      } else {
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
      }
    }, [resize]);

    // Handle hover state
    useEffect(() => {
      if (isHovered) {
        trailRef.current = [];
        if (!animationIdRef.current) {
          loop();
        }
      } else {
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
          animationIdRef.current = null;
        }
        // Clear canvas
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            const { w, h } = cssSizeRef.current;
            ctx.clearRect(0, 0, w, h);
          }
        }
      }
    }, [isHovered, loop]);

    return (
      <div ref={containerRef} className="relative inline-block p-2.5">
        <canvas
          ref={canvasRef}
          className="absolute -inset-5 opacity-0 pointer-events-none transition-opacity duration-400"
          style={{ opacity: isHovered ? 1 : 0 }}
        />
        <button
          ref={ref}
          className={cn(
            "relative glass-btn bg-white/3 backdrop-blur-xl",
            "rounded-full border border-white/10",
            "px-11 py-4.5 font-semibold text-sm uppercase tracking-wider",
            "text-white shadow-lg transition-all duration-300",
            "hover:bg-white/8 hover:border-white/20",
            "active:scale-95",
            "flex items-center gap-3",
            className
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          {...props}
        >
          {icon}
          {children}
        </button>
      </div>
    );
  }
);

EnergyButton.displayName = 'EnergyButton';
