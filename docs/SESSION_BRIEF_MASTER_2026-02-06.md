# Master brief для параллельной работы (2026-02-06)

## Контекст
- Проект: `arm-wrestling-mastery`
- Стек: React 18 + TypeScript + Vite + Tailwind + shadcn + Framer Motion + Supabase Edge Function
- Цель: параллельно улучшить backend/security и frontend/visual/performance

## Бэкап перед изменениями
- Создан: `C:\Users\armtemiy\Desktop\ARMTEMIY\arm-wrestling-mastery-backup-20260206-091322.tar.gz`
- Размер: ~2.8 MB

## Текущее состояние (по аудиту)

### Critical
1. **Сборка сломана**: удалены `src/hooks/useScrollReveal.ts` и `src/hooks/useStaggeredReveal.ts`, при этом импорты остались в секциях.
2. **High vulnerability**: `npm audit --omit=dev` обнаруживает уязвимость в цепочке `react-router-dom -> react-router -> @remix-run/router`.

### Major
1. Нет тестового контура (unit/integration/e2e).
2. Серверный rate-limit в edge function сделан in-memory (нестабильно для serverless), CORS = `*`.
3. Есть риск jank из-за scroll state updates и тяжёлых визуальных эффектов.
4. `useReducedMotion` есть, но не внедрён в секции.
5. Дизайн-токены заданы, но в компонентах много hardcoded HSL/inline styles.
6. В футере есть соц-ссылки с `href="#"`.

### Minor
1. Есть warning ESLint в `src/components/ui/button.tsx` (`react-refresh/only-export-components`).
2. Можно упростить управление SEO/meta и preloading стратегией.

## Метрики/ориентиры на результат
- `npm run build` green
- `npm run lint` без errors
- Устранить high/critical в `npm audit`
- Улучшить UX-плавность на мобильных
- Привести визуал к единому дизайн-языку

## Разделение по сессиям
- Backend/security (Codex): `docs/SESSION_BACKEND_CODEX_2026-02-06.md`
- Frontend/visual/perf (Gemini): `docs/SESSION_FRONTEND_GEMINI_2026-02-06.md`

## Порядок синхронизации
1. Сначала обе ветки локально закрывают свои задачи.
2. Потом backend даёт контракт/ограничения, frontend адаптирует форму.
3. Финальный интеграционный прогон: build + lint + smoke.
