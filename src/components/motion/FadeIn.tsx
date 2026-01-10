/**
 * FadeIn Motion Component
 * Wrapper for fade-in animations with direction support
 */

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';
import { easing, viewportOnce } from '@/lib/motion';

interface FadeInProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  once?: boolean;
}

const directionOffset = {
  up: { y: 20, x: 0 },
  down: { y: -20, x: 0 },
  left: { x: -30, y: 0 },
  right: { x: 30, y: 0 },
  none: { x: 0, y: 0 },
};

export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  direction = 'up',
  className,
  once = true,
  ...props
}: FadeInProps) {
  const offset = directionOffset[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-100px" }}
      transition={{ 
        duration, 
        delay, 
        ease: easing.out 
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default FadeIn;
