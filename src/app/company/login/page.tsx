"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { LogIn, AlertCircle, Building2, Check } from "lucide-react";

export default function CompanyLoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // パスワード再設定モーダル用
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, expectedRole: "COMPANY" }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "メールアドレスまたはパスワードが正しくありません");
      }

      const data = await res.json();
      if (data.user && data.user.userType === "COMPANY") {
        login(data.user);
        window.location.href = "/swipe";
      } else {
        throw new Error("メールアドレスまたはパスワードが正しくありません");
      }
    } catch (err: any) {
      setError(err.message || "ログインに失敗しました。企業メールアドレスとパスワードをお確かめください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 py-12 bg-slate-50">
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-6 sm:p-8 max-w-md w-full">
        {/* ロゴ & タイトル */}
        <div className="text-center mb-6 flex flex-col items-center">
          <div className="w-12 h-12 mb-3 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="JobSwipe Logo"
              width={48}
              height={48}
              className="object-contain"
              priority
            />
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200 mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>企業採用担当者専用</span>
          </span>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">企業ログイン</h1>
          <p className="text-sm text-slate-500 mt-1">動画スワイプ・スカウト管理画面へログイン</p>
        </div>

        {error && (
          <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-md text-rose-700 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              企業メールアドレス
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hr@company.jp"
              className="w-full text-sm border border-slate-300 rounded-md px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-semibold text-slate-700">パスワード</label>
              <button
                type="button"
                onClick={() => setIsResetModalOpen(true)}
                className="text-xs text-blue-800 hover:text-blue-900 hover:underline font-semibold cursor-pointer"
              >
                パスワードをお忘れですか？
              </button>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full text-sm border border-slate-300 rounded-md px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-md transition-colors disabled:opacity-50 shadow-xs flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <LogIn className="w-4 h-4" />
            <span>{loading ? "ログイン中..." : "企業としてログイン"}</span>
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100 text-center text-sm">
          <p className="text-slate-500">
            まだ企業アカウントをお持ちでないですか？{" "}
            <Link href="/company/register" className="font-semibold text-slate-900 hover:underline">
              企業利用のお申し込み（審査制）
            </Link>
          </p>
        </div>
      </div>

      {/* 企業パスワード再設定モーダル */}
      {isResetModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4 animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">企業パスワードの再設定</h3>
              <button
                type="button"
                onClick={() => {
                  setIsResetModalOpen(false);
                  setResetSent(false);
                }}
                className="text-slate-400 hover:text-slate-700 cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            {resetSent ? (
              <div className="py-4 text-center space-y-3">
                <div className="w-10 h-10 bg-blue-50 text-blue-700 border border-blue-200 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900">再設定メールを送信しました</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  <strong>{resetEmail}</strong> 宛にパスワード再設定用の案内メールを送信しました。メール内のリンクより再設定を行ってください。
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsResetModalOpen(false);
                    setResetSent(false);
                  }}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-sm font-semibold transition-colors cursor-pointer"
                >
                  閉じる
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (resetEmail.trim()) {
                    setResetSent(true);
                  }
                }}
                className="space-y-3.5 pt-1"
              >
                <p className="text-sm text-slate-600 leading-relaxed">
                  ご登録の企業メールアドレスを入力してください。パスワード再設定用のリンクをお送りします。
                </p>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    企業メールアドレス
                  </label>
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="hr@company.jp"
                    className="w-full text-sm border border-slate-300 rounded-md px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
                <div className="pt-2 flex gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsResetModalOpen(false)}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-sm font-semibold transition-colors cursor-pointer"
                  >
                    キャンセル
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-sm font-semibold transition-colors shadow-xs cursor-pointer"
                  >
                    送信する
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}