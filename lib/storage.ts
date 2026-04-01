import { supabase } from '@/lib/supabase'

interface UploadImageOptions {
  file: File
  bucket: string
  folder?: string
}

export async function uploadImageToSupabase({
  file,
  bucket,
  folder = 'uploads',
}: UploadImageOptions): Promise<string> {
  const extension = file.name.split('.').pop() || 'jpg'
  const filePath = `${folder}/${Date.now()}-${crypto.randomUUID()}.${extension}`

  const { error } = await supabase.storage.from(bucket).upload(filePath, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type || undefined,
  })

  if (error) {
    throw new Error(error.message)
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath)

  if (!data?.publicUrl) {
    throw new Error('Failed to generate public URL for uploaded image')
  }

  return data.publicUrl
}