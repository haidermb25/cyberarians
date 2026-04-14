import { NextResponse, NextRequest } from 'next/server'
import {
  addResearcher,
  updateResearcher,
  deleteResearcher,
  getResearcherById,
  type Researcher,
} from '@/lib/server/researchers'

function supabaseErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  if (error && typeof error === 'object' && 'message' in error) {
    return String((error as { message: unknown }).message)
  }
  return 'Unknown error'
}

/** Strip `id` and pass through fields Supabase expects for insert/update. */
function bodyWithoutId(body: Record<string, unknown>): Omit<Researcher, 'id'> {
  const { id: _id, ...rest } = body
  return rest as Omit<Researcher, 'id'>
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const payload = bodyWithoutId(body)
    const created = await addResearcher(payload)
    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    console.error('POST /api/admin/researchers', error)
    const detail = supabaseErrorMessage(error)
    return NextResponse.json(
      {
        error: 'Failed to create researcher',
        ...(process.env.NODE_ENV === 'development' && { detail }),
      },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, updates } = (await request.json()) as {
      id: string
      updates: Partial<Researcher>
    }

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    }

    const existing = await getResearcherById(id)
    if (!existing) {
      return NextResponse.json({ error: 'Researcher not found' }, { status: 404 })
    }

    const updated = await updateResearcher(id, updates)

    if (!updated) {
      return NextResponse.json({ error: 'Failed to update researcher' }, { status: 500 })
    }

    return NextResponse.json(updated)
  } catch (error) {
    console.error('PUT /api/admin/researchers', error)
    const detail = supabaseErrorMessage(error)
    return NextResponse.json(
      {
        error: 'Failed to update researcher',
        ...(process.env.NODE_ENV === 'development' && { detail }),
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    }

    const existing = await getResearcherById(id)
    if (!existing) {
      return NextResponse.json({ error: 'Researcher not found' }, { status: 404 })
    }

    const ok = await deleteResearcher(id)
    if (!ok) {
      return NextResponse.json({ error: 'Failed to delete researcher' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/admin/researchers', error)
    return NextResponse.json({ error: 'Failed to delete researcher' }, { status: 500 })
  }
}
