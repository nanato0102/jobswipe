"use client";

import { useState } from "react";
import { Heart, X, Send, User, GraduationCap, Sparkles, Check } from "lucide-react";
import type { VideoData } from "@/types";

interface SwipeCardProps {
  videos: VideoData[];
  onLike?: (video: VideoData) => void;
  onOffer?: (video: VideoData, message: string) => void;
}

export default function SwipeCard({ videos, onLike, onOffer }: SwipeCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [offerMessage, setOfferMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!videos || videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white border border-slate-200 rounded-2xl shadow-sm text-center max-w-md mx-auto">
        <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
          <Sparkles className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">動画は以上です</h3>
        <p className="text-sm text-slate-500">現在表示できる学生PR動画がありません。後ほど再度ご確認ください。</p>
      </div>
    );
  }

  const currentVideo = videos[currentIndex % videos.length];
  const tagsList = currentVideo.tags ? currentVideo.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];

  const handleNext = () => {
    setStatusMessage(null);
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const handleLike = async () => {
    if (onLike) {
      onLike(currentVideo);
    }
    setStatusMessage("「気になる」に追加しました");
    setTimeout(() => {
      handleNext();
    }, 600);
  };

  const handleSkip = () => {
    handleNext();
  };

  const handleSendOffer = () => {
    if (!offerMessage.trim()) return;
    if (onOffer) {
      onOffer(currentVideo, offerMessage);
    }
    setIsOfferModalOpen(false);
    setOfferMessage("");
    setStatusMessage("スカウトオファーを送信しました");
    setTimeout(() => {
      handleNext();
    }, 800);
  };

  return (
    <div className="relative w-full max-w-md mx-auto flex flex-col items-center">
      {/* ステータス通知 */}
      {statusMessage && (
        <div className="absolute top-4 z-30 bg-slate-900 text-white text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* メインカード */}
      <div className="w-full bg-slate-900 text-white rounded-2xl overflow-hidden shadow-xl border border-slate-800 flex flex-col h-[620px] relative">
        {/* 動画表示エリア */}
        <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
          {currentVideo.videoUrl.endsWith(".mp4") || currentVideo.videoUrl.startsWith("http") ? (
            <video
              key={currentVideo.id}
              src={currentVideo.videoUrl}
              className="w-full h-full object-cover"
              controls
              playsInline
              loop
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-500 p-6 text-center">
              <Sparkles className="w-12 h-12 mb-2 text-slate-400" />
              <p className="text-sm">動画プレビュー準備中</p>
            </div>
          )}

          {/* 右上インデックス表示 */}
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur px-2.5 py-1 rounded-full text-xs font-medium text-slate-300">
            {(currentIndex % videos.length) + 1} / {videos.length}
          </div>
        </div>

        {/* 下部情報オーバーレイ */}
        <div className="p-5 bg-slate-900 border-t border-slate-800 space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" />
                {currentVideo.student?.fullName || "学生ユーザー"}
              </h2>
              {currentVideo.student?.graduationYear && (
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5" />
                  {currentVideo.student.graduationYear}年卒
                </span>
              )}
            </div>
            {currentVideo.student?.university && (
              <p className="text-xs text-slate-400 mt-0.5">{currentVideo.student.university}</p>
            )}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-200">{currentVideo.title}</h3>
            {currentVideo.description && (
              <p className="text-xs text-slate-400 line-clamp-2 mt-1">{currentVideo.description}</p>
            )}
          </div>

          {/* タグ一覧 */}
          {tagsList.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {tagsList.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700 font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* 操作アクションボタン */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleSkip}
              className="flex-1 mr-2 flex items-center justify-center gap-1.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-xl border border-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
              <span>スキップ</span>
            </button>

            <button
              onClick={handleLike}
              className="flex-1 mr-2 flex items-center justify-center gap-1.5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>気になる</span>
            </button>

            <button
              onClick={() => setIsOfferModalOpen(true)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span>オファー</span>
            </button>
          </div>
        </div>
      </div>

      {/* オファー送信モーダル */}
      {isOfferModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200">
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
              className="w-full text-sm border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-slate-900"
            />

            <div className="mt-4 flex gap-2 justify-end">
              <button
                onClick={() => setIsOfferModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                キャンセル
              </button>
              <button
                onClick={handleSendOffer}
                disabled={!offerMessage.trim()}
                className="px-4 py-2 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50"
              >
                送信する
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
