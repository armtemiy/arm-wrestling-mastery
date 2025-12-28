# SEO Оптимизация - Руководство

## ✅ Что уже настроено

### 1. Мета-теги (index.html)
- ✅ Title с ключевыми словами
- ✅ Description (до 160 символов)
- ✅ Keywords
- ✅ Robots meta (index, follow)
- ✅ Canonical URL
- ✅ Open Graph (Facebook)
- ✅ Twitter Cards
- ✅ Geo-теги для локального SEO
- ✅ Structured Data (JSON-LD)

### 2. Robots.txt
- ✅ Настроен для всех поисковых систем
- ✅ Указан путь к sitemap
- ✅ Crawl-delay для вежливого краулинга

### 3. Sitemap.xml
- ✅ Создан базовый sitemap
- ⚠️ Обновляйте при добавлении новых страниц

### 4. Производительность
- ✅ Vite оптимизация (minify, code splitting)
- ✅ Кеширование статических ресурсов (netlify.toml)
- ✅ Сжатие gzip/brotli (Netlify автоматически)
- ✅ Preconnect для шрифтов
- ✅ Компонент OptimizedImage для lazy loading

### 5. Безопасность
- ✅ Security headers (X-Frame-Options, CSP и др.)
- ✅ HTTPS (через Netlify)

## 📋 Чек-лист для использования

### Для каждой новой страницы:

1. **Добавьте компонент SEO:**
```tsx
import { SEO } from '@/components/SEO';

function MyPage() {
  return (
    <>
      <SEO 
        title="Заголовок страницы | Armtemiy"
        description="Описание страницы до 160 символов"
        keywords="ключевые, слова, через, запятую"
      />
      {/* Контент страницы */}
    </>
  );
}
```

2. **Обновите sitemap.xml:**
```xml
<url>
  <loc>https://armtemiy.lovable.app/new-page</loc>
  <lastmod>2025-12-27</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>
```

### Для изображений:

1. **Используйте OptimizedImage:**
```tsx
import { OptimizedImage } from '@/components/OptimizedImage';

<OptimizedImage
  src="/path/to/image.jpg"
  alt="Описательный alt текст с ключевыми словами"
  width={800}
  height={600}
  priority={false} // true для изображений above the fold
/>
```

2. **Правила для alt-текстов:**
- Описывайте содержимое изображения
- Включайте ключевые слова естественно
- Длина: 125 символов максимум
- Не начинайте с "Изображение..." или "Картинка..."

### Контент:

1. **Заголовки (H1-H6):**
- Один H1 на страницу
- Иерархия: H1 → H2 → H3
- Включайте ключевые слова

2. **Внутренние ссылки:**
- Используйте описательный anchor text
- Связывайте релевантные страницы

3. **Структурированные данные:**
- Обновите JSON-LD в index.html при изменении бизнес-информации
- Добавьте schema.org разметку для статей, FAQ, отзывов

## 🚀 После деплоя

1. **Проверьте в Google Search Console:**
   - Отправьте sitemap
   - Проверьте индексацию
   - Мониторьте ошибки

2. **Проверьте производительность:**
   - PageSpeed Insights: https://pagespeed.web.dev/
   - GTmetrix: https://gtmetrix.com/
   - WebPageTest: https://www.webpagetest.org/

3. **Проверьте мета-теги:**
   - Open Graph: https://www.opengraph.xyz/
   - Twitter Card: https://cards-dev.twitter.com/validator

4. **Проверьте мобильную версию:**
   - Mobile-Friendly Test: https://search.google.com/test/mobile-friendly

## 📊 Мониторинг

### Метрики для отслеживания:
- Core Web Vitals (LCP, FID, CLS)
- Позиции в поисковой выдаче
- Органический трафик
- Показатель отказов
- Время на сайте

### Инструменты:
- Google Analytics 4
- Google Search Console
- Yandex Metrika
- Яндекс.Вебмастер

## 🔧 Дополнительные улучшения

### Рекомендуется добавить:

1. **Блог/Статьи:**
   - Регулярный контент с ключевыми словами
   - Длинные статьи (1500+ слов)
   - Внутренняя перелинковка

2. **FAQ страница:**
   - Schema.org разметка FAQPage
   - Ответы на популярные вопросы

3. **Отзывы:**
   - Schema.org разметка Review
   - Рейтинги в поисковой выдаче

4. **Локальное SEO:**
   - Google My Business
   - Яндекс.Справочник
   - 2ГИС

5. **Социальные сигналы:**
   - Активность в соцсетях
   - Обратные ссылки

## 📝 Команды для установки зависимостей

```bash
npm install
# или
pnpm install
```

## 🎯 Приоритетные задачи

1. ✅ Базовая SEO-оптимизация
2. ⏳ Добавить alt-теги ко всем изображениям
3. ⏳ Создать контент-план для блога
4. ⏳ Настроить Google Analytics
5. ⏳ Зарегистрироваться в Search Console
6. ⏳ Получить обратные ссылки

---

**Последнее обновление:** 27 декабря 2025
