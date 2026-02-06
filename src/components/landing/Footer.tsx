import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { COMMON_STYLES } from "./common-styles";

const Footer = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  const navLinks = [
    { label: "Лаборатория", href: "#lab" },
    { label: "Тренировки", href: "#training" },
    { label: "О себе", href: "#about" },
    { label: "FAQ", href: "#faq" },
  ];

  const socialLinks = [
    {
      name: "Telegram",
      href: "https://t.me/armtemiy",
      color: "#26A5E4",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      )
    }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLButtonElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
    }
  };

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden py-8 md:py-12 bg-background"
    >
      <div
        className={`relative max-w-4xl mx-auto rounded-3xl overflow-hidden ${prefersReducedMotion ? '' : 'transition-all duration-700 ease-out'} ${
          prefersReducedMotion || isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Glass background */}
        <div className="absolute inset-0 bg-background/60 backdrop-blur-xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/10 to-primary/5" />
        <div className="absolute inset-0 border border-border rounded-3xl" />
        <div className="absolute inset-[1px] rounded-3xl border-t border-l border-primary/20" />
        <div className="absolute top-0 left-1/4 w-[300px] h-[150px] rounded-full bg-primary/10 blur-[80px]" />
        <div className="absolute bottom-0 right-1/4 w-[200px] h-[100px] rounded-full bg-secondary/10 blur-[60px]" />

        {/* Content */}
        <div className="relative px-6 md:px-10 py-10 md:py-14">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 items-start">
              {/* Logo */}
              <div className={`flex flex-col gap-4 ${prefersReducedMotion ? '' : 'transition-all duration-500 delay-100'} ${
                prefersReducedMotion || isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <span
                  className="text-4xl text-foreground font-bold"
                  style={COMMON_STYLES.clashDisplay}
                >
                  Armtemiy
                </span>
                <p className="text-muted-foreground text-sm max-w-xs leading-relaxed" style={COMMON_STYLES.satoshi}>
                  Armtemiy Lab — диагностика и инструменты для армрестлера. Чётко, без воды.
                </p>
              </div>

              {/* Navigation */}
              <div className={`space-y-4 ${prefersReducedMotion ? '' : 'transition-all duration-500 delay-200'} ${
                prefersReducedMotion || isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <p className="text-muted-foreground text-xs uppercase tracking-[0.2em] font-semibold mb-5" style={COMMON_STYLES.satoshi}>
                  Навигация
                </p>
                <nav className="flex flex-col space-y-3">
                  {navLinks.map((link, index) => (
                    <button
                      key={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="group relative text-left w-fit overflow-hidden"
                    >
                      <span className={`relative inline-flex items-center gap-3 text-base font-medium text-muted-foreground group-hover:text-foreground ${prefersReducedMotion ? '' : 'transition-all duration-300'}`} style={COMMON_STYLES.satoshi}>
                        <span className="text-xs font-mono text-primary/60 group-hover:text-primary transition-colors duration-300">
                          0{index + 1}
                        </span>
                        {link.label}
                        <span className={`absolute -bottom-1 left-7 w-0 h-[2px] bg-gradient-to-r from-primary to-secondary ${prefersReducedMotion ? '' : 'group-hover:w-[calc(100%-1.75rem)] transition-all duration-300 ease-out'}`} />
                      </span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Social - Fancy Buttons */}
              <div className={`space-y-5 ${prefersReducedMotion ? '' : 'transition-all duration-500 delay-300'} ${
                prefersReducedMotion || isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <p className="text-muted-foreground text-xs uppercase tracking-[0.2em] font-semibold mb-5" style={COMMON_STYLES.satoshi}>
                  Социальные сети
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                      style={{
                        transitionDelay: prefersReducedMotion ? '0ms' : isVisible ? `${350 + index * 50}ms` : '0ms',
                        ['--social-color' as string]: social.color,
                      }}
                      aria-label={social.name}
                    >
                      {/* Tooltip */}
                      <span className={`absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-xs font-medium text-white whitespace-nowrap opacity-0 pointer-events-none ${prefersReducedMotion ? '' : 'group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300'}`}
                        style={{ backgroundColor: social.color }}
                      >
                        {social.name}
                        {/* Arrow */}
                        <span
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
                          style={{ backgroundColor: social.color }}
                        />
                      </span>

                      {/* Button */}
                      <span className={`relative flex items-center justify-center w-12 h-12 rounded-xl bg-card border border-border overflow-hidden ${prefersReducedMotion ? '' : 'transition-all duration-300 group-hover:scale-110 group-hover:border-primary'}`}
                        style={{
                          boxShadow: 'inset 0 -2px 4px hsl(var(--background) / 0.25)',
                        }}
                      >
                        {/* Glow background on hover */}
                        <span
                          className={`absolute inset-0 opacity-0 ${prefersReducedMotion ? '' : 'group-hover:opacity-100 transition-opacity duration-300'}`}
                          style={{
                            background: `radial-gradient(circle at center, ${social.color}30 0%, transparent 70%)`,
                          }}
                        />

                        {/* Bottom glow line */}
                        <span
                          className={`absolute bottom-0 left-0 right-0 h-[2px] opacity-0 ${prefersReducedMotion ? '' : 'group-hover:opacity-100 transition-all duration-300'}`}
                          style={{
                            background: `linear-gradient(90deg, transparent, ${social.color}, transparent)`,
                            boxShadow: `0 0 10px ${social.color}, 0 0 20px ${social.color}`,
                          }}
                        />

                        {/* Icon */}
                        <span
                          className={`relative z-10 text-muted-foreground ${prefersReducedMotion ? '' : 'group-hover:text-white transition-all duration-300 group-hover:scale-110'}`}
                          style={{
                            filter: 'drop-shadow(0 0 0px transparent)',
                          }}
                        >
                          <span
                            className="block transition-all duration-300"
                            style={{
                              color: 'currentColor',
                            }}
                          >
                            {social.icon}
                          </span>
                        </span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className={`mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 ${prefersReducedMotion ? '' : 'transition-all duration-500 delay-500'} ${
              prefersReducedMotion || isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <p className="text-muted-foreground text-sm" style={COMMON_STYLES.satoshi}>
                © {new Date().getFullYear()} Armtemiy. Все права защищены.
              </p>
              <div className="flex items-center gap-6 text-sm">
                <a
                  href="https://t.me/armtemiy_lab_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  @armtemiy_lab_bot
                </a>
                <span className="text-muted-foreground/50">•</span>
                <a
                  href="https://t.me/armtemiy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  @armtemiy
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
