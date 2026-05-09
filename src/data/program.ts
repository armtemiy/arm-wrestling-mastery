export type ProgramIconKey = "calculator" | "users" | "crosshair";

export type ProgramTone = "ready" | "soon";

export type ProgramPreviewKey =
  | "partners"
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
      "Найди людей для практики рядом с тобой через Telegram.",
    icon: "users",
    className: "md:col-span-1",
    status: "Доступно",
    tone: "ready",
    preview: "partners",
  },
  {
    id: "periodization-calculator",
    title: "Калькулятор периодизации",
    description:
      "Простой ориентир по 4-недельной силовой работе — как вспомогательный слой Лаборатории.",
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
      "Короткие подсказки против базовых стилей соперника.",
    icon: "crosshair",
    className: "md:col-span-1",
    status: "Roadmap",
    tone: "soon",
    preview: "counterMoves",
  },
];
