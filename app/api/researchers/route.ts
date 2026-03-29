import { NextResponse } from 'next/server'
import { getAllResearchers } from '@/lib/server/researchers'

export async function GET() {
  try {
    const researchers = await getAllResearchers()
    return NextResponse.json(Array.isArray(researchers) ? researchers : [])
  } catch {
    // Supabase unreachable (timeout, ENOTFOUND, etc.): return empty list so UI still works
    return NextResponse.json([])
  }
}
