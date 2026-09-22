import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sanitizeString } from "@/lib/sanitizer";
import { sendOfferReceivedEmail, sendOfferAcceptedEmail } from "@/lib/mail";

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
      let companyUser = null;
      if (targetCompanyId) {
        companyUser = await prisma.user.findUnique({
          where: { id: targetCompanyId },
          include: { companyProfile: true },
        });
      } else {
        companyUser = await prisma.user.findFirst({
          where: { userType: "COMPANY" },
          include: { companyProfile: true },
        });
        if (companyUser) {
          targetCompanyId = companyUser.id;
        }
      }

      // studentIdがStudentProfile.idの場合はUser.idを解決
      let targetStudentUserId = studentId;
      let studentProfile = await prisma.studentProfile.findFirst({
        where: {
          OR: [
            { id: studentId },
            { userId: studentId },
          ],
        },
        include: { user: true },
      });

      if (studentProfile) {
        targetStudentUserId = studentProfile.userId;
      }

      if (targetCompanyId && targetStudentUserId) {
        const sanitizedMsg = sanitizeString(message);
        const offer = await prisma.offer.create({
          data: {
            companyId: targetCompanyId,
            studentId: targetStudentUserId,
            message: sanitizedMsg,
            status: "SENT",
          },
        });

        // 学生宛てスカウト通知メールの非同期送信
        const studentEmail = studentProfile?.user?.email;
        const studentName = studentProfile?.fullName || "学生ユーザー";
        const companyName = companyUser?.companyProfile?.companyName || "優良企業";

        if (studentEmail) {
          sendOfferReceivedEmail({
            studentName,
            studentEmail,
            companyName,
            offerMessage: sanitizedMsg,
          }).catch((err) => console.warn("Failed to send offer received email:", err));
        }

        return NextResponse.json({ success: true, offer });
      }

      return NextResponse.json({ success: true, demoMode: true });
    } catch (dbError) {
      console.warn("Offer DB warning:", dbError);
      return NextResponse.json({ success: true, demoMode: true });
    }
  } catch (error) {
    console.error("Offer POST error:", error);
    return NextResponse.json({ message: "サーバーエラーが発生しました。" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { offerId, status } = await req.json();

    if (!offerId || !status) {
      return NextResponse.json({ message: "offerId と status は必須です。" }, { status: 400 });
    }

    if (!["SENT", "ACCEPTED", "DECLINED"].includes(status)) {
      return NextResponse.json({ message: "無効なステータスです。" }, { status: 400 });
    }

    try {
      const existingOffer = await prisma.offer.findUnique({
        where: { id: offerId },
        include: {
          company: {
            include: { companyProfile: true },
          },
          student: {
            include: { studentProfile: true },
          },
        },
      });

      if (existingOffer) {
        const updatedOffer = await prisma.offer.update({
          where: { id: offerId },
          data: { status },
        });

        // オファー承諾時の企業宛て通知メール送信
        if (status === "ACCEPTED") {
          const companyEmail = existingOffer.company?.email;
          const companyName = existingOffer.company?.companyProfile?.companyName || "企業ご担当者";
          const studentName = existingOffer.student?.studentProfile?.fullName || "候補者";
          const studentUniversity = existingOffer.student?.studentProfile?.university || undefined;

          if (companyEmail) {
            sendOfferAcceptedEmail({
              companyName,
              companyEmail,
              studentName,
              studentUniversity,
            }).catch((err) => console.warn("Failed to send offer accepted email:", err));
          }
        }

        return NextResponse.json({ success: true, offer: updatedOffer });
      }

      return NextResponse.json({ success: true, demoMode: true, status });
    } catch (dbError) {
      console.warn("Offer PATCH DB warning:", dbError);
      return NextResponse.json({ success: true, demoMode: true, status });
    }
  } catch (error) {
    console.error("Offer PATCH error:", error);
    return NextResponse.json({ message: "サーバーエラーが発生しました。" }, { status: 500 });
  }
}
