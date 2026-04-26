export const PRODUCT_LINKS = {
  boosty: "#product",
  telegram: "#product",
} as const;

export type AccessFormatId = "boosty" | "telegram";

export interface AccessFormat {
  id: AccessFormatId;
  label: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  isPrimary?: boolean;
}

export interface ProductModule {
  id: string;
  title: string;
  description: string;
}

export const productAccessFormats: AccessFormat[] = [
  {
    id: "boosty",
    label: "BOOSTY",
    title: "Только материалы",
    description:
      "Для тех, кому нужен чистый доступ к библиотеке. Смотришь материалы в своем темпе: видеоэфиры, текстовые разборы, схемы, инфографика, чек-листы и шпаргалки. Без чата и без комьюнити-слоя.",
    cta: "ОТКРЫТЬ БИБЛИОТЕКУ",
    href: PRODUCT_LINKS.boosty,
  },
  {
    id: "telegram",
    label: "TELEGRAM",
    title: "Материалы + сообщество",
    description:
      "Полный формат Базы Армтемия в приватном телеграмм канале. Те же материалы, что и на Boosty, плюс структурированное сообщество: чат, топики, вопросы, ответы, опросы и другие активности.",
    cta: "ВСТУПИТЬ В БАЗУ",
    href: PRODUCT_LINKS.telegram,
    isPrimary: true,
  },
];

export const releaseModules: ProductModule[] = [
  {
    id: "manifest",
    title: "Модуль 0 — Манифест",
    description:
      "Правильная оптика на армрестлинг. Почему шаблонное обучение ломает рост и что значит мыслить через армрестлинг.",
  },
  {
    id: "system",
    title: "Модуль 1 — Армрестлинг как система",
    description:
      "Положение как центральная единица, чтение захвата, логика доминирования и понимание того, что реально происходит в момент борьбы.",
  },
  {
    id: "biomechanics",
    title: "Модуль 2 — Биомеханика",
    description:
      "Векторы, источник силы, углы, опасные положения и судейский ремень. Язык, на котором вообще разговаривает армрестлинг.",
  },
  {
    id: "techniques",
    title: "Модуль 3 — Техники",
    description:
      "Хук, топролл, пресс и их стили как следствие векторов. Контр-матрица, переходы и авторская концепция обратных движений.",
  },
];

export const productOutcomes = [
  "Начинаешь читать положение за столом, а не просто бороться на рефлексе.",
  "Понимаешь, откуда берется сила и почему одна техника контрит другую.",
  "Перестаешь зависеть от чужих шаблонов и случайных советов.",
  "Получаешь инструмент самостоятельного анализа поединков, тренировок и своей техники.",
];
