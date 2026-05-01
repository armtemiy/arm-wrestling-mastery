import { SOCIAL_LINKS } from "./social";

export const PRODUCT_LINKS = {
  boosty: SOCIAL_LINKS.telegramProfile,
  telegram: SOCIAL_LINKS.telegramProfile,
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
    title: "Библиотека материалов",
    description:
      "Для тех, кому нужен спокойный доступ к ядру Базы: видео, текстовые разборы, схемы, инфографика, чек-листы и шпаргалки. Смотришь в своем темпе, без обязательного участия в комьюнити.",
    cta: "НАПИСАТЬ ЗА ДОСТУПОМ",
    href: PRODUCT_LINKS.boosty,
  },
  {
    id: "telegram",
    label: "TELEGRAM",
    title: "Материалы + закрытая среда",
    description:
      "Главный формат Базы Армтемия: материалы, приватный Telegram-слой, топики, вопросы, обсуждения, разборы и прямой контакт с живым комьюнити вокруг системного армрестлинга.",
    cta: "НАПИСАТЬ ЗА ДОСТУПОМ",
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
  "Перестаешь зависеть от чужих шаблонов, случайных советов и чужой уверенности.",
  "Получаешь инструмент самостоятельного анализа поединков, тренировок и своей техники.",
];

export const productPillars = [
  "первопринципы вместо набора приемов",
  "биомеханика простым языком",
  "техники через векторы и положения",
  "контры, переходы и чтение борьбы",
];

export const productRoadmap = [
  {
    label: "Сейчас внутри",
    title: "Армрестлинг Релиз",
    description:
      "Фундамент Базы: оптика на борьбу, положение, биомеханика, техники, контры и переходы.",
  },
  {
    label: "Следующие материалы",
    title: "Нейротипология, питание, биохакинг",
    description:
      "Смежные темы, которые помогают точнее понимать подготовку, восстановление и поведение спортсмена.",
  },
  {
    label: "В разработке",
    title: "Упражнения, программы, разборы",
    description:
      "Практические блоки по технике упражнений, готовым программам и прикладному анализу.",
  },
];
