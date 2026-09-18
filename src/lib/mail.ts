/**
 * JobSwipe メール送信ユーティリティ (Resend API連携)
 */

export interface ContactEmailPayload {
  receiptNumber: string;
  userType: "company" | "student";
  senderName: string;
  repName?: string;
  department?: string;
  university?: string;
  email: string;
  phone?: string;
  inquiryType: string;
  message: string;
}

export async function sendContactEmails(payload: ContactEmailPayload) {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "jobswipe.info@gmail.com";
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "JobSwipe <onboarding@resend.dev>";

  const isCompany = payload.userType === "company";
  const targetLabel = isCompany ? "【企業】" : "【学生】";
  const displayName = isCompany && payload.repName
    ? `${payload.senderName} (${payload.repName}様)`
    : `${payload.senderName}様`;

  const timestamp = new Date().toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  // 1. 運営者（管理者）向け通知メール
  const adminSubject = `【JobSwipeお問い合わせ】${targetLabel} ${payload.senderName}様より [受付番号: ${payload.receiptNumber}]`;
  const adminHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff; color: #1e293b;">
      <h2 style="color: #0f172a; margin: 0 0 16px 0; font-size: 20px;">JobSwipe お問い合わせ通知</h2>
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin-bottom: 20px; font-size: 14px;">
        <p style="margin: 4px 0;"><strong>受付番号:</strong> ${payload.receiptNumber}</p>
        <p style="margin: 4px 0;"><strong>種別:</strong> ${isCompany ? "企業・採用ご担当者様" : "学生・求職者様"}</p>
        <p style="margin: 4px 0;"><strong>${isCompany ? "企業名" : "お名前"}:</strong> ${payload.senderName}</p>
        ${isCompany && payload.repName ? `<p style="margin: 4px 0;"><strong>ご担当者名:</strong> ${payload.repName}${payload.department ? ` (${payload.department})` : ""}</p>` : ""}
        ${!isCompany && payload.university ? `<p style="margin: 4px 0;"><strong>学校名:</strong> ${payload.university}</p>` : ""}
        <p style="margin: 4px 0;"><strong>メールアドレス:</strong> <a href="mailto:${payload.email}" style="color: #0284c7;">${payload.email}</a></p>
        ${payload.phone ? `<p style="margin: 4px 0;"><strong>電話番号:</strong> ${payload.phone}</p>` : ""}
        <p style="margin: 4px 0;"><strong>ご相談種別:</strong> ${payload.inquiryType}</p>
        <p style="margin: 4px 0;"><strong>送信日時:</strong> ${timestamp}</p>
      </div>
      <h3 style="font-size: 14px; color: #334155; margin: 0 0 8px 0;">お問い合わせ本文</h3>
      <div style="background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 14px; font-size: 14px; line-height: 1.7; color: #0f172a; white-space: pre-wrap;">${payload.message}</div>
      <p style="margin-top: 16px; font-size: 12px; color: #64748b;">※ このメールに直接返信すると、送信者（${payload.email}）宛てに返信できます。</p>
      <div style="text-align: center; margin-top: 24px;">
        <a href="https://jobswipe-app.vercel.app/admin-console/dashboard" style="display: inline-block; background-color: #0f172a; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 13px;">管理画面で確認する</a>
      </div>
    </div>
  `;

  // 2. 問い合わせ送信者宛て自動返信サンクスメール
  const userSubject = `【JobSwipe】お問い合わせを受け付けました [受付番号: ${payload.receiptNumber}]`;
  const userHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff; color: #1e293b;">
      <h2 style="color: #0f172a; margin: 0 0 16px 0; font-size: 20px;">JobSwipe (ジョブスワイプ)</h2>
      <p style="font-size: 14px; line-height: 1.7; color: #334155;">
        <strong>${displayName}</strong><br /><br />
        この度はお問い合わせいただき、誠にありがとうございます。<br />
        以下の内容でお問い合わせを受け付けいたしました。<br />
        担当者より1〜2営業日以内にご連絡差し上げます。
      </p>
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin: 20px 0; font-size: 13px;">
        <p style="margin: 4px 0;"><strong>受付番号:</strong> ${payload.receiptNumber}</p>
        <p style="margin: 4px 0;"><strong>ご相談種別:</strong> ${payload.inquiryType}</p>
        <p style="margin: 4px 0;"><strong>受付日時:</strong> ${timestamp}</p>
      </div>
      <h3 style="font-size: 13px; color: #334155; margin: 0 0 8px 0;">お問い合わせ内容（控え）</h3>
      <div style="background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 14px; font-size: 13px; line-height: 1.7; color: #0f172a; white-space: pre-wrap;">${payload.message}</div>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0 16px 0;" />
      <p style="font-size: 12px; color: #64748b; margin: 0;">JobSwipe 運営事務局: <a href="mailto:jobswipe.info@gmail.com" style="color: #0284c7;">jobswipe.info@gmail.com</a></p>
    </div>
  `;

  if (resendApiKey) {
    try {
      // 1. 運営者宛て通知メール
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [adminEmail],
          reply_to: payload.email,
          subject: adminSubject,
          html: adminHtml,
        }),
      });

      // 2. 送信者宛て自動返信メール
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [payload.email],
          reply_to: adminEmail,
          subject: userSubject,
          html: userHtml,
        }),
      });

      console.log(`[Email Sent] Admin notified (${adminEmail}), User confirmed (${payload.email})`);
      return { success: true, mode: "live" };
    } catch (err) {
      console.error("[Email Error] Failed to send via Resend:", err);
      return { success: false, error: err };
    }
  } else {
    console.log(`[Email Mock] RESEND_API_KEY is not configured. Admin: ${adminEmail}, User: ${payload.email}`);
    return { success: true, mode: "mock" };
  }
}