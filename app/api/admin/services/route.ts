import { NextRequest, NextResponse } from 'next/server'
import {
  addServiceOffering,
  deleteServiceOffering,
  getServiceOfferingById,
  getAllServiceOfferingsFromDb,
  updateServiceOffering,
  type ServiceOffering,
} from '@/lib/server/service-offerings'

function detail(error: unknown): string | undefined {
  if (process.env.NODE_ENV !== 'development') return undefined
  return error instanceof Error ? error.message : String(error)
}

export async function GET() {
  try {
    const services = await getAllServiceOfferingsFromDb()
    return NextResponse.json(services)
  } catch (e) {
    return NextResponse.json({ error: 'Failed to load services', detail: detail(e) }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Omit<ServiceOffering, 'id'> & { id?: string }
    if (!body?.title?.trim()) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }
    const created = await addServiceOffering({
      title: body.title,
      description: body.description ?? '',
      highlights: Array.isArray(body.highlights) ? body.highlights : [],
      featured: Boolean(body.featured),
      id: body.id,
    })
    return NextResponse.json(created, { status: 201 })
  } catch (e) {
    return NextResponse.json(
      { error: 'Failed to create service', detail: detail(e) },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, updates } = (await request.json()) as { id: string; updates: Partial<ServiceOffering> }
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    const existing = await getServiceOfferingById(id)
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    const updated = await updateServiceOffering(id, updates)
    if (!updated) return NextResponse.json({ error: 'Update failed' }, { status: 500 })
    return NextResponse.json(updated)
  } catch (e) {
    return NextResponse.json(
      { error: 'Failed to update service', detail: detail(e) },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = (await request.json()) as { id: string }
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    const existing = await getServiceOfferingById(id)
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    const ok = await deleteServiceOffering(id)
    if (!ok) return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json(
      { error: 'Failed to delete service', detail: detail(e) },
      { status: 500 },
    )
  }
}
