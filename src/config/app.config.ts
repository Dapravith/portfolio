// App Configuration
export const appConfig = {
  name: 'Dapravith Portfolio',
  description: 'Full-stack Developer Portfolio',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://dapravith.pro',
  locale: 'en-US',
  author: {
    name: 'Dapravith',
    email: 'contact@dapravith.pro',
  },
} as const;

// API Configuration
export const apiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 10000,
  retries: 3,
} as const;

// Feature Flags
export const features = {
  auth: process.env.NEXT_PUBLIC_ENABLE_AUTH === 'true',
  blog: process.env.NEXT_PUBLIC_ENABLE_BLOG === 'true',
  analytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  contactForm: process.env.NEXT_PUBLIC_ENABLE_CONTACT !== 'false',
} as const;

// Social Links
export const socialLinks = {
  github: 'https://github.com/dapravith',
  linkedin: 'https://www.linkedin.com/in/rotha-dapravith/',
  email: 'dapravithrotha@gmail.com',
} as const;

// SEO Configuration
export const seoConfig = {
  defaultTitle: 'Dapravith - Full-stack Developer',
  titleTemplate: '%s | Dapravith Portfolio',
  description: 'Full-stack developer specializing in Next.js, React, and Node.js',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: appConfig.url,
    siteName: appConfig.name,
  },
} as const;
