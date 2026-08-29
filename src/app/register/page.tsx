"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { UserPlus, AlertCircle, CheckCircle, ShieldCheck, FileText } from "lucide-react";

export default function RegisterPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [university, setUniversity] = useState("");
  const [graduationYear, setGraduationYear] = useState(2027);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!agreed) {
      setError("利用規約・プライバシーポリシーおよび誓約事項への同意が必要です。");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, userType: "STUDENT", name }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "登録に失敗しました");
      }

      const dummyUser = {
        id: "u-" + Date.now(),
        email,
        userType: "STUDENT" as const,
        name,
      };
      login(dummyUser);

      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/student/profile";
      }, 1000);
    } catch (err: any) {
      setError(err.message || "登録処理中にエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 py-12">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 max-w-md w-full">
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
          <h1 className="text-xl font-bold text-slate-900">学生新規登録</h1>
          <p className="text-xs text-slate-500 mt-1">動画を投稿して企業からスカウトを受け取ろう</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span>登録が完了しました！プロフィール画面へ移動します...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">氏名</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="山田 太郎"
              className="w-full text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">大学名</label>
              <input
                type="text"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                placeholder="早稲田大学"
                className="w-full text-sm border border-slate-300 rounded-2xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">卒業年</label>
              <select
                value={graduationYear}
                onChange={(e) => setGraduationYear(Number(e.target.value))}
                className="w-full text-sm border border-slate-300 rounded-2xl px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white font-medium"
              >
                <option value={2027}>2027年卒</option>
                <option value={2028}>2028年卒</option>
                <option value={2029}>2029年卒</option>
                <option value={2030}>2030年卒</option>
              </select>
            </div>
          </div>

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
            <label className="block text-xs font-bold text-slate-700 mb-1">パスワード</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="6文字以上の英数字"
              className="w-full text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>

          {/* 誓約書・規約同意チェックボックス */}
          <div className="pt-2">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs select-none">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-emerald-700 focus:ring-emerald-600 cursor-pointer"
                />
                <span className="text-slate-700 leading-relaxed font-medium">
                  <Link href="/terms" target="_blank" className="font-bold text-emerald-800 underline hover:text-emerald-700">
                    利用規約
                  </Link>
                  {" "}および{" "}
                  <Link href="/privacy" target="_blank" className="font-bold text-emerald-800 underline hover:text-emerald-700">
                    プライバシーポリシー
                  </Link>
                  {" "}を確認し、誓約事項に同意します
                </span>
              </label>

              <div className="text-[10px] text-slate-500 pl-6 space-y-0.5">
                <p>・経歴の虚偽登録や他者の権利（著作権・肖像権）侵害を行いません</p>
                <p>・投稿したPR動画が採用選考目的で登録企業に公開されることに同意します</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !agreed}
            className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-600 active:scale-98 text-white text-sm font-bold rounded-2xl transition-all disabled:opacity-50 shadow-md flex items-center justify-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>{loading ? "登録処理中..." : "新規登録する（完全無料）"}</span>
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100 text-center text-xs">
          <p className="text-slate-500">
            既にアカウントをお持ちですか？{" "}
            <Link href="/login" className="font-bold text-emerald-800 hover:underline">
              ログイン
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}