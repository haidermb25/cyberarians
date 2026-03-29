import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminPassword, createSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    console.log('[v0] Login attempt - password provided:', !!password)

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      )
    }

    const isValid = await verifyAdminPassword(password)
    console.log('[v0] Password validation result:', isValid, 'Expected password:', process.env.ADMIN_PASSWORD || 'admin123')
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }

    await createSession()
    console.log('[v0] Session created successfully')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[v0] Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
