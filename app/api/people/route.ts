import { NextResponse } from 'next/server'
import { getAllPeople, addPerson } from '@/lib/server/people'

export async function GET() {
  try {
    const people = await getAllPeople()
    return NextResponse.json(people)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch people' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newPerson = await addPerson(body)
    return NextResponse.json(newPerson)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create person' }, { status: 500 })
  }
}
