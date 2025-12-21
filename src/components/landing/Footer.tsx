// Telegram icon - brand color
const TelegramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#26A5E4">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

// YouTube icon - brand color
const YouTubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FF0000">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

// Instagram icon - gradient effect
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
    <defs>
      <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFDC80"/>
        <stop offset="25%" stopColor="#FCAF45"/>
        <stop offset="50%" stopColor="#F77737"/>
        <stop offset="75%" stopColor="#C13584"/>
        <stop offset="100%" stopColor="#833AB4"/>
      </linearGradient>
    </defs>
    <path fill="url(#instagram-gradient)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

// TikTok icon - brand colors (cyan + red)
const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
    <path fill="#25F4EE" d="M9.37 23.5a7.14 7.14 0 0 1 0-14.28v3.57a3.57 3.57 0 1 0 3.57 3.57V0h3.57a7.14 7.14 0 0 0 7.14 7.14v3.57a10.71 10.71 0 0 1-7.14-2.73v8.88a7.14 7.14 0 0 1-7.14 7.14z"/>
    <path fill="#FE2C55" d="M12.94 16.36a3.57 3.57 0 1 0-3.57-3.57v12.85a7.14 7.14 0 0 0 7.14-7.14V5.62a10.71 10.71 0 0 0 7.14 2.73V4.78a7.14 7.14 0 0 1-7.14-7.14h-3.57v16.36a3.57 3.57 0 0 1 0 2.36z"/>
    <path fill="#FFFFFF" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

const Footer = () => {
  const navLinks = [
    { label: "Программа", href: "#program" },
    { label: "Тренировки", href: "#training" },
    { label: "О себе", href: "#about" },
    { label: "Для кого", href: "#for-whom" },
    { label: "FAQ", href: "#faq" },
  ];

  const socialLinks = [
    { icon: TelegramIcon, href: "https://t.me/armtemiy", label: "Telegram" },
    { icon: YouTubeIcon, href: "#", label: "YouTube" },
    { icon: InstagramIcon, href: "#", label: "Instagram" },
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
    <footer className="px-8 py-16 section-charcoal border-t border-[hsl(0_0%_100%/0.1)]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Logo */}
          <div className="flex flex-col gap-4">
            <span
              className="text-4xl text-[hsl(0_0%_98%)]"
              style={{ fontFamily: "\"Charlie Don't Surf\", cursive" }}
            >
              Armtemiy
            </span>
            <p className="text-[hsl(0_0%_98%/0.5)] text-sm max-w-xs">
              Системный подход к армрестлингу. От основ до продвинутых техник.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <p className="text-[hsl(0_0%_98%/0.4)] text-xs uppercase tracking-wider mb-4">Навигация</p>
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block text-[hsl(0_0%_98%/0.7)] hover:text-[hsl(0_0%_98%)] transition-colors text-left text-sm"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Social & Copyright */}
          <div className="space-y-6">
            <div>
              <p className="text-[hsl(0_0%_98%/0.4)] text-xs uppercase tracking-wider mb-4">Социальные сети</p>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[hsl(0_0%_100%/0.05)] hover:bg-[hsl(0_0%_100%/0.1)] flex items-center justify-center transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon />
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[hsl(0_0%_100%/0.1)]">
              <p className="text-[hsl(0_0%_98%/0.4)] text-sm">
                © {new Date().getFullYear()} Armtemiy
              </p>
              <a
                href="https://t.me/assistemiy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[hsl(30_80%_55%)] hover:text-[hsl(30_80%_65%)] transition-colors text-sm mt-2 inline-block"
              >
                Написать в Telegram →
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
