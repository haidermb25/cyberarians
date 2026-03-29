import { NextResponse } from 'next/server'
import { getCommunityById } from '@/lib/server/communities'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const community = await getCommunityById(id)
    
    if (!community) {
      return NextResponse.json({ error: 'Community not found' }, { status: 404 })
    }
    
    return NextResponse.json(community)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch community' }, { status: 500 })
  }
}
