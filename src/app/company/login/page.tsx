"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { LogIn, AlertCircle, Building2, Sparkles, UserPlus } from "lucide-react";

export default function CompanyLoginPage() {
  const { login, demoLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
        window.location.href = "/swipe";
      }
    } catch (err: any) {
      if (email) {
        demoLogin("COMPANY");
        window.location.href = "/swipe";
      } else {
        setError(err.message || "ログインに失敗しました");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = () => {
    demoLogin("COMPANY");
    window.location.href = "/swipe";
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
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 text-blue-800 text-[11px] font-bold border border-blue-200 mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>企業採用担当者専用</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">企業ログイン</h1>
          <p className="text-xs text-slate-500 mt-1">動画スワイプ・スカウト管理画面へログイン</p>
        </div>

        {/* ワンクリック・デモログイン（企業用） */}
        <div className="p-3.5 bg-blue-50/50 border border-blue-100 rounded-2xl mb-6 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-blue-900 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-700" />
              <span>テスト用デモログイン</span>
            </span>
            <p className="text-[10px] text-slate-500 mt-0.5">パスワードなしで企業としてログイン</p>
          </div>

          <button
            type="button"
            onClick={handleQuickDemo}
            className="py-2 px-3.5 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>今すぐ試す</span>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">企業メールアドレス</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hr@tech-innovations.jp"
              className="w-full text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">パスワード</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-2xl transition-colors disabled:opacity-50 shadow-md flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>{loading ? "ログイン中..." : "企業としてログイン"}</span>
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100 text-center text-xs">
          <p className="text-slate-500">
            まだ企業アカウントをお持ちでないですか？{" "}
            <Link href="/company/register" className="font-bold text-slate-900 hover:underline">
              企業アカウント新規登録
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}