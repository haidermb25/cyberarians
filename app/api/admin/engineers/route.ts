import { NextRequest, NextResponse } from 'next/server'
import {
  addEngineer,
  deleteEngineer,
  getEngineerById,
  getAllEngineersFromDb,
  updateEngineer,
  type Engineer,
} from '@/lib/server/engineers'

function detail(error: unknown): string | undefined {
  if (process.env.NODE_ENV !== 'development') return undefined
  return error instanceof Error ? error.message : String(error)
}

export async function GET() {
  try {
    const engineers = await getAllEngineersFromDb()
    return NextResponse.json(engineers)
  } catch (e) {
    return NextResponse.json({ error: 'Failed to load engineers', detail: detail(e) }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Omit<Engineer, 'id'> & { id?: string }
    if (!body?.name?.trim() || !body.role?.trim()) {
      return NextResponse.json({ error: 'Name and role are required' }, { status: 400 })
    }
    const created = await addEngineer(body)
    return NextResponse.json(created, { status: 201 })
  } catch (e) {
    return NextResponse.json(
      { error: 'Failed to create engineer', detail: detail(e) },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, updates } = (await request.json()) as { id: string; updates: Partial<Engineer> }
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    const existing = await getEngineerById(id)
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    const updated = await updateEngineer(id, updates)
    if (!updated) return NextResponse.json({ error: 'Update failed' }, { status: 500 })
    return NextResponse.json(updated)
  } catch (e) {
    return NextResponse.json(
      { error: 'Failed to update engineer', detail: detail(e) },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = (await request.json()) as { id: string }
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    const existing = await getEngineerById(id)
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    const ok = await deleteEngineer(id)
    if (!ok) return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json(
      { error: 'Failed to delete engineer', detail: detail(e) },
      { status: 500 },
    )
  }
}
