"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  User,
  Mail,
  Phone,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
  Send,
  MessageSquare,
  FileText,
} from "lucide-react";

export default function ContactPage() {
  const [userType, setUserType] = useState<"company" | "student">("company");
  
  // 企業用フォームステート
  const [companyName, setCompanyName] = useState("");
  const [repName, setRepName] = useState("");
  const [department, setDepartment] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyInquiryType, setCompanyInquiryType] = useState("資料請求・サービス概要");
  const [companyMessage, setCompanyMessage] = useState("");

  // 学生用フォームステート
  const [studentName, setStudentName] = useState("");
  const [university, setUniversity] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentInquiryType, setStudentInquiryType] = useState("利用方法について");
  const [studentMessage, setStudentMessage] = useState("");

  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!agreed) {
      setError("個人情報の取り扱い（プライバシーポリシー）への同意が必要です。");
      return;
    }

    setLoading(true);

    // 送信シミュレーション（実稼働時はAPIエンドポイントへ送信）
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#0B0F19] text-white selection:bg-emerald-500 selection:text-white py-12 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-x-hidden relative w-full">
      {/* 背景の環境光 */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[400px] bg-emerald-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-4xl w-full space-y-10">
        {/* ヘッダー */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide shadow-sm">
            <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
            <span>Contact & Inquiry</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            お問い合わせ・導入相談
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            採用企業の資料請求・オンラインデモ案内、または学生のご質問を受け付けております。<br className="hidden sm:inline" />
            専任担当者より、通常1営業日以内にご案内いたします。
          </p>
        </div>

        {/* 送信完了表示 */}
        {submitted ? (
          <div className="bg-[#141B2D] rounded-3xl border border-emerald-500/50 p-8 sm:p-12 text-center space-y-6 shadow-2xl animate-fade-in-up">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">お問い合わせを受け付けました</h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                ご入力いただいたメールアドレス宛に受付確認メールをお送りいたしました。担当者より速やかにご連絡申し上げます。
              </p>
            </div>
            <div className="pt-4 flex justify-center gap-4">
              <Link
                href="/"
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold rounded-2xl transition-all shadow-md"
              >
                トップページへ戻る
              </Link>
            </div>
          </div>
        ) : (
          /* メインフォームカード */
          <div className="bg-[#141B2D] rounded-3xl border border-slate-700/80 p-6 sm:p-10 shadow-2xl space-y-8">
            {/* 切り替えタブ */}
            <div className="flex justify-center">
              <div className="inline-flex p-1 bg-[#0B0F19] rounded-2xl border border-slate-700/60 shadow-inner w-full max-w-md">
                <button
                  type="button"
                  onClick={() => {
                    setUserType("company");
                    setError(null);
                  }}
                  className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    userType === "company"
                      ? "bg-emerald-600 text-white shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>企業・採用担当者様</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setUserType("student");
                    setError(null);
                  }}
                  className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    userType === "student"
                      ? "bg-emerald-600 text-white shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>学生・求職者様</span>
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-rose-950/40 border border-rose-800/80 rounded-2xl text-rose-300 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 企業向けフォーム項目 */}
              {userType === "company" ? (
                <>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        貴社名 <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="株式会社〇〇"
                        className="w-full text-sm border border-slate-700 rounded-2xl px-4 py-2.5 bg-[#0B0F19] text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        ご担当者様 氏名 <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={repName}
                        onChange={(e) => setRepName(e.target.value)}
                        placeholder="採用 太郎"
                        className="w-full text-sm border border-slate-700 rounded-2xl px-4 py-2.5 bg-[#0B0F19] text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">部署名・お役職</label>
                      <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        placeholder="人事部 採用グループリーダー"
                        className="w-full text-sm border border-slate-700 rounded-2xl px-4 py-2.5 bg-[#0B0F19] text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">電話番号</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="03-1234-5678"
                        className="w-full text-sm border border-slate-700 rounded-2xl px-4 py-2.5 bg-[#0B0F19] text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        勤務先メールアドレス <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={companyEmail}
                        onChange={(e) => setCompanyEmail(e.target.value)}
                        placeholder="recruiter@example.co.jp"
                        className="w-full text-sm border border-slate-700 rounded-2xl px-4 py-2.5 bg-[#0B0F19] text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        ご相談の種別 <span className="text-emerald-400">*</span>
                      </label>
                      <select
                        value={companyInquiryType}
                        onChange={(e) => setCompanyInquiryType(e.target.value)}
                        className="w-full text-sm border border-slate-700 rounded-2xl px-4 py-2.5 bg-[#0B0F19] text-white focus:outline-none focus:border-emerald-500 transition-colors font-medium"
                      >
                        <option value="資料請求・サービス概要">資料請求・サービス概要</option>
                        <option value="料金プラン・見積もり相談">料金プラン・見積もり相談</option>
                        <option value="オンラインデモ・画面体験希望">オンラインデモ・画面体験希望</option>
                        <option value="採用母集団・学生層の確認">採用母集団・学生層の確認</option>
                        <option value="その他のお問い合わせ">その他のお問い合わせ</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      お問い合わせ・ご要望詳細 <span className="text-emerald-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={companyMessage}
                      onChange={(e) => setCompanyMessage(e.target.value)}
                      placeholder="採用予定人数や募集職種（例: 27卒営業職 5名採用）、オンライン面談のご希望日時などをご自由にご記入ください。"
                      className="w-full text-sm border border-slate-700 rounded-2xl p-4 bg-[#0B0F19] text-white focus:outline-none focus:border-emerald-500 transition-colors leading-relaxed"
                    />
                  </div>
                </>
              ) : (
                /* 学生向けフォーム項目 */
                <>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        お名前 <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="山田 太郎"
                        className="w-full text-sm border border-slate-700 rounded-2xl px-4 py-2.5 bg-[#0B0F19] text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        大学名 <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                        placeholder="早稲田大学"
                        className="w-full text-sm border border-slate-700 rounded-2xl px-4 py-2.5 bg-[#0B0F19] text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        メールアドレス <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        placeholder="student@example.com"
                        className="w-full text-sm border border-slate-700 rounded-2xl px-4 py-2.5 bg-[#0B0F19] text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        ご相談の種別 <span className="text-emerald-400">*</span>
                      </label>
                      <select
                        value={studentInquiryType}
                        onChange={(e) => setStudentInquiryType(e.target.value)}
                        className="w-full text-sm border border-slate-700 rounded-2xl px-4 py-2.5 bg-[#0B0F19] text-white focus:outline-none focus:border-emerald-500 transition-colors font-medium"
                      >
                        <option value="利用方法について">利用方法について</option>
                        <option value="動画撮影・投稿に関する質問">動画撮影・投稿に関する質問</option>
                        <option value="スカウト・選考に関する質問">スカウト・選考に関する質問</option>
                        <option value="退会・アカウントについて">退会・アカウントについて</option>
                        <option value="その他">その他</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      お問い合わせ内容 <span className="text-emerald-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={studentMessage}
                      onChange={(e) => setStudentMessage(e.target.value)}
                      placeholder="ご不明な点や質問をご記入ください。"
                      className="w-full text-sm border border-slate-700 rounded-2xl p-4 bg-[#0B0F19] text-white focus:outline-none focus:border-emerald-500 transition-colors leading-relaxed"
                    />
                  </div>
                </>
              )}

              {/* プライバシーポリシー同意 */}
              <div className="p-4 bg-[#0B0F19] rounded-2xl border border-slate-700/60 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="privacy-agree"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 focus:ring-offset-0 bg-[#141B2D] border-slate-600 cursor-pointer"
                />
                <label htmlFor="privacy-agree" className="text-xs text-slate-300 leading-relaxed cursor-pointer select-none">
                  <Link href="/privacy" target="_blank" className="text-emerald-400 hover:underline font-bold">
                    プライバシーポリシー（個人情報の取り扱い）
                  </Link>
                  を確認し、同意の上で送信します。
                </label>
              </div>

              {/* 送信ボタン */}
              <button
                type="submit"
                disabled={loading || !agreed}
                className="w-full py-4 px-8 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm sm:text-base font-bold rounded-2xl transition-all shadow-[0_10px_25px_rgba(5,150,105,0.3)] hover:shadow-[0_15px_35px_rgba(5,150,105,0.5)] flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <span>送信中...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    <span>送信する</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* 信頼性・運営情報フッターインフォ */}
        <div className="grid sm:grid-cols-3 gap-4 text-xs text-slate-400">
          <div className="p-4 bg-[#141B2D]/60 rounded-2xl border border-slate-800 flex items-center gap-3">
            <Clock className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div>
              <p className="font-bold text-slate-200">営業時間</p>
              <p>平日 10:00 〜 19:00</p>
            </div>
          </div>

          <div className="p-4 bg-[#141B2D]/60 rounded-2xl border border-slate-800 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div>
              <p className="font-bold text-slate-200">セキュリティ基準</p>
              <p>IPA安全なウェブ運用準拠</p>
            </div>
          </div>

          <div className="p-4 bg-[#141B2D]/60 rounded-2xl border border-slate-800 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div>
              <p className="font-bold text-slate-200">法人審査体制</p>
              <p>完全審査制プラットフォーム</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
