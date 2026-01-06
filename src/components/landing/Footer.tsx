import { useScrollReveal } from "@/hooks/useScrollReveal";

const Footer = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  const navLinks = [
    { label: "ПРОГРАММА", href: "#program" },
    { label: "ТРЕНИРОВКИ", href: "#training" },
    { label: "О СЕБЕ", href: "#about" },
    { label: "FAQ", href: "#faq" },
  ];

  const socialLinks = [
    {
      name: "Telegram",
      href: "https://t.me/assistemiy",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      )
    },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLButtonElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden py-12 bg-metal-900 border-t-2 border-metal-800"
    >
      <div
        className={`container mx-auto px-4 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          {/* Main content */}
          <div className="grid md:grid-cols-3 gap-8 items-start mb-8">
            {/* Logo */}
            <div className={`space-y-4 transition-all duration-500 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <span
                className="font-display text-3xl text-metal-50"
                style={{ textShadow: '2px 2px 0 hsl(24 98% 32%)' }}
              >
                ARMTEMIY
              </span>
              <p className="font-body text-sm text-metal-500 max-w-xs leading-relaxed">
                Система армрестлинга. Биомеханика. Техника. Сила.
              </p>
            </div>

            {/* Navigation */}
            <div className={`space-y-4 transition-all duration-500 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <p className="font-mono text-xs text-rust-500 uppercase tracking-widest">
                Навигация
              </p>
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link, index) => (
                  <button
                    key={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="group text-left"
                  >
                    <span className="flex items-center gap-3 font-mono text-sm text-metal-400 group-hover:text-rust-500 transition-colors">
                      <span className="text-metal-700">0{index + 1}</span>
                      {link.label}
                    </span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div className={`space-y-4 transition-all duration-500 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <p className="font-mono text-xs text-rust-500 uppercase tracking-widest">
                Контакт
              </p>
              <a
                href="https://t.me/assistemiy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-mono text-sm text-metal-400 hover:text-rust-500 transition-colors"
              >
                @assistemiy
              </a>
              <div className="pt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-metal-800 border border-metal-700 hover:border-rust-600 transition-all duration-200"
                    aria-label={social.name}
                  >
                    {social.icon}
                    <span className="font-mono text-xs text-metal-400">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className={`pt-6 border-t border-metal-800 flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-500 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <p className="font-mono text-xs text-metal-600">
              © {new Date().getFullYear()} ARMTEMIY • ТУЛА
            </p>
            <p className="font-mono text-xs text-metal-700">
              SYSTEM • BIOMECHANICS • TECHNIQUE
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
