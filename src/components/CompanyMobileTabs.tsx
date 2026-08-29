"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sparkles, Search, Heart, MessageSquare, Bell } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { appStore } from "@/lib/appStore";

// 企業側の5つのタブ並び順: スワイプ ➔ 検索 ➔ 気になる ➔ チャット ➔ 通知
const TABS = [
  { path: "/swipe", label: "スワイプ", icon: Sparkles },
  { path: "/company/search", label: "検索", icon: Search },
  { path: "/company/likes", label: "気になる", icon: Heart },
  { path: "/company/chat", label: "チャット", icon: MessageSquare },
  { path: "/company/notifications", label: "通知", icon: Bell },
];

interface CompanyMobileTabsProps {
  children?: React.ReactNode;
}

export default function CompanyMobileTabs({ children }: CompanyMobileTabsProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isCompany, isStudent, isAdmin } = useAuth();

  const [slideDirection, setSlideDirection] = useState<"right" | "left" | null>(null);
  const [touchOffset, setTouchOffset] = useState<number>(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const currentIdx = TABS.findIndex((t) => pathname.startsWith(t.path));

  useEffect(() => {
    // 企業の未読通知数を取得
    const count = appStore.getUnreadNotificationCount("COMPANY");
    setUnreadCount(count);
  }, [pathname]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSlideDirection(null);
      setTouchOffset(0);
      setIsSwiping(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [pathname]);

  // 学生モードでなく、企業ルートまたは/swipeの場合は確実に企業ボトムタブを表示
  const isCompanyRoute = pathname.startsWith("/company") || pathname === "/swipe";
  if (isStudent || !isCompanyRoute) {
    return <>{children}</>;
  }

  // タッチスワイプ（/swipe 画面以外で有効）
  const isSwipePage = pathname === "/swipe";

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isSwipePage) return; // /swipeでは動画カード自体のスワイプを優先
    const target = e.target as HTMLElement;
    if (["INPUT", "TEXTAREA", "SELECT", "VIDEO", "BUTTON"].includes(target.tagName)) return;
    if (target.closest("button") || target.closest(".no-swipe")) return;

    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY;
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isSwipePage || touchStartX.current === null || touchStartY.current === null) return;

    const diffX = e.targetTouches[0].clientX - touchStartX.current;
    const diffY = e.targetTouches[0].clientY - touchStartY.current;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) < 120) {
      setTouchOffset(diffX * 0.35);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isSwipePage || touchStartX.current === null || touchStartY.current === null) return;

    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY) * 1.3) {
      if (diffX > 0) {
        // 左スワイプ ➔ 次のタブへ
        if (currentIdx !== -1 && currentIdx < TABS.length - 1) {
          setSlideDirection("right");
          router.push(TABS[currentIdx + 1].path);
        }
      } else {
        // 右スワイプ ➔ 前のタブへ
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
      {/* 画面コンテンツ（滑らかなスライドトランジション） */}
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
      {/* 📱 企業専用: 固定ボトムナビゲーションバー（赤点バッジ対応） */}
      {/* ========================================================================= */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200/90 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] px-1 py-1.5"
        aria-label="企業モバイル下部ナビゲーション"
      >
        <div className="grid grid-cols-5 gap-0.5 max-w-md mx-auto">
          {TABS.map((tab) => {
            const isActive = pathname.startsWith(tab.path);
            const Icon = tab.icon;
            const isNotificationTab = tab.path === "/company/notifications";
            const showRedDot = isNotificationTab && unreadCount > 0;

            return (
              <Link
                key={tab.path}
                href={tab.path}
                className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-2xl transition-all select-none relative group ${
                  isActive
                    ? "bg-blue-50 text-blue-900 font-bold"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                <div className="relative mt-0.5">
                  <Icon
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isActive
                        ? "text-blue-700 scale-110"
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
                    isActive ? "font-black text-blue-950" : "font-medium text-slate-500"
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
