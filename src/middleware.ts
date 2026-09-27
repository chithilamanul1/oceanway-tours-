import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_COOKIE_NAME, verifyAuth } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  
  // Is this an API route trying to mutate data?
  const isApiRoute = request.nextUrl.pathname.startsWith('/api/');
  const isMutativeApiRoute = isApiRoute && ['POST', 'PUT', 'DELETE'].includes(request.method);
  const isAuthApiRoute = request.nextUrl.pathname.startsWith('/api/auth');
  const isInquiryApiRoute = request.nextUrl.pathname.startsWith('/api/inquiries');

  // Allow public POST to /api/inquiries (so users can submit the contact form!)
  if (isMutativeApiRoute && isInquiryApiRoute && request.method === 'POST') {
    return NextResponse.next();
  }

  // Block unauthorized mutations on API routes
  if (isMutativeApiRoute && !isAuthApiRoute) {
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }
    try {
      await verifyAuth(token);
    } catch (e) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }
  }

  return NextResponse.next();
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
