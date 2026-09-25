"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, CheckCircle2, ShieldCheck, KeyRound, ArrowRight } from "lucide-react";

function ResetPasswordInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!token) {
      setErrorMsg("再設定トークンが見つかりません。メールのリンクから再度アクセスしてください。");
      return;
    }

    if (newPassword.length < 8) {
      setErrorMsg("パスワードは8文字以上で設定してください。");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg("パスワード（確認用）が一致しません。");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "パスワードの再設定に失敗しました。");
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || "予期せぬエラーが発生しました。");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 bg-slate-50">
        <div className="max-w-md w-full bg-white rounded-xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-5 text-center">
          <div className="w-12 h-12 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900">無効なアクセスです</h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            パスワード再設定用のトークンが見つかりません。メールに記載されたリンクから再度アクセスしてください。
          </p>
          <div className="pt-2">
            <Link
              href="/forgot-password"
              className="inline-flex items-center justify-center w-full py-2.5 px-4 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors"
            >
              再設定メールを再申請する
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        {/* ヘッダー */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-lg bg-slate-900 text-white flex items-center justify-center mx-auto shadow-2xs">
            <KeyRound className="w-6 h-6 text-slate-200" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            新しいパスワードの設定
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            8文字以上の安全な新しいパスワードを入力してください。
          </p>
        </div>

        {isSuccess ? (
          <div className="space-y-5 text-center">
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 space-y-2 text-left">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span>パスワードを更新しました</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-950/80 leading-relaxed">
                パスワードの再設定が正常に完了しました。新しいパスワードでログインしてください。
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-lg transition-colors shadow-2xs"
              >
                <span>ログイン画面へ進む</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
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
              <label htmlFor="newPassword" className="block text-xs font-bold text-slate-700">
                新しいパスワード <span className="text-rose-500">*</span> (8文字以上)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="newPassword"
                  type="password"
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="半角英数8文字以上"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="confirmPassword" className="block text-xs font-bold text-slate-700">
                パスワード（確認用） <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="もう一度入力してください"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-sm rounded-lg transition-colors shadow-2xs cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? "更新中..." : "パスワードを更新して保存"}
            </button>
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">読み込み中...</div>}>
      <ResetPasswordInner />
    </Suspense>
  );
}
