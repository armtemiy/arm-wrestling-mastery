import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
  noindex?: boolean;
}

export const SEO = ({
  title = 'Armtemiy Lab — диагностика и инструменты для армрестлинга',
  description = 'Armtemiy Lab — мини-приложение в Telegram: быстрый разбор поражений и конкретные рекомендации.',
  keywords = 'армрестлинг, Armtemiy Lab, диагностика, разбор поражений, техника армрестлинга, тренировки, Тула',
  image = 'https://armtemiy.ru/images/armtemiy.jpg',
  type = 'website',
  noindex = false,
}: SEOProps) => {
  const location = useLocation();
  const url = `https://armtemiy.ru${location.pathname}`;

  useEffect(() => {
    // Обновляем title
    document.title = title;

    // Обновляем мета-теги
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Основные мета-теги
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');

    // Open Graph
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);

    // Twitter
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Обновляем canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }, [title, description, keywords, image, type, url, noindex]);

  return null;
};
