import { NextResponse } from "next/server";
import { uploadVideoFile } from "@/lib/storage";
import { sanitizeString } from "@/lib/sanitizer";
import { prisma } from "@/lib/prisma";

export const maxDuration = 60; // Next.js API route maximum execution duration for video upload

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("video") as File | null;
    const title = (formData.get("title") as string) || "自己PR動画";
    const description = (formData.get("description") as string) || "";
    const tags = (formData.get("tags") as string) || "";
    const studentId = (formData.get("studentId") as string) || "";

    if (!file) {
      return NextResponse.json(
        { error: "動画ファイルが見つかりません。ファイルを選択してください。" },
        { status: 400 }
      );
    }

    // MIMEタイプバリデーション
    const allowedTypes = ["video/mp4", "video/quicktime", "video/webm", "video/x-msvideo", "video/ogg", "video/mpeg"];
    if (!allowedTypes.includes(file.type) && !file.type.startsWith("video/")) {
      return NextResponse.json(
        { error: "対応していないファイル形式です。MP4, MOV, WebM形式の動画をアップロードしてください。" },
        { status: 400 }
      );
    }

    // サイズ上限バリデーション (50MB)
    const MAX_SIZE = 50 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "動画ファイルサイズが上限（50MB）を超えています。圧縮するか60秒以内の短尺動画を選択してください。" },
        { status: 400 }
      );
    }

    // ArrayBuffer -> Buffer 変換
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Supabase Storage にアップロード
    const uploadResult = await uploadVideoFile(buffer, file.name, file.type);

    if (!uploadResult.success || !uploadResult.videoUrl) {
      return NextResponse.json(
        { error: uploadResult.error || "ストレージへの動画アップロードに失敗しました。" },
        { status: 500 }
      );
    }

    const videoUrl = uploadResult.videoUrl;

    // Prisma DB への動画レコード登録
    let savedVideo = null;
    try {
      let targetProfile = null;
      if (studentId) {
        targetProfile = await prisma.studentProfile.findFirst({
          where: {
            OR: [
              { id: studentId },
              { userId: studentId },
              { user: { email: studentId } },
            ],
          },
        });
      }

      if (!targetProfile) {
        targetProfile = await prisma.studentProfile.findFirst();
      }

      if (!targetProfile) {
        // 新規デモ学生作成
        const dummyUser = await prisma.user.create({
          data: {
            email: `student_${Date.now()}@jobswipe.jp`,
            password: "hashed_dummy_password",
            userType: "STUDENT",
            studentProfile: {
              create: {
                fullName: "学生ユーザー",
                university: "大学情報",
                graduationYear: 2027,
              },
            },
          },
          include: { studentProfile: true },
        });
        targetProfile = dummyUser.studentProfile;
      }

      if (targetProfile) {
        savedVideo = await prisma.video.create({
          data: {
            studentId: targetProfile.id,
            title: sanitizeString(title),
            description: sanitizeString(description),
            tags: sanitizeString(tags),
            videoUrl: sanitizeString(videoUrl),
          },
          include: {
            student: {
              include: {
                user: { select: { id: true, email: true } },
              },
            },
          },
        });
      }
    } catch (dbErr) {
      console.warn("Prisma DB save error during upload:", dbErr);
    }

    return NextResponse.json({
      success: true,
      videoUrl,
      key: uploadResult.key,
      title: sanitizeString(title),
      description: sanitizeString(description),
      tags: sanitizeString(tags),
      video: savedVideo || {
        id: "vid_" + Date.now(),
        title,
        description,
        tags,
        videoUrl,
        uploadedAt: new Date().toISOString(),
      },
      message: "自己PR動画のクラウド保存が完了しました。",
    });
  } catch (error: any) {
    console.error("Video upload error:", error);
    return NextResponse.json(
      { error: error?.message || "動画のアップロード処理中に予期せぬエラーが発生しました。" },
      { status: 500 }
    );
  }
}
