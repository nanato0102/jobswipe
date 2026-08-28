import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sanitizeString } from "@/lib/sanitizer";

export async function GET() {
  try {
    const offers = await prisma.offer.findMany({
      include: {
        company: {
          include: { companyProfile: true },
        },
        student: {
          include: { studentProfile: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ offers });
  } catch (error) {
    console.warn("DB not connected or query error in offers API:", error);
    return NextResponse.json({ offers: [] });
  }
}

export async function POST(req: Request) {
  try {
    const { studentId, message, companyId } = await req.json();

    if (!studentId || !message) {
      return NextResponse.json({ message: "必須項目が不足しています。" }, { status: 400 });
    }

    try {
      let targetCompanyId = companyId;
      if (!targetCompanyId) {
        const firstCompany = await prisma.user.findFirst({ where: { userType: "COMPANY" } });
        if (firstCompany) {
          targetCompanyId = firstCompany.id;
        }
      }

      // studentIdがStudentProfile.idの場合はUser.idを解決
      let targetStudentUserId = studentId;
      const studentProfile = await prisma.studentProfile.findUnique({
        where: { id: studentId },
      });
      if (studentProfile) {
        targetStudentUserId = studentProfile.userId;
      }

      if (targetCompanyId && targetStudentUserId) {
        const offer = await prisma.offer.create({
          data: {
            companyId: targetCompanyId,
            studentId: targetStudentUserId,
            message: sanitizeString(message),
            status: "SENT",
          },
        });
        return NextResponse.json({ success: true, offer });
      }

      return NextResponse.json({ success: true, demoMode: true });
    } catch (dbError) {
      console.warn("Offer DB warning:", dbError);
      return NextResponse.json({ success: true, demoMode: true });
    }
  } catch (error) {
    return NextResponse.json({ message: "サーバーエラーが発生しました。" }, { status: 500 });
  }
}
