import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress (0 to 1) based on first 200px of scroll
      const progress = Math.min(window.scrollY / 200, 1);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#program", label: "Программа" },
    { href: "#training", label: "Тренировки" },
    { href: "#about", label: "О себе" },
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

  // Dynamic styles based on scroll
  const navbarStyle = {
    padding: `${12 - scrollProgress * 4}px ${16 - scrollProgress * 4}px`,
    backgroundColor: `hsl(0 0% 8% / ${0.7 + scrollProgress * 0.25})`,
    backdropFilter: `blur(${12 + scrollProgress * 8}px)`,
    boxShadow: scrollProgress > 0.1 
      ? `0 ${4 + scrollProgress * 8}px ${16 + scrollProgress * 16}px hsl(0 0% 0% / ${0.15 + scrollProgress * 0.15})`
      : 'none',
  };

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

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="px-3 py-1.5 text-sm font-medium text-[hsl(0_0%_98%/0.7)] hover:text-[hsl(0_0%_98%)] transition-colors rounded-full hover:bg-[hsl(0_0%_100%/0.1)]"
              >
                {link.label}
              </button>
            ))}
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
                  className="w-full px-6 py-4 text-lg font-medium text-[hsl(0_0%_98%)] hover:bg-[hsl(0_0%_100%/0.1)] rounded-xl transition-colors text-left"
                >
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
