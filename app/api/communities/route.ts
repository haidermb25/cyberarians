import { NextResponse } from 'next/server'
import { getAllCommunities } from '@/lib/server/communities'

export async function GET() {
  try {
    const communities = await getAllCommunities()
    return NextResponse.json(Array.isArray(communities) ? communities : [])
  } catch {
    // Supabase unreachable (timeout, ENOTFOUND, etc.): return empty list so UI still works
    return NextResponse.json([])
  }
}
