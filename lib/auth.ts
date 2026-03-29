import { cookies } from 'next/headers'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'
const SESSION_COOKIE_NAME = 'admin_session'
const SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours

export async function verifyAdminPassword(password: string): Promise<boolean> {
  return password === ADMIN_PASSWORD
}

export async function createSession(): Promise<string> {
  const token = Buffer.from(JSON.stringify({
    timestamp: Date.now(),
    nonce: Math.random().toString(36).substring(7)
  })).toString('base64')
  
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000,
  })
  
  return token
}

export async function getSession(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get(SESSION_COOKIE_NAME)?.value || null
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession()
  
  if (!session) return false
  
  try {
    const decoded = JSON.parse(Buffer.from(session, 'base64').toString())
    const sessionAge = Date.now() - decoded.timestamp
    return sessionAge < SESSION_DURATION
  } catch {
    return false
  }
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}
