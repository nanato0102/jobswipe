"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { Building2, AlertCircle, CheckCircle, Briefcase, ShieldCheck } from "lucide-react";

export default function CompanyRegisterPage() {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("IT / Webサービス");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        body: JSON.stringify({ email, password, userType: "COMPANY", name }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "登録に失敗しました");
      }

      const dummyUser = {
        id: "u-" + Date.now(),
        email,
        userType: "COMPANY" as const,
        name,
      };
      login(dummyUser);

      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/swipe";
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
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 text-blue-800 text-[11px] font-bold border border-blue-200 mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>企業採用担当者専用</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">企業アカウント新規登録</h1>
          <p className="text-xs text-slate-500 mt-1">動画スワイプで新しい採用をはじめましょう</p>
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
            <span>企業登録が完了しました！スワイプ画面へ移動します...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">企業名 / 法人名</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="株式会社サンプル"
              className="w-full text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-slate-500" />
              <span>主な業界</span>
            </label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white font-medium"
            >
              <option value="IT / Webサービス">IT / Webサービス</option>
              <option value="ベンチャー / スタートアップ">ベンチャー / スタートアップ</option>
              <option value="美容 / コスメ / ヘルスケア">美容 / コスメ / ヘルスケア</option>
              <option value="アパレル / ファッション">アパレル / ファッション</option>
              <option value="広告 / PR / マスコミ">広告 / PR / マスコミ</option>
              <option value="人材 / 教育 / コンサルティング">人材 / 教育 / コンサルティング</option>
              <option value="不動産 / 建設 / 住宅">不動産 / 建設 / 住宅</option>
              <option value="総合商社 / 専門商社">総合商社 / 専門商社</option>
              <option value="飲食 / フードサービス">飲食 / フードサービス</option>
              <option value="ブライダル / ホテル / 観光">ブライダル / ホテル / 観光</option>
              <option value="エンタメ / イベント / 音楽">エンタメ / イベント / 音楽</option>
              <option value="メーカー / 製造 / 日用品">メーカー / 製造 / 日用品</option>
              <option value="金融 / 保険">金融 / 保険</option>
              <option value="その他">その他</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">ご担当者メールアドレス</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hr@company.jp"
              className="w-full text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
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
              className="w-full text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
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
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-900 focus:ring-slate-900 cursor-pointer"
                />
                <span className="text-slate-700 leading-relaxed font-medium">
                  <Link href="/terms" target="_blank" className="font-bold text-blue-900 underline hover:text-blue-700">
                    利用規約
                  </Link>
                  {" "}および{" "}
                  <Link href="/privacy" target="_blank" className="font-bold text-blue-900 underline hover:text-blue-700">
                    プライバシーポリシー
                  </Link>
                  {" "}を確認し、誓約事項に同意します
                </span>
              </label>

              <div className="text-[10px] text-slate-500 pl-6 space-y-0.5">
                <p>・採用選考以外の目的で学生の個人情報・動画を利用または漏洩しません</p>
                <p>・労働関係諸法令を遵守し、誠実かつ公正な採用活動を行うことを誓約します</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !agreed}
            className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 active:scale-98 text-white text-sm font-bold rounded-2xl transition-all disabled:opacity-50 shadow-md flex items-center justify-center gap-2"
          >
            <Building2 className="w-4 h-4" />
            <span>{loading ? "登録処理中..." : "企業アカウントを登録する"}</span>
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100 text-center text-xs">
          <p className="text-slate-500">
            既にアカウントをお持ちですか？{" "}
            <Link href="/company/login" className="font-bold text-slate-900 hover:underline">
              企業ログイン
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}