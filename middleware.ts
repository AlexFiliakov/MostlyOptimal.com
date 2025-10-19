import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // No custom redirects - let Next.js handle routing
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images, examples, papers (public assets)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|examples|papers).*)',
  ],
}
