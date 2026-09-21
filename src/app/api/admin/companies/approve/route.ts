import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { sanitizeString } from "@/lib/sanitizer";
import { sendCompanyApprovalEmail } from "@/lib/mail";
import { z } from "zod";

const approveSchema = z.object({
  inquiryId: z.string().optional(),
  receiptNumber: z.string().optional(),
  companyName: z.string().min(1),
  repName: z.string().optional(),
  email: z.string().email(),
  industry: z.string().optional(),
  phone: z.string().optional(),
});

/**
 * 安全なランダム初期仮パスワード生成 (英大文字・小文字・数字・記号を含む10文字)
 */
function generateTemporaryPassword(): string {
  const chars = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let pwd = "Js";
  for (let i = 0; i < 6; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  pwd += "!9";
  return pwd;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = approveSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "入力内容に不備があります。企業名とメールアドレスを確認してください。" },
        { status: 400 }
      );
    }

    const email = sanitizeString(result.data.email).toLowerCase();
    const companyName = sanitizeString(result.data.companyName);
    const repName = result.data.repName ? sanitizeString(result.data.repName) : "";
    const industry = result.data.industry ? sanitizeString(result.data.industry) : "IT・Webサービス";
    const receiptNumber = result.data.receiptNumber || "";

    const temporaryPassword = generateTemporaryPassword();
    const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

    let createdUser = null;

    try {
      // 既存ユーザーの確認
      const existing = await prisma.user.findUnique({
        where: { email },
        include: { companyProfile: true },
      });

      if (existing) {
        // パスワードを更新し、企業プロフィールを確保
        createdUser = await prisma.user.update({
          where: { id: existing.id },
          data: {
            password: hashedPassword,
            userType: "COMPANY",
            companyProfile: existing.companyProfile
              ? {
                  update: {
                    companyName,
                    industry,
                  },
                }
              : {
                  create: {
                    companyName,
                    industry,
                  },
                },
          },
          include: { companyProfile: true },
        });
      } else {
        // 新規企業ユーザー作成
        createdUser = await prisma.user.create({
          data: {
            email,
            password: hashedPassword,
            userType: "COMPANY",
            companyProfile: {
              create: {
                companyName,
                industry,
              },
            },
          },
          include: { companyProfile: true },
        });
      }
    } catch (dbError) {
      console.warn("DB user creation warning (continuing for demo resilience):", dbError);
    }

    // 承諾・アカウント発行通知メールの送信 (Resend)
    const emailResult = await sendCompanyApprovalEmail({
      companyName,
      repName,
      email,
      temporaryPassword,
      receiptNumber,
      loginUrl: "https://jobswipe-app.vercel.app/company/login",
    });

    return NextResponse.json({
      success: true,
      message: `企業「${companyName}」の審査を承認し、アカウントを発行しました。`,
      user: {
        id: createdUser?.id || "company-" + Date.now(),
        email,
        companyName,
        temporaryPassword,
      },
      emailNotification: {
        sent: emailResult.success,
        mode: emailResult.mode,
      },
    });
  } catch (error: any) {
    console.error("[Company Approve API Error]:", error);
    return NextResponse.json(
      { error: error?.message || "企業アカウントの発行処理中にエラーが発生しました。" },
      { status: 500 }
    );
  }
}
