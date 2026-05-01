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
    text: "Систематизация армрестлинга через технику и биомеханику",
  },
  {
    id: "lifting-experience",
    icon: "dumbbell",
    text: "Силовой бэкграунд: пауэрлифтинг и стритлифтинг",
  },
  {
    id: "tactical-analysis",
    icon: "award",
    text: "Личный бренд, консультации и закрытое комьюнити вокруг борьбы",
  },
];
