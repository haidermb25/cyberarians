import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { isAuthenticated } from '@/lib/auth'

export const runtime = 'nodejs'

const MAX_BYTES = 5 * 1024 * 1024
const ALLOWED = new Set(['image/jpeg', 'image/png', 'image/webp'])

const FOLDERS = {
  researcher: 'cybrarian/profile-images',
  community: 'cybrarian/community-logos',
} as const

function cloudinaryErrorMessage(e: unknown): string {
  if (e instanceof Error) return e.message
  if (typeof e === 'string') return e
  if (e && typeof e === 'object') {
    const o = e as Record<string, unknown>
    if (typeof o.message === 'string') return o.message
    if (typeof o.error === 'string') return o.error
    const nested = o.error
    if (nested && typeof nested === 'object' && typeof (nested as { message?: string }).message === 'string') {
      return (nested as { message: string }).message
    }
  }
  return 'Upload failed'
}

function applyCloudinaryConfig(): { ok: true } | { ok: false; hint: string } {
  const url = process.env.CLOUDINARY_URL?.trim()
  if (url?.toLowerCase().startsWith('cloudinary://')) {
    cloudinary.config(true)
  } else {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim()
    const apiKey = process.env.CLOUDINARY_API_KEY?.trim()
    const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim()
    if (cloudName && apiKey && apiSecret) {
      cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
      })
    } else {
      const missing: string[] = []
      if (!cloudName) missing.push('CLOUDINARY_CLOUD_NAME')
      if (!apiKey) missing.push('CLOUDINARY_API_KEY')
      if (!apiSecret) missing.push('CLOUDINARY_API_SECRET')
      const devHint =
        process.env.NODE_ENV === 'development'
          ? ` Put .env.local next to package.json (not inside app/). Use either CLOUDINARY_URL from the Cloudinary dashboard, or set ${missing.join(', ')}. Restart next dev after saving. On Windows ensure the file is named .env.local not .env.local.txt.`
          : ''
      return { ok: false, hint: devHint }
    }
  }

  const cfg = cloudinary.config() as {
    cloud_name?: string
    api_key?: string
    api_secret?: string
  }
  if (!cfg.cloud_name || !cfg.api_key || !cfg.api_secret) {
    const devHint =
      process.env.NODE_ENV === 'development'
        ? ' CLOUDINARY_URL must look like cloudinary://API_KEY:API_SECRET@CLOUD_NAME (copy from Cloudinary dashboard → API Keys → Environment variable).'
        : ''
    return { ok: false, hint: devHint }
  }

  return { ok: true }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const configured = applyCloudinaryConfig()
  if (!configured.ok) {
    return NextResponse.json(
      { error: `Cloudinary is not configured.${configured.hint}` },
      { status: 500 }
    )
  }

  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
  }

  const kind = formData.get('kind')
  if (kind !== 'researcher' && kind !== 'community') {
    return NextResponse.json({ error: 'Invalid kind' }, { status: 400 })
  }

  const file = formData.get('file')
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'Missing file' }, { status: 400 })
  }

  if (!ALLOWED.has(file.type)) {
    return NextResponse.json(
      { error: 'Only JPG, PNG, and WebP images are allowed' },
      { status: 400 }
    )
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  try {
    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: FOLDERS[kind],
          resource_type: 'image',
        },
        (error, uploadResult) => {
          if (error) reject(error)
          else if (!uploadResult?.secure_url) reject(new Error('No URL returned'))
          else resolve(uploadResult as { secure_url: string })
        }
      )
      uploadStream.end(buffer)
    })

    return NextResponse.json({ url: result.secure_url })
  } catch (e) {
    const message = cloudinaryErrorMessage(e)
    console.error('[upload-image]', e)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
