"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle2, ShieldCheck, KeyRound } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("有効なメールアドレスを入力してください。");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "リクエストの送信に失敗しました。");
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || "予期せぬエラーが発生しました。時間をおいて再度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        {/* ヘッダー */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-lg bg-slate-900 text-white flex items-center justify-center mx-auto shadow-2xs">
            <KeyRound className="w-6 h-6 text-slate-200" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            パスワードの再設定
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            ご登録のメールアドレスを入力してください。<br />
            パスワード再設定用の専用リンクをお送りします。
          </p>
        </div>

        {isSuccess ? (
          <div className="space-y-5 text-center">
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 space-y-2 text-left">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span>メールを送信しました</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-950/80 leading-relaxed">
                <strong>{email}</strong> 宛てにパスワード再設定のご案内メールを送信しました。<br />
                メール本文に記載されているリンクから、<strong>30分以内</strong>に新しいパスワードを設定してください。
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <Link
                href="/login"
                className="block w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-lg transition-colors shadow-2xs text-center"
              >
                ログイン画面に戻る
              </Link>
              <button
                type="button"
                onClick={() => {
                  setIsSuccess(false);
                  setEmail("");
                }}
                className="text-xs text-slate-500 hover:text-slate-800 hover:underline pt-2 cursor-pointer"
              >
                別のメールアドレスで再試行する
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-md text-rose-700 text-xs font-semibold">
                {errorMsg}
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-bold text-slate-700">
                登録メールアドレス <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@jobswipe.jp"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-sm rounded-lg transition-colors shadow-2xs cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? "送信中..." : "再設定リンクを送信する"}
            </button>

            <div className="pt-2 text-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>ログイン画面に戻る</span>
              </Link>
            </div>
          </form>
        )}

        <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>SSL/TLS暗号化通信で保護されています</span>
        </div>
      </div>
    </div>
  );
}
