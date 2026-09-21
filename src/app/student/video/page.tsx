"use client";

import { useState, useRef, useEffect } from "react";
import RoleGuard from "@/components/RoleGuard";
import StudentMobileTabs from "@/components/StudentMobileTabs";
import { appStore, StudentVideoStats } from "@/lib/appStore";
import { useToast } from "@/context/ToastContext";
import {
  Film,
  UploadCloud,
  Sparkles,
  Play,
  Trash2,
  X,
  Eye,
  Heart,
  Lightbulb,
  Check,
  ShieldCheck,
} from "lucide-react";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

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
  const { session } = useAuth();
  const { success, error: toastError, info } = useToast();
  const [stats, setStats] = useState<StudentVideoStats | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const currentStudentId = session?.id || "s1";

  // 投稿済み動画リスト
  const [uploadedVideos, setUploadedVideos] = useState<UploadedVideoItem[]>([]);

  const loadData = async () => {
    setStats(appStore.getStudentVideoStats());
    const detail = appStore.getStudentDetails(currentStudentId);
    const localVideos = appStore.getStudentVideos(currentStudentId);

    try {
      const res = await fetch("/api/videos");
      if (res.ok) {
        const dbVideos = await res.json();
        // 現在の学生に該当する動画、または初期動画
        const matched = dbVideos.filter(
          (v: any) =>
            v.studentId === currentStudentId ||
            v.student?.user?.email === session?.email ||
            (v.student?.id && v.student.id === currentStudentId)
        );

        if (matched.length > 0) {
          setUploadedVideos(
            matched.map((v: any) => ({
              id: v.id,
              title: v.title,
              description: v.description || "",
              tags: v.tags ? v.tags.split(",").map((t: string) => t.trim()).filter(Boolean) : [],
              videoUrl: v.videoUrl,
              uploadedAt: new Date(v.uploadedAt || Date.now()).toLocaleDateString("ja-JP"),
              viewsCount: 142,
              likesCount: 18,
              offersCount: 3,
            }))
          );
          return;
        }
      }
    } catch (e) {
      console.warn("Fetch videos error:", e);
    }

    if (localVideos.length > 0) {
      setUploadedVideos(
        localVideos.map((v) => ({
          id: v.id,
          title: v.title,
          description: v.description || "",
          tags: v.tags ? v.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
          videoUrl: v.videoUrl,
          uploadedAt: new Date(v.uploadedAt).toLocaleDateString("ja-JP"),
          viewsCount: 142,
          likesCount: 18,
          offersCount: 3,
        }))
      );
    } else {
      setUploadedVideos([
        {
          id: "v-s1",
          title: "体育会サッカー部主将としての挑戦と組織推進力",
          description: "部活動での主将経験を通じて培った、周囲を巻き込んで目標達成する推進力を60秒でアピールしています。",
          tags: detail?.personalityTags || ["発信・オープン型", "現実・着実型", "論理・合理型", "柔軟・スピード型"],
          videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          uploadedAt: "2026年8月29日",
          viewsCount: 142,
          likesCount: 18,
          offersCount: 3,
        },
      ]);
    }
  };

  useEffect(() => {
    loadData();

    const handleSync = () => {
      loadData();
    };

    window.addEventListener("jobswipe_sync", handleSync);
    window.addEventListener("storage", handleSync);

    return () => {
      window.removeEventListener("jobswipe_sync", handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, [currentStudentId]);

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

    if (file.size > 50 * 1024 * 1024) {
      toastError("ファイルサイズ超過", "動画サイズは50MB以下にしてください。");
      return;
    }

    setVideoFile(file);
    const objectUrl = URL.createObjectURL(file);
    setVideoPreview(objectUrl);
  };

  const handleUpload = async (e: React.FormEvent) => {
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

    try {
      const detail = appStore.getStudentDetails(currentStudentId);
      const combinedTags = Array.from(new Set([...(detail?.personalityTags || []), ...tags]));
      const tagsString = combinedTags.join(",");

      let uploadedPublicUrl = videoPreview || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

      // 実際のファイルがある場合は Supabase Storage へアップロード
      if (videoFile) {
        const formData = new FormData();
        formData.append("video", videoFile);
        formData.append("title", title.trim());
        formData.append("description", description.trim());
        formData.append("tags", tagsString);
        formData.append("studentId", currentStudentId);

        const uploadRes = await fetch("/api/videos/upload", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) {
          throw new Error(uploadData.error || "動画のアップロードに失敗しました。");
        }

        uploadedPublicUrl = uploadData.videoUrl;
      }

      // appStore に動画を登録（企業スワイプ画面へ即座に反映）
      const newVideo = appStore.addVideo({
        studentId: currentStudentId,
        title: title.trim(),
        description: description.trim(),
        tags: tagsString,
        videoUrl: uploadedPublicUrl,
        thumbnailUrl: null,
        student: {
          id: currentStudentId,
          fullName: session?.name || detail?.name || "学生ユーザー",
          university: detail?.university || "大学情報",
          graduationYear: detail?.graduationYear || 2027,
          bio: detail?.bio || description.trim(),
          skills: "",
          experience: "",
          user: { id: `u-${currentStudentId}`, email: session?.email || "student@example.com" },
        },
      });

      const newItem: UploadedVideoItem = {
        id: newVideo.id,
        title: newVideo.title,
        description: newVideo.description || "",
        tags: combinedTags,
        videoUrl: newVideo.videoUrl,
        uploadedAt: "たった今",
        viewsCount: 1,
        likesCount: 0,
        offersCount: 0,
      };

      setUploadedVideos([newItem, ...uploadedVideos]);
      setTitle("");
      setDescription("");
      setTags([]);
      setVideoFile(null);
      setVideoPreview(null);
      success("自己PR動画を公開しました！", "クラウドストレージ（Supabase）に保存され、企業の動画スワイプ一覧（/swipe）の先頭に即時反映されました。");
    } catch (err: any) {
      toastError("投稿エラー", err.message || "動画の公開に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVideo = (id: string) => {
    if (!confirm("この自己PR動画を削除しますか？")) return;
    appStore.deleteVideo(id);
    setUploadedVideos(uploadedVideos.filter((v) => v.id !== id));
    info("動画を削除しました。企業の動画スワイプ一覧からも即時除外されました。");
  };

  return (
    <RoleGuard allowedRoles={["STUDENT", "ADMIN"]}>
      <StudentMobileTabs>
        <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6 w-full">
          {/* ================= 統一ページヘッダー ＆ タブショートカット ================= */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <Film className="w-3.5 h-3.5" />
                <span>自己PR動画</span>
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                動画投稿・管理
              </h1>
              <p className="text-sm text-slate-500">
                60秒の短尺動画であなたの雰囲気・人柄を伝えましょう。スマホ自撮り動画でOKです。
              </p>
            </div>

            {/* 上部クイックリンク */}
            <div className="flex items-center gap-2 flex-wrap">
              <Link
                href="/student/profile"
                className="px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
              >
                ← プロフィール設定
              </Link>
              <Link
                href="/student/offers"
                className="px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
              >
                オファー一覧 →
              </Link>
            </div>
          </div>

          {/* ================= 動画エンゲージメント指標 ================= */}
          {stats && (
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs space-y-1">
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-blue-600" />
                  <span>総再生回数</span>
                </span>
                <p className="text-xl sm:text-2xl font-bold text-slate-900">{stats.totalViews} <span className="text-xs font-normal text-slate-500">回</span></p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs space-y-1">
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                  <span>気になる獲得</span>
                </span>
                <p className="text-xl sm:text-2xl font-bold text-slate-900">{stats.totalLikes} <span className="text-xs font-normal text-slate-500">社</span></p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs space-y-1">
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>オファー獲得</span>
                </span>
                <p className="text-xl sm:text-2xl font-bold text-slate-900">{stats.totalOffers} <span className="text-xs font-normal text-slate-500">通</span></p>
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
                className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
              >
                <div className="flex items-start gap-4 flex-1">
                  {/* 動画サムネイル/再生プレビュー */}
                  <div
                    onClick={() => setPreviewModalVideo(video.videoUrl)}
                    className="w-20 h-28 sm:w-24 sm:h-32 rounded-lg bg-slate-900 overflow-hidden relative group cursor-pointer flex-shrink-0 shadow-2xs border border-slate-200"
                  >
                    <video
                      src={video.videoUrl}
                      className="w-full h-full object-cover select-none pointer-events-none"
                      preload="metadata"
                      onContextMenu={(e) => e.preventDefault()}
                    />
                    <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/10 flex items-center justify-center transition-colors">
                      <div className="w-8 h-8 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <Play className="w-4 h-4 ml-0.5 fill-current" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">{video.title}</h3>
                    {video.description && (
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">{video.description}</p>
                    )}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {video.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <span className="text-xs text-slate-400 font-medium">{video.uploadedAt}</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewModalVideo(video.videoUrl)}
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-md transition-colors cursor-pointer"
                    >
                      再生確認
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteVideo(video.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer rounded-md"
                      title="動画を削除"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ================= 60秒自己PR動画の撮影のコツ & 構成ガイド ================= */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>60秒自己PR動画の構成例 ＆ 撮影のコツ</span>
              </h2>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                スカウト獲得率UP
              </span>
            </div>

            {/* 3ステップ構成 */}
            <div className="grid sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-emerald-800 bg-emerald-100/70 px-1.5 py-0.5 rounded text-xs">
                    01. 冒頭 (約5秒)
                  </span>
                  <span className="text-slate-400 text-xs">第一印象</span>
                </div>
                <p className="font-bold text-slate-900 pt-1 text-sm">挨拶 ＋ 強みの結論</p>
                <p className="text-slate-600 text-xs leading-relaxed">
                  「〇〇大学の佐藤です。私の強みはチームを前に進める行動力です！」など簡潔に。
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-blue-800 bg-blue-100/70 px-1.5 py-0.5 rounded text-xs">
                    02. 本論 (約45秒)
                  </span>
                  <span className="text-slate-400 text-xs">具体エピソード</span>
                </div>
                <p className="font-bold text-slate-900 pt-1 text-sm">実体験・課題解決</p>
                <p className="text-slate-600 text-xs leading-relaxed">
                  部活・研究・インターン・アルバイトで直面した課題と、自分が工夫した行動を話します。
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-amber-800 bg-amber-100/70 px-1.5 py-0.5 rounded text-xs">
                    03. 結び (約10秒)
                  </span>
                  <span className="text-slate-400 text-xs">意気込み</span>
                </div>
                <p className="font-bold text-slate-900 pt-1 text-sm">面談へのメッセージ</p>
                <p className="text-slate-600 text-xs leading-relaxed">
                  「ぜひ一度カジュアル面談でお話しできるのを楽しみにしています！」と笑顔で締めます。
                </p>
              </div>
            </div>

            {/* 撮影ポイントリスト */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-600">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
                <span>スマホ縦向き（9:16）で自撮り</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
                <span>目線はインカメラを意識</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
                <span>明るい室内・静かな環境</span>
              </span>
              <span className="flex items-center gap-1.5 text-slate-400 ml-auto">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>動画は完全審査制で保護管理</span>
              </span>
            </div>
          </div>

          {/* ================= 新規動画アップロードフォーム ================= */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-5">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <UploadCloud className="w-4 h-4 text-emerald-700" />
              <span>新しい自己PR動画を投稿する</span>
            </h2>

            <form onSubmit={handleUpload} className="space-y-4">
              {/* ドロップゾーン */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-lg p-6 sm:p-8 text-center cursor-pointer transition-all ${
                  videoPreview
                    ? "border-emerald-500 bg-emerald-50/20"
                    : "border-slate-300 hover:border-slate-800 hover:bg-slate-50"
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
                    <div className="w-24 h-36 rounded-lg bg-slate-900 overflow-hidden mx-auto shadow-md">
                      <video
                        src={videoPreview}
                        className="w-full h-full object-cover select-none"
                        controls
                        controlsList="nodownload"
                        disablePictureInPicture
                        onContextMenu={(e) => e.preventDefault()}
                      />
                    </div>
                    <p className="text-sm font-semibold text-emerald-800">動画が選択されました（クリックで変更）</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">動画ファイルを選択またはドラッグ＆ドロップ</p>
                      <p className="text-xs text-slate-400 mt-0.5">MP4, MOV, WebM形式 (最大100MB / 60秒推奨)</p>
                    </div>
                  </div>
                )}
              </div>

              {/* タイトル */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-700">
                  動画タイトル <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="例: 行動力と巻き込み力で組織を変革した経験"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-md text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                />
              </div>

              {/* タグ */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  動画タグ（最大5個）
                </label>
                <div className="flex flex-wrap gap-1.5 mb-1.5">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-md border border-emerald-200"
                    >
                      <span>#{t}</span>
                      <button type="button" onClick={() => removeTag(t)} className="hover:text-rose-600 cursor-pointer">
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
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                />
              </div>

              {/* 説明文 */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-700">補足説明（任意）</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="動画の補足情報や見てほしいポイント"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-md text-sm font-semibold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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
            <div className="bg-slate-950 rounded-xl p-4 max-w-sm w-full relative shadow-2xl border border-slate-800 space-y-3">
              <button
                type="button"
                onClick={() => setPreviewModalVideo(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="aspect-[9/16] rounded-lg overflow-hidden bg-black">
                <video
                  src={previewModalVideo}
                  className="w-full h-full object-cover select-none"
                  autoPlay
                  controls
                  controlsList="nodownload"
                  disablePictureInPicture
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
            </div>
          </div>
        )}
      </StudentMobileTabs>
    </RoleGuard>
  );
}
