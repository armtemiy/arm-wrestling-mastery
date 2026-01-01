import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / 200, 1);
      setScrollProgress(progress);

      // Detect active section
      const sections = ["program", "training", "about", "faq"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(`#${section}`);
            return;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection(null);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#program", label: "Программа" },
    { href: "#training", label: "Тренировки" },
    { href: "#about", label: "О себе" },
    { href: "#faq", label: "FAQ" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    handleCloseMobileMenu();
  };

  const handleCloseMobileMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsClosing(false);
    }, 200);
  };

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      handleCloseMobileMenu();
    } else {
      setIsMobileMenuOpen(true);
    }
  };

  const navbarStyle = {
    padding: `${12 - scrollProgress * 4}px ${16 - scrollProgress * 4}px`,
    backgroundColor: `hsl(0 0% 8% / ${0.7 + scrollProgress * 0.25})`,
    backdropFilter: `blur(${12 + scrollProgress * 8}px)`,
    boxShadow: scrollProgress > 0.1 
      ? `0 ${4 + scrollProgress * 8}px ${16 + scrollProgress * 16}px hsl(0 0% 0% / ${0.15 + scrollProgress * 0.15})`
      : 'none',
  };

  // Get the current indicator target (hovered or active)
  const indicatorTarget = hoveredLink || activeSection;

  return (
    <>
      <nav 
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-full border border-[hsl(0_0%_100%/0.1)] transition-all duration-300 ease-out"
        style={navbarStyle}
      >
        <div className="flex items-center gap-1 md:gap-2">
          {/* Logo */}
          <a
            href="#"
            className="px-3 py-1.5 text-lg md:text-xl text-[hsl(0_0%_98%)] font-medium whitespace-nowrap"
            style={{ fontFamily: "\"Charlie Don't Surf\", cursive" }}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Armtemiy
          </a>

          {/* Desktop Links with Tubelight Effect */}
          <div className="hidden md:flex items-center gap-0.5 relative">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              const isHovered = hoveredLink === link.href;
              
              return (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`relative px-3 py-1.5 text-sm font-medium transition-all duration-300 rounded-full ${
                    isActive || isHovered
                      ? 'text-white'
                      : 'text-[hsl(0_0%_98%/0.7)] hover:text-[hsl(0_0%_98%)]'
                  }`}
                >
                  {/* Background glow for active/hovered */}
                  <span 
                    className={`absolute inset-0 rounded-full transition-all duration-300 ${
                      isActive || isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      background: isActive || isHovered 
                        ? 'radial-gradient(ellipse at bottom, rgba(54,226,168,0.15) 0%, transparent 70%)'
                        : 'transparent',
                    }}
                  />
                  
                  {/* Tubelight glow (bottom light) */}
                  <span 
                    className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-[3px] rounded-full transition-all duration-300 ${
                      isActive || isHovered ? 'opacity-100 w-8' : 'opacity-0 w-0'
                    }`}
                    style={{
                      background: 'linear-gradient(90deg, transparent, #36E2A8, transparent)',
                      boxShadow: isActive || isHovered 
                        ? '0 0 10px #36E2A8, 0 0 20px #36E2A8, 0 0 30px rgba(54,226,168,0.5)'
                        : 'none',
                    }}
                  />
                  
                  {/* Text */}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* CTA Button */}
          <Button asChild variant="cta" size="sm" className="hidden md:inline-flex ml-1 rounded-full text-sm px-4 py-1.5 h-auto">
            <a href="https://t.me/assistemiy" target="_blank" rel="noopener noreferrer">
              Написать
            </a>
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-[hsl(0_0%_98%)] hover:bg-[hsl(0_0%_100%/0.1)] rounded-full transition-colors"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`fixed inset-0 z-40 pt-20 px-4 bg-[hsl(0_0%_8%/0.98)] backdrop-blur-xl md:hidden ${isClosing ? 'mobile-menu-exit' : 'mobile-menu-enter'}`}>
          <div className="flex flex-col">
            {navLinks.map((link, index) => (
              <div key={link.href}>
                <button
                  onClick={() => scrollToSection(link.href)}
                  className={`w-full px-6 py-4 text-lg font-medium rounded-xl transition-colors text-left flex items-center gap-3 ${
                    activeSection === link.href 
                      ? 'text-[#36E2A8] bg-[#36E2A8]/10' 
                      : 'text-[hsl(0_0%_98%)] hover:bg-[hsl(0_0%_100%/0.1)]'
                  }`}
                >
                  {activeSection === link.href && (
                    <span className="w-2 h-2 rounded-full bg-[#36E2A8] animate-pulse" />
                  )}
                  {link.label}
                </button>
                {index < navLinks.length - 1 && (
                  <div className="mx-6 h-px bg-[hsl(0_0%_100%/0.1)]" />
                )}
              </div>
            ))}
            <div className="mx-6 h-px bg-[hsl(0_0%_100%/0.1)]" />
            <Button asChild variant="cta" size="lg" className="mt-4 mx-6 rounded-full">
              <a href="https://t.me/assistemiy" target="_blank" rel="noopener noreferrer">
                Написать в Telegram
              </a>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
