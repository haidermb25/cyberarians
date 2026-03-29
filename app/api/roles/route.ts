import { NextResponse } from 'next/server'
import { getAllRoles, addRole } from '@/lib/server/roles'

export async function GET() {
  try {
    const roles = await getAllRoles()
    return NextResponse.json(roles)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch roles' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newRole = await addRole(body)
    return NextResponse.json(newRole)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create role' }, { status: 500 })
  }
}
