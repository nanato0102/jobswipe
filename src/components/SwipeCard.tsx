"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { appStore } from "@/lib/appStore";
import { useToast } from "@/context/ToastContext";
import {
  Heart,
  Send,
  User,
  GraduationCap,
  Sparkles,
  Check,
  Volume2,
  VolumeX,
  Play,
  ChevronUp,
  ChevronDown,
  Info,
  X,
  Briefcase,
  RotateCcw,
  Flag,
  Lock,
  Compass,
  FileText,
} from "lucide-react";
import type { VideoData } from "@/types";
import ReportModal from "@/components/ReportModal";
import { PERSONALITY_16_TYPES } from "@/lib/personalityModel";

// 段階的情報開示（イニシャル変換ヘルパー）
export function getMaskedStudentName(fullName?: string | null): string {
  if (!fullName) return "学生ユーザー";
  const nameMap: Record<string, string> = {
    "佐藤 健太": "S.Kさん",
    "高橋 美咲": "M.Tさん",
    "伊藤 翼": "T.Iさん",
    "渡辺 葵": "A.Wさん",
    "鈴木 拓海": "T.Sさん",
    "小林 結衣": "Y.Kさん",
  };
  if (nameMap[fullName]) return nameMap[fullName];
  const parts = fullName.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0]}.${parts[1][0]}さん`;
  }
  return `${fullName[0]}..さん`;
}

// スカウトオファーの定型文テンプレート
const OFFER_TEMPLATES = [
  {
    id: "casual",
    title: "カジュアル面談",
    text: "自己PR動画を拝見いたしました。動画から伝わる明るく前向きな雰囲気に非常に惹かれました。まずは選考ではなく、弊社の事業やカルチャーについてカジュアルにお話ししませんか？",
  },
  {
    id: "special",
    title: "特別選考（面接確約）",
    text: "自己PR動画で語られていた課題解決力・推進力に大変魅力を感じました。ぜひ弊社の幹部候補・新卒採用ポジションとしてお迎えしたく、書類選考免除の特別面談をご案内いたします。",
  },
  {
    id: "intern",
    title: "インターン相談",
    text: "動画を拝見し、実践的なスキルと意欲の高さに感銘を受けました。もしご興味があれば、弊社のプロジェクトに参加できる実践型インターンシップについて一度お話しさせてください。",
  },
];

interface SwipeCardProps {
  videos: VideoData[];
  onLike?: (video: VideoData) => void;
  onOffer?: (video: VideoData, message: string) => void;
}

export default function SwipeCard({ videos, onLike, onOffer }: SwipeCardProps) {
  const { session } = useAuth();
  const { success, info } = useToast();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [historyStack, setHistoryStack] = useState<number[]>([]);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [offerMessage, setOfferMessage] = useState("");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // スワイプフィードバックスタンプ（LIKE / SKIP）
  const [swipeFeedback, setSwipeFeedback] = useState<"LIKE" | "SKIP" | null>(null);

  // ドラッグ＆スワイプ物理アニメーション状態
  const [dragOffsetY, setDragOffsetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef<number | null>(null);

  // 動画再生・音声・進行度
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const videoRef = useRef<HTMLVideoElement>(null);

  const currentVideo = videos && videos.length > 0 ? videos[currentIndex % videos.length] : null;
  const isLiked = currentVideo ? !!likedMap[currentVideo.id] : false;

  // 学生の4軸詳細を取得
  const currentStudentId = currentVideo?.student?.id || currentVideo?.studentId || "s1";
  const studentDetail = appStore.getStudentDetails(currentStudentId);

  const personalityTags =
    studentDetail?.personalityTags && studentDetail.personalityTags.length > 0
      ? studentDetail.personalityTags
      : currentVideo?.tags
      ? currentVideo.tags.split(",").map((t) => t.trim()).filter(Boolean)
      : ["発信・オープン型", "現実・着実型", "論理・合理型", "柔軟・スピード型"];

  const personalityCode = studentDetail?.personalityCode || "ESTP";
  const personalityProfile = PERSONALITY_16_TYPES[personalityCode] || PERSONALITY_16_TYPES.ESTP;

  // 志望職種（希望ポジション）の取得
  const studentRoles =
    studentDetail?.desiredRoles && studentDetail.desiredRoles.length > 0
      ? studentDetail.desiredRoles
      : currentVideo?.student?.desiredRoles
      ? currentVideo.student.desiredRoles.split(",").map((r) => r.trim()).filter(Boolean)
      : ["総合職・ビジネス総合"];

  const triggerFeedback = (type: "LIKE" | "SKIP") => {
    setSwipeFeedback(type);
    setTimeout(() => {
      setSwipeFeedback(null);
    }, 600);
  };

  const handleNext = useCallback(
    (action?: "LIKE" | "SKIP") => {
      setStatusMessage(null);
      if (action) triggerFeedback(action);
      setHistoryStack((prev) => [...prev, currentIndex]);
      setDragOffsetY(0);
      setIsDragging(false);
      setProgressPercent(0);
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    },
    [currentIndex, videos.length]
  );

  const handlePrev = useCallback(() => {
    setStatusMessage(null);
    setDragOffsetY(0);
    setIsDragging(false);
    setProgressPercent(0);
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  }, [videos.length]);

  // 1つ戻る（Undo / リワインド）
  const handleUndo = () => {
    if (historyStack.length === 0) return;
    const prevIdx = historyStack[historyStack.length - 1];
    setHistoryStack((prev) => prev.slice(0, prev.length - 1));
    setProgressPercent(0);
    setCurrentIndex(prevIdx);
    info("前の動画に戻りました");
  };

  // インデックス変更時に動画を再ロード・再生
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.playbackRate = playbackRate;
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [currentIndex, playbackRate, isPlaying]);

  // 動画再生プログレスバー更新
  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setProgressPercent((current / total) * 100);
    }
  };

  // キーボードショートカット（PC操作性向上: ↑↓, J/K, Space, L）
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        isOfferModalOpen ||
        isProfileModalOpen ||
        isReportModalOpen
      ) {
        return;
      }

      if (e.key === "ArrowDown" || e.key === "j" || e.key === "J" || e.key === "PageDown") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowUp" || e.key === "k" || e.key === "K" || e.key === "PageUp") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      } else if (e.key === "l" || e.key === "L") {
        e.preventDefault();
        handleLike();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, isPlaying, isOfferModalOpen, isProfileModalOpen, isReportModalOpen]);

  if (!videos || videos.length === 0 || !currentVideo) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white border border-slate-200/90 rounded-xl shadow-xs text-center max-w-md mx-auto my-8">
        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
          <Sparkles className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900 mb-1">条件に合う動画がありません</h3>
        <p className="text-sm text-slate-500">人柄フィルターの条件を変更するか、解除してください。</p>
      </div>
    );
  }

  // タッチ & マウス ドラッグ（物理スワイプ）制御
  const onPointerDown = (clientY: number) => {
    dragStartY.current = clientY;
    setIsDragging(true);
  };

  const onPointerMove = (clientY: number) => {
    if (dragStartY.current === null || !isDragging) return;
    const delta = clientY - dragStartY.current;
    // 抵抗感を持たせた移動
    setDragOffsetY(delta * 0.7);
  };

  const onPointerUp = () => {
    if (dragStartY.current === null) return;
    const threshold = 60; // 60px以上でスワイプ実行

    if (dragOffsetY < -threshold) {
      handleNext();
    } else if (dragOffsetY > threshold) {
      handlePrev();
    } else {
      // 元の位置に戻す
      setDragOffsetY(0);
    }

    dragStartY.current = null;
    setIsDragging(false);
  };

  // タップで再生 / 一時停止
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  // ミュート切り替え
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
    if (!newMuted) {
      success("音声をONにしました", "スピーカー音量にご注意ください。");
    }
  };

  // 倍速再生切り替え
  const togglePlaybackRate = (e: React.MouseEvent) => {
    e.stopPropagation();
    const rates = [1.0, 1.25, 1.5, 2.0];
    const currentRateIdx = rates.indexOf(playbackRate);
    const nextRate = rates[(currentRateIdx + 1) % rates.length];
    setPlaybackRate(nextRate);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextRate;
    }
    info(`再生速度: ${nextRate}x`);
  };

  // いいね（気になる）
  const handleLike = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (onLike) {
      onLike(currentVideo);
    }

    const studentName = currentVideo.student?.fullName || "学生ユーザー";

    appStore.addLike({
      studentId: currentVideo.student?.id || currentVideo.studentId,
      studentName,
      university: currentVideo.student?.university || "大学情報なし",
      graduationYear: currentVideo.student?.graduationYear || 2027,
      bio: currentVideo.student?.bio || "",
      tags: personalityTags,
      videoTitle: currentVideo.title,
      videoUrl: currentVideo.videoUrl,
    });

    setLikedMap((prev) => ({ ...prev, [currentVideo.id]: true }));
    success("気になる！に追加しました", `${studentName} さんの動画を保存しました。`);
  };

  // オファー送信
  const handleSendOffer = () => {
    if (!offerMessage.trim()) return;

    const companyName = session?.name || "自社採用担当";
    const studentName = currentVideo.student?.fullName || "学生ユーザー";

    try {
      if (onOffer) {
        onOffer(currentVideo, offerMessage);
      }

      appStore.sendOffer({
        companyId: session?.id || "c1",
        companyName,
        industry: "IT / Webサービス",
        studentId: currentVideo.student?.id || currentVideo.studentId,
        studentName,
        message: offerMessage.trim(),
      });

      setIsOfferModalOpen(false);
      setOfferMessage("");
      setSelectedTemplateId(null);
      success("スカウトオファーを送信しました！", `${studentName} さんに届きました。`);
      setTimeout(() => {
        handleNext();
      }, 600);
    } catch (err: any) {
      setIsOfferModalOpen(false);
      alert("【オファー上限到達】\n" + (err.message || "今月のオファー上限枠に達しています。利用状況ページより枠を追加してください。"));
    }
  };

  const applyTemplate = (template: typeof OFFER_TEMPLATES[0]) => {
    setSelectedTemplateId(template.id);
    setOfferMessage(template.text);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center select-none">
      {/* ステータス通知トースト */}
      {statusMessage && (
        <div className="fixed top-20 z-50 bg-slate-900/95 text-white text-xs px-4 py-2.5 rounded-md shadow-xl flex items-center gap-2 border border-slate-700 animate-fade-in backdrop-blur">
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold">{statusMessage}</span>
        </div>
      )}

      {/* PC 2カラム / スマホ 1カラム コンテナ */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 左側：縦型ショート動画プレーヤー（7カラム） */}
        <div
          onTouchStart={(e) => onPointerDown(e.touches[0].clientY)}
          onTouchMove={(e) => onPointerMove(e.touches[0].clientY)}
          onTouchEnd={onPointerUp}
          style={{
            transform: `translateY(${dragOffsetY}px) scale(${1 - Math.abs(dragOffsetY) / 3000})`,
            transition: isDragging ? "none" : "transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
          className="lg:col-span-7 w-full max-w-full sm:max-w-md mx-auto bg-black text-white rounded-xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col h-[70dvh] sm:h-[74vh] min-h-[490px] sm:min-h-[580px] max-h-[720px] relative select-none will-change-transform"
        >
          {/* 動画表示エリア */}
          <div
            onClick={togglePlay}
            className="relative w-full h-full flex items-center justify-center bg-black cursor-pointer overflow-hidden"
          >
            {/* スワイプフィードバックスタンプ（LIKE / SKIP） */}
            {swipeFeedback === "LIKE" && (
              <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none animate-scale-up">
                <div className="px-5 py-2.5 rounded-lg bg-rose-600 text-white font-black text-2xl tracking-wider border-2 border-white shadow-2xl flex items-center gap-2 rotate-[-8deg]">
                  <Heart className="w-7 h-7 fill-white" />
                  <span>LIKE!</span>
                </div>
              </div>
            )}

            {swipeFeedback === "SKIP" && (
              <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none animate-scale-up">
                <div className="px-5 py-2.5 rounded-lg bg-slate-900/95 text-white font-black text-2xl tracking-wider border-2 border-slate-400 shadow-2xl flex items-center gap-2 rotate-[8deg]">
                  <X className="w-7 h-7 text-slate-300" />
                  <span>SKIP</span>
                </div>
              </div>
            )}

            {currentVideo.videoUrl ? (
              <video
                ref={videoRef}
                key={currentVideo.id}
                src={currentVideo.videoUrl}
                className="w-full h-full object-cover select-none pointer-events-none"
                playsInline
                loop
                autoPlay
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                controlsList="nodownload"
                disablePictureInPicture
                onContextMenu={(e) => e.preventDefault()}
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-500 p-6 text-center">
                <Sparkles className="w-10 h-10 mb-2 text-slate-400" />
                <p className="text-sm">動画プレビュー準備中</p>
              </div>
            )}

            {/* 一時停止アイコン */}
            {!isPlaying && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
                <div className="w-14 h-14 rounded-full bg-slate-900/80 backdrop-blur flex items-center justify-center text-white shadow-xl animate-scale-up">
                  <Play className="w-7 h-7 ml-1 fill-white" />
                </div>
              </div>
            )}

            {/* ヘッダーオーバーレイ（ミュート、倍速、Undo、カウンター） */}
            <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-auto z-20">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-2 rounded-md bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 transition-all cursor-pointer shadow-md"
                  title={isMuted ? "ミュート解除" : "ミュート"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                </button>

                <button
                  type="button"
                  onClick={togglePlaybackRate}
                  className="px-2.5 py-1.5 rounded-md bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs font-bold border border-white/20 transition-all cursor-pointer shadow-md flex items-center gap-0.5"
                  title="再生速度を切り替え（1.0x / 1.25x / 1.5x / 2.0x）"
                >
                  <span className="text-emerald-400 font-mono">{playbackRate.toFixed(playbackRate === 1 ? 1 : 2)}x</span>
                </button>

                {historyStack.length > 0 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUndo();
                    }}
                    className="px-2.5 py-1.5 rounded-md bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs font-semibold border border-white/20 transition-all cursor-pointer shadow-md flex items-center gap-1"
                    title="1つ前の動画に戻る"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>戻る</span>
                  </button>
                )}
              </div>

              <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-semibold text-white border border-white/20 shadow-md">
                {(currentIndex % videos.length) + 1} / {videos.length}
              </div>
            </div>

            {/* 右サイド縦型アクションバー */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-3.5 pointer-events-auto"
            >
              {/* 気になる (Like) ボタン */}
              <button
                type="button"
                onClick={() => {
                  handleLike();
                  triggerFeedback("LIKE");
                }}
                className="flex flex-col items-center gap-1 group cursor-pointer"
                title="気になる！"
              >
                <div
                  className={`w-11 h-11 rounded-lg flex items-center justify-center transition-all active:scale-90 shadow-lg ${
                    isLiked
                      ? "bg-rose-600 text-white"
                      : "bg-black/60 backdrop-blur border border-white/20 text-white hover:bg-rose-600 hover:text-white"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? "fill-white" : ""}`} />
                </div>
                <span className="text-xs font-semibold text-white drop-shadow">Like</span>
              </button>

              {/* オファーボタン */}
              <button
                type="button"
                onClick={() => setIsOfferModalOpen(true)}
                className="flex flex-col items-center gap-1 group cursor-pointer"
                title="オファーを送る"
              >
                <div className="w-11 h-11 rounded-lg bg-emerald-700 hover:bg-emerald-600 active:scale-90 text-white flex items-center justify-center shadow-lg transition-all">
                  <Send className="w-5 h-5 ml-0.5" />
                </div>
                <span className="text-xs font-semibold text-white drop-shadow">オファー</span>
              </button>

              {/* スキップボタン */}
              <button
                type="button"
                onClick={() => handleNext("SKIP")}
                className="flex flex-col items-center gap-1 group cursor-pointer"
                title="スキップして次へ"
              >
                <div className="w-10 h-10 rounded-lg bg-black/60 backdrop-blur border border-white/20 hover:bg-black/80 active:scale-90 text-slate-300 hover:text-white flex items-center justify-center shadow-lg transition-all">
                  <X className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-slate-300 drop-shadow">Skip</span>
              </button>

              {/* スマホ用詳細ボタン */}
              <button
                type="button"
                onClick={() => setIsProfileModalOpen(true)}
                className="lg:hidden flex flex-col items-center gap-1 group cursor-pointer"
                title="プロフィール詳細"
              >
                <div className="w-10 h-10 rounded-lg bg-black/60 backdrop-blur border border-white/20 hover:bg-black/80 active:scale-90 text-white flex items-center justify-center shadow-lg transition-all">
                  <Info className="w-4 h-4 text-slate-200" />
                </div>
                <span className="text-xs font-semibold text-white drop-shadow">詳細</span>
              </button>

              {/* 通報ボタン */}
              <button
                type="button"
                onClick={() => setIsReportModalOpen(true)}
                className="flex flex-col items-center gap-1 group cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
                title="不適切なコンテンツを通報"
              >
                <div className="w-8 h-8 rounded-lg bg-black/50 backdrop-blur border border-white/10 hover:bg-rose-950/80 hover:border-rose-500/50 active:scale-90 text-slate-300 hover:text-rose-400 flex items-center justify-center shadow-md transition-all">
                  <Flag className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] font-medium text-slate-300 drop-shadow">通報</span>
              </button>
            </div>

            {/* 下部情報オーバーレイ */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute left-0 right-16 bottom-0 p-4 bg-black/80 backdrop-blur-xs rounded-t-lg space-y-1.5 pointer-events-auto"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-base font-bold text-white flex items-center gap-1.5">
                  <User className="w-4 h-4 text-emerald-400" />
                  {getMaskedStudentName(currentVideo.student?.fullName)}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-800/90 text-amber-300 border border-amber-400/30 text-xs font-semibold">
                  <Lock className="w-3 h-3" />
                  <span>承諾後本名開示</span>
                </span>
                {currentVideo.student?.graduationYear && (
                  <span className="text-xs bg-white/20 text-slate-200 px-2 py-0.5 rounded-md font-medium flex items-center gap-1">
                    <GraduationCap className="w-3 h-3" />
                    {currentVideo.student.graduationYear}卒
                  </span>
                )}
              </div>

              {currentVideo.student?.university && (
                <p className="text-xs sm:text-sm text-slate-300">{currentVideo.student.university}</p>
              )}
              <h3 className="text-xs sm:text-sm font-semibold text-slate-100 line-clamp-1">{currentVideo.title}</h3>

              {/* 志望職種バッジ */}
              {studentRoles && studentRoles.length > 0 && (
                <div className="flex flex-wrap gap-1 items-center pt-0.5">
                  <span className="text-[11px] font-bold text-blue-300 bg-blue-950/80 px-2 py-0.5 rounded-md border border-blue-500/40 flex items-center gap-1">
                    <Briefcase className="w-3 h-3 text-blue-400" />
                    <span>志望: {studentRoles.join(" / ")}</span>
                  </span>
                </div>
              )}

              {/* 4軸人柄タグ表示 */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-xs bg-emerald-950/80 text-emerald-300 px-2.5 py-0.5 rounded-md border border-emerald-500/40 font-bold flex items-center gap-1">
                  <Compass className="w-3 h-3" />
                  <span>{personalityProfile.title}</span>
                </span>
                {personalityTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-black/60 text-slate-200 px-2 py-0.5 rounded-md border border-white/20 font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 動画再生プログレスバー（最下部 2px） */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30">
              <div
                className="h-full bg-emerald-400 transition-all duration-100"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* 上下送りナビゲーションバー */}
          <div className="bg-slate-900 border-t border-slate-800 p-3 flex items-center justify-between px-4 z-20">
            <span className="text-xs text-slate-400 hidden sm:inline">
              キーボードの <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-xs text-slate-200 font-mono">↑</kbd> <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-xs text-slate-200 font-mono">↓</kbd> またはスワイプで移動
            </span>
            <span className="text-xs text-slate-400 sm:hidden">上下スワイプで切り替え</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md text-xs flex items-center gap-1 border border-slate-700 cursor-pointer transition-colors"
                title="前の動画 (↑)"
              >
                <ChevronUp className="w-4 h-4" />
                <span>前へ</span>
              </button>
              <button
                type="button"
                onClick={() => handleNext()}
                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-md text-xs font-semibold flex items-center gap-1 shadow-xs cursor-pointer transition-colors"
                title="次の動画 (↓)"
              >
                <span>次へ</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 右側：PC専用 学生詳細プロフィールパネル（5カラム） */}
        <div className="hidden lg:flex lg:col-span-5 flex-col bg-white rounded-xl border border-slate-200/90 shadow-sm p-6 h-[74vh] min-h-[580px] max-h-[720px] overflow-y-auto space-y-5">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {(() => {
                  const sId = currentVideo.student?.id || currentVideo.studentId || "s1";
                  const sDetail = appStore.getStudentDetails(sId);
                  const name = currentVideo.student?.fullName || "学生ユーザー";
                  if (sDetail?.avatarUrl) {
                    return (
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shadow-2xs flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={sDetail.avatarUrl} alt={name} className="w-full h-full object-cover" />
                      </div>
                    );
                  }
                  const isFemale = sDetail?.gender === "FEMALE" || name.includes("美咲");
                  return (
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center shadow-2xs flex-shrink-0 text-white border border-white/20 ${
                        isFemale ? "bg-rose-500" : "bg-blue-600"
                      }`}
                    >
                      <User className="w-6 h-6 stroke-[2.2]" />
                    </div>
                  );
                })()}

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-900">
                      <span>{getMaskedStudentName(currentVideo.student?.fullName)}</span>
                    </h2>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-300 text-xs font-semibold">
                      <Lock className="w-3 h-3 text-slate-500" />
                      <span>承諾後に開示</span>
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    {currentVideo.student?.university} • {currentVideo.student?.graduationYear}年卒
                  </p>
                </div>
              </div>

              <button
                onClick={handleLike}
                className={`p-2.5 rounded-md border transition-all cursor-pointer ${
                  isLiked
                    ? "bg-rose-50 border-rose-200 text-rose-600"
                    : "bg-slate-50 border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                }`}
                title="気になるに追加"
              >
                <Heart className={`w-5 h-5 ${isLiked ? "fill-rose-600" : ""}`} />
              </button>
            </div>
          </div>

          {/* ひとことスローガン */}
          <div>
            <span className="text-xs font-bold text-slate-800 block mb-1.5">ひとことスローガン</span>
            <div className="p-3.5 bg-emerald-50/60 rounded-lg border border-emerald-100 text-sm font-semibold text-emerald-950 leading-relaxed">
              {currentVideo.student?.bio || studentDetail?.bio || "笑顔と前向きな姿勢でチームに貢献します！"}
            </div>
          </div>

          {/* MBTI準拠 4軸人柄特性 (MECE) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-emerald-700" />
                <span>人柄・行動特性（MBTI準拠4軸）</span>
              </span>
              <span className="text-xs font-bold font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {personalityCode} : {personalityProfile.title}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {personalityTags.map((tag, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-slate-50 rounded-md border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-700"></span>
                  <span>#{tag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 志望職種・希望ポジション */}
          {studentRoles && studentRoles.length > 0 && (
            <div>
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1 mb-1.5">
                <Briefcase className="w-3.5 h-3.5 text-blue-700" />
                <span>志望職種・希望ポジション</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {studentRoles.map((role, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-50 text-blue-900 border border-blue-200 px-2.5 py-1 rounded-md text-xs font-bold"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 興味のある業界 */}
          {studentDetail?.desiredIndustries && studentDetail.desiredIndustries.length > 0 && (
            <div>
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1 mb-1.5">
                <Briefcase className="w-3.5 h-3.5 text-slate-700" />
                <span>興味のある業界</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {studentDetail.desiredIndustries.map((ind, idx) => (
                  <span
                    key={idx}
                    className="bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-md text-xs font-semibold"
                  >
                    {ind.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* オファー送信CTA */}
          <div className="mt-auto pt-4 border-t border-slate-100 flex gap-2.5">
            <Link
              href={`/students/${currentVideo.student?.id || currentVideo.studentId || "s1"}`}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-md transition-colors flex items-center justify-center"
            >
              詳細
            </Link>
            <button
              onClick={() => setIsOfferModalOpen(true)}
              className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-md flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              <Send className="w-4 h-4 text-emerald-400" />
              <span>オファーを送る</span>
            </button>
          </div>
        </div>
      </div>

      {/* スマホ用 詳細プロフィールモーダル */}
      {isProfileModalOpen && currentVideo.student && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">{getMaskedStudentName(currentVideo.student.fullName)} の詳細</h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-300 text-xs font-semibold">
                    <Lock className="w-3 h-3 text-slate-500" />
                    <span>承諾後開示</span>
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{currentVideo.student.university} / {currentVideo.student.graduationYear}年卒</p>
              </div>
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-700">
              <div>
                <span className="font-bold text-slate-900 block mb-1">ひとことスローガン</span>
                <p className="p-3.5 bg-emerald-50/60 text-emerald-950 rounded-lg border border-emerald-100 font-semibold leading-relaxed">
                  {currentVideo.student.bio || studentDetail?.bio || "笑顔と前向きな姿勢でチームに貢献します！"}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900">人柄・行動特性（MBTI準拠4軸）</span>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {personalityProfile.title}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {personalityTags.map((tag, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-md text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-700"></span>
                      <span>#{tag}</span>
                    </div>
                  ))}
                </div>
              </div>

              {studentRoles && studentRoles.length > 0 && (
                <div>
                  <span className="font-bold text-slate-900 block mb-1 flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-blue-700" />
                    <span>志望職種・希望ポジション</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {studentRoles.map((role, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-50 text-blue-900 border border-blue-200 px-2.5 py-1 rounded-md text-xs font-bold"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {studentDetail?.desiredIndustries && (
                <div>
                  <span className="font-bold text-slate-900 block mb-1">興味のある業界</span>
                  <div className="flex flex-wrap gap-1.5">
                    {studentDetail.desiredIndustries.map((ind, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-md text-xs font-semibold">
                        {ind.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex gap-2 justify-end">
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer"
              >
                閉じる
              </button>
              <button
                onClick={() => {
                  setIsProfileModalOpen(false);
                  setIsOfferModalOpen(true);
                }}
                className="px-4 py-2 text-sm font-semibold bg-emerald-700 text-white rounded-md hover:bg-emerald-600 flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>オファーを送る</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* スカウトオファー送信モーダル（定型文テンプレート付き） */}
      {isOfferModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>{getMaskedStudentName(currentVideo.student?.fullName)} へオファーを送信</span>
              </h3>
              <button
                onClick={() => setIsOfferModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* ワンタップ定型文テンプレート */}
            <div>
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1 mb-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-700" />
                <span>定型文テンプレートを選択（ワンタップで入力）:</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {OFFER_TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => applyTemplate(tmpl)}
                    className={`p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                      selectedTemplateId === tmpl.id
                        ? "bg-emerald-50 border-emerald-300 text-emerald-950 font-bold"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <p className="font-bold">{tmpl.title}</p>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{tmpl.text}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">スカウトメッセージ本文</label>
              <textarea
                value={offerMessage}
                onChange={(e) => setOfferMessage(e.target.value)}
                placeholder="動画を見て興味を持った理由や、オファーしたいポジション・面談日程の候補などを入力してください。"
                rows={4}
                className="w-full text-sm border border-slate-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 text-slate-900 leading-relaxed"
              />
            </div>

            <div className="pt-2 flex gap-2.5 justify-end">
              <button
                onClick={() => setIsOfferModalOpen(false)}
                className="px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer"
              >
                キャンセル
              </button>
              <button
                onClick={handleSendOffer}
                disabled={!offerMessage.trim()}
                className="px-5 py-2.5 text-sm font-semibold bg-emerald-700 text-white rounded-md hover:bg-emerald-600 disabled:opacity-50 flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>オファーを送信する</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 不適切動画の通報モーダル */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        targetType="VIDEO"
        targetId={currentVideo?.id || "v-unknown"}
        targetTitle={`${currentVideo?.student?.fullName || "学生"} さんの自己PR動画`}
        targetPreview={currentVideo?.title}
        reporterName={session?.name || "企業ユーザー"}
      />
    </div>
  );
}