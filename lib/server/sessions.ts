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

export async function getAllSessions(): Promise<Session[]> {
  try {
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .order('starts_at', { ascending: true })

    if (error) {
      console.error('Error fetching sessions:', error)
      return getDummySessions()
    }

    if (!data?.length) return getDummySessions()

    return data.map((row) => mapRow(row as Record<string, unknown>))
  } catch (e) {
    console.error('Error fetching sessions:', e)
    return getDummySessions()
  }
}
