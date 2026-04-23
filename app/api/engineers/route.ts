import { NextResponse } from 'next/server'
import { getAllEngineers } from '@/lib/server/engineers'

export async function GET() {
  try {
    const engineers = await getAllEngineers()
    return NextResponse.json(engineers)
  } catch {
    return NextResponse.json([])
  }
}
