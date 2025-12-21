import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#program", label: "Программа" },
    { href: "#training", label: "Тренировки" },
    { href: "#about", label: "Обо мне" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`island-nav transition-all duration-300 ${
          isScrolled ? "shadow-lg" : ""
        }`}
      >
        <div className="flex items-center gap-1 md:gap-2">
          {/* Logo */}
          <a
            href="#"
            className="px-4 py-2 text-lg font-bold text-[hsl(var(--hero-foreground))] font-['Space_Grotesk']"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Армтемий
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="px-4 py-2 text-sm font-medium text-[hsl(var(--hero-foreground)/0.7)] hover:text-[hsl(var(--hero-foreground))] transition-colors rounded-full hover:bg-[hsl(0_0%_100%/0.1)]"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <Button
            asChild
            variant="cta"
            size="sm"
            className="hidden md:inline-flex ml-2 rounded-full"
          >
            <a
              href="https://t.me/assistemiy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Написать
            </a>
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[hsl(var(--hero-foreground))] hover:bg-[hsl(0_0%_100%/0.1)] rounded-full transition-colors"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 pt-20 px-4 bg-[hsl(var(--hero-bg)/0.98)] backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="px-6 py-4 text-lg font-medium text-[hsl(var(--hero-foreground))] hover:bg-[hsl(0_0%_100%/0.1)] rounded-xl transition-colors text-left"
              >
                {link.label}
              </button>
            ))}
            <Button
              asChild
              variant="cta"
              size="lg"
              className="mt-4 rounded-full"
            >
              <a
                href="https://t.me/assistemiy"
                target="_blank"
                rel="noopener noreferrer"
              >
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
