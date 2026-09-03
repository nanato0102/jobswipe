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
  Bell,
  Menu,
  X,
  CreditCard,
} from "lucide-react";
import { appStore } from "@/lib/appStore";

export default function Navbar() {
  const pathname = usePathname();
  const { session, isStudent, isCompany, isAdmin, isLoggedIn, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isStudent) {
      setUnreadCount(appStore.getUnreadNotificationCount("STUDENT"));
    } else if (isCompany) {
      setUnreadCount(appStore.getUnreadNotificationCount("COMPANY"));
    } else {
      setUnreadCount(0);
    }
  }, [pathname, isStudent, isCompany]);

  // ページ遷移時にモバイルメニューを閉じる
  useEffect(() => {
    setMobileDrawerOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  const homeRoute = isStudent
    ? "/student/profile"
    : isCompany
    ? "/swipe"
    : isAdmin
    ? "/admin-console/dashboard"
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
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-2xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 h-16 relative">
        {/* ================= 左側: 公式ロゴ ================= */}
        <Link
          href={homeRoute}
          className="flex items-center gap-2.5 group select-none flex-shrink-0"
          title="JobSwipe ホームへ"
        >
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Image
              src="/logo.png"
              alt="JobSwipe Logo"
              width={36}
              height={36}
              className="object-contain w-full h-full"
              priority
            />
          </div>
          <span className="font-black text-lg sm:text-xl text-slate-900 tracking-tight group-hover:text-emerald-700 transition-colors">
            JobSwipe
          </span>
        </Link>

        {/* ================= ログイン時の中央ナビゲーション (PC専用: md以上) ================= */}
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
                  <User className="h-4 w-4 text-emerald-700" />
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
                  <MessageSquare className="h-4 w-4 text-emerald-700" />
                  <span>チャット</span>
                </Link>

                <Link
                  href="/student/notifications"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors relative ${
                    pathname.startsWith("/student/notifications")
                      ? "bg-emerald-50 text-emerald-800 font-bold"
                      : "hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <div className="relative">
                    <Bell className="h-4 w-4 text-emerald-700" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
                    )}
                  </div>
                  <span>通知</span>
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
                    pathname.startsWith("/company/usage") || pathname.startsWith("/company/plans")
                      ? "bg-blue-50 text-blue-900 font-bold"
                      : "hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <BarChart3 className="h-4 w-4 text-blue-700" />
                  <span>利用状況・プラン</span>
                </Link>

                <Link
                  href="/company/likes"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors ${
                    pathname.startsWith("/company/likes")
                      ? "bg-blue-50 text-blue-900 font-bold"
                      : "hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Heart className="h-4 w-4 text-blue-700" />
                  <span>気になる</span>
                </Link>

                <Link
                  href="/company/chat"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors ${
                    pathname.startsWith("/company/chat")
                      ? "bg-blue-50 text-blue-900 font-bold"
                      : "hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <MessageSquare className="h-4 w-4 text-blue-700" />
                  <span>チャット</span>
                </Link>

                <Link
                  href="/company/notifications"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors relative ${
                    pathname.startsWith("/company/notifications")
                      ? "bg-blue-50 text-blue-900 font-bold"
                      : "hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <div className="relative">
                    <Bell className="h-4 w-4 text-blue-700" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
                    )}
                  </div>
                  <span>通知</span>
                </Link>
              </>
            )}

            {/* 🛡️ 管理者（ADMIN）メニュー */}
            {isAdmin && (
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
            )}
          </nav>
        )}

        {/* ================= 未ログイン時の中央ナビゲーション (PC専用: md以上) ================= */}
        {!isLoggedIn && (
          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-bold text-slate-600">
            <Link href="/#features" className="hover:text-emerald-700 transition-colors">
              特徴
            </Link>
            <Link href="/#how-it-works" className="hover:text-emerald-700 transition-colors">
              使い方
            </Link>
            <Link href="/#faq" className="hover:text-emerald-700 transition-colors">
              よくある質問
            </Link>
            <Link href="/contact" className="hover:text-emerald-700 transition-colors">
              お問い合わせ
            </Link>
          </nav>
        )}

        {/* ================= 右側: ユーザーメニュー / ログインボタン ================= */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isLoggedIn ? (
            /* ログイン時: ユーザープロフィールピル ＆ ドロップダウン */
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1.5 rounded-full hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
                aria-expanded={menuOpen}
              >
                {/* 角丸四角アバターまたはロールバッジ */}
                {isCompany ? (
                  (() => {
                    const c = appStore.getCompanyDetails("c1");
                    if (c?.logoUrl) {
                      return (
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 bg-white flex items-center justify-center shadow-2xs flex-shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={c.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                        </div>
                      );
                    }
                    return (
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-xs border border-blue-200">
                        企
                      </div>
                    );
                  })()
                ) : isStudent ? (
                  (() => {
                    const s = appStore.getStudentDetails("s1");
                    if (s?.avatarUrl) {
                      return (
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shadow-2xs flex-shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={s.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                      );
                    }
                    const isFemale = s?.gender === "FEMALE";
                    return (
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                          isFemale ? "bg-rose-500" : "bg-blue-600"
                        }`}
                      >
                        <User className="w-4 h-4" />
                      </div>
                    );
                  })()
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                    管
                  </div>
                )}

                <span className="text-xs sm:text-sm font-bold text-slate-800 max-w-[90px] sm:max-w-[140px] truncate hidden sm:inline">
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
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl border border-slate-200 shadow-xl p-1.5 z-50 animate-fade-in space-y-0.5">
                  {/* ユーザーサマリー情報 */}
                  <div className="px-3.5 py-2.5 border-b border-slate-100 bg-slate-50 rounded-xl mb-1">
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
                        className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 rounded-xl transition-colors font-bold"
                      >
                        <User className="w-4 h-4 text-emerald-700" />
                        <span>プロフィール設定</span>
                      </Link>
                      <Link
                        href="/student/video"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 rounded-xl transition-colors font-bold"
                      >
                        <Film className="w-4 h-4 text-emerald-700" />
                        <span>動画投稿・管理</span>
                      </Link>
                      <Link
                        href="/student/offers"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 rounded-xl transition-colors font-bold"
                      >
                        <Sparkles className="w-4 h-4 text-emerald-700" />
                        <span>届いたオファー</span>
                      </Link>
                      <Link
                        href="/company/chat"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 rounded-xl transition-colors font-bold"
                      >
                        <MessageSquare className="w-4 h-4 text-emerald-700" />
                        <span>チャット面談</span>
                      </Link>
                    </>
                  )}

                  {isCompany && (
                    <>
                      <Link
                        href="/swipe"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-900 rounded-xl transition-colors font-bold"
                      >
                        <Sparkles className="w-4 h-4 text-blue-700" />
                        <span>動画スワイプ</span>
                      </Link>
                      <Link
                        href="/company/usage"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-900 rounded-xl transition-colors font-bold"
                      >
                        <BarChart3 className="w-4 h-4 text-blue-700" />
                        <span>利用状況・プラン</span>
                      </Link>
                      <Link
                        href="/company/plans"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-900 rounded-xl transition-colors font-bold"
                      >
                        <CreditCard className="w-4 h-4 text-blue-700" />
                        <span>プラン変更・増枠</span>
                      </Link>
                      <Link
                        href="/company/likes"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-900 rounded-xl transition-colors font-bold"
                      >
                        <Heart className="w-4 h-4 text-blue-700" />
                        <span>気になる一覧</span>
                      </Link>
                      <Link
                        href="/company/chat"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-900 rounded-xl transition-colors font-bold"
                      >
                        <MessageSquare className="w-4 h-4 text-blue-700" />
                        <span>チャット面談</span>
                      </Link>
                      <Link
                        href="/company/profile"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-900 rounded-xl transition-colors font-bold"
                      >
                        <Building2 className="w-4 h-4 text-blue-700" />
                        <span>企業情報・求人編集</span>
                      </Link>
                    </>
                  )}

                  {isAdmin && (
                    <Link
                      href="/admin-console/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-rose-700 hover:bg-rose-50 rounded-xl transition-colors font-bold"
                    >
                      <ShieldCheck className="w-4 h-4 text-rose-600" />
                      <span>管理コンソール</span>
                    </Link>
                  )}

                  <hr className="border-slate-100 my-1" />

                  <Link
                    href="/settings"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors font-medium"
                  >
                    <Settings className="w-4 h-4 text-slate-500" />
                    <span>各種設定</span>
                  </Link>

                  <Link
                    href="/contact"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors font-medium"
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
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors text-left cursor-pointer"
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
                href="/company/login"
                className="text-xs font-bold text-slate-600 hover:text-slate-900 hover:underline px-2.5 py-1.5 transition-colors hidden lg:inline-block"
              >
                採用担当の方はこちら
              </Link>

              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>ログイン</span>
              </Link>

              <Link
                href="/register"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-600 rounded-xl transition-colors shadow-xs cursor-pointer"
              >
                <UserPlus className="h-3.5 w-3.5" />
                <span>無料登録</span>
              </Link>
            </>
          )}

          {/* ================= モバイルハンバーガーボタン (スマホ・タブレット専用: md未満) ================= */}
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="メニューを開閉"
          >
            {mobileDrawerOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ================= モバイル開閉ドロワーメニュー (スマホ専用: md未満) ================= */}
      {mobileDrawerOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-6 shadow-xl animate-fade-in space-y-4 max-h-[85vh] overflow-y-auto">
          {/* 未ログイン時のモバイルメニュー */}
          {!isLoggedIn ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
                <Link
                  href="/register"
                  className="py-3 bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>学生無料登録</span>
                </Link>
                <Link
                  href="/company/register"
                  className="py-3 bg-slate-900 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Building2 className="w-4 h-4 text-blue-400" />
                  <span>企業無料登録</span>
                </Link>
              </div>

              <div className="space-y-1 text-xs font-bold text-slate-700">
                <Link
                  href="/#features"
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <span>サービスの特徴</span>
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                </Link>
                <Link
                  href="/#how-it-works"
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <span>使い方・3ステップ</span>
                  <Film className="w-4 h-4 text-slate-500" />
                </Link>
                <Link
                  href="/#faq"
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <span>よくある質問 (FAQ)</span>
                  <HelpCircle className="w-4 h-4 text-slate-500" />
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <span>お問い合わせ</span>
                  <MessageSquare className="w-4 h-4 text-slate-500" />
                </Link>
              </div>

              <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-center text-xs">
                <Link
                  href="/login"
                  className="py-2.5 bg-slate-100 text-slate-800 font-bold rounded-xl hover:bg-slate-200"
                >
                  学生ログイン
                </Link>
                <Link
                  href="/company/login"
                  className="py-2.5 bg-slate-100 text-slate-800 font-bold rounded-xl hover:bg-slate-200"
                >
                  企業ログイン
                </Link>
              </div>
            </div>
          ) : (
            /* ログイン時のモバイルメニュー */
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-xs font-bold text-slate-900">{session?.name || "ユーザー"}</p>
                <p className="text-[11px] text-slate-500">{session?.email}</p>
              </div>

              <div className="space-y-1 text-xs font-bold text-slate-700">
                {isStudent && (
                  <>
                    <Link href="/student/profile" className="flex items-center gap-2.5 p-3 rounded-xl hover:bg-emerald-50">
                      <User className="w-4 h-4 text-emerald-700" />
                      <span>プロフィール設定</span>
                    </Link>
                    <Link href="/student/video" className="flex items-center gap-2.5 p-3 rounded-xl hover:bg-emerald-50">
                      <Film className="w-4 h-4 text-emerald-700" />
                      <span>動画投稿・管理</span>
                    </Link>
                    <Link href="/student/offers" className="flex items-center gap-2.5 p-3 rounded-xl hover:bg-emerald-50">
                      <Sparkles className="w-4 h-4 text-emerald-700" />
                      <span>オファー一覧</span>
                    </Link>
                    <Link href="/company/chat" className="flex items-center gap-2.5 p-3 rounded-xl hover:bg-emerald-50">
                      <MessageSquare className="w-4 h-4 text-emerald-700" />
                      <span>チャット面談</span>
                    </Link>
                    <Link href="/student/notifications" className="flex items-center gap-2.5 p-3 rounded-xl hover:bg-emerald-50">
                      <Bell className="w-4 h-4 text-emerald-700" />
                      <span>通知センター</span>
                    </Link>
                  </>
                )}

                {isCompany && (
                  <>
                    <Link href="/swipe" className="flex items-center gap-2.5 p-3 rounded-xl hover:bg-blue-50">
                      <Sparkles className="w-4 h-4 text-blue-700" />
                      <span>動画スワイプ</span>
                    </Link>
                    <Link href="/company/usage" className="flex items-center gap-2.5 p-3 rounded-xl hover:bg-blue-50">
                      <BarChart3 className="w-4 h-4 text-blue-700" />
                      <span>利用状況・プラン</span>
                    </Link>
                    <Link href="/company/plans" className="flex items-center gap-2.5 p-3 rounded-xl hover:bg-blue-50">
                      <CreditCard className="w-4 h-4 text-blue-700" />
                      <span>料金プラン変更・増枠</span>
                    </Link>
                    <Link href="/company/likes" className="flex items-center gap-2.5 p-3 rounded-xl hover:bg-blue-50">
                      <Heart className="w-4 h-4 text-blue-700" />
                      <span>気になる一覧</span>
                    </Link>
                    <Link href="/company/chat" className="flex items-center gap-2.5 p-3 rounded-xl hover:bg-blue-50">
                      <MessageSquare className="w-4 h-4 text-blue-700" />
                      <span>チャット面談</span>
                    </Link>
                    <Link href="/company/profile" className="flex items-center gap-2.5 p-3 rounded-xl hover:bg-blue-50">
                      <Building2 className="w-4 h-4 text-blue-700" />
                      <span>企業情報・求人編集</span>
                    </Link>
                  </>
                )}

                <hr className="border-slate-100 my-2" />

                <Link href="/settings" className="flex items-center gap-2.5 p-3 rounded-xl hover:bg-slate-50">
                  <Settings className="w-4 h-4 text-slate-500" />
                  <span>各種設定</span>
                </Link>
                <Link href="/contact" className="flex items-center gap-2.5 p-3 rounded-xl hover:bg-slate-50">
                  <HelpCircle className="w-4 h-4 text-slate-500" />
                  <span>お問い合わせ</span>
                </Link>

                <button
                  type="button"
                  onClick={() => logout()}
                  className="w-full flex items-center gap-2.5 p-3 text-rose-600 rounded-xl hover:bg-rose-50 text-left cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>ログアウト</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
