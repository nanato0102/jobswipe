import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey);

export const STORAGE_BUCKET = "videos";

/**
 * 動画ファイルをSupabase Storageにアップロードし、公開URLを返却する
 */
export async function uploadVideoFile(
  fileBuffer: Buffer | ArrayBuffer | Uint8Array,
  originalFilename: string,
  mimeType: string
): Promise<{ success: boolean; videoUrl?: string; key?: string; error?: string }> {
  try {
    const timestamp = Date.now();
    const cleanFilename = originalFilename.replace(/[^a-zA-Z0-9.-]/g, "_");
    const key = `video_${timestamp}_${cleanFilename}`;

    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(key, fileBuffer, {
        contentType: mimeType || "video/mp4",
        upsert: true,
      });

    if (error) {
      console.error("Supabase storage upload error:", error);
      return { success: false, error: error.message };
    }

    const { data: urlData } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(key);

    return {
      success: true,
      videoUrl: urlData.publicUrl,
      key: data.path,
    };
  } catch (err: any) {
    console.error("Storage upload exception:", err);
    return { success: false, error: err?.message || "動画ストレージへの保存に失敗しました。" };
  }
}

/**
 * 動画の削除
 */
export async function deleteVideoFile(key: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage.from(STORAGE_BUCKET).remove([key]);
    if (error) {
      console.error("Delete video error:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Delete video exception:", err);
    return false;
  }
}
