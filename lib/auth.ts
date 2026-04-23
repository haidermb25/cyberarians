import { cookies } from 'next/headers'
import { signAdminSessionJwt, verifyAdminSessionJwt } from '@/lib/admin-jwt'

const ADMIN_USERNAME = (process.env.ADMIN_USERNAME || 'admin').trim()
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'
const SESSION_COOKIE_NAME = 'admin_session'
const SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours

export async function verifyAdminPassword(password: string): Promise<boolean> {
  return password === ADMIN_PASSWORD
}

/** Validates both username and password against env (or defaults). */
export async function verifyAdminCredentials(
  username: string,
  password: string,
): Promise<boolean> {
  const u = username.trim()
  const p = password
  if (!u || !p) return false
  return u === ADMIN_USERNAME && p === ADMIN_PASSWORD
}

export async function createSession(): Promise<string> {
  const token = await signAdminSessionJwt()

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000,
    path: '/',
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
  return verifyAdminSessionJwt(session)
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}
