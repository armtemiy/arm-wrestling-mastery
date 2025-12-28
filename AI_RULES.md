# AI Development Rules & Guidelines

## Tech Stack Overview

- **Framework**: React with TypeScript for building the user interface
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: React Router for client-side navigation
- **Styling**: Tailwind CSS with custom configuration for utility-first styling
- **UI Components**: shadcn/ui library built on Radix UI primitives
- **State Management**: React Query (TanStack Query) for server state management
- **Form Handling**: React Hook Form with Zod for validation
- **Animations**: CSS animations with Tailwind classes and custom keyframes
- **Deployment**: Netlify with automatic builds from Git
- **Backend**: Supabase for database, authentication, and serverless functions

## Library Usage Rules

### UI & Styling
- **Primary UI Library**: Use shadcn/ui components whenever possible for consistent design
- **Custom Components**: Create new components in `src/components` when shadn/ui doesn't have what's needed
- **Styling**: Use Tailwind CSS classes exclusively - no CSS-in-JS or traditional CSS files (except for base styles)
- **Icons**: Use Lucide React icons for all iconography
- **Responsive Design**: Always implement mobile-first responsive design using Tailwind's breakpoints

### State Management
- **Component State**: Use React's useState and useReducer for local component state
- **Server State**: Use React Query for all server data fetching and caching
- **Global State**: Use React Context for global state that doesn't require server synchronization
- **Form State**: Use React Hook Form for all forms with Zod for validation schema

### Routing & Navigation
- **Routing**: Use React Router DOM for all client-side routing
- **Navigation**: Use the Link component from React Router for internal navigation
- **Scroll Behavior**: Implement smooth scrolling for anchor links

### Data Fetching & API Calls
- **REST APIs**: Use fetch API or axios for external API calls
- **Supabase Integration**: Use Supabase client for database operations and authentication
- **Serverless Functions**: Use Supabase functions for backend logic when needed
- **Error Handling**: Always handle API errors gracefully with user feedback

### Security & Validation
- **Input Validation**: Use Zod for all input validation and type safety
- **Form Validation**: Use React Hook Form with Zod resolvers
- **Environment Variables**: Store secrets in environment variables prefixed with VITE* for client-side access
- **Sanitization**: Always sanitize user inputs before processing or storing

### Performance & Optimization
- **Images**: Use appropriate image formats and sizes, implement lazy loading
- **Bundling**: Leverage Vite's code splitting and optimization features
- **Animations**: Use CSS animations over JavaScript when possible for better performance
- **Re-rendering**: Use React.memo, useCallback, and useMemo appropriately to prevent unnecessary re-renders

### Code Quality & Structure
- **File Organization**: Follow the existing directory structure (components, pages, hooks, lib, etc.)
- **Component Structure**: Create separate files for each component with clear naming conventions
- **Type Safety**: Use TypeScript for all components and functions with strict typing
- **Hooks**: Create custom hooks in src/hooks for reusable logic
- **Utility Functions**: Place utility functions in src/lib/utils.ts

### Accessibility & UX
- **ARIA Labels**: Use appropriate ARIA attributes for accessibility
- **Semantic HTML**: Use semantic HTML elements for better accessibility
- **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
- **Focus Management**: Implement proper focus management for modals and overlays
- **Loading States**: Always provide loading indicators for asynchronous operations

### Testing & Debugging
- **Error Boundaries**: Implement error boundaries for catching UI errors
- **Console Logs**: Remove unnecessary console logs in production
- **TypeScript Errors**: Fix all TypeScript errors before committing
- **Responsive Testing**: Test on multiple device sizes before deployment

### Third-Party Libraries
- **Installation**: Only add new libraries after checking if existing tools can accomplish the task
- **Bundle Size**: Consider bundle size impact before adding new dependencies
- **Maintenance**: Prefer well-maintained libraries with active communities
- **Security**: Check for security vulnerabilities before adding new packages