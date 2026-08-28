import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sanitizeString } from "@/lib/sanitizer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, university, graduationYear, bio, skills, experience, userId } = body;

    try {
      let targetUserId = userId;
      if (!targetUserId) {
        const studentUser = await prisma.user.findFirst({
          where: { userType: "STUDENT" },
        });
        if (studentUser) {
          targetUserId = studentUser.id;
        }
      }

      if (targetUserId) {
        const profile = await prisma.studentProfile.upsert({
          where: { userId: targetUserId },
          update: {
            fullName: sanitizeString(fullName),
            university: sanitizeString(university),
            graduationYear: graduationYear ? Number(graduationYear) : null,
            bio: sanitizeString(bio),
            skills: sanitizeString(skills),
            experience: sanitizeString(experience),
          },
          create: {
            userId: targetUserId,
            fullName: sanitizeString(fullName),
            university: sanitizeString(university),
            graduationYear: graduationYear ? Number(graduationYear) : null,
            bio: sanitizeString(bio),
            skills: sanitizeString(skills),
            experience: sanitizeString(experience),
          },
        });
        return NextResponse.json({ success: true, profile });
      }

      return NextResponse.json({ success: true, demoMode: true });
    } catch (dbError) {
      console.warn("Profile DB warning:", dbError);
      return NextResponse.json({ success: true, demoMode: true });
    }
  } catch (error) {
    return NextResponse.json({ message: "サーバーエラーが発生しました。" }, { status: 500 });
  }
}
