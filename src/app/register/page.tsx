"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { UserPlus, User, Building2, AlertCircle, CheckCircle } from "lucide-react";
import type { UserType } from "@/types";

export default function RegisterPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<UserType>("STUDENT");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, userType, name }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "登録に失敗しました");
      }

      setSuccess(true);
      setTimeout(() => {
        if (userType === "STUDENT") {
          router.push("/student/profile");
        } else {
          router.push("/swipe");
        }
      }, 1200);
    } catch (err: any) {
      setError(err.message || "登録処理中にエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 py-12">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 max-w-md w-full">
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
          <h1 className="text-xl font-bold text-slate-900">JobSwipe 新規登録</h1>
          <p className="text-xs text-slate-500 mt-1">学生または企業のアカウントを無料作成</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span>登録が完了しました！マイページへ移動します...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 種別選択 */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">アカウント種別</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setUserType("STUDENT")}
                className={`py-2.5 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  userType === "STUDENT"
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <User className="w-4 h-4" />
                <span>学生 / 求職者</span>
              </button>

              <button
                type="button"
                onClick={() => setUserType("COMPANY")}
                className={`py-2.5 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  userType === "COMPANY"
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>企業採用担当</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {userType === "STUDENT" ? "氏名" : "企業名"}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={userType === "STUDENT" ? "山田 太郎" : "株式会社サンプル"}
              className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">メールアドレス</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">パスワード</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="6文字以上の英数字"
              className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? "登録中..." : "利用規約に同意して登録"}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100 text-center text-xs text-slate-500">
          既にアカウントをお持ちですか？{" "}
          <Link href="/login" className="font-semibold text-slate-900 hover:underline">
            ログイン
          </Link>
        </div>
      </div>
    </div>
  );
}