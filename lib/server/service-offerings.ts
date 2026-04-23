import 'server-only'
import { supabase } from '@/lib/supabase'
import {
  SERVICE_OFFERINGS,
  type ServiceOffering,
} from '@/lib/data/services-catalog'

export type { ServiceOffering } from '@/lib/data/services-catalog'

function mapRow(row: Record<string, unknown>): ServiceOffering {
  const highlights = Array.isArray(row.highlights)
    ? (row.highlights as string[])
    : typeof row.highlights === 'string'
      ? (() => {
          try {
            return JSON.parse(row.highlights as string) as string[]
          } catch {
            return []
          }
        })()
      : []

  return {
    id: String(row.id),
    title: String(row.title),
    description: row.description != null ? String(row.description) : '',
    highlights,
    featured:
      row.featured === true ||
      row.featured === 'true' ||
      row.is_featured === true,
  }
}

export async function getAllServiceOfferings(): Promise<ServiceOffering[]> {
  try {
    const { data, error } = await supabase
      .from('service_offerings')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error || !data?.length) return SERVICE_OFFERINGS
    return data.map((r) => mapRow(r as Record<string, unknown>))
  } catch {
    return SERVICE_OFFERINGS
  }
}

/** Admin UI: database rows only. */
export async function getAllServiceOfferingsFromDb(): Promise<ServiceOffering[]> {
  try {
    const { data, error } = await supabase
      .from('service_offerings')
      .select('*')
      .order('sort_order', { ascending: true })
    if (error) return []
    return (data ?? []).map((r) => mapRow(r as Record<string, unknown>))
  } catch {
    return []
  }
}

export async function getServiceOfferingById(id: string): Promise<ServiceOffering | null> {
  try {
    const { data, error } = await supabase.from('service_offerings').select('*').eq('id', id).maybeSingle()
    if (error || !data) return null
    return mapRow(data as Record<string, unknown>)
  } catch {
    return null
  }
}

export async function addServiceOffering(
  payload: Omit<ServiceOffering, 'id'> & { id?: string },
): Promise<ServiceOffering> {
  const id =
    payload.id?.trim() ||
    payload.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

  const { data, error } = await supabase
    .from('service_offerings')
    .insert([
      {
        id,
        title: payload.title,
        description: payload.description,
        highlights: payload.highlights ?? [],
        featured: payload.featured ?? false,
      },
    ])
    .select()
    .single()

  if (error) throw error
  return mapRow(data as Record<string, unknown>)
}

export async function updateServiceOffering(
  id: string,
  updates: Partial<ServiceOffering>,
): Promise<ServiceOffering | null> {
  const row: Record<string, unknown> = {}
  if (updates.title !== undefined) row.title = updates.title
  if (updates.description !== undefined) row.description = updates.description
  if (updates.highlights !== undefined) row.highlights = updates.highlights
  if (updates.featured !== undefined) row.featured = updates.featured

  const { data, error } = await supabase
    .from('service_offerings')
    .update(row)
    .eq('id', id)
    .select()
    .single()

  if (error) return null
  return mapRow(data as Record<string, unknown>)
}

export async function deleteServiceOffering(id: string): Promise<boolean> {
  const { error } = await supabase.from('service_offerings').delete().eq('id', id)
  return !error
}
