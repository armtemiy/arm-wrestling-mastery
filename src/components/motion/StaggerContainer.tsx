/**
 * StaggerContainer Motion Component
 * Orchestrates staggered animations for children
 */

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';
import { staggerContainer, staggerContainerFast, staggerItem } from '@/lib/motion';

interface StaggerContainerProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
  className?: string;
  fast?: boolean;
  once?: boolean;
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  delayChildren = 0.1,
  className,
  fast = false,
  once = true,
  ...props
}: StaggerContainerProps) {
  const variants = fast ? staggerContainerFast : staggerContainer;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { 
            staggerChildren: staggerDelay, 
            delayChildren 
          }
        }
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Child component for use inside StaggerContainer
interface StaggerItemProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className, ...props }: StaggerItemProps) {
  return (
    <motion.div
      variants={staggerItem}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default StaggerContainer;
