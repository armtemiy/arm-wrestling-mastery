export type AboutHighlightIconKey = "bookOpen" | "dumbbell" | "award";

export interface AboutHighlightItem {
  id: string;
  text: string;
  icon: AboutHighlightIconKey;
}

export const aboutHighlights: AboutHighlightItem[] = [
  {
    id: "armwrestling-study",
    icon: "bookOpen",
    text: "3 года изучения армрестлинга от и до",
  },
  {
    id: "lifting-experience",
    icon: "dumbbell",
    text: "Опыт в пауэрлифтинге и стритлифтинге",
  },
  {
    id: "tactical-analysis",
    icon: "award",
    text: "Тактические разборы и постановка техники",
  },
];
