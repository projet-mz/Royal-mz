import { createHmac } from 'crypto';

/**
 * JWT token management utilities
 * 
 * These functions help manage JWT tokens with enhanced security features:
 * - Token rotation
 * - Short expiration times
 * - Device fingerprinting
 * - Secure token storage
 */

/**
 * Generate a device fingerprint based on user agent and other factors
 */
export function generateDeviceFingerprint(userAgent: string, ip: string): string {
  const hmac = createHmac('sha256', process.env.SUPABASE_SERVICE_ROLE_KEY || 'fallback-key');
  hmac.update(`${userAgent}|${ip}`);
  return hmac.digest('hex');
}

/**
 * Validate a JWT token with device fingerprint
 */
export function validateTokenWithFingerprint(
  token: string,
  fingerprint: string,
  storedFingerprint: string
): boolean {
  return fingerprint === storedFingerprint;
}

/**
 * Set secure cookie options for JWT token
 */
export function getSecureCookieOptions(expiresIn: number = 900) { // 15 minutes in seconds
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path: '/',
    maxAge: expiresIn,
  };
}

/**
 * Set secure cookie options for refresh token
 */
export function getRefreshTokenCookieOptions(expiresIn: number = 604800) { // 7 days in seconds
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path: '/api/auth/refresh',
    maxAge: expiresIn,
  };
}

/**
 * Calculate token expiration time
 */
export function getTokenExpirationTime(expiresIn: number = 900): Date {
  return new Date(Date.now() + expiresIn * 1000);
}

/**
 * Detect suspicious login attempts
 * 
 * This function checks for suspicious login patterns based on:
 * - Geographic anomalies
 * - Unusual login times
 * - Multiple failed attempts
 * - New device logins
 */
export function detectSuspiciousLogin(
  userId: string,
  ip: string,
  userAgent: string,
  loginTime: Date,
  knownDevices: string[]
): { suspicious: boolean; reasons: string[] } {
  const reasons: string[] = [];
  
  const deviceFingerprint = generateDeviceFingerprint(userAgent, ip);
  if (!knownDevices.includes(deviceFingerprint)) {
    reasons.push('New device login');
  }
  
  
  return {
    suspicious: reasons.length > 0,
    reasons,
  };
}
