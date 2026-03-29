import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Only protect /admin routes (except login)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const sessionCookie = request.cookies.get('admin_session')
    
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // Validate session expiry
    try {
      const decoded = JSON.parse(
        Buffer.from(sessionCookie.value, 'base64').toString()
      )
      const sessionAge = Date.now() - decoded.timestamp
      const SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours

      if (sessionAge > SESSION_DURATION) {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }
    } catch {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
