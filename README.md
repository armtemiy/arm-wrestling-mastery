# Armtemiy — Лендинг по армрестлингу

Лендинг для продажи программы тренировок и записи на персональные тренировки по армрестлингу в Туле.

## 🚀 Быстрый старт

### Локальный запуск

```bash
# 1. Установить зависимости
npm install

# 2. Запустить dev-сервер
npm run dev

# 3. Открыть в браузере
http://localhost:8080
```

### Сборка для продакшена

```bash
npm run build
npm run preview  # предпросмотр сборки
```

## 🛠 Технологии

- **React 18** + TypeScript
- **Vite** — сборка и dev-сервер
- **Tailwind CSS** — стилизация
- **shadcn/ui** — UI компоненты (Radix UI)
- **React Router** — роутинг
- **React Query** — управление состоянием
- **Supabase** — бэкенд (отправка заявок в Telegram)
- **Lucide React** — иконки

## 📁 Структура проекта

```
src/
├── components/
│   ├── landing/          # Секции лендинга
│   │   ├── HeroSection.tsx
│   │   ├── ProgramSection.tsx
│   │   ├── TrainingSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── FAQSection.tsx
│   │   ├── CTASection.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   ├── ui/               # shadcn/ui компоненты
│   ├── SEO.tsx           # Динамические мета-теги
│   └── OptimizedImage.tsx
├── hooks/                # Кастомные хуки
│   ├── useScrollReveal.ts
│   ├── useParallax.ts
│   └── ...
├── integrations/
│   └── supabase/         # Supabase клиент
├── pages/
│   ├── Index.tsx         # Главная страница
│   └── NotFound.tsx      # 404
└── lib/
    └── utils.ts
```

## 🎨 Секции лендинга

1. **Hero** — главный экран с заголовком и CTA
2. **Program** — описание программы тренировок (1500₽)
3. **Training** — персональные тренировки в Туле (от 500₽/час)
4. **About** — информация об авторе
5. **FAQ** — частые вопросы
6. **CTA** — форма обратной связи (терминал)
7. **Footer** — навигация и соцсети

## ⚙️ Конфигурация

### Переменные окружения (.env)

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

### Supabase Edge Function

Форма отправляет заявки в Telegram через Supabase Edge Function `send-telegram`.

Необходимые секреты в Supabase:
- `TELEGRAM_BOT_TOKEN` — токен бота
- `TELEGRAM_CHAT_ID` — ID чата для уведомлений

## 📱 Деплой

### Railway (рекомендуется)

1. Создай проект на [railway.app](https://railway.app)
2. Подключи GitHub репозиторий
3. Добавь переменные окружения:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
4. Railway автоматически задеплоит при push в main

Проект настроен:
- `railway.json` — конфигурация деплоя
- `nixpacks.toml` — настройки сборки
- `server.js` — Express сервер для раздачи статики

### Netlify

Проект также работает на Netlify:
- Автоматическая сборка при push в main
- Настроено кеширование и security headers
- SPA редиректы через `netlify.toml`

### Другие платформы

Работает на любой платформе:
- Vercel
- Render
- Fly.io
- DigitalOcean App Platform

## 🔧 Команды

```bash
npm run dev      # Запуск dev-сервера (localhost:8080)
npm run build    # Сборка для продакшена
npm run preview  # Предпросмотр сборки
npm run lint     # Проверка кода
```

## 📊 SEO

Проект оптимизирован для поисковых систем:
- Мета-теги (title, description, keywords)
- Open Graph для соцсетей
- Twitter Cards
- Structured Data (JSON-LD)
- robots.txt и sitemap.xml
- Оптимизация производительности

## 🎯 Особенности

- **Адаптивный дизайн** — работает на всех устройствах
- **Тёмная тема** — современный дизайн
- **Анимации** — плавные переходы и эффекты
- **Оптимизация** — code splitting, lazy loading
- **Безопасность** — защита формы от спама

## 📞 Контакты

- Telegram: [@armtemiy](https://t.me/armtemiy)
- Заявки: [@assistemiy](https://t.me/assistemiy)

## 📝 Лицензия

Проприетарный проект. Все права защищены.

---

**Версия:** 1.0.0  
**Последнее обновление:** Декабрь 2025
