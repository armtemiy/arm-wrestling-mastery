export type ProgramIconKey = "brain" | "calculator" | "users" | "crosshair";

export type ProgramTone = "ready" | "soon";

export type ProgramPreviewKey =
  | "partners"
  | "toolkit"
  | "periodization"
  | "counterMoves";

export interface ProgramCard {
  id: string;
  title: string;
  description: string;
  icon: ProgramIconKey;
  className: string;
  status: string;
  tone: ProgramTone;
  preview: ProgramPreviewKey;
}

export const programCards: ProgramCard[] = [
  {
    id: "sparring-search",
    title: "Спарринг-профиль и поиск",
    description:
      "Главный v1-сценарий: найти людей для практики рядом с тобой через Telegram.",
    icon: "users",
    className: "md:col-span-2",
    status: "Доступно в v1",
    tone: "ready",
    preview: "partners",
  },
  {
    id: "pocket-tools",
    title: "Карманные инструменты",
    description:
      "Быстрые прикладные подсказки без лишней платформенности и магии.",
    icon: "brain",
    className: "md:col-span-1",
    status: "Доступно в v1",
    tone: "ready",
    preview: "toolkit",
  },
  {
    id: "periodization-calculator",
    title: "Калькулятор периодизации",
    description:
      "Простой ориентир по 4-недельной силовой работе — как вспомогательный слой Lab.",
    icon: "calculator",
    className: "md:col-span-1",
    status: "Roadmap",
    tone: "soon",
    preview: "periodization",
  },
  {
    id: "counter-moves-matrix",
    title: "Матрица контр-приёмов",
    description:
      "Короткие подсказки против базовых стилей соперника — в развитии после v1.",
    icon: "crosshair",
    className: "md:col-span-2",
    status: "Roadmap",
    tone: "soon",
    preview: "counterMoves",
  },
];
