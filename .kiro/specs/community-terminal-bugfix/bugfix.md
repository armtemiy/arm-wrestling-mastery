# Bugfix Requirements Document

## Introduction

Исправление двух багов в проекте armtemiy-lab:

1. **Лишний слой обертки в CommunitySection** - карточка "Armtemiy Community" имеет двойную обертку на мобильной версии вместо одной
2. **Ошибка отправки формы TerminalContactForm** - форма выдает ошибку "✕ ЧТО-ТО ПОШЛО НЕ ТАК" вместо успешной отправки заявки в Telegram бот @armtemiy_lab_bot через Supabase Edge Function

## Bug Analysis

### Bug #1: Лишний слой обертки в CommunitySection (мобильная версия)

#### Current Behavior (Defect)

1.1 WHEN пользователь открывает секцию "Закрытый чат" на мобильном устройстве THEN карточка с заголовком "Armtemiy Community" завернута в 2 слоя обертки

1.2 WHEN рендерится превью чата в CommunitySection THEN структура DOM содержит избыточный уровень вложенности

#### Expected Behavior (Correct)

2.1 WHEN пользователь открывает секцию "Закрытый чат" на мобильном устройстве THEN карточка с заголовком "Armtemiy Community" SHALL быть завернута только в 1 слой обертки

2.2 WHEN рендерится превью чата в CommunitySection THEN структура DOM SHALL содержать минимально необходимый уровень вложенности без избыточных контейнеров

#### Unchanged Behavior (Regression Prevention)

3.1 WHEN пользователь открывает секцию "Закрытый чат" на десктопе THEN визуальное отображение и структура SHALL CONTINUE TO работать корректно

3.2 WHEN применяются стили к карточке превью чата THEN все визуальные эффекты (border, background, padding, rounded corners) SHALL CONTINUE TO отображаться правильно

3.3 WHEN пользователь взаимодействует с элементами внутри карточки (кнопки, ссылки) THEN функциональность SHALL CONTINUE TO работать без изменений

---

### Bug #2: Ошибка отправки формы TerminalContactForm

#### Current Behavior (Defect)

1.1 WHEN пользователь заполняет все поля формы TerminalContactForm (имя, телефон, сообщение) и отправляет заявку THEN система выдает ошибку "✕ ЧТО-ТО ПОШЛО НЕ ТАК"

1.2 WHEN форма пытается отправить данные на Supabase Edge Function `send-telegram` THEN запрос завершается с ошибкой

1.3 WHEN происходит ошибка отправки THEN заявка не доходит до Telegram бота @armtemiy_lab_bot

1.4 WHEN происходит ошибка отправки THEN запись не создается в таблице `public.leads` в Supabase

#### Expected Behavior (Correct)

2.1 WHEN пользователь заполняет все поля формы TerminalContactForm (имя, телефон, сообщение) и отправляет заявку THEN система SHALL успешно отправить данные на Supabase Edge Function `${VITE_SUPABASE_URL}/functions/v1/send-telegram`

2.2 WHEN форма успешно отправляет данные THEN система SHALL показать сообщение "✓ ЗАЯВКА ПРИНЯТА"

2.3 WHEN заявка успешно обработана THEN сообщение SHALL прийти в Telegram бот @armtemiy_lab_bot

2.4 WHEN заявка успешно обработана THEN запись SHALL быть создана в таблице `public.leads` с полями `request_id` и `ip_hash`

2.5 WHEN Edge Function получает корректные переменные окружения (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`) THEN запрос SHALL выполниться без ошибок конфигурации

#### Unchanged Behavior (Regression Prevention)

3.1 WHEN пользователь вводит невалидное имя (< 2 символов, > 50 символов, или содержит подозрительные паттерны) THEN система SHALL CONTINUE TO показывать ошибку валидации

3.2 WHEN пользователь вводит невалидный телефон (не соответствует формату) THEN система SHALL CONTINUE TO показывать ошибку "Не похоже на номер. Пример: +7 999 123-45-67"

3.3 WHEN пользователь вводит невалидное сообщение (< 2 символов, > 500 символов, или содержит подозрительные паттерны) THEN система SHALL CONTINUE TO показывать ошибку валидации

3.4 WHEN пользователь пытается отправить заявку слишком быстро (< 3 секунд после первого взаимодействия) THEN система SHALL CONTINUE TO показывать ошибку "Подожди пару секунд и попробуй снова"

3.5 WHEN пользователь отправляет более 3 заявок за 60 секунд THEN система SHALL CONTINUE TO показывать ошибку rate limit "Слишком много заявок. Подожди минутку"

3.6 WHEN honeypot поле заполнено THEN система SHALL CONTINUE TO блокировать отправку с ошибкой "Ошибка проверки. Обнови форму и попробуй снова"

3.7 WHEN форма находится в состоянии "sending" THEN UI SHALL CONTINUE TO показывать индикатор загрузки с текстом "Обработка..."

3.8 WHEN форма успешно отправлена или произошла ошибка THEN кнопка "Начать новую сессию" SHALL CONTINUE TO сбрасывать форму в начальное состояние

---

## Bug Condition Derivation

### Bug #1: Лишний слой обертки в CommunitySection

**Bug Condition Function:**
```pascal
FUNCTION isBugCondition(X)
  INPUT: X of type DOMStructure
  OUTPUT: boolean
  
  // Возвращает true когда карточка превью чата имеет избыточную вложенность
  RETURN X.cardPreviewContainer.nestingLevel > 1
END FUNCTION
```

**Property Specification:**
```pascal
// Property: Fix Checking - Удаление избыточного слоя обертки
FOR ALL X WHERE isBugCondition(X) DO
  result ← renderCommunitySection'(X)
  ASSERT result.cardPreviewContainer.nestingLevel = 1 AND
         result.visualStyles.preserved = true
END FOR
```

**Preservation Goal:**
```pascal
// Property: Preservation Checking
FOR ALL X WHERE NOT isBugCondition(X) DO
  ASSERT renderCommunitySection(X) = renderCommunitySection'(X)
END FOR
```

---

### Bug #2: Ошибка отправки формы TerminalContactForm

**Bug Condition Function:**
```pascal
FUNCTION isBugCondition(X)
  INPUT: X of type FormSubmission
  OUTPUT: boolean
  
  // Возвращает true когда форма пытается отправить валидные данные
  // но получает ошибку из-за проблем с конфигурацией или Edge Function
  RETURN X.name.isValid = true AND
         X.phone.isValid = true AND
         X.message.isValid = true AND
         X.honeypot.isEmpty = true AND
         X.timeSinceFirstInteraction >= 3000 AND
         X.rateLimitNotExceeded = true AND
         X.submissionResult.success = false
END FUNCTION
```

**Property Specification:**
```pascal
// Property: Fix Checking - Успешная отправка валидных заявок
FOR ALL X WHERE isBugCondition(X) DO
  result ← submitTerminalForm'(X)
  ASSERT result.success = true AND
         result.telegramMessageSent = true AND
         result.databaseRecordCreated = true AND
         result.uiShowsSuccessMessage = true
END FOR
```

**Preservation Goal:**
```pascal
// Property: Preservation Checking - Валидация и защита остаются неизменными
FOR ALL X WHERE NOT isBugCondition(X) DO
  ASSERT submitTerminalForm(X) = submitTerminalForm'(X)
END FOR
```

**Counterexample:**
```
Input: {
  name: "Артем",
  phone: "+7 999 123-45-67",
  message: "Хочу Armtemiy Lab",
  honeypot: "",
  timeSinceFirstInteraction: 5000,
  rateLimitNotExceeded: true
}

Expected: { success: true, message: "✓ ЗАЯВКА ПРИНЯТА" }
Actual: { success: false, error: "✕ ЧТО-ТО ПОШЛО НЕ ТАК" }
```
