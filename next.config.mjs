/** @type {import('next').NextConfig} */

// Static pages need inline scripts for hydration and the theme bootstrap, so
// script-src keeps 'unsafe-inline'; everything else is locked to same-origin.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'" + (process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''),
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
];

const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  async redirects() {
    // Old resume URLs that may already be shared or indexed.
    return [
      { source: '/resume.pdf', destination: '/rotha-dapravith-resume.pdf', permanent: true },
      { source: '/Dapravith_Rotha_flow_cv.pdf', destination: '/rotha-dapravith-resume.pdf', permanent: true },
    ];
  },
};

export default nextConfig;
