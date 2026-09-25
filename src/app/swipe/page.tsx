"use client";

import { useEffect, useState, useMemo } from "react";
import SwipeCard from "@/components/SwipeCard";
import RoleGuard from "@/components/RoleGuard";
import CompanyMobileTabs from "@/components/CompanyMobileTabs";
import { PERSONALITY_AXES } from "@/lib/personalityModel";
import { appStore } from "@/lib/appStore";
import { SWIPE_JOB_FILTERS } from "@/lib/jobCategories";
import { SlidersHorizontal, Check, RefreshCw, Briefcase, ShieldCheck, Clock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import type { VideoData } from "@/types";

export default function SwipePage() {
  const { session, isCompany } = useAuth();
  const [videos, setVideos] = useState<VideoData[]>(() => appStore.getVideos());
  const [loading, setLoading] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>("all");

  useEffect(() => {
    // リアルタイム同期イベント（学生が動画投稿・削除した時に即時更新）
    const handleSync = (e: any) => {
      const type = e?.detail?.type;
      if (type === "VIDEO_ADDED" || type === "VIDEO_DELETED") {
        setVideos(appStore.getVideos());
      }
    };

    window.addEventListener("jobswipe_sync", handleSync);
    window.addEventListener("storage", handleSync);

    async function fetchVideos() {
      try {
        const res = await fetch("/api/videos");
        if (res.ok) {
          const data = await res.json();
          const list = Array.isArray(data) ? data : data.videos || [];
          if (list.length > 0) {
            // サーバー動画とローカル動画をID単位で重複排除してマージ
            const map = new Map<string, VideoData>();
            list.forEach((v: VideoData) => {
              if (v && (v.id || v.videoUrl)) map.set(v.id || v.videoUrl, v);
            });
            const localVideos = appStore.getVideos();
            localVideos.forEach((v: VideoData) => {
              if (v && (v.id || v.videoUrl)) map.set(v.id || v.videoUrl, v);
            });
            setVideos(Array.from(map.values()));
          }
        }
      } catch (err) {
        console.warn("Using local demo videos", err);
      }
    }
    fetchVideos();

    return () => {
      window.removeEventListener("jobswipe_sync", handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, []);

  // 職種フィルター ＆ 4軸人柄タグによるリアルタイム絞り込み
  const filteredVideos = useMemo(() => {
    return videos.filter((v) => {
      const sId = v.student?.id || v.studentId || "s1";
      const detail = appStore.getStudentDetails(sId);

      // 1. 職種フィルター判定
      if (selectedRoleFilter !== "all") {
        const activeTab = SWIPE_JOB_FILTERS.find((f) => f.id === selectedRoleFilter);
        const matchCats = activeTab?.matchCategories || [];
        const studentRoles = detail?.desiredRoles && detail.desiredRoles.length > 0
          ? detail.desiredRoles
          : v.student?.desiredRoles
          ? v.student.desiredRoles.split(",").map((r) => r.trim()).filter(Boolean)
          : [];

        const hasRoleMatch = studentRoles.some((r) => matchCats.includes(r));
        if (!hasRoleMatch) return false;
      }

      // 2. 人柄タグフィルター判定
      if (selectedTag) {
        const tags =
          detail?.personalityTags && detail.personalityTags.length > 0
            ? detail.personalityTags
            : v.tags
            ? v.tags.split(",").map((t) => t.trim()).filter(Boolean)
            : [];
        if (!tags.includes(selectedTag)) return false;
      }

      return true;
    });
  }, [videos, selectedRoleFilter, selectedTag]);

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
          <div className="text-center mb-4 max-w-2xl space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 stroke-[2.5]" />
              <span>審査承認済 企業アカウント専用</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">自己PR動画スワイプ</h1>
            <p className="text-xs sm:text-sm text-slate-500">
              学生の志望職種や人柄・行動特性（4軸MECE）をもとに、求める人物像に合致する候補者を直感的にスカウトできます。
            </p>
          </div>

          {/* 1. 志望職種 絞り込みタブバー */}
          <div className="w-full mb-3.5">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar select-none">
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg border border-slate-200">
                {SWIPE_JOB_FILTERS.map((tab) => {
                  const isActive = selectedRoleFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setSelectedRoleFilter(tab.id)}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                        isActive
                          ? "bg-slate-900 text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                      }`}
                    >
                      <Briefcase className={`w-3.5 h-3.5 ${isActive ? "text-emerald-400" : "text-slate-400"}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 2. MBTI準拠 4軸人柄スマートフィルターバー */}
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
                {(selectedTag || selectedRoleFilter !== "all") && (
                  <button
                    onClick={() => {
                      setSelectedTag(null);
                      setSelectedRoleFilter("all");
                    }}
                    className="text-xs text-slate-600 hover:text-slate-900 font-semibold flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded cursor-pointer transition-colors"
                    title="フィルターを全クリア"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>条件クリア</span>
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
                全人柄表示
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
          ) : filteredVideos.length === 0 ? (
            <div className="w-full max-w-md mx-auto p-8 bg-white border border-slate-200 rounded-xl text-center space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center mx-auto">
                <Briefcase className="w-5 h-5 text-slate-500" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">該当する候補者動画がありません</h3>
              <p className="text-xs text-slate-500">
                選択した職種または人柄条件に一致する学生動画がありません。フィルター条件を緩和してください。
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedTag(null);
                  setSelectedRoleFilter("all");
                }}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
              >
                フィルターを解除する
              </button>
            </div>
          ) : (
            <SwipeCard
              key={`${selectedRoleFilter}-${selectedTag || "all"}`}
              videos={filteredVideos}
              onLike={handleLike}
              onOffer={handleOffer}
            />
          )}
        </div>
      </CompanyMobileTabs>
    </RoleGuard>
  );
}