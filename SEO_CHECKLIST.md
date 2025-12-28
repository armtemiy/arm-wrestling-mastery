# SEO Чек-лист - Проверка после настройки

## 🎯 Немедленные действия после деплоя

### 1. Проверка базовых элементов
- [ ] Откройте сайт и проверьте title в браузере
- [ ] Просмотрите исходный код (Ctrl+U) - проверьте мета-теги
- [ ] Проверьте robots.txt: https://armtemiy.lovable.app/robots.txt
- [ ] Проверьте sitemap.xml: https://armtemiy.lovable.app/sitemap.xml

### 2. Тестирование производительности

**PageSpeed Insights:**
```
https://pagespeed.web.dev/analysis?url=https://armtemiy.lovable.app/
```
Цель: 90+ баллов на мобильных и десктопе

**GTmetrix:**
```
https://gtmetrix.com/
```
Проверьте:
- [ ] Время загрузки < 3 секунд
- [ ] Размер страницы < 2 МБ
- [ ] Количество запросов < 50

### 3. Проверка мета-тегов

**Open Graph Debugger:**
```
https://www.opengraph.xyz/
```
Проверьте:
- [ ] Изображение отображается корректно
- [ ] Title и description правильные
- [ ] URL канонический

**Twitter Card Validator:**
```
https://cards-dev.twitter.com/validator
```

### 4. Мобильная оптимизация

**Mobile-Friendly Test:**
```
https://search.google.com/test/mobile-friendly
```
- [ ] Сайт адаптивный
- [ ] Текст читаемый без зума
- [ ] Кнопки достаточно большие

### 5. Structured Data

**Rich Results Test:**
```
https://search.google.com/test/rich-results
```
Проверьте JSON-LD разметку

### 6. Безопасность

**Security Headers:**
```
https://securityheaders.com/
```
Цель: A или A+ рейтинг

**SSL Test:**
```
https://www.ssllabs.com/ssltest/
```
Цель: A или A+ рейтинг

## 📊 Регистрация в сервисах

### Google Search Console
1. Перейдите: https://search.google.com/search-console
2. Добавьте сайт
3. Подтвердите владение
4. Отправьте sitemap: https://armtemiy.lovable.app/sitemap.xml

### Яндекс.Вебмастер
1. Перейдите: https://webmaster.yandex.ru/
2. Добавьте сайт
3. Подтвердите владение
4. Отправьте sitemap

### Google Analytics 4
1. Создайте аккаунт: https://analytics.google.com/
2. Получите Measurement ID
3. Добавьте код в index.html перед </head>:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Yandex Metrika
1. Создайте счетчик: https://metrika.yandex.ru/
2. Получите код счетчика
3. Добавьте в index.html

## 🔍 Проверка индексации

### Проверка в Google:
```
site:armtemiy.lovable.app
```

### Проверка в Яндекс:
```
site:armtemiy.lovable.app
```

### Запрос индексации:
1. Google Search Console → URL Inspection → Request Indexing
2. Яндекс.Вебмастер → Индексирование → Переобход страниц

## 📈 Мониторинг Core Web Vitals

### Целевые показатели:
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

### Инструменты:
- Chrome DevTools → Lighthouse
- PageSpeed Insights
- Web Vitals Extension

## 🖼️ Оптимизация изображений

### Чек-лист для каждого изображения:
- [ ] Формат: WebP или AVIF (fallback: JPG/PNG)
- [ ] Размер: оптимизирован под экран
- [ ] Alt-текст: описательный с ключевыми словами
- [ ] Lazy loading: включен (кроме above-the-fold)
- [ ] Размеры: указаны width и height

### Инструменты для сжатия:
- TinyPNG: https://tinypng.com/
- Squoosh: https://squoosh.app/
- ImageOptim (Mac)

## 📝 Контент-оптимизация

### На каждой странице проверьте:
- [ ] Один H1 с главным ключевым словом
- [ ] H2-H6 в правильной иерархии
- [ ] Ключевые слова в первых 100 словах
- [ ] Внутренние ссылки на релевантные страницы
- [ ] Внешние ссылки с rel="noopener noreferrer"
- [ ] Длина контента: минимум 300 слов

### Плотность ключевых слов:
- Основное ключевое слово: 1-2%
- LSI ключевые слова: естественно по тексту

## 🔗 Построение ссылочной массы

### Локальное SEO:
- [ ] Google My Business
- [ ] Яндекс.Справочник
- [ ] 2ГИС
- [ ] Отзовик
- [ ] Zoon

### Каталоги и агрегаторы:
- [ ] Спортивные каталоги
- [ ] Региональные каталоги Тулы
- [ ] Тематические форумы

### Контент-маркетинг:
- [ ] Гостевые посты на спортивных блогах
- [ ] Интервью с экспертами
- [ ] Инфографика для шеринга
- [ ] YouTube видео с ссылками

## 🎯 Еженедельные задачи

### Понедельник:
- Проверка позиций в поисковой выдаче
- Анализ трафика в Analytics

### Среда:
- Проверка новых ошибок в Search Console
- Ответы на комментарии/отзывы

### Пятница:
- Публикация нового контента
- Обновление sitemap.xml
- Проверка обратных ссылок

## 📊 KPI для отслеживания

### Месячные метрики:
- Органический трафик
- Позиции по ключевым запросам
- Количество индексированных страниц
- Количество обратных ссылок
- Показатель отказов
- Среднее время на сайте
- Конверсии (заявки, звонки)

### Инструменты аналитики:
- Google Analytics 4
- Google Search Console
- Yandex Metrika
- Яндекс.Вебмастер
- Ahrefs / Serpstat (опционально)

## ✅ Финальная проверка

Перед запуском убедитесь:
- [ ] Все страницы имеют уникальные title и description
- [ ] Все изображения имеют alt-теги
- [ ] Sitemap.xml актуален
- [ ] Robots.txt настроен правильно
- [ ] HTTPS работает
- [ ] Редиректы настроены (www → non-www или наоборот)
- [ ] 404 страница существует и оптимизирована
- [ ] Скорость загрузки < 3 секунд
- [ ] Мобильная версия работает корректно
- [ ] Structured data валидна

---

**Дата создания:** 27 декабря 2025
**Статус:** Базовая оптимизация завершена ✅
