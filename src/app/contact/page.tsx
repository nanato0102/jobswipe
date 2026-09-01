"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { appStore } from "@/lib/appStore";
import { useAuth } from "@/context/AuthContext";
import {
  Building2,
  User,
  Mail,
  Phone,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Clock,
  Sparkles,
  Send,
  MessageSquare,
  FileText,
  Check,
} from "lucide-react";

export default function ContactPage() {
  const { session, isStudent, isCompany } = useAuth();
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
  const [receiptNumber, setReceiptNumber] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!agreed) {
      setError("個人情報の取り扱い（プライバシーポリシー）への同意が必要です。");
      return;
    }

    setLoading(true);

    try {
      if (userType === "company") {
        const item = appStore.addInquiry({
          userType: "company",
          senderName: companyName.trim(),
          repName: repName.trim(),
          department: department.trim(),
          email: companyEmail.trim(),
          phone: phone.trim(),
          inquiryType: companyInquiryType,
          message: companyMessage.trim(),
        });
        setReceiptNumber(item.receiptNumber);
      } else {
        const item = appStore.addInquiry({
          userType: "student",
          senderName: studentName.trim(),
          university: university.trim(),
          email: studentEmail.trim(),
          inquiryType: studentInquiryType,
          message: studentMessage.trim(),
        });
        setReceiptNumber(item.receiptNumber);
      }

      setLoading(false);
      setSubmitted(true);
    } catch (err: any) {
      setLoading(false);
      setError("送信に失敗しました。時間をおいて再度お試しください。");
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50 py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto w-full space-y-6">
        {/* ヘッダー */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>お問い合わせ・ご相談窓口</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            お問い合わせ
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            サービスに関するご質問・資料請求・導入相談など、お気軽にお問い合わせください。
          </p>
        </div>

        {/* 完了画面 */}
        {submitted ? (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-8 sm:p-12 text-center space-y-6 animate-scale-up">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center mx-auto shadow-2xs">
              <Check className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold">
                受付番号: {receiptNumber}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                お問い合わせを受け付けました
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                お問い合わせいただき誠にありがとうございます。内容を確認のうえ、担当者より原則1〜2営業日以内にご連絡差し上げます。
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
              >
                トップページへ戻る
              </Link>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setCompanyName("");
                  setRepName("");
                  setCompanyEmail("");
                  setPhone("");
                  setCompanyMessage("");
                  setStudentName("");
                  setStudentEmail("");
                  setStudentMessage("");
                  setAgreed(false);
                }}
                className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
              >
                別のお問い合わせを送信
              </button>
            </div>
          </div>
        ) : (
          /* お問い合わせフォーム */
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-10 space-y-6">
            {/* 種別タブ切り替え */}
            <div className="grid grid-cols-2 p-1.5 bg-slate-100 rounded-2xl gap-1">
              <button
                type="button"
                onClick={() => setUserType("company")}
                className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  userType === "company"
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Building2 className="w-4 h-4 text-blue-600" />
                <span>企業の採用担当者様</span>
              </button>

              <button
                type="button"
                onClick={() => setUserType("student")}
                className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  userType === "student"
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <User className="w-4 h-4 text-emerald-700" />
                <span>学生・求職者の方</span>
              </button>
            </div>

            {error && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {userType === "company" ? (
                /* 企業向け入力項目 */
                <>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        法人名・会社名 <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="株式会社〇〇"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        ご担当者名 <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={repName}
                        onChange={(e) => setRepName(e.target.value)}
                        placeholder="山田 太郎"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        メールアドレス <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={companyEmail}
                        onChange={(e) => setCompanyEmail(e.target.value)}
                        placeholder="hr@example.com"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        電話番号
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="03-0000-0000"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      お問い合わせ項目
                    </label>
                    <select
                      value={companyInquiryType}
                      onChange={(e) => setCompanyInquiryType(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
                    >
                      <option value="資料請求・サービス概要">資料請求・サービス概要</option>
                      <option value="デモ体験・料金プラン相談">デモ体験・料金プラン相談</option>
                      <option value="オファー枠の追加購入について">オファー枠の追加購入について</option>
                      <option value="取材・提携について">取材・提携について</option>
                      <option value="その他">その他</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      お問い合わせ内容 <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={companyMessage}
                      onChange={(e) => setCompanyMessage(e.target.value)}
                      placeholder="ご相談内容やご質問を自由にご記入ください。"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 leading-relaxed resize-none"
                    />
                  </div>
                </>
              ) : (
                /* 学生向け入力項目 */
                <>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        お名前 <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="山田 太郎"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        大学名・学校名
                      </label>
                      <input
                        type="text"
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                        placeholder="〇〇大学"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      メールアドレス <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      placeholder="student@example.com"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      お問い合わせ項目
                    </label>
                    <select
                      value={studentInquiryType}
                      onChange={(e) => setStudentInquiryType(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
                    >
                      <option value="利用方法について">利用方法について</option>
                      <option value="動画撮影・アップロードについて">動画撮影・アップロードについて</option>
                      <option value="オファー・チャット面談について">オファー・チャット面談について</option>
                      <option value="退会・アカウント削除について">退会・アカウント削除について</option>
                      <option value="その他">その他</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      お問い合わせ内容 <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={studentMessage}
                      onChange={(e) => setStudentMessage(e.target.value)}
                      placeholder="ご質問や困っていることをご記入ください。"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 leading-relaxed resize-none"
                    />
                  </div>
                </>
              )}

              {/* プライバシーポリシー同意 */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900/20 cursor-pointer"
                  />
                  <span>
                    <Link href="/privacy" target="_blank" className="underline font-bold text-slate-900 hover:text-emerald-700">
                      プライバシーポリシー
                    </Link>
                    に同意して送信する
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || !agreed}
                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? "送信中..." : "上記の内容で送信する"}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
