import { SignJWT, jwtVerify } from 'jose'

const JWT_ISS = 'cybrarian-admin'
const JWT_AUD = 'admin-dashboard'

function getSecretKey(): Uint8Array {
  const s = process.env.ADMIN_JWT_SECRET?.trim()
  if (s && s.length >= 16) {
    return new TextEncoder().encode(s)
  }
  if (process.env.NODE_ENV === 'production') {
    console.error(
      '[auth] ADMIN_JWT_SECRET must be set in production (min 16 characters). Admin login will fail.',
    )
    return new TextEncoder().encode('__invalid_production_admin_jwt_secret__')
  }
  return new TextEncoder().encode('dev-only-admin-jwt-secret-32chars!')
}

export async function signAdminSessionJwt(): Promise<string> {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer(JWT_ISS)
    .setAudience(JWT_AUD)
    .setSubject('admin')
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(getSecretKey())
}

/** Returns true if the JWT is valid, signed, unexpired, and scoped to admin. */
export async function verifyAdminSessionJwt(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey(), {
      issuer: JWT_ISS,
      audience: JWT_AUD,
    })
    return payload.role === 'admin' && payload.sub === 'admin'
  } catch {
    return false
  }
}
