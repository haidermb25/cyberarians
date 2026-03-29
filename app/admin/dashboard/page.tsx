'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'

interface Researcher {
  id: string
  name: string
  title: string
  expertise: string[]
  rating: number
  bio: string
  image: string
}

interface CommunityMember {
  id: string
  name: string
  role: string
}

interface Community {
  id: string
  name: string
  description: string
  members: CommunityMember[]
}

export default function AdminDashboard() {
  const [researchers, setResearchers] = useState<Researcher[]>([])
  const [communities, setCommunities] = useState<Community[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [researchersRes, communitiesRes] = await Promise.all([
          fetch('/api/researchers'),
          fetch('/api/communities'),
        ])
        const [researchersData, communitiesData] = await Promise.all([
          researchersRes.json(),
          communitiesRes.json(),
        ])
        setResearchers(researchersData)
        setCommunities(communitiesData)
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the Cybrarian admin panel</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading dashboard data...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 space-y-2">
            <p className="text-sm text-muted-foreground">Total Researchers</p>
            <p className="text-4xl font-bold text-primary">{researchers.length}</p>
          </Card>
          <Card className="p-6 space-y-2">
            <p className="text-sm text-muted-foreground">Total Communities</p>
            <p className="text-4xl font-bold text-secondary">{communities.length}</p>
          </Card>
          <Card className="p-6 space-y-2">
            <p className="text-sm text-muted-foreground">Total Members</p>
            <p className="text-4xl font-bold text-accent">
              {communities.reduce((acc, c) => acc + c.members.length, 0)}
            </p>
          </Card>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Researchers</h2>
          <div className="space-y-3">
            {researchers.slice(0, 3).map(researcher => (
              <div key={researcher.id} className="flex justify-between items-start pb-3 border-b border-border last:border-0">
                <div>
                  <p className="font-medium">{researcher.name}</p>
                  <p className="text-sm text-muted-foreground">{researcher.title}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">{researcher.rating}</p>
                  <p className="text-xs text-muted-foreground">rating</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Communities</h2>
          <div className="space-y-3">
            {communities.slice(0, 3).map(community => (
              <div key={community.id} className="flex justify-between items-start pb-3 border-b border-border last:border-0">
                <div>
                  <p className="font-medium">{community.name}</p>
                  <p className="text-sm text-muted-foreground">{community.members.length} members</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
