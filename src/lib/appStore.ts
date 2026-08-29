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

export interface StoredMessage {
  id: string;
  threadId: string;
  senderRole: "STUDENT" | "COMPANY";
  senderName: string;
  content: string;
  sentAt: string;
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

const DEFAULT_OFFERS: StoredOffer[] = [
  {
    id: "off-1",
    companyId: "c1",
    companyName: "テックイノベーション株式会社",
    industry: "IT・Webサービス",
    studentId: "s1",
    studentName: "佐藤 健太",
    message: "動画を拝見しました！チームでのリーダーシップと技術への熱意に大変共感いたしました。ぜひ一度カジュアル面談でお話しさせてください。",
    status: "ACCEPTED",
    createdAt: "2026/08/28 14:00",
  },
  {
    id: "off-2",
    companyId: "c2",
    companyName: "グローバルコンサルティング合同会社",
    industry: "コンサルティング",
    studentId: "s1",
    studentName: "佐藤 健太",
    message: "英語力と前向きな姿勢が弊社のグローバル案件推進にマッチすると感じました。特別選考ルートをご案内いたします。",
    status: "ACCEPTED",
    createdAt: "2026/08/25 10:30",
  },
  {
    id: "off-3",
    companyId: "c3",
    companyName: "ネクストフューチャー株式会社",
    industry: "ベンチャー・スタートアップ",
    studentId: "s1",
    studentName: "佐藤 健太",
    message: "動画の明るい人柄とチャレンジ精神に惹かれました。代表とのカジュアル面談枠を確保いたしましたので、ぜひお話ししましょう！",
    status: "ACCEPTED",
    createdAt: "2026/08/29 11:00",
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
  {
    id: "m-1",
    threadId: "thread-c1",
    senderRole: "COMPANY",
    senderName: "テックイノベーション株式会社",
    content: "佐藤さん、はじめまして！動画を拝見し、明るい人柄と推進力に大変感銘を受けました。弊社の新規事業チームにて一度カジュアルにお話ししませんか？",
    sentAt: "14:00",
  },
  {
    id: "m-2",
    threadId: "thread-c1",
    senderRole: "STUDENT",
    senderName: "佐藤 健太",
    content: "オファーいただき誠にありがとうございます！短尺動画を見ていただき大変嬉しいです。ぜひカジュアル面談でお話しさせていただけますと幸いです。",
    sentAt: "14:15",
  },
  {
    id: "m-3",
    threadId: "thread-c1",
    senderRole: "COMPANY",
    senderName: "テックイノベーション株式会社",
    content: "ご快諾ありがとうございます！来週の平日（火曜または木曜の16:00以降など）でご都合の良い日時はございますでしょうか？",
    sentAt: "14:30",
  },
  // thread-s1 (企業側視点での佐藤健太さんスレッド)
  {
    id: "m-s1-1",
    threadId: "thread-s1",
    senderRole: "COMPANY",
    senderName: "テックイノベーション株式会社",
    content: "佐藤さん、はじめまして！動画を拝見し、明るい人柄と推進力に大変感銘を受けました。弊社の新規事業チームにて一度カジュアルにお話ししませんか？",
    sentAt: "14:00",
  },
  {
    id: "m-s1-2",
    threadId: "thread-s1",
    senderRole: "STUDENT",
    senderName: "佐藤 健太",
    content: "オファーいただき誠にありがとうございます！ぜひ一度お話しさせていただけますと幸いです。",
    sentAt: "14:15",
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

  sendOffer: (offer: Omit<StoredOffer, "id" | "createdAt" | "status">): StoredOffer => {
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
    localStorage.setItem("jobswipe_offers", JSON.stringify(updated));

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
    // threadId が thread-c1 / thread-s1 などの形式
    const matched = offers.find((o) => 
      threadId === `thread-${o.companyId}` || 
      threadId === `thread-${o.studentId}` ||
      threadId.includes(o.companyId) ||
      threadId.includes(o.studentId)
    );
    return matched || (offers.length > 0 ? offers[0] : null);
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

  // チャットスレッド一覧
  getThreads: (isStudentRole: boolean): ChatThread[] => {
    if (typeof window === "undefined") {
      return isStudentRole ? DEFAULT_STUDENT_THREADS : DEFAULT_COMPANY_THREADS;
    }
    const key = isStudentRole ? "jobswipe_student_threads" : "jobswipe_company_threads";
    const initial = isStudentRole ? DEFAULT_STUDENT_THREADS : DEFAULT_COMPANY_THREADS;
    const data = localStorage.getItem(key);
    if (!data) {
      localStorage.setItem(key, JSON.stringify(initial));
      return initial;
    }
    try {
      return JSON.parse(data);
    } catch {
      return initial;
    }
  },

  // メッセージ一覧（スレッド単位）
  getMessages: (threadId?: string): StoredMessage[] => {
    if (typeof window === "undefined") {
      return threadId ? DEFAULT_MESSAGES.filter((m) => m.threadId === threadId) : DEFAULT_MESSAGES;
    }
    const data = localStorage.getItem("jobswipe_chat_messages");
    let list = DEFAULT_MESSAGES;
    if (data) {
      try {
        list = JSON.parse(data);
      } catch {
        list = DEFAULT_MESSAGES;
      }
    } else {
      localStorage.setItem("jobswipe_chat_messages", JSON.stringify(DEFAULT_MESSAGES));
    }
    return threadId ? list.filter((m) => m.threadId === threadId) : list;
  },

  // メッセージ送信
  sendMessage: (
    threadId: string,
    senderRole: "STUDENT" | "COMPANY",
    senderName: string,
    content: string
  ): StoredMessage => {
    const allMessages = appStore.getMessages();
    const newMsg: StoredMessage = {
      id: "m-" + Date.now(),
      threadId,
      senderRole,
      senderName,
      content,
      sentAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [...allMessages, newMsg];
    localStorage.setItem("jobswipe_chat_messages", JSON.stringify(updated));
    return newMsg;
  },

  // 企業向け利用状況・オファー枠統計
  getCompanyStats: (): CompanyUsageStats => {
    const offers = appStore.getOffers();
    const likes = appStore.getLikes();
    const sentCount = offers.length;
    const acceptedCount = offers.filter((o) => o.status === "ACCEPTED").length;
    const monthlyQuota = 50;
    const remainingQuota = Math.max(0, monthlyQuota - sentCount);
    const rate = sentCount > 0 ? `${Math.round((acceptedCount / sentCount) * 100)}%` : "0%";

    return {
      planName: "スタンダードプラン (月50枠)",
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
