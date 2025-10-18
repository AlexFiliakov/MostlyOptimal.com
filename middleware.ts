import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()

  // If URL doesn't have trailing slash (except root) and doesn't have a file extension, add trailing slash
  if (!url.pathname.endsWith('/') && url.pathname !== '/' && !url.pathname.includes('.')) {
    url.pathname = url.pathname + '/'
    return NextResponse.redirect(url, 308)
  }

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
