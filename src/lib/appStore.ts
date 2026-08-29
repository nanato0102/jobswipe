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

export interface StoredMessage {
  id: string;
  offerId?: string;
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

const DEFAULT_OFFERS: StoredOffer[] = [
  {
    id: "off-1",
    companyId: "c1",
    companyName: "テックイノベーション株式会社",
    industry: "IT / Webサービス",
    studentId: "s1",
    studentName: "佐藤 健太",
    message: "動画を拝見しました！チームでのリーダーシップと技術への熱意に大変共感いたしました。ぜひ一度カジュアル面談でお話しさせてください。",
    status: "SENT",
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
];

const DEFAULT_MESSAGES: StoredMessage[] = [
  {
    id: "m-1",
    senderRole: "COMPANY",
    senderName: "テックイノベーション株式会社",
    content: "佐藤さん、はじめまして！動画を拝見し、体育会での主将経験と推進力に大変感銘を受けました。弊社の新規事業部にて一度カジュアル面談でお話ししませんか？",
    sentAt: "14:00",
  },
  {
    id: "m-2",
    senderRole: "STUDENT",
    senderName: "佐藤 健太",
    content: "オファーいただき誠にありがとうございます！自己PR動画を見ていただき大変嬉しいです。ぜひカジュアル面談でお話しさせていただけますと幸いです。",
    sentAt: "14:15",
  },
  {
    id: "m-3",
    senderRole: "COMPANY",
    senderName: "テックイノベーション株式会社",
    content: "ご快諾ありがとうございます！来週の平日（火曜または木曜の16:00以降など）でご都合の良い日時はございますでしょうか？",
    sentAt: "14:30",
  },
];

const DEFAULT_LIKES: StoredLike[] = [
  {
    id: "like-1",
    studentId: "s1",
    studentName: "佐藤 健太",
    university: "早稲田大学 商学部",
    graduationYear: 2026,
    bio: "体育会サッカー部主将。組織づくりと目標達成に向けた推進力に自信があります。",
    tags: ["体育会", "リーダーシップ", "粘り強さ", "行動力"],
    videoTitle: "体育会サッカー部主将 / チームを牽引する行動力",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    createdAt: "2026/08/29 10:00",
  },
  {
    id: "like-2",
    studentId: "s2",
    studentName: "高橋 美咲",
    university: "上智大学 外国語学部",
    graduationYear: 2026,
    bio: "カナダ留学経験者。TOEIC 920点。異文化コミュニケーションと明るい接客が得意です。",
    tags: ["留学経験", "英語対応可", "笑顔"],
    videoTitle: "1年間のカナダ留学と英語でのプレゼンテーション力",
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

  // チャット関連
  getMessages: (): StoredMessage[] => {
    if (typeof window === "undefined") return DEFAULT_MESSAGES;
    const data = localStorage.getItem("jobswipe_chat_messages");
    if (!data) {
      localStorage.setItem("jobswipe_chat_messages", JSON.stringify(DEFAULT_MESSAGES));
      return DEFAULT_MESSAGES;
    }
    try {
      return JSON.parse(data);
    } catch {
      return DEFAULT_MESSAGES;
    }
  },

  sendMessage: (senderRole: "STUDENT" | "COMPANY", senderName: string, content: string): StoredMessage => {
    const current = appStore.getMessages();
    const newMsg: StoredMessage = {
      id: "m-" + Date.now(),
      senderRole,
      senderName,
      content,
      sentAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [...current, newMsg];
    localStorage.setItem("jobswipe_chat_messages", JSON.stringify(updated));
    return newMsg;
  },
};