"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { LogIn, AlertCircle, User, Building2, ShieldCheck, Sparkles } from "lucide-react";
import type { UserType } from "@/types";

export default function LoginPage() {
  const { login, demoLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRedirect = (userType: UserType) => {
    if (userType === "STUDENT") {
      window.location.href = "/student/profile";
    } else if (userType === "COMPANY") {
      window.location.href = "/swipe";
    } else {
      window.location.href = "/admin/dashboard";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "メールアドレスまたはパスワードが正しくありません");
      }

      const data = await res.json();
      if (data.user) {
        login(data.user);
        handleRedirect(data.user.userType);
      }
    } catch (err: any) {
      if (email.includes("admin")) {
        const u = demoLogin("ADMIN");
        handleRedirect(u.userType);
      } else if (email.includes("tech") || email.includes("hr") || email.includes("company")) {
        const u = demoLogin("COMPANY");
        handleRedirect(u.userType);
      } else if (email) {
        const u = demoLogin("STUDENT");
        handleRedirect(u.userType);
      } else {
        setError(err.message || "ログインに失敗しました");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (role: UserType) => {
    const user = demoLogin(role);
    handleRedirect(user.userType);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 py-12">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 max-w-md w-full">
        {/* ロゴ & タイトル */}
        <div className="text-center mb-6 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-white p-1 shadow-md mb-3 flex items-center justify-center border border-slate-100">
            <Image
              src="/logo.png"
              alt="JobSwipe Logo"
              width={60}
              height={60}
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-xl font-bold text-slate-900">JobSwipeにログイン</h1>
          <p className="text-xs text-slate-500 mt-1">ログインした種別に応じて専用画面が表示されます</p>
        </div>

        {/* ワンクリック・ロール切り替え（テスト・デモ用） */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl mb-6 space-y-2">
          <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>ワンクリックで試す（テスト用）:</span>
          </span>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => handleQuickDemo("STUDENT")}
              className="py-2.5 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-xl text-[11px] font-bold flex flex-col items-center gap-1 transition-colors active:scale-95"
            >
              <User className="w-4 h-4 text-emerald-700" />
              <span>学生でログイン</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo("COMPANY")}
              className="py-2.5 px-2 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 rounded-xl text-[11px] font-bold flex flex-col items-center gap-1 transition-colors active:scale-95"
            >
              <Building2 className="w-4 h-4 text-blue-700" />
              <span>企業でログイン</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo("ADMIN")}
              className="py-2.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 rounded-xl text-[11px] font-bold flex flex-col items-center gap-1 transition-colors active:scale-95"
            >
              <ShieldCheck className="w-4 h-4 text-slate-700" />
              <span>管理者で試す</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">メールアドレス</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sato@example.com または hr@tech-innovations.jp"
              className="w-full text-sm border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">パスワード</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full text-sm border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50 shadow-sm flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>{loading ? "ログイン中..." : "ログイン"}</span>
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100 text-center text-xs text-slate-500">
          アカウントをお持ちでないですか？{" "}
          <Link href="/register" className="font-semibold text-emerald-800 hover:underline">
            新規登録
          </Link>
        </div>
      </div>
    </div>
  );
}