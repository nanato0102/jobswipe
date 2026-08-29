"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, Film, Sparkles, MessageSquare, Bell } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { appStore } from "@/lib/appStore";

// 並び順: プロフィール ➔ 動画投稿 ➔ オファー ➔ チャット ➔ 通知
const TABS = [
  { path: "/student/profile", label: "プロフィール", icon: User },
  { path: "/student/video", label: "動画投稿", icon: Film },
  { path: "/student/offers", label: "オファー", icon: Sparkles },
  { path: "/company/chat", label: "チャット", icon: MessageSquare },
  { path: "/student/notifications", label: "通知", icon: Bell },
];

interface StudentMobileTabsProps {
  children?: React.ReactNode;
}

export default function StudentMobileTabs({ children }: StudentMobileTabsProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isStudent } = useAuth();

  const [slideDirection, setSlideDirection] = useState<"right" | "left" | null>(null);
  const [touchOffset, setTouchOffset] = useState<number>(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const currentIdx = TABS.findIndex((t) => pathname.startsWith(t.path));

  useEffect(() => {
    // 未読通知数を取得
    const count = appStore.getUnreadNotificationCount("STUDENT");
    setUnreadCount(count);
  }, [pathname]);

  useEffect(() => {
    // ページ遷移後にアニメーション方向をリセット
    const timer = setTimeout(() => {
      setSlideDirection(null);
      setTouchOffset(0);
      setIsSwiping(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isStudent) {
    return <>{children}</>;
  }

  // タッチスワイプ（指の追従とスムーズな画面切り替え）
  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    // フォーム入力欄、動画操作、モーダル内では横スワイプを抑制
    if (["INPUT", "TEXTAREA", "SELECT", "VIDEO", "BUTTON"].includes(target.tagName)) return;
    if (target.closest("button") || target.closest(".no-swipe")) return;

    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY;
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const diffX = e.targetTouches[0].clientX - touchStartX.current;
    const diffY = e.targetTouches[0].clientY - touchStartY.current;

    // 水平方向の移動が垂直方向より大きい場合、指に追従して微量オフセット
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) < 120) {
      setTouchOffset(diffX * 0.35); // 指の動きに滑らかに追従
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    // 縦スクロールではなく、一定以上の横スワイプの場合にスムーズ変位
    if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY) * 1.3) {
      if (diffX > 0) {
        // 左スワイプ ➔ 次のタブへ（右からスライドイン）
        if (currentIdx !== -1 && currentIdx < TABS.length - 1) {
          setSlideDirection("right");
          router.push(TABS[currentIdx + 1].path);
        }
      } else {
        // 右スワイプ ➔ 前のタブへ（左からスライドイン）
        if (currentIdx !== -1 && currentIdx > 0) {
          setSlideDirection("left");
          router.push(TABS[currentIdx - 1].path);
        }
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
    setTouchOffset(0);
    setIsSwiping(false);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="flex-1 flex flex-col w-full min-h-full pb-20 md:pb-6 overflow-x-hidden"
    >
      {/* 画面コンテンツ（スワイプ時の滑らかな変位トランジション） */}
      <div
        className={`flex-1 flex flex-col w-full transition-transform duration-200 ease-out ${
          slideDirection === "right"
            ? "animate-slide-in-right"
            : slideDirection === "left"
            ? "animate-slide-in-left"
            : ""
        }`}
        style={
          isSwiping && touchOffset !== 0
            ? { transform: `translateX(${touchOffset}px)`, transition: "none" }
            : undefined
        }
      >
        {children}
      </div>

      {/* ========================================================================= */}
      {/* 📱 スマホ専用: 固定ボトムナビゲーションバー（赤点バッジ対応） */}
      {/* ========================================================================= */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200/90 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] px-1 py-1.5"
        aria-label="モバイル下部ナビゲーション"
      >
        <div className="grid grid-cols-5 gap-0.5 max-w-md mx-auto">
          {TABS.map((tab) => {
            const isActive = pathname.startsWith(tab.path);
            const Icon = tab.icon;
            const isNotificationTab = tab.path === "/student/notifications";
            const showRedDot = isNotificationTab && unreadCount > 0;

            return (
              <Link
                key={tab.path}
                href={tab.path}
                className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-2xl transition-all select-none relative group ${
                  isActive
                    ? "bg-emerald-50 text-emerald-800 font-bold"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                <div className="relative mt-0.5">
                  <Icon
                    className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${
                      isActive
                        ? "text-emerald-700 scale-110"
                        : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  />
                  {/* 未読通知がある場合の赤点バッジ */}
                  {showRedDot && (
                    <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
                  )}
                </div>

                <span
                  className={`text-[9.5px] mt-1 tracking-tight transition-colors truncate max-w-full ${
                    isActive ? "font-black text-emerald-900" : "font-medium text-slate-500"
                  }`}
                >
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
