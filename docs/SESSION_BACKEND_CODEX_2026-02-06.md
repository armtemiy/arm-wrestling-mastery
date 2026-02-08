# Задача для Codex 5.3 — Backend/Security Track

## Роль
Ты работаешь только над backend/security и стабильностью платформы. Визуал и frontend-стили не трогаешь.

## Главные цели
1. Починить критичные проблемы сборки, связанные с удалёнными hooks.
2. Закрыть high vulnerability по роутеру.
3. Усилить безопасность формы/edge function.
4. Подготовить минимальный quality baseline для регрессий.

## Входные факты
- Build сейчас падает из-за отсутствующих `useScrollReveal` и `useStaggeredReveal`.
- `npm audit --omit=dev` показывает high vulnerability через `@remix-run/router`.
- Edge function `supabase/functions/send-telegram/index.ts`:
  - CORS: `Access-Control-Allow-Origin: *`
  - rate limit на `Map` в памяти процесса

## Scope (IN)
1. **Build stabilization**
   - Вариант A: восстановить оба хука в `src/hooks`.
   - Вариант B: мигрировать импорты на единый существующий хук.
   - Результат: `npm run build` должен быть зелёным.

2. **Dependency security**
   - Обновить `react-router-dom/react-router/@remix-run/router` до версии без advisory.
   - Проверить совместимость маршрутов (`/` и `*`).
   - Проверка: `npm audit --omit=dev` без high/critical.

3. **Edge function hardening**
   - Ограничить CORS whitelist (например, `https://armtemiy.ru`, превью-домены по env).
   - Заменить in-memory rate-limit на устойчивый механизм:
     - Supabase table + TTL/окно, либо внешний KV/Redis.
   - Валидация payload через schema (например, Zod) на серверной границе.
   - Безопасное логирование без лишних персональных данных.

4. **Contract for frontend**
   - Задокументировать точный формат ответа edge function:
     - success
     - validation error
     - rate limit (429)
     - internal error
   - Явно описать поля и тексты ошибок для UI.

## Scope (OUT)
- Редизайн секций
- Переписывание визуальных анимаций
- Смена копирайта/маркетинговых текстов

## Acceptance Criteria
1. `npm run build` — success.
2. `npm run lint` — без новых warning/error.
3. `npm audit --omit=dev` — без high/critical.
4. CORS не wildcard.
5. rate-limit не зависит от памяти одного инстанса.
6. Документирован API-контракт ответа функции.

## Рекомендуемый порядок работ
1. Восстановить сборку (hooks/imports).
2. Обновить уязвимые пакеты.
3. Усилить edge function.
4. Прогнать проверки.
5. Сформировать краткий changelog для frontend-сессии.
