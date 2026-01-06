import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        // Industrial Brutalist colors
        rust: {
          50: 'hsl(var(--rust-50))',
          100: 'hsl(var(--rust-100))',
          200: 'hsl(var(--rust-200))',
          300: 'hsl(var(--rust-300))',
          400: 'hsl(var(--rust-400))',
          500: 'hsl(var(--rust-500))',
          600: 'hsl(var(--rust-600))',
          700: 'hsl(var(--rust-700))',
          800: 'hsl(var(--rust-800))',
          900: 'hsl(var(--rust-900))',
        },
        metal: {
          50: 'hsl(var(--metal-50))',
          100: 'hsl(var(--metal-100))',
          200: 'hsl(var(--metal-200))',
          300: 'hsl(var(--metal-300))',
          400: 'hsl(var(--metal-400))',
          500: 'hsl(var(--metal-500))',
          600: 'hsl(var(--metal-600))',
          700: 'hsl(var(--metal-700))',
          800: 'hsl(var(--metal-800))',
          900: 'hsl(var(--metal-900))',
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      fontFamily: {
        // Industrial Brutalist font system
        display: ['Anton', 'Impact', 'Arial Black', 'sans-serif'],
        body: ['Oswald', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Share Tech Mono', 'Courier New', 'monospace'],
        accent: ['Russo One', 'Arial', 'sans-serif'],
        // Legacy aliases (to be phased out)
        sans: ['Oswald', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
      fontSize: {
        'display-xs': '4.5rem',   /* 72px */
        'display-sm': '6rem',     /* 96px */
        'display-md': '8rem',     /* 128px */
        'display-lg': '10rem',    /* 160px */
      },
      letterSpacing: {
        'ultra-tight': '-0.05em',
        'ultra-wide': '0.2em',
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        // Brutalist animations
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.3s cubic-bezier(0.08, 0.74, 0.34, 1) forwards',
        'slide-in-left': 'slideInLeft 0.3s cubic-bezier(0.08, 0.74, 0.34, 1) forwards',
        'slide-in-right': 'slideInRight 0.3s cubic-bezier(0.08, 0.74, 0.34, 1) forwards',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.08, 0.74, 0.34, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'pulse-aggressive': 'pulseAggressive 1.5s ease-in-out infinite',
        'marquee': 'marqueeScroll 30s linear infinite',
        'glitch': 'glitch 0.3s linear infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' }
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-60px)' },
          to: { opacity: '1', transform: 'translateX(0)' }
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(60px)' },
          to: { opacity: '1', transform: 'translateX(0)' }
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.9)' },
          to: { opacity: '1', transform: 'scale(1)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' }
        },
        pulseAggressive: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.02)' }
        },
        marqueeScroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-4px, 4px)' },
          '40%': { transform: 'translate(4px, -4px)' },
          '60%': { transform: 'translate(-4px, -4px)' },
          '80%': { transform: 'translate(4px, 4px)' }
        },
        scanline: {
          '0%': { top: '0' },
          '100%': { top: '100%' }
        }
      },
      boxShadow: {
        'brutal': '8px 8px 0 hsl(0 0% 0%)',
        'brutal-lg': '12px 12px 0 hsl(0 0% 0%)',
        'brutal-accent': '8px 8px 0 var(--rust-700)',
        'brutal-sm': '4px 4px 0 hsl(0 0% 0%)',
        '2xs': 'var(--shadow-2xs)',
        'xs': 'var(--shadow-xs)',
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)'
      }
    }
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
