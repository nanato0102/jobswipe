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
  MapPin,
  Briefcase,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Send,
  Heart,
  Calendar,
  Eye,
  CheckCircle,
  X,
} from "lucide-react";

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
  const [offerMessage, setOfferMessage] = useState("");
  const [isOfferSent, setIsOfferSent] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (studentId) {
      const details = appStore.getStudentDetails(studentId);
      setStudent(details);

      // 気になる状態チェック
      const likes = appStore.getLikes();
      const liked = likes.some((l) => l.studentId === studentId);
      setIsLiked(liked);
    }
  }, [studentId]);

  if (!student) {
    return (
      <div className="flex-1 flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div>
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

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleLike = () => {
    appStore.addLike({
      studentId: student.id,
      studentName: student.name,
      university: student.university,
      graduationYear: student.graduationYear,
      bio: student.catchphrase,
      tags: student.personalityTags,
      videoTitle: student.videoTitle,
      videoUrl: student.videoUrl,
    });
    setIsLiked(true);
    success("気になる！に追加しました", `${student.name} さんをストックしました。`);
  };

  const handleSendOffer = () => {
    if (!offerMessage.trim()) return;

    try {
      appStore.sendOffer({
        companyId: "c1",
        companyName: "テックイノベーション株式会社",
        industry: "IT・Webサービス",
        studentId: student.id,
        studentName: student.name,
        message: offerMessage.trim(),
      });

      setIsOfferSent(true);
      success("オファーを送信しました", `${student.name} さんにスカウトメッセージを送信しました。`);
    } catch (err: any) {
      alert("【オファー上限到達】\n" + (err.message || "今月のオファー上限枠に達しています。利用状況ページより枠を追加してください。"));
      router.push("/company/usage");
    }
  };

  const threadId = `thread-${student.id}`;

  return (
    <CompanyMobileTabs>
      <div className="flex-1 py-6 sm:py-10 px-4 sm:px-6 max-w-4xl mx-auto w-full space-y-6">
        {/* 上部ナビゲーションバー */}
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>前の画面に戻る</span>
          </button>

          <div className="flex items-center gap-2">
            <Link
              href="/company/likes"
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold transition-colors"
            >
              気になる一覧
            </Link>
            <Link
              href="/swipe"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-xs"
            >
              スワイプへ
            </Link>
          </div>
        </div>

        {/* メイン2カラム（左: 動画プレーヤー / 右: プロフィール詳細） */}
        <div className="grid md:grid-cols-12 gap-6 items-start">
          {/* 左側: 自己PR動画プレーヤー（5カラム） */}
          <div className="md:col-span-5 space-y-3">
            <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl relative aspect-[9/16] max-h-[580px] w-full flex items-center justify-center group">
              <video
                ref={videoRef}
                src={student.videoUrl}
                playsInline
                loop
                muted={isMuted}
                onClick={togglePlay}
                className="w-full h-full object-cover cursor-pointer"
              />

              {/* 再生/停止オーバーレイ */}
              {!isPlaying && (
                <div
                  onClick={togglePlay}
                  className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center cursor-pointer transition-opacity"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-2xl pl-1 group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 fill-white" />
                  </div>
                  <span className="text-xs text-white font-bold mt-2 drop-shadow">
                    クリックして自己PR動画を再生
                  </span>
                </div>
              )}

              {/* 動画コントロールバー（音声・バッジ） */}
              <div className="absolute bottom-3 right-3 flex items-center gap-2 z-10">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all shadow-md cursor-pointer"
                  title={isMuted ? "音声をオンにする" : "音声をミュートする"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              {/* 動画タイトルバッジ */}
              <div className="absolute top-3 left-3 right-3 z-10">
                <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl text-[11px] font-bold text-white border border-white/10 truncate shadow-md">
                  {student.videoTitle}
                </div>
              </div>
            </div>

            {/* 視聴・反響スタッツ */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white rounded-2xl border border-slate-200 p-3 flex items-center gap-2 shadow-2xs">
                <Eye className="w-4 h-4 text-slate-500" />
                <div>
                  <span className="text-[10px] text-slate-400 block">総視聴</span>
                  <span className="font-bold text-slate-800">{student.videoViews} 回</span>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-3 flex items-center gap-2 shadow-2xs">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <div>
                  <span className="text-[10px] text-slate-400 block">気になる獲得</span>
                  <span className="font-bold text-slate-800">{student.videoLikes} 回</span>
                </div>
              </div>
            </div>
          </div>

          {/* 右側: プロフィール詳細（7カラム） */}
          <div className="md:col-span-7 space-y-5">
            {/* 基本ヘッダー */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>{student.graduationYear}年卒（就活生）</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {student.name}
                  </h1>
                  <p className="text-xs sm:text-sm font-semibold text-slate-600 flex items-center gap-1">
                    <span>{student.university}</span>
                    <span>•</span>
                    <span>{student.faculty}</span>
                  </p>
                </div>

                {student.avatarUrl ? (
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100 flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={student.avatarUrl} alt={student.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div
                    className={`w-14 h-14 rounded-2xl font-black text-xl flex items-center justify-center shadow-md flex-shrink-0 text-white ${
                      student.gender === "FEMALE" ? "bg-rose-500" : "bg-blue-600"
                    }`}
                  >
                    {student.avatarText}
                  </div>
                )}
              </div>

              {/* キャッチコピー */}
              <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-100 text-xs sm:text-sm font-bold text-emerald-950 leading-relaxed">
                「{student.catchphrase}」
              </div>

              {/* 人柄・特徴タグ */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>人柄・強みタグ</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {student.personalityTags.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 自己PR・想い */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-3">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2.5">
                <User className="w-4 h-4 text-emerald-700" />
                <span>自己PR・学生時代に力を入れたこと</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {student.bio}
              </p>
            </div>

            {/* 希望条件（業界・勤務地） */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2.5">
                <Briefcase className="w-4 h-4 text-emerald-700" />
                <span>希望業界・勤務条件</span>
              </h2>

              <div className="grid sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <span className="text-slate-400 font-medium flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                    <span>志望業界</span>
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {student.desiredIndustries.map((ind, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 text-[11px] font-semibold border border-blue-100"
                      >
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-slate-400 font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>希望勤務地</span>
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {student.desiredLocations.map((loc, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200"
                      >
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 企業向けアクションボタンバー */}
            <div className="p-5 bg-slate-900 rounded-3xl text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl">
              <button
                type="button"
                onClick={handleLike}
                className={`w-full sm:w-auto px-5 py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isLiked
                    ? "bg-rose-600 text-white"
                    : "bg-slate-800 hover:bg-rose-600 text-slate-200 hover:text-white border border-slate-700"
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-white" : ""}`} />
                <span>{isLiked ? "気になる登録済み" : "気になるに追加"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setOfferMessage(
                    `${student.name}さんの自己PR動画を拝見しました！チームでの推進力とお人柄に大変魅力を感じております。ぜひ一度カジュアルにお話しさせていただけないでしょうか？`
                  );
                  setIsOfferModalOpen(true);
                }}
                className="w-full sm:w-auto flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>特別オファーを送信する</span>
              </button>
            </div>
          </div>
        </div>

        {/* オファー送信モーダル */}
        {isOfferModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl animate-scale-up">
              {!isOfferSent ? (
                <>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <Send className="w-5 h-5 text-emerald-700" />
                      <h3 className="text-base font-bold text-slate-900">
                        {student.name} さんへオファー送信
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsOfferModalOpen(false)}
                      className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700">
                      スカウトメッセージ
                    </label>
                    <textarea
                      rows={5}
                      value={offerMessage}
                      onChange={(e) => setOfferMessage(e.target.value)}
                      className="w-full text-xs sm:text-sm border border-slate-300 rounded-2xl p-3.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 leading-relaxed"
                      placeholder="学生の動画のどんな点に惹かれたか、自社でどのような活躍を期待しているかを具体的に記載してください"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsOfferModalOpen(false)}
                      className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                    >
                      キャンセル
                    </button>
                    <button
                      type="button"
                      onClick={handleSendOffer}
                      className="flex-1 py-3 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
                    >
                      オファーを確定する
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-4 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-slate-900">オファーを送信しました！</h3>
                    <p className="text-xs text-slate-500">
                      学生がオファーを承諾するとチャット面談を開始できます。
                    </p>
                  </div>
                  <div className="pt-3 flex flex-col sm:flex-row gap-2 justify-center">
                    <Link
                      href={`/company/chat?threadId=${threadId}`}
                      className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-colors"
                    >
                      チャット画面を確認
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setIsOfferModalOpen(false);
                        setIsOfferSent(false);
                      }}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                    >
                      閉じる
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </CompanyMobileTabs>
  );
}
