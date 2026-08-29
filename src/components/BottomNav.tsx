"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Search, Heart, Building2, User } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  // ログイン・登録画面では非表示
  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  const navItems = [
    {
      href: "/swipe",
      label: "スワイプ",
      icon: Sparkles,
      active: pathname === "/swipe",
    },
    {
      href: "/company/search",
      label: "学生検索",
      icon: Search,
      active: pathname.startsWith("/company/search"),
    },
    {
      href: "/company/likes",
      label: "気になる",
      icon: Heart,
      active: pathname.startsWith("/company/likes"),
    },
    {
      href: "/student/offers",
      label: "オファー",
      icon: Building2,
      active: pathname.startsWith("/student/offers"),
    },
    {
      href: "/student/profile",
      label: "マイページ",
      icon: User,
      active: pathname.startsWith("/student/profile") || pathname.startsWith("/student/video"),
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-t border-slate-200 safe-area-bottom">
      <div className="flex items-center justify-around h-14 max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
                item.active ? "text-emerald-700 font-bold" : "text-slate-500 hover:text-slate-900 font-medium"
              }`}
            >
              <Icon className={`w-5 h-5 ${item.active ? "stroke-[2.5]" : "stroke-[1.75]"}`} />
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}