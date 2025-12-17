# GitHub Copilot Instructions for Portfolio Project

This document provides context and guidelines for GitHub Copilot when working on this portfolio website.

## Project Overview

This is a modern, responsive portfolio website for Rotha Dapravith - a Full-Stack Developer & DevOps Engineer. The project showcases professional work, skills, and experience with a clean, performant design.

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS v4 with ShadCN UI components
- **State Management**: Zustand (with persist middleware)
- **HTTP Client**: Axios
- **Icons**: Lucide React, React Icons
- **Form Handling**: React Hook Form with Zod validation
- **Query Management**: TanStack React Query

## Project Structure

```
portfolio/
├── src/
│   ├── app/              # Next.js App Router pages and layouts
│   │   ├── api/          # API routes
│   │   ├── layout.tsx    # Root layout with metadata
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles and CSS variables
│   ├── components/       # React components
│   │   ├── ui/           # ShadCN UI components (Button, Card, Input, etc.)
│   │   ├── navbar.tsx    # Navigation component
│   │   ├── footer.tsx    # Footer component
│   │   └── ...           # Feature components
│   ├── config/           # Configuration files (translations, etc.)
│   ├── hooks/            # Custom React hooks
│   ├── layouts/          # Layout components
│   ├── lib/              # Utility functions (cn, etc.)
│   ├── middleware/       # Middleware (auth, cors, rate limiting)
│   ├── providers/        # React context providers
│   ├── services/         # API services and clients
│   ├── store/            # Zustand state stores
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Helper functions and constants
│   └── validations/      # Zod schemas for validation
├── public/               # Static assets
└── .github/              # GitHub configuration
```

## Path Aliases

The project uses TypeScript path aliases (defined in `tsconfig.json`):

- `@/*` → `./src/*`
- `@/components/*` → `./src/components/*`
- `@/lib/*` → `./src/lib/*`
- `@/utils/*` → `./src/utils/*`
- `@/types/*` → `./src/types/*`
- `@/hooks/*` → `./src/hooks/*`
- `@/store/*` → `./src/store/*`
- `@/services/*` → `./src/services/*`
- `@/config/*` → `./src/config/*`
- `@/validations/*` → `./src/validations/*`
- `@/providers/*` → `./src/providers/*`
- `@/layouts/*` → `./src/layouts/*`
- `@/middleware/*` → `./src/middleware/*`

**Always use path aliases** instead of relative imports for better maintainability.

## Coding Conventions

### TypeScript

- **Strict mode enabled**: Always provide proper types, avoid `any`
- **React components**: Use functional components with TypeScript
- **Props typing**: Define explicit interface/type for component props
- **File extensions**: Use `.tsx` for components, `.ts` for utilities/services

### React Components

- **Client components**: Add `"use client"` directive when using hooks, state, or browser APIs
- **Server components**: Default for App Router, no directive needed
- **Component naming**: Use PascalCase for component files and exports
- **Default exports**: Use `export default` for page components and main feature components

### Styling

- **Tailwind CSS**: Use Tailwind utility classes for styling
- **CSS Variables**: Theme colors are defined as CSS variables (HSL format) in `globals.css`
- **Dark mode**: Use `dark:` prefix for dark mode styles (class-based dark mode)
- **Component variants**: Use `class-variance-authority` (CVA) for component variants
- **Utility function**: Use `cn()` from `@/lib/utils` to merge Tailwind classes

### State Management

- **Zustand**: Primary state management solution
- **Store pattern**: Create stores in `src/store/` directory
- **Persist**: Use `persist` middleware for localStorage persistence
- **Naming**: Use `use` prefix for store hooks (e.g., `useLanguage`, `useTheme`)

### API and Services

- **API routes**: Place in `src/app/api/` directory
- **Service layer**: Use `ApiClient` class from `@/services/apiClient` for HTTP requests
- **Error handling**: Implement proper try-catch blocks with appropriate error responses
- **Type safety**: Define request/response types in `@/types/` directory

### Forms and Validation

- **React Hook Form**: Use for form state management
- **Zod schemas**: Define validation schemas in `@/validations/` directory
- **Resolver**: Use `@hookform/resolvers/zod` to integrate Zod with React Hook Form

## Build, Test, and Lint Commands

```bash
# Development server
npm run dev          # Starts Next.js dev server on localhost:3000

# Production build
npm run build        # Creates optimized production build
npm start            # Starts production server

# Linting
npm run lint         # Runs ESLint with Next.js configuration
```

## ShadCN UI Components

- ShadCN components are located in `src/components/ui/`
- Components are customizable and follow Radix UI patterns
- Use the `cn()` utility to merge custom classes with component defaults
- Common components: Button, Card, Input, Textarea, Tabs, Avatar, Badge, Separator

## Internationalization

- Language switching is implemented using Zustand store (`useLanguage`)
- Translations are defined in `@/config/translations`
- Supported languages: English (`en`), Khmer (`km`)
- Access translations via `const { t } = useLanguage()`

## Best Practices

1. **Component organization**: Keep components focused and single-responsibility
2. **Code splitting**: Leverage Next.js automatic code splitting
3. **Image optimization**: Use Next.js `<Image>` component for images
4. **SEO**: Define metadata in layout.tsx and page.tsx files
5. **Performance**: Use React Query for data fetching and caching
6. **Accessibility**: Include proper ARIA labels and semantic HTML
7. **Type safety**: Leverage TypeScript fully, avoid type assertions when possible
8. **Error boundaries**: Implement error handling for robust UX
9. **Responsive design**: Mobile-first approach with Tailwind breakpoints
10. **Dark mode**: Always test both light and dark themes

## Common Patterns

### Creating a new component

```tsx
"use client"; // Only if using hooks/state

import { ComponentProps } from "@/types";

interface MyComponentProps {
  title: string;
  // ... other props
}

export default function MyComponent({ title }: MyComponentProps) {
  return (
    <div className="container mx-auto">
      {/* Component content */}
    </div>
  );
}
```

### Creating a Zustand store

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MyStore {
  value: string;
  setValue: (value: string) => void;
}

export const useMyStore = create<MyStore>()(
  persist(
    (set) => ({
      value: '',
      setValue: (value) => set({ value }),
    }),
    { name: 'my-store-storage' }
  )
);
```

### API Service pattern

```typescript
import { apiClient } from '@/services/apiClient';
import type { MyDataType } from '@/types';

export const myService = {
  async getData(): Promise<MyDataType> {
    const response = await apiClient.get<MyDataType>('/endpoint');
    return response.data;
  },
  
  async postData(data: MyDataType): Promise<void> {
    await apiClient.post('/endpoint', data);
  },
};
```

## Notes

- The project uses Next.js App Router (not Pages Router)
- Client-side navigation uses anchor tags with hash routing for single-page sections
- Dark mode is implemented with CSS variables and the `dark` class on `<html>`
- The project is deployed on Vercel
- Contact form functionality may need backend integration (currently frontend-only)

## When Making Changes

1. Follow existing patterns and conventions in the codebase
2. Maintain TypeScript type safety throughout
3. Ensure responsive design works on mobile, tablet, and desktop
4. Test both light and dark modes
5. Use path aliases consistently
6. Keep components modular and reusable
7. Add appropriate comments for complex logic only
8. Ensure accessibility standards are met
