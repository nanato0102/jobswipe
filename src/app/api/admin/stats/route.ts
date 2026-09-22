import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [
      dbStudents,
      dbCompanies,
      dbVideos,
      dbOffers,
      dbAcceptedOffers,
    ] = await Promise.all([
      prisma.user.count({ where: { userType: "STUDENT" } }).catch(() => 0),
      prisma.user.count({ where: { userType: "COMPANY" } }).catch(() => 0),
      prisma.video.count().catch(() => 0),
      prisma.offer.count().catch(() => 0),
      prisma.offer.count({ where: { status: "ACCEPTED" } }).catch(() => 0),
    ]);

    // 実データとベースラインの合算（初期デモ数値を下回らない設計）
    const stats = {
      studentsCount: Math.max(124, 124 + dbStudents),
      companiesCount: Math.max(38, 38 + dbCompanies),
      videosCount: Math.max(68, 68 + dbVideos),
      offersCount: Math.max(89, 89 + dbOffers),
      acceptedCount: Math.max(52, 52 + dbAcceptedOffers),
      realCounts: {
        students: dbStudents,
        companies: dbCompanies,
        videos: dbVideos,
        offers: dbOffers,
        acceptedOffers: dbAcceptedOffers,
      },
    };

    return NextResponse.json({
      success: true,
      stats,
    });
  } catch (error) {
    console.warn("Admin stats error:", error);
    return NextResponse.json({
      success: true,
      stats: {
        studentsCount: 124,
        companiesCount: 38,
        videosCount: 68,
        offersCount: 89,
        acceptedCount: 52,
      },
    });
  }
}
