import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { COMMON_STYLES } from "./common-styles";

const Navbar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  const navLinks = useMemo(
    () => [
      { href: "#lab", label: "Лаборатория" },
      { href: "#training", label: "Тренировки" },
      { href: "#about", label: "О\u00A0себе" },
      { href: "#faq", label: "FAQ" },
    ],
    []
  );

  const navbarStyle = useMemo(
    () => ({
      padding: `${12 - scrollProgress * 4}px ${16 - scrollProgress * 4}px`,
      backgroundColor: `hsl(15 6% 10% / ${0.85 + scrollProgress * 0.1})`,
      backdropFilter: `blur(${12 + scrollProgress * 8}px)`,
      boxShadow:
        scrollProgress > 0.1
          ? `0 ${4 + scrollProgress * 8}px ${16 + scrollProgress * 16}px hsl(0 0% 0% / ${0.2 + scrollProgress * 0.1})`
          : "0 8px 32px hsl(0 0% 0% / 0.4)",
    }),
    [scrollProgress]
  );

  const handleCloseMobileMenu = useCallback(() => {
    setIsClosing(true);
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsClosing(false);
      closeTimeoutRef.current = null;
    }, 200);
  }, []);

  const scrollToSection = useCallback(
    (href: string) => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      handleCloseMobileMenu();
    },
    [handleCloseMobileMenu]
  );

  const toggleMobileMenu = useCallback(() => {
    if (isMobileMenuOpen) {
      handleCloseMobileMenu();
    } else {
      setIsMobileMenuOpen(true);
    }
  }, [isMobileMenuOpen, handleCloseMobileMenu]);

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / 200, 1);
      setScrollProgress(progress);

      const sections = ["lab", "training", "about", "faq"];
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

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <nav
        className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 rounded-full border border-white/10 transition-all duration-500 ease-out"
        style={navbarStyle}
      >
        <div className="flex items-center gap-2 md:gap-4">
          <a
            href="#"
            className="px-4 py-2 text-lg sm:text-xl md:text-2xl text-white font-bold tracking-tighter uppercase italic whitespace-nowrap hover:text-[hsl(5_85%_60%)] transition-colors"
            style={COMMON_STYLES.clashDisplay}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Armtemiy
          </a>

          <div className="hidden md:flex items-center gap-1 relative px-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              const isHovered = hoveredLink === link.href;

              return (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`relative px-4 py-2 text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                    isActive || isHovered ? "text-white" : "text-white/60 hover:text-white/90"
                  }`}
                  style={COMMON_STYLES.satoshi}
                >
                  <span
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] bg-[hsl(5_85%_60%)] transition-all duration-300 shadow-[0_0_12px_hsl(5_85%_60%)] ${
                      isActive || isHovered ? "w-2/3 opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </div>

          <Button
            asChild
            className="hidden md:flex bg-[hsl(5_85%_60%)] hover:bg-[hsl(5_95%_65%)] text-white font-bold uppercase tracking-widest px-6 py-2 rounded-full h-auto border-none shadow-[0_0_25px_rgba(239,68,68,0.4)] hover:shadow-[0_0_35px_rgba(239,68,68,0.6)] transition-all duration-300 active:scale-95"
          >
            <a href="https://t.me/armtemiy_lab_bot" target="_blank" rel="noopener noreferrer" style={COMMON_STYLES.clashDisplay}>
              ВОЙТИ В LAB
            </a>
          </Button>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-3 text-white hover:bg-white/10 rounded-full transition-all active:scale-90"
          >
            {isMobileMenuOpen ? <X size={22} strokeWidth={2.5} /> : <Menu size={22} strokeWidth={2.5} />}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className={`fixed inset-0 z-40 flex flex-col justify-center bg-[hsl(15_8%_6%)] transition-opacity duration-300 md:hidden ${isClosing ? "opacity-0" : "opacity-100"}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.1)_0%,transparent_70%)] pointer-events-none" />
          <div className="flex flex-col items-center gap-6 relative z-50">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`text-3xl sm:text-4xl font-bold uppercase tracking-tighter whitespace-nowrap transition-all italic ${
                  activeSection === link.href ? "text-[hsl(5_85%_60%)] scale-110" : "text-white/60 hover:text-white"
                }`}
                style={COMMON_STYLES.clashDisplay}
              >
                {link.label}
              </button>
            ))}

            <div className="w-12 h-1 bg-white/10 rounded-full my-4" />

            <Button
              asChild
              size="lg"
              className="bg-[hsl(5_85%_60%)] hover:bg-[hsl(5_95%_65%)] text-white font-bold uppercase tracking-widest px-8 py-5 rounded-full shadow-[0_0_30px_rgba(239,68,68,0.4)]"
            >
              <a href="https://t.me/armtemiy_lab_bot" target="_blank" rel="noopener noreferrer" style={COMMON_STYLES.clashDisplay}>
                ВОЙТИ В LAB
              </a>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

const MemoizedNavbar = React.memo(Navbar);
export default MemoizedNavbar;
