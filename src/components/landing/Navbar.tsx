import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { COMMON_STYLES } from "./common-styles";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const Navbar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

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
    () => {
      if (prefersReducedMotion) {
        return {
          padding: '12px 16px',
          backgroundColor: 'hsl(var(--background) / 0.95)',
          borderBottom: '1px solid hsl(var(--border))',
          boxShadow: 'none',
        };
      }
      return {
        padding: `${12 - scrollProgress * 4}px ${16 - scrollProgress * 4}px`,
        backgroundColor: `hsl(var(--background) / ${0.85 + scrollProgress * 0.1})`,
        backdropFilter: `blur(${12 + scrollProgress * 8}px)`,
        border: `1px solid hsl(var(--border) / ${0.4 + scrollProgress * 0.2})`,
        boxShadow:
          scrollProgress > 0.1
            ? `0 ${4 + scrollProgress * 8}px ${16 + scrollProgress * 16}px hsl(var(--background) / ${0.45 + scrollProgress * 0.1})`
            : "0 8px 32px hsl(var(--background) / 0.6)",
      };
    },
    [scrollProgress, prefersReducedMotion]
  );

  const handleCloseMobileMenu = useCallback(() => {
    setIsClosing(true);
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
    }
    // Instant close if reduced motion
    const delay = prefersReducedMotion ? 0 : 200;
    
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsClosing(false);
      closeTimeoutRef.current = null;
    }, delay);
  }, [prefersReducedMotion]);

  const scrollToSection = useCallback(
    (href: string) => {
      const element = document.querySelector(href);
      if (element) {
        // Respect reduced motion for scroll behavior
        element.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
      }
      handleCloseMobileMenu();
    },
    [handleCloseMobileMenu, prefersReducedMotion]
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
        className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 rounded-full border border-border/40 ${prefersReducedMotion ? '' : 'transition-all duration-500 ease-out'}`}
        style={navbarStyle}
      >
        <div className="flex items-center gap-2 md:gap-4">
          <button
            type="button"
            className="px-4 py-2 text-lg sm:text-xl md:text-2xl text-foreground font-bold tracking-tighter uppercase italic whitespace-nowrap hover:text-primary transition-colors"
            style={COMMON_STYLES.clashDisplay}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
            }}
          >
            Armtemiy
          </button>

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
                  className={`relative px-4 py-2 text-sm font-bold uppercase tracking-wider whitespace-nowrap ${prefersReducedMotion ? '' : 'transition-all duration-300'} ${
                    isActive || isHovered ? "text-foreground" : "text-muted-foreground hover:text-foreground/90"
                  }`}
                  style={COMMON_STYLES.satoshi}
                >
                  <span
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] bg-primary shadow-[0_0_12px_hsl(var(--primary))] ${prefersReducedMotion ? '' : 'transition-all duration-300'} ${
                      isActive || (isHovered && !prefersReducedMotion) ? "w-2/3 opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </div>

          <Button
            asChild
            className={`hidden md:flex bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-widest px-6 py-2 rounded-full h-auto border-none shadow-[0_0_25px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_35px_hsl(var(--primary)/0.6)] active:scale-95 ${prefersReducedMotion ? '' : 'transition-all duration-300'}`}
          >
            <a href="https://t.me/armtemiy_lab_bot" target="_blank" rel="noopener noreferrer" style={COMMON_STYLES.clashDisplay}>
              ВОЙТИ В LAB
            </a>
          </Button>

          <button
            onClick={toggleMobileMenu}
            className={`md:hidden p-3 text-foreground hover:bg-accent/50 rounded-full ${prefersReducedMotion ? '' : 'transition-all active:scale-90'}`}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={22} strokeWidth={2.5} /> : <Menu size={22} strokeWidth={2.5} />}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className={`fixed inset-0 z-40 flex flex-col justify-center bg-background md:hidden ${prefersReducedMotion ? '' : 'transition-opacity duration-300'} ${prefersReducedMotion ? 'opacity-100' : isClosing ? 'opacity-0' : 'opacity-100'}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.1)_0%,transparent_70%)] pointer-events-none" />
          <div className="flex flex-col items-center gap-6 relative z-50">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`text-3xl sm:text-4xl font-bold uppercase tracking-tighter whitespace-nowrap italic ${prefersReducedMotion ? '' : 'transition-all'} ${
                  activeSection === link.href
                    ? `text-primary ${prefersReducedMotion ? '' : 'scale-110'}`
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={COMMON_STYLES.clashDisplay}
              >
                {link.label}
              </button>
            ))}

            <div className="w-12 h-1 bg-border/60 rounded-full my-4" />

            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-widest px-8 py-5 rounded-full shadow-[0_0_30px_hsl(var(--primary)/0.4)]"
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
