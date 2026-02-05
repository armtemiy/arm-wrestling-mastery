# AGENTS.md

This file guides agentic coding assistants working in this repository.

## Development Commands

```powershell
npm run dev          # Start dev server (localhost:8080)
npm run build        # Production build
npm run build:dev    # Development build with sourcemaps
npm run lint         # ESLint check
npm run preview      # Preview production build
npm run deploy       # Build and deploy to GitHub Pages
```

**Testing:** No test framework configured. Tests documented in AI_RULES.md but not implemented.

## OpenAgentsControl Integration

This repository uses OpenAgentsControl for plan-first development workflows.

### Primary Usage

```powershell
# Use openagent for general tasks and questions (recommended default)
opencode --agent openagent

# Use opencoder for complex coding work
opencode --agent opencoder
```

### Available Commands

```powershell
/commit              # Smart git commits with conventional format
/optimize            # Code optimization
/test                # Testing workflows
/clean               # Cleanup operations
/context             # Context management
/prompt-enhancer     # Improve prompts
/validate-repo       # Validate repository consistency
```

### Workflow

1. Agent analyzes request → 2. Proposes plan → 3. Awaits approval → 4. Executes step-by-step with validation → 5. Delegates to specialists → 6. Confirms completion

### Context Loading

Agents automatically load patterns from `.opencode/context/` to follow this repository's coding standards. Add your patterns to `~/.opencode/context/project/project-context.md`.

## Project Stack

- React 18 + TypeScript (Vite build, port 8080)
- Tailwind CSS with custom design system
- React Router DOM (minimal routing)
- shadcn/ui components (Radix UI primitives)
- Lucide React (icons)

## Import Patterns

```tsx
// Path alias for src directory
import Component from "@/components/landing/ComponentName";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// External libraries
import React, { useState, useEffect, useRef, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IconName } from "lucide-react";
```

## Naming Conventions

**Components:** PascalCase - `HeroSection.tsx`
**Hooks:** camelCase with `use` prefix - `useScrollAnimation.ts`
**Utilities:** camelCase - `utils.ts`, `imageOptimization.ts`
**Types/Interfaces:** PascalCase - `interface TerminalLine`, `type FormStep`
**Constants:** UPPER_SNAKE_CASE or camelCase - `RATE_LIMIT_WINDOW`, `submissionTimestamps`

## Component Structure

```tsx
const ComponentName = () => {
  // 1. State declarations
  const [state, setState] = useState();
  const ref = useRef<HTMLDivElement>(null);
  
  // 2. Custom hooks
  const { ref: scrollRef, isVisible } = useScrollAnimation();
  
  // 3. Memoized values and callbacks
  const memoized = useMemo(() => { ... }, [deps]);
  const handleAction = useCallback(() => { ... }, [deps]);
  
  // 4. useEffect for side effects
  useEffect(() => { ... }, [deps]);
  
  // 5. JSX return
  return <div className="...">...</div>;
};

// Always wrap export with React.memo for performance
const MemoizedComponent = React.memo(ComponentName);
export default MemoizedComponent;
```

## TypeScript & Types

- Use strict mode (`tsconfig.app.json` has `strict: true`)
- Define interfaces/types for all props and state
- Prefer interfaces for objects, types for unions/literals
- Use `unknown` instead of `any` when type cannot be determined
- Check error instance before accessing `error.message`

```tsx
interface ComponentProps { title: string; count: number; }
type FormStep = "name" | "phone" | "sending" | "success" | "error";
```

## Styling Guidelines

- **Use Tailwind utility classes exclusively** - no CSS-in-JS or traditional CSS (except base styles in design-system/)
- **Design tokens:** `bg-background`, `text-foreground`, `text-gradient` (from tokens.css)
- **Utility classes:** `.glass`, `.glass-strong`, `.card-lift`, `.stagger-item`
- **Section backgrounds:** `.section-dark`, `.section-light`, `.section-warm`, `.section-charcoal`
- **Color palette:** Primary `hsl(5 85% 60%)`, Secondary `hsl(15 90% 50%)`, Background `hsl(15 8% 6%)`
- **Typography:** Display 'Clash Display', Body 'Satoshi', Mono 'JetBrains Mono'

## Error Handling & Validation

```tsx
// Try-catch with typed error handling
try {
  const response = await fetch(url);
  const result = await response.json();
  if (!result.ok) throw new Error(`Error: ${result.description}`);
} catch (error: unknown) {
  const message = error instanceof Error ? error.message : 'Unknown error';
  console.error("Operation failed:", message);
  return { success: false, error: message };
}

// Validation functions
const isValidPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/[\s\-()]/g, "");
  return /^\+?[0-9]{10,15}$/.test(cleaned);
};
```

## Performance Patterns

- Wrap all components with `React.memo()` before export
- Use `useCallback` for event handlers passed to children
- Use `useMemo` for expensive computations
- Lazy load images (use `OptimizedImage` component)
- Code split with dynamic imports for vendors

## File Organization

- Maximum **400 lines per component file**
- Components in `src/components/landing/` (landing sections) or `src/components/ui/` (shadcn)
- Hooks in `src/hooks/`
- Utilities in `src/lib/`
- Pages in `src/pages/` (Index.tsx composes all landing sections)
- Design tokens in `src/design-system/tokens.css`

## Code Style

- **NO COMMENTS** unless explicitly requested by user
- Russian language for UI text (this is a Russian landing page)
- Prefer simple, readable code over clever solutions
- No "future-proofing" - only implement what's needed now
- Use semantic HTML elements with proper ARIA attributes
- Follow existing patterns in the codebase
- Avoid nested ternary operators - use switch or if/else chains instead
- Prefer function over arrow functions for top-level functions

## Accessibility (WCAG 2.1 AA+)

- Semantic HTML structure
- Proper ARIA labels and states
- Keyboard navigation support
- Color contrast compliance (WCAG AA)
- Reduced motion fallbacks for animations
- Focus management for modals/overlays

## Code Simplifier Skill

The code-simplifier skill automatically refactors recently modified code to improve:
- Clarity and consistency
- Maintainability
- Project standards compliance
- Reduced complexity and nesting

Focus on readable, explicit code over compact solutions.

## Environment

- **OS:** Windows + PowerShell (use PowerShell syntax for commands)
- **Dev server:** http://localhost:8080
- **Deployment:** GitHub Pages (gh-pages branch, custom domain armtemiy.ru)
- **Build output:** `dist/` directory

## Git & Deployment Permissions

Auto-allowed commands (settings.local.json):
- `git add`, `git commit`, `git push`
- `npm run build`, `npm run deploy`
- Package management operations
