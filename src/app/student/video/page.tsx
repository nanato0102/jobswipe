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
  Tag,
  Play,
  Trash2,
  Calendar,
  X,
  Eye,
  Heart,
  TrendingUp,
  BarChart3,
  Send,
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
  const [videoDuration, setVideoDuration] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // 投稿済み動画リスト（管理用）
  const [uploadedVideos, setUploadedVideos] = useState<UploadedVideoItem[]>([
    {
      id: "vid-1",
      title: "体育会サッカー部主将としての挑戦と組織推進力",
      description: "部活動での主将経験を通じて培った、周囲を巻き込んで目標達成する推進力を60秒でアピールしています。",
      tags: ["リーダーシップ", "体育会", "チーム推進力"],
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      uploadedAt: "2026年8月29日 12:00",
      viewsCount: 142,
      likesCount: 18,
      offersCount: 3,
    },
  ]);

  useEffect(() => {
    setStats(appStore.getStudentVideoStats());
  }, []);

  const [previewModalVideo, setPreviewModalVideo] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // タグ追加（Enterキー）
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = tagInput.trim().replace(/^#/, "");
      if (val && !tags.includes(val)) {
        setTags([...tags, val]);
        setTagInput("");
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // 1. ファイルサイズチェック（最大100MB）
      const maxSizeBytes = 100 * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        toastError(
          "動画サイズが大きすぎます",
          "アップロードできる動画は100MB以下にしてください。"
        );
        handleClearSelectedVideo();
        return;
      }

      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoPreview(url);

      // 2. 動画の長さ（尺）をメタデータから取得（60秒以内推奨）
      const tempVideo = document.createElement("video");
      tempVideo.src = url;
      tempVideo.onloadedmetadata = () => {
        const sec = Math.round(tempVideo.duration);
        setVideoDuration(sec);
        if (sec > 65) {
          info(
            "動画の長さについて",
            `選択された動画は${sec}秒です。JobSwipeでは60秒以内の短尺動画が企業に最も視聴されやすいです。`
          );
        }
      };
    }
  };

  const [uploadProgress, setUploadProgress] = useState(0);

  const handleClearSelectedVideo = () => {
    setVideoFile(null);
    setVideoPreview(null);
    setVideoDuration(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoPreview) {
      toastError("動画を選択してください", "自己PR動画ファイルが必要です。");
      return;
    }

    setLoading(true);
    setUploadProgress(15);
    setStatus(null);

    try {
      // 1. S3 Presigned URL API / アップロードエンドポイント呼び出し
      setUploadProgress(45);
      const res = await fetch("/api/videos/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: videoFile?.name || "pr-video.mp4",
          fileType: videoFile?.type || "video/mp4",
          fileSize: videoFile?.size || 15 * 1024 * 1024,
        }),
      });

      setUploadProgress(85);
      const data = await res.json();
      const finalUrl = data.finalVideoUrl || videoPreview;

      setUploadProgress(100);

      const newVideo: UploadedVideoItem = {
        id: `vid-${Date.now()}`,
        title: title || "私の60秒自己PR",
        description: description,
        tags: tags.length > 0 ? tags : ["笑顔", "成長意欲"],
        videoUrl: finalUrl,
        duration: videoDuration || 45,
        uploadedAt: new Date().toLocaleDateString("ja-JP", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        viewsCount: 1,
        likesCount: 0,
        offersCount: 0,
      };

      setUploadedVideos([newVideo, ...uploadedVideos]);
      success("自己PR動画をAWS S3ストレージへ正常に公開しました！", "企業のスワイプ一覧に即時公開されました。");
      handleClearSelectedVideo();
      setTitle("");
      setDescription("");
      setTags([]);
    } catch (err: any) {
      toastError("投稿に失敗しました", "ネットワーク状況をお確かめください。");
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const handleDeleteVideo = (id: string) => {
    setUploadedVideos(uploadedVideos.filter((v) => v.id !== id));
    setDeleteConfirmId(null);
    setStatus({ type: "success", message: "動画を削除しました。" });
  };

  return (
    <RoleGuard allowedRoles={["STUDENT", "ADMIN"]}>
      <StudentMobileTabs>
        <div className="flex-1 py-6 px-4 sm:px-6 max-w-4xl mx-auto w-full space-y-6 sm:space-y-8">
          {/* ================= 動画反響・視聴実績アナリティクス ================= */}
          {stats && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-700" />
                  <h2 className="text-base font-bold text-slate-900">自己PR動画のアナリティクス（企業からの視聴・注目度）</h2>
                </div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                  リアルタイム集計中
                </span>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-1">
                {/* 1. 総視聴回数 */}
                <div className="bg-slate-900 border border-slate-800 text-white rounded-xl p-4 sm:p-5 shadow-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300">総視聴回数</span>
                    <Eye className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white">{stats.totalViews}</span>
                    <span className="text-xs text-slate-300 font-medium">回</span>
                  </div>
                  <p className="text-[11px] text-slate-400">企業が動画を再生した回数</p>
                </div>

                {/* 2. 気になる追加数 */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-600">気になる獲得</span>
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">{stats.totalLikes}</span>
                    <span className="text-xs text-slate-400 font-medium">社</span>
                  </div>
                  <p className="text-[11px] text-slate-400">興味を持った企業数</p>
                </div>

                {/* 3. 届いたオファー */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-600">届いたオファー</span>
                    <Send className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-bold tracking-tight text-emerald-700">{stats.totalOffers}</span>
                    <span className="text-xs text-slate-400 font-medium">社</span>
                  </div>
                  <p className="text-[11px] text-slate-400">直接スカウトに発展</p>
                </div>

                {/* 4. 平均視聴完了率 */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-600">平均視聴完了率</span>
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">{stats.completionRate}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">60秒の視聴維持率</p>
                </div>
              </div>
            </div>
          )}

          {/* ================= 新規動画投稿フォーム ================= */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200 mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>自己PR動画</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Film className="h-5 w-5 text-emerald-700" />
              <span>動画投稿</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              スマートフォンで撮影した60秒以内の縦型自己PR動画を投稿してください
            </p>
          </div>

          {/* 60秒お題カンペガイド */}
          <div className="p-5 bg-emerald-50/80 border border-emerald-200 rounded-xl space-y-3 shadow-2xs">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs sm:text-sm">
              <Sparkles className="w-4 h-4 text-emerald-700 flex-shrink-0" />
              <span>何を話せばいいか迷ったら？ 60秒お題カンペガイド</span>
            </div>
            <p className="text-xs text-emerald-900/80 leading-relaxed">
              立派なスピーチや志望動機は不要です。スマートフォンで自撮りしながら、以下の3つの順に普段の自然なトーンで話すだけで完了します。
            </p>
            <div className="grid sm:grid-cols-3 gap-2.5 pt-1">
              <div className="p-3.5 bg-white rounded-lg border border-emerald-200 shadow-2xs space-y-1.5">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                  01. 挨拶 (約5秒)
                </span>
                <p className="text-xs font-bold text-slate-800">
                  「〇〇大学〇年の〇〇です！」
                </p>
                <p className="text-[11px] text-slate-500">笑顔で明るくスタート</p>
              </div>

              <div className="p-3.5 bg-white rounded-lg border border-emerald-200 shadow-2xs space-y-1.5">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                  02. 人柄・熱量 (約35秒)
                </span>
                <p className="text-xs font-bold text-slate-800">
                  「周囲からはよく〇〇と言われます」
                </p>
                <p className="text-[11px] text-slate-500">性格や最近夢中なことを1つ</p>
              </div>

              <div className="p-3.5 bg-white rounded-lg border border-emerald-200 shadow-2xs space-y-1.5">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                  03. 意気込み (約20秒)
                </span>
                <p className="text-xs font-bold text-slate-800">
                  「こんなチームで挑戦したいです！」
                </p>
                <p className="text-[11px] text-slate-500">興味のある分野や会いたい企業像</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 動画ファイルアップロードエリア */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                動画ファイル（MP4 / MOV、最大60秒） <span className="text-rose-500">*</span>
              </label>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-3xl p-6 text-center cursor-pointer transition-colors bg-slate-50 hover:bg-emerald-50/30 group"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="video/mp4,video/quicktime,video/webm"
                  className="hidden"
                />

                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-slate-500 group-hover:text-emerald-600 group-hover:border-emerald-300 flex items-center justify-center shadow-sm transition-colors">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-700">
                      動画ファイルを選択またはドラッグ＆ドロップ
                    </span>
                    <p className="text-[11px] text-slate-400 mt-0.5">MP4, MOV, WebM (推奨: 9:16縦型, 100MB以内)</p>
                  </div>
                </div>
              </div>

              {/* プレビュー表示（動画選択時のみ） */}
              {videoPreview && (
                <div className="pt-2 animate-fade-in">
                  <div className="flex items-center justify-between text-xs text-slate-600 mb-2 font-bold px-1">
                    <span className="flex items-center gap-1.5 text-emerald-700">
                      <CheckCircle className="w-4 h-4" />
                      <span>選択中の動画プレビュー</span>
                      {videoDuration !== null && (
                        <span className="ml-1.5 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{videoDuration}秒</span>
                        </span>
                      )}
                    </span>
                    <button
                      type="button"
                      onClick={handleClearSelectedVideo}
                      className="text-[11px] text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-1 font-bold cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>選択解除</span>
                    </button>
                  </div>
                  <div className="max-w-[220px] mx-auto rounded-2xl overflow-hidden bg-black shadow-lg aspect-[9/16]">
                    <video src={videoPreview} controls className="w-full h-full object-cover" />
                  </div>
                </div>
              )}
            </div>

            {/* タイトル */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                動画タイトル <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="例: 体育会サッカー部主将としての挑戦と組織推進力"
                className="w-full text-xs sm:text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 font-medium"
              />
            </div>

            {/* 説明文 */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">動画の見どころ・補足説明</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="動画で話している内容の要約や、特に注目してほしいポイントを記載してください"
                className="w-full text-xs sm:text-sm border border-slate-300 rounded-lg p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 leading-relaxed"
              />
            </div>

            {/* 特徴タグ（Enterで箱になるChip UI） */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                特徴・アピールタグ（Enterキーで追加）
              </label>
              <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-50 border border-slate-300 rounded-lg min-h-[44px]">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-300 rounded-md text-xs font-semibold text-slate-800 shadow-2xs"
                  >
                    <span>#{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-slate-400 hover:text-rose-600 rounded-full"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder={tags.length === 0 ? "タグを入力してEnter（例: 笑顔, 英語対応可）" : "追加してEnter"}
                  className="flex-1 bg-transparent text-xs sm:text-sm text-slate-900 outline-none min-w-[80px] px-2 py-1"
                />
              </div>
            </div>

            {/* アップロードプログレスバー */}
            {loading && (
              <div className="space-y-2 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl animate-fade-in">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
                  <span className="flex items-center gap-1.5">
                    <UploadCloud className="w-4 h-4 text-emerald-700 animate-bounce" />
                    <span>AWS S3 クラウドストレージへアップロード中...</span>
                  </span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full h-2.5 bg-emerald-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-[11px] text-emerald-700">
                  大容量動画を軽量化・ストリーミング最適化処理しています。そのままお待ちください。
                </p>
              </div>
            )}

            {/* 送信ボタン */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-600 active:scale-98 text-white text-xs sm:text-sm font-bold rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                <Film className="w-4 h-4" />
                <span>{loading ? "S3アップロード・公開処理中..." : "この動画を投稿・更新する"}</span>
              </button>
            </div>
          </form>
        </div>

        {/* ================= 下部: 投稿済み動画の管理・削除セクション ================= */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Film className="w-4 h-4 text-emerald-700" />
                <span>現在公開中のPR動画（{uploadedVideos.length}件）</span>
              </h2>
              <p className="text-xs text-slate-500">企業の検索やスワイプ画面で閲覧されているあなたの動画一覧です</p>
            </div>
          </div>

          <div className="space-y-4">
            {uploadedVideos.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 rounded-lg border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-200">
                      公開中
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.uploadedAt}</span>
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>

                  {/* 動画アナリティクスバッジ */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-md bg-slate-900 text-white shadow-2xs">
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{item.viewsCount ?? 142}回 視聴</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-md bg-rose-50 border border-rose-200 text-rose-800 shadow-2xs">
                      <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                      <span>{item.likesCount ?? 18}社 気になる</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 shadow-2xs">
                      <Send className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{item.offersCount ?? 3}社 オファー</span>
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                  <button
                    type="button"
                    onClick={() => setPreviewModalVideo(item.videoUrl)}
                    className="flex-1 sm:flex-none px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-md text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <Play className="w-3.5 h-3.5 fill-slate-700" />
                    <span>再生確認</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteConfirmId(item.id)}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-md text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                    title="動画を削除"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>削除</span>
                  </button>
                </div>
              </div>
            ))}

            {uploadedVideos.length === 0 && (
              <div className="p-8 text-center text-xs text-slate-400">
                まだ公開中の動画はありません。上のフォームからPR動画を投稿してください。
              </div>
            )}
          </div>
        </div>

        {/* ================= 再生プレビューモーダル ================= */}
        {previewModalVideo && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 rounded-3xl border border-slate-800 max-w-sm w-full overflow-hidden shadow-2xl p-4 text-white space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-emerald-400">動画再生プレビュー</span>
                <button
                  onClick={() => setPreviewModalVideo(null)}
                  className="p-1 rounded-full text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="rounded-2xl overflow-hidden bg-black aspect-[9/16] max-h-96 mx-auto">
                <video src={previewModalVideo} controls autoPlay className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        )}

        {/* ================= 削除確認ダイアログ ================= */}
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-slate-200 max-w-sm w-full p-6 shadow-2xl space-y-4">
              <div className="text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
                  <Trash2 className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">このPR動画を削除しますか？</h3>
                <p className="text-xs text-slate-500">
                  削除すると企業側のスワイプ・検索画面から非公開になります。
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  キャンセル
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteVideo(deleteConfirmId)}
                  className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  削除する
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </StudentMobileTabs>
  </RoleGuard>
);
}