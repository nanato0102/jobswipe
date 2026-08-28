import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const likes = await prisma.like.findMany({
      include: {
        student: {
          include: {
            user: { select: { email: true } },
            videos: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ likes });
  } catch (error) {
    console.warn("DB not connected or query error in likes API:", error);
    return NextResponse.json({ likes: [] });
  }
}

export async function POST(req: Request) {
  try {
    const { studentId, companyId } = await req.json();

    if (!studentId) {
      return NextResponse.json({ message: "studentId は必須です。" }, { status: 400 });
    }

    try {
      let targetCompanyId = companyId;
      if (!targetCompanyId) {
        const firstCompany = await prisma.user.findFirst({ where: { userType: "COMPANY" } });
        if (firstCompany) {
          targetCompanyId = firstCompany.id;
        }
      }

      if (targetCompanyId) {
        await prisma.like.upsert({
          where: {
            companyId_studentId: {
              companyId: targetCompanyId,
              studentId,
            },
          },
          update: {},
          create: {
            companyId: targetCompanyId,
            studentId,
          },
        });
      }

      return NextResponse.json({ success: true });
    } catch (dbError) {
      console.warn("Like DB warning:", dbError);
      return NextResponse.json({ success: true, demoMode: true });
    }
  } catch (error) {
    return NextResponse.json({ message: "サーバーエラーが発生しました。" }, { status: 500 });
  }
}
