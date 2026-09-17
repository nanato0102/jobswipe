"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Film, Sparkles, MessageSquare, Bell } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { appStore } from "@/lib/appStore";

// 並び順: プロフィール ➔ 動画投稿 ➔ オファー ➔ チャット ➔ 通知
const TABS = [
  { path: "/student/profile", label: "プロフィール", icon: User },
  { path: "/student/video", label: "動画投稿", icon: Film },
  { path: "/student/offers", label: "オファー", icon: Sparkles },
  { path: "/student/chat", label: "チャット", icon: MessageSquare },
  { path: "/student/notifications", label: "通知", icon: Bell },
];

interface StudentMobileTabsProps {
  children?: React.ReactNode;
}

export default function StudentMobileTabs({ children }: StudentMobileTabsProps) {
  const pathname = usePathname();
  const { isStudent } = useAuth();
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    // 未読通知数を取得
    const count = appStore.getUnreadNotificationCount("STUDENT");
    setUnreadCount(count);
  }, [pathname]);

  if (!isStudent) {
    return <>{children}</>;
  }

  return (
    <div className="flex-1 flex flex-col w-full min-h-[calc(100dvh-4rem)] md:min-h-0 pb-24 md:pb-6 relative">
      {/* 画面コンテンツ */}
      <div className="flex-1 flex flex-col w-full">
        {children}
      </div>

      {/* ========================================================================= */}
      {/* 📱 スマホ専用: 固定ボトムナビゲーションバー（赤点バッジ対応） */}
      {/* ========================================================================= */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] px-1 pt-1.5 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] pointer-events-auto"
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
                className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-2xl transition-all select-none relative group pointer-events-auto cursor-pointer ${
                  isActive
                    ? "bg-emerald-50 text-emerald-800 font-bold"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50 active:bg-slate-100"
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
