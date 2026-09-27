import { NextResponse } from 'next/server';
import { createAuthToken, AUTH_COOKIE_NAME } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    
    // In production, this should be set in Vercel Environment Variables.
    // We fall back to 'oceanway' only if it's not set (for safety during transition).
    const adminPassword = process.env.ADMIN_PASSWORD || 'oceanway';

    if (password === adminPassword) {
      const token = await createAuthToken();
      
      const response = NextResponse.json({ success: true });
      
      response.cookies.set({
        name: AUTH_COOKIE_NAME,
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 // 1 day
      });
      
      return response;
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
