import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminSessionJwt } from '@/lib/admin-jwt'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  const needsAdminAuth =
    (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) ||
    (pathname.startsWith('/api/admin') && !pathname.startsWith('/api/admin/login'))

  if (needsAdminAuth) {
    const token = request.cookies.get('admin_session')?.value

    if (!token || !(await verifyAdminSessionJwt(token))) {
      if (pathname.startsWith('/api/admin')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      const res = NextResponse.redirect(new URL('/admin/login', request.url))
      if (token) res.cookies.delete('admin_session')
      return res
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin', '/admin/:path*', '/api/admin', '/api/admin/:path*'],
}
