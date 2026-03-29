'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/researchers', label: 'Researchers' },
  { href: '/communities', label: 'Communities' },
  { href: '/engineers', label: 'Engineers' },
  { href: '/sessions', label: 'Sessions' },
  { href: '/products', label: 'Products' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact Us' },
]

export function Header() {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-semibold text-foreground tracking-tight outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md"
        >
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center shrink-0">
            <BookOpen size={18} className="text-primary-foreground" strokeWidth={2.25} />
          </div>
          <span className="text-base">Cybrarian</span>
        </Link>

        {!isAdmin && (
          <div className="hidden md:flex items-center">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'relative flex items-center justify-center h-11 px-4 text-sm font-semibold rounded-md transition-colors duration-150',
                    'hover:text-primary hover:bg-primary/5',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    isActive
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  )}
                >
                  {label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[2px] rounded-full bg-primary"
                      aria-hidden
                    />
                  )}
                </Link>
              )
            })}
          </div>
        )}
      </nav>
    </header>
  )
}
