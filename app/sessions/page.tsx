'use client'

import { useState, useEffect, useMemo } from 'react'
import { format, parseISO, isValid, isPast, isFuture } from 'date-fns'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Search,
  Calendar,
  Clock,
  MapPin,
  Video,
  Users,
  UserCircle,
  Sparkles,
} from 'lucide-react'
import type { Session } from '@/lib/types/session'

function formatSessionWhen(startsAt: string | null, endsAt: string | null): string {
  if (!startsAt) return 'Date to be announced'
  try {
    const s = parseISO(startsAt)
    if (!isValid(s)) return startsAt
    const datePart = format(s, 'EEEE, MMM d, yyyy')
    const startT = format(s, 'h:mm a')
    if (endsAt) {
      const e = parseISO(endsAt)
      if (isValid(e)) {
        const endT = format(e, 'h:mm a')
        return `${datePart} · ${startT} – ${endT}`
      }
    }
    return `${datePart} · ${startT}`
  } catch {
    return startsAt
  }
}

function formatLabel(raw: string | null): string | null {
  if (!raw) return null
  const k = raw.toLowerCase().replace(/-/g, '_')
  if (k === 'online') return 'Online'
  if (k === 'in_person' || k === 'in person') return 'In person'
  if (k === 'hybrid') return 'Hybrid'
  return raw.replace(/_/g, ' ')
}

function sessionPhase(session: Session): 'live' | 'upcoming' | 'past' | 'tbd' {
  if (session.working) return 'live'
  if (!session.startsAt) return 'tbd'
  try {
    const s = parseISO(session.startsAt)
    if (!isValid(s)) return 'tbd'
    if (isFuture(s)) return 'upcoming'
    if (isPast(s)) {
      if (session.endsAt) {
        const e = parseISO(session.endsAt)
        if (isValid(e) && isFuture(e)) return 'live'
      }
      return 'past'
    }
    return 'upcoming'
  } catch {
    return 'tbd'
  }
}

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/sessions')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setSessions(Array.isArray(data) ? data : [])
      } catch (e) {
        console.error('Failed to fetch sessions:', e)
        setSessions([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return sessions
    return sessions.filter((s) => {
      const hay = [
        s.name,
        s.description ?? '',
        s.location ?? '',
        s.facilitator ?? '',
        s.sessionType ?? '',
        s.format ?? '',
      ]
        .join(' ')
        .toLowerCase()
      return hay.includes(q)
    })
  }, [sessions, search])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-b border-border/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                  Sessions
                </h1>
                <p className="mt-3 text-lg text-muted-foreground max-w-2xl leading-relaxed">
                  Research sessions, workshops, and live events. Browse what is running now and what is
                  coming up.
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4 text-secondary" />
                <span>{loading ? '…' : `${sessions.length} listed`}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="relative mb-8">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <Input
              placeholder="Search by name, facilitator, location, or type…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="p-6 space-y-4 border-2">
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-10 w-full mt-4" />
                </Card>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-border bg-muted/20">
              <p className="text-lg text-muted-foreground">
                {sessions.length === 0
                  ? 'No sessions in the database yet. Add rows to the sessions table in Supabase, or run supabase/sessions_table.sql and insert sample data.'
                  : 'No sessions match your search.'}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((session) => {
                const phase = sessionPhase(session)
                const when = formatSessionWhen(session.startsAt, session.endsAt)
                const formatLabelText = formatLabel(session.format)

                return (
                  <Card
                    key={session.id}
                    className="group h-full overflow-hidden border-2 hover:border-secondary/45 hover:shadow-xl transition-all duration-300 flex flex-col bg-card relative"
                  >
                    <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-primary/12 to-secondary/12 rounded-bl-full opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />

                    <div className="p-6 sm:p-7 flex flex-col h-full gap-5 relative z-10">
                      <div className="flex items-start justify-between gap-3">
                        <h2 className="text-xl font-bold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                          {session.name}
                        </h2>
                        <div className="flex flex-col items-end gap-1.5 shrink-0">
                          {session.working ? (
                            <Badge className="bg-emerald-600 text-white border-0 shadow-sm gap-1.5 pr-2">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                              </span>
                              Working
                            </Badge>
                          ) : phase === 'upcoming' ? (
                            <Badge className="bg-sky-600 text-white border-0">Upcoming</Badge>
                          ) : phase === 'past' ? (
                            <Badge variant="secondary" className="border-border/80">
                              Past
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="border-primary/30 text-primary">
                              Scheduled
                            </Badge>
                          )}
                          {formatLabelText && (
                            <Badge variant="outline" className="text-[10px] px-2 py-0 border-primary/25">
                              <Video className="w-3 h-3 mr-0.5 opacity-80" />
                              {formatLabelText}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {session.sessionType && (
                        <Badge variant="secondary" className="w-fit text-xs font-medium">
                          {session.sessionType}
                        </Badge>
                      )}

                      <div className="rounded-xl border border-primary/15 bg-gradient-to-br from-primary/[0.06] to-secondary/[0.06] px-4 py-3 space-y-2">
                        <div className="flex items-start gap-2.5 text-sm">
                          <Calendar className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span className="font-medium text-foreground leading-snug">{when}</span>
                        </div>
                        {session.startsAt && (
                          <div className="flex items-center gap-2.5 text-xs text-muted-foreground pl-6">
                            <Clock className="w-3.5 h-3.5 shrink-0" />
                            <span>Your local time is shown above</span>
                          </div>
                        )}
                      </div>

                      {session.description && (
                        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                          {session.description}
                        </p>
                      )}

                      <div className="mt-auto pt-2 space-y-3 border-t border-border/60">
                        {session.facilitator && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <UserCircle className="w-4 h-4 text-secondary shrink-0" />
                            <span className="truncate">
                              <span className="text-foreground font-medium">Facilitator: </span>
                              {session.facilitator}
                            </span>
                          </div>
                        )}
                        {session.location && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4 text-primary shrink-0" />
                            <span className="truncate">{session.location}</span>
                          </div>
                        )}
                        {session.maxParticipants != null && (
                          <div className="flex items-center gap-3 rounded-lg bg-muted/50 px-3 py-2.5 border border-border/50">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">
                              <Users size={18} />
                            </div>
                            <div>
                              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                                Capacity
                              </p>
                              <p className="text-sm font-semibold text-foreground">
                                Up to {session.maxParticipants} participants
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
