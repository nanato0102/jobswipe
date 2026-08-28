"use client";

import { useEffect, useState } from "react";
import SwipeCard from "@/components/SwipeCard";
import type { VideoData } from "@/types";
import { Sparkles, RefreshCw } from "lucide-react";

// デモ用デフォルト動画
const DEFAULT_VIDEOS: VideoData[] = [
  {
    id: "v1",
    studentId: "s1",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnailUrl: null,
    title: "体育会サッカー部主将 / チームを牽引する行動力",
    description: "大学4年間、体育会サッカー部の主将として100名規模の組織マネジメントを経験しました。困難な状況でも周囲を巻き込み、粘り強く結果を出す行動力が私の強みです！",
    tags: "体育会, リーダーシップ, 粘り強さ, 行動力",
    uploadedAt: new Date(),
    student: {
      id: "s1",
      fullName: "佐藤 健太",
      university: "早稲田大学 商学部",
      graduationYear: 2026,
      bio: "体育会サッカー部主将。組織づくりと目標達成に向けた推進力に自信があります。",
      skills: "リーダーシップ, 組織マネジメント, 課題解決力",
      experience: "体育会サッカー部 主将 / カフェ店舗リーダー",
    },
  },
  {
    id: "v2",
    studentId: "s2",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    thumbnailUrl: null,
    title: "1年間のカナダ留学と英語でのプレゼンテーション力",
    description: "カナダでの1年間の交換留学を経て、多国籍なチームでのプロジェクト推進やプレゼンを多数経験しました。何事にも前向きに挑戦する明るい笑顔がチャームポイントです。",
    tags: "留学経験, 英語対応可, 笑顔, コミュニケーション",
    uploadedAt: new Date(),
    student: {
      id: "s2",
      fullName: "高橋 美咲",
      university: "上智大学 外国語学部",
      graduationYear: 2026,
      bio: "カナダ留学経験者。TOEIC 920点。異文化コミュニケーションと明るい接客が得意です。",
      skills: "ビジネス英語, 異文化理解, ファシリテーション",
      experience: "カナダ交換留学 / インバウンド観光案内ボランティア",
    },
  },
  {
    id: "v3",
    studentId: "s3",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    thumbnailUrl: null,
    title: "Webアプリ開発とハッカソン優勝経験",
    description: "情報科学を専攻し、Next.jsやPythonを用いたWebサービス開発を行っています。技術で世の中の不便を解決することに強い情熱を持っています。",
    tags: "エンジニア志望, Web開発, ハッカソン, 好奇心旺盛",
    uploadedAt: new Date(),
    student: {
      id: "s3",
      fullName: "中村 蓮",
      university: "東京工業大学 情報理工学院",
      graduationYear: 2026,
      bio: "大学でフルスタック開発を学習中。技育CAMPハッカソン優秀賞受賞。",
      skills: "Next.js, TypeScript, Python, AWS",
      experience: "受託開発インターン / ハッカソン入賞",
    },
  },
];

export default function SwipePage() {
  const [videos, setVideos] = useState<VideoData[]>(DEFAULT_VIDEOS);
  const [loading, setLoading] = useState(false);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/videos");
      if (res.ok) {
        const data = await res.json();
        if (data.videos && data.videos.length > 0) {
          setVideos(data.videos);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleLike = async (video: VideoData) => {
    try {
      await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: video.studentId }),
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleOffer = async (video: VideoData, message: string) => {
    try {
      await fetch("/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: video.studentId, message }),
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex-1 py-8 px-4 sm:px-6 max-w-4xl mx-auto w-full flex flex-col items-center">
      <div className="w-full max-w-md mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-900 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-slate-700" />
            <span>学生PR動画スワイプ</span>
          </h1>
          <p className="text-xs text-slate-500">直感的に動画を見て「気になる」または「オファー」</p>
        </div>

        <button
          onClick={fetchVideos}
          disabled={loading}
          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
          title="更新"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      <SwipeCard videos={videos} onLike={handleLike} onOffer={handleOffer} />
    </div>
  );
}
