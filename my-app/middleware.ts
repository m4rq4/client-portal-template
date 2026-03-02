import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if accessing protected routes
  const isProtectedRoute = pathname === '/' || pathname.startsWith('/projects') || pathname.startsWith('/reports');
  const isAuthRoute = pathname === '/login';

  // Create Supabase client
  const cookieStore = request.cookies;
  const supabase = createClient();
  
  // Get session
  const { data: { session } } = await supabase.auth.getSession();

  // Redirect unauthenticated users to login
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect authenticated users away from login
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
