"use client";

import { useState } from "react";
import RoleGuard from "@/components/RoleGuard";
import { Film, Upload, CheckCircle, Tag, AlertCircle } from "lucide-react";

export default function StudentVideoPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl.trim()) {
      setError("動画URLまたは動画ファイルを設定してください");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          tags,
          videoUrl,
        }),
      });

      if (!res.ok) {
        throw new Error("動画の登録に失敗しました");
      }

      setSuccess(true);
      setTitle("");
      setDescription("");
      setTags("");
      setVideoUrl("");
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: any) {
      setError(err.message || "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSample = (url: string, defaultTitle: string, defaultTags: string) => {
    setVideoUrl(url);
    setTitle(defaultTitle);
    setTags(defaultTags);
  };

  return (
    <RoleGuard allowedRoles={["STUDENT", "ADMIN"]}>
      <div className="flex-1 py-6 px-4 sm:px-6 max-w-3xl mx-auto w-full">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
            <div>
              <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Film className="w-5 h-5 text-emerald-700" />
                <span>自己PR動画の投稿・管理</span>
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                60秒の自己紹介動画で、企業にあなたの人柄や熱意を伝えましょう（学生専用）
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>動画を正常に投稿しました！スワイプ画面に掲載されます。</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* サンプル選択（デモ用） */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <span className="text-xs font-semibold text-slate-700">デモ用サンプル動画から選択:</span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() =>
                    handleSelectSample(
                      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
                      "部活動でのリーダーシップ経験と挑戦心",
                      "リーダーシップ, 粘り強さ, 行動力"
                    )
                  }
                  className="text-xs px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-emerald-50 hover:border-emerald-300 text-slate-700 font-medium transition-colors"
                >
                  サンプル 1 (リーダーシップ)
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleSelectSample(
                      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
                      "留学経験と英語プレゼンテーション",
                      "留学, 英語対応可, 笑顔"
                    )
                  }
                  className="text-xs px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-emerald-50 hover:border-emerald-300 text-slate-700 font-medium transition-colors"
                >
                  サンプル 2 (語学力・留学)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">動画URL / ストレージURL</label>
              <input
                type="url"
                required
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://example.com/my-pr-video.mp4"
                className="w-full text-sm border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
              <p className="text-[11px] text-slate-500 mt-1">※ MP4などの動画URLを入力してください（AWS S3等への保存を想定）</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">動画タイトル</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="例: 体育会サッカー部主将 / チームを牽引する行動力"
                className="w-full text-sm border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">動画の説明文 / 見どころ</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="動画でアピールしている内容や、伝えたいメッセージを簡単に記載してください"
                className="w-full text-sm border border-slate-300 rounded-xl p-3.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-emerald-700" />
                <span>タグ設定（カンマ区切り）</span>
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="笑顔, 英語対応可, リーダーシップ, エンジニア志望"
                className="w-full text-sm border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            {/* プレビュー */}
            {videoUrl && (
              <div className="pt-2">
                <span className="block text-xs font-semibold text-slate-700 mb-2">動画プレビュー</span>
                <div className="w-full max-w-xs rounded-2xl overflow-hidden border border-slate-300 bg-black aspect-[9/16] max-h-72 shadow-md">
                  <video src={videoUrl} controls className="w-full h-full object-cover" />
                </div>
              </div>
            )}

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50 shadow-sm"
              >
                <Upload className="w-4 h-4" />
                <span>{loading ? "投稿処理中..." : "動画を投稿する"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </RoleGuard>
  );
}