"use client";

import { useState } from "react";
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
  Menu,
  X,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { session, isStudent, isCompany, isAdmin, isLoggedIn, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/company/login" ||
    pathname === "/company/register";

  const closeDrawer = () => setDrawerOpen(false);

  // ログイン後のメインルート
  const homeRoute = isStudent ? "/student/profile" : isCompany ? "/swipe" : isAdmin ? "/admin/dashboard" : "/";

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 h-16 relative">
          {/* ================= ログイン時 ================= */}
          {isLoggedIn ? (
            <>
              {/* --- 📱 スマホ表示用 (md:hidden) --- */}
              <div className="flex md:hidden items-center justify-between w-full relative">
                {/* スマホ左: 3本線メニューボタン */}
                <button
                  type="button"
                  onClick={() => setDrawerOpen(true)}
                  className="p-2 -ml-2 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors focus:outline-none"
                  aria-label="メニューを開く"
                >
                  <Menu className="w-6 h-6" />
                </button>

                {/* スマホ中央: JobSwipe公式ロゴ */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none select-none">
                  <div className="relative w-7 h-7 rounded-lg overflow-hidden border border-slate-100 bg-white shadow-sm flex items-center justify-center p-0.5">
                    <Image
                      src="/logo.png"
                      alt="JobSwipe Logo"
                      width={28}
                      height={28}
                      className="object-contain w-full h-full"
                      priority
                    />
                  </div>
                  <span className="font-bold text-base text-slate-900 tracking-tight">JobSwipe</span>
                </div>

                {/* スマホ右: ユーザー情報バッジ */}
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm ${
                      isStudent
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : isCompany
                        ? "bg-blue-100 text-blue-800 border border-blue-200"
                        : "bg-slate-900 text-white"
                    }`}
                  >
                    {isStudent ? "学生" : isCompany ? "企業" : "管理者"}
                  </span>
                  <span className="text-xs text-slate-800 font-bold max-w-[90px] truncate">
                    {session?.name || session?.email}
                  </span>
                </div>
              </div>

              {/* --- 💻 PC表示用 (hidden md:flex) --- */}
              <div className="hidden md:flex items-center justify-between w-full">
                {/* PC左: ロゴ */}
                <Link href={homeRoute} className="flex items-center gap-2.5 group">
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

                {/* PC中央: 常時表示ナビゲーションバー */}
                <nav className="flex items-center gap-1 text-sm font-medium text-slate-600">
                  {/* 🎓 学生（STUDENT）メニュー */}
                  {isStudent && (
                    <>
                      <Link
                        href="/student/profile"
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors ${
                          pathname.startsWith("/student/profile")
                            ? "bg-emerald-50 text-emerald-800 font-bold"
                            : "hover:bg-slate-100 hover:text-slate-900"
                        }`}
                      >
                        <User className="h-4 w-4 text-emerald-700" />
                        <span>プロフィール編集</span>
                      </Link>

                      <Link
                        href="/student/video"
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors ${
                          pathname.startsWith("/student/video")
                            ? "bg-emerald-50 text-emerald-800 font-bold"
                            : "hover:bg-slate-100 hover:text-slate-900"
                        }`}
                      >
                        <Film className="h-4 w-4" />
                        <span>PR動画投稿・管理</span>
                      </Link>

                      <Link
                        href="/student/offers"
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors ${
                          pathname.startsWith("/student/offers")
                            ? "bg-emerald-50 text-emerald-800 font-bold"
                            : "hover:bg-slate-100 hover:text-slate-900"
                        }`}
                      >
                        <Building2 className="h-4 w-4" />
                        <span>届いたオファー</span>
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
                        href="/company/search"
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors ${
                          pathname.startsWith("/company/search")
                            ? "bg-blue-50 text-blue-900 font-bold"
                            : "hover:bg-slate-100 hover:text-slate-900"
                        }`}
                      >
                        <Search className="h-4 w-4" />
                        <span>学生検索</span>
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
                    </>
                  )}

                  {/* 🛡️ 管理者（ADMIN）メニュー */}
                  {isAdmin && (
                    <>
                      <Link
                        href="/admin/dashboard"
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors ${
                          pathname.startsWith("/admin")
                            ? "bg-rose-50 text-rose-900 font-bold"
                            : "hover:bg-slate-100 hover:text-slate-900"
                        }`}
                      >
                        <ShieldCheck className="h-4 w-4 text-rose-600" />
                        <span>管理ダッシュボード</span>
                      </Link>

                      <Link
                        href="/swipe"
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors hover:bg-slate-100 hover:text-slate-900"
                      >
                        <Sparkles className="h-4 w-4" />
                        <span>スワイプ閲覧</span>
                      </Link>

                      <Link
                        href="/company/search"
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors hover:bg-slate-100 hover:text-slate-900"
                      >
                        <Search className="h-4 w-4" />
                        <span>学生検索</span>
                      </Link>

                      <Link
                        href="/company/chat"
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors hover:bg-slate-100 hover:text-slate-900"
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>チャット</span>
                      </Link>
                    </>
                  )}
                </nav>

                {/* PC右: ユーザー情報 & ログアウト */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-bold shadow-sm ${
                        isStudent
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : isCompany
                          ? "bg-blue-100 text-blue-800 border border-blue-200"
                          : "bg-slate-900 text-white"
                      }`}
                    >
                      {isStudent ? "学生" : isCompany ? "企業" : "管理者"}
                    </span>
                    <span className="text-xs text-slate-800 font-bold max-w-[140px] truncate">
                      {session?.name || session?.email}
                    </span>
                  </div>

                  <button
                    onClick={logout}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors border border-rose-200 shadow-sm"
                    title="ログアウト"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>ログアウト</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* ================= 未ログイン時 ================= */
            <>
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

              {/* 認証ボタン群 */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* PC用 採用担当の方はこちら */}
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
              </div>
            </>
          )}
        </div>
      </header>

      {/* ================= 📱 スマホ専用 左側スライドイン ドロワーメニュー ================= */}
      {isLoggedIn && (
        <div className="md:hidden">
          {/* 背景オーバーレイ */}
          <div
            onClick={closeDrawer}
            className={`fixed inset-0 bg-slate-900/60 z-50 transition-opacity duration-300 ${
              drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          />

          {/* ドロワーパネル */}
          <aside
            className={`fixed top-0 left-0 bottom-0 w-72 max-w-[85vw] bg-white z-50 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out ${
              drawerOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* 上部: ヘッダー & ユーザー情報 */}
            <div>
              <div className="flex items-center justify-between p-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-100 bg-white shadow-sm flex items-center justify-center p-0.5">
                    <Image
                      src="/logo.png"
                      alt="JobSwipe Logo"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <span className="font-bold text-lg text-slate-900">JobSwipe</span>
                </div>

                <button
                  type="button"
                  onClick={closeDrawer}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* ユーザーカード */}
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-bold shadow-sm ${
                      isStudent
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : isCompany
                        ? "bg-blue-100 text-blue-800 border border-blue-200"
                        : "bg-slate-900 text-white"
                    }`}
                  >
                    {isStudent ? "学生アカウント" : isCompany ? "企業アカウント" : "管理者"}
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-900 truncate">{session?.name || session?.email}</p>
                <p className="text-xs text-slate-500 truncate">{session?.email}</p>
              </div>

              {/* ナビゲーションメニュー */}
              <nav className="p-3 space-y-1">
                {/* 🎓 学生用メニュー */}
                {isStudent && (
                  <>
                    <Link
                      href="/student/profile"
                      onClick={closeDrawer}
                      className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-colors ${
                        pathname.startsWith("/student/profile")
                          ? "bg-emerald-50 text-emerald-800 font-bold"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <User className="w-4 h-4 text-emerald-700" />
                      <span>プロフィール編集</span>
                    </Link>

                    <Link
                      href="/student/video"
                      onClick={closeDrawer}
                      className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-colors ${
                        pathname.startsWith("/student/video")
                          ? "bg-emerald-50 text-emerald-800 font-bold"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <Film className="w-4 h-4 text-emerald-700" />
                      <span>PR動画投稿・管理</span>
                    </Link>

                    <Link
                      href="/student/offers"
                      onClick={closeDrawer}
                      className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-colors ${
                        pathname.startsWith("/student/offers")
                          ? "bg-emerald-50 text-emerald-800 font-bold"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <Building2 className="w-4 h-4 text-emerald-700" />
                      <span>届いたオファー</span>
                    </Link>

                    <Link
                      href="/company/chat"
                      onClick={closeDrawer}
                      className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-colors ${
                        pathname.startsWith("/company/chat")
                          ? "bg-emerald-50 text-emerald-800 font-bold"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-700" />
                      <span>チャット</span>
                    </Link>
                  </>
                )}

                {/* 🏢 企業用メニュー */}
                {isCompany && (
                  <>
                    <Link
                      href="/swipe"
                      onClick={closeDrawer}
                      className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-colors ${
                        pathname === "/swipe"
                          ? "bg-blue-50 text-blue-900 font-bold"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <Sparkles className="w-4 h-4 text-blue-700" />
                      <span>動画スワイプ</span>
                    </Link>

                    <Link
                      href="/company/search"
                      onClick={closeDrawer}
                      className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-colors ${
                        pathname.startsWith("/company/search")
                          ? "bg-blue-50 text-blue-900 font-bold"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <Search className="w-4 h-4 text-blue-700" />
                      <span>学生検索</span>
                    </Link>

                    <Link
                      href="/company/likes"
                      onClick={closeDrawer}
                      className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-colors ${
                        pathname.startsWith("/company/likes")
                          ? "bg-blue-50 text-blue-900 font-bold"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <Heart className="w-4 h-4 text-blue-700" />
                      <span>気になる一覧</span>
                    </Link>

                    <Link
                      href="/company/chat"
                      onClick={closeDrawer}
                      className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-colors ${
                        pathname.startsWith("/company/chat")
                          ? "bg-blue-50 text-blue-900 font-bold"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <MessageSquare className="w-4 h-4 text-blue-700" />
                      <span>チャット</span>
                    </Link>
                  </>
                )}

                {/* 🛡️ 管理者用メニュー */}
                {isAdmin && (
                  <>
                    <Link
                      href="/admin/dashboard"
                      onClick={closeDrawer}
                      className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-colors ${
                        pathname.startsWith("/admin")
                          ? "bg-rose-50 text-rose-900 font-bold"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <ShieldCheck className="w-4 h-4 text-rose-600" />
                      <span>管理ダッシュボード</span>
                    </Link>

                    <Link
                      href="/swipe"
                      onClick={closeDrawer}
                      className="flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>スワイプ閲覧</span>
                    </Link>

                    <Link
                      href="/company/search"
                      onClick={closeDrawer}
                      className="flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      <Search className="w-4 h-4" />
                      <span>学生検索</span>
                    </Link>

                    <Link
                      href="/company/chat"
                      onClick={closeDrawer}
                      className="flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>チャット</span>
                    </Link>
                  </>
                )}
              </nav>
            </div>

            {/* 下部: 赤色ログアウトボタン */}
            <div className="p-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  closeDrawer();
                  logout();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-rose-600 hover:bg-rose-50 active:bg-rose-100 font-bold text-sm transition-colors border border-rose-200"
              >
                <LogOut className="w-4 h-4 text-rose-600" />
                <span>ログアウト</span>
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}