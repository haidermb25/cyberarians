-- Supabase Storage setup for researcher/community image uploads
-- Run this in Supabase SQL Editor

-- 1) Ensure public buckets exist with 5MB limit and image mime types
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  (
    'researchers',
    'researchers',
    true,
    5242880,
    array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  ),
  (
    'communities',
    'communities',
    true,
    5242880,
    array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  )
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- 2) Reset policies so script is re-runnable
-- Public read
DROP POLICY IF EXISTS "Public read researcher/community images" ON storage.objects;
-- Anonymous upload/update/delete used by client-side uploads
DROP POLICY IF EXISTS "Anon upload researcher/community images" ON storage.objects;
DROP POLICY IF EXISTS "Anon update researcher/community images" ON storage.objects;
DROP POLICY IF EXISTS "Anon delete researcher/community images" ON storage.objects;

-- 3) Allow anyone to read uploaded images (public bucket behavior)
CREATE POLICY "Public read researcher/community images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id IN ('researchers', 'communities'));

-- 4) Allow anon uploads only to expected folders
CREATE POLICY "Anon upload researcher/community images"
ON storage.objects
FOR INSERT
TO anon
WITH CHECK (
  bucket_id IN ('researchers', 'communities')
  AND (
    (bucket_id = 'researchers' AND (storage.foldername(name))[1] = 'profile-images')
    OR
    (bucket_id = 'communities' AND (storage.foldername(name))[1] = 'community-logos')
  )
);

-- 5) Optional client-side replace/remove support
CREATE POLICY "Anon update researcher/community images"
ON storage.objects
FOR UPDATE
TO anon
USING (bucket_id IN ('researchers', 'communities'))
WITH CHECK (bucket_id IN ('researchers', 'communities'));

CREATE POLICY "Anon delete researcher/community images"
ON storage.objects
FOR DELETE
TO anon
USING (bucket_id IN ('researchers', 'communities'));

-- 6) Optional: add path columns to track storage object path separately from public URL
ALTER TABLE public.researchers
  ADD COLUMN IF NOT EXISTS image_path text;

ALTER TABLE public.communities
  ADD COLUMN IF NOT EXISTS logo_path text;
