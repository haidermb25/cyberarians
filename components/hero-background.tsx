'use client'

import { useState, useEffect, useCallback, useRef, type CSSProperties } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type HeroSlide = {
  src: string
  alt: string
  label: string
  /** Tailwind object-position / fit tweaks (e.g. portrait photos) */
  imageClass?: string
}

const SLIDES: HeroSlide[] = [
  {
    src: '/hero/hero-lab.jpg',
    alt: 'Team collaborating around laptops in a bright modern office',
    label: 'Hands-on sessions & training',
    imageClass: 'object-cover object-center sm:object-[center_40%]',
  },
  {
    src: '/hero/hero-community.jpg',
    alt: 'Team workshop with people gathered around a table reviewing work',
    label: 'Community & partner events',
    imageClass: 'object-cover object-center',
  },
  {
    src: '/hero/hero-presentation.jpg',
    alt: 'Speaker presenting with a microphone at a professional event',
    label: 'Talks, keynotes & leadership',
    imageClass: 'object-cover object-[center_30%] sm:object-[center_25%]',
  },
]

const AUTOPLAY_MS = 7000
const CROSSFADE_MS = 1100

export function HeroBackground() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduceMotion(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  const goTo = useCallback((i: number) => {
    setActiveIndex((prev) => {
      const n = SLIDES.length
      const next = ((i % n) + n) % n
      return next === prev ? prev : next
    })
  }, [])

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % SLIDES.length)
  }, [])

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length)
  }, [])

  useEffect(() => {
    if (reduceMotion || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current)
      timerRef.current = null
      return
    }
    timerRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % SLIDES.length)
    }, AUTOPLAY_MS)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [reduceMotion, isPaused])

  return (
    <>
      <div
        className="absolute inset-0 overflow-hidden bg-slate-950"
        aria-hidden
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="absolute inset-0 opacity-40 pointer-events-none hero-hero-mesh"
          aria-hidden
        />

        {SLIDES.map((slide, i) => {
          const isActive = i === activeIndex
          return (
            <div
              key={slide.src}
              className={cn(
                'absolute inset-0 transition-opacity ease-in-out',
                isActive ? 'opacity-100 z-[0]' : 'opacity-0 z-0',
              )}
              style={{
                transitionDuration: `${CROSSFADE_MS}ms`,
              }}
            >
              <div key={`${slide.src}-${activeIndex}-${isActive}`} className="absolute inset-0">
                <Image
                  src={slide.src}
                  alt=""
                  fill
                  className={cn('object-cover select-none', slide.imageClass)}
                  sizes="100vw"
                  priority={i === 0}
                  draggable={false}
                />
              </div>
              <div
                className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_90%_75%_at_50%_42%,transparent_0%,rgba(0,0,0,0.38)_100%)]"
                aria-hidden
              />
            </div>
          )
        })}
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/55 pointer-events-none z-[1]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-tr from-primary/15 via-transparent to-secondary/12 pointer-events-none z-[1] mix-blend-soft-light opacity-85"
        aria-hidden
      />

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-[2] pointer-events-none hidden sm:block">
        <div
          key={activeIndex}
          className="rounded-full border border-white/20 bg-black/25 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md shadow-lg hero-caption-in"
        >
          {SLIDES[activeIndex].label}
        </div>
      </div>

      {!reduceMotion && (
        <div className="absolute bottom-0 left-0 right-0 z-[2] h-1 bg-white/10 pointer-events-none">
          <div
            key={activeIndex}
            className="h-full bg-gradient-to-r from-emerald-400/90 via-white/95 to-sky-400/90 origin-left hero-progress-bar shadow-[0_0_20px_rgba(255,255,255,0.35)]"
            style={{ '--hero-interval': `${AUTOPLAY_MS}ms` } as CSSProperties}
          />
        </div>
      )}

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] flex items-center gap-2"
        role="tablist"
        aria-label="Hero image slides"
      >
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Show slide ${i + 1}: ${slide.alt}`}
            onClick={() => goTo(i)}
            className={cn(
              'h-2 rounded-full transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black/50',
              i === activeIndex
                ? 'w-9 bg-white shadow-[0_0_12px_rgba(255,255,255,0.5)]'
                : 'w-2 bg-white/40 hover:bg-white/65',
            )}
          />
        ))}
      </div>

      <div className="absolute inset-y-0 left-0 right-0 z-[2] pointer-events-none max-w-7xl mx-auto">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous slide"
          className="pointer-events-auto absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next slide"
          className="pointer-events-auto absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </>
  )
}
