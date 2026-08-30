"use client";

import type { VideoData } from "@/types";

export interface StoredOffer {
  id: string;
  companyId: string;
  companyName: string;
  industry: string;
  studentId: string;
  studentName: string;
  message: string;
  status: "SENT" | "ACCEPTED" | "DECLINED";
  createdAt: string;
}

export interface ChatThread {
  id: string;
  role: "COMPANY" | "STUDENT";
  partnerId: string;
  partnerName: string;
  partnerSub: string;
  avatarText: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
}

export interface MessageAttachment {
  name: string;
  size: string;
  type: "image" | "pdf";
  url: string;
}

export interface StoredMessage {
  id: string;
  threadId: string;
  senderRole: "STUDENT" | "COMPANY";
  senderName: string;
  content: string;
  sentAt: string;
  attachment?: MessageAttachment;
}

export interface StoredLike {
  id: string;
  studentId: string;
  studentName: string;
  university: string;
  graduationYear: number;
  bio: string;
  tags: string[];
  videoTitle: string;
  videoUrl: string;
  createdAt: string;
}

export interface CompanyUsageStats {
  planName: string;
  monthlyQuota: number;
  sentOffersCount: number;
  remainingQuota: number;
  totalSwipedVideos: number;
  totalLikedCount: number;
  acceptedOffersCount: number;
  acceptanceRate: string;
  nextResetDate: string;
}

export interface StudentVideoStats {
  totalViews: number;
  totalLikes: number;
  totalOffers: number;
  completionRate: string;
}

export interface StoredInquiry {
  id: string;
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
  status: "UNTOUCHED" | "IN_PROGRESS" | "RESOLVED";
  createdAt: string;
}

export type NotificationType =
  | "OFFER_RECEIVED"
  | "MESSAGE_RECEIVED"
  | "LIKE_RECEIVED"
  | "OFFER_ACCEPTED"
  | "OFFER_DECLINED"
  | "SYSTEM_NOTICE";

export interface NotificationItem {
  id: string;
  role: "STUDENT" | "COMPANY";
  type: NotificationType;
  title: string;
  content: string;
  linkUrl: string;
  isRead: boolean;
  createdAt: string;
}

export interface StoredReport {
  id: string;
  targetType: "VIDEO" | "CHAT" | "USER";
  targetId: string;
  targetTitle: string;
  targetPreview?: string;
  reporterName: string;
  reason: "INAPPROPRIATE_CONTENT" | "HARASSMENT" | "SPAM" | "DEFAMATION" | "OTHER";
  reasonText: string;
  details: string;
  status: "PENDING" | "RESOLVED" | "DISMISSED";
  actionTaken?: string;
  createdAt: string;
}

export interface CompanyPosition {
  title: string;
  type: string;
  location: string;
  salary: string;
  description: string;
}

export interface CompanyDetail {
  id: string;
  name: string;
  industry: string;
  logoText: string;
  logoUrl?: string;
  catchphrase: string;
  description: string;
  culture: string[];
  seeking: string[];
  positions: CompanyPosition[];
  websiteUrl: string;
  established: string;
  employees: string;
  location: string;
}

export interface StudentDetail {
  id: string;
  name: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  university: string;
  faculty: string;
  graduationYear: number;
  avatarText: string;
  avatarUrl?: string;
  catchphrase: string;
  bio: string;
  personalityTags: string[];
  desiredIndustries: string[];
  desiredLocations: string[];
  videoUrl: string;
  videoTitle: string;
  videoViews: number;
  videoLikes: number;
}

const DEFAULT_OFFERS: StoredOffer[] = [
  {
    id: "off-c1-s1",
    companyId: "c1",
    companyName: "テックイノベーション株式会社",
    industry: "IT・Webサービス",
    studentId: "s1",
    studentName: "佐藤 健太",
    message: "動画を拝見しました！チームでのリーダーシップと技術への熱意に大変共感いたしました。弊社の新規事業推進ポジションにて、ぜひ一度カジュアル面談でお話しさせてください。",
    status: "ACCEPTED",
    createdAt: "2026/08/28 14:00",
  },
  {
    id: "off-c2-s1",
    companyId: "c2",
    companyName: "グローバルコンサルティング合同会社",
    industry: "コンサルティング",
    studentId: "s1",
    studentName: "佐藤 健太",
    message: "英語力と前向きな姿勢が弊社のグローバル案件推進にマッチすると感じました。書類選考免除の特別選考ルートをご案内いたします。",
    status: "ACCEPTED",
    createdAt: "2026/08/25 10:30",
  },
  {
    id: "off-c3-s1",
    companyId: "c3",
    companyName: "ネクストフューチャー株式会社",
    industry: "ベンチャー・スタートアップ",
    studentId: "s1",
    studentName: "佐藤 健太",
    message: "動画の明るい人柄とチャレンジ精神に強く惹かれました！代表との1on1カジュアル面談枠を確保いたしましたので、ぜひお話ししましょう！",
    status: "ACCEPTED",
    createdAt: "2026/08/29 11:00",
  },
  {
    id: "off-c1-s2",
    companyId: "c1",
    companyName: "テックイノベーション株式会社",
    industry: "IT・Webサービス",
    studentId: "s2",
    studentName: "高橋 美咲",
    message: "動画を拝見しました！マーケティングへの高い探求心と、明るく誠実なコミュニケーション能力に大変魅力を感じております。ぜひ一度お話ししませんか？",
    status: "ACCEPTED",
    createdAt: "2026/08/29 09:30",
  },
  {
    id: "off-c1-s3",
    companyId: "c1",
    companyName: "テックイノベーション株式会社",
    industry: "IT・Webサービス",
    studentId: "s3",
    studentName: "伊藤 翼",
    message: "動画での行動力と組織推進力に感銘を受けました。弊社のプロダクト開発・営業推進チームで活躍いただけると思いオファーを送らせていただきました。",
    status: "ACCEPTED",
    createdAt: "2026/08/26 15:20",
  },
];

// 学生が見る企業スレッド一覧
const DEFAULT_STUDENT_THREADS: ChatThread[] = [
  {
    id: "thread-c1",
    role: "COMPANY",
    partnerId: "c1",
    partnerName: "テックイノベーション株式会社",
    partnerSub: "IT・Webサービス • 人事採用担当",
    avatarText: "テ",
    lastMessage: "ご快諾ありがとうございます！来週の平日でご都合の良い日時はございますでしょうか？",
    lastTime: "14:30",
    unread: 1,
  },
  {
    id: "thread-c2",
    role: "COMPANY",
    partnerId: "c2",
    partnerName: "グローバルコンサルティング合同会社",
    partnerSub: "コンサルティング • 採用チーム",
    avatarText: "グ",
    lastMessage: "オファー承諾ありがとうございます。オンライン面談URLをお送りします。",
    lastTime: "昨日",
    unread: 0,
  },
  {
    id: "thread-c3",
    role: "COMPANY",
    partnerId: "c3",
    partnerName: "ネクストフューチャー株式会社",
    partnerSub: "ベンチャー・スタートアップ • 代表取締役",
    avatarText: "ネ",
    lastMessage: "動画を拝見しました！ぜひ一度カジュアルにお話ししましょう！",
    lastTime: "8/27",
    unread: 0,
  },
];

// 企業が見る学生スレッド一覧
const DEFAULT_COMPANY_THREADS: ChatThread[] = [
  {
    id: "thread-s1",
    role: "STUDENT",
    partnerId: "s1",
    partnerName: "佐藤 健太 さん",
    partnerSub: "早稲田大学 / 2027年卒",
    avatarText: "佐",
    lastMessage: "オファーいただき誠にありがとうございます！ぜひ一度お話しさせていただけますと幸いです。",
    lastTime: "14:15",
    unread: 1,
  },
  {
    id: "thread-s2",
    role: "STUDENT",
    partnerId: "s2",
    partnerName: "高橋 美咲 さん",
    partnerSub: "慶應義塾大学 / 2027年卒",
    avatarText: "高",
    lastMessage: "面談日程の件、水曜日の15:00からでお願いいたします！",
    lastTime: "11:20",
    unread: 0,
  },
  {
    id: "thread-s3",
    role: "STUDENT",
    partnerId: "s3",
    partnerName: "伊藤 翼 さん",
    partnerSub: "明治大学 / 2028年卒",
    avatarText: "伊",
    lastMessage: "スカウトありがとうございます。ぜひ事業内容について詳しくお聞きしたいです。",
    lastTime: "8/26",
    unread: 0,
  },
];

const DEFAULT_MESSAGES: StoredMessage[] = [
  // thread-c1 (学生視点: テックイノベーション)
  {
    id: "m-c1-0",
    threadId: "thread-c1",
    senderRole: "COMPANY",
    senderName: "テックイノベーション株式会社",
    content: "【特別オファーメッセージ】\n動画を拝見しました！チームでのリーダーシップと技術への熱意に大変共感いたしました。弊社の新規事業推進ポジションにて、ぜひ一度カジュアル面談でお話しさせてください。",
    sentAt: "8/28 14:00",
  },
  {
    id: "m-c1-1",
    threadId: "thread-c1",
    senderRole: "STUDENT",
    senderName: "佐藤 健太",
    content: "オファーいただき誠にありがとうございます！短尺動画を見ていただき大変嬉しいです。ぜひカジュアル面談でお話しさせていただけますと幸いです。",
    sentAt: "8/28 14:15",
  },
  {
    id: "m-c1-2",
    threadId: "thread-c1",
    senderRole: "COMPANY",
    senderName: "テックイノベーション株式会社",
    content: "ご快諾ありがとうございます！来週の平日（火曜または木曜の16:00以降など）でご都合の良い日時はございますでしょうか？",
    sentAt: "14:30",
  },
  // thread-c2 (学生視点: グローバルコンサルティング)
  {
    id: "m-c2-0",
    threadId: "thread-c2",
    senderRole: "COMPANY",
    senderName: "グローバルコンサルティング合同会社",
    content: "【特別オファーメッセージ】\n英語力と前向きな姿勢が弊社のグローバル案件推進にマッチすると感じました。書類選考免除の特別選考ルートをご案内いたします。",
    sentAt: "8/25 10:30",
  },
  {
    id: "m-c2-1",
    threadId: "thread-c2",
    senderRole: "STUDENT",
    senderName: "佐藤 健太",
    content: "過分なお言葉をいただき光栄です！グローバルコンサルティング事業に強い興味があります。日程を調整させていただきたいです。",
    sentAt: "昨日 11:00",
  },
  {
    id: "m-c2-2",
    threadId: "thread-c2",
    senderRole: "COMPANY",
    senderName: "グローバルコンサルティング合同会社",
    content: "オファー承諾ありがとうございます。オンライン面談URLをお送りします。",
    sentAt: "昨日 11:30",
  },
  // thread-c3 (学生視点: ネクストフューチャー)
  {
    id: "m-c3-0",
    threadId: "thread-c3",
    senderRole: "COMPANY",
    senderName: "ネクストフューチャー株式会社",
    content: "【特別オファーメッセージ】\n動画の明るい人柄とチャレンジ精神に強く惹かれました！代表との1on1カジュアル面談枠を確保いたしましたので、ぜひお話ししましょう！",
    sentAt: "8/27 11:00",
  },
  {
    id: "m-c3-1",
    threadId: "thread-c3",
    senderRole: "STUDENT",
    senderName: "佐藤 健太",
    content: "藤本代表、直接オファーをいただき感激です！ぜひ急成長中の事業やカルチャーについてお伺いしたいです！",
    sentAt: "8/27 11:45",
  },
  {
    id: "m-c3-2",
    threadId: "thread-c3",
    senderRole: "COMPANY",
    senderName: "ネクストフューチャー株式会社",
    content: "動画を拝見しました！ぜひ一度カジュアルにお話ししましょう！",
    sentAt: "8/27 12:00",
  },
  // thread-s1 (企業視点: 佐藤健太さん)
  {
    id: "m-s1-0",
    threadId: "thread-s1",
    senderRole: "COMPANY",
    senderName: "テックイノベーション株式会社",
    content: "【特別オファーメッセージ】\n動画を拝見しました！チームでのリーダーシップと技術への熱意に大変共感いたしました。弊社の新規事業推進ポジションにて、ぜひ一度カジュアル面談でお話しさせてください。",
    sentAt: "8/28 14:00",
  },
  {
    id: "m-s1-1",
    threadId: "thread-s1",
    senderRole: "STUDENT",
    senderName: "佐藤 健太",
    content: "オファーいただき誠にありがとうございます！ぜひ一度お話しさせていただけますと幸いです。",
    sentAt: "14:15",
  },
  // thread-s2 (企業視点: 高橋美咲さん)
  {
    id: "m-s2-0",
    threadId: "thread-s2",
    senderRole: "COMPANY",
    senderName: "テックイノベーション株式会社",
    content: "【特別オファーメッセージ】\n動画を拝見しました！マーケティングへの高い探求心と、明るく誠実なコミュニケーション能力に大変魅力を感じております。ぜひ一度お話ししませんか？",
    sentAt: "8/29 09:30",
  },
  {
    id: "m-s2-1",
    threadId: "thread-s2",
    senderRole: "COMPANY",
    senderName: "テックイノベーション株式会社",
    content: "高橋さん、オファーを承諾いただきありがとうございます！弊社のマーケティング職の業務内容についてご説明できればと思います。",
    sentAt: "10:00",
  },
  {
    id: "m-s2-2",
    threadId: "thread-s2",
    senderRole: "STUDENT",
    senderName: "高橋 美咲",
    content: "面談日程の件、水曜日の15:00からでお願いいたします！",
    sentAt: "11:20",
  },
  // thread-s3 (企業視点: 伊藤翼さん)
  {
    id: "m-s3-0",
    threadId: "thread-s3",
    senderRole: "COMPANY",
    senderName: "テックイノベーション株式会社",
    content: "【特別オファーメッセージ】\n動画での行動力と組織推進力に感銘を受けました。弊社のプロダクト開発・営業推進チームで活躍いただけると思いオファーを送らせていただきました。",
    sentAt: "8/26 15:20",
  },
  {
    id: "m-s3-1",
    threadId: "thread-s3",
    senderRole: "COMPANY",
    senderName: "テックイノベーション株式会社",
    content: "伊藤さん、オファーのご確認ありがとうございます！ぜひざっくばらんにお話ししましょう。",
    sentAt: "8/26 16:00",
  },
  {
    id: "m-s3-2",
    threadId: "thread-s3",
    senderRole: "STUDENT",
    senderName: "伊藤 翼",
    content: "スカウトありがとうございます。ぜひ事業内容について詳しくお聞きしたいです。",
    sentAt: "8/26 16:30",
  },
];

const DEFAULT_LIKES: StoredLike[] = [
  {
    id: "like-1",
    studentId: "s1",
    studentName: "佐藤 健太",
    university: "早稲田大学",
    graduationYear: 2027,
    bio: "笑顔と前向きな行動力で、チームを明るく牽引します！",
    tags: ["笑顔", "行動力", "粘り強さ", "体育会系"],
    videoTitle: "笑顔とチームを牽引する行動力",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    createdAt: "2026/08/29 10:00",
  },
  {
    id: "like-2",
    studentId: "s2",
    studentName: "高橋 美咲",
    university: "慶應義塾大学",
    graduationYear: 2027,
    bio: "1年間の留学経験。英語でのコミュニケーションと明るい接客が得意です。",
    tags: ["笑顔", "英語対応可", "探求心"],
    videoTitle: "1年間のカナダ留学と英語でのコミュニケーション力",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    createdAt: "2026/08/29 10:30",
  },
];

export const appStore = {
  // オファー関連
  getOffers: (): StoredOffer[] => {
    if (typeof window === "undefined") return DEFAULT_OFFERS;
    const data = localStorage.getItem("jobswipe_offers");
    if (!data) {
      localStorage.setItem("jobswipe_offers", JSON.stringify(DEFAULT_OFFERS));
      return DEFAULT_OFFERS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return DEFAULT_OFFERS;
    }
  },

  // オファー送信可否チェック
  canSendOffer: (): boolean => {
    const stats = appStore.getCompanyStats();
    return stats.remainingQuota > 0;
  },

  sendOffer: (offer: Omit<StoredOffer, "id" | "createdAt" | "status">): StoredOffer => {
    // 残枠チェック
    if (!appStore.canSendOffer()) {
      throw new Error("今月のオファー上限枠に達しています。追加オファー枠をご購入ください。");
    }

    const current = appStore.getOffers();
    const newOffer: StoredOffer = {
      ...offer,
      id: "off-" + Date.now(),
      status: "SENT",
      createdAt: new Date().toLocaleString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    const updated = [newOffer, ...current];
    if (typeof window !== "undefined") {
      localStorage.setItem("jobswipe_offers", JSON.stringify(updated));
    }

    // チャットスレッド＆最初のオファーメッセージを自動生成
    if (typeof window !== "undefined") {
      const studentThreadId = `thread-${offer.companyId || "c1"}`;
      const companyThreadId = `thread-${offer.studentId || "s1"}`;

      // メッセージに追加
      const allMessages = appStore.getMessages();
      const offerMsg: StoredMessage = {
        id: "m-" + Date.now(),
        threadId: studentThreadId,
        senderRole: "COMPANY",
        senderName: offer.companyName,
        content: `【オファーメッセージ】\n${offer.message}`,
        sentAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      const offerMsgCompany: StoredMessage = {
        id: "m-c-" + Date.now(),
        threadId: companyThreadId,
        senderRole: "COMPANY",
        senderName: offer.companyName,
        content: `【オファーメッセージ】\n${offer.message}`,
        sentAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      localStorage.setItem("jobswipe_chat_messages", JSON.stringify([...allMessages, offerMsg, offerMsgCompany]));

      // リアルタイム更新イベント発火
      window.dispatchEvent(new CustomEvent("jobswipe_sync", { detail: { type: "OFFER_SENT", offer: newOffer } }));

      // メール通知APIを非同期トリガー
      fetch("/api/notifications/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "OFFER_RECEIVED",
          recipientRole: "STUDENT",
          recipientName: offer.studentName,
          senderName: offer.companyName,
          title: "特別オファーが届きました！",
          content: offer.message,
        }),
      }).catch(() => {});
    }

    return newOffer;
  },

  updateOfferStatus: (id: string, status: "ACCEPTED" | "DECLINED") => {
    const current = appStore.getOffers();
    const updated = current.map((o) => (o.id === id ? { ...o, status } : o));
    localStorage.setItem("jobswipe_offers", JSON.stringify(updated));
    return updated;
  },

  // スレッドに紐づくオファー情報を取得
  getOfferForThread: (threadId: string): StoredOffer | null => {
    const offers = appStore.getOffers();
    
    // 1. 完全一致チェック (例: thread-c1 -> companyId === "c1", thread-s2 -> studentId === "s2")
    if (threadId.startsWith("thread-c")) {
      const cId = threadId.replace("thread-", "");
      const matched = offers.find((o) => o.companyId === cId);
      if (matched) return matched;
    } else if (threadId.startsWith("thread-s")) {
      const sId = threadId.replace("thread-", "");
      const matched = offers.find((o) => o.studentId === sId);
      if (matched) return matched;
    }

    // 2. 部分一致フォールバック
    const fallback = offers.find((o) => 
      threadId.includes(o.companyId) || 
      threadId.includes(o.studentId)
    );
    return fallback || null;
  },

  // 企業詳細情報マスタ取得
  getCompanyDetails: (companyId: string): CompanyDetail => {
    let savedLogo: string | undefined = undefined;
    if (typeof window !== "undefined") {
      const custom = localStorage.getItem(`jobswipe_company_profile_${companyId}`);
      if (custom) {
        try {
          return JSON.parse(custom);
        } catch {}
      }
      savedLogo = localStorage.getItem(`jobswipe_company_logo_${companyId}`) || undefined;
    }

    const companies: Record<string, CompanyDetail> = {
      c1: {
        id: "c1",
        name: "テックイノベーション株式会社",
        industry: "IT・Webサービス / SaaS",
        logoText: "テ",
        logoUrl: savedLogo,
        catchphrase: "テクノロジーで次世代の社会インフラを再定義する",
        description:
          "テックイノベーションは、独自のクラウドSaaSプラットフォームおよびAI活用ソリューションを展開する急成長ITベンチャーです。若手メンバーが主導権を持ってプロダクト開発・事業推進を行っており、失敗を恐れずスピード感を持って挑戦する文化が根付いています。",
        culture: [
          "フラットで風通しの良い組織風土",
          "自律駆動・成果主義とチームワークの両立",
          "新卒1〜2年目からの新規事業リーダー抜擢",
          "リモートワークと出社のハイブリッド勤務",
        ],
        seeking: [
          "主体的に課題を発見し、解決に向けて行動できる方",
          "新しい技術やトレンドに強い関心と好奇心を持つ方",
          "チームメンバーと誠実かつ前向きに協調できる方",
          "目標達成に向けて粘り強く挑戦し続けられる方",
        ],
        positions: [
          {
            title: "新規事業開発・総合職ポジション",
            type: "新卒採用（正社員）",
            location: "東京都渋谷区（リモート可）",
            salary: "月給 320,000円〜（年俸制）",
            description: "新規SaaSプロダクトの企画立案、アライアンス推進、事業KPI管理を担当します。",
          },
          {
            title: "ソリューションセールス・カスタマーサクセス",
            type: "新卒・サマーインターン",
            location: "東京都渋谷区 / オンライン",
            salary: "時給 1,500円〜 / 正社員登用あり",
            description: "導入企業へのコンサルティング提案および活用支援を通じた事業拡大を担います。",
          },
        ],
        websiteUrl: "https://example.com/tech-innovations",
        established: "2020年10月",
        employees: "120名（平均年齢 28.5歳）",
        location: "東京都渋谷区道玄坂1丁目",
      },
      c2: {
        id: "c2",
        name: "グローバルコンサルティング合同会社",
        industry: "総合コンサルティング / 戦略",
        logoText: "グ",
        logoUrl: savedLogo,
        catchphrase: "グローバル企業の変革を加速するプロフェッショナルファーム",
        description:
          "国内外の大手企業を対象に、DX推進・グローバル展開・組織改革などの高付加価値コンサルティングサービスを提供しています。多国籍なメンバーが所属し、英語力を活かした案件も多数展開しています。",
        culture: [
          "徹底したロジカルシンキングと成果へのコミットメント",
          "グローバル案件への早期アサイン体制",
          "充実したメンター制度・育成研修プログラム",
        ],
        seeking: [
          "高い論理的思考力とコミュニケーション力を持つ方",
          "グローバル環境での活躍に情熱を持つ方",
          "誠実さと高いプロフェッショナリズムを備えた方",
        ],
        positions: [
          {
            title: "ビジネスアナリスト / アソシエイトコンサルタント",
            type: "新卒採用（正社員）",
            location: "東京都千代田区大手町",
            salary: "年俸 5,000,000円〜",
            description: "クライアントの事業戦略策定、市場リサーチ、業務改革プロジェクトの実行支援を担当します。",
          },
        ],
        websiteUrl: "https://example.com/global-consulting",
        established: "2018年4月",
        employees: "85名",
        location: "東京都千代田区大手町1丁目",
      },
      c3: {
        id: "c3",
        name: "ネクストフューチャー株式会社",
        industry: "ベンチャー・スタートアップ / メディア",
        logoText: "ネ",
        logoUrl: savedLogo,
        catchphrase: "Z世代の熱量で、次のスタンダードを創り出す",
        description:
          "SNSマーケティング、クリエイターエコノミー支援、自社メディア事業を展開するスタートアップです。社員の8割が20代で、カルチャーマッチと情熱を最重視した採用を行っています。",
        culture: [
          "失敗を賞賛し、挑戦を称えるカルチャー",
          "服装・髪型完全自由、フラットなコミュニケーション",
          "即決即断のスピード感あふれる意思決定",
        ],
        seeking: [
          "明るくポジティブに周囲を巻き込める方",
          "SNSや動画コンテンツへのアンテナが高い方",
          "自らのアイデアを形にしたい強い情熱がある方",
        ],
        positions: [
          {
            title: "SNSマーケティング・コンテンツディレクター",
            type: "新卒・長期インターン",
            location: "東京都港区南青山",
            salary: "月給 280,000円〜",
            description: "企業のSNSアカウント運用戦略、ショート動画企画、インフルエンサーキャスティングを担当します。",
          },
        ],
        websiteUrl: "https://example.com/next-future",
        established: "2022年3月",
        employees: "45名",
        location: "東京都港区南青山3丁目",
      },
    };

    return (
      companies[companyId] || {
        id: companyId,
        name: "登録企業",
        industry: "IT / サービス",
        logoText: "企",
        logoUrl: savedLogo,
        catchphrase: "人柄を重視した新卒採用を推進中",
        description: "JobSwipeを通じて意欲的な学生との出会いを創出しています。",
        culture: ["フラットな社風", "挑戦を歓迎する環境"],
        seeking: ["前向きで主体的な人材"],
        positions: [
          {
            title: "総合職ポジション",
            type: "新卒採用",
            location: "東京都内",
            salary: "規定により決定",
            description: "希望や適性に応じたポジションを配属します。",
          },
        ],
        websiteUrl: "https://jobswipe.jp",
        established: "2021年",
        employees: "50名",
        location: "東京都内",
      }
    );
  },

  // 企業プロフィール保存
  saveCompanyProfile: (profile: Partial<CompanyDetail> & { id: string }) => {
    if (typeof window === "undefined") return;
    const existing = appStore.getCompanyDetails(profile.id);
    const updated = { ...existing, ...profile };
    localStorage.setItem(`jobswipe_company_profile_${profile.id}`, JSON.stringify(updated));
    if (profile.logoUrl) {
      localStorage.setItem(`jobswipe_company_logo_${profile.id}`, profile.logoUrl);
    }
    window.dispatchEvent(new CustomEvent("jobswipe_sync", { detail: { type: "COMPANY_UPDATED", company: updated } }));
  },

  // 学生詳細情報マスタ取得
  getStudentDetails: (studentId: string): StudentDetail => {
    let savedAvatar: string | undefined = undefined;
    let savedGender: "MALE" | "FEMALE" | "OTHER" | undefined = undefined;

    if (typeof window !== "undefined") {
      const custom = localStorage.getItem(`jobswipe_student_profile_${studentId}`);
      if (custom) {
        try {
          return JSON.parse(custom);
        } catch {}
      }
      savedAvatar = localStorage.getItem(`jobswipe_student_avatar_${studentId}`) || undefined;
      const g = localStorage.getItem(`jobswipe_student_gender_${studentId}`);
      if (g === "MALE" || g === "FEMALE" || g === "OTHER") {
        savedGender = g;
      }
    }

    const students: Record<string, StudentDetail> = {
      s1: {
        id: "s1",
        name: "佐藤 健太",
        gender: savedGender || "MALE",
        university: "早稲田大学",
        faculty: "商学部 3年",
        graduationYear: 2027,
        avatarText: "佐",
        avatarUrl: savedAvatar,
        catchphrase: "体育会サッカー部主将。チームを巻き込む推進力と愚直な行動力が武器です！",
        bio: "体育会サッカー部で100名規模の組織主将を務めています。「誰よりも声を出し、背中で引っ張る」を行動指針に、部員一人ひとりと対話を重ねながらリーグ昇格を果たしました。ビジネスの現場でも、失敗を恐れず主体的に行動し、周囲をポジティブに巻き込めるリーダーを目指しています。",
        personalityTags: ["リーダーシップ", "体育会系", "行動力", "粘り強さ", "ポジティブ", "チームワーク"],
        desiredIndustries: ["IT・Webサービス", "ベンチャー・スタートアップ", "総合営業・セールス"],
        desiredLocations: ["東京都", "神奈川県", "リモートワーク可"],
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        videoTitle: "体育会サッカー部主将としての挑戦と組織推進力",
        videoViews: 142,
        videoLikes: 38,
      },
      s2: {
        id: "s2",
        name: "高橋 美咲",
        gender: savedGender || "FEMALE",
        university: "慶應義塾大学",
        faculty: "総合政策学部 3年",
        graduationYear: 2027,
        avatarText: "高",
        avatarUrl: savedAvatar,
        catchphrase: "SNSマーケティング長期インターンで月間100万PV達成！探求心と笑顔が強みです。",
        bio: "大学1年次よりSNSマーケティングベンチャーでインターンを行い、TikTok・Instagramの企画・分析を担当。ユーザーの心理を徹底的に分析し、再現性のあるコンテンツ設計を実践してきました。誠実なコミュニケーションと笑顔で、相手の懐に飛び込むことが得意です。",
        personalityTags: ["探求心", "笑顔", "コミュニケーション力", "素直さ", "企画提案力"],
        desiredIndustries: ["マーケティング・PR", "IT・Webサービス", "美容・コスメ"],
        desiredLocations: ["東京都", "リモートワーク可"],
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        videoTitle: "SNSマーケティング長期インターンとデータ分析",
        videoViews: 98,
        videoLikes: 26,
      },
      s3: {
        id: "s3",
        name: "伊藤 翼",
        gender: savedGender || "MALE",
        university: "明治大学",
        faculty: "経営学部 2年",
        graduationYear: 2028,
        avatarText: "伊",
        avatarUrl: savedAvatar,
        catchphrase: "留学経験と国際交流イベント主催。多様性を受け入れ自ら先頭を走る行動派！",
        bio: "カナダへの1年間留学を経て、大学では留学生支援イベントを企画・運営。言語やバックグラウンドの異なるメンバーと協働し、信頼関係を築いてきました。物事をポジティブに捉え、困難な状況でも周囲を明るく鼓舞することができます。",
        personalityTags: ["英語対応可", "行動力", "ポジティブ", "傾聴力", "チャレンジ精神"],
        desiredIndustries: ["グローバル・商社", "コンサルティング", "ベンチャー"],
        desiredLocations: ["東京都", "海外勤務希望"],
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        videoTitle: "カナダ留学と国際交流イベントでの挑戦",
        videoViews: 76,
        videoLikes: 19,
      },
    };

    return (
      students[studentId] || {
        id: studentId,
        name: "候補者",
        gender: savedGender || "MALE",
        university: "大学情報",
        faculty: "学部未設定",
        graduationYear: 2027,
        avatarText: "学",
        avatarUrl: savedAvatar,
        catchphrase: "動画で人柄と熱量をアピール中！",
        bio: "自己PR動画を投稿しています。ぜひ動画をご覧ください。",
        personalityTags: ["行動力", "ポジティブ", "笑顔"],
        desiredIndustries: ["IT・Webサービス", "総合職"],
        desiredLocations: ["東京都"],
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        videoTitle: "自己PR動画",
        videoViews: 50,
        videoLikes: 10,
      }
    );
  },

  // 学生プロフィール保存
  saveStudentProfile: (profile: Partial<StudentDetail> & { id: string }) => {
    if (typeof window === "undefined") return;
    const existing = appStore.getStudentDetails(profile.id);
    const updated = { ...existing, ...profile };
    localStorage.setItem(`jobswipe_student_profile_${profile.id}`, JSON.stringify(updated));
    if (profile.avatarUrl) {
      localStorage.setItem(`jobswipe_student_avatar_${profile.id}`, profile.avatarUrl);
    }
    if (profile.gender) {
      localStorage.setItem(`jobswipe_student_gender_${profile.id}`, profile.gender);
    }
    window.dispatchEvent(new CustomEvent("jobswipe_sync", { detail: { type: "STUDENT_UPDATED", student: updated } }));
  },

  // 気になる関連
  getLikes: (): StoredLike[] => {
    if (typeof window === "undefined") return DEFAULT_LIKES;
    const data = localStorage.getItem("jobswipe_likes");
    if (!data) {
      localStorage.setItem("jobswipe_likes", JSON.stringify(DEFAULT_LIKES));
      return DEFAULT_LIKES;
    }
    try {
      return JSON.parse(data);
    } catch {
      return DEFAULT_LIKES;
    }
  },

  addLike: (like: Omit<StoredLike, "id" | "createdAt">) => {
    const current = appStore.getLikes();
    const exists = current.some((l) => l.studentId === like.studentId || l.studentName === like.studentName);
    if (exists) return current;

    const newLike: StoredLike = {
      ...like,
      id: "like-" + Date.now(),
      createdAt: new Date().toLocaleString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
    };
    const updated = [newLike, ...current];
    localStorage.setItem("jobswipe_likes", JSON.stringify(updated));
    return updated;
  },

  removeLike: (studentId: string) => {
    const current = appStore.getLikes();
    const updated = current.filter((l) => l.studentId !== studentId);
    localStorage.setItem("jobswipe_likes", JSON.stringify(updated));
    return updated;
  },

  // チャットスレッド一覧（最新メッセージ・時刻を動的同期）
  getThreads: (isStudentRole: boolean): ChatThread[] => {
    let baseThreads = isStudentRole ? DEFAULT_STUDENT_THREADS : DEFAULT_COMPANY_THREADS;

    if (typeof window !== "undefined") {
      const key = isStudentRole ? "jobswipe_student_threads" : "jobswipe_company_threads";
      const data = localStorage.getItem(key);
      if (data) {
        try {
          baseThreads = JSON.parse(data);
        } catch {
          baseThreads = isStudentRole ? DEFAULT_STUDENT_THREADS : DEFAULT_COMPANY_THREADS;
        }
      }
    }

    // 全メッセージから各スレッドの「最新メッセージ（lastMessage）」と「最新時刻（lastTime）」をリアルタイムに自動算出して反映
    const allMessages = appStore.getMessages();

    return baseThreads.map((thread) => {
      const threadMsgs = allMessages.filter((m) => m.threadId === thread.id);
      if (threadMsgs.length > 0) {
        const lastMsg = threadMsgs[threadMsgs.length - 1];
        let preview = lastMsg.content;
        if (lastMsg.attachment) {
          preview = lastMsg.attachment.type === "pdf" ? `[PDF] ${lastMsg.attachment.name}` : "[画像]";
        }
        return {
          ...thread,
          lastMessage: preview,
          lastTime: lastMsg.sentAt,
        };
      }
      return thread;
    });
  },

  // メッセージ一覧（スレッド単位 & オファーメッセージ先頭保証）
  getMessages: (threadId?: string): StoredMessage[] => {
    let list: StoredMessage[] = DEFAULT_MESSAGES;

    if (typeof window !== "undefined") {
      const version = localStorage.getItem("jobswipe_msg_v");
      const data = localStorage.getItem("jobswipe_chat_messages");

      if (version === "v4" && data) {
        try {
          list = JSON.parse(data);
        } catch {
          list = DEFAULT_MESSAGES;
        }
      } else {
        // v4への自動マイグレーション（オファーメッセージを含む最新DEFAULT_MESSAGESをセット）
        list = DEFAULT_MESSAGES;
        localStorage.setItem("jobswipe_chat_messages", JSON.stringify(DEFAULT_MESSAGES));
        localStorage.setItem("jobswipe_msg_v", "v4");
      }
    }

    if (!threadId) return list;

    let threadMsgs = list.filter((m) => m.threadId === threadId);

    // もしスレッドメッセージにオファーメッセージがまだない場合、オファー情報を先頭に自動追加
    const offer = appStore.getOfferForThread(threadId);
    if (offer && !threadMsgs.some((m) => m.content.includes("オファーメッセージ"))) {
      const initialOfferMsg: StoredMessage = {
        id: `m-offer-${threadId}`,
        threadId,
        senderRole: "COMPANY",
        senderName: offer.companyName,
        content: `【特別オファーメッセージ】\n${offer.message}`,
        sentAt: offer.createdAt.slice(5) || "受信時",
      };
      threadMsgs = [initialOfferMsg, ...threadMsgs];
    }

    return threadMsgs;
  },

  // メッセージ送信
  sendMessage: (
    threadId: string,
    senderRole: "STUDENT" | "COMPANY",
    senderName: string,
    content: string,
    attachment?: MessageAttachment
  ): StoredMessage => {
    const allMessages = appStore.getMessages();
    const newMsg: StoredMessage = {
      id: "m-" + Date.now(),
      threadId,
      senderRole,
      senderName,
      content,
      sentAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      ...(attachment ? { attachment } : {}),
    };
    const updated = [...allMessages, newMsg];
    if (typeof window !== "undefined") {
      localStorage.setItem("jobswipe_chat_messages", JSON.stringify(updated));

      // リアルタイム更新イベント発火
      window.dispatchEvent(new CustomEvent("jobswipe_sync", { detail: { type: "MESSAGE_SENT", message: newMsg } }));

      // メール通知APIを非同期トリガー
      const recipientRole = senderRole === "STUDENT" ? "COMPANY" : "STUDENT";
      fetch("/api/notifications/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "MESSAGE_RECEIVED",
          recipientRole,
          recipientName: senderRole === "STUDENT" ? "採用ご担当者様" : "佐藤 健太 様",
          senderName,
          title: "新着メッセージが届きました",
          content: content.slice(0, 100) + (content.length > 100 ? "..." : ""),
        }),
      }).catch(() => {});
    }
    return newMsg;
  },

  // 追加オファー枠の購入
  addOfferQuota: (additionalCount: number): number => {
    if (typeof window === "undefined") return 50;
    const currentExtra = Number(localStorage.getItem("jobswipe_extra_quota") || "0");
    const updatedExtra = currentExtra + additionalCount;
    localStorage.setItem("jobswipe_extra_quota", String(updatedExtra));
    window.dispatchEvent(new CustomEvent("jobswipe_sync", { detail: { type: "QUOTA_UPDATED" } }));
    return updatedExtra;
  },

  // プラン変更
  changeCompanyPlan: (planName: string, baseQuota: number) => {
    if (typeof window === "undefined") return;
    localStorage.setItem("jobswipe_plan_name", planName);
    localStorage.setItem("jobswipe_base_quota", String(baseQuota));
    window.dispatchEvent(new CustomEvent("jobswipe_sync", { detail: { type: "PLAN_UPDATED" } }));
  },

  // 企業向け利用状況・オファー枠統計
  getCompanyStats: (): CompanyUsageStats => {
    const offers = appStore.getOffers();
    const likes = appStore.getLikes();
    const sentCount = offers.length;
    const acceptedCount = offers.filter((o) => o.status === "ACCEPTED").length;

    let planName = "スタンダードプラン (月50枠)";
    let baseQuota = 50;
    let extraQuota = 0;

    if (typeof window !== "undefined") {
      planName = localStorage.getItem("jobswipe_plan_name") || "スタンダードプラン (月50枠)";
      baseQuota = Number(localStorage.getItem("jobswipe_base_quota") || "50");
      extraQuota = Number(localStorage.getItem("jobswipe_extra_quota") || "0");
    }

    const monthlyQuota = baseQuota + extraQuota;
    const remainingQuota = Math.max(0, monthlyQuota - sentCount);
    const rate = sentCount > 0 ? `${Math.round((acceptedCount / sentCount) * 100)}%` : "0%";

    return {
      planName,
      monthlyQuota,
      sentOffersCount: sentCount,
      remainingQuota,
      totalSwipedVideos: 128 + sentCount + likes.length,
      totalLikedCount: likes.length,
      acceptedOffersCount: acceptedCount,
      acceptanceRate: rate,
      nextResetDate: "2026/09/01",
    };
  },

  // 学生向けPR動画の視聴数・反響アナリティクス統計
  getStudentVideoStats: (): StudentVideoStats => {
    const offers = appStore.getOffers();
    const offersCount = offers.length;
    const likesCount = 18;
    const totalViews = 142;

    return {
      totalViews,
      totalLikes: likesCount,
      totalOffers: offersCount,
      completionRate: "84%",
    };
  },

  // お問い合わせ一覧の取得
  getInquiries: (): StoredInquiry[] => {
    if (typeof window === "undefined") return DEFAULT_INQUIRIES;
    const data = localStorage.getItem("jobswipe_inquiries");
    if (data) {
      try {
        return JSON.parse(data);
      } catch {
        return DEFAULT_INQUIRIES;
      }
    }
    localStorage.setItem("jobswipe_inquiries", JSON.stringify(DEFAULT_INQUIRIES));
    return DEFAULT_INQUIRIES;
  },

  // お問い合わせの追加
  addInquiry: (inquiryData: Omit<StoredInquiry, "id" | "receiptNumber" | "createdAt" | "status">): StoredInquiry => {
    const all = appStore.getInquiries();
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const receiptNumber = `JS-${dateStr}-${randomNum}`;

    const newInquiry: StoredInquiry = {
      ...inquiryData,
      id: "inq-" + Date.now(),
      receiptNumber,
      status: "UNTOUCHED",
      createdAt: now.toLocaleString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updated = [newInquiry, ...all];
    if (typeof window !== "undefined") {
      localStorage.setItem("jobswipe_inquiries", JSON.stringify(updated));
    }
    return newInquiry;
  },

  // お問い合わせステータス更新
  updateInquiryStatus: (id: string, status: "UNTOUCHED" | "IN_PROGRESS" | "RESOLVED") => {
    const all = appStore.getInquiries();
    const updated = all.map((item) => (item.id === id ? { ...item, status } : item));
    if (typeof window !== "undefined") {
      localStorage.setItem("jobswipe_inquiries", JSON.stringify(updated));
    }
    return updated;
  },

  // =========================================================================
  // 通知（Notifications）管理
  // =========================================================================
  getNotifications: (role?: "STUDENT" | "COMPANY"): NotificationItem[] => {
    if (typeof window === "undefined") return DEFAULT_NOTIFICATIONS;
    const raw = localStorage.getItem("jobswipe_notifications");
    if (!raw) {
      localStorage.setItem("jobswipe_notifications", JSON.stringify(DEFAULT_NOTIFICATIONS));
      return role
        ? DEFAULT_NOTIFICATIONS.filter((n) => n.role === role)
        : DEFAULT_NOTIFICATIONS;
    }
    try {
      const parsed: NotificationItem[] = JSON.parse(raw);
      return role ? parsed.filter((n) => n.role === role) : parsed;
    } catch {
      return role
        ? DEFAULT_NOTIFICATIONS.filter((n) => n.role === role)
        : DEFAULT_NOTIFICATIONS;
    }
  },

  markNotificationAsRead: (id: string) => {
    const all = appStore.getNotifications();
    const updated = all.map((n) => (n.id === id ? { ...n, isRead: true } : n));
    if (typeof window !== "undefined") {
      localStorage.setItem("jobswipe_notifications", JSON.stringify(updated));
    }
    return updated;
  },

  markAllNotificationsAsRead: (role: "STUDENT" | "COMPANY") => {
    const all = appStore.getNotifications();
    const updated = all.map((n) => (n.role === role ? { ...n, isRead: true } : n));
    if (typeof window !== "undefined") {
      localStorage.setItem("jobswipe_notifications", JSON.stringify(updated));
    }
    return updated;
  },

  getUnreadNotificationCount: (role: "STUDENT" | "COMPANY"): number => {
    const list = appStore.getNotifications(role);
    return list.filter((n) => !n.isRead).length;
  },

  addNotification: (item: Omit<NotificationItem, "id" | "isRead" | "createdAt">) => {
    const all = appStore.getNotifications();
    const newNotif: NotificationItem = {
      ...item,
      id: "notif-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
      isRead: false,
      createdAt: new Date().toLocaleString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    const updated = [newNotif, ...all];
    if (typeof window !== "undefined") {
      localStorage.setItem("jobswipe_notifications", JSON.stringify(updated));
    }
    return newNotif;
  },

  // =========================================================================
  // 🛡️ 通報・モデレーション管理
  // =========================================================================
  getReports(): StoredReport[] {
    if (typeof window === "undefined") return DEFAULT_REPORTS;
    const raw = localStorage.getItem("jobswipe_reports");
    if (!raw) {
      localStorage.setItem("jobswipe_reports", JSON.stringify(DEFAULT_REPORTS));
      return DEFAULT_REPORTS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_REPORTS;
    }
  },

  addReport(report: Omit<StoredReport, "id" | "status" | "createdAt">): StoredReport {
    const all = this.getReports();
    const newReport: StoredReport = {
      ...report,
      id: `rep-${Date.now()}`,
      status: "PENDING",
      createdAt: new Date().toLocaleString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    const updated = [newReport, ...all];
    if (typeof window !== "undefined") {
      localStorage.setItem("jobswipe_reports", JSON.stringify(updated));
    }
    return newReport;
  },

  updateReportStatus(reportId: string, status: StoredReport["status"], actionTaken?: string): void {
    const all = this.getReports();
    const updated = all.map((r) =>
      r.id === reportId ? { ...r, status, actionTaken: actionTaken || r.actionTaken } : r
    );
    if (typeof window !== "undefined") {
      localStorage.setItem("jobswipe_reports", JSON.stringify(updated));
    }
  },

  isUserBanned(userId: string): boolean {
    if (typeof window === "undefined") return false;
    const banned = localStorage.getItem(`jobswipe_banned_user_${userId}`);
    return banned === "true";
  },

  banUser(userId: string, reason?: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(`jobswipe_banned_user_${userId}`, "true");
      if (reason) {
        localStorage.setItem(`jobswipe_ban_reason_${userId}`, reason);
      }
    }
  },

  unbanUser(userId: string): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(`jobswipe_banned_user_${userId}`);
      localStorage.removeItem(`jobswipe_ban_reason_${userId}`);
    }
  },

  isVideoHidden(videoId: string): boolean {
    if (typeof window === "undefined") return false;
    const hidden = localStorage.getItem(`jobswipe_hidden_video_${videoId}`);
    return hidden === "true";
  },

  hideVideo(videoId: string, reason?: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(`jobswipe_hidden_video_${videoId}`, "true");
      if (reason) {
        localStorage.setItem(`jobswipe_hide_reason_${videoId}`, reason);
      }
    }
  },

  unhideVideo(videoId: string): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(`jobswipe_hidden_video_${videoId}`);
      localStorage.removeItem(`jobswipe_hide_reason_${videoId}`);
    }
  },
};

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-s-1",
    role: "STUDENT",
    type: "OFFER_RECEIVED",
    title: "テックイノベーション株式会社からオファーが届きました！",
    content: "「動画を拝見しました！チームでのリーダーシップと技術への熱意に大変共感いたしました。」",
    linkUrl: "/student/offers",
    isRead: false,
    createdAt: "2026/08/29 14:00",
  },
  {
    id: "notif-s-2",
    role: "STUDENT",
    type: "MESSAGE_RECEIVED",
    title: "グローバル・コンサルティング株式会社から新着メッセージがあります",
    content: "「ご案内ありがとうございます！面談の日程について承知いたしました。」",
    linkUrl: "/company/chat",
    isRead: false,
    createdAt: "2026/08/29 12:30",
  },
  {
    id: "notif-s-3",
    role: "STUDENT",
    type: "LIKE_RECEIVED",
    title: "株式会社サイバー・イノベーションがあなたの動画に「気になる」を押しました",
    content: "企業がスカウト検討リストに追加しました。オファーが届くまでお待ちください。",
    linkUrl: "/student/video",
    isRead: true,
    createdAt: "2026/08/28 17:45",
  },
  {
    id: "notif-c-1",
    role: "COMPANY",
    type: "OFFER_ACCEPTED",
    title: "佐藤 健太 さんがオファーを承諾しました！",
    content: "マッチングが成立しました。Webチャットで日程を調整してカジュアル面談へ進みましょう。",
    linkUrl: "/company/chat",
    isRead: false,
    createdAt: "2026/08/29 14:10",
  },
  {
    id: "notif-c-2",
    role: "COMPANY",
    type: "MESSAGE_RECEIVED",
    title: "佐藤 健太 さんから新着メッセージがあります",
    content: "「面談の日程について、以下で調整可能でしょうか？・第1希望: 8月31日...」",
    linkUrl: "/company/chat",
    isRead: false,
    createdAt: "2026/08/29 14:30",
  },
  {
    id: "notif-c-3",
    role: "COMPANY",
    type: "SYSTEM_NOTICE",
    title: "今月のオファー枠（残り8枠）のご案内",
    content: "アクティブな学生PR動画が新たに12件追加されました。スワイプで候補者を発掘しましょう。",
    linkUrl: "/swipe",
    isRead: true,
    createdAt: "2026/08/28 10:00",
  },
];

const DEFAULT_INQUIRIES: StoredInquiry[] = [
  {
    id: "inq-1",
    receiptNumber: "JS-20260829-1082",
    userType: "company",
    senderName: "株式会社ネクストフロンティア",
    repName: "山田 太郎",
    department: "人事採用部",
    email: "t.yamada@example.co.jp",
    phone: "03-1234-5678",
    inquiryType: "オファー枠の追加・料金プラン相談",
    message: "現在のスタンダードプランから月間100枠のエンタープライズプランへのアップグレードを検討しております。見積もりとお手続きの流れについて教えていただけますでしょうか。",
    status: "UNTOUCHED",
    createdAt: "2026/08/29 16:30",
  },
  {
    id: "inq-2",
    receiptNumber: "JS-20260829-1055",
    userType: "student",
    senderName: "鈴木 結衣",
    university: "慶應義塾大学 総合政策学部",
    email: "yui.suzuki@example.com",
    phone: "090-9876-5432",
    inquiryType: "動画の撮り方・お題について",
    message: "動画投稿でおすすめの撮影機材や、アピールポイントのまとめ方について詳しくアドバイスをいただきたいです。",
    status: "IN_PROGRESS",
    createdAt: "2026/08/29 14:15",
  },
  {
    id: "inq-3",
    receiptNumber: "JS-20260828-9842",
    userType: "company",
    senderName: "グローバルメディア株式会社",
    repName: "佐藤 次郎",
    department: "新卒採用担当",
    email: "recruit@global-media.example.com",
    phone: "06-6789-0123",
    inquiryType: "資料請求・サービス概要",
    message: "サービス紹介資料および導入事例のPDFをお送りいただけますと幸いです。",
    status: "RESOLVED",
    createdAt: "2026/08/28 11:00",
  },
];

const DEFAULT_REPORTS: StoredReport[] = [
  {
    id: "rep-1",
    targetType: "VIDEO",
    targetId: "v-demo-4",
    targetTitle: "不審な動画投稿（サンプルフラグ）",
    targetPreview: "自己PR動画の音声に過度なノイズおよび規約に抵触する可能性があるコンテンツ",
    reporterName: "テックイノベーション株式会社",
    reason: "INAPPROPRIATE_CONTENT",
    reasonText: "不適切な動画・コンテンツ",
    details: "動画内で利用規約に反する表現が含まれているため確認をお願いします。",
    status: "PENDING",
    createdAt: "2026/08/29 17:00",
  },
  {
    id: "rep-2",
    targetType: "CHAT",
    targetId: "thread-c99",
    targetTitle: "迷惑メッセージの通報",
    targetPreview: "面接とは無関係な投資勧誘メッセージの送信",
    reporterName: "佐藤 健太",
    reason: "HARASSMENT",
    reasonText: "就活セクハラ・迷惑行為・勧誘",
    details: "採用活動と関係のない外部有料セミナーへの誘導が行われました。",
    status: "RESOLVED",
    actionTaken: "対象アカウントの利用一時停止",
    createdAt: "2026/08/28 14:30",
  },
];
