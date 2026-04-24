'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  Network,
  UserCircle,
  Shield,
  LogOut,
  Package,
  Cpu,
  CalendarDays,
  Briefcase,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { BrandLogo } from '@/components/brand-logo'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/researchers', label: 'Researchers', icon: Users },
  { href: '/admin/people', label: 'People', icon: UserCircle },
  { href: '/admin/communities', label: 'Communities', icon: Network },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/engineers', label: 'Engineers', icon: Cpu },
  { href: '/admin/sessions', label: 'Sessions', icon: CalendarDays },
  { href: '/admin/services', label: 'Services', icon: Briefcase },
  { href: '/admin/roles', label: 'Roles', icon: Shield },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border h-screen flex flex-col overflow-y-auto">
      <div className="p-6 border-b border-sidebar-border">
        <Link href="/admin/dashboard" className="flex flex-col gap-2">
          <BrandLogo compact className="self-start" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Admin
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map(item => {
          const Icon = item.icon
          const isActive = pathname.startsWith(item.href)
          
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? 'default' : 'ghost'}
                className={cn(
                  'w-full justify-start',
                  isActive && 'bg-sidebar-primary text-sidebar-primary-foreground'
                )}
              >
                <Icon size={18} className="mr-2" />
                {item.label}
              </Button>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <LogOut size={18} className="mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  )
}
