export type ProgramIconKey = "brain" | "calculator" | "users" | "crosshair";

export type ProgramTone = "ready" | "soon";

export type ProgramPreviewKey =
  | "diagnostic"
  | "periodization"
  | "partners"
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
    id: "diagnostic-engine",
    title: "Диагностический движок",
    description: "5–7 вопросов и точный разбор, где теряется сила.",
    icon: "brain",
    className: "md:col-span-2",
    status: "Рабочий",
    tone: "ready",
    preview: "diagnostic",
  },
  {
    id: "periodization-calculator",
    title: "Калькулятор периодизации",
    description: "План на 4 недели для силы в базовых упражнениях.",
    icon: "calculator",
    className: "md:col-span-1",
    status: "Рабочий",
    tone: "ready",
    preview: "periodization",
  },
  {
    id: "sparring-search",
    title: "Поиск спарринг-партнёров",
    description: "Подбор людей для практики рядом с тобой.",
    icon: "users",
    className: "md:col-span-1",
    status: "В разработке",
    tone: "soon",
    preview: "partners",
  },
  {
    id: "counter-moves-matrix",
    title: "Матрица контр-приёмов",
    description: "Подсказки, чем отвечать на стили соперников.",
    icon: "crosshair",
    className: "md:col-span-2",
    status: "В разработке",
    tone: "soon",
    preview: "counterMoves",
  },
];