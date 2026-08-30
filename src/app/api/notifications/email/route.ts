import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, recipientRole, recipientName, senderName, title, content } = body;

    // メール送信テンプレート生成
    const subject = `【JobSwipe】${senderName ? `${senderName}様より: ` : ""}${title || "新着通知"}`;
    const timestamp = new Date().toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    let bodyHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 8px;">
        <h2 style="color: #047857; margin-bottom: 16px;">JobSwipe (ジョブスワイプ)</h2>
        <p style="font-size: 14px; color: #334155;"><strong>${recipientName || "ご利用者"} 様</strong></p>
        <p style="font-size: 14px; color: #334155; line-height: 1.6;">${title}</p>
        
        <div style="background-color: #f8fafc; border-left: 4px solid #047857; padding: 12px 16px; margin: 16px 0;">
          <p style="font-size: 13px; color: #475569; margin: 0; white-space: pre-wrap;">${content}</p>
        </div>

        <div style="margin-top: 24px;">
          <a href="https://resilient-maxwell.vercel.app/login" style="display: inline-block; background-color: #047857; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 13px;">
            JobSwipeにログインして確認する
          </a>
        </div>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
        <p style="font-size: 11px; color: #94a3b8; margin: 0;">送信日時: ${timestamp} | 本メールはJobSwipeシステムより自動送信されています。</p>
      </div>
    `;

    console.log(`[Email Notification Triggered] To: ${recipientName} (${recipientRole}), Subject: ${subject}`);

    // 本番環境用 SendGrid / Resend 連携プレースホルダー（API Keyが存在する場合に実送信）
    const sendgridApiKey = process.env.SENDGRID_API_KEY;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "JobSwipe <notifications@jobswipe.jp>",
            to: ["demo@jobswipe.jp"], // 送信先
            subject,
            html: bodyHtml,
          }),
        });
      } catch (err) {
        console.error("Resend delivery error:", err);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Notification email processed successfully",
      deliveredMock: true,
      subject,
      timestamp,
    });
  } catch (error) {
    console.error("Email notification error:", error);
    return NextResponse.json({ error: "Failed to send email notification" }, { status: 500 });
  }
}
