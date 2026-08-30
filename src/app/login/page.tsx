"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { LogIn, AlertCircle } from "lucide-react";

export default function LoginPage() {
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
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "メールアドレスまたはパスワードが正しくありません");
      }

      const data = await res.json();
      if (data.user) {
        login(data.user);
        window.location.href = data.user.userType === "STUDENT" ? "/student/profile" : "/swipe";
      }
    } catch (err: any) {
      setError(err.message || "ログインに失敗しました。メールアドレスとパスワードをお確かめください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 py-12">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 max-w-md w-full">
        {/* ロゴ & タイトル */}
        <div className="text-center mb-6 flex flex-col items-center">
          <div className="w-14 h-14 mb-3 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="JobSwipe Logo"
              width={56}
              height={56}
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-xl font-bold text-slate-900">ログイン</h1>
          <p className="text-xs text-slate-500 mt-1">メールアドレスとパスワードを入力してください</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">メールアドレス</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@example.com"
              className="w-full text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700">パスワード</label>
              <button
                type="button"
                onClick={() => setIsResetModalOpen(true)}
                className="text-[11px] text-emerald-800 hover:underline font-semibold cursor-pointer"
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
              className="w-full text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-2xl transition-colors disabled:opacity-50 shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>{loading ? "ログイン中..." : "ログイン"}</span>
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100 text-center text-xs">
          <p className="text-slate-500">
            アカウントをお持ちでないですか？{" "}
            <Link href="/register" className="font-bold text-emerald-800 hover:underline">
              新規登録（無料）
            </Link>
          </p>
        </div>
      </div>

      {/* パスワード再設定モーダル */}
      {isResetModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 sm:p-8 space-y-4 animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">パスワードの再設定</h3>
              <button
                type="button"
                onClick={() => {
                  setIsResetModalOpen(false);
                  setResetSent(false);
                }}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {resetSent ? (
              <div className="py-4 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h4 className="text-sm font-bold text-slate-900">再設定メールを送信しました</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>{resetEmail}</strong> 宛にパスワード再設定用の案内メールを送信しました。メール内のリンクより再設定を行ってください。
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsResetModalOpen(false);
                    setResetSent(false);
                  }}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
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
                className="space-y-3 pt-1"
              >
                <p className="text-xs text-slate-600 leading-relaxed">
                  ご登録のメールアドレスを入力してください。パスワード再設定用のリンクをお送りします。
                </p>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">メールアドレス</label>
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsResetModalOpen(false)}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    キャンセル
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-colors shadow-xs cursor-pointer"
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