import { NextResponse } from 'next/server'
import { getAllServiceOfferings } from '@/lib/server/service-offerings'

export async function GET() {
  try {
    const services = await getAllServiceOfferings()
    return NextResponse.json(services)
  } catch {
    return NextResponse.json([])
  }
}
