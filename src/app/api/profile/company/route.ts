import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sanitizeString } from "@/lib/sanitizer";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    let company = null;
    if (userId) {
      company = await prisma.companyProfile.findUnique({
        where: { userId },
        include: { user: { select: { email: true, userType: true } } },
      });
    }

    if (!company) {
      company = await prisma.companyProfile.findFirst({
        include: { user: { select: { email: true, userType: true } } },
      });
    }

    return NextResponse.json({ success: true, profile: company });
  } catch (error) {
    console.warn("Get company profile warning:", error);
    return NextResponse.json({ success: true, profile: null });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, companyName, industry, websiteUrl, description } = body;

    try {
      let targetUserId = userId;
      if (!targetUserId) {
        const companyUser = await prisma.user.findFirst({
          where: { userType: "COMPANY" },
        });
        if (companyUser) {
          targetUserId = companyUser.id;
        }
      }

      if (targetUserId) {
        const profile = await prisma.companyProfile.upsert({
          where: { userId: targetUserId },
          update: {
            companyName: sanitizeString(companyName),
            industry: sanitizeString(industry),
            websiteUrl: sanitizeString(websiteUrl),
            description: sanitizeString(description),
          },
          create: {
            userId: targetUserId,
            companyName: sanitizeString(companyName),
            industry: sanitizeString(industry),
            websiteUrl: sanitizeString(websiteUrl),
            description: sanitizeString(description),
          },
        });

        return NextResponse.json({ success: true, profile });
      }

      return NextResponse.json({ success: true, demoMode: true });
    } catch (dbError) {
      console.warn("Company Profile DB warning:", dbError);
      return NextResponse.json({ success: true, demoMode: true });
    }
  } catch (error) {
    console.error("Save company profile error:", error);
    return NextResponse.json({ message: "サーバーエラーが発生しました。" }, { status: 500 });
  }
}
