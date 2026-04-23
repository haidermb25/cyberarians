import { NextRequest, NextResponse } from 'next/server'
import {
  addProduct,
  deleteProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  type Product,
} from '@/lib/server/products'

function detail(error: unknown): string | undefined {
  if (process.env.NODE_ENV !== 'development') return undefined
  return error instanceof Error ? error.message : String(error)
}

export async function GET() {
  try {
    const products = await getAllProducts({ fillDemoWhenEmpty: false })
    return NextResponse.json(products)
  } catch (e) {
    return NextResponse.json({ error: 'Failed to load products', detail: detail(e) }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Omit<Product, 'id'>
    if (!body?.name?.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }
    const created = await addProduct({
      name: body.name,
      description: body.description ?? null,
      features: Array.isArray(body.features) ? body.features : [],
      icon: body.icon ?? null,
      featured: Boolean(body.featured),
    })
    return NextResponse.json(created, { status: 201 })
  } catch (e) {
    return NextResponse.json(
      { error: 'Failed to create product', detail: detail(e) },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, updates } = (await request.json()) as { id: string; updates: Partial<Product> }
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    const existing = await getProductById(id)
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    const updated = await updateProduct(id, updates)
    if (!updated) return NextResponse.json({ error: 'Update failed' }, { status: 500 })
    return NextResponse.json(updated)
  } catch (e) {
    return NextResponse.json(
      { error: 'Failed to update product', detail: detail(e) },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = (await request.json()) as { id: string }
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    const existing = await getProductById(id)
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    const ok = await deleteProduct(id)
    if (!ok) return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json(
      { error: 'Failed to delete product', detail: detail(e) },
      { status: 500 },
    )
  }
}
