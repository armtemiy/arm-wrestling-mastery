# 🔧 Установка и проверка SEO оптимизации

## Шаг 1: Установка зависимостей

Выполните команду для установки новых зависимостей:

```bash
npm install
```

Или если используете pnpm:

```bash
pnpm install
```

## Шаг 2: Проверка сборки

Убедитесь, что проект собирается без ошибок:

```bash
npm run build
```

Ожидаемый результат:
- ✅ Сборка завершена успешно
- ✅ Файлы минифицированы
- ✅ Code splitting применен
- ✅ Размер бандла оптимизирован

## Шаг 3: Локальная проверка

Запустите dev-сервер:

```bash
npm run dev
```

Откройте в браузере: http://localhost:8080

### Проверьте:

1. **Title в браузере:**
   - Главная: "Armtemiy — Программы и тренировки по армрестлингу | Тренер в Туле"
   - 404: "Страница не найдена | Armtemiy"

2. **Мета-теги (Ctrl+U для просмотра исходного кода):**
   - description
   - keywords
   - og:title, og:description, og:image
   - twitter:card

3. **Файлы доступны:**
   - http://localhost:8080/robots.txt
   - http://localhost:8080/sitemap.xml

## Шаг 4: Деплой

Закоммитьте изменения:

```bash
git add .
git commit -m "feat: добавлена полная SEO оптимизация"
git push
```

Netlify автоматически задеплоит с новыми настройками.

## Шаг 5: Проверка после деплоя

### 5.1 Базовые файлы

Откройте в браузере:
- https://armtemiy.lovable.app/robots.txt
- https://armtemiy.lovable.app/sitemap.xml

### 5.2 Производительность

**PageSpeed Insights:**
```
https://pagespeed.web.dev/analysis?url=https://armtemiy.lovable.app/
```

Целевые показатели:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

### 5.3 Мета-теги

**Open Graph Debugger:**
```
https://www.opengraph.xyz/url/https://armtemiy.lovable.app/
```

Проверьте:
- ✅ Изображение отображается
- ✅ Title корректный
- ✅ Description корректный

**Twitter Card Validator:**
```
https://cards-dev.twitter.com/validator
```

### 5.4 Мобильная версия

**Mobile-Friendly Test:**
```
https://search.google.com/test/mobile-friendly?url=https://armtemiy.lovable.app/
```

### 5.5 Structured Data

**Rich Results Test:**
```
https://search.google.com/test/rich-results?url=https://armtemiy.lovable.app/
```

Должны быть найдены:
- WebSite schema
- SportsActivityLocation schema

### 5.6 Security Headers

**Security Headers Check:**
```
https://securityheaders.com/?q=https://armtemiy.lovable.app/
```

Целевой рейтинг: A или A+

## Шаг 6: Регистрация в поисковых системах

### Google Search Console

1. Перейдите: https://search.google.com/search-console
2. Нажмите "Добавить ресурс"
3. Выберите "Домен" или "URL-префикс"
4. Введите: `armtemiy.lovable.app`
5. Подтвердите владение (через DNS или HTML-файл)
6. После подтверждения:
   - Перейдите в "Файлы Sitemap"
   - Добавьте: `https://armtemiy.lovable.app/sitemap.xml`
   - Нажмите "Отправить"

### Яндекс.Вебмастер

1. Перейдите: https://webmaster.yandex.ru/
2. Нажмите "Добавить сайт"
3. Введите: `https://armtemiy.lovable.app`
4. Подтвердите владение
5. После подтверждения:
   - Перейдите в "Индексирование" → "Файлы Sitemap"
   - Добавьте: `https://armtemiy.lovable.app/sitemap.xml`

### Google Analytics 4

1. Создайте аккаунт: https://analytics.google.com/
2. Создайте ресурс для сайта
3. Получите Measurement ID (формат: G-XXXXXXXXXX)
4. Добавьте код в `index.html` перед `</head>`:

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
3. Добавьте в `index.html` перед `</head>`

## Шаг 7: Мониторинг

### Первая неделя

Проверяйте ежедневно:
- [ ] Индексация началась (site:armtemiy.lovable.app в Google)
- [ ] Нет ошибок в Search Console
- [ ] Sitemap обработан

### Первый месяц

Проверяйте еженедельно:
- [ ] Количество проиндексированных страниц
- [ ] Позиции по брендовым запросам
- [ ] Core Web Vitals
- [ ] Ошибки краулинга

### Постоянно

Отслеживайте:
- Органический трафик
- Позиции по ключевым запросам
- Поведенческие факторы
- Конверсии

## 🐛 Решение проблем

### Проблема: Sitemap не найден

**Решение:**
1. Проверьте, что файл `public/sitemap.xml` существует
2. Пересоберите проект: `npm run build`
3. Проверьте в `dist/sitemap.xml`
4. Задеплойте заново

### Проблема: Низкий PageSpeed Score

**Решение:**
1. Проверьте размер изображений (сжимайте через TinyPNG)
2. Используйте WebP формат
3. Включите lazy loading для всех изображений
4. Проверьте, что кеширование работает (DevTools → Network)

### Проблема: Мета-теги не обновляются

**Решение:**
1. Очистите кеш браузера (Ctrl+Shift+Del)
2. Проверьте в режиме инкогнито
3. Используйте Open Graph Debugger для принудительного обновления

### Проблема: Сайт не индексируется

**Решение:**
1. Проверьте robots.txt - не должно быть `Disallow: /`
2. Проверьте мета-тег robots - должен быть `index, follow`
3. Отправьте URL на индексацию вручную в Search Console
4. Подождите 1-2 недели

## ✅ Чек-лист готовности

Перед запуском убедитесь:

- [ ] Зависимости установлены (`npm install`)
- [ ] Проект собирается без ошибок (`npm run build`)
- [ ] robots.txt доступен
- [ ] sitemap.xml доступен
- [ ] Мета-теги корректны
- [ ] PageSpeed Score 90+
- [ ] Mobile-Friendly Test пройден
- [ ] Security Headers A или A+
- [ ] Зарегистрирован в Search Console
- [ ] Зарегистрирован в Яндекс.Вебмастер
- [ ] Sitemap отправлен в обе системы
- [ ] Google Analytics настроен
- [ ] Yandex Metrika настроена

## 📚 Дополнительные ресурсы

- **SEO_SUMMARY.md** - краткое резюме изменений
- **SEO_GUIDE.md** - полное руководство по SEO
- **SEO_CHECKLIST.md** - детальный чек-лист
- **QUICK_START_SEO.md** - быстрый старт

## 🎯 Следующие шаги

После завершения установки:

1. **Контент:**
   - Создайте 5-10 статей о армрестлинге
   - Добавьте страницу "О нас"
   - Создайте страницу "Контакты"

2. **Изображения:**
   - Добавьте alt-теги ко всем изображениям
   - Оптимизируйте размер изображений
   - Используйте WebP формат

3. **Ссылки:**
   - Зарегистрируйтесь в локальных каталогах
   - Получите обратные ссылки
   - Создайте профили в соцсетях

4. **Мониторинг:**
   - Настройте еженедельные отчеты
   - Отслеживайте позиции
   - Анализируйте конкурентов

---

**Готово! 🚀 Ваш сайт готов к покорению поисковых систем!**
