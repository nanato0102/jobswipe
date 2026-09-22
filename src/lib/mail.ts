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

export interface StudentWelcomeEmailPayload {
  name: string;
  email: string;
  university?: string;
  videoUrl?: string;
}

/**
 * 学生向け登録完了（ウェルカム）メール送信
 * 動画投稿のモチベーションを高める洗練されたデザインと構成案内
 */
export async function sendStudentWelcomeEmail(payload: StudentWelcomeEmailPayload) {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "jobswipe.info@gmail.com";
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "JobSwipe <onboarding@resend.dev>";
  const videoUploadUrl = payload.videoUrl || "https://jobswipe-app.vercel.app/student/video";
  const profileUrl = "https://jobswipe-app.vercel.app/student/profile";

  const timestamp = new Date().toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const subject = `【JobSwipe】会員登録完了のお知らせ（60秒動画で逆求人スカウトを受け取ろう）`;
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; margin: 0 auto; padding: 28px 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1e293b; line-height: 1.7;">
      
      <!-- ブランドヘッダー -->
      <div style="border-bottom: 2px solid #047857; padding-bottom: 16px; margin-bottom: 24px;">
        <h1 style="color: #0f172a; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">JobSwipe (ジョブスワイプ)</h1>
        <p style="margin: 4px 0 0 0; font-size: 12px; color: #64748b; font-weight: 500;">短尺自己PR動画で人柄を可視化する新卒逆求人プラットフォーム</p>
      </div>

      <!-- ウェルカムメッセージ -->
      <p style="font-size: 16px; color: #1e293b; margin: 0 0 12px 0;">
        <strong>${payload.name} 様</strong>
      </p>

      <p style="font-size: 14px; color: #334155; margin: 0 0 24px 0;">
        JobSwipeへの会員登録が完了いたしました！<br />
        テンプレESや学歴のフィルターを超え、あなたの「素の人柄・熱量・対人力」を評価する優良企業から直接スカウトが届く「待ちの就活」をスタートしましょう。
      </p>

      <!-- メインCTA（動画投稿ボタン） -->
      <div style="background-color: #ecfdf5; border: 1.5px solid #a7f3d0; border-radius: 10px; padding: 24px 20px; text-align: center; margin: 24px 0;">
        <span style="display: inline-block; background-color: #065f46; color: #ffffff; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 4px; text-transform: uppercase; margin-bottom: 10px;">STEP 1 : 最重要アクション</span>
        <h2 style="font-size: 18px; font-weight: 800; color: #064e3b; margin: 0 0 8px 0;">
          まずは60秒の自己PR動画を投稿しよう
        </h2>
        <p style="font-size: 13px; color: #047857; margin: 0 0 18px 0;">
          スマホのインカメラで自撮りするだけ（編集不要・撮り直し無制限）。動画を投稿すると企業のスワイプ画面に表示され、スカウト獲得率が大幅に向上します。
        </p>
        <a href="${videoUploadUrl}" style="display: inline-block; background-color: #047857; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 800; font-size: 15px; box-shadow: 0 2px 4px rgba(4, 120, 87, 0.2);">
          スマホで自己PR動画を投稿する（約1分） ➔
        </a>
      </div>

      <!-- 動画投稿の3大安心ポイント -->
      <div style="margin: 28px 0;">
        <h3 style="font-size: 14px; font-weight: 700; color: #0f172a; margin: 0 0 14px 0; border-left: 3px solid #047857; padding-left: 8px;">
          JobSwipeの安心＆メリット
        </h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <tr>
            <td style="padding: 10px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; width: 33.3%; vertical-align: top;">
              <strong style="color: #047857; display: block; margin-bottom: 4px;">✓ 完全無料</strong>
              利用料やスカウト受信・チャット面談などすべて完全無料です。
            </td>
            <td style="padding: 10px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; width: 33.3%; vertical-align: top;">
              <strong style="color: #047857; display: block; margin-bottom: 4px;">✓ 撮り直し何度でもOK</strong>
              納得がいくまで何回でも撮り直して最新動画に差し替え可能です。
            </td>
            <td style="padding: 10px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; width: 33.3%; vertical-align: top;">
              <strong style="color: #047857; display: block; margin-bottom: 4px;">✓ 承諾まで本名非公開</strong>
              スワイプ時はイニシャル表示。オファーを承諾した企業にのみ公開されます。
            </td>
          </tr>
        </table>
      </div>

      <!-- 簡単60秒動画の構成テンプレート -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin: 24px 0; font-size: 13px;">
        <h3 style="margin: 0 0 10px 0; font-size: 13px; font-weight: 700; color: #0f172a;">
          🎬 何を話せばいい？ 60秒のおすすめ構成例
        </h3>
        <ul style="margin: 0; padding-left: 20px; color: #334155;">
          <li style="margin-bottom: 6px;"><strong>【0〜15秒】挨拶 ＆ 自己紹介:</strong> 「〇〇大学の〇〇です。専攻は〜です」</li>
          <li style="margin-bottom: 6px;"><strong>【15〜45秒】学生時代に力を入れたこと:</strong> 「部活動/研究/インターン/サークル等で〇〇に注力し、〇〇を学びました」</li>
          <li><strong>【45〜60秒】強み ＆ 意気込み:</strong> 「私の強みは〇〇です。御社のような成長環境で貢献したいです！」</li>
        </ul>
      </div>

      <!-- アカウント情報 -->
      <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 16px; margin: 24px 0; font-size: 13px; background-color: #ffffff;">
        <p style="margin: 0 0 4px 0; color: #64748b;"><strong>ご登録メールアドレス:</strong> ${payload.email}</p>
        ${payload.university ? `<p style="margin: 0 0 4px 0; color: #64748b;"><strong>学校名:</strong> ${payload.university}</p>` : ""}
        <p style="margin: 0; color: #64748b;"><strong>マイページ:</strong> <a href="${profileUrl}" style="color: #047857; text-decoration: underline;">${profileUrl}</a></p>
      </div>

      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 28px 0 16px 0;" />
      <div style="font-size: 12px; color: #64748b; line-height: 1.6;">
        <p style="margin: 0 0 4px 0;"><strong>JobSwipe 運営事務局</strong></p>
        <p style="margin: 0 0 4px 0;">お問い合わせ: <a href="mailto:jobswipe.info@gmail.com" style="color: #047857;">jobswipe.info@gmail.com</a></p>
        <p style="margin: 0;">登録日時: ${timestamp}</p>
      </div>
    </div>
  `;

  if (resendApiKey) {
    let emailSent = false;
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
        console.log(`[Resend Welcome Success] Welcome email sent to ${payload.email}, id: ${resData.id}`);
        emailSent = true;
      } else {
        console.warn(`[Resend Welcome Warning]`, resData);
      }
    } catch (e) {
      console.error("[Resend Welcome Exception]", e);
    }
    return { success: emailSent, mode: "live" };
  } else {
    console.log(`[Email Mock] Welcome email simulated for: ${payload.email}`);
    return { success: true, mode: "mock" };
  }
}

export interface AccountDeletionEmailPayload {
  name: string;
  email: string;
  userType?: string;
}

/**
 * 退会手続き完了通知メール送信
 */
export async function sendAccountDeletionEmail(payload: AccountDeletionEmailPayload) {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "jobswipe.info@gmail.com";
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "JobSwipe <onboarding@resend.dev>";

  const timestamp = new Date().toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const subject = `【JobSwipe】退会手続き完了のお知らせ`;
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; margin: 0 auto; padding: 28px 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1e293b; line-height: 1.7;">
      <div style="border-bottom: 2px solid #64748b; padding-bottom: 16px; margin-bottom: 24px;">
        <h1 style="color: #0f172a; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">JobSwipe (ジョブスワイプ)</h1>
        <p style="margin: 4px 0 0 0; font-size: 12px; color: #64748b; font-weight: 500;">短尺自己PR動画で人柄を可視化する新卒逆求人プラットフォーム</p>
      </div>

      <p style="font-size: 15px; color: #1e293b; margin: 0 0 16px 0;">
        <strong>${payload.name} 様</strong>
      </p>

      <p style="font-size: 14px; color: #334155; margin: 0 0 20px 0;">
        平素よりJobSwipeをご利用いただき、誠にありがとうございました。<br />
        アカウントの退会手続きが正常に完了いたしましたのでお知らせいたします。
      </p>

      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin: 20px 0; font-size: 13px; color: #475569;">
        <h3 style="margin: 0 0 10px 0; font-size: 13px; font-weight: 700; color: #1e293b;">
          ■ 削除されたデータ内容
        </h3>
        <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
          <li>ご登録いただいたプロフィール情報（氏名、大学・職歴、自己PRなど）</li>
          <li>投稿された自己PR動画およびサムネイルデータ</li>
          <li>送受信したスカウトオファーおよびチャットメッセージ履歴</li>
          <li>気になる（Like）およびマッチング履歴</li>
        </ul>
        <p style="margin: 12px 0 0 0; font-size: 12px; color: #64748b;">
          ※ 上記の情報はデータベース上から完全に抹消されており、復元することはできません。
        </p>
      </div>

      <p style="font-size: 13px; color: #334155; margin: 20px 0;">
        これまでJobSwipeをご愛顧いただき、心より御礼申し上げます。<br />
        またの機会がございましたら、いつでも再登録・ご利用をお待ち申し上げております。
      </p>

      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 28px 0 16px 0;" />
      <div style="font-size: 12px; color: #64748b; line-height: 1.6;">
        <p style="margin: 0 0 4px 0;"><strong>JobSwipe 運営事務局</strong></p>
        <p style="margin: 0 0 4px 0;">お問い合わせ: <a href="mailto:jobswipe.info@gmail.com" style="color: #2563eb;">jobswipe.info@gmail.com</a></p>
        <p style="margin: 0;">手続き完了日時: ${timestamp}</p>
      </div>
    </div>
  `;

  if (resendApiKey) {
    let emailSent = false;
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
        console.log(`[Resend Deletion Success] Deletion email sent to ${payload.email}, id: ${resData.id}`);
        emailSent = true;
      } else {
        console.warn(`[Resend Deletion Warning]`, resData);
      }
    } catch (e) {
      console.error("[Resend Deletion Exception]", e);
    }
    return { success: emailSent, mode: "live" };
  } else {
    console.log(`[Email Mock] Deletion email simulated for: ${payload.email}`);
    return { success: true, mode: "mock" };
  }
}

export interface PasswordChangedEmailPayload {
  name: string;
  email: string;
}

/**
 * パスワード変更完了通知メール送信
 */
export async function sendPasswordChangedEmail(payload: PasswordChangedEmailPayload) {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "jobswipe.info@gmail.com";
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "JobSwipe <onboarding@resend.dev>";

  const timestamp = new Date().toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const subject = `【JobSwipe】パスワード変更完了のお知らせ`;
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; margin: 0 auto; padding: 28px 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1e293b; line-height: 1.7;">
      <div style="border-bottom: 2px solid #0f172a; padding-bottom: 16px; margin-bottom: 24px;">
        <h1 style="color: #0f172a; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">JobSwipe (ジョブスワイプ)</h1>
        <p style="margin: 4px 0 0 0; font-size: 12px; color: #64748b; font-weight: 500;">短尺自己PR動画で人柄を可視化する新卒逆求人プラットフォーム</p>
      </div>

      <p style="font-size: 15px; color: #1e293b; margin: 0 0 16px 0;">
        <strong>${payload.name} 様</strong>
      </p>

      <p style="font-size: 14px; color: #334155; margin: 0 0 20px 0;">
        JobSwipeアカウントのログインパスワードが変更されました。<br />
        次回以降のログイン時は、新しく設定されたパスワードをご利用ください。
      </p>

      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 20px 0; font-size: 13px; color: #475569;">
        <p style="margin: 4px 0;"><strong>対象メールアドレス:</strong> ${payload.email}</p>
        <p style="margin: 4px 0;"><strong>変更日時:</strong> ${timestamp}</p>
      </div>

      <div style="background-color: #fff1f2; border: 1px solid #fecdd3; border-radius: 8px; padding: 14px; margin: 20px 0; font-size: 12px; color: #9f1239;">
        <strong>※ お心当たりがない場合:</strong><br />
        もし本変更に心当たりがない場合は、第三者による不正アクセスの可能性がございます。至急運営事務局（jobswipe.info@gmail.com）までご連絡ください。
      </div>

      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 28px 0 16px 0;" />
      <div style="font-size: 12px; color: #64748b; line-height: 1.6;">
        <p style="margin: 0 0 4px 0;"><strong>JobSwipe 運営事務局</strong></p>
        <p style="margin: 0 0 4px 0;">お問い合わせ: <a href="mailto:jobswipe.info@gmail.com" style="color: #2563eb;">jobswipe.info@gmail.com</a></p>
      </div>
    </div>
  `;

  if (resendApiKey) {
    let emailSent = false;
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
        console.log(`[Resend Password Changed Success] Email sent to ${payload.email}, id: ${resData.id}`);
        emailSent = true;
      }
    } catch (e) {
      console.error("[Resend Password Changed Exception]", e);
    }
    return { success: emailSent, mode: "live" };
  } else {
    console.log(`[Email Mock] Password changed email simulated for: ${payload.email}`);
    return { success: true, mode: "mock" };
  }
}

export interface OfferReceivedEmailPayload {
  studentName: string;
  studentEmail: string;
  companyName: string;
  offerMessage: string;
}

/**
 * 学生宛てスカウト（オファー）受信通知メール送信
 */
export async function sendOfferReceivedEmail(payload: OfferReceivedEmailPayload) {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "jobswipe.info@gmail.com";
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "JobSwipe <onboarding@resend.dev>";
  const offersUrl = "https://jobswipe-app.vercel.app/student/offers";

  const timestamp = new Date().toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const subject = `【JobSwipe】${payload.companyName}様からスカウト（オファー）が届きました`;
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; margin: 0 auto; padding: 28px 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1e293b; line-height: 1.7;">
      <div style="border-bottom: 2px solid #047857; padding-bottom: 16px; margin-bottom: 24px;">
        <h1 style="color: #0f172a; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">JobSwipe (ジョブスワイプ)</h1>
        <p style="margin: 4px 0 0 0; font-size: 12px; color: #64748b; font-weight: 500;">短尺自己PR動画で人柄を可視化する新卒逆求人プラットフォーム</p>
      </div>

      <p style="font-size: 15px; color: #1e293b; margin: 0 0 16px 0;">
        <strong>${payload.studentName} 様</strong>
      </p>

      <p style="font-size: 14px; color: #334155; margin: 0 0 20px 0;">
        あなたの自己PR動画に関心を持った企業より、特別なスカウト（オファー）が届きました！<br />
        オファー内容を確認し、興味があれば承諾してチャット面談に進みましょう。
      </p>

      <div style="background-color: #ecfdf5; border: 1.5px solid #a7f3d0; border-radius: 10px; padding: 20px; margin: 24px 0;">
        <div style="font-size: 12px; font-weight: 700; color: #047857; text-transform: uppercase; margin-bottom: 6px;">オファー送信元企業</div>
        <div style="font-size: 18px; font-weight: 800; color: #064e3b; margin-bottom: 12px;">${payload.companyName}</div>
        
        <div style="font-size: 12px; font-weight: 700; color: #065f46; margin-bottom: 6px;">スカウトメッセージ:</div>
        <div style="background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 12px 14px; font-size: 13px; color: #0f172a; line-height: 1.6; white-space: pre-wrap;">${payload.offerMessage}</div>
      </div>

      <div style="text-align: center; margin: 28px 0;">
        <a href="${offersUrl}" style="display: inline-block; background-color: #047857; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 800; font-size: 15px; box-shadow: 0 2px 4px rgba(4, 120, 87, 0.2);">
          オファーを確認・返信する ➔
        </a>
      </div>

      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 16px; margin: 20px 0; font-size: 12px; color: #64748b;">
        <p style="margin: 0 0 4px 0;">※ オファーを承諾するまで、氏名などの詳細個人情報は相手企業には公開されません。</p>
        <p style="margin: 0;">※ 辞退する場合も相手企業に失礼なく通知されますのでご安心ください。</p>
      </div>

      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 28px 0 16px 0;" />
      <div style="font-size: 12px; color: #64748b; line-height: 1.6;">
        <p style="margin: 0 0 4px 0;"><strong>JobSwipe 運営事務局</strong></p>
        <p style="margin: 0 0 4px 0;">お問い合わせ: <a href="mailto:jobswipe.info@gmail.com" style="color: #047857;">jobswipe.info@gmail.com</a></p>
        <p style="margin: 0;">受信日時: ${timestamp}</p>
      </div>
    </div>
  `;

  if (resendApiKey) {
    let emailSent = false;
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [payload.studentEmail],
          bcc: [adminEmail],
          reply_to: adminEmail,
          subject,
          html,
        }),
      });

      const resData = await res.json();
      if (res.ok) {
        console.log(`[Resend Offer Received Success] Email sent to ${payload.studentEmail}, id: ${resData.id}`);
        emailSent = true;
      }
    } catch (e) {
      console.error("[Resend Offer Received Exception]", e);
    }
    return { success: emailSent, mode: "live" };
  } else {
    console.log(`[Email Mock] Offer received email simulated for: ${payload.studentEmail}`);
    return { success: true, mode: "mock" };
  }
}

export interface OfferAcceptedEmailPayload {
  companyName: string;
  companyEmail: string;
  studentName: string;
  studentUniversity?: string;
}

/**
 * 企業宛てオファー承諾通知メール送信
 */
export async function sendOfferAcceptedEmail(payload: OfferAcceptedEmailPayload) {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "jobswipe.info@gmail.com";
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "JobSwipe <onboarding@resend.dev>";
  const chatUrl = "https://jobswipe-app.vercel.app/company/chat";

  const timestamp = new Date().toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const subject = `【JobSwipe】${payload.studentName}様がオファーを承諾しました（個別チャット開始）`;
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; margin: 0 auto; padding: 28px 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1e293b; line-height: 1.7;">
      <div style="border-bottom: 2px solid #2563eb; padding-bottom: 16px; margin-bottom: 24px;">
        <h1 style="color: #0f172a; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">JobSwipe (ジョブスワイプ)</h1>
        <p style="margin: 4px 0 0 0; font-size: 12px; color: #64748b; font-weight: 500;">短尺自己PR動画で人柄を可視化する新卒逆求人プラットフォーム</p>
      </div>

      <p style="font-size: 15px; color: #1e293b; margin: 0 0 16px 0;">
        <strong>${payload.companyName} 採用ご担当者様</strong>
      </p>

      <p style="font-size: 14px; color: #334155; margin: 0 0 20px 0;">
        貴社が送信されたスカウトオファーを候補者が承諾いたしました！<br />
        これより個別チャットにて面談日程の調整やメッセージのやり取りが可能となります。
      </p>

      <div style="background-color: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 10px; padding: 20px; margin: 24px 0;">
        <div style="font-size: 12px; font-weight: 700; color: #1d4ed8; text-transform: uppercase; margin-bottom: 6px;">オファー承諾者</div>
        <div style="font-size: 18px; font-weight: 800; color: #1e3a8a; margin-bottom: 6px;">${payload.studentName} 様</div>
        ${payload.studentUniversity ? `<div style="font-size: 13px; color: #3b82f6; font-weight: 600;">所属: ${payload.studentUniversity}</div>` : ""}
      </div>

      <div style="text-align: center; margin: 28px 0;">
        <a href="${chatUrl}" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 800; font-size: 15px; box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);">
          個別チャットを開く ➔
        </a>
      </div>

      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 28px 0 16px 0;" />
      <div style="font-size: 12px; color: #64748b; line-height: 1.6;">
        <p style="margin: 0 0 4px 0;"><strong>JobSwipe 運営事務局</strong></p>
        <p style="margin: 0 0 4px 0;">お問い合わせ: <a href="mailto:jobswipe.info@gmail.com" style="color: #2563eb;">jobswipe.info@gmail.com</a></p>
        <p style="margin: 0;">承諾日時: ${timestamp}</p>
      </div>
    </div>
  `;

  if (resendApiKey) {
    let emailSent = false;
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [payload.companyEmail],
          bcc: [adminEmail],
          reply_to: adminEmail,
          subject,
          html,
        }),
      });

      const resData = await res.json();
      if (res.ok) {
        console.log(`[Resend Offer Accepted Success] Email sent to ${payload.companyEmail}, id: ${resData.id}`);
        emailSent = true;
      }
    } catch (e) {
      console.error("[Resend Offer Accepted Exception]", e);
    }
    return { success: emailSent, mode: "live" };
  } else {
    console.log(`[Email Mock] Offer accepted email simulated for: ${payload.companyEmail}`);
    return { success: true, mode: "mock" };
  }
}