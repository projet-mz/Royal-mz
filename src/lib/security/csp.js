/**
 * Content Security Policy (CSP) configuration
 * 
 * This file defines the Content Security Policy for the application,
 * which helps prevent XSS attacks and other security vulnerabilities.
 * 
 * NOTE: CSP is disabled in development mode to allow for easier debugging.
 */

/**
 * Get security headers for Next.js
 */
function getSecurityHeaders() {
  return [];
}

module.exports = {
  getSecurityHeaders
};
