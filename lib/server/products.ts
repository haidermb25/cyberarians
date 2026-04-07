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

export async function getAllProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase.from('products').select('*')

    if (error) {
      console.error('Error fetching products:', error)
      return DUMMY_PRODUCTS
    }

    if (!data?.length) return DUMMY_PRODUCTS

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
    return DUMMY_PRODUCTS
  }
}
