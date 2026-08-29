"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Film, User, Building2, ShieldCheck, LogIn, Sparkles, MessageSquare, Search, Heart, UserPlus, LogOut, Home, Briefcase } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { session, isStudent, isCompany, isAdmin, isLoggedIn, logout } = useAuth();

  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/company/login" ||
    pathname === "/company/register";

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

        {/* ナビゲーションメニュー（ロールに応じた完全出し分け） */}
        {!isAuthPage && (
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600">
            {/* 未ログイン時 */}
            {!isLoggedIn && (
              <Link
                href="/"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors ${
                  pathname === "/" ? "bg-slate-100 text-slate-900 font-semibold" : "hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Home className="h-4 w-4 text-emerald-700" />
                <span>ホーム</span>
              </Link>
            )}

            {/* 🎓 学生（STUDENT）ログイン時 */}
            {isStudent && (
              <>
                <Link
                  href="/student/profile"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors ${
                    pathname.startsWith("/student/profile") ? "bg-slate-100 text-slate-900 font-semibold" : "hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <User className="h-4 w-4 text-emerald-700" />
                  <span>プロフィール編集</span>
                </Link>

                <Link
                  href="/student/video"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors ${
                    pathname.startsWith("/student/video") ? "bg-slate-100 text-slate-900 font-semibold" : "hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Film className="h-4 w-4" />
                  <span>PR動画投稿・管理</span>
                </Link>

                <Link
                  href="/student/offers"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors ${
                    pathname.startsWith("/student/offers") ? "bg-slate-100 text-slate-900 font-semibold" : "hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Building2 className="h-4 w-4" />
                  <span>届いたオファー</span>
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
              </>
            )}

            {/* 🏢 企業（COMPANY）ログイン時 */}
            {isCompany && (
              <>
                <Link
                  href="/swipe"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors ${
                    pathname === "/swipe" ? "bg-slate-100 text-slate-900 font-semibold" : "hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Sparkles className="h-4 w-4 text-emerald-700" />
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
              </>
            )}

            {/* 🛡️ 管理者（ADMIN）ログイン時 */}
            {isAdmin && (
              <>
                <Link
                  href="/admin/dashboard"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors ${
                    pathname.startsWith("/admin") ? "bg-slate-100 text-slate-900 font-semibold" : "hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <ShieldCheck className="h-4 w-4 text-rose-600" />
                  <span>管理ダッシュボード</span>
                </Link>

                <Link
                  href="/swipe"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors ${
                    pathname === "/swipe" ? "bg-slate-100 text-slate-900 font-semibold" : "hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Sparkles className="h-4 w-4" />
                  <span>スワイプ閲覧</span>
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
                  href="/company/chat"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors ${
                    pathname.startsWith("/company/chat") ? "bg-slate-100 text-slate-900 font-semibold" : "hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>チャット</span>
                </Link>
              </>
            )}
          </nav>
        )}

        {/* 認証・ユーザー情報・ログアウト */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {isLoggedIn && session ? (
            <div className="flex items-center gap-2 sm:gap-3">
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
                <span className="text-xs text-slate-800 font-bold max-w-[130px] truncate hidden sm:inline">
                  {session.name || session.email}
                </span>
              </div>

              <button
                onClick={logout}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200 shadow-sm"
                title="ログアウト"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">ログアウト</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              {/* 採用担当の方はこちら リンク */}
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
          )}
        </div>
      </div>
    </header>
  );
}