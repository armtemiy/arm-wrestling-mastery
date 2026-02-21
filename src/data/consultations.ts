export interface ConsultationOption {
  id: string;
  label: string;
}

export const consultationOptions: ConsultationOption[] = [
  { id: "location", label: "Где тренируюсь и какой инвентарь доступен" },
  { id: "anthropometry", label: "Антропометрия и подбор стиля борьбы" },
  { id: "technique", label: "Техника: старт, позиция, связки, ошибки" },
  { id: "background", label: "Спортивный бэкграунд: что уже сильное, что подтянуть" },
  { id: "injuries", label: "Травмы/ограничения и адаптация нагрузки" },
  { id: "program", label: "Программа тренировок под мои условия" },
  { id: "nutrition", label: "Питание и восстановление" },
  { id: "supplements", label: "БАДы (в рамках общих рекомендаций)" },
  { id: "strategy", label: "Стратегия прогресса на 4–8 недель" },
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
