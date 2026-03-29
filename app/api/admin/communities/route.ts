import { NextResponse, NextRequest } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

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

const COMMUNITIES_FILE = path.join(process.cwd(), 'data', 'communities.json')

async function readCommunities(): Promise<Community[]> {
  try {
    const data = await fs.readFile(COMMUNITIES_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading communities:', error)
    return []
  }
}

async function writeCommunities(data: Community[]): Promise<void> {
  try {
    await fs.writeFile(COMMUNITIES_FILE, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Error writing communities:', error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const communities = await readCommunities()
    const newCommunity: Community = {
      ...body,
      id: String(Math.max(...communities.map(c => parseInt(c.id)), 0) + 1),
    }
    await writeCommunities([...communities, newCommunity])
    return NextResponse.json(newCommunity, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create community' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, updates } = await request.json()
    const communities = await readCommunities()
    const index = communities.findIndex(c => c.id === id)

    if (index === -1) {
      return NextResponse.json({ error: 'Community not found' }, { status: 404 })
    }

    const updated = { ...communities[index], ...updates }
    communities[index] = updated
    await writeCommunities(communities)
    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update community' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    const communities = await readCommunities()
    const filtered = communities.filter(c => c.id !== id)

    if (filtered.length === communities.length) {
      return NextResponse.json({ error: 'Community not found' }, { status: 404 })
    }

    await writeCommunities(filtered)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete community' }, { status: 500 })
  }
}
