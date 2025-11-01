// API base URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

// API endpoints
export const API_ENDPOINTS = {
  CONTACT: `${API_BASE_URL}/contact`,
  PROJECTS: `${API_BASE_URL}/projects`,
  BLOG: `${API_BASE_URL}/blog`,
} as const;

// App constants
export const APP_NAME = 'Dapravith Portfolio';
export const APP_DESCRIPTION = 'Full-stack Developer Portfolio';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://dapravith.pro';

// Social links
export const SOCIAL_LINKS = {
  GITHUB: 'https://github.com/dapravith',
  LINKEDIN: 'https://linkedin.com/in/dapravith',
  TWITTER: 'https://twitter.com/dapravith',
  EMAIL: 'contact@dapravith.pro',
} as const;
