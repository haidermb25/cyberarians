'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  ArrowLeft, 
  Crown, 
  User, 
  Users, 
  Mail, 
  MapPin, 
  Lock, 
  Globe, 
  Shield,
  Tag
} from 'lucide-react'

interface CommunityMember {
  id: string
  name: string
  role: string
}

interface Community {
  id: string
  name: string
  description: string
  category: string
  logo?: string
  privacy: 'public' | 'private'
  rules?: string
  location?: string
  tags: string[]
  adminName: string
  adminEmail: string
  members: CommunityMember[]
}

export default function CommunityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [community, setCommunity] = useState<Community | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { id } = await params
      try {
        const response = await fetch(`/api/communities/${id}`)
        if (!response.ok) throw new Error('Not found')
        const data = await response.json()
        setCommunity(data)
      } catch (error) {
        console.error('Failed to fetch community:', error)
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
          <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Skeleton className="h-12 w-32 mb-8" />
            <div className="space-y-6">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-96 w-full" />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    )
  }

  if (!community) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">Community not found</h1>
            <Link href="/communities">
              <Button>Back to Communities</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const founders = community.members.filter(m => m.role === 'Founder')
  const regularMembers = community.members.filter(m => m.role !== 'Founder')

  const categoryLabels: Record<string, string> = {
    'artificial-intelligence': 'Artificial Intelligence',
    'biotechnology': 'Biotechnology',
    'physics': 'Physics',
    'chemistry': 'Chemistry',
    'medicine': 'Medicine',
    'engineering': 'Engineering',
    'mathematics': 'Mathematics',
    'social-sciences': 'Social Sciences',
    'environmental': 'Environmental Science',
    'other': 'Other',
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <Link href="/communities">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft size={18} className="mr-2" />
              Back to Communities
            </Button>
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header Card */}
              <Card className="p-8">
                <div className="flex gap-6 items-start mb-6">
                  {community.logo && (
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 ring-2 ring-primary/20">
                      <Image
                        src={community.logo}
                        alt={community.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h1 className="text-3xl md:text-4xl font-bold">{community.name}</h1>
                      {community.privacy === 'private' ? (
                        <Badge className="bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          Private
                        </Badge>
                      ) : (
                        <Badge className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          Public
                        </Badge>
                      )}
                    </div>
                    <Badge variant="secondary" className="mb-3">
                      {categoryLabels[community.category] || community.category}
                    </Badge>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {community.description}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                {community.tags && community.tags.length > 0 && (
                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-2 mb-3">
                      <Tag className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-semibold">Keywords</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {community.tags.map(tag => (
                        <Badge 
                          key={tag} 
                          variant="outline" 
                          className="border-primary/30 text-primary"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </Card>

              {/* Community Rules */}
              {community.rules && (
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="w-5 h-5 text-primary" />
                    <h2 className="text-2xl font-bold">Community Rules & Guidelines</h2>
                  </div>
                  <div className="bg-muted/30 p-6 rounded-lg">
                    <pre className="whitespace-pre-wrap text-sm text-muted-foreground font-sans leading-relaxed">
                      {community.rules}
                    </pre>
                  </div>
                </Card>
              )}

              {/* Members Table */}
              <Card className="overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Users className="w-6 h-6 text-primary" />
                    Community Members
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {community.members.map(member => (
                        <TableRow key={member.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">
                            <Link 
                              href={`/researchers/${member.id}`}
                              className="hover:text-primary transition-colors"
                            >
                              {member.name}
                            </Link>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {member.role === 'Founder' ? (
                                <>
                                  <Crown size={16} className="text-amber-500" />
                                  <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white border-0">
                                    {member.role}
                                  </Badge>
                                </>
                              ) : (
                                <>
                                  <User size={16} className="text-primary" />
                                  <Badge variant="outline" className="border-primary/30 text-primary">
                                    {member.role}
                                  </Badge>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Stats Card */}
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Community Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5">
                    <span className="text-sm text-muted-foreground">Total Members</span>
                    <span className="text-2xl font-bold text-primary">{community.members.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/5">
                    <span className="text-sm text-muted-foreground">Founders</span>
                    <span className="text-2xl font-bold text-secondary">{founders.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                    <span className="text-sm text-muted-foreground">Members</span>
                    <span className="text-2xl font-bold">{regularMembers.length}</span>
                  </div>
                </div>
              </Card>

              {/* Community Info */}
              <Card className="p-6 space-y-4">
                <h3 className="font-bold text-lg mb-4">Community Info</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    {community.privacy === 'private' ? (
                      <Lock className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <Globe className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      <p className="text-sm font-semibold">Privacy</p>
                      <p className="text-sm text-muted-foreground capitalize">{community.privacy}</p>
                    </div>
                  </div>

                  {community.location && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold">Location</p>
                        <p className="text-sm text-muted-foreground">{community.location}</p>
                      </div>
                    </div>
                  )}

                  <Separator />

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-primary" />
                      <p className="text-sm font-semibold">Community Admin</p>
                    </div>
                    <p className="text-sm mb-1">{community.adminName}</p>
                    <a 
                      href={`mailto:${community.adminEmail}`}
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      <Mail className="w-3 h-3" />
                      {community.adminEmail}
                    </a>
                  </div>
                </div>
              </Card>

              {/* CTA Card */}
              <Card className="p-6 bg-gradient-to-br from-primary to-secondary text-white">
                <h3 className="text-lg font-bold mb-2">Join This Community</h3>
                <p className="text-sm mb-4 text-white/90">
                  Interested in joining? Contact the community admin to request membership.
                </p>
                <Button 
                  variant="secondary" 
                  className="w-full"
                  asChild
                >
                  <a href={`mailto:${community.adminEmail}?subject=Request to Join ${community.name}`}>
                    Contact Admin
                  </a>
                </Button>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
