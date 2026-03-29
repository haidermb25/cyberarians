import { NextResponse, NextRequest } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

interface Researcher {
  id: string
  name: string
  title: string
  expertise: string[]
  rating: number
  bio: string
  image: string
}

const RESEARCHERS_FILE = path.join(process.cwd(), 'data', 'researchers.json')

async function readResearchers(): Promise<Researcher[]> {
  try {
    const data = await fs.readFile(RESEARCHERS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading researchers:', error)
    return []
  }
}

async function writeResearchers(data: Researcher[]): Promise<void> {
  try {
    await fs.writeFile(RESEARCHERS_FILE, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Error writing researchers:', error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const researchers = await readResearchers()
    const newResearcher: Researcher = {
      ...body,
      id: String(Math.max(...researchers.map(r => parseInt(r.id)), 0) + 1),
    }
    await writeResearchers([...researchers, newResearcher])
    return NextResponse.json(newResearcher, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create researcher' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, updates } = await request.json()
    const researchers = await readResearchers()
    const index = researchers.findIndex(r => r.id === id)

    if (index === -1) {
      return NextResponse.json({ error: 'Researcher not found' }, { status: 404 })
    }

    const updated = { ...researchers[index], ...updates }
    researchers[index] = updated
    await writeResearchers(researchers)
    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update researcher' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    const researchers = await readResearchers()
    const filtered = researchers.filter(r => r.id !== id)

    if (filtered.length === researchers.length) {
      return NextResponse.json({ error: 'Researcher not found' }, { status: 404 })
    }

    await writeResearchers(filtered)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete researcher' }, { status: 500 })
  }
}
