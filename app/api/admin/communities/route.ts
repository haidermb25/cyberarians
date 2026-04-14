import { NextResponse, NextRequest } from 'next/server'
import {
  addCommunity,
  updateCommunity,
  deleteCommunity,
  getCommunityById,
  type Community,
} from '@/lib/server/communities'

function supabaseErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  if (error && typeof error === 'object' && 'message' in error) {
    return String((error as { message: unknown }).message)
  }
  return 'Unknown error'
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { id: _omit, ...payload } = body as Record<string, unknown>
    const created = await addCommunity(payload as Omit<Community, 'id'>)
    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    console.error('POST /api/admin/communities', error)
    const detail = supabaseErrorMessage(error)
    return NextResponse.json(
      {
        error: 'Failed to create community',
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
      updates: Partial<Community>
    }

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    }

    const existing = await getCommunityById(id)
    if (!existing) {
      return NextResponse.json({ error: 'Community not found' }, { status: 404 })
    }

    const updated = await updateCommunity(id, updates)

    if (!updated) {
      return NextResponse.json({ error: 'Failed to update community' }, { status: 500 })
    }

    return NextResponse.json(updated)
  } catch (error) {
    console.error('PUT /api/admin/communities', error)
    const detail = supabaseErrorMessage(error)
    return NextResponse.json(
      {
        error: 'Failed to update community',
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

    const existing = await getCommunityById(id)
    if (!existing) {
      return NextResponse.json({ error: 'Community not found' }, { status: 404 })
    }

    const ok = await deleteCommunity(id)
    if (!ok) {
      return NextResponse.json({ error: 'Failed to delete community' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/admin/communities', error)
    return NextResponse.json({ error: 'Failed to delete community' }, { status: 500 })
  }
}
