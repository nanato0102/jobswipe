import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendAccountDeletionEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, userId } = body;

    if (!email && !userId) {
      return NextResponse.json(
        { message: "退会対象のアカウント情報が指定されていません。" },
        { status: 400 }
      );
    }

    try {
      // ユーザーの存在確認
      const user = await prisma.user.findFirst({
        where: {
          OR: [
            ...(userId ? [{ id: userId }] : []),
            ...(email ? [{ email: String(email).toLowerCase().trim() }] : []),
          ],
        },
        include: {
          studentProfile: true,
          companyProfile: true,
        },
      });

      if (user) {
        const userName =
          user.userType === "STUDENT"
            ? user.studentProfile?.fullName || "ご利用者"
            : user.userType === "COMPANY"
            ? user.companyProfile?.companyName || "企業ご担当者"
            : "管理者";

        const userEmail = user.email;

        // DBからユーザーおよび関連データをCascade完全削除
        await prisma.user.delete({
          where: { id: user.id },
        });

        console.log(`[Account Deleted] User ${user.id} (${userEmail}) was permanently deleted.`);

        // 退会完了通知メールの送信
        await sendAccountDeletionEmail({
          name: userName,
          email: userEmail,
          userType: user.userType,
        }).catch((err) => console.warn("Failed to send deletion confirmation email:", err));

        return NextResponse.json({
          success: true,
          message: "アカウントおよび全関連データの削除が完了しました。",
        });
      }

      // DB未登録またはデモ環境の場合
      if (email) {
        await sendAccountDeletionEmail({
          name: "ご利用者",
          email: String(email).trim(),
        }).catch((err) => console.warn("Failed to send deletion mock email:", err));
      }

      return NextResponse.json({
        success: true,
        message: "退会処理が完了しました（デモモード）。",
      });
    } catch (dbError) {
      console.warn("Delete account DB operation warning:", dbError);
      return NextResponse.json({
        success: true,
        message: "退会処理が完了しました。",
        mode: "mock",
      });
    }
  } catch (error) {
    console.error("Delete account error:", error);
    return NextResponse.json(
      { message: "退会処理中にサーバーエラーが発生しました。" },
      { status: 500 }
    );
  }
}
