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
    return newOffer;
  },

  updateOfferStatus: (id: string, status: "ACCEPTED" | "DECLINED") => {
    const current = appStore.getOffers();
    const updated = current.map((o) => (o.id === id ? { ...o, status } : o));
    localStorage.setItem("jobswipe_offers", JSON.stringify(updated));
    return updated;
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
};
