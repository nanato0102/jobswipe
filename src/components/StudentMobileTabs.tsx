"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Film, User, Sparkles, MessageSquare } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const TABS = [
  { path: "/student/video", label: "動画", icon: Film },
  { path: "/student/profile", label: "プロフィール", icon: User },
  { path: "/student/offers", label: "オファー", icon: Sparkles },
  { path: "/company/chat", label: "チャット", icon: MessageSquare },
];

interface StudentMobileTabsProps {
  children?: React.ReactNode;
}

export default function StudentMobileTabs({ children }: StudentMobileTabsProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isStudent } = useAuth();

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  if (!isStudent) {
    return <>{children}</>;
  }

  const currentIdx = TABS.findIndex((t) => pathname.startsWith(t.path));

  // タッチスワイプ（左右フリック）によるタブ切り替え
  const handleTouchStart = (e: React.TouchEvent) => {
    // 入力フォームや動画コントロール操作中はスワイプ遷移を無効化
    const target = e.target as HTMLElement;
    if (["INPUT", "TEXTAREA", "SELECT", "VIDEO"].includes(target.tagName)) return;

    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    // 縦スクロールではなく、明らかな横スワイプの場合のみ発火（横移動50px以上かつ縦移動より大きい）
    if (Math.abs(diffX) > 60 && Math.abs(diffX) > Math.abs(diffY) * 1.4) {
      if (diffX > 0) {
        // 左スワイプ ➔ 次のタブへ
        if (currentIdx !== -1 && currentIdx < TABS.length - 1) {
          router.push(TABS[currentIdx + 1].path);
        }
      } else {
        // 右スワイプ ➔ 前のタブへ
        if (currentIdx !== -1 && currentIdx > 0) {
          router.push(TABS[currentIdx - 1].path);
        }
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="flex-1 flex flex-col w-full min-h-full"
    >
      {/* 📱 スマホ専用 4タブナビゲーションバー（上部固定風） */}
      <div className="md:hidden sticky top-16 z-30 bg-white/95 backdrop-blur border-b border-slate-200 px-3 py-2 shadow-2xs">
        <div className="grid grid-cols-4 gap-1 bg-slate-100 p-1 rounded-2xl">
          {TABS.map((tab) => {
            const isActive = pathname.startsWith(tab.path);
            const Icon = tab.icon;
            return (
              <Link
                key={tab.path}
                href={tab.path}
                className={`flex items-center justify-center gap-1 py-2 px-1 rounded-xl text-xs font-bold transition-all select-none ${
                  isActive
                    ? "bg-white text-emerald-800 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-emerald-700" : "text-slate-400"}`} />
                <span className="truncate">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {children}
    </div>
  );
}
