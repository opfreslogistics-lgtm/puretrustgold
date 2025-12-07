-- PureTrust Gold Storage Buckets
-- Run this in your Supabase SQL Editor

-- Create appointment-photos bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'appointment-photos',
  'appointment-photos',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Create chat-files bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'chat-files',
  'chat-files',
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf', 'text/plain']
)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for appointment-photos (allow public read, authenticated upload)
CREATE POLICY "Public read access for appointment-photos" ON storage.objects
  FOR SELECT USING (bucket_id = 'appointment-photos');

CREATE POLICY "Authenticated upload for appointment-photos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'appointment-photos');

-- Storage policies for chat-files (allow public read, authenticated upload)
CREATE POLICY "Public read access for chat-files" ON storage.objects
  FOR SELECT USING (bucket_id = 'chat-files');

CREATE POLICY "Authenticated upload for chat-files" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'chat-files');


