"use client";

import { use, useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { appStore, StudentDetail } from "@/lib/appStore";
import CompanyMobileTabs from "@/components/CompanyMobileTabs";
import { useToast } from "@/context/ToastContext";
import {
  User,
  ArrowLeft,
  GraduationCap,
  Sparkles,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Send,
  Heart,
  CheckCircle,
  X,
  Flag,
} from "lucide-react";
import ReportModal from "@/components/ReportModal";

interface Props {
  params: Promise<{ id: string }>;
}

export default function StudentDetailPage({ params }: Props) {
  const resolvedParams = use(params);
  const router = useRouter();
  const studentId = resolvedParams.id;
  const { success } = useToast();

  const [student, setStudent] = useState<StudentDetail | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [offerMessage, setOfferMessage] = useState("");
  const [isOfferSent, setIsOfferSent] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (studentId) {
      const details = appStore.getStudentDetails(studentId);
      setStudent(details);

      const likes = appStore.getLikes();
      const liked = likes.some((l) => l.studentId === studentId);
      setIsLiked(liked);
    }
  }, [studentId]);

  if (!student) {
    return (
      <div className="flex-1 flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
      </div>
    );
  }

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

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleToggleLike = () => {
    if (isLiked) {
      appStore.removeLike(studentId);
      setIsLiked(false);
    } else {
      appStore.addLike({
        studentId: student.id,
        studentName: student.name,
        university: student.university,
        graduationYear: student.graduationYear,
        bio: student.bio,
        tags: student.personalityTags || [],
        videoTitle: student.videoTitle || "自己PR動画",
        videoUrl: student.videoUrl || "",
      });
      setIsLiked(true);
      success("気になるに追加しました！", "気になる一覧からいつでもオファーを送信できます。");
    }
  };

  const handleSendOffer = () => {
    if (!offerMessage.trim()) return;

    appStore.sendOffer({
      companyId: "c1",
      companyName: "自社採用担当",
      industry: "IT / Webサービス",
      studentId: student.id,
      studentName: student.name,
      message: offerMessage.trim(),
    });

    setIsOfferSent(true);
    setTimeout(() => {
      setIsOfferSent(false);
      setIsOfferModalOpen(false);
      setOfferMessage("");
      success("オファーを送信しました！", "学生が承諾するとチャット面談が開始されます。");
    }, 1500);
  };

  const gender = student.gender || "MALE";

  return (
    <CompanyMobileTabs>
      <div className="max-w-5xl mx-auto px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 w-full">
        {/* ナビゲーションバー */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>戻る</span>
          </button>

          <button
            type="button"
            onClick={() => setIsReportModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-400 hover:text-rose-600 hover:border-rose-200 transition-colors shadow-2xs cursor-pointer"
          >
            <Flag className="w-3.5 h-3.5" />
            <span>通報する</span>
          </button>
        </div>

        {/* メイングリッド */}
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* ================= 左カラム: 自己PR動画プレーヤー ================= */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-xs sm:max-w-sm aspect-[9/16] rounded-3xl overflow-hidden bg-slate-950 shadow-xl border border-slate-800 relative group">
              <video
                ref={videoRef}
                src={student.videoUrl}
                className="w-full h-full object-cover"
                loop
                playsInline
                muted={isMuted}
                onClick={togglePlay}
              />

              {/* 再生オーバーレイ */}
              {!isPlaying && (
                <div
                  onClick={togglePlay}
                  className="absolute inset-0 bg-slate-900/40 flex items-center justify-center cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform">
                    <Play className="w-7 h-7 ml-1 fill-current" />
                  </div>
                </div>
              )}

              {/* コントロールボタン */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-2.5 rounded-full bg-slate-900/60 backdrop-blur-md text-white hover:bg-slate-900 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={togglePlay}
                  className="p-2.5 rounded-full bg-slate-900/60 backdrop-blur-md text-white hover:bg-slate-900 transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
              </div>
            </div>
          </div>

          {/* ================= 右カラム: 統一プロフィールカード ================= */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-7 space-y-6">
              {/* 1. ヘッダー基本情報 */}
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-4">
                  {/* 四角アバター */}
                  <div className="flex-shrink-0">
                    {student.avatarUrl ? (
                      <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 shadow-2xs bg-slate-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={student.avatarUrl} alt={student.name} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div
                        className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center shadow-2xs text-white border border-white/40 ${
                          gender === "FEMALE" ? "bg-rose-500" : "bg-blue-600"
                        }`}
                      >
                        <User className="w-7 h-7 stroke-[2.2]" />
                        <span className="text-[9px] font-bold mt-0.5 opacity-90">
                          {gender === "FEMALE" ? "女性" : "男性"}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{student.name}</h1>
                    <p className="text-xs sm:text-sm font-bold text-slate-600 flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-slate-500" />
                      <span>{student.university} {student.faculty} ({student.graduationYear}年卒)</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* 2. ひとことキャッチコピー */}
              {student.catchphrase && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 block mb-1">ひとこと自己PR</span>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">
                    「{student.catchphrase}」
                  </p>
                </div>
              )}

              {/* 3. 人柄タグ */}
              {student.personalityTags && student.personalityTags.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 block">人柄・強みタグ</span>
                  <div className="flex flex-wrap gap-1.5">
                    {student.personalityTags.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. 自己PR詳細 */}
              {student.bio && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 block">自己PR・学生時代に力を入れたこと</span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {student.bio}
                  </p>
                </div>
              )}

              {/* 5. アクションボタン群（オファー送信 ＆ 気になる） */}
              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleToggleLike}
                  className={`flex-1 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                    isLiked
                      ? "bg-rose-50 text-rose-700 border border-rose-200"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? "fill-rose-500 text-rose-500" : "text-slate-400"}`} />
                  <span>{isLiked ? "気になる追加済" : "気になる"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsOfferModalOpen(true)}
                  className="flex-[2] py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-blue-400" />
                  <span>オファーを送る</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* オファー送信モーダル */}
        {isOfferModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-5 animate-scale-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[11px] font-bold text-blue-700">個別スカウト送信</span>
                  <h3 className="text-lg font-bold text-slate-900">{student.name} さんへオファー</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOfferModalOpen(false)}
                  className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {isOfferSent ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">オファーを送信しました！</h4>
                  <p className="text-xs text-slate-500">学生が承諾するとチャット面談が開始されます。</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      メッセージ内容 <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={5}
                      value={offerMessage}
                      onChange={(e) => setOfferMessage(e.target.value)}
                      placeholder={`${student.name}さんの自己PR動画を拝見し、ぜひ一度カジュアルにお話ししたくオファーをお送りいたしました...`}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-700/20 focus:border-blue-700 leading-relaxed"
                    />
                  </div>

                  <div className="flex gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsOfferModalOpen(false)}
                      className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      キャンセル
                    </button>
                    <button
                      type="button"
                      onClick={handleSendOffer}
                      disabled={!offerMessage.trim()}
                      className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-4 h-4 text-blue-400" />
                      <span>送信する</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 通報モーダル */}
        <ReportModal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          targetId={student.id}
          targetTitle={`${student.name} (${student.university})`}
          targetType="USER"
          targetPreview={student.catchphrase}
        />
      </div>
    </CompanyMobileTabs>
  );
}
