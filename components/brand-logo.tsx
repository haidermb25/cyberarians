'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

export type BrandLogoProps = {
  className?: string
  /** Header / sidebar: balanced footprint */
  compact?: boolean
  /** LCP: set on main site header */
  priority?: boolean
  /**
   * `integrated` — flat on light backgrounds (inverted artwork reads as a dark mark on white).
   * In dark mode, a subtle near-black chip preserves the original white-on-black file.
   * `badge` — always the dark chip (e.g. admin login on a colored hero).
   */
  variant?: 'integrated' | 'badge'
}

/**
 * Cyberarians wordmark (source: white on black PNG).
 * Default `integrated` removes the heavy black “button” on white headers.
 */
export function BrandLogo({ className, compact, priority, variant = 'integrated' }: BrandLogoProps) {
  const badge = variant === 'badge'

  return (
    <span
      className={cn(
        'inline-flex max-w-full items-center',
        badge &&
          'rounded-lg bg-[#0a0a0a] px-2 py-1 ring-1 ring-black/30 sm:px-2.5 sm:py-1.5 dark:ring-white/[0.12]',
        !badge &&
          'dark:rounded-lg dark:bg-[#0a0a0a] dark:px-2.5 dark:py-1 dark:ring-1 dark:ring-white/[0.08]',
        className,
      )}
    >
      <Image
        src="/brand/cyberarians-logo.png"
        alt="Cyberarians"
        width={960}
        height={192}
        priority={priority}
        className={cn(
          'h-auto w-auto max-w-[min(100%,92vw)] object-contain object-left sm:max-w-none',
          !badge && 'invert dark:invert-0',
          badge && 'object-center',
          compact ? 'max-h-8 sm:max-h-9 md:max-h-10' : 'max-h-9 sm:max-h-10 md:max-h-11',
        )}
        sizes={
          compact
            ? '(max-width: 480px) 280px, (max-width: 768px) 320px, 380px'
            : '(max-width: 640px) 320px, (max-width: 1024px) 400px, 480px'
        }
      />
    </span>
  )
}
