export interface ConsultationOption {
  id: string;
  label: string;
  link?: string;
}

export const consultationOptions: ConsultationOption[] = [
  { id: "anthropometry", label: "Антропометрический разбор и подбор стилей борьбы" },
  { id: "neurotypology", label: "Нейротипология в армрестлинге", link: "/neurotypology" },
  { id: "strategy", label: "Стратегии под твой темперамент и психику" },
  { id: "technique", label: "Теория: биомеханика, контр-матрица, хитрости" },
  { id: "injuries", label: "Индивидуальная адаптация под травмы и ограничения" },
  { id: "mindset", label: "Мышление под давлением и позиционная логика" },
  { id: "nutrition", label: "Питание и восстановление под твой режим" },
];

export const DEFAULT_TELEGRAM_TEXT = "Привет! Хочу крафтовую консультацию. Моя цель: ____. Тренируюсь: ____ (дом/воркаут/фитнес/арм-зал). Что хочу разобрать: ____.";

export const TELEGRAM_HANDLE = "armwrestIer";

export function buildTelegramUrl(selectedIds: string[]): string {
  let text = DEFAULT_TELEGRAM_TEXT;
  
  if (selectedIds.length > 0) {
    const selectedLabels = selectedIds.map(id => {
      const option = consultationOptions.find(opt => opt.id === id);
      return option ? option.label : "";
    }).filter(Boolean);
    
    text += `\n\nИнтересует: ${selectedLabels.join(", ")}.`;
  }
  
  return `https://t.me/${TELEGRAM_HANDLE}?text=${encodeURIComponent(text)}`;
}