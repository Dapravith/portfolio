export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PROJECTS: '/projects',
  PROJECT_DETAIL: (id: string | number) => `/projects/${id}`,
  BLOG: '/blog',
  BLOG_POST: (slug: string) => `/blog/${slug}`,
  CONTACT: '/contact',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
} as const;

export const API_ROUTES = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    ME: '/api/auth/me',
  },
  PROJECTS: {
    LIST: '/api/projects',
    DETAIL: (id: number) => `/api/projects/${id}`,
    CREATE: '/api/projects',
    UPDATE: (id: number) => `/api/projects/${id}`,
    DELETE: (id: number) => `/api/projects/${id}`,
    FEATURED: '/api/projects?featured=true',
  },
  CONTACT: '/api/contact',
  BLOG: {
    LIST: '/api/blog',
    DETAIL: (slug: string) => `/api/blog/${slug}`,
  },
} as const;
