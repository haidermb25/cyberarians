import { NextResponse } from 'next/server'
import { getPersonById, updatePerson, deletePerson } from '@/lib/server/people'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const person = await getPersonById(id)
    
    if (!person) {
      return NextResponse.json({ error: 'Person not found' }, { status: 404 })
    }
    
    return NextResponse.json(person)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch person' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const updatedPerson = await updatePerson(id, body)
    
    if (!updatedPerson) {
      return NextResponse.json({ error: 'Person not found' }, { status: 404 })
    }
    
    return NextResponse.json(updatedPerson)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update person' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const success = await deletePerson(id)
    
    if (!success) {
      return NextResponse.json({ error: 'Person not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete person' }, { status: 500 })
  }
}
