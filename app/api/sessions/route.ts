import { NextResponse } from 'next/server'
import { getAllSessions } from '@/lib/server/sessions'

export async function GET() {
  try {
    const sessions = await getAllSessions()
    return NextResponse.json(Array.isArray(sessions) ? sessions : [])
  } catch {
    return NextResponse.json([])
  }
}
