'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BrandLogo } from '@/components/brand-logo'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

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
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const elevated = scrolled && !isAdmin

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b border-border/70 bg-white text-foreground transition-[box-shadow] duration-200 ease-out',
        'dark:border-border dark:bg-card dark:text-card-foreground',
        elevated
          ? 'shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)] dark:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.45)]'
          : 'shadow-[0_1px_0_0_rgba(15,23,42,0.05)]',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 shrink items-center rounded-lg outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-card"
        >
          <BrandLogo compact priority className="min-w-0" />
        </Link>

        {!isAdmin && (
          <>
            <div
              className={cn(
                'hidden items-center gap-0.5 rounded-full p-1 lg:flex',
                'border border-border/50 bg-muted/25 shadow-sm',
                'ring-1 ring-black/[0.03] dark:border-border/60 dark:bg-muted/15 dark:ring-white/[0.04]',
              )}
            >
              {navLinks.map(({ href, label }) => {
                const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      'relative flex h-9 items-center justify-center whitespace-nowrap rounded-full px-3.5 text-[13px] font-medium transition-colors duration-150',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-card',
                      isActive
                        ? 'bg-white font-semibold text-primary shadow-sm ring-1 ring-border/70 dark:bg-card dark:font-semibold dark:text-primary dark:ring-border/80'
                        : 'text-foreground/70 hover:bg-background/90 hover:text-foreground dark:text-muted-foreground dark:hover:bg-muted/35 dark:hover:text-foreground',
                    )}
                  >
                    {label}
                  </Link>
                )
              })}
            </div>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-[background-color,border-color,transform] duration-150 lg:hidden',
                    'border-primary/20 bg-primary/[0.07] text-foreground shadow-sm',
                    'hover:border-primary/28 hover:bg-primary/[0.11] active:scale-[0.97]',
                    'dark:border-primary/30 dark:bg-primary/[0.12] dark:hover:bg-primary/[0.18]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-card',
                  )}
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-[22px] w-[22px]" strokeWidth={2.35} aria-hidden />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="flex w-[min(100%,22rem)] flex-col">
                <SheetHeader className="text-left">
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription className="sr-only">
                    Primary navigation links for the Cyberarians site.
                  </SheetDescription>
                </SheetHeader>
                <nav className="mt-6 flex flex-col gap-0.5" aria-label="Mobile">
                  {navLinks.map(({ href, label }) => {
                    const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
                    return (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          'rounded-lg px-3 py-3 text-[15px] font-medium transition-colors',
                          isActive
                            ? 'bg-primary/10 font-semibold text-primary'
                            : 'text-foreground hover:bg-muted',
                        )}
                      >
                        {label}
                      </Link>
                    )
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </>
        )}
      </nav>
    </header>
  )
}
