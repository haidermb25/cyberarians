'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { RatingStars } from '@/components/rating-stars'
import { Skeleton } from '@/components/ui/skeleton'
import { Building2, ChevronRight, Search } from 'lucide-react'
export interface Researcher {
  id: string
  name: string
  title: string
  affiliation: string
  expertise: string[]
  rating: number
  bio: string
  image: string
}

const DR_ANWAR_SHAH: Researcher = {
  id: 'dr-anwar-shah',
  name: 'Dr. Anwar Shah',
  title: 'Founder, Cyberarians',
  affiliation: 'Cyberarians',
  expertise: ['Research', 'Leadership', 'Community Building'],
  rating: 5,
  bio: 'Founder of Cyberarians. Connecting research and building communities.',
  image: '/researchers/dr-anwar-shah.png',
}

export default function ResearchersPage() {
  const [researchers, setResearchers] = useState<Researcher[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function fetchResearchers() {
      try {
        const response = await fetch('/api/researchers')
        const data = await response.json()
        const list = Array.isArray(data) ? data : []
        const hasDrAnwar = list.some((r: Researcher) => r.id === DR_ANWAR_SHAH.id)
        setResearchers(hasDrAnwar ? list : [DR_ANWAR_SHAH, ...list])
      } catch {
        setResearchers([])
      } finally {
        setLoading(false)
      }
    }

    fetchResearchers()
  }, [])

  const filteredResearchers = researchers.filter(
    researcher =>
      researcher.name.toLowerCase().includes(search.toLowerCase()) ||
      (researcher.affiliation || '').toLowerCase().includes(search.toLowerCase()) ||
      researcher.expertise.some(exp => exp.toLowerCase().includes(search.toLowerCase()))
  )

  const isDoctor = (r: Researcher) => {
    const t = (r.title || '').toLowerCase()
    const n = (r.name || '').toLowerCase()
    return t.includes('dr.') || t.includes('doctor') || t.includes('phd') || n.startsWith('dr. ')
  }

  const doctorRAs = filteredResearchers.filter(isDoctor)
  const otherRAs = filteredResearchers.filter(r => !isDoctor(r))

  const renderCard = (researcher: Researcher) => (
    <Link
      key={researcher.id}
      href={`/researchers/${researcher.id}`}
      className="block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Card className="h-full group relative flex flex-row gap-4 cursor-pointer overflow-hidden rounded-xl border border-border/70 bg-card p-4 sm:p-5 shadow-sm ring-1 ring-black/[0.03] dark:ring-white/[0.06] hover:border-primary/35 hover:ring-primary/15 hover:shadow-md hover:shadow-primary/[0.08]">
        <div className="relative z-0 h-20 w-20 sm:h-[5.25rem] sm:w-[5.25rem] shrink-0 overflow-hidden rounded-md bg-muted shadow-sm ring-1 ring-border/55 group-hover:shadow-md group-hover:ring-primary/20">
          <Image
            src={researcher.image}
            alt={researcher.name}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 80px, 84px"
            unoptimized
          />
        </div>
        <div className="relative z-0 min-w-0 flex-1 flex flex-col gap-2">
          <div className="min-w-0">
            <h3 className="font-semibold text-base sm:text-lg tracking-tight text-foreground leading-snug line-clamp-2 group-hover:text-primary">
              {researcher.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">{researcher.title}</p>
            <p className="text-xs text-muted-foreground/90 mt-1.5 flex items-center gap-1.5 line-clamp-1">
              <Building2 className="h-3.5 w-3.5 shrink-0 text-muted-foreground/80" aria-hidden />
              <span className="truncate">{researcher.affiliation}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {researcher.expertise.slice(0, 3).map(exp => (
              <span
                key={exp}
                className="inline-flex items-center rounded-md bg-muted/80 px-2 py-0.5 text-[11px] font-medium text-foreground/80 border border-border/80 group-hover:border-primary/20 group-hover:bg-primary/[0.06] group-hover:text-primary"
              >
                {exp}
              </span>
            ))}
            {researcher.expertise.length > 3 && (
              <span className="text-[11px] text-muted-foreground self-center px-0.5 tabular-nums">
                +{researcher.expertise.length - 3} more
              </span>
            )}
          </div>
          <div className="mt-auto pt-3 flex items-center justify-between gap-3 border-t border-border/50">
            <RatingStars rating={researcher.rating} size={14} />
            <span className="inline-flex items-center gap-0.5 text-sm font-semibold text-primary shrink-0 group-hover:text-primary/90">
              View
              <ChevronRight className="h-4 w-4" aria-hidden />
            </span>
          </div>
        </div>
      </Card>
    </Link>
  )

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Research Assistants</h1>
            <p className="text-muted-foreground text-lg">
              Discover leading research assistants across various domains of expertise.
            </p>
          </div>

          <div className="relative mb-8">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <Input
              placeholder="Search by name or expertise..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="p-4 sm:p-5 flex gap-4">
                  <Skeleton className="h-20 w-20 sm:h-[5.25rem] sm:w-[5.25rem] shrink-0 rounded-lg" />
                  <div className="flex-1 space-y-2 py-0.5">
                    <Skeleton className="h-5 w-4/5" />
                    <Skeleton className="h-3.5 w-3/5" />
                    <Skeleton className="h-3 w-2/3" />
                    <div className="flex gap-1.5 pt-1">
                      <Skeleton className="h-5 w-14 rounded-md" />
                      <Skeleton className="h-5 w-20 rounded-md" />
                    </div>
                    <Skeleton className="h-6 w-full mt-2" />
                  </div>
                </Card>
              ))}
            </div>
          ) : filteredResearchers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No research assistants found matching your search.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {doctorRAs.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">RA&apos;s Doctors</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {doctorRAs.map(researcher => renderCard(researcher))}
                  </div>
                </div>
              )}
              {otherRAs.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Other RAs</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherRAs.map(researcher => renderCard(researcher))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
