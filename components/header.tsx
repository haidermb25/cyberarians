'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
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
  const isHome = pathname === '/'
  const [heroScrolled, setHeroScrolled] = useState(false)

  useEffect(() => {
    if (!isHome) {
      setHeroScrolled(false)
      return
    }
    const onScroll = () => setHeroScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  const glassNav = isHome && !heroScrolled && !isAdmin

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-all duration-300',
        glassNav
          ? 'border-white/15 bg-black/35 backdrop-blur-xl shadow-none'
          : 'border-border bg-background/95 backdrop-blur-md shadow-sm',
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className={cn(
            'flex items-center gap-2.5 font-semibold tracking-tight outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md',
            glassNav
              ? 'text-white focus-visible:ring-white/60 focus-visible:ring-offset-black/40'
              : 'text-foreground focus-visible:ring-offset-background',
          )}
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
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    glassNav
                      ? cn(
                          'focus-visible:ring-white/60 focus-visible:ring-offset-black/40',
                          isActive
                            ? 'text-white'
                            : 'text-white/80 hover:text-white hover:bg-white/10',
                        )
                      : cn(
                          'focus-visible:ring-offset-background',
                          'hover:text-primary hover:bg-primary/5',
                          isActive ? 'text-primary' : 'text-muted-foreground',
                        ),
                  )}
                >
                  {label}
                  {isActive && (
                    <span
                      className={cn(
                        'absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[2px] rounded-full',
                        glassNav ? 'bg-white' : 'bg-primary',
                      )}
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
