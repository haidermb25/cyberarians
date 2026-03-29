'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RatingStars } from '@/components/rating-stars'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Building2, 
  GraduationCap, 
  BookOpen, 
  Briefcase, 
  Award, 
  ExternalLink,
  Globe
} from 'lucide-react'

interface Education {
  degree: string
  institution: string
  year: string
}

interface Links {
  orcid?: string
  googleScholar?: string
  linkedin?: string
  website?: string
}

interface Researcher {
  id: string
  name: string
  title: string
  affiliation: string
  email: string
  phone?: string
  expertise: string[]
  rating: number
  bio: string
  image: string
  publications?: string[]
  projects?: string[]
  awards?: string[]
  education?: Education[]
  links?: Links
}

const DR_ANWAR_SHAH: Researcher = {
  id: 'dr-anwar-shah',
  name: 'Dr. Anwar Shah',
  title: 'Founder, Cybrarian',
  affiliation: 'Cybrarian',
  email: '',
  expertise: ['Research', 'Leadership', 'Community Building'],
  rating: 5,
  bio: 'Founder of Cybrarian. Connecting research and building communities.',
  image: '/researchers/dr-anwar-shah.png',
}

export default function ResearcherDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [researcher, setResearcher] = useState<Researcher | null>(null)
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState<string>('')

  useEffect(() => {
    async function load() {
      const { id: actualId } = await params
      setId(actualId)
      if (actualId === DR_ANWAR_SHAH.id) {
        setResearcher(DR_ANWAR_SHAH)
        setLoading(false)
        return
      }
      try {
        const response = await fetch(`/api/researchers/${actualId}`)
        if (!response.ok) throw new Error('Not found')
        const data = await response.json()
        setResearcher(data)
      } catch (error) {
        console.error('Failed to fetch researcher:', error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [params])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Skeleton className="h-12 w-32 mb-8" />
            <div className="grid md:grid-cols-3 gap-8">
              <Skeleton className="h-96 w-full md:col-span-1" />
              <div className="md:col-span-2 space-y-6">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    )
  }

  if (!researcher) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">Researcher not found</h1>
            <Link href="/researchers">
              <Button>Back to Researchers</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <Link href="/researchers">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft size={18} className="mr-2" />
              Back to Researchers
            </Button>
          </Link>

          {/* Profile Header */}
          <Card className="p-8 mb-6">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Circular Profile Photo */}
              <div className="flex-shrink-0">
                <div className="relative w-40 h-40 rounded-full overflow-hidden ring-4 ring-primary/10">
                  <Image
                    src={researcher.image}
                    alt={researcher.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>

              {/* Header Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{researcher.name}</h1>
                  <p className="text-lg text-primary font-semibold mb-1">{researcher.title}</p>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    {researcher.affiliation}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <RatingStars rating={researcher.rating} />
                    <span className="text-2xl font-bold text-primary">{researcher.rating.toFixed(1)}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a 
                    href={`mailto:${researcher.email}`} 
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    {researcher.email}
                  </a>
                  
                  {researcher.phone && (
                    <a 
                      href={`tel:${researcher.phone}`}
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      {researcher.phone}
                    </a>
                  )}
                </div>

                {/* Professional Links */}
                {researcher.links && Object.keys(researcher.links).some(key => researcher.links![key as keyof Links]) && (
                  <div className="flex flex-wrap gap-3 pt-2">
                    {researcher.links.orcid && (
                      <a 
                        href={`https://orcid.org/${researcher.links.orcid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        ORCID
                      </a>
                    )}
                    {researcher.links.googleScholar && (
                      <a 
                        href={researcher.links.googleScholar}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Google Scholar
                      </a>
                    )}
                    {researcher.links.linkedin && (
                      <a 
                        href={researcher.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        LinkedIn
                      </a>
                    )}
                    {researcher.links.website && (
                      <a 
                        href={researcher.links.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"
                      >
                        <Globe className="w-3 h-3" />
                        Website
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - About & Expertise */}
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">About</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {researcher.bio}
                </p>
              </Card>

              {/* Research Interests */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Research Interests</h2>
                <div className="flex flex-wrap gap-2">
                  {researcher.expertise.map(exp => (
                    <Badge 
                      key={exp} 
                      className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 px-4 py-2 text-sm"
                    >
                      {exp}
                    </Badge>
                  ))}
                </div>
              </Card>

              {/* Publications */}
              {researcher.publications && researcher.publications.length > 0 && (
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-bold">Publications & Papers</h2>
                  </div>
                  <div className="space-y-3">
                    {researcher.publications.map((pub, index) => (
                      <div 
                        key={index} 
                        className="flex gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <span className="text-primary font-bold text-sm mt-0.5 flex-shrink-0">
                          {index + 1}.
                        </span>
                        <p className="text-sm text-muted-foreground leading-relaxed">{pub}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Projects */}
              {researcher.projects && researcher.projects.length > 0 && (
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-bold">Projects & Grants</h2>
                  </div>
                  <div className="space-y-3">
                    {researcher.projects.map((project, index) => (
                      <div 
                        key={index} 
                        className="flex gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground leading-relaxed">{project}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            {/* Right Column - Education & Awards */}
            <div className="space-y-6">
              {/* Education */}
              {researcher.education && researcher.education.length > 0 && (
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-bold">Education</h2>
                  </div>
                  <div className="space-y-4">
                    {researcher.education.map((edu, index) => (
                      <div key={index} className="relative pl-4 border-l-2 border-primary/30 py-2">
                        <div className="absolute -left-1.5 top-3 w-3 h-3 rounded-full bg-primary" />
                        <h3 className="font-semibold text-sm mb-1">{edu.degree}</h3>
                        <p className="text-xs text-muted-foreground mb-1">{edu.institution}</p>
                        <p className="text-xs text-primary font-medium">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Awards */}
              {researcher.awards && researcher.awards.length > 0 && (
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-bold">Awards & Honors</h2>
                  </div>
                  <div className="space-y-3">
                    {researcher.awards.map((award, index) => (
                      <div 
                        key={index} 
                        className="p-3 rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10"
                      >
                        <div className="flex gap-2">
                          <Award className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <p className="text-sm font-medium">{award}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* CTA Card */}
              <Card className="p-6 bg-gradient-to-br from-primary to-secondary text-white">
                <h3 className="text-lg font-bold mb-2">Interested in Collaboration?</h3>
                <p className="text-sm mb-4 text-white/90">
                  Connect with {researcher.name.split(' ')[0]} through our research communities.
                </p>
                <Link href="/communities">
                  <Button variant="secondary" className="w-full">
                    Explore Communities
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
