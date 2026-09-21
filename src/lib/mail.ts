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
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff; color: #1e293b;">
      <h2 style="color: #0f172a; margin: 0 0 16px 0; font-size: 20px; font-weight: 700;">JobSwipe お問い合わせ通知</h2>
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
      <h3 style="font-size: 14px; color: #334155; margin: 0 0 8px 0; font-weight: 600;">お問い合わせ本文</h3>
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
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff; color: #1e293b;">
      <h2 style="color: #0f172a; margin: 0 0 16px 0; font-size: 20px; font-weight: 700;">JobSwipe (ジョブスワイプ)</h2>
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
      <h3 style="font-size: 13px; color: #334155; margin: 0 0 8px 0; font-weight: 600;">お問い合わせ内容（控え）</h3>
      <div style="background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 14px; font-size: 13px; line-height: 1.7; color: #0f172a; white-space: pre-wrap;">${payload.message}</div>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0 16px 0;" />
      <p style="font-size: 12px; color: #64748b; margin: 0;">JobSwipe 運営事務局: <a href="mailto:jobswipe.info@gmail.com" style="color: #0284c7;">jobswipe.info@gmail.com</a></p>
    </div>
  `;

  if (resendApiKey) {
    let adminSent = false;
    let userSent = false;

    // 1. 運営者（管理者）宛てメール送信
    try {
      const resAdmin = await fetch("https://api.resend.com/emails", {
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

      const adminData = await resAdmin.json();
      if (resAdmin.ok) {
        console.log(`[Resend Admin Success] Email sent to ${adminEmail}, id: ${adminData.id}`);
        adminSent = true;
      } else {
        console.error(`[Resend Admin Error]`, adminData);
      }
    } catch (e) {
      console.error("[Resend Admin Exception]", e);
    }

    // 2. 送信者宛て自動返信メール（Resendサンドボックス制限を考慮）
    try {
      const resUser = await fetch("https://api.resend.com/emails", {
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

      const userData = await resUser.json();
      if (resUser.ok) {
        console.log(`[Resend User Success] Confirmation sent to ${payload.email}, id: ${userData.id}`);
        userSent = true;
      } else {
        console.warn(`[Resend User Note] Sandbox mode prevented sending to ${payload.email}:`, userData.message);
      }
    } catch (e) {
      console.warn("[Resend User Exception]", e);
    }

    return {
      success: adminSent || userSent,
      mode: "live",
      adminNotified: adminSent,
      userNotified: userSent,
    };
  } else {
    console.log(`[Email Mock] RESEND_API_KEY not configured. Admin: ${adminEmail}, User: ${payload.email}`);
    return { success: true, mode: "mock", adminNotified: true, userNotified: true };
  }
}

export interface CompanyApprovalEmailPayload {
  companyName: string;
  repName?: string;
  email: string;
  temporaryPassword: string;
  loginUrl?: string;
  receiptNumber?: string;
}

/**
 * 企業の掲載審査完了・アカウント発行メール送信
 */
export async function sendCompanyApprovalEmail(payload: CompanyApprovalEmailPayload) {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "jobswipe.info@gmail.com";
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "JobSwipe <onboarding@resend.dev>";
  const loginUrl = payload.loginUrl || "https://jobswipe-app.vercel.app/company/login";

  const displayName = payload.repName
    ? `${payload.companyName} ${payload.repName}様`
    : `${payload.companyName}様`;

  const timestamp = new Date().toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const subject = `【JobSwipe】企業利用審査完了およびアカウント発行のご案内`;
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; margin: 0 auto; padding: 28px 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1e293b; line-height: 1.7;">
      <div style="border-bottom: 2px solid #2563eb; padding-bottom: 16px; margin-bottom: 24px;">
        <h1 style="color: #0f172a; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">JobSwipe (ジョブスワイプ)</h1>
        <p style="margin: 4px 0 0 0; font-size: 12px; color: #64748b; font-weight: 500;">短尺自己PR動画で人柄を可視化する新卒逆求人プラットフォーム</p>
      </div>

      <p style="font-size: 15px; color: #1e293b; margin: 0 0 16px 0;">
        <strong>${displayName}</strong>
      </p>

      <p style="font-size: 14px; color: #334155; margin: 0 0 20px 0;">
        この度はJobSwipeへの企業利用お申し込みをいただき、誠にありがとうございます。<br />
        運営事務局による法人確認および掲載審査が完了いたしましたので、専用アカウントを発行いたしました。
      </p>

      <div style="background-color: #f0f9ff; border: 1.5px solid #bae6fd; border-radius: 8px; padding: 20px; margin: 24px 0;">
        <h2 style="font-size: 14px; color: #0369a1; margin: 0 0 12px 0; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          ■ 専用ログインアカウント情報
        </h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; width: 140px; color: #64748b; font-weight: 600;">ログインURL:</td>
            <td style="padding: 6px 0;"><a href="${loginUrl}" style="color: #2563eb; font-weight: 700; text-decoration: underline;">${loginUrl}</a></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b; font-weight: 600;">登録メールアドレス:</td>
            <td style="padding: 6px 0; font-family: monospace; font-weight: 700; color: #0f172a;">${payload.email}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b; font-weight: 600;">初期仮パスワード:</td>
            <td style="padding: 6px 0; font-family: monospace; font-size: 16px; font-weight: 800; color: #dc2626; background-color: #ffffff; padding: 4px 8px; border-radius: 4px; border: 1px solid #cbd5e1; display: inline-block;">${payload.temporaryPassword}</td>
          </tr>
        </table>
        <p style="margin: 12px 0 0 0; font-size: 12px; color: #0369a1;">
          ※ 初回ログイン後、管理画面の「設定」より任意のパスワードへご変更ください。
        </p>
      </div>

      <div style="text-align: center; margin: 28px 0;">
        <a href="${loginUrl}" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 15px; box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);">
          企業管理画面にログインする
        </a>
      </div>

      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 20px 0; font-size: 13px; color: #475569;">
        <h3 style="margin: 0 0 8px 0; font-size: 13px; font-weight: 700; color: #1e293b;">🚀 ご利用開始の流れ</h3>
        <ol style="margin: 0; padding-left: 20px;">
          <li style="margin-bottom: 4px;">上記ログインURLからメールアドレスと初期パスワードでログイン</li>
          <li style="margin-bottom: 4px;">「学生を探す（スワイプ）」画面にて、自己PR動画を縦スワイプで閲覧</li>
          <li style="margin-bottom: 4px;">気になる候補者へ「気になる」または「スカウト（オファー）」を送信</li>
          <li>学生がオファーを承諾すると、個別チャットにて面談日程の調整が開始できます</li>
        </ol>
      </div>

      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 28px 0 16px 0;" />
      <div style="font-size: 12px; color: #64748b; line-height: 1.6;">
        <p style="margin: 0 0 4px 0;"><strong>JobSwipe 運営事務局</strong></p>
        <p style="margin: 0 0 4px 0;">お問い合わせ・サポート: <a href="mailto:jobswipe.info@gmail.com" style="color: #2563eb;">jobswipe.info@gmail.com</a></p>
        <p style="margin: 0;">発行日時: ${timestamp} ${payload.receiptNumber ? `[受付番号: ${payload.receiptNumber}]` : ""}</p>
      </div>
    </div>
  `;

  if (resendApiKey) {
    let emailSent = false;

    // 1. 企業宛て承諾メール送信
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [payload.email],
          bcc: [adminEmail],
          reply_to: adminEmail,
          subject,
          html,
        }),
      });

      const resData = await res.json();
      if (res.ok) {
        console.log(`[Resend Approval Success] Approval email sent to ${payload.email}, id: ${resData.id}`);
        emailSent = true;
      } else {
        console.warn(`[Resend Approval Warning]`, resData);
      }
    } catch (e) {
      console.error("[Resend Approval Exception]", e);
    }

    return { success: emailSent, mode: "live" };
  } else {
    console.log(`[Email Mock] Approval email simulated for: ${payload.email} (Password: ${payload.temporaryPassword})`);
    return { success: true, mode: "mock" };
  }
}