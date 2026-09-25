import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";

function verifyResetToken(token: string): { valid: boolean; email?: string; error?: string } {
  const secret = process.env.AUTH_SECRET || "jobswipe-secret-key-production-2026";
  const parts = token.split(".");
  if (parts.length !== 2) {
    return { valid: false, error: "無効な再設定用トークンです。" };
  }

  const [payloadStr, signature] = parts;
  const expectedSig = crypto.createHmac("sha256", secret).update(payloadStr).digest("base64url");

  if (signature !== expectedSig) {
    return { valid: false, error: "再設定用トークンが改ざんされているか不正です。" };
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadStr, "base64url").toString("utf-8"));
    if (Date.now() > payload.exp) {
      return { valid: false, error: "再設定用リンクの有効期限（30分）が切れています。再度申請してください。" };
    }
    return { valid: true, email: payload.email };
  } catch (e) {
    return { valid: false, error: "トークンの解析に失敗しました。" };
  }
}

export async function POST(req: Request) {
  try {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return NextResponse.json({ error: "トークンと新しいパスワードは必須です。" }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: "パスワードは8文字以上で設定してください。" }, { status: 400 });
    }

    const verifyResult = verifyResetToken(token);
    if (!verifyResult.valid || !verifyResult.email) {
      return NextResponse.json({ error: verifyResult.error || "無効なトークンです。" }, { status: 400 });
    }

    const email = verifyResult.email;
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    return NextResponse.json({
      success: true,
      message: "パスワードの再設定が完了しました。新しいパスワードでログインしてください。",
    });
  } catch (error) {
    console.error("Reset password API error:", error);
    return NextResponse.json({ error: "パスワードの更新に失敗しました。" }, { status: 500 });
  }
}
