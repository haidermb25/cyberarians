import 'server-only'
import { supabase } from '@/lib/supabase'
import { getDummySessions } from '@/lib/data/dummy-showcase'
import type { Session } from '@/lib/types/session'

export type { Session } from '@/lib/types/session'

function asBool(v: unknown): boolean {
  if (v === true || v === 'true' || v === 1 || v === '1') return true
  return false
}

function mapRow(row: Record<string, unknown>): Session {
  const startsAt =
    (row.starts_at as string | undefined) ??
    (row.start_time as string | undefined) ??
    (row.session_date as string | undefined) ??
    (row.date as string | undefined) ??
    null

  const endsAt =
    (row.ends_at as string | undefined) ??
    (row.end_time as string | undefined) ??
    null

  const working =
    asBool(row.working) ||
    asBool(row.is_working) ||
    asBool(row.is_live)

  const maxParticipantsRaw = row.max_participants ?? row.maxParticipants
  let maxParticipants: number | null = null
  if (typeof maxParticipantsRaw === 'number' && !Number.isNaN(maxParticipantsRaw)) {
    maxParticipants = maxParticipantsRaw
  } else if (typeof maxParticipantsRaw === 'string' && maxParticipantsRaw.trim() !== '') {
    const n = Number(maxParticipantsRaw)
    maxParticipants = Number.isNaN(n) ? null : n
  }

  return {
    id: String(row.id ?? ''),
    name: String(row.name ?? row.title ?? 'Untitled session'),
    description: row.description != null ? String(row.description) : null,
    startsAt,
    endsAt,
    working,
    location: row.location != null ? String(row.location) : null,
    format: row.format != null ? String(row.format) : null,
    facilitator: row.facilitator != null ? String(row.facilitator) : null,
    maxParticipants,
    sessionType:
      row.session_type != null
        ? String(row.session_type)
        : row.type != null
          ? String(row.type)
          : null,
  }
}

function sessionToRow(p: Omit<Session, 'id'>): Record<string, unknown> {
  return {
    name: p.name,
    description: p.description,
    starts_at: p.startsAt,
    ends_at: p.endsAt,
    working: p.working,
    location: p.location,
    format: p.format ?? 'online',
    facilitator: p.facilitator,
    max_participants: p.maxParticipants,
    session_type: p.sessionType,
  }
}

export async function getAllSessions(options?: { fillDemoWhenEmpty?: boolean }): Promise<Session[]> {
  const fillDemo = options?.fillDemoWhenEmpty !== false
  try {
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .order('starts_at', { ascending: true })

    if (error) {
      console.error('Error fetching sessions:', error)
      return fillDemo ? getDummySessions() : []
    }

    if (!data?.length) return fillDemo ? getDummySessions() : []

    return data.map((row) => mapRow(row as Record<string, unknown>))
  } catch (e) {
    console.error('Error fetching sessions:', e)
    return fillDemo ? getDummySessions() : []
  }
}

export async function getSessionById(id: string): Promise<Session | null> {
  try {
    const { data, error } = await supabase.from('sessions').select('*').eq('id', id).maybeSingle()
    if (error || !data) return null
    return mapRow(data as Record<string, unknown>)
  } catch {
    return null
  }
}

export async function addSession(payload: Omit<Session, 'id'>): Promise<Session> {
  const { data, error } = await supabase.from('sessions').insert([sessionToRow(payload)]).select().single()
  if (error) throw error
  return mapRow(data as Record<string, unknown>)
}

export async function updateSession(id: string, updates: Partial<Session>): Promise<Session | null> {
  const row: Record<string, unknown> = {}
  if (updates.name !== undefined) row.name = updates.name
  if (updates.description !== undefined) row.description = updates.description
  if (updates.startsAt !== undefined) row.starts_at = updates.startsAt
  if (updates.endsAt !== undefined) row.ends_at = updates.endsAt
  if (updates.working !== undefined) row.working = updates.working
  if (updates.location !== undefined) row.location = updates.location
  if (updates.format !== undefined) row.format = updates.format
  if (updates.facilitator !== undefined) row.facilitator = updates.facilitator
  if (updates.maxParticipants !== undefined) row.max_participants = updates.maxParticipants
  if (updates.sessionType !== undefined) row.session_type = updates.sessionType

  const { data, error } = await supabase.from('sessions').update(row).eq('id', id).select().single()
  if (error) return null
  return mapRow(data as Record<string, unknown>)
}

export async function deleteSession(id: string): Promise<boolean> {
  const { error } = await supabase.from('sessions').delete().eq('id', id)
  return !error
}
