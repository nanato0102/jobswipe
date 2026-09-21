import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const buckets = await prisma.$queryRaw`SELECT * FROM storage.buckets`;
  console.log("Current buckets in DB:", buckets);

  // Check if 'videos' bucket exists
  const existing = await prisma.$queryRaw`SELECT * FROM storage.buckets WHERE id = 'videos'`;
  if (Array.isArray(existing) && existing.length === 0) {
    console.log("Creating 'videos' bucket...");
    await prisma.$executeRaw`
      INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
      VALUES ('videos', 'videos', true, 52428800, ARRAY['video/mp4', 'video/quicktime', 'video/webm', 'video/x-msvideo', 'video/ogg'])
      ON CONFLICT (id) DO UPDATE SET public = true;
    `;
    console.log("Bucket 'videos' created successfully!");
  } else {
    console.log("'videos' bucket already exists.");
  }

  // Also enable public access RLS policies for storage.objects on 'videos' bucket
  try {
    await prisma.$executeRaw`
      CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'videos');
    `;
    console.log("Public SELECT policy created.");
  } catch (e) {
    console.log("SELECT policy note:", e.message);
  }

  try {
    await prisma.$executeRaw`
      CREATE POLICY "Public Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'videos');
    `;
    console.log("Public INSERT policy created.");
  } catch (e) {
    console.log("INSERT policy note:", e.message);
  }

  try {
    await prisma.$executeRaw`
      CREATE POLICY "Public Update" ON storage.objects FOR UPDATE USING (bucket_id = 'videos');
    `;
    console.log("Public UPDATE policy created.");
  } catch (e) {
    console.log("UPDATE policy note:", e.message);
  }

  try {
    await prisma.$executeRaw`
      CREATE POLICY "Public Delete" ON storage.objects FOR DELETE USING (bucket_id = 'videos');
    `;
    console.log("Public DELETE policy created.");
  } catch (e) {
    console.log("DELETE policy note:", e.message);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
