import { useScrollReveal } from "@/hooks/useScrollReveal";

const Footer = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  const navLinks = [
    { label: "Программа", href: "#program" },
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
    },
    { 
      name: "YouTube", 
      href: "#",
      color: "#FF0000",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    { 
      name: "Instagram", 
      href: "#",
      color: "#E4405F",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
        </svg>
      )
    },
    { 
      name: "TikTok", 
      href: "#",
      color: "#00F2EA",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
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
      className="relative overflow-hidden py-8 md:py-12 bg-[hsl(0_0%_10%)]"
    >
      <div 
        className={`relative max-w-4xl mx-auto rounded-3xl overflow-hidden transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Glass background */}
        <div className="absolute inset-0 bg-[hsl(0_0%_100%/0.04)] backdrop-blur-xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(0_0%_100%/0.1)] via-[hsl(0_0%_100%/0.03)] to-[hsl(30_80%_60%/0.05)]" />
        <div className="absolute inset-0 border border-[hsl(0_0%_100%/0.15)] rounded-3xl" />
        <div className="absolute inset-[1px] rounded-3xl border-t border-l border-[hsl(0_0%_100%/0.2)]" />
        <div className="absolute top-0 left-1/4 w-[300px] h-[150px] rounded-full bg-[hsl(30_80%_60%/0.08)] blur-[80px]" />
        <div className="absolute bottom-0 right-1/4 w-[200px] h-[100px] rounded-full bg-[hsl(200_60%_60%/0.06)] blur-[60px]" />
        
        {/* Content */}
        <div className="relative px-6 md:px-10 py-10 md:py-14">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 items-start">
              {/* Logo */}
              <div className={`flex flex-col gap-4 transition-all duration-500 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <span
                  className="text-4xl text-white"
                  style={{ fontFamily: "\"Charlie Don't Surf\", cursive" }}
                >
                  Armtemiy
                </span>
                <p className="text-[hsl(0_0%_100%/0.5)] text-sm max-w-xs leading-relaxed">
                  Побеждай за столом, а не гадай как. Система тренировок и техники армрестлинга.
                </p>
              </div>

              {/* Navigation */}
              <div className={`space-y-4 transition-all duration-500 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <p className="text-[hsl(0_0%_100%/0.4)] text-xs uppercase tracking-[0.2em] font-semibold mb-5">
                  Навигация
                </p>
                <nav className="flex flex-col space-y-3">
                  {navLinks.map((link, index) => (
                    <button
                      key={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="group relative text-left w-fit overflow-hidden"
                    >
                      <span className="relative inline-flex items-center gap-3 text-base font-medium text-[hsl(0_0%_100%/0.7)] group-hover:text-white transition-all duration-300">
                        <span className="text-xs font-mono text-[hsl(150_70%_45%/0.6)] group-hover:text-[hsl(150_70%_50%)] transition-colors duration-300">
                          0{index + 1}
                        </span>
                        {link.label}
                        <span className="absolute -bottom-1 left-7 w-0 h-[2px] bg-gradient-to-r from-[hsl(150_70%_45%)] to-[hsl(85_90%_60%)] group-hover:w-[calc(100%-1.75rem)] transition-all duration-300 ease-out" />
                      </span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Social - Fancy Buttons */}
              <div className={`space-y-5 transition-all duration-500 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <p className="text-[hsl(0_0%_100%/0.4)] text-xs uppercase tracking-[0.2em] font-semibold mb-5">
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
                        transitionDelay: isVisible ? `${350 + index * 50}ms` : '0ms',
                        ['--social-color' as string]: social.color,
                      }}
                      aria-label={social.name}
                    >
                      {/* Tooltip */}
                      <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-xs font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none"
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
                      <span className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(0_0%_15%)] border border-[hsl(0_0%_100%/0.1)] overflow-hidden transition-all duration-300 group-hover:scale-110 group-hover:border-transparent"
                        style={{
                          boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.2)',
                        }}
                      >
                        {/* Glow background on hover */}
                        <span 
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ 
                            background: `radial-gradient(circle at center, ${social.color}30 0%, transparent 70%)`,
                          }}
                        />
                        
                        {/* Bottom glow line */}
                        <span 
                          className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300"
                          style={{ 
                            background: `linear-gradient(90deg, transparent, ${social.color}, transparent)`,
                            boxShadow: `0 0 10px ${social.color}, 0 0 20px ${social.color}`,
                          }}
                        />
                        
                        {/* Icon */}
                        <span 
                          className="relative z-10 text-[hsl(0_0%_100%/0.7)] group-hover:text-white transition-all duration-300 group-hover:scale-110"
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
            <div className={`mt-12 pt-8 border-t border-[hsl(0_0%_100%/0.1)] flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-500 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <p className="text-[hsl(0_0%_100%/0.4)] text-sm">
                © {new Date().getFullYear()} Armtemiy. Все права защищены.
              </p>
              <div className="flex items-center gap-6 text-sm">
                <a
                  href="https://t.me/armtemiy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(0_0%_100%/0.5)] hover:text-[hsl(150_70%_50%)] transition-colors duration-300"
                >
                  @armtemiy
                </a>
                <span className="text-[hsl(0_0%_100%/0.2)]">•</span>
                <a
                  href="https://t.me/assistemiy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(0_0%_100%/0.5)] hover:text-[hsl(150_70%_50%)] transition-colors duration-300"
                >
                  @assistemiy
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
