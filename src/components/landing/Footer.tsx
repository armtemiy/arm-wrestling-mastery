import React from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { COMMON_STYLES } from "./common-styles";

const Footer = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  const navLinks = [
    { label: "Лаборатория", href: "#lab" },
    { label: "Консультации", href: "#consultations" },
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
      className="relative overflow-hidden py-6 sm:py-8 md:py-10 bg-background"
    >
      <div
        className={`relative max-w-4xl mx-4 sm:mx-auto rounded-2xl sm:rounded-3xl overflow-hidden ${prefersReducedMotion ? '' : 'transition-all duration-700 ease-out'} ${
          prefersReducedMotion || isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="absolute inset-0 bg-background/60 backdrop-blur-xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/10 to-primary/5" />
        <div className="absolute inset-0 border border-border rounded-2xl sm:rounded-3xl" />
        <div className="absolute inset-[1px] rounded-2xl sm:rounded-3xl border-t border-l border-primary/20" />
        <div className="absolute top-0 left-1/4 w-[200px] sm:w-[300px] h-[100px] sm:h-[150px] rounded-full bg-primary/10 blur-[60px] sm:blur-[80px]" />
        <div className="absolute bottom-0 right-1/4 w-[150px] sm:w-[200px] h-[75px] sm:h-[100px] rounded-full bg-secondary/10 blur-[45px] sm:blur-[60px]" />

        <div className="relative px-5 sm:px-6 md:px-8 py-6 sm:py-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3 md:gap-10 items-start">
              <div className={`flex flex-col gap-2 sm:gap-3 text-center md:text-left ${prefersReducedMotion ? '' : 'transition-all duration-500 delay-100'} ${
                prefersReducedMotion || isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <span
                  className="text-2xl sm:text-3xl text-foreground font-bold"
                  style={COMMON_STYLES.clashDisplay}
                >
                  Armtemiy
                </span>
                <p className="text-muted-foreground text-xs sm:text-sm max-w-xs mx-auto md:mx-0 leading-relaxed" style={COMMON_STYLES.satoshi}>
                  Armtemiy Lab — инструменты + крафтовые консультации для армрестлера.
                </p>
              </div>

              <div className={`space-y-4 text-center md:text-left ${prefersReducedMotion ? '' : 'transition-all duration-500 delay-200'} ${
                prefersReducedMotion || isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <p className="text-muted-foreground text-xs uppercase tracking-[0.2em] font-semibold mb-4 sm:mb-5" style={COMMON_STYLES.satoshi}>
                  Навигация
                </p>
                <nav className="flex flex-row flex-wrap justify-center md:flex-col md:justify-start gap-3 sm:gap-4 md:space-y-3">
                  {navLinks.map((link, index) => (
                    <button
                      key={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="group relative text-center md:text-left w-fit mx-auto md:mx-0 overflow-hidden min-h-[44px] min-w-[44px] flex items-center justify-center md:justify-start px-3 md:px-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg"
                    >
                      <span className={`relative inline-flex items-center gap-2 sm:gap-3 text-sm sm:text-base font-medium text-muted-foreground group-hover:text-foreground ${prefersReducedMotion ? '' : 'transition-all duration-300'}`} style={COMMON_STYLES.satoshi}>
                        <span className="text-xs font-mono text-primary/60 group-hover:text-primary transition-colors duration-300">
                          0{index + 1}
                        </span>
                        {link.label}
                        <span className={`absolute -bottom-1 left-5 sm:left-7 w-0 h-[2px] bg-gradient-to-r from-primary to-secondary ${prefersReducedMotion ? '' : 'group-hover:w-[calc(100%-1.25rem)] sm:group-hover:w-[calc(100%-1.75rem)] transition-all duration-300 ease-out'}`} />
                      </span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className={`space-y-4 sm:space-y-5 text-center md:text-left ${prefersReducedMotion ? '' : 'transition-all duration-500 delay-300'} ${
                prefersReducedMotion || isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <p className="text-muted-foreground text-xs uppercase tracking-[0.2em] font-semibold mb-4 sm:mb-5" style={COMMON_STYLES.satoshi}>
                  Связаться
                </p>
                <div className="flex justify-center md:justify-start gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl"
                      style={{
                        transitionDelay: prefersReducedMotion ? '0ms' : isVisible ? `${350 + index * 50}ms` : '0ms',
                        ['--social-color' as string]: social.color,
                      }}
                      aria-label={`${social.name} - @armtemiy`}
                    >
                      <span className={`absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-xs font-medium text-white whitespace-nowrap opacity-0 pointer-events-none ${prefersReducedMotion ? '' : 'group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300'}`}
                        style={{ backgroundColor: social.color }}
                      >
                        {social.name}
                        <span
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
                          style={{ backgroundColor: social.color }}
                        />
                      </span>

                      <span className={`relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-card border border-border overflow-hidden ${prefersReducedMotion ? '' : 'transition-all duration-300 group-hover:scale-110 group-hover:border-primary'}`}
                        style={{
                          boxShadow: 'inset 0 -2px 4px hsl(var(--background) / 0.25)',
                        }}
                      >
                        <span
                          className={`absolute inset-0 opacity-0 ${prefersReducedMotion ? '' : 'group-hover:opacity-100 transition-opacity duration-300'}`}
                          style={{
                            background: `radial-gradient(circle at center, ${social.color}30 0%, transparent 70%)`,
                          }}
                        />

                        <span
                          className={`absolute bottom-0 left-0 right-0 h-[2px] opacity-0 ${prefersReducedMotion ? '' : 'group-hover:opacity-100 transition-all duration-300'}`}
                          style={{
                            background: `linear-gradient(90deg, transparent, ${social.color}, transparent)`,
                            boxShadow: `0 0 10px ${social.color}, 0 0 20px ${social.color}`,
                          }}
                        />

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

            <div className={`mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-border flex flex-col items-center gap-3 sm:gap-4 md:flex-row md:justify-between ${prefersReducedMotion ? '' : 'transition-all duration-500 delay-500'} ${
              prefersReducedMotion || isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <p className="text-muted-foreground text-xs sm:text-sm text-center md:text-left" style={COMMON_STYLES.satoshi}>
                © {new Date().getFullYear()} Armtemiy. Все права защищены.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                <a
                  href="https://t.me/armtemiy_lab_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[36px] flex items-center text-muted-foreground hover:text-primary transition-colors duration-300 px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg"
                >
                  @armtemiy_lab_bot
                </a>
                <span className="hidden sm:inline text-muted-foreground/50" aria-hidden="true">•</span>
                <a
                  href="https://t.me/armtemiy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[36px] flex items-center text-muted-foreground hover:text-primary transition-colors duration-300 px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg"
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

const MemoizedFooter = React.memo(Footer);
export default MemoizedFooter;