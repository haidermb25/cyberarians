import 'server-only'
import { supabase } from '@/lib/supabase'
import { DUMMY_PRODUCTS } from '@/lib/data/dummy-showcase'
import type { Product } from '@/lib/types/product'

export type { Product } from '@/lib/types/product'

function parseFeatures(row: Record<string, unknown>): string[] {
  const raw = row.features ?? row.highlights ?? row.bullet_points ?? row.items
  if (Array.isArray(raw)) {
    return raw.map((x) => String(x).trim()).filter(Boolean)
  }
  if (typeof raw === 'string') {
    const s = raw.trim()
    if (!s) return []
    try {
      const parsed = JSON.parse(s) as unknown
      if (Array.isArray(parsed)) {
        return parsed.map((x) => String(x).trim()).filter(Boolean)
      }
    } catch {
      /* fall through */
    }
    return s
      .split(/\r?\n|;|•/)
      .map((x) => x.trim())
      .filter(Boolean)
  }
  return []
}

function mapRow(row: Record<string, unknown>): Product {
  const featured =
    row.featured === true ||
    row.is_featured === true ||
    row.featured === 'true' ||
    row.is_featured === 'true'

  const iconRaw = row.icon ?? row.icon_key ?? row.icon_name
  const icon = iconRaw != null ? String(iconRaw).trim().toLowerCase() : null

  return {
    id: String(row.id ?? ''),
    name: String(row.name ?? row.title ?? 'Product'),
    description: row.description != null ? String(row.description) : null,
    features: parseFeatures(row),
    icon: icon || null,
    featured,
  }
}

function productToInsert(p: Omit<Product, 'id'>): Record<string, unknown> {
  return {
    name: p.name,
    description: p.description,
    features: p.features ?? [],
    icon: p.icon,
    featured: p.featured,
  }
}

export async function getAllProducts(options?: { fillDemoWhenEmpty?: boolean }): Promise<Product[]> {
  const fillDemo = options?.fillDemoWhenEmpty !== false
  try {
    const { data, error } = await supabase.from('products').select('*')

    if (error) {
      console.error('Error fetching products:', error)
      return fillDemo ? DUMMY_PRODUCTS : []
    }

    if (!data?.length) return fillDemo ? DUMMY_PRODUCTS : []

    const withSort = data.map((row) => {
      const r = row as Record<string, unknown>
      const raw = r.sort_order
      const n = typeof raw === 'number' ? raw : Number(raw)
      const sort = Number.isFinite(n) ? n : 9999
      return { sort, product: mapRow(r) }
    })
    withSort.sort((a, b) => {
      if (a.sort !== b.sort) return a.sort - b.sort
      return a.product.name.localeCompare(b.product.name)
    })
    return withSort.map((x) => x.product)
  } catch (e) {
    console.error('Error fetching products:', e)
    return fillDemo ? DUMMY_PRODUCTS : []
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase.from('products').select('*').eq('id', id).maybeSingle()
    if (error || !data) return null
    return mapRow(data as Record<string, unknown>)
  } catch {
    return null
  }
}

export async function addProduct(payload: Omit<Product, 'id'>): Promise<Product> {
  const { data, error } = await supabase.from('products').insert([productToInsert(payload)]).select().single()
  if (error) throw error
  return mapRow(data as Record<string, unknown>)
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  const row: Record<string, unknown> = {}
  if (updates.name !== undefined) row.name = updates.name
  if (updates.description !== undefined) row.description = updates.description
  if (updates.features !== undefined) row.features = updates.features
  if (updates.icon !== undefined) row.icon = updates.icon
  if (updates.featured !== undefined) row.featured = updates.featured

  const { data, error } = await supabase.from('products').update(row).eq('id', id).select().single()
  if (error) return null
  return mapRow(data as Record<string, unknown>)
}

export async function deleteProduct(id: string): Promise<boolean> {
  const { error } = await supabase.from('products').delete().eq('id', id)
  return !error
}
