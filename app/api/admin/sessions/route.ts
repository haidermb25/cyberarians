import { NextRequest, NextResponse } from 'next/server'
import {
  addSession,
  deleteSession,
  getSessionById,
  getAllSessions,
  updateSession,
  type Session,
} from '@/lib/server/sessions'

function detail(error: unknown): string | undefined {
  if (process.env.NODE_ENV !== 'development') return undefined
  return error instanceof Error ? error.message : String(error)
}

export async function GET() {
  try {
    const sessions = await getAllSessions({ fillDemoWhenEmpty: false })
    return NextResponse.json(sessions)
  } catch (e) {
    return NextResponse.json({ error: 'Failed to load sessions', detail: detail(e) }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Omit<Session, 'id'>
    if (!body?.name?.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }
    const created = await addSession({
      name: body.name,
      description: body.description ?? null,
      startsAt: body.startsAt ?? null,
      endsAt: body.endsAt ?? null,
      working: Boolean(body.working),
      location: body.location ?? null,
      format: body.format ?? 'online',
      facilitator: body.facilitator ?? null,
      maxParticipants:
        body.maxParticipants === undefined || body.maxParticipants === null
          ? null
          : Number(body.maxParticipants),
      sessionType: body.sessionType ?? null,
    })
    return NextResponse.json(created, { status: 201 })
  } catch (e) {
    return NextResponse.json(
      { error: 'Failed to create session', detail: detail(e) },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, updates } = (await request.json()) as { id: string; updates: Partial<Session> }
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    const existing = await getSessionById(id)
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    const updated = await updateSession(id, updates)
    if (!updated) return NextResponse.json({ error: 'Update failed' }, { status: 500 })
    return NextResponse.json(updated)
  } catch (e) {
    return NextResponse.json(
      { error: 'Failed to update session', detail: detail(e) },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = (await request.json()) as { id: string }
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    const existing = await getSessionById(id)
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    const ok = await deleteSession(id)
    if (!ok) return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json(
      { error: 'Failed to delete session', detail: detail(e) },
      { status: 500 },
    )
  }
}
