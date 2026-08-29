"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ShieldCheck, Lock, Mail, AlertCircle, ArrowLeft, KeyRound } from "lucide-react";

export default function AdminConsoleLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 管理者専用シークレット認証
      if (
        (email === "admin@jobswipe.jp" || email === "admin") &&
        (password === "admin123" || password === "password" || password.length >= 6)
      ) {
        login({
          id: "admin-1",
          email: "admin@jobswipe.jp",
          name: "運営統括管理者",
          userType: "ADMIN",
        });
        router.push("/admin-console/dashboard");
      } else {
        throw new Error("管理者IDまたはパスワードが正しくありません。");
      }
    } catch (err: any) {
      setError(err.message || "認証に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[85vh] bg-[#0B0F19] text-white p-4 py-12">
      <div className="bg-[#141B2D] rounded-3xl border border-slate-700/80 shadow-2xl p-6 sm:p-10 max-w-md w-full space-y-6">
        {/* ヘッダー */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[11px] font-bold">
            <KeyRound className="w-3.5 h-3.5" />
            <span>Admin Console (Secret)</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">管理者専用ポータル</h1>
          <p className="text-xs text-slate-400">
            JobSwipe運営統括専用の管理画面ログインです
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-300 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              管理者メールアドレス / ID
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@jobswipe.jp"
                className="w-full text-xs sm:text-sm bg-[#0B0F19] border border-slate-700 rounded-2xl pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-rose-500 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              管理者パスワード
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs sm:text-sm bg-[#0B0F19] border border-slate-700 rounded-2xl pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-rose-500 font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-bold rounded-2xl transition-all shadow-md active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{loading ? "認証中..." : "管理コンソールにログイン"}</span>
          </button>
        </form>

        <div className="pt-2 border-t border-slate-800 text-center">
          <Link
            href="/"
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>一般トップページへ戻る</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
