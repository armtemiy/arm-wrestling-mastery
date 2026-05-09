import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
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
      { href: "#product", label: "Продукт" },
      { href: "#consultations", label: "Консультации" },
      { href: "#lab", label: "Lab" },
      { href: "#about", label: "О\u00A0себе" },
      { href: "#faq", label: "FAQ" },
    ],
    [],
  );

  const navbarStyle = useMemo(() => {
    if (prefersReducedMotion) {
      return {
        padding: "10px 14px",
        backgroundColor: "hsl(0 0% 100% / 0.14)",
        backdropFilter: "blur(16px)",
        border: "1px solid hsl(0 0% 100% / 0.24)",
        boxShadow:
          "0 10px 32px hsl(var(--background) / 0.45), inset 0 1px 0 hsl(0 0% 100% / 0.16)",
      };
    }
    return {
      padding: `${10 - scrollProgress * 3}px ${14 - scrollProgress * 3}px`,
      backgroundColor: `hsl(0 0% 100% / ${0.1 + scrollProgress * 0.08})`,
      backdropFilter: `blur(${14 + scrollProgress * 10}px)`,
      border: `1px solid hsl(0 0% 100% / ${0.2 + scrollProgress * 0.12})`,
      boxShadow:
        scrollProgress > 0.1
          ? `0 ${6 + scrollProgress * 10}px ${20 + scrollProgress * 18}px hsl(var(--background) / ${0.42 + scrollProgress * 0.08}), inset 0 1px 0 hsl(0 0% 100% / ${0.14 + scrollProgress * 0.08})`
          : "0 10px 32px hsl(var(--background) / 0.48), inset 0 1px 0 hsl(0 0% 100% / 0.16)",
    };
  }, [scrollProgress, prefersReducedMotion]);

  const handleCloseMobileMenu = useCallback(() => {
    setIsClosing(true);
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
    }
    const delay = prefersReducedMotion ? 0 : 260;

    closeTimeoutRef.current = window.setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsClosing(false);
      document.body.style.overflow = "";
      closeTimeoutRef.current = null;
      menuButtonRef.current?.focus();
    }, delay);
  }, [prefersReducedMotion]);

  const scrollToSection = useCallback(
    (href: string) => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
      }
      handleCloseMobileMenu();
    },
    [handleCloseMobileMenu, prefersReducedMotion],
  );

  const openMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(true);
    document.body.style.overflow = "hidden";
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

      const sections = ["product", "consultations", "lab", "about", "faq"];
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

    const focusableSelector =
      'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])';
    const panel = menuRef.current;

    const focusableElements =
      panel?.querySelectorAll<HTMLElement>(focusableSelector);
    focusableElements?.[0]?.focus();

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleCloseMobileMenu();
        return;
      }

      if (e.key !== "Tab" || !panel) return;

      const candidates = Array.from(
        panel.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter(
        (element) =>
          !element.hasAttribute("disabled") &&
          element.getAttribute("aria-hidden") !== "true",
      );

      if (candidates.length === 0) {
        e.preventDefault();
        return;
      }

      const firstElement = candidates[0];
      const lastElement = candidates[candidates.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (!firstElement || !lastElement) {
        e.preventDefault();
        return;
      }

      if (e.shiftKey) {
        if (
          !activeElement ||
          activeElement === firstElement ||
          !panel.contains(activeElement)
        ) {
          e.preventDefault();
          lastElement.focus();
        }
        return;
      }

      if (
        !activeElement ||
        activeElement === lastElement ||
        !panel.contains(activeElement)
      ) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [isMobileMenuOpen, handleCloseMobileMenu]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed top-2 sm:top-3 left-1/2 -translate-x-1/2 z-50 rounded-full border border-border/40 w-full max-w-fit md:w-auto ${prefersReducedMotion ? "" : "transition-all duration-500 ease-out"}`}
        style={navbarStyle}
        role="navigation"
        aria-label="Главная навигация"
      >
        <div className="flex items-center justify-between gap-2 md:gap-4">
          <button
            type="button"
            className="min-h-[40px] min-w-[40px] flex items-center justify-center px-2.5 py-1.5 text-sm sm:text-base md:text-lg lg:text-xl text-foreground font-bold tracking-tighter uppercase italic whitespace-nowrap hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full"
            style={COMMON_STYLES.clashDisplay}
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion ? "auto" : "smooth",
              });
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
                  className={`relative min-h-[38px] px-3 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full ${prefersReducedMotion ? "" : "transition-all duration-300"} ${
                    isActive || isHovered
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground/90"
                  }`}
                  style={COMMON_STYLES.satoshi}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] bg-primary shadow-[0_0_12px_hsl(var(--primary))] ${prefersReducedMotion ? "" : "transition-all duration-300"} ${
                      isActive || (isHovered && !prefersReducedMotion)
                        ? "w-2/3 opacity-100"
                        : "w-0 opacity-0"
                    }`}
                  />
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </div>

          <Button
            asChild
            className={`hidden md:flex bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-widest px-5 py-1.5 rounded-full h-auto min-h-[38px] text-xs sm:text-sm border-none shadow-[0_0_25px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_35px_hsl(var(--primary)/0.6)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${prefersReducedMotion ? "" : "transition-all duration-300"}`}
          >
            <a
              href="#product"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("#product");
              }}
              style={COMMON_STYLES.clashDisplay}
            >
              ОТКРЫТЬ БАЗУ
            </a>
          </Button>

          <button
            ref={menuButtonRef}
            onClick={toggleMobileMenu}
            className={`group relative md:hidden min-h-[40px] min-w-[40px] overflow-hidden flex items-center justify-center p-2 text-foreground rounded-full border border-white/10 bg-[hsl(15_8%_12%/0.72)] shadow-[0_0_22px_hsl(var(--primary)/0.12),inset_0_1px_0_hsl(0_0%_100%/0.12)] hover:border-[hsl(var(--primary)/0.45)] hover:bg-[hsl(15_8%_15%/0.82)] hover:shadow-[0_0_30px_hsl(var(--primary)/0.26),inset_0_1px_0_hsl(0_0%_100%/0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${prefersReducedMotion ? "" : "transition-all duration-300 active:scale-90"}`}
            aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={`absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.24),transparent_64%)] opacity-0 group-hover:opacity-100 ${prefersReducedMotion ? "" : "transition-opacity duration-300"}`}
              aria-hidden="true"
            />
            <span
              className={`relative z-10 flex items-center justify-center ${prefersReducedMotion ? "" : "transition-transform duration-300"} ${isMobileMenuOpen ? "rotate-90" : "rotate-0"}`}
            >
              {isMobileMenuOpen ? (
                <X size={20} strokeWidth={2.5} />
              ) : (
                <Menu size={20} strokeWidth={2.5} />
              )}
            </span>
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className={`fixed inset-0 z-40 md:hidden overflow-hidden ${isClosing ? "pointer-events-none" : ""}`}
          style={
            prefersReducedMotion
              ? undefined
              : {
                  animation: `${isClosing ? "mobileMenuExit" : "mobileMenuEnter"} ${isClosing ? 260 : 420}ms ${isClosing ? "var(--ease-in-out)" : "var(--ease-mechanical)"} both`,
                }
          }
          role="dialog"
          aria-modal="true"
          aria-label="Меню навигации"
        >
          <div
            className="absolute inset-0 bg-[hsl(15_8%_6%/0.94)] backdrop-blur-xl"
            onClick={handleCloseMobileMenu}
            aria-hidden="true"
          />
          <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[hsl(var(--primary)/0.18)] blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-7rem] right-[-5rem] h-80 w-80 rounded-full bg-[hsl(15_90%_50%/0.12)] blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.13)_0%,transparent_62%)] pointer-events-none" />
          <div
            className="absolute inset-0 opacity-[0.045] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(hsl(5 85% 60%) 1px, transparent 1px), linear-gradient(90deg, hsl(5 85% 60%) 1px, transparent 1px)",
              backgroundSize: "42px 42px",
            }}
          />
          <div
            ref={menuRef}
            className="relative z-50 flex min-h-full flex-col items-center justify-center px-4 py-24"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative w-full max-w-[22rem] overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,hsl(15_8%_13%/0.82),hsl(15_8%_8%/0.9))] p-3 shadow-[0_28px_90px_hsl(0_0%_0%/0.42),0_0_60px_hsl(var(--primary)/0.12),inset_0_1px_0_hsl(0_0%_100%/0.12)] backdrop-blur-2xl"
              style={
                prefersReducedMotion
                  ? undefined
                  : {
                      animation: `${isClosing ? "mobileMenuExit" : "mobileMenuEnter"} ${isClosing ? 220 : 520}ms ${isClosing ? "var(--ease-in-out)" : "var(--ease-spring)"} both`,
                    }
              }
            >
              <div
                className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[hsl(var(--primary)/0.16)] blur-3xl"
                aria-hidden="true"
              />
              <div
                className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--primary)/0.58)] to-transparent"
                aria-hidden="true"
              />

              <div className="relative z-10 mb-3 flex items-center gap-3 px-2 py-1">
                <span
                  className="h-2 w-2 rounded-full bg-primary shadow-[0_0_16px_hsl(var(--primary))]"
                  aria-hidden="true"
                />
                <span
                  className="text-[10px] font-black uppercase tracking-[0.34em] text-[hsl(5_85%_64%)]"
                  style={COMMON_STYLES.satoshi}
                >
                  Навигация
                </span>
                <span
                  className="h-px flex-1 bg-gradient-to-r from-[hsl(var(--primary)/0.42)] to-transparent"
                  aria-hidden="true"
                />
              </div>

              <div className="relative z-10 flex flex-col gap-2">
                {navLinks.map((link, index) => {
                  const isActive = activeSection === link.href;

                  return (
                    <button
                      key={link.href}
                      onClick={() => scrollToSection(link.href)}
                      className={`group relative flex min-h-[58px] w-full items-center overflow-hidden rounded-2xl border px-4 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(15_8%_8%)] ${prefersReducedMotion ? "" : "transition-all duration-300 active:scale-[0.98]"} ${
                        isActive
                          ? "border-[hsl(var(--primary)/0.52)] bg-[hsl(var(--primary)/0.16)] text-white shadow-[0_0_28px_hsl(var(--primary)/0.24),inset_0_1px_0_hsl(0_0%_100%/0.12)]"
                          : "border-white/10 bg-white/[0.035] text-[hsl(15_10%_82%)] hover:border-[hsl(var(--primary)/0.38)] hover:bg-white/[0.07] hover:text-white hover:shadow-[0_0_24px_hsl(var(--primary)/0.14)]"
                      }`}
                      style={{
                        animation: prefersReducedMotion
                          ? undefined
                          : `${isClosing ? "mobileMenuExit" : "mobileMenuEnter"} ${isClosing ? 160 : 440}ms ${isClosing ? "var(--ease-in-out)" : "var(--ease-mechanical)"} both`,
                        animationDelay: prefersReducedMotion
                          ? undefined
                          : isClosing
                            ? `${Math.max(0, (navLinks.length - index - 1) * 22)}ms`
                            : `${120 + index * 58}ms`,
                      }}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span
                        className={`absolute inset-0 bg-gradient-to-r from-[hsl(var(--primary)/0.2)] via-transparent to-transparent ${prefersReducedMotion ? "" : "transition-opacity duration-300"} ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                        aria-hidden="true"
                      />
                      <span
                        className={`absolute -left-10 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-[hsl(var(--primary)/0.18)] blur-2xl ${prefersReducedMotion ? "" : "transition-opacity duration-300"} ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                        aria-hidden="true"
                      />
                      <span className="relative z-10 flex w-full items-center gap-4">
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-[10px] font-black tracking-widest ${prefersReducedMotion ? "" : "transition-all duration-300"} ${isActive ? "border-[hsl(var(--primary)/0.55)] bg-[hsl(var(--primary)/0.2)] text-white shadow-[0_0_18px_hsl(var(--primary)/0.24)]" : "border-white/10 bg-black/20 text-[hsl(5_85%_64%)] group-hover:border-[hsl(var(--primary)/0.42)] group-hover:bg-[hsl(var(--primary)/0.12)]"}`}
                          style={COMMON_STYLES.satoshi}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className="text-xl font-black uppercase italic tracking-tight sm:text-2xl"
                          style={COMMON_STYLES.clashDisplay}
                        >
                          {link.label}
                        </span>
                        <span
                          className={`ml-auto h-2 w-2 rounded-full bg-primary shadow-[0_0_14px_hsl(var(--primary))] ${prefersReducedMotion ? "" : "transition-all duration-300"} ${isActive ? "scale-100 opacity-100" : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-80"}`}
                          aria-hidden="true"
                        />
                      </span>
                    </button>
                  );
                })}
              </div>

              <div
                className="relative z-10 my-4 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent"
                aria-hidden="true"
              />

              <Button
                size="lg"
                className={`group relative z-10 min-h-[54px] w-full overflow-hidden rounded-full bg-[hsl(5_85%_60%)] px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-[0_0_30px_hsl(var(--primary)/0.38)] hover:bg-[hsl(5_95%_65%)] hover:shadow-[0_0_48px_hsl(var(--primary)/0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(15_8%_8%)] ${prefersReducedMotion ? "" : "transition-all duration-300 active:scale-[0.98]"}`}
                onClick={() => scrollToSection("#product")}
                style={{
                  ...COMMON_STYLES.clashDisplay,
                  animation: prefersReducedMotion
                    ? undefined
                    : `${isClosing ? "mobileMenuExit" : "mobileMenuEnter"} ${isClosing ? 160 : 460}ms ${isClosing ? "var(--ease-in-out)" : "var(--ease-mechanical)"} both`,
                  animationDelay: prefersReducedMotion
                    ? undefined
                    : isClosing
                      ? "0ms"
                      : `${160 + navLinks.length * 58}ms`,
                }}
              >
                <span
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-700"
                  aria-hidden="true"
                />
                <span className="relative z-10">ОТКРЫТЬ БАЗУ</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const MemoizedNavbar = React.memo(Navbar);
export default MemoizedNavbar;
