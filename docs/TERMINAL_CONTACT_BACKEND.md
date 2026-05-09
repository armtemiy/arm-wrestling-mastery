# Terminal contact backend

Этот документ фиксирует production-настройку формы `TerminalContactForm` на лендинге `armtemiy.ru`.

## Frontend env

Для сборки лендинга нужны публичные переменные:

- `VITE_SUPABASE_URL` — URL Supabase проекта лендинга.
- `VITE_SUPABASE_PUBLISHABLE_KEY` — anon/publishable key Supabase проекта лендинга.

Service role key нельзя добавлять во frontend env.

## Edge Function

Форма вызывает Supabase Edge Function:

- `send-telegram`

Endpoint формируется как:

- `${VITE_SUPABASE_URL}/functions/v1/send-telegram`

## Edge Function secrets

Обязательные secrets в Supabase проекте лендинга:

- `SB_URL` — Supabase Project URL.
- `SB_SERVICE_ROLE_KEY` — service role key только для Edge Function.
- `TELEGRAM_BOT_TOKEN` или `TG_BOT_TOKEN` — токен Telegram-бота.
- `TELEGRAM_CHAT_ID` или `TG_ADMIN_CHAT_ID` — chat id получателя заявок.

Опциональный secret:

- `CORS_ALLOWED_ORIGINS` — дополнительные origins через запятую.

Default origins уже включают:

- `https://armtemiy.ru`
- `https://www.armtemiy.ru`
- `https://armtemiy.github.io`
- локальные Vite/preview origins для разработки.

Если форма открывается с preview-домена или другого production origin, добавь его в `CORS_ALLOWED_ORIGINS`.

## Database

Функция пишет заявки в `public.leads` через service role. Прямой `anon insert` не нужен.

Актуальная схема должна содержать:

- `request_id text`
- `ip_hash text`

Raw IP в новые записи не пишется. Для антиспама и истории используется хэш IP.

## Migrations

Для формы важны миграции:

1. `20260204_create_leads.sql`
2. `20260204130000_add_leads_request_id.sql`
3. `20260206_rate_limit_rpc.sql`
4. `20260207000000_harden_leads.sql`

После применения `20260207000000_harden_leads.sql` policy `allow_insert_leads` удаляется, а запись в `leads` остаётся через Edge Function с service role.

## Smoke checklist

1. Открыть production лендинг с `https://armtemiy.ru`.
2. Отправить тестовую заявку с текстом `TEST terminal contact`.
3. Проверить UI success.
4. Проверить сообщение в Telegram.
5. Проверить row в `public.leads` с `request_id` и `ip_hash`.
6. Проверить Edge Function logs: не должно быть `telegram_not_configured`, `insert_lead_failed`, `rate_limit_rpc_failed`, `forbidden_origin`.
7. Отправить 4 заявки за минуту и проверить понятный 429-сценарий.
