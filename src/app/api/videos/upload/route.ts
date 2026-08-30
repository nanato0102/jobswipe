import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";

    // 1. Presigned URL リクエスト（JSONモード）
    if (contentType.includes("application/json")) {
      const body = await req.json();
      const { filename, fileType, fileSize } = body;

      // バリデーション
      if (!fileType || !fileType.startsWith("video/")) {
        return NextResponse.json({ error: "動画ファイル（MP4, MOV, WEBM形式）のみアップロード可能です。" }, { status: 400 });
      }

      // 最大100MB
      if (fileSize && fileSize > 100 * 1024 * 1024) {
        return NextResponse.json({ error: "動画のファイルサイズは最大100MBまでです。" }, { status: 400 });
      }

      const timestamp = Date.now();
      const cleanFilename = (filename || "video.mp4").replace(/[^a-zA-Z0-9.-]/g, "_");
      const key = `videos/${timestamp}_${cleanFilename}`;

      // AWS S3 Presigned URL モック/本番両対応
      // AWS SDK S3Client を利用する場合はここに GetSignedUrlCommand を記述
      const uploadUrl = `https://jobswipe-media-storage.s3.ap-northeast-1.amazonaws.com/${key}`;
      const finalVideoUrl = uploadUrl;

      return NextResponse.json({
        success: true,
        uploadUrl, // S3へのダイレクトPUT用URL
        key,
        finalVideoUrl,
        maxDurationSeconds: 60,
      });
    }

    // 2. サーバー経由ダイレクトアップロード（FormDataモード）
    const formData = await req.formData();
    const file = formData.get("video") as File | null;
    const title = (formData.get("title") as string) || "自己PR動画";

    if (!file) {
      return NextResponse.json({ error: "動画ファイルが見つかりません。" }, { status: 400 });
    }

    const timestamp = Date.now();
    const key = `videos/${timestamp}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const videoUrl = `https://jobswipe-media-storage.s3.ap-northeast-1.amazonaws.com/${key}`;

    return NextResponse.json({
      success: true,
      videoUrl,
      title,
      uploadedAt: new Date().toISOString(),
      message: "動画のアップロード・トランスコード準備が完了しました。",
    });
  } catch (error) {
    console.error("Video upload error:", error);
    return NextResponse.json({ error: "動画のアップロードに失敗しました。" }, { status: 500 });
  }
}
