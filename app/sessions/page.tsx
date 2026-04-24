'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Sparkles } from 'lucide-react'
import { SessionFlyerCard } from '@/components/session-flyer-card'
import { FEATURED_FLYER_SESSIONS } from '@/lib/data/featured-flyer-sessions'

export default function SessionsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="border-b border-border/60 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 sm:py-16 sm:text-left">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">Sessions</h1>
                <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  FAST Society of Cybersecurity programmes at NUCES — workshops, seminars, and training sessions.
                </p>
              </div>
              <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
                <Sparkles className="h-4 w-4 text-secondary" aria-hidden />
                <span>{FEATURED_FLYER_SESSIONS.length} featured</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="mb-10">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Featured sessions</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Official session cards for upcoming FAST Society of Cybersecurity programmes.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
              {FEATURED_FLYER_SESSIONS.map(s => (
                <SessionFlyerCard key={s.id} session={s} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
