# Armtemiy — лендинг Armtemiy Lab

Лендинг для Armtemiy Lab и записи на персональные тренировки по армрестлингу в Туле.

🌐 **Сайт:** https://armtemiy.ru/

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
- **Telegram** — вход в Armtemiy Lab через бота
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

Нужен файл `.env` по примеру `.env.example`.

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
   https://armtemiy.ru/

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
- robots.txt и sitemap.xml (lastmod обновляется на build)
- Оптимизация производительности

## 📞 Контакты

- Telegram: [@armtemiy](https://t.me/armtemiy)
- Armtemiy Lab: [@armtemiy_lab_bot](https://t.me/armtemiy_lab_bot)

---

**Версия:** 1.0.0  
**Последнее обновление:** Декабрь 2025
