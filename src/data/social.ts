export const SOCIAL_LINKS = {
  telegramProfile: "https://t.me/armtemiy",
  telegramChat: "https://t.me/+uV1pBVaDxfIwYmFi",
  telegramBot: "https://t.me/armtemiy_lab_bot",
  tiktok: "https://www.tiktok.com/@armtemiy6",
  instagram: "https://www.instagram.com/armtemiy",
  threads: "https://www.threads.com/@armtemiy",
  articles: "http://blog.armtemiy.online/",
} as const;

export type FooterSocialId = "telegram" | "tiktok" | "instagram" | "threads" | "articles";

export interface FooterSocialLink {
  id: FooterSocialId;
  name: string;
  label: string;
  href: string;
  color: string;
}

export const footerSocialLinks: FooterSocialLink[] = [
  {
    id: "telegram",
    name: "Telegram",
    label: "Telegram Армтемия",
    href: SOCIAL_LINKS.telegramProfile,
    color: "#26A5E4",
  },
  {
    id: "tiktok",
    name: "TikTok",
    label: "TikTok Армтемия",
    href: SOCIAL_LINKS.tiktok,
    color: "#00F2EA",
  },
  {
    id: "instagram",
    name: "Instagram",
    label: "Instagram Армтемия",
    href: SOCIAL_LINKS.instagram,
    color: "#E4405F",
  },
  {
    id: "threads",
    name: "Threads",
    label: "Threads Армтемия",
    href: SOCIAL_LINKS.threads,
    color: "#F5F5F5",
  },
  {
    id: "articles",
    name: "Статьи",
    label: "Статьи Армтемия",
    href: SOCIAL_LINKS.articles,
    color: "#F2C078",
  },
];
