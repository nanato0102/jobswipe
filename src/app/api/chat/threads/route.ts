import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const role = searchParams.get("role"); // "STUDENT" | "COMPANY"

    if (!userId) {
      return NextResponse.json({ threads: [] });
    }

    const whereClause =
      role === "STUDENT"
        ? { studentId: userId, status: { in: ["ACCEPTED" as const, "SENT" as const] } }
        : role === "COMPANY"
        ? { companyId: userId, status: { in: ["ACCEPTED" as const, "SENT" as const] } }
        : {
            OR: [{ studentId: userId }, { companyId: userId }],
            status: { in: ["ACCEPTED" as const, "SENT" as const] },
          };

    const offers = await prisma.offer.findMany({
      where: whereClause,
      include: {
        company: {
          include: { companyProfile: true },
        },
        student: {
          include: {
            studentProfile: {
              include: { videos: true },
            },
          },
        },
        messages: {
          orderBy: { sentAt: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // スレッド形式に整形
    const formattedThreads = offers.map((offer) => {
      const lastMsg = offer.messages.length > 0 ? offer.messages[offer.messages.length - 1] : null;

      let partnerName = "お相手";
      let partnerSub = "";
      let partnerType: "student" | "company" = "company";
      let avatarUrl = "";
      let tags: string[] = [];

      if (role === "STUDENT") {
        partnerName = offer.company?.companyProfile?.companyName || "企業ご担当者様";
        partnerSub = offer.company?.companyProfile?.industry || "採用担当";
        partnerType = "company";
      } else {
        partnerName = offer.student?.studentProfile?.fullName || "学生候補者";
        partnerSub = `${offer.student?.studentProfile?.university || "大学"} (${offer.student?.studentProfile?.graduationYear || 2027}卒)`;
        partnerType = "student";
        if (offer.student?.studentProfile?.skills) {
          tags = offer.student.studentProfile.skills
            .split(",")
            .map((s: string) => s.trim())
            .filter(Boolean);
        }
      }

      return {
        id: offer.id,
        offerId: offer.id,
        partnerId: role === "STUDENT" ? offer.companyId : offer.studentId,
        partnerName,
        partnerSub,
        partnerType,
        avatarUrl,
        tags,
        lastMessage: lastMsg ? lastMsg.content : offer.message || "オファーが届きました",
        lastMessageTime: lastMsg ? new Date(lastMsg.sentAt).toISOString() : new Date(offer.createdAt).toISOString(),
        unreadCount: 0,
        status: offer.status,
      };
    });

    return NextResponse.json({ threads: formattedThreads });
  } catch (error) {
    console.error("Chat threads API error:", error);
    return NextResponse.json({ threads: [] }, { status: 500 });
  }
}
