import { NextResponse } from 'next/server'
import { getRoleById, updateRole, deleteRole } from '@/lib/server/roles'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const role = await getRoleById(id)
    
    if (!role) {
      return NextResponse.json({ error: 'Role not found' }, { status: 404 })
    }
    
    return NextResponse.json(role)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch role' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const updatedRole = await updateRole(id, body)
    
    if (!updatedRole) {
      return NextResponse.json({ error: 'Role not found' }, { status: 404 })
    }
    
    return NextResponse.json(updatedRole)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update role' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const success = await deleteRole(id)
    
    if (!success) {
      return NextResponse.json({ error: 'Role not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete role' }, { status: 500 })
  }
}
