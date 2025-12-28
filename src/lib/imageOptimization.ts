/**
 * Утилиты для оптимизации изображений
 */

interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpg' | 'png';
}

/**
 * Генерирует srcset для адаптивных изображений
 */
export const generateSrcSet = (baseUrl: string, widths: number[]): string => {
  return widths.map(width => `${baseUrl}?w=${width} ${width}w`).join(', ');
};

/**
 * Генерирует sizes атрибут для адаптивных изображений
 */
export const generateSizes = (breakpoints: { maxWidth: string; size: string }[]): string => {
  return breakpoints.map(bp => `(max-width: ${bp.maxWidth}) ${bp.size}`).join(', ');
};

/**
 * Ленивая загрузка изображений с Intersection Observer
 */
export const lazyLoadImage = (img: HTMLImageElement) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target as HTMLImageElement;
        const src = target.dataset.src;
        const srcset = target.dataset.srcset;
        
        if (src) target.src = src;
        if (srcset) target.srcset = srcset;
        
        target.classList.add('loaded');
        observer.unobserve(target);
      }
    });
  }, {
    rootMargin: '50px',
  });

  observer.observe(img);
};

/**
 * Preload критичных изображений
 */
export const preloadImage = (url: string, as: 'image' = 'image') => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = as;
  link.href = url;
  document.head.appendChild(link);
};
