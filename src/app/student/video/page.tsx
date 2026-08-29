"use client";

import { useState, useRef, KeyboardEvent } from "react";
import RoleGuard from "@/components/RoleGuard";
import { Film, Upload, CheckCircle, Tag, AlertCircle, Plus, X } from "lucide-react";

export default function StudentVideoPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>(["笑顔", "リーダーシップ", "行動力"]);
  const [tagInput, setTagInput] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("video/")) {
        setError("動画ファイル（.mp4, .mov, .webm 等）を選択してください");
        return;
      }
      setError(null);
      setFileName(file.name);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (indexToRemove: number) => {
    setTags(tags.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl.trim()) {
      setError("PR動画ファイルを選択してください");
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
          tags: tags.join(", "),
          videoUrl,
        }),
      });

      if (!res.ok) {
        throw new Error("動画の登録に失敗しました");
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: any) {
      setError(err.message || "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <RoleGuard allowedRoles={["STUDENT", "ADMIN"]}>
      <div className="flex-1 py-6 px-4 sm:px-6 max-w-3xl mx-auto w-full">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8">
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
            <div className="mb-6 p-3 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-6 p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-semibold flex items-center gap-2 shadow-sm">
              <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>動画を正常に投稿しました！スワイプ画面に掲載されます。</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 動画ファイル アップロード UI */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2">
                PR動画ファイルを選択（またはドラッグ＆ドロップ）
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-emerald-600 bg-slate-50 hover:bg-emerald-50/40 rounded-3xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-2"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-emerald-700">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">
                    {fileName ? `選択中: ${fileName}` : "クリックして動画ファイルを選択"}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">MP4, MOV, WebM など（推奨: 60秒以内・縦型 9:16）</p>
                </div>
              </div>
            </div>

            {/* プレビュー表示 */}
            {videoUrl && (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-3xl">
                <span className="block text-xs font-bold text-slate-700 mb-2">選択した動画のプレビュー</span>
                <div className="w-full max-w-xs rounded-2xl overflow-hidden border border-slate-300 bg-black aspect-[9/16] max-h-72 shadow-md mx-auto">
                  <video src={videoUrl} controls className="w-full h-full object-cover" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">動画タイトル</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="例: 体育会サッカー部主将 / チームを牽引する行動力"
                className="w-full text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">動画の説明文 / 見どころ</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="動画でアピールしている内容や、伝えたいメッセージを簡単に記載してください"
                className="w-full text-sm border border-slate-300 rounded-2xl p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 leading-relaxed"
              />
            </div>

            {/* タグ設定（Enterで独立するタグ入力UI） */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-emerald-700" />
                <span>動画タグ（Enterで追加）</span>
              </label>

              <div className="flex flex-wrap gap-1.5 mb-2 min-h-[28px]">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-full text-xs font-semibold shadow-sm"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(idx)}
                      className="text-emerald-600 hover:text-emerald-950 p-0.5 rounded-full hover:bg-emerald-200 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="例: 笑顔, 英語対応可, リーダーシップ (入力後Enter)"
                  className="flex-1 text-sm border border-slate-300 rounded-2xl px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-2xl transition-colors border border-slate-300 flex items-center gap-1 flex-shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>追加</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">動画の内容に合ったキーワードを入力してEnterを押してください</p>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-8 py-3 bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-bold rounded-2xl transition-colors disabled:opacity-50 shadow-md"
              >
                <Upload className="w-4 h-4" />
                <span>{loading ? "投稿処理中..." : "この動画を投稿する"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </RoleGuard>
  );
}