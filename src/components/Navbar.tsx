"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Film,
  User,
  Building2,
  ShieldCheck,
  LogIn,
  Sparkles,
  MessageSquare,
  Search,
  Heart,
  UserPlus,
  LogOut,
  ChevronDown,
  Settings,
  HelpCircle,
  BarChart3,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { session, isStudent, isCompany, isAdmin, isLoggedIn, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/company/login" ||
    pathname === "/company/register";

  const homeRoute = isStudent
    ? "/student/profile"
    : isCompany
    ? "/swipe"
    : isAdmin
    ? "/admin/dashboard"
    : "/";

  // 外側クリックでドロップダウンを閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 h-16 relative">
        {/* ================= 左側: 公式ロゴ（スマホ・PC共通でホームへ） ================= */}
        <Link
          href={homeRoute}
          className="flex items-center gap-2.5 group select-none flex-shrink-0"
          title="ホームへ戻る"
        >
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden border border-slate-100 bg-white shadow-sm flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform">
            <Image
              src="/logo.png"
              alt="JobSwipe Logo"
              width={36}
              height={36}
              className="object-contain w-full h-full"
              priority
            />
          </div>
          <span className="font-black text-lg sm:text-xl text-slate-900 tracking-tight group-hover:text-emerald-800 transition-colors">
            JobSwipe
          </span>
        </Link>

        {/* ================= ログイン時の中央ナビゲーション (PC専用) ================= */}
        {isLoggedIn && (
          <nav className="hidden md:flex items-center gap-1 text-xs sm:text-sm font-medium text-slate-700">
            {/* 🎓 学生（STUDENT）メニュー */}
            {isStudent && (
              <>
                <Link
                  href="/student/profile"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors ${
                    pathname === "/student/profile"
                      ? "bg-emerald-50 text-emerald-800 font-bold"
                      : "hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span>プロフィール</span>
                </Link>

                <Link
                  href="/student/video"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors ${
                    pathname === "/student/video"
                      ? "bg-emerald-50 text-emerald-800 font-bold"
                      : "hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Film className="h-4 w-4 text-emerald-700" />
                  <span>動画投稿</span>
                </Link>

                <Link
                  href="/student/offers"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors ${
                    pathname.startsWith("/student/offers")
                      ? "bg-emerald-50 text-emerald-800 font-bold"
                      : "hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Sparkles className="h-4 w-4 text-emerald-700" />
                  <span>オファー</span>
                </Link>

                <Link
                  href="/company/chat"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors ${
                    pathname.startsWith("/company/chat")
                      ? "bg-emerald-50 text-emerald-800 font-bold"
                      : "hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>チャット</span>
                </Link>
              </>
            )}

            {/* 🏢 企業（COMPANY）メニュー */}
            {isCompany && (
              <>
                <Link
                  href="/swipe"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors ${
                    pathname === "/swipe"
                      ? "bg-blue-50 text-blue-900 font-bold"
                      : "hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Sparkles className="h-4 w-4 text-blue-700" />
                  <span>動画スワイプ</span>
                </Link>

                <Link
                  href="/company/usage"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors ${
                    pathname.startsWith("/company/usage")
                      ? "bg-blue-50 text-blue-900 font-bold"
                      : "hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <BarChart3 className="h-4 w-4 text-blue-700" />
                  <span>利用状況</span>
                </Link>

                <Link
                  href="/company/likes"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors ${
                    pathname.startsWith("/company/likes")
                      ? "bg-blue-50 text-blue-900 font-bold"
                      : "hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Heart className="h-4 w-4" />
                  <span>気になる一覧</span>
                </Link>

                <Link
                  href="/company/chat"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors ${
                    pathname.startsWith("/company/chat")
                      ? "bg-blue-50 text-blue-900 font-bold"
                      : "hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>チャット</span>
                </Link>

                <Link
                  href="/company/profile"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors ${
                    pathname.startsWith("/company/profile")
                      ? "bg-blue-50 text-blue-900 font-bold"
                      : "hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Building2 className="h-4 w-4" />
                  <span>企業情報</span>
                </Link>
              </>
            )}

            {/* 🛡️ 管理者（ADMIN）メニュー */}
            {isAdmin && (
              <>
                <Link
                  href="/admin-console/dashboard"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors ${
                    pathname.startsWith("/admin-console")
                      ? "bg-rose-50 text-rose-900 font-bold"
                      : "hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <ShieldCheck className="h-4 w-4 text-rose-600" />
                  <span>管理コンソール</span>
                </Link>
              </>
            )}
          </nav>
        )}

        {/* ================= 右側: ユーザー情報 & ドロップダウン / 未ログイン時ボタン ================= */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isLoggedIn ? (
            /* ログイン中: ユーザー名タップでドロップダウン表示 */
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all focus:outline-none"
                aria-expanded={menuOpen}
              >
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-md font-bold shadow-2xs ${
                    isStudent
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      : isCompany
                      ? "bg-blue-100 text-blue-800 border border-blue-200"
                      : "bg-slate-900 text-white"
                  }`}
                >
                  {isStudent ? "学生" : isCompany ? "企業" : "管理者"}
                </span>

                <span className="text-xs sm:text-sm font-bold text-slate-800 max-w-[100px] sm:max-w-[150px] truncate">
                  {session?.name || session?.email}
                </span>

                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                    menuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* ドロップダウンメニューパネル */}
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl border border-slate-200 shadow-xl p-1.5 z-50 animate-fade-in-up space-y-0.5">
                  {/* ユーザーサマリー情報 */}
                  <div className="px-3.5 py-2.5 border-b border-slate-100 bg-slate-50 rounded-lg mb-1">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {session?.name || "ユーザー"}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">{session?.email}</p>
                  </div>

                  {/* マイページ・主要リンク */}
                  {isStudent && (
                    <>
                      <Link
                        href="/student/profile"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 rounded-md transition-colors font-medium"
                      >
                        <User className="w-4 h-4 text-emerald-700" />
                        <span>プロフィール</span>
                      </Link>
                      <Link
                        href="/student/video"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 rounded-md transition-colors font-medium"
                      >
                        <Film className="w-4 h-4 text-emerald-700" />
                        <span>動画投稿</span>
                      </Link>
                      <Link
                        href="/student/offers"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2.5 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 rounded-xl transition-colors font-medium"
                      >
                        <Sparkles className="w-4 h-4 text-emerald-700" />
                        <span>オファー</span>
                      </Link>
                      <Link
                        href="/company/chat"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2.5 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 rounded-xl transition-colors font-medium"
                      >
                        <MessageSquare className="w-4 h-4 text-emerald-700" />
                        <span>チャット</span>
                      </Link>
                    </>
                  )}

                  {isCompany && (
                    <>
                      <Link
                        href="/swipe"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2.5 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-900 rounded-xl transition-colors font-medium"
                      >
                        <Sparkles className="w-4 h-4 text-blue-700" />
                        <span>動画スワイプ</span>
                      </Link>
                      <Link
                        href="/company/usage"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2.5 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-900 rounded-xl transition-colors font-medium"
                      >
                        <BarChart3 className="w-4 h-4 text-blue-700" />
                        <span>利用状況</span>
                      </Link>
                      <Link
                        href="/company/likes"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2.5 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-900 rounded-xl transition-colors font-medium"
                      >
                        <Heart className="w-4 h-4 text-blue-700" />
                        <span>気になる一覧</span>
                      </Link>
                      <Link
                        href="/company/chat"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2.5 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-900 rounded-xl transition-colors font-medium"
                      >
                        <MessageSquare className="w-4 h-4 text-blue-700" />
                        <span>チャット</span>
                      </Link>
                      <Link
                        href="/company/profile"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2.5 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-900 rounded-xl transition-colors font-medium"
                      >
                        <Building2 className="w-4 h-4 text-blue-700" />
                        <span>企業情報</span>
                      </Link>
                    </>
                  )}

                  {isAdmin && (
                    <>
                      <Link
                        href="/admin-console/dashboard"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2.5 text-xs text-rose-700 hover:bg-rose-50 rounded-xl transition-colors font-bold"
                      >
                        <ShieldCheck className="w-4 h-4 text-rose-600" />
                        <span>管理コンソール</span>
                      </Link>
                    </>
                  )}

                  <hr className="border-slate-100 my-1" />

                  <Link
                    href="/contact"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors"
                  >
                    <HelpCircle className="w-4 h-4 text-slate-400" />
                    <span>お問い合わせ・サポート</span>
                  </Link>

                  <hr className="border-slate-100 my-1" />

                  {/* ログアウトボタン */}
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>ログアウト</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* 未ログイン時 */
            <>
              <Link
                href="/contact"
                className="text-xs font-semibold text-slate-600 hover:text-emerald-800 px-2 py-1.5 transition-colors hidden md:flex items-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                <span>お問い合わせ</span>
              </Link>

              <Link
                href="/company/login"
                className="text-xs font-semibold text-slate-600 hover:text-emerald-800 hover:underline px-2 py-1.5 transition-colors hidden sm:flex items-center gap-1"
              >
                <Building2 className="w-3.5 h-3.5 text-slate-500" />
                <span>採用担当の方はこちら</span>
              </Link>

              <Link
                href="/login"
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>ログイン</span>
              </Link>

              <Link
                href="/register"
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-600 rounded-xl transition-colors shadow-sm"
              >
                <UserPlus className="h-3.5 w-3.5" />
                <span>新規登録</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
