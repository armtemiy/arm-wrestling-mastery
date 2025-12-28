# ⚡ Быстрые команды - SEO

## 🚀 Установка и запуск

```bash
# Установка зависимостей
npm install

# Сборка проекта
npm run build

# Запуск dev-сервера
npm run dev

# Предпросмотр production сборки
npm run preview
```

## 🔍 Проверка после деплоя

### Базовые файлы
```
https://armtemiy.lovable.app/robots.txt
https://armtemiy.lovable.app/sitemap.xml
```

### Производительность
```
https://pagespeed.web.dev/analysis?url=https://armtemiy.lovable.app/
```

### Мобильная версия
```
https://search.google.com/test/mobile-friendly?url=https://armtemiy.lovable.app/
```

### Open Graph
```
https://www.opengraph.xyz/url/https://armtemiy.lovable.app/
```

### Structured Data
```
https://search.google.com/test/rich-results?url=https://armtemiy.lovable.app/
```

### Security Headers
```
https://securityheaders.com/?q=https://armtemiy.lovable.app/
```

## 📊 Регистрация в сервисах

### Google Search Console
```
https://search.google.com/search-console
```

### Яндекс.Вебмастер
```
https://webmaster.yandex.ru/
```

### Google Analytics
```
https://analytics.google.com/
```

### Yandex Metrika
```
https://metrika.yandex.ru/
```

## 🔎 Проверка индексации

### Google
```
site:armtemiy.lovable.app
```

### Яндекс
```
site:armtemiy.lovable.app
```

## 📝 Git команды

```bash
# Добавить все изменения
git add .

# Коммит
git commit -m "feat: добавлена SEO оптимизация"

# Пуш
git push

# Проверка статуса
git status
```

## 🛠️ Полезные команды

```bash
# Очистка кеша npm
npm cache clean --force

# Переустановка зависимостей
rm -rf node_modules package-lock.json
npm install

# Проверка версии Node
node --version

# Проверка версии npm
npm --version
```

## 📦 Обновление зависимостей

```bash
# Проверка устаревших пакетов
npm outdated

# Обновление всех пакетов
npm update

# Обновление конкретного пакета
npm update vite
```

## 🧪 Тестирование

```bash
# Линтинг
npm run lint

# Сборка для разработки
npm run build:dev

# Анализ bundle size
npm run build -- --mode production
```

## 📱 Локальное тестирование на мобильных

```bash
# Запуск dev-сервера с доступом из сети
npm run dev -- --host

# Ваш локальный IP будет показан в консоли
# Откройте на мобильном: http://192.168.x.x:8080
```

## 🔧 Отладка

```bash
# Просмотр логов сборки
npm run build 2>&1 | tee build.log

# Проверка размера файлов
npm run build && ls -lh dist/assets/

# Анализ зависимостей
npm list --depth=0
```

## 📊 Мониторинг производительности

### Chrome DevTools
```
F12 → Lighthouse → Generate report
```

### Проверка кеширования
```
F12 → Network → Disable cache (снять галочку)
Обновить страницу → проверить Cache-Control headers
```

### Проверка сжатия
```
F12 → Network → Size column
Должно быть: transferred size < content size
```

## 🎯 Быстрые проверки

### Проверка мета-тегов
```
Ctrl+U (просмотр исходного кода)
Ctrl+F → найти "og:title"
```

### Проверка alt-тегов
```
F12 → Console → вставить:
document.querySelectorAll('img:not([alt])').length
Должно быть: 0
```

### Проверка внешних ссылок
```
F12 → Console → вставить:
document.querySelectorAll('a[href^="http"]:not([rel*="noopener"])').length
Должно быть: 0
```

## 📚 Документация

```bash
# Открыть документацию
cat SEO_README.md
cat QUICK_START_SEO.md
cat SEO_GUIDE.md
cat SEO_CHECKLIST.md
cat SEO_INSTALLATION.md
```

## 🎨 Создание нового компонента с SEO

```tsx
// src/pages/NewPage.tsx
import { SEO } from '@/components/SEO';

export default function NewPage() {
  return (
    <>
      <SEO 
        title="Заголовок | Armtemiy"
        description="Описание"
        keywords="ключевые, слова"
      />
      <div>Контент</div>
    </>
  );
}
```

## 🖼️ Использование оптимизированных изображений

```tsx
import { OptimizedImage } from '@/components/OptimizedImage';

<OptimizedImage
  src="/image.jpg"
  alt="Описание"
  width={800}
  height={600}
  lazy={true}
  priority={false}
/>
```

## 🗺️ Обновление sitemap

```bash
# Открыть sitemap
nano public/sitemap.xml

# Или в VS Code
code public/sitemap.xml
```

Добавить:
```xml
<url>
  <loc>https://armtemiy.lovable.app/new-page</loc>
  <lastmod>2025-12-27</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>
```

## 🔄 Принудительное обновление кеша

### Браузер
```
Ctrl+Shift+Del → Очистить кеш
Или
Ctrl+F5 (жесткая перезагрузка)
```

### Open Graph
```
https://developers.facebook.com/tools/debug/
Вставить URL → Fetch new information
```

### Twitter
```
https://cards-dev.twitter.com/validator
Вставить URL → Preview card
```

## 📈 Мониторинг

### Проверка позиций
```
https://serpstat.com/
https://ahrefs.com/
```

### Проверка обратных ссылок
```
https://ahrefs.com/backlink-checker
https://moz.com/link-explorer
```

### Проверка скорости
```
https://tools.pingdom.com/
https://gtmetrix.com/
https://www.webpagetest.org/
```

## 🎯 Чек-лист перед деплоем

```bash
# 1. Проверка сборки
npm run build

# 2. Проверка линтинга
npm run lint

# 3. Проверка размера bundle
ls -lh dist/assets/

# 4. Локальный preview
npm run preview

# 5. Коммит и пуш
git add .
git commit -m "feat: обновление"
git push
```

---

**Все команды готовы к использованию! 🚀**
