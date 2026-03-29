'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { RatingStars } from '@/components/rating-stars'
import { Skeleton } from '@/components/ui/skeleton'
import { Search } from 'lucide-react'

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
  title: 'Founder, Cybrarian',
  affiliation: 'Cybrarian',
  expertise: ['Research', 'Leadership', 'Community Building'],
  rating: 5,
  bio: 'Founder of Cybrarian. Connecting research and building communities.',
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
    <Link key={researcher.id} href={`/researchers/${researcher.id}`}>
      <Card className="h-full group hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border-2 hover:border-primary/50 bg-gradient-to-br from-card via-card to-primary/5">
        <div className="relative h-48 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
          <Image
            src={researcher.image}
            alt={researcher.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            unoptimized
          />
          <div className="absolute top-3 right-3 z-20 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
            <div className="flex items-center gap-1.5">
              <span className="text-primary font-bold text-sm">{researcher.rating.toFixed(1)}</span>
              <span className="text-yellow-500">★</span>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <h3 className="font-bold text-xl line-clamp-1 group-hover:text-primary transition-colors">
              {researcher.name}
            </h3>
            <p className="text-sm text-primary font-semibold mt-1">{researcher.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
              <span className="inline-block w-1 h-1 rounded-full bg-primary/60" />
              {researcher.affiliation}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {researcher.expertise.slice(0, 2).map(exp => (
              <Badge
                key={exp}
                className="bg-gradient-to-r from-primary/90 to-secondary/90 text-white border-0 hover:from-primary hover:to-secondary transition-all text-xs px-3 py-1"
              >
                {exp}
              </Badge>
            ))}
            {researcher.expertise.length > 2 && (
              <Badge variant="outline" className="text-xs border-primary/30 text-primary px-3 py-1">
                +{researcher.expertise.length - 2} more
              </Badge>
            )}
          </div>
          <div className="pt-3 border-t border-border/50">
            <RatingStars rating={researcher.rating} />
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
                <Card key={i} className="p-6 space-y-4">
                  <Skeleton className="h-40 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
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
