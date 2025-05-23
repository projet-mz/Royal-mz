import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  if (process.env.NODE_ENV === 'production') {
    const cspHeader = 
      "default-src 'self'; " +
      "script-src 'self'; " +
      "style-src 'self'; " +
      "img-src 'self' data:; " +
      "font-src 'self' data:; " +
      "connect-src 'self' https://yjpgggnltnomvvvugoni.supabase.co; " +
      "frame-ancestors 'none'; " +
      "form-action 'self'; " +
      "base-uri 'self'; " +
      "object-src 'none';";
    
    res.headers.set('Content-Security-Policy', cspHeader);
  } else {
    const devCspHeader = 
      "default-src * 'unsafe-inline' 'unsafe-eval'; " +
      "script-src * 'unsafe-inline' 'unsafe-eval'; " +
      "connect-src * 'unsafe-inline'; " +
      "img-src * data: blob: 'unsafe-inline'; " +
      "frame-src *; " +
      "style-src * 'unsafe-inline';";
    
    res.headers.set('Content-Security-Policy', devCspHeader);
  }
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('X-XSS-Protection', '1; mode=block');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  const supabase = createMiddlewareClient({ req, res });
  
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const publicRoutes = ['/login', '/forgot-password', '/reset-password', '/'];
  const isPublicRoute = publicRoutes.some(route => req.nextUrl.pathname.startsWith(route));
  
  const isApiRoute = req.nextUrl.pathname.startsWith('/api');
  
  const isStaticFile = req.nextUrl.pathname.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg)$/);
  
  if (isPublicRoute || isApiRoute || isStaticFile) {
    return res;
  }

  if (!session) {
    const redirectUrl = new URL('/login', req.url);
    return NextResponse.redirect(redirectUrl);
  }

  const userRole = session.user.user_metadata.role;

  if (req.nextUrl.pathname.startsWith('/admin') && userRole !== 'admin') {
    const redirectUrl = new URL(`/${userRole}`, req.url);
    return NextResponse.redirect(redirectUrl);
  }

  if (req.nextUrl.pathname.startsWith('/teacher') && userRole !== 'teacher') {
    const redirectUrl = new URL(`/${userRole}`, req.url);
    return NextResponse.redirect(redirectUrl);
  }

  if (req.nextUrl.pathname.startsWith('/student') && userRole !== 'student') {
    const redirectUrl = new URL(`/${userRole}`, req.url);
    return NextResponse.redirect(redirectUrl);
  }

  if (req.nextUrl.pathname.startsWith('/parent') && userRole !== 'parent') {
    const redirectUrl = new URL(`/${userRole}`, req.url);
    return NextResponse.redirect(redirectUrl);
  }

  if (session) {
    try {
      await supabase.from('security_logs').insert([{
        user_id: session.user.id,
        event_type: 'page_access',
        details: {
          path: req.nextUrl.pathname,
          method: req.method,
          timestamp: new Date().toISOString()
        },
        ip_address: req.ip || req.headers.get('x-forwarded-for') || 'unknown',
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Error logging security event:', error);
    }
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
