import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sanitizeString } from "@/lib/sanitizer";

export async function GET() {
  try {
    const videos = await prisma.video.findMany({
      include: {
        student: {
          include: {
            user: {
              select: { id: true, email: true },
            },
          },
        },
      },
      orderBy: { uploadedAt: "desc" },
    });

    return NextResponse.json({ videos });
  } catch (error) {
    console.warn("DB not connected or query error in videos API:", error);
    return NextResponse.json({ videos: [] });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, tags, videoUrl, studentId } = body;

    if (!title || !videoUrl) {
      return NextResponse.json(
        { message: "タイトルと動画URLは必須です。" },
        { status: 400 }
      );
    }

    try {
      // 登録処理
      let targetStudentId = studentId;

      if (!targetStudentId) {
        // 先頭のStudentProfileをフォールバックとして検索
        const firstStudent = await prisma.studentProfile.findFirst();
        if (firstStudent) {
          targetStudentId = firstStudent.id;
        } else {
          // デモ用学生作成
          const dummyUser = await prisma.user.create({
            data: {
              email: `student_${Date.now()}@jobswipe.jp`,
              password: "hashed_dummy_password",
              userType: "STUDENT",
              studentProfile: {
                create: {
                  fullName: "デモ学生",
                  university: "サンプル大学",
                  graduationYear: 2026,
                },
              },
            },
            include: { studentProfile: true },
          });
          targetStudentId = dummyUser.studentProfile?.id;
        }
      }

      const newVideo = await prisma.video.create({
        data: {
          studentId: targetStudentId,
          title: sanitizeString(title),
          description: sanitizeString(description),
          tags: sanitizeString(tags),
          videoUrl: sanitizeString(videoUrl),
        },
      });

      return NextResponse.json({ success: true, video: newVideo });
    } catch (dbError) {
      console.warn("DB error on video upload:", dbError);
      return NextResponse.json({
        success: true,
        demoMode: true,
        video: {
          id: "vid-" + Date.now(),
          title,
          description,
          tags,
          videoUrl,
        },
      });
    }
  } catch (error) {
    console.error("Video POST error:", error);
    return NextResponse.json(
      { message: "サーバーエラーが発生しました。" },
      { status: 500 }
    );
  }
}
