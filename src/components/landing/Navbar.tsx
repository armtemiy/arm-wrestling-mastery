import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / 300, 1);
      setScrollProgress(progress);

      // Detect active section
      const sections = ["program", "training", "about", "faq"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
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
    { href: "#program", label: "ПРОГРАММА" },
    { href: "#training", label: "ТРЕНИРОВКИ" },
    { href: "#about", label: "О СЕБЕ" },
    { href: "#faq", label: "FAQ" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  // Brutal navbar styling based on scroll
  const navbarStyle = {
    backgroundColor: scrollProgress > 0.1
      ? `hsl(210 15% 6% / ${0.95 + scrollProgress * 0.05})`
      : `hsl(210 15% 6% / 0.9)`,
    backdropFilter: `blur(${12 + scrollProgress * 8}px)`,
    borderBottom: scrollProgress > 0.1 ? '2px solid hsl(24 98% 32%)' : '2px solid transparent',
    boxShadow: scrollProgress > 0.1
      ? `0 ${4 + scrollProgress * 4}px ${16 + scrollProgress * 8}px hsl(0 0% 0% / ${0.3 + scrollProgress * 0.2})`
      : 'none',
  };

  return (
    <>
      {/* Brutal industrial navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
        style={navbarStyle}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo - Brutal display */}
            <a
              href="#"
              className="font-display text-2xl text-metal-50 tracking-tight"
              style={{ textShadow: '2px 2px 0 hsl(24 98% 32%)' }}
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              ARMTEMIY
            </a>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;

                return (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className={`relative px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all duration-200 ${
                      isActive
                        ? 'text-rust-500'
                        : 'text-metal-400 hover:text-metal-200'
                    }`}
                  >
                    {/* Active indicator line */}
                    {isActive && (
                      <div className="absolute bottom-0 left-2 right-2 h-[2px] bg-rust-600" />
                    )}
                    {link.label}
                  </button>
                );
              })}
            </div>

            {/* CTA Button */}
            <a
              href="https://t.me/assistemiy"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center justify-center px-6 py-2 bg-rust-600 text-metal-50 font-mono text-xs uppercase tracking-wider font-bold rounded-sm shadow-brutal-sm hover:bg-rust-500 hover:shadow-brutal hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200"
            >
              Написать
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 bg-metal-800 border border-metal-700 flex items-center justify-center text-metal-300 hover:border-rust-600 hover:text-rust-500 transition-all duration-200"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu - Brutal full-screen overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 pt-20 bg-metal-900 md:hidden">
          {/* Grid pattern background */}
          <div className="absolute inset-0 bg-grid opacity-[0.05]" />

          {/* Corner decoration */}
          <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-rust-600 opacity-20" />

          <div className="relative container mx-auto px-4 py-8">
            <div className="space-y-2">
              {navLinks.map((link, index) => {
                const isActive = activeSection === link.href;

                return (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className={`w-full flex items-center gap-4 px-4 py-4 border-2 transition-all duration-200 ${
                      isActive
                        ? 'bg-metal-800 border-rust-600'
                        : 'bg-metal-800 border-metal-700 hover:border-rust-600'
                    }`}
                  >
                    <span className="font-mono text-xs text-metal-600">
                      0{index + 1}
                    </span>
                    <span className={`font-mono text-sm uppercase tracking-wider ${
                      isActive ? 'text-rust-500' : 'text-metal-300'
                    }`}>
                      {link.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Mobile CTA */}
            <div className="mt-8">
              <a
                href="https://t.me/assistemiy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full px-8 py-5 bg-rust-600 text-metal-50 font-mono text-sm uppercase tracking-wider font-bold border-none rounded-sm shadow-brutal hover:bg-rust-500 hover:shadow-brutal-lg hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200"
              >
                Написать в Telegram
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
