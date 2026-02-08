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
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
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
    const delay = prefersReducedMotion ? 0 : 200;
    
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsClosing(false);
      document.body.style.overflow = '';
      closeTimeoutRef.current = null;
      menuButtonRef.current?.focus();
    }, delay);
  }, [prefersReducedMotion]);

  const scrollToSection = useCallback(
    (href: string) => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
      }
      handleCloseMobileMenu();
    },
    [handleCloseMobileMenu, prefersReducedMotion]
  );

  const openMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const toggleMobileMenu = useCallback(() => {
    if (isMobileMenuOpen) {
      handleCloseMobileMenu();
    } else {
      openMobileMenu();
    }
  }, [isMobileMenuOpen, handleCloseMobileMenu, openMobileMenu]);

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

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const focusableSelector = 'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])';
    const panel = menuRef.current;

    const focusableElements = panel?.querySelectorAll<HTMLElement>(focusableSelector);
    focusableElements?.[0]?.focus();

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleCloseMobileMenu();
        return;
      }

      if (e.key !== 'Tab' || !panel) return;

      const candidates = Array.from(panel.querySelectorAll<HTMLElement>(focusableSelector)).filter(
        (element) => !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true'
      );

      if (candidates.length === 0) {
        e.preventDefault();
        return;
      }

      const firstElement = candidates[0];
      const lastElement = candidates[candidates.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (!activeElement || activeElement === firstElement || !panel.contains(activeElement)) {
          e.preventDefault();
          lastElement.focus();
        }
        return;
      }

      if (!activeElement || activeElement === lastElement || !panel.contains(activeElement)) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [isMobileMenuOpen, handleCloseMobileMenu]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed top-2 sm:top-3 left-1/2 -translate-x-1/2 z-50 rounded-full border border-border/40 w-[calc(100%-16px)] max-w-fit md:w-auto ${prefersReducedMotion ? '' : 'transition-all duration-500 ease-out'}`}
        style={navbarStyle}
        role="navigation"
        aria-label="Главная навигация"
      >
        <div className="flex items-center justify-between gap-2 md:gap-4">
          <button
            type="button"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center px-3 py-2 text-base sm:text-lg md:text-xl lg:text-2xl text-foreground font-bold tracking-tighter uppercase italic whitespace-nowrap hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full"
            style={COMMON_STYLES.clashDisplay}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
            }}
            aria-label="Вернуться наверх"
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
                  className={`relative min-h-[44px] px-4 py-2 text-sm font-bold uppercase tracking-wider whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full ${prefersReducedMotion ? '' : 'transition-all duration-300'} ${
                    isActive || isHovered ? "text-foreground" : "text-muted-foreground hover:text-foreground/90"
                  }`}
                  style={COMMON_STYLES.satoshi}
                  aria-current={isActive ? "page" : undefined}
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
            className={`hidden md:flex bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-widest px-6 py-2 rounded-full h-auto min-h-[44px] border-none shadow-[0_0_25px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_35px_hsl(var(--primary)/0.6)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${prefersReducedMotion ? '' : 'transition-all duration-300'}`}
          >
            <a href="https://t.me/armtemiy_lab_bot" target="_blank" rel="noopener noreferrer" style={COMMON_STYLES.clashDisplay}>
              ВОЙТИ В LAB
            </a>
          </Button>

          <button
            ref={menuButtonRef}
            onClick={toggleMobileMenu}
            className={`md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center p-2.5 text-foreground hover:bg-accent/50 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${prefersReducedMotion ? '' : 'transition-all active:scale-90'}`}
            aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className={`fixed inset-0 z-40 md:hidden ${prefersReducedMotion ? '' : 'transition-opacity duration-300'} ${prefersReducedMotion ? 'opacity-100' : isClosing ? 'opacity-0' : 'opacity-100'}`}
          role="dialog"
          aria-modal="true"
          aria-label="Меню навигации"
        >
          <div
            className="absolute inset-0 bg-background"
            onClick={handleCloseMobileMenu}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.1)_0%,transparent_70%)] pointer-events-none" />
          <div
            ref={menuRef}
            className="relative z-50 flex flex-col items-center justify-center h-full gap-5 sm:gap-6 px-4"
            onClick={(e) => e.stopPropagation()}
          >
            {navLinks.map((link, index) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`min-h-[48px] px-6 py-3 text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter whitespace-nowrap italic focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl ${prefersReducedMotion ? '' : 'transition-all'} ${
                  activeSection === link.href
                    ? `text-primary ${prefersReducedMotion ? '' : 'scale-105'}`
                    : "text-muted-foreground hover:text-foreground active:text-primary"
                }`}
                style={{
                  ...COMMON_STYLES.clashDisplay,
                  transitionDelay: prefersReducedMotion ? '0ms' : `${index * 50}ms`
                }}
                aria-current={activeSection === link.href ? "page" : undefined}
              >
                {link.label}
              </button>
            ))}

            <div className="w-12 h-1 bg-border/60 rounded-full my-3 sm:my-4" aria-hidden="true" />

            <Button
              asChild
              size="lg"
              className="min-h-[52px] bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-widest px-8 py-4 rounded-full shadow-[0_0_30px_hsl(var(--primary)/0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
