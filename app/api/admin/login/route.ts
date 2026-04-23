import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminCredentials, createSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const username = typeof body.username === 'string' ? body.username : ''
    const password = typeof body.password === 'string' ? body.password : ''

    if (!username.trim() || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 },
      )
    }

    const isValid = await verifyAdminCredentials(username, password)

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 },
      )
    }

    await createSession()
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
