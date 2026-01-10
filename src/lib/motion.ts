/**
 * MOTION SYSTEM
 * =============
 * Framer Motion variants and presets for unified animations
 */

import { Variants, Transition } from 'framer-motion';

// Easing curves matching design system
export const easing = {
  out: [0.25, 0.46, 0.45, 0.94] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
  spring: [0.34, 1.56, 0.64, 1] as const,
};

// Default transition
export const defaultTransition: Transition = {
  duration: 0.5,
  ease: easing.out,
};

// Fade In Up - Most common entrance
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: easing.out 
    }
  }
};

// Fade In Down
export const fadeInDown: Variants = {
  hidden: { 
    opacity: 0, 
    y: -20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: easing.out 
    }
  }
};

// Slide In Left
export const slideInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -30 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6, 
      ease: easing.out 
    }
  }
};

// Slide In Right
export const slideInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 30 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6, 
      ease: easing.out 
    }
  }
};

// Scale In
export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.4, 
      ease: easing.out 
    }
  }
};

// Stagger Container - For orchestrating children
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.1, 
      delayChildren: 0.1 
    }
  }
};

// Stagger Container Fast
export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.05, 
      delayChildren: 0.05 
    }
  }
};

// Stagger Item - Child of stagger container
export const staggerItem: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4, 
      ease: easing.out 
    }
  }
};

// Hero entrance - High impact
export const heroEntrance: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.98
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.8, 
      ease: easing.out 
    }
  }
};

// Card hover
export const cardHover: Variants = {
  rest: { 
    y: 0,
    transition: { duration: 0.3, ease: easing.out }
  },
  hover: { 
    y: -8,
    transition: { duration: 0.3, ease: easing.out }
  }
};

// Viewport settings for scroll animations
export const viewportOnce = {
  once: true,
  margin: "-100px"
};

export const viewportRepeat = {
  once: false,
  margin: "-50px"
};
