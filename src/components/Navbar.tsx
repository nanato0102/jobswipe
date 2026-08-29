"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Film, User, Building2, ShieldCheck, LogIn, Sparkles, MessageSquare, Search, Heart, UserPlus } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 h-16">
        {/* ロゴ */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-slate-100 bg-white shadow-sm flex items-center justify-center p-0.5">
            <Image
              src="/logo.png"
              alt="JobSwipe Logo"
              width={36}
              height={36}
              className="object-contain w-full h-full"
              priority
            />
          </div>
          <span className="font-bold text-xl text-slate-900 tracking-tight group-hover:text-slate-700 transition-colors">
            JobSwipe
          </span>
        </Link>

        {/* ナビゲーションメニュー */}
        {!isAuthPage && (
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600">
            <Link
              href="/swipe"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors ${
                pathname === "/swipe" ? "bg-slate-100 text-slate-900 font-semibold" : "hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Sparkles className="h-4 w-4 text-slate-700" />
              <span>動画スワイプ</span>
            </Link>

            <Link
              href="/company/search"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors ${
                pathname.startsWith("/company/search") ? "bg-slate-100 text-slate-900 font-semibold" : "hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Search className="h-4 w-4" />
              <span>学生検索</span>
            </Link>

            <Link
              href="/company/likes"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors ${
                pathname.startsWith("/company/likes") ? "bg-slate-100 text-slate-900 font-semibold" : "hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Heart className="h-4 w-4" />
              <span>気になる一覧</span>
            </Link>

            <Link
              href="/company/chat"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors ${
                pathname.startsWith("/company/chat") ? "bg-slate-100 text-slate-900 font-semibold" : "hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              <span>チャット</span>
            </Link>

            <div className="h-4 w-px bg-slate-200 mx-2" />

            <Link
              href="/student/profile"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors ${
                pathname.startsWith("/student/profile") ? "bg-slate-100 text-slate-900 font-semibold" : "hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <User className="h-4 w-4" />
              <span>学生マイページ</span>
            </Link>

            <Link
              href="/student/video"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors ${
                pathname.startsWith("/student/video") ? "bg-slate-100 text-slate-900 font-semibold" : "hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Film className="h-4 w-4" />
              <span>動画投稿</span>
            </Link>

            <Link
              href="/student/offers"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors ${
                pathname.startsWith("/student/offers") ? "bg-slate-100 text-slate-900 font-semibold" : "hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Building2 className="h-4 w-4" />
              <span>オファー一覧</span>
            </Link>

            <div className="h-4 w-px bg-slate-200 mx-2" />

            <Link
              href="/admin/dashboard"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors ${
                pathname.startsWith("/admin") ? "bg-slate-100 text-slate-900 font-semibold" : "hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              <span>管理</span>
            </Link>
          </nav>
        )}

        {/* 認証ボタン */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <LogIn className="h-4 w-4" />
            <span>ログイン</span>
          </Link>
          <Link
            href="/register"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <UserPlus className="h-4 w-4" />
            <span>無料登録</span>
          </Link>
        </div>
      </div>
    </header>
  );
}