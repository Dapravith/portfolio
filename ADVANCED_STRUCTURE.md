# Advanced Next.js Project Structure

## 📁 Complete Folder Structure

```
portfolio/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── api/                  # API routes (Backend)
│   │   │   ├── contact/          # Contact endpoint
│   │   │   │   └── route.ts      # POST /api/contact
│   │   │   └── projects/         # Projects endpoint
│   │   │       └── route.ts      # GET /api/projects
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home page
│   │   └── globals.css           # Global styles
│   │
│   ├── components/               # React components
│   │   ├── ui/                   # Shadcn UI components
│   │   └── **/                   # Feature components
│   │
│   ├── store/                    # Zustand state management
│   │   ├── authStore.ts          # Authentication state
│   │   ├── uiStore.ts            # UI state (theme, modals, etc.)
│   │   ├── projectsStore.ts      # Projects state
│   │   └── index.ts              # Export all stores
│   │
│   ├── services/                 # API services layer
│   │   ├── apiClient.ts          # Axios instance with interceptors
│   │   ├── projectsService.ts    # Projects API calls
│   │   ├── contactService.ts     # Contact API calls
│   │   └── index.ts              # Export all services
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useProjects.ts        # React Query hooks for projects
│   │   ├── useContactForm.ts     # Contact form with validation
│   │   └── index.ts              # Export all hooks
│   │
│   ├── validations/              # Zod schemas
│   │   ├── contactSchema.ts      # Contact form validation
│   │   ├── projectSchema.ts      # Project validation
│   │   ├── authSchema.ts         # Auth validation
│   │   └── index.ts              # Export all schemas
│   │
│   ├── types/                    # TypeScript types
│   │   └── index.ts              # Global type definitions
│   │
│   ├── utils/                    # Utility functions
│   │   ├── constants.ts          # App constants
│   │   └── helpers.ts            # Helper functions
│   │
│   ├── config/                   # Configuration files
│   │   ├── app.config.ts         # App configuration
│   │   ├── routes.config.ts      # Routes constants
│   │   └── index.ts              # Export all configs
│   │
│   ├── middleware/               # API middleware
│   │   ├── rateLimiter.ts        # Rate limiting
│   │   ├── cors.ts               # CORS headers
│   │   ├── auth.ts               # Authentication
│   │   └── index.ts              # Export all middleware
│   │
│   ├── providers/                # Context providers
│   │   ├── QueryProvider.tsx     # React Query provider
│   │   ├── Providers.tsx         # Combined providers
│   │   └── index.ts              # Export all providers
│   │
│   ├── layouts/                  # Layout components
│   │   ├── MainLayout.tsx        # Main layout
│   │   ├── DashboardLayout.tsx   # Dashboard layout
│   │   └── index.ts              # Export all layouts
│   │
│   ├── features/                 # Feature modules (optional)
│   │   └── [feature]/            # Feature-specific code
│   │       ├── components/       # Feature components
│   │       ├── hooks/            # Feature hooks
│   │       └── utils/            # Feature utilities
│   │
│   └── styles/                   # Additional styles
│
├── public/                       # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── .env.example                  # Environment variables template
├── .env.local                    # Local environment variables
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
├── next.config.mjs               # Next.js configuration
└── package.json                  # Dependencies

```

## 🎯 Architecture Principles

### 1. **Separation of Concerns**
- **Components**: UI presentation only
- **Hooks**: Business logic and data fetching
- **Services**: API communication
- **Store**: Global state management
- **Validations**: Input validation schemas

### 2. **State Management Strategy**

#### **Zustand Stores**
```typescript
// Local UI state (theme, modals, sidebar)
useUIStore()

// Authentication state (user, login/logout)
useAuthStore()

// Domain state (projects, filters)
useProjectsStore()
```

#### **React Query (TanStack Query)**
```typescript
// Server state (API data, caching)
useProjects()        // GET /api/projects
useFeaturedProjects() // GET /api/projects?featured=true
useCreateProject()   // POST /api/projects
useUpdateProject()   // PUT /api/projects/:id
useDeleteProject()   // DELETE /api/projects/:id
```

#### **When to Use What?**
- **Zustand**: Client-side state (UI, local preferences, optimistic updates)
- **React Query**: Server state (API data, caching, refetching)

### 3. **Data Flow**

```
User Action
    ↓
Component
    ↓
Hook (useProjects)
    ↓
Service (projectsService)
    ↓
API Client (axios)
    ↓
API Route (/api/projects)
    ↓
Database (future)
```

### 4. **Type Safety**

```typescript
// Define types
interface Project { ... }

// Validate with Zod
const projectSchema = z.object({ ... })

// Use in hooks
function useProjects(): UseQueryResult<Project[]>

// Use in components
const projects: Project[] = data
```

## 🚀 Key Features

### State Management
- ✅ **Zustand** for client state
- ✅ **React Query** for server state
- ✅ **Persistent storage** for auth
- ✅ **Devtools** integration

### Form Handling
- ✅ **React Hook Form** for forms
- ✅ **Zod validation** for type-safe schemas
- ✅ **Automatic error handling**

### API Layer
- ✅ **Axios** client with interceptors
- ✅ **Service pattern** for organization
- ✅ **Type-safe** API calls

### Middleware
- ✅ **Rate limiting** for API protection
- ✅ **CORS** configuration
- ✅ **Authentication** middleware (ready)

### Developer Experience
- ✅ **TypeScript** throughout
- ✅ **Import aliases** (@/*)
- ✅ **Auto-complete** with types
- ✅ **React Query Devtools**
- ✅ **Zustand Devtools**

## 📦 Dependencies

### State Management
```json
{
  "zustand": "^5.0.8",                  // State management
  "@tanstack/react-query": "^5.x",     // Server state
  "axios": "^1.x"                      // HTTP client
}
```

### Form & Validation
```json
{
  "react-hook-form": "^7.x",           // Form handling
  "@hookform/resolvers": "^3.x",       // Form resolvers
  "zod": "^3.x"                        // Schema validation
}
```

## 🎨 Usage Examples

### Using Zustand Store

```typescript
// In a component
import { useProjectsStore } from '@/store';

function ProjectList() {
  const { projects, setProjects, filters } = useProjectsStore();
  
  return <div>{/* UI */}</div>;
}
```

### Using React Query Hook

```typescript
// In a component
import { useProjects } from '@/hooks';

function ProjectList() {
  const { data, isLoading, error } = useProjects();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  
  return <div>{data.map(p => ...)}</div>;
}
```

### Using Form with Validation

```typescript
import { useContactForm } from '@/hooks';

function ContactForm() {
  const { form, onSubmit, isLoading } = useContactForm();
  
  return (
    <form onSubmit={onSubmit}>
      <input {...form.register('email')} />
      {form.formState.errors.email && <span>Error</span>}
      <button disabled={isLoading}>Submit</button>
    </form>
  );
}
```

### Creating API Service

```typescript
// src/services/blogService.ts
import { apiClient } from './apiClient';

export const blogService = {
  getAll: () => apiClient.get('/blog'),
  getBySlug: (slug: string) => apiClient.get(`/blog/${slug}`),
  create: (data: BlogPost) => apiClient.post('/blog', data),
};
```

### Adding React Query Hook

```typescript
// src/hooks/useBlog.ts
import { useQuery } from '@tanstack/react-query';
import { blogService } from '@/services';

export function useBlogPosts() {
  return useQuery({
    queryKey: ['blog'],
    queryFn: () => blogService.getAll(),
  });
}
```

## 🔐 Best Practices

1. **Keep stores flat** - Don't nest too deeply
2. **Use selectors** - Only subscribe to needed state
3. **Separate concerns** - API logic in services, not components
4. **Validate inputs** - Always use Zod schemas
5. **Handle errors** - Use error boundaries and try/catch
6. **Type everything** - No `any` types
7. **Use constants** - Store routes, API endpoints in config

## 📊 Performance Optimizations

- ✅ Code splitting (automatic with Next.js)
- ✅ React Query caching
- ✅ Zustand persist for offline
- ✅ Selective store subscriptions
- ✅ Memoization where needed

---

**Architecture**: Advanced Next.js with State Management  
**Pattern**: Services + Stores + React Query  
**Type Safety**: 100% TypeScript
