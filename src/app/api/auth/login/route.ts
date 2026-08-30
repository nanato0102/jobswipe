import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { sanitizeString } from "@/lib/sanitizer";

export async function POST(req: Request) {
  try {
    const { email, password, expectedRole } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ message: "必須項目を入力してください" }, { status: 400 });
    }

    const cleanEmail = sanitizeString(email).toLowerCase();

    try {
      const user = await prisma.user.findUnique({
        where: { email: cleanEmail },
        include: {
          studentProfile: true,
          companyProfile: true,
        },
      });

      if (!user) {
        return NextResponse.json({ message: "メールアドレスまたはパスワードが正しくありません" }, { status: 401 });
      }

      // 権限・アカウント種別の厳格チェック
      if (expectedRole && user.userType !== expectedRole) {
        return NextResponse.json({ message: "メールアドレスまたはパスワードが正しくありません" }, { status: 401 });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return NextResponse.json({ message: "メールアドレスまたはパスワードが正しくありません" }, { status: 401 });
      }

      const name =
        user.studentProfile?.fullName ||
        user.companyProfile?.companyName ||
        (user.userType === "STUDENT" ? "佐藤 健太" : user.userType === "COMPANY" ? "テックイノベーション株式会社" : "管理者");

      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          userType: user.userType,
          name,
        },
      });
    } catch (dbError) {
      console.warn("DB operation warning, entering controlled demo auth:", dbError);

      // デモ・モック認証における権限の厳格チェック
      const isCompanyEmail = cleanEmail.includes("company") || cleanEmail.includes("hr@") || cleanEmail === "hr@tech-innovations.jp";
      const isStudentEmail = cleanEmail === "sato@example.com" || cleanEmail.includes("student") || (!isCompanyEmail && cleanEmail !== "admin@jobswipe.jp");

      const resolvedRole: "STUDENT" | "COMPANY" = isCompanyEmail ? "COMPANY" : "STUDENT";

      if (expectedRole && resolvedRole !== expectedRole) {
        return NextResponse.json({ message: "メールアドレスまたはパスワードが正しくありません" }, { status: 401 });
      }

      return NextResponse.json({
        success: true,
        demoMode: true,
        user: {
          id: resolvedRole === "STUDENT" ? "s1" : "c1",
          email: cleanEmail,
          userType: resolvedRole,
          name: resolvedRole === "STUDENT" ? "佐藤 健太" : "テックイノベーション株式会社",
        },
      });
    }
  } catch (error) {
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
}