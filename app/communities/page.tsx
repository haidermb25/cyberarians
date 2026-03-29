'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Search, Users, Lock, Globe, MapPin } from 'lucide-react'

export interface CommunityMember {
  id: string
  name: string
  role: string
}

export interface Community {
  id: string
  name: string
  description: string
  category: string
  logo?: string
  privacy: 'public' | 'private'
  tags: string[]
  location?: string
  members: CommunityMember[]
}

export default function CommunitiesPage() {
  const [communities, setCommunities] = useState<Community[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const categoryLabels: Record<string, string> = {
    'artificial-intelligence': 'AI',
    'biotechnology': 'Biotech',
    'physics': 'Physics',
    'chemistry': 'Chemistry',
    'medicine': 'Medicine',
    'engineering': 'Engineering',
    'mathematics': 'Math',
    'social-sciences': 'Social Sci',
    'environmental': 'Environmental',
    'other': 'Other',
  }

  useEffect(() => {
    async function fetchCommunities() {
      try {
        const response = await fetch('/api/communities')
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        setCommunities(data)
      } catch (error) {
        console.error('Failed to fetch communities:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCommunities()
  }, [])

  const filteredCommunities = communities.filter(community =>
    community.name.toLowerCase().includes(search.toLowerCase()) ||
    community.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Research Communities</h1>
            <p className="text-muted-foreground text-lg">
              Join active communities and collaborate with researchers worldwide.
            </p>
          </div>

          <div className="relative mb-8">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <Input
              placeholder="Search communities..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="p-6 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </Card>
              ))}
            </div>
          ) : filteredCommunities.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No communities found matching your search.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredCommunities.map(community => (
                <Link key={community.id} href={`/communities/${community.id}`}>
                  <Card className="h-full group hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border-2 hover:border-secondary/50 relative">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="p-8 space-y-5 h-full flex flex-col relative z-10">
                      {/* Header with Logo */}
                      <div className="flex gap-4 items-start">
                        {community.logo && (
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
                            <Image
                              src={community.logo}
                              alt={community.name}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="text-2xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                              {community.name}
                            </h3>
                            {community.privacy === 'private' ? (
                              <Badge className="bg-amber-500 text-white border-0 flex-shrink-0">
                                <Lock className="w-3 h-3 mr-1" />
                                Private
                              </Badge>
                            ) : (
                              <Badge className="bg-green-500 text-white border-0 flex-shrink-0">
                                <Globe className="w-3 h-3 mr-1" />
                                Public
                              </Badge>
                            )}
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {categoryLabels[community.category] || community.category}
                          </Badge>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground line-clamp-3 leading-relaxed text-sm">
                        {community.description}
                      </p>

                      {/* Tags */}
                      {community.tags && community.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {community.tags.slice(0, 3).map(tag => (
                            <Badge 
                              key={tag} 
                              variant="outline" 
                              className="text-xs border-primary/30 text-primary"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {community.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{community.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}

                      {/* Footer */}
                      <div className="mt-auto pt-5 space-y-4">
                        {/* Members Count */}
                        <div className="flex items-center gap-3 bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-3 rounded-lg border border-primary/20">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                            <Users size={20} />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Total Members</p>
                            <p className="text-lg font-bold text-primary">
                              {community.members.length}
                            </p>
                          </div>
                        </div>

                        {/* Location and Roles */}
                        <div className="flex items-center justify-between gap-2">
                          {community.location && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <MapPin className="w-3 h-3" />
                              {community.location}
                            </div>
                          )}
                          <div className="flex flex-wrap gap-2 justify-end">
                            {community.members.slice(0, 2).map(member => (
                              <Badge 
                                key={member.id} 
                                className={member.role === 'Founder' 
                                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white border-0 text-xs px-2 py-1" 
                                  : "bg-gradient-to-r from-primary/80 to-secondary/80 text-white border-0 text-xs px-2 py-1"
                                }
                              >
                                {member.role === 'Founder' ? '👑' : '👤'}
                              </Badge>
                            ))}
                            {community.members.length > 2 && (
                              <Badge variant="outline" className="text-xs border-primary/30 text-primary px-2 py-1">
                                +{community.members.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
