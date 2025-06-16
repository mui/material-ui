import { NextRequest, NextResponse } from 'next/server';

/**
 * Adds a "pathname" header to the request
 * Used to get the current path name in generateMetadata
 * https://github.com/vercel/next.js/discussions/50189
 */
export function middleware(request: NextRequest) {
  request.headers.set('pathname', request.nextUrl.pathname);
  return NextResponse.next({ request: { headers: request.headers } });
}
