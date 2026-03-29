import { NextResponse } from 'next/server'
import { getResearcherById } from '@/lib/server/researchers'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const researcher = await getResearcherById(id)
    
    if (!researcher) {
      return NextResponse.json({ error: 'Researcher not found' }, { status: 404 })
    }
    
    return NextResponse.json(researcher)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch researcher' }, { status: 500 })
  }
}
