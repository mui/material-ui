import { NextResponse, NextRequest } from 'next/server';

/**
 * Hide experiments in production
 */
export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith('/experiments') &&
    process.env.NODE_ENV === 'production'
  ) {
    return NextResponse.rewrite(new URL('/404', request.url));
  }
}
