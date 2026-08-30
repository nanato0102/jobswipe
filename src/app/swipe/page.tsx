"use client";

import { useEffect, useState } from "react";
import SwipeCard from "@/components/SwipeCard";
import RoleGuard from "@/components/RoleGuard";
import CompanyMobileTabs from "@/components/CompanyMobileTabs";
import type { VideoData } from "@/types";

export default function SwipePage() {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch("/api/videos");
        if (res.ok) {
          const data = await res.json();
          setVideos(data);
        }
      } catch (err) {
        console.error("Failed to fetch videos", err);
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, []);

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
        <div className="flex-1 flex flex-col justify-center items-center p-3 sm:p-6 w-full max-w-4xl mx-auto">
          <div className="text-center mb-3">
            <h1 className="text-lg font-bold text-slate-900">自己PR動画スワイプ</h1>
            <p className="text-xs text-slate-500">
              候補者の人柄や雰囲気が伝わる自己PR動画です。「気になる」に保存するか、直接オファーを送信できます。
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700 mb-3"></div>
              <p className="text-xs text-slate-500">学生の自己PR動画を読み込み中...</p>
            </div>
          ) : (
            <SwipeCard videos={videos} onLike={handleLike} onOffer={handleOffer} />
          )}
        </div>
      </CompanyMobileTabs>
    </RoleGuard>
  );
}