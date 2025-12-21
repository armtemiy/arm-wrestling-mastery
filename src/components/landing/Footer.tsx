import { Send, Youtube, Instagram } from "lucide-react";

// TikTok icon (not in lucide)
const TikTokIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const Footer = () => {
  const navLinks = [
    { label: "Обо мне", href: "#about" },
    { label: "Для кого", href: "#for-whom" },
    { label: "Программа", href: "#program" },
    { label: "Тренировки", href: "#training" },
    { label: "FAQ", href: "#faq" },
  ];

  const socialLinks = [
    { icon: Send, href: "https://t.me/armtemiy", label: "Telegram" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: TikTokIcon, href: "#", label: "TikTok" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLButtonElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="px-8 py-12 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Logo */}
          <div className="flex items-center">
            <span
              className="text-4xl text-foreground"
              style={{ fontFamily: "\"Charlie Don't Surf\", cursive" }}
            >
              Armtemiy
            </span>
          </div>

          {/* Navigation */}
          <div className="space-y-3 h-full flex flex-col justify-between">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Social & Copyright */}
          <div className="space-y-6 h-full flex flex-col justify-between">
            <div>
              <p className="text-muted-foreground mb-3">Подписывайся</p>
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-foreground/10 rounded-sm flex items-center justify-center hover:bg-foreground/20 transition-all"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4 text-foreground" />
                  </a>
                ))}
              </div>
            </div>

            <div className="w-full h-px bg-border" />

            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">
                © {new Date().getFullYear()} Armtemiy. Все права защищены.
              </p>
              <div className="flex gap-4 text-sm">
                <a
                  href="https://t.me/assistemiy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Написать
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
