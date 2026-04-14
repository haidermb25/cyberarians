export type AdminImageUploadKind = 'researcher' | 'community'

export async function uploadAdminImage(
  file: File,
  kind: AdminImageUploadKind
): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('kind', kind)

  const response = await fetch('/api/admin/upload-image', {
    method: 'POST',
    body: formData,
    credentials: 'include',
  })

  const data = (await response.json().catch(() => ({}))) as {
    url?: string
    error?: string
  }

  if (!response.ok) {
    throw new Error(data.error || 'Failed to upload image')
  }

  if (!data.url) {
    throw new Error('No image URL returned')
  }

  return data.url
}
