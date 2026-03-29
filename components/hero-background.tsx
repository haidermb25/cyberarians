'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

// Five slides: add hero-3.png, hero-4.png, hero-5.png to public/hero/ for five distinct images
const HERO_IMAGES = [
  '/hero/hero-1.png',
  '/hero/hero-2.png',
  '/hero/hero-1.png',
  '/hero/hero-2.png',
  '/hero/hero-1.png',
]
const ROTATE_INTERVAL_MS = 5000
const SLIDE_DURATION_MS = 600

export function HeroBackground() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % HERO_IMAGES.length)
    }, ROTATE_INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      {/* Horizontal sliding strip: 5 full-width slides, move left/right */}
      <div
        className="absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div
          className="flex h-full will-change-transform"
          style={{
            width: `${HERO_IMAGES.length * 100}%`,
            transform: `translate3d(-${activeIndex * (100 / HERO_IMAGES.length)}%, 0, 0)`,
            transition: `transform ${SLIDE_DURATION_MS}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
          }}
        >
          {HERO_IMAGES.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="relative h-full flex-shrink-0"
              style={{ width: `${100 / HERO_IMAGES.length}%` }}
            >
              {/* HD: Next/Image for sharp scaling; cover without over-zooming */}
              <Image
                src={src}
                alt=""
                fill
                className="object-cover object-center select-none"
                sizes="100vw"
                quality={95}
                priority
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dark overlay: keeps image visible and distinct from page background, ensures text contrast */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/55 pointer-events-none"
        aria-hidden
      />

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1] flex gap-2 pointer-events-none" aria-hidden>
        {HERO_IMAGES.map((_, i) => (
          <span
            key={i}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: i === activeIndex ? 24 : 6,
              backgroundColor: i === activeIndex ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.4)',
            }}
          />
        ))}
      </div>
    </>
  )
}
