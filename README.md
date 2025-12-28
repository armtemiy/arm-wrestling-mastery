# Armtemiy — Лендинг по армрестлингу

Лендинг для продажи программы тренировок и записи на персональные тренировки по армрестлингу в Туле.

🌐 **Сайт:** https://armtemiy.github.io/arm-wrestling-mastery/

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
│   │   └── TerminalContactForm.tsx
│   ├── ui/               # shadcn/ui компоненты
│   ├── SEO.tsx           # Динамические мета-теги
│   └── OptimizedImage.tsx
├── hooks/                # Кастомные хуки
├── integrations/
│   └── supabase/         # Supabase клиент
├── pages/
│   ├── Index.tsx         # Главная страница
│   └── NotFound.tsx      # 404
└── lib/
    └── utils.ts
```

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

## 📱 Деплой на GitHub Pages

### Автоматический деплой

```bash
# Сборка и деплой одной командой
npm run deploy
```

Эта команда:
1. Соберёт проект (`npm run build`)
2. Опубликует папку `dist` в ветку `gh-pages`
3. GitHub Pages автоматически обновит сайт

### Первоначальная настройка

1. Убедись, что репозиторий подключен:
   ```bash
   git remote -v
   # origin  https://github.com/armtemiy/arm-wrestling-mastery.git
   ```

2. После первого `npm run deploy` зайди в настройки репозитория:
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `/ (root)`
   - Save

3. Сайт будет доступен по адресу:
   https://armtemiy.github.io/arm-wrestling-mastery/

### Обновление сайта

После любых изменений:
```bash
git add .
git commit -m "описание изменений"
git push origin main
npm run deploy
```

## 🔧 Команды

```bash
npm run dev      # Запуск dev-сервера (localhost:8080)
npm run build    # Сборка для продакшена
npm run preview  # Предпросмотр сборки
npm run lint     # Проверка кода
npm run deploy   # Деплой на GitHub Pages
```

## 📊 SEO

Проект оптимизирован для поисковых систем:
- Мета-теги (title, description, keywords)
- Open Graph для соцсетей
- Twitter Cards
- Structured Data (JSON-LD)
- robots.txt и sitemap.xml
- Оптимизация производительности

## 📞 Контакты

- Telegram: [@armtemiy](https://t.me/armtemiy)
- Заявки: [@assistemiy](https://t.me/assistemiy)

---

**Версия:** 1.0.0  
**Последнее обновление:** Декабрь 2025
