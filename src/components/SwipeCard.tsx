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
  Pause,
  ChevronUp,
  ChevronDown,
  Info,
  X,
  Award,
  Briefcase,
  Building2,
  RotateCcw,
  Flag,
} from "lucide-react";
import type { VideoData } from "@/types";
import ReportModal from "@/components/ReportModal";

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
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // スワイプフィードバックスタンプ（LIKE / SKIP）
  const [swipeFeedback, setSwipeFeedback] = useState<"LIKE" | "SKIP" | null>(null);
  const [playFeedback, setPlayFeedback] = useState<"PLAY" | "PAUSE" | null>(null);

  // 動画再生・音声状態
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const videoRef = useRef<HTMLVideoElement>(null);
  const touchStartY = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const currentVideo = videos && videos.length > 0 ? videos[currentIndex % videos.length] : null;
  const isLiked = currentVideo ? !!likedMap[currentVideo.id] : false;

  const tagsList = currentVideo?.tags
    ? currentVideo.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

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
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    },
    [currentIndex, videos.length]
  );

  const handlePrev = useCallback(() => {
    setStatusMessage(null);
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  }, [videos.length]);

  // 1つ戻る（Undo / リワインド）
  const handleUndo = () => {
    if (historyStack.length === 0) return;
    const prevIdx = historyStack[historyStack.length - 1];
    setHistoryStack((prev) => prev.slice(0, prev.length - 1));
    setCurrentIndex(prevIdx);
    info("前の動画に戻りました");
  };

  // キーボードショートカット（↑ / ↓ / Space）
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 入力フォームにフォーカス中はスキップ
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, isPlaying]);

  // インデックス変更時に動画を再ロード・再生
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [currentIndex]);

  if (!videos || videos.length === 0 || !currentVideo) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white border border-slate-200 rounded-3xl shadow-sm text-center max-w-md mx-auto my-8">
        <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
          <Sparkles className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">動画は以上です</h3>
        <p className="text-sm text-slate-500">現在表示できる学生PR動画がありません。後ほど再度ご確認ください。</p>
      </div>
    );
  }

  // タッチスワイプ（フリック）制御
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.targetTouches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndY.current = e.targetTouches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (!touchStartY.current || !touchEndY.current) return;
    const distance = touchStartY.current - touchEndY.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }

    touchStartY.current = null;
    touchEndY.current = null;
  };

  // キーボードショートカット（PC操作性向上: ↑↓, J/K, Space, L）
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // テキスト入力中またはモーダルオープン中はキーボードショートカットを無効化
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        isOfferModalOpen ||
        isProfileModalOpen
      ) {
        return;
      }

      if (e.key === "ArrowDown" || e.key === "j" || e.key === "J") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowUp" || e.key === "k" || e.key === "K") {
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
  }, [currentIndex, isPlaying, isOfferModalOpen, isProfileModalOpen, currentVideo]);

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
  };

  // いいね（気になる）を appStore に保存
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
      graduationYear: currentVideo.student?.graduationYear || 2026,
      bio: currentVideo.student?.bio || "",
      tags: tagsList,
      videoTitle: currentVideo.title,
      videoUrl: currentVideo.videoUrl,
    });

    setLikedMap((prev) => ({ ...prev, [currentVideo.id]: true }));
    success("気になる！に追加しました", `${studentName} さんの動画を保存しました。`);
  };

  // オファー送信を appStore に保存
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
      success("スカウトオファーを送信しました！", `${studentName} さんに届きました。`);
      setTimeout(() => {
        handleNext();
      }, 600);
    } catch (err: any) {
      setIsOfferModalOpen(false);
      alert("【オファー上限到達】\n" + (err.message || "今月のオファー上限枠に達しています。利用状況ページより枠を追加してください。"));
    }
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center select-none">
      {/* ステータス通知トースト */}
      {statusMessage && (
        <div className="fixed top-20 z-50 bg-slate-900/95 text-white text-xs px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 border border-slate-700 animate-fade-in backdrop-blur">
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="font-bold">{statusMessage}</span>
        </div>
      )}

      {/* PC 2カラム / スマホ 1カラム コンテナ */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 左側：縦型ショート動画プレーヤー（7カラム） */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="lg:col-span-7 w-full max-w-full sm:max-w-md mx-auto bg-black text-white rounded-xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col h-[70dvh] sm:h-[74vh] min-h-[480px] sm:min-h-[580px] max-h-[720px] relative touch-pan-y select-none"
        >
          {/* 動画表示エリア */}
          <div
            onClick={togglePlay}
            className="relative w-full h-full flex items-center justify-center bg-black cursor-pointer overflow-hidden"
          >
            {/* スワイプフィードバックスタンプ（LIKE / SKIP） */}
            {swipeFeedback === "LIKE" && (
              <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none animate-scale-up">
                <div className="px-6 py-3 rounded-2xl bg-rose-500/90 text-white font-black text-2xl tracking-widest border-2 border-white shadow-2xl flex items-center gap-2 rotate-[-12deg]">
                  <Heart className="w-8 h-8 fill-white" />
                  <span>LIKE!</span>
                </div>
              </div>
            )}

            {swipeFeedback === "SKIP" && (
              <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none animate-scale-up">
                <div className="px-6 py-3 rounded-2xl bg-slate-900/90 text-white font-black text-2xl tracking-widest border-2 border-slate-400 shadow-2xl flex items-center gap-2 rotate-[12deg]">
                  <X className="w-8 h-8 text-slate-300" />
                  <span>SKIP</span>
                </div>
              </div>
            )}

            {currentVideo.videoUrl ? (
              <video
                ref={videoRef}
                key={currentVideo.id}
                src={currentVideo.videoUrl}
                className="w-full h-full object-cover"
                playsInline
                loop
                autoPlay
                muted={isMuted}
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-500 p-6 text-center">
                <Sparkles className="w-12 h-12 mb-2 text-slate-400" />
                <p className="text-sm">動画プレビュー準備中</p>
              </div>
            )}

            {/* 一時停止アイコン */}
            {!isPlaying && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-slate-900/80 backdrop-blur flex items-center justify-center text-white shadow-xl animate-scale-up">
                  <Play className="w-8 h-8 ml-1 fill-white" />
                </div>
              </div>
            )}

            {/* ヘッダーオーバーレイ（ミュート、Undo、カウンター） */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-auto z-20">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 transition-all cursor-pointer shadow-lg"
                  title={isMuted ? "ミュート解除" : "ミュート"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                </button>

                {historyStack.length > 0 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUndo();
                    }}
                    className="px-2.5 py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-[11px] font-bold border border-white/20 transition-all cursor-pointer shadow-lg flex items-center gap-1"
                    title="1つ前の動画に戻る"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>戻る</span>
                  </button>
                )}
              </div>

              <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20 shadow-lg">
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
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-90 shadow-lg ${
                    isLiked
                      ? "bg-rose-600 text-white"
                      : "bg-black/60 backdrop-blur border border-white/20 text-white hover:bg-rose-600 hover:text-white"
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isLiked ? "fill-white" : ""}`} />
                </div>
                <span className="text-[10px] font-bold text-white drop-shadow">Like</span>
              </button>

              {/* オファーボタン */}
              <button
                type="button"
                onClick={() => setIsOfferModalOpen(true)}
                className="flex flex-col items-center gap-1 group cursor-pointer"
                title="オファーを送る"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-700 hover:bg-emerald-600 active:scale-90 text-white flex items-center justify-center shadow-lg transition-all">
                  <Send className="w-5 h-5 ml-0.5" />
                </div>
                <span className="text-[10px] font-bold text-white drop-shadow">オファー</span>
              </button>

              {/* スキップボタン */}
              <button
                type="button"
                onClick={() => handleNext("SKIP")}
                className="flex flex-col items-center gap-1 group cursor-pointer"
                title="スキップして次へ"
              >
                <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur border border-white/20 hover:bg-black/80 active:scale-90 text-slate-300 hover:text-white flex items-center justify-center shadow-lg transition-all">
                  <X className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-slate-300 drop-shadow">Skip</span>
              </button>

              {/* スマホ用詳細ボタン */}
              <button
                type="button"
                onClick={() => setIsProfileModalOpen(true)}
                className="lg:hidden flex flex-col items-center gap-1 group cursor-pointer"
                title="プロフィール詳細"
              >
                <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur border border-white/20 hover:bg-black/80 active:scale-90 text-white flex items-center justify-center shadow-lg transition-all">
                  <Info className="w-4 h-4 text-slate-200" />
                </div>
                <span className="text-[10px] font-bold text-white drop-shadow">詳細</span>
              </button>

              {/* 通報ボタン */}
              <button
                type="button"
                onClick={() => setIsReportModalOpen(true)}
                className="flex flex-col items-center gap-1 group cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
                title="不適切なコンテンツを通報"
              >
                <div className="w-9 h-9 rounded-full bg-black/50 backdrop-blur border border-white/10 hover:bg-rose-950/80 hover:border-rose-500/50 active:scale-90 text-slate-300 hover:text-rose-400 flex items-center justify-center shadow-md transition-all">
                  <Flag className="w-3.5 h-3.5" />
                </div>
                <span className="text-[9px] font-medium text-slate-300 drop-shadow">通報</span>
              </button>
            </div>

            {/* 下部情報オーバーレイ */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute left-0 right-16 bottom-0 p-4 sm:p-5 bg-black/75 backdrop-blur-xs rounded-t-2xl space-y-1.5 pointer-events-auto"
            >
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-white flex items-center gap-1.5">
                  <User className="w-4 h-4 text-emerald-400" />
                  {currentVideo.student?.fullName || "学生ユーザー"}
                </span>
                {currentVideo.student?.graduationYear && (
                  <span className="text-[11px] bg-white/20 text-slate-200 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                    <GraduationCap className="w-3 h-3" />
                    {currentVideo.student.graduationYear}卒
                  </span>
                )}
              </div>
              {currentVideo.student?.university && (
                <p className="text-xs text-slate-300">{currentVideo.student.university}</p>
              )}
              <h3 className="text-xs font-semibold text-slate-100 line-clamp-1">{currentVideo.title}</h3>

              {tagsList.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {tagsList.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-black/50 text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-500/30 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 上下送りナビゲーションバー（キーボード案内付き） */}
          <div className="bg-slate-900 border-t border-slate-800 p-3 flex items-center justify-between px-4">
            <span className="text-xs text-slate-400 hidden sm:inline">
              キーボードの <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-200">↑</kbd> <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-200">↓</kbd> またはスワイプで移動
            </span>
            <span className="text-xs text-slate-400 sm:hidden">上下スワイプで移動</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs flex items-center gap-1 border border-slate-700"
                title="前の動画 (↑)"
              >
                <ChevronUp className="w-4 h-4" />
                <span>前へ</span>
              </button>
              <button
                type="button"
                onClick={() => handleNext()}
                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-sm cursor-pointer"
                title="次の動画 (↓)"
              >
                <span>次へ</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 右側：PC専用 学生詳細プロフィールパネル（5カラム） */}
        <div className="hidden lg:flex lg:col-span-5 flex-col bg-white rounded-3xl border border-slate-200 shadow-xl p-6 h-[74vh] min-h-[580px] max-h-[720px] overflow-y-auto space-y-5">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {(() => {
                  const sId = currentVideo.student?.id || currentVideo.studentId || "s1";
                  const sDetail = appStore.getStudentDetails(sId);
                  const name = currentVideo.student?.fullName || "学生ユーザー";
                  if (sDetail?.avatarUrl) {
                    return (
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-2xs flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={sDetail.avatarUrl} alt={name} className="w-full h-full object-cover" />
                      </div>
                    );
                  }
                  const isFemale = sDetail?.gender === "FEMALE" || name.includes("美咲");
                  return (
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-2xs flex-shrink-0 text-white border border-white/20 ${
                        isFemale ? "bg-rose-500" : "bg-blue-600"
                      }`}
                    >
                      <User className="w-6 h-6 stroke-[2.2]" />
                    </div>
                  );
                })()}

                <div>
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <span>{currentVideo.student?.fullName || "学生ユーザー"}</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {currentVideo.student?.university} • {currentVideo.student?.graduationYear}年卒
                  </p>
                </div>
              </div>

              <button
                onClick={handleLike}
                className={`p-2.5 rounded-full border transition-all ${
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
            <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-100 text-xs font-bold text-emerald-950 leading-relaxed">
              {currentVideo.student?.bio || "笑顔と前向きな姿勢でチームに貢献します！"}
            </div>
          </div>

          {/* 人柄・強みタグ */}
          {currentVideo.student?.skills && (
            <div>
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>人柄・強みタグ</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentVideo.student.skills.split(",").map((s, idx) => (
                  <span
                    key={idx}
                    className="bg-emerald-50 text-emerald-900 border border-emerald-200 px-2.5 py-0.5 rounded-md text-xs font-bold shadow-2xs"
                  >
                    #{s.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 興味のある業界 */}
          {currentVideo.student?.experience && (
            <div>
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1 mb-1.5">
                <Briefcase className="w-3.5 h-3.5 text-emerald-700" />
                <span>興味のある業界</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentVideo.student.experience.split(",").map((ind, idx) => (
                  <span
                    key={idx}
                    className="bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-0.5 rounded-md text-xs font-semibold"
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
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center"
            >
              詳細
            </Link>
            <button
              onClick={() => setIsOfferModalOpen(true)}
              className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              <Send className="w-4 h-4 text-blue-400" />
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
                <h3 className="text-base font-bold text-slate-900">{currentVideo.student.fullName} さんの詳細</h3>
                <p className="text-xs text-slate-500">{currentVideo.student.university} / {currentVideo.student.graduationYear}年卒</p>
              </div>
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              <div>
                <span className="font-bold text-slate-900 block mb-1">ひとことスローガン</span>
                <p className="p-3.5 bg-emerald-50/60 text-emerald-950 rounded-2xl border border-emerald-100 font-bold leading-relaxed">
                  {currentVideo.student.bio || "笑顔と前向きな姿勢でチームに貢献します！"}
                </p>
              </div>

              {currentVideo.student.skills && (
                <div>
                  <span className="font-bold text-slate-900 block mb-1">人柄・強みタグ</span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentVideo.student.skills.split(",").map((s, idx) => (
                      <span key={idx} className="bg-emerald-50 text-emerald-900 border border-emerald-200 px-3 py-1 rounded-full font-bold shadow-sm">
                        #{s.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {currentVideo.student.experience && (
                <div>
                  <span className="font-bold text-slate-900 block mb-1">興味のある業界</span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentVideo.student.experience.split(",").map((ind, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 rounded-full font-semibold">
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
                className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-xl"
              >
                閉じる
              </button>
              <button
                onClick={() => {
                  setIsProfileModalOpen(false);
                  setIsOfferModalOpen(true);
                }}
                className="px-4 py-2 text-xs font-semibold bg-emerald-700 text-white rounded-xl hover:bg-emerald-600 flex items-center gap-1.5 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>オファーを送る</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* スカウトオファー送信モーダル */}
      {isOfferModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {currentVideo.student?.fullName || "学生"} さんへオファーを送信
              </h3>
              <button
                onClick={() => setIsOfferModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-3">
              動画を見て興味を持った理由や、オファーしたいポジション・面談メッセージを入力してください。
            </p>

            <textarea
              value={offerMessage}
              onChange={(e) => setOfferMessage(e.target.value)}
              placeholder="例: 自己PR動画を拝見し、明るく主体的な人柄に非常に惹かれました。ぜひ一度オンラインでお話ししませんか？"
              rows={4}
              className="w-full text-sm border border-slate-300 rounded-2xl p-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent text-slate-900"
            />

            <div className="mt-4 flex gap-2 justify-end">
              <button
                onClick={() => setIsOfferModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-xl"
              >
                キャンセル
              </button>
              <button
                onClick={handleSendOffer}
                disabled={!offerMessage.trim()}
                className="px-4 py-2 text-xs font-semibold bg-emerald-700 text-white rounded-xl hover:bg-emerald-600 disabled:opacity-50 flex items-center gap-1.5 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>送信する</span>
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