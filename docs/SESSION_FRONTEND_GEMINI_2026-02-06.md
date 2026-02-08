# Задача для Gemini 3 Pro — Frontend/Visual/Performance Track

## Роль
Ты работаешь над frontend, визуалом, UX-плавностью и консистентностью дизайн-системы. Backend-контракты и безопасность функции учитываешь, но не меняешь архитектуру backend.

## Главные цели
1. Сделать современный сильный дизайн лендинга в едином стиле.
2. Повысить плавность, отзывчивость и лёгкость интерфейса.
3. Убрать визуальные неадекватности и несостыковки токенов/компонентов.
4. Учесть reduced-motion и accessibility.

## Входные факты
- В проекте есть токены (`src/design-system/tokens.css`) и типографика (`typography.css`), но в секциях много hardcoded HSL и inline style.
- Часть анимаций тяжёлая (blur/glow/particles/continuous effects).
- `useReducedMotion` реализован, но почти не используется.
- В футере есть соц-ссылки с `href="#"`.

## Scope (IN)
1. **Visual system unification**
   - Перевести секции на дизайн-токены и переиспользуемые variants.
   - Минимизировать inline styles с fontFamily/hsl.
   - Унифицировать кнопки, бейджи, карточки, секционные фоны.

2. **Motion optimization**
   - Внедрить `prefers-reduced-motion` для всех ключевых эффектов:
     - particles
     - marquee/shine
     - hover-heavy transforms
   - Ослабить дорогостоящие blur/glow где они не дают ценности.
   - Снизить частоту/стоимость scroll-driven перерисовок.

3. **UX/Content sanity fixes**
   - Удалить/заменить пустые социальные ссылки `#`.
   - Проверить читаемость/контраст/иерархию типографики.
   - Выровнять spacing rhythm между секциями.

4. **Performance-minded frontend cleanup**
   - Пересмотреть тяжёлые участки Hero/Navbar/Stats/Marquee/FAQ.
   - Свести дублирующиеся стили и анимации к общим утилитам.
   - Не ухудшить сборку/линт.

## Scope (OUT)
- Изменение серверных rate-limit/CORS/payload контрактов
- Обновление backend-зависимостей и edge function логики

## Acceptance Criteria
1. Единый визуальный стиль across all sections.
2. Reduced-motion поддерживается и реально отключает heavy motion.
3. Нет пустых ссылок в production UI.
4. `npm run build` и `npm run lint` не ухудшены.
5. Видимо снижена визуальная «тяжесть» и jank на мобильных.

## Рекомендуемый порядок работ
1. Сначала нормализовать style system (tokens/variants).
2. Потом оптимизировать motion и scroll-heavy эффекты.
3. Затем polish по контрасту/spacing/CTA consistency.
4. Финально — smoke-check всей страницы.
