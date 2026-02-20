export interface TextFeatureItem {
  id: string;
  text: string;
}

export type AboutHighlightIconKey = "bookOpen" | "dumbbell" | "award";

export type TrainingDetailIconKey = "mapPin" | "clock" | "users";

export interface AboutHighlightItem extends TextFeatureItem {
  icon: AboutHighlightIconKey;
}

export interface TrainingDetailItem extends TextFeatureItem {
  icon: TrainingDetailIconKey;
}

export const leadMagnetBenefits: TextFeatureItem[] = [
  { id: "mistakes", text: "5 главных ошибок новичков за столом" },
  { id: "warmup-checklist", text: "Чек-лист разминки перед борьбой" },
  { id: "explosive-start", text: "3 упражнения для взрывного старта" },
  { id: "elbow-safety", text: "Как не травмировать локоть" },
];

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

export const trainingDetails: TrainingDetailItem[] = [
  { id: "location", icon: "mapPin", text: "Тула, своя комната с оборудованием" },
  { id: "price", icon: "clock", text: "От 500₽ за час работы" },
  { id: "with-friend", icon: "users", text: "Можно прийти с другом" },
];