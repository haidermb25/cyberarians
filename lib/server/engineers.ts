import 'server-only'
import { supabase } from '@/lib/supabase'
import { ENGINEERS, type Engineer } from '@/lib/data/engineers'

export type { Engineer } from '@/lib/data/engineers'

function mapRow(row: Record<string, unknown>): Engineer {
  return {
    id: String(row.id),
    name: String(row.name),
    role: String(row.role),
    image: String(row.image),
    location: String(row.location ?? ''),
    experience: String(row.experience ?? ''),
    focus: String(row.focus ?? ''),
    summary: String(row.summary ?? ''),
    skills: Array.isArray(row.skills) ? (row.skills as string[]) : [],
    linkedin: row.linkedin != null ? String(row.linkedin) : undefined,
    github: row.github != null ? String(row.github) : undefined,
    email: row.email != null ? String(row.email) : undefined,
    website: row.website != null ? String(row.website) : undefined,
  }
}

function toInsert(e: Omit<Engineer, 'id'> & { id?: string }): Record<string, unknown> {
  const id =
    e.id?.trim() ||
    e.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  return {
    id,
    name: e.name,
    role: e.role,
    image: e.image,
    location: e.location,
    experience: e.experience,
    focus: e.focus,
    summary: e.summary,
    skills: e.skills ?? [],
    linkedin: e.linkedin ?? null,
    github: e.github ?? null,
    email: e.email ?? null,
    website: e.website ?? null,
    sort_order: 0,
  }
}

export async function getAllEngineers(): Promise<Engineer[]> {
  try {
    const { data, error } = await supabase.from('engineers').select('*').order('sort_order', { ascending: true })
    if (error || !data?.length) return ENGINEERS
    return data.map((r) => mapRow(r as Record<string, unknown>))
  } catch {
    return ENGINEERS
  }
}

/** Admin UI: database rows only (no static fallback). */
export async function getAllEngineersFromDb(): Promise<Engineer[]> {
  try {
    const { data, error } = await supabase.from('engineers').select('*').order('sort_order', { ascending: true })
    if (error) return []
    return (data ?? []).map((r) => mapRow(r as Record<string, unknown>))
  } catch {
    return []
  }
}

export async function getEngineerById(id: string): Promise<Engineer | null> {
  try {
    const { data, error } = await supabase.from('engineers').select('*').eq('id', id).maybeSingle()
    if (error || !data) return null
    return mapRow(data as Record<string, unknown>)
  } catch {
    return null
  }
}

export async function addEngineer(payload: Omit<Engineer, 'id'> & { id?: string }): Promise<Engineer> {
  const { data, error } = await supabase.from('engineers').insert([toInsert(payload)]).select().single()
  if (error) throw error
  return mapRow(data as Record<string, unknown>)
}

export async function updateEngineer(id: string, updates: Partial<Engineer>): Promise<Engineer | null> {
  const row: Record<string, unknown> = {}
  if (updates.name !== undefined) row.name = updates.name
  if (updates.role !== undefined) row.role = updates.role
  if (updates.image !== undefined) row.image = updates.image
  if (updates.location !== undefined) row.location = updates.location
  if (updates.experience !== undefined) row.experience = updates.experience
  if (updates.focus !== undefined) row.focus = updates.focus
  if (updates.summary !== undefined) row.summary = updates.summary
  if (updates.skills !== undefined) row.skills = updates.skills
  if (updates.linkedin !== undefined) row.linkedin = updates.linkedin
  if (updates.github !== undefined) row.github = updates.github
  if (updates.email !== undefined) row.email = updates.email
  if (updates.website !== undefined) row.website = updates.website

  const { data, error } = await supabase.from('engineers').update(row).eq('id', id).select().single()
  if (error) return null
  return mapRow(data as Record<string, unknown>)
}

export async function deleteEngineer(id: string): Promise<boolean> {
  const { error } = await supabase.from('engineers').delete().eq('id', id)
  return !error
}
