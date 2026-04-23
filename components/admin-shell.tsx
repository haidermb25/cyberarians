'use client'

import { usePathname } from 'next/navigation'
import { AdminSidebar } from '@/components/admin-sidebar'

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLogin =
    pathname === '/admin/login' || pathname.startsWith('/admin/login/')

  if (isLogin) {
    return <>{children}</>
  }

  return (
    <div className="flex bg-background min-h-screen">
      <div className="sticky top-0 h-screen">
        <AdminSidebar />
      </div>
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  )
}
