/**
 * Content Security Policy (CSP) configuration
 * 
 * This file defines the Content Security Policy for the application,
 * which helps prevent XSS attacks and other security vulnerabilities.
 */

function getCSPDirectives() {
  const directives = {
    'default-src': ["'self'"],
    'script-src': ["'self'", process.env.NEXT_PUBLIC_SUPABASE_URL || ''],
    'style-src': ["'self'", "'unsafe-inline'"], // Allow inline styles for shadcn/ui
    'img-src': ["'self'", 'data:', 'blob:', process.env.NEXT_PUBLIC_SUPABASE_URL || ''],
    'font-src': ["'self'", 'data:'],
    'connect-src': [
      "'self'",
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      'https://yjpgggnltnomvvvugoni.supabase.co',
      'wss://yjpgggnltnomvvvugoni.supabase.co',
    ],
    'frame-src': ["'self'"],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'self'"],
    'media-src': ["'self'"],
    'manifest-src': ["'self'"],
    'worker-src': ["'self'", 'blob:'],
  };

  return Object.entries(directives)
    .map(([key, values]) => `${key} ${values.join(' ')}`)
    .join('; ');
}

/**
 * Get security headers for Next.js
 */
function getSecurityHeaders() {
  return [
    {
      key: 'Content-Security-Policy',
      value: getCSPDirectives(),
    },
    {
      key: 'X-DNS-Prefetch-Control',
      value: 'on',
    },
    {
      key: 'X-XSS-Protection',
      value: '1; mode=block',
    },
    {
      key: 'X-Frame-Options',
      value: 'SAMEORIGIN',
    },
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff',
    },
    {
      key: 'Referrer-Policy',
      value: 'strict-origin-when-cross-origin',
    },
    {
      key: 'Permissions-Policy',
      value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
    },
    {
      key: 'Strict-Transport-Security',
      value: 'max-age=63072000; includeSubDomains; preload',
    },
  ];
}

module.exports = {
  getCSPDirectives,
  getSecurityHeaders
};
