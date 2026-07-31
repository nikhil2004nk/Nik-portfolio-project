import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === '/admin/login';
  const isAdminPath = path.startsWith('/admin');

  if (!isAdminPath) {
    return NextResponse.next();
  }

  const token = request.cookies.get('access_token')?.value || '';

  if (isAdminPath && !isPublicPath && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
