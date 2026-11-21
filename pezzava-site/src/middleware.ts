import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // Don't intercept static assets or internal routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/signatures') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const cleanHost = host.split(':')[0].toLowerCase();

  // 1. Mugs Subdomain: mugs.pezzava.in or mugs.localhost
  if (cleanHost.startsWith('mugs.') || cleanHost === 'mugs.pezzava.in') {
    // If root of mugs subdomain, rewrite to /mugs
    if (pathname === '/') {
      url.pathname = '/mugs';
      return NextResponse.rewrite(url);
    }
    // If accessing /mugs on mugs subdomain, keep as is
    if (pathname.startsWith('/mugs')) {
      return NextResponse.next();
    }
  }

  // 2. Skirts Subdomain: skirts.pezzava.in or skirts.localhost
  if (cleanHost.startsWith('skirts.') || cleanHost === 'skirts.pezzava.in') {
    // If root of skirts subdomain, rewrite to /skirts
    if (pathname === '/') {
      url.pathname = '/skirts';
      return NextResponse.rewrite(url);
    }
    // If accessing /skirts on skirts subdomain, keep as is
    if (pathname.startsWith('/skirts')) {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
