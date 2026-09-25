import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sanitizeString } from "@/lib/sanitizer";
import { sendPasswordResetEmail } from "@/lib/mail";
import crypto from "crypto";

// 簡易署名付きトークン生成（秘密鍵ベース、有効期限30分）
function generateResetToken(email: string): string {
  const secret = process.env.AUTH_SECRET || "jobswipe-secret-key-production-2026";
  const expiresAt = Date.now() + 30 * 60 * 1000; // 30分後
  const payload = Buffer.from(JSON.stringify({ email, exp: expiresAt })).toString("base64url");
  const signature = crypto.createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "メールアドレスを入力してください。" }, { status: 400 });
    }

    const sanitizedEmail = sanitizeString(email).toLowerCase().trim();

    // ユーザー検索
    let user = null;
    try {
      user = await prisma.user.findUnique({
        where: { email: sanitizedEmail },
        include: {
          studentProfile: true,
          companyProfile: true,
        },
      });
    } catch (dbErr) {
      console.warn("User lookup note in forgot-password:", dbErr);
    }

    if (user) {
      const token = generateResetToken(sanitizedEmail);
      const baseUrl = process.env.NEXTAUTH_URL || "https://jobswipe-app.vercel.app";
      const resetUrl = `${baseUrl.replace(/\/$/, "")}/reset-password?token=${token}`;

      const displayName =
        user.studentProfile?.fullName ||
        user.companyProfile?.companyName ||
        "JobSwipeユーザー";

      sendPasswordResetEmail({
        email: sanitizedEmail,
        resetUrl,
        userName: displayName,
      }).catch((err) => console.warn("Password reset email send error:", err));
    }

    // セキュリティ対策（ユーザー列挙防止）: ユーザーの有無に関わらず成功メッセージを返す
    return NextResponse.json({
      success: true,
      message: "パスワード再設定用の案内メールを送信しました。メール内のリンクから再設定を行ってください。",
    });
  } catch (error) {
    console.error("Forgot password API error:", error);
    return NextResponse.json({ error: "サーバーエラーが発生しました。" }, { status: 500 });
  }
}
