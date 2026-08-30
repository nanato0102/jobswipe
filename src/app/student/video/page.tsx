"use client";

import { useState, useRef, useEffect } from "react";
import RoleGuard from "@/components/RoleGuard";
import StudentMobileTabs from "@/components/StudentMobileTabs";
import { appStore, StudentVideoStats } from "@/lib/appStore";
import { useToast } from "@/context/ToastContext";
import {
  Film,
  UploadCloud,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Play,
  Trash2,
  X,
  Eye,
  Heart,
  TrendingUp,
  Clock,
} from "lucide-react";

interface UploadedVideoItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  videoUrl: string;
  uploadedAt: string;
  viewsCount?: number;
  likesCount?: number;
  offersCount?: number;
  duration?: number;
}

export default function StudentVideoUploadPage() {
  const { success, error: toastError, info } = useToast();
  const [stats, setStats] = useState<StudentVideoStats | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 投稿済み動画リスト
  const [uploadedVideos, setUploadedVideos] = useState<UploadedVideoItem[]>([
    {
      id: "vid-1",
      title: "体育会サッカー部主将としての挑戦と組織推進力",
      description: "部活動での主将経験を通じて培った、周囲を巻き込んで目標達成する推進力を60秒でアピールしています。",
      tags: ["リーダーシップ", "体育会", "チーム推進力"],
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      uploadedAt: "2026年8月29日",
      viewsCount: 142,
      likesCount: 18,
      offersCount: 3,
    },
  ]);

  useEffect(() => {
    setStats(appStore.getStudentVideoStats());
  }, []);

  const [previewModalVideo, setPreviewModalVideo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = tagInput.trim().replace(/^#/, "");
      if (val && !tags.includes(val) && tags.length < 5) {
        setTags([...tags, val]);
        setTagInput("");
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      toastError("エラー", "動画ファイル（mp4, mov, webm等）を選択してください。");
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      toastError("ファイルサイズ超過", "動画サイズは100MB以下にしてください。");
      return;
    }

    setVideoFile(file);
    const objectUrl = URL.createObjectURL(file);
    setVideoPreview(objectUrl);
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile && !videoPreview) {
      toastError("動画未選択", "動画ファイルを選択してください。");
      return;
    }
    if (!title.trim()) {
      toastError("タイトル未入力", "動画のタイトルを入力してください。");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const newVideo: UploadedVideoItem = {
        id: `vid-${Date.now()}`,
        title: title.trim(),
        description: description.trim(),
        tags: tags.length > 0 ? tags : ["自己PR", "新卒採用"],
        videoUrl: videoPreview || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        uploadedAt: "たった今",
        viewsCount: 1,
        likesCount: 0,
        offersCount: 0,
      };

      setUploadedVideos([newVideo, ...uploadedVideos]);
      setLoading(false);
      setTitle("");
      setDescription("");
      setTags([]);
      setVideoFile(null);
      setVideoPreview(null);
      success("自己PR動画を公開しました！", "企業の動画スワイプ一覧に即時反映されました。");
    }, 600);
  };

  const handleDeleteVideo = (id: string) => {
    if (!confirm("この自己PR動画を削除しますか？")) return;
    setUploadedVideos(uploadedVideos.filter((v) => v.id !== id));
    info("動画を削除しました。");
  };

  return (
    <RoleGuard allowedRoles={["STUDENT", "ADMIN"]}>
      <StudentMobileTabs>
        <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6 w-full">
          {/* ================= 統一ページヘッダー ================= */}
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <Film className="w-3.5 h-3.5" />
              <span>自己PR動画</span>
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              動画投稿・管理
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              60秒の短尺動画であなたの雰囲気・人柄を伝えましょう。スマホ自撮り動画でOKです。
            </p>
          </div>

          {/* ================= 動画エンゲージメント指標 ================= */}
          {stats && (
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-blue-600" />
                  <span>総再生回数</span>
                </span>
                <p className="text-xl sm:text-2xl font-black text-slate-900">{stats.totalViews} <span className="text-xs font-normal text-slate-500">回</span></p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                  <span>気になる獲得</span>
                </span>
                <p className="text-xl sm:text-2xl font-black text-slate-900">{stats.totalLikes} <span className="text-xs font-normal text-slate-500">社</span></p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>オファー獲得</span>
                </span>
                <p className="text-xl sm:text-2xl font-black text-slate-900">{stats.totalOffers} <span className="text-xs font-normal text-slate-500">通</span></p>
              </div>
            </div>
          )}

          {/* ================= 投稿済み動画一覧 ================= */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Film className="w-4 h-4 text-emerald-700" />
              <span>公開中の自己PR動画 ({uploadedVideos.length}本)</span>
            </h2>

            {uploadedVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
              >
                <div className="flex items-start gap-4 flex-1">
                  {/* 動画サムネイル/再生プレビュー */}
                  <div
                    onClick={() => setPreviewModalVideo(video.videoUrl)}
                    className="w-20 h-28 sm:w-24 sm:h-32 rounded-xl bg-slate-900 overflow-hidden relative group cursor-pointer flex-shrink-0 shadow-2xs border border-slate-200"
                  >
                    <video src={video.videoUrl} className="w-full h-full object-cover" preload="metadata" />
                    <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/10 flex items-center justify-center transition-colors">
                      <div className="w-8 h-8 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <Play className="w-4 h-4 ml-0.5 fill-current" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">{video.title}</h3>
                    {video.description && (
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{video.description}</p>
                    )}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {video.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <span className="text-[11px] text-slate-400 font-medium">{video.uploadedAt}</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewModalVideo(video.videoUrl)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      再生確認
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteVideo(video.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                      title="動画を削除"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ================= 新規動画アップロードフォーム ================= */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-5">
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <UploadCloud className="w-4 h-4 text-emerald-700" />
              <span>新しい自己PR動画を投稿する</span>
            </h2>

            <form onSubmit={handleUpload} className="space-y-4">
              {/* ドロップゾーン */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
                  videoPreview
                    ? "border-emerald-500 bg-emerald-50/20"
                    : "border-slate-300 hover:border-emerald-500 hover:bg-slate-50"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {videoPreview ? (
                  <div className="space-y-3">
                    <div className="w-24 h-36 rounded-xl bg-slate-900 overflow-hidden mx-auto shadow-md">
                      <video src={videoPreview} className="w-full h-full object-cover" controls />
                    </div>
                    <p className="text-xs font-bold text-emerald-800">動画が選択されました（クリックで変更）</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-slate-800">動画ファイルを選択またはドラッグ＆ドロップ</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">MP4, MOV, WebM形式 (最大100MB / 60秒推奨)</p>
                    </div>
                  </div>
                )}
              </div>

              {/* タイトル */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  動画タイトル <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="例: 行動力と巻き込み力で組織を変革した経験"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                />
              </div>

              {/* タグ */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  動画タグ（最大5個）
                </label>
                <div className="flex flex-wrap gap-1.5 mb-1.5">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200"
                    >
                      <span>#{t}</span>
                      <button type="button" onClick={() => removeTag(t)} className="hover:text-rose-600">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="タグを入力してEnter（例: リーダーシップ, 笑顔）"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                />
              </div>

              {/* 説明文 */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">補足説明（任意）</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="動画の補足情報や見てほしいポイント"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <UploadCloud className="w-4 h-4" />
                <span>{loading ? "動画を公開中..." : "自己PR動画を公開する"}</span>
              </button>
            </form>
          </div>
        </div>

        {/* プレビューモーダル */}
        {previewModalVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs animate-fade-in">
            <div className="bg-slate-950 rounded-3xl p-4 max-w-sm w-full relative shadow-2xl border border-slate-800 space-y-3">
              <button
                type="button"
                onClick={() => setPreviewModalVideo(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="aspect-[9/16] rounded-2xl overflow-hidden bg-black">
                <video src={previewModalVideo} className="w-full h-full object-cover" autoPlay controls />
              </div>
            </div>
          </div>
        )}
      </StudentMobileTabs>
    </RoleGuard>
  );
}
