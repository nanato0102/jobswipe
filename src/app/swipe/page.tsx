"use client";

import { useEffect, useState, useMemo } from "react";
import SwipeCard from "@/components/SwipeCard";
import RoleGuard from "@/components/RoleGuard";
import CompanyMobileTabs from "@/components/CompanyMobileTabs";
import { PERSONALITY_AXES } from "@/lib/personalityModel";
import { appStore } from "@/lib/appStore";
import { SlidersHorizontal, Check, RefreshCw } from "lucide-react";
import type { VideoData } from "@/types";

export default function SwipePage() {
  const [videos, setVideos] = useState<VideoData[]>(() => appStore.getDemoVideos());
  const [loading, setLoading] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch("/api/videos");
        if (res.ok) {
          const data = await res.json();
          const list = Array.isArray(data) ? data : data.videos || [];
          if (list.length > 0) {
            setVideos(list);
          }
        }
      } catch (err) {
        console.warn("Using local demo videos", err);
      }
    }
    fetchVideos();
  }, []);

  // 4軸MECE人柄タグによるリアルタイムフィルタリング
  const filteredVideos = useMemo(() => {
    if (!selectedTag) return videos;
    return videos.filter((v) => {
      const sId = v.student?.id || v.studentId || "s1";
      const detail = appStore.getStudentDetails(sId);
      const tags =
        detail?.personalityTags && detail.personalityTags.length > 0
          ? detail.personalityTags
          : v.tags
          ? v.tags.split(",").map((t) => t.trim()).filter(Boolean)
          : [];
      return tags.includes(selectedTag);
    });
  }, [videos, selectedTag]);

  const handleLike = async (video: VideoData) => {
    try {
      await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: video.studentId }),
      });
    } catch (err) {
      console.error("Like error", err);
    }
  };

  const handleOffer = async (video: VideoData, message: string) => {
    try {
      await fetch("/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: video.student?.user?.id || video.studentId,
          message,
        }),
      });
    } catch (err) {
      console.error("Offer error", err);
    }
  };

  return (
    <RoleGuard allowedRoles={["COMPANY", "ADMIN"]}>
      <CompanyMobileTabs>
        <div className="flex-1 flex flex-col justify-center items-center p-3 sm:p-6 w-full max-w-5xl mx-auto">
          {/* 画面ヘッダー */}
          <div className="text-center mb-4 max-w-2xl">
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">自己PR動画スワイプ</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              学生の人柄・行動特性（4軸MECE）をもとに、求める人物像に合致する候補者を直感的にスカウトできます。
            </p>
          </div>

          {/* MBTI準拠 4軸人柄スマートフィルターバー */}
          <div className="w-full bg-white border border-slate-200/90 rounded-xl p-3 sm:p-4 mb-5 shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-700" />
                <span>人柄・行動特性フィルター（MBTI準拠）</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">
                  {filteredVideos.length}名 / 全{videos.length}名
                </span>
                {selectedTag && (
                  <button
                    onClick={() => setSelectedTag(null)}
                    className="text-xs text-slate-600 hover:text-slate-900 font-semibold flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded cursor-pointer transition-colors"
                    title="フィルターをクリア"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>解除</span>
                  </button>
                )}
              </div>
            </div>

            {/* 4軸の2択ピル型ボタン一覧 */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setSelectedTag(null)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedTag === null
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                すべて表示
              </button>

              {PERSONALITY_AXES.map((axis) => (
                <div key={axis.id} className="flex items-center gap-1 bg-slate-100/70 p-0.5 rounded-lg border border-slate-200/80">
                  <button
                    type="button"
                    onClick={() => setSelectedTag(selectedTag === axis.optionA.label ? null : axis.optionA.label)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer flex items-center gap-1 ${
                      selectedTag === axis.optionA.label
                        ? "bg-emerald-700 text-white font-bold shadow-xs"
                        : "text-slate-700 hover:text-slate-950 hover:bg-white/80"
                    }`}
                  >
                    {selectedTag === axis.optionA.label && <Check className="w-3 h-3" />}
                    <span>{axis.optionA.label}</span>
                  </button>
                  <span className="text-[10px] text-slate-400 select-none">/</span>
                  <button
                    type="button"
                    onClick={() => setSelectedTag(selectedTag === axis.optionB.label ? null : axis.optionB.label)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer flex items-center gap-1 ${
                      selectedTag === axis.optionB.label
                        ? "bg-emerald-700 text-white font-bold shadow-xs"
                        : "text-slate-700 hover:text-slate-950 hover:bg-white/80"
                    }`}
                  >
                    {selectedTag === axis.optionB.label && <Check className="w-3 h-3" />}
                    <span>{axis.optionB.label}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* スワイプ動画カードエリア */}
          {loading ? (
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-slate-200 shadow-xs">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700 mb-3"></div>
              <p className="text-xs text-slate-500">自己PR動画を読み込み中...</p>
            </div>
          ) : (
            <SwipeCard key={selectedTag || "all"} videos={filteredVideos} onLike={handleLike} onOffer={handleOffer} />
          )}
        </div>
      </CompanyMobileTabs>
    </RoleGuard>
  );
}