"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { appStore } from "@/lib/appStore";
import { useToast } from "@/context/ToastContext";
import {
  Building2,
  AlertCircle,
  CheckCircle,
  ShieldCheck,
  Send,
  FileCheck,
  Clock,
  ArrowRight,
  Home,
  Mail,
  Phone,
  User,
  Sparkles,
} from "lucide-react";

export default function CompanyRegisterPage() {
  const { success } = useToast();

  // フォームステート
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("IT / Webサービス");
  const [repName, setRepName] = useState("");
  const [repNameKana, setRepNameKana] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hiringPurpose, setHiringPurpose] = useState("新卒採用（本選考・早期選考）");
  const [planType, setPlanType] = useState("無料トライアル希望（デモ体験）");
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [submittedRequestNumber, setSubmittedRequestNumber] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // バリデーション
    if (!companyName.trim()) {
      setError("企業名・法人名を入力してください。");
      return;
    }

    if (!repName.trim()) {
      setError("ご担当者様の氏名を入力してください。");
      return;
    }

    if (!email.trim()) {
      setError("企業メールアドレスを入力してください。");
      return;
    }

    if (!phone.trim()) {
      setError("ご連絡先電話番号を入力してください。");
      return;
    }

    if (!agreed) {
      setError("利用規約およびプライバシーポリシーへの同意が必要です。");
      return;
    }

    setLoading(true);

    try {
      // 管理者問い合わせ/企業申込データとして保存
      const createdInquiry = appStore.addInquiry({
        userType: "company",
        senderName: companyName.trim(),
        email: email.trim(),
        repName: `${repName.trim()} (${repNameKana.trim() || "カナ未記入"})`,
        department: department.trim() || "採用担当",
        phone: phone.trim(),
        inquiryType: "企業利用・トライアルお申し込み",
        message: `【ご利用目的】${hiringPurpose}\n【希望プラン】${planType}\n【業種】${industry}\n【ご要望・質問】\n${message.trim() || "特になし"}`,
      });

      setSubmittedRequestNumber(createdInquiry.receiptNumber);
      success("利用お申し込みを受け付けました", "審査完了後にアカウント発行メールをお送りします。");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      setError("お申し込み処理中にエラーが発生しました。時間をおいて再度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 py-12 bg-slate-50">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 max-w-2xl w-full">
        {/* ================= 申込完了画面（審査受付） ================= */}
        {submittedRequestNumber ? (
          <div className="space-y-8 animate-fade-in text-center py-4">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-xs">
              <FileCheck className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-black text-emerald-800 tracking-widest uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
                Application Received
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                企業利用のお申し込みを受け付けました
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                この度は「JobSwipe」にお申し込みいただき、誠にありがとうございます。
              </p>
            </div>

            {/* 受付番号カード */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-md mx-auto text-left space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">お申し込み受付番号</span>
                <span className="text-xs font-mono font-black text-slate-900 px-2 py-0.5 bg-white rounded border border-slate-200">
                  {submittedRequestNumber}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">お申し込み企業名</span>
                <span className="font-bold text-slate-900">{companyName}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">ご担当者様</span>
                <span className="font-bold text-slate-900">{repName} 様</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">通知先メールアドレス</span>
                <span className="font-bold text-slate-900">{email}</span>
              </div>
            </div>

            {/* ご利用開始までのステップ */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 text-left space-y-4 shadow-2xs">
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <Clock className="w-4 h-4 text-emerald-700" />
                <span>今後のご利用開始までの流れ</span>
              </h3>
              <div className="grid sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 space-y-1">
                  <span className="text-[10px] font-black text-emerald-800 bg-white px-1.5 py-0.5 rounded border border-emerald-200 inline-block">
                    STEP 01
                  </span>
                  <p className="font-bold text-slate-900">企業審査（1〜2営業日）</p>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    事務局にて企業情報および掲載適合性の確認を行います。
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-black text-slate-700 bg-white px-1.5 py-0.5 rounded border border-slate-200 inline-block">
                    STEP 02
                  </span>
                  <p className="font-bold text-slate-900">アカウント発行メール</p>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    審査完了後、ログインIDとパスワード設定URLをお送りします。
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-black text-slate-700 bg-white px-1.5 py-0.5 rounded border border-slate-200 inline-block">
                    STEP 03
                  </span>
                  <p className="font-bold text-slate-900">動画スワイプ・スカウト</p>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    学生の自己PR動画を閲覧し、即座にオファーを送信できます。
                  </p>
                </div>
              </div>
            </div>

            {/* ナビゲーション */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>トップページへ戻る</span>
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border border-slate-200 transition-colors cursor-pointer"
              >
                <span>お急ぎ・デモ体験のお問い合わせ</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>
        ) : (
          /* ================= 申込入力フォーム ================= */
          <div className="space-y-6 animate-fade-in">
            {/* ヘッダー */}
            <div className="text-center space-y-2 border-b border-slate-100 pb-5 flex flex-col items-center">
              <div className="w-14 h-14 mb-1 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="JobSwipe Logo"
                  width={56}
                  height={56}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 text-blue-800 text-[11px] font-bold border border-blue-200">
                <Building2 className="w-3.5 h-3.5" />
                <span>採用企業様向け ご利用・トライアル申請</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                企業利用のお申し込み
              </h1>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                学生の人柄が60秒でわかる逆求人プラットフォーム「JobSwipe」の導入・無料トライアルのお申し込みフォームです。
              </p>
            </div>

            {/* 安心の審査制バッジ */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3 text-xs">
              <ShieldCheck className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="font-bold text-slate-900">安心・安全の完全審査制プラットフォーム</p>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  安心してご利用いただくため、運営事務局による企業様の掲載審査（通常1〜2営業日）を実施しております。審査完了後、担当者様宛に即時ログイン情報をご案内いたします。
                </p>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* 1. 会社情報 */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                  <Building2 className="w-4 h-4 text-slate-600" />
                  <span>企業情報</span>
                </h3>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      企業名 / 法人名 <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="例：株式会社テックイノベーション"
                      className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      業種 <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                    >
                      <option value="IT / Webサービス">IT / Webサービス</option>
                      <option value="コンサルティング / 専門サービス">コンサルティング / 専門サービス</option>
                      <option value="メーカー / 製造業">メーカー / 製造業</option>
                      <option value="商社 / 流通">商社 / 流通</option>
                      <option value="広告 / マスコミ / エンタメ">広告 / マスコミ / エンタメ</option>
                      <option value="金融 / 保険 / 不動産">金融 / 保険 / 不動産</option>
                      <option value="人材 / 教育 / 医療 / 福祉">人材 / 教育 / 医療 / 福祉</option>
                      <option value="その他">その他</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 2. ご担当者情報 */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                  <User className="w-4 h-4 text-slate-600" />
                  <span>ご担当者様情報</span>
                </h3>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      氏名 <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={repName}
                      onChange={(e) => setRepName(e.target.value)}
                      placeholder="例：山田 太郎"
                      className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">フリガナ</label>
                    <input
                      type="text"
                      value={repNameKana}
                      onChange={(e) => setRepNameKana(e.target.value)}
                      placeholder="例：ヤマダ タロウ"
                      className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">部署・お役職</label>
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      placeholder="例：人事部 採用担当"
                      className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      ご連絡先電話番号 <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="例：03-1234-5678"
                      className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    企業メールアドレス <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="例：hr@tech-innovations.jp (会社ドメインのアドレス)"
                    className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                  <p className="text-[10px] text-slate-400 mt-0.5">※ GmailやYahoo等のフリーメールでの申請は審査にお時間を要する場合があります。</p>
                </div>
              </div>

              {/* 3. 採用計画・ご希望プラン */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                  <Sparkles className="w-4 h-4 text-slate-600" />
                  <span>ご利用目的・ご希望プラン</span>
                </h3>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      ご利用の目的・採用種別 <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={hiringPurpose}
                      onChange={(e) => setHiringPurpose(e.target.value)}
                      className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                    >
                      <option value="新卒採用（本選考・早期選考）">新卒採用（本選考・早期選考）</option>
                      <option value="サマー / 秋冬インターンシップ募集">サマー / 秋冬インターンシップ募集</option>
                      <option value="長期インターンシップ採用（通年）">長期インターンシップ採用（通年）</option>
                      <option value="新卒・インターン両方の採用">新卒・インターン両方の採用</option>
                      <option value="第二新卒・中途採用">第二新卒・中途採用</option>
                      <option value="その他・まずは情報収集">その他・まずは情報収集</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">ご希望の導入種別</label>
                    <select
                      value={planType}
                      onChange={(e) => setPlanType(e.target.value)}
                      className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                    >
                      <option value="無料トライアル希望（デモ体験）">無料トライアル希望（機能体験）</option>
                      <option value="サービス資料請求・オンライン相談">サービス資料請求・オンライン相談</option>
                      <option value="スタンダードプランでの本契約">スタンダードプランでの本契約</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ご要望・ご質問など（任意）
                  </label>
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="採用予定人数や、特に会いたい学生の人物像などがございましたらご記入ください。"
                    className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none"
                  />
                </div>
              </div>

              {/* 利用規約同意 */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded text-slate-900 focus:ring-slate-900 border-slate-300 cursor-pointer"
                  />
                  <span className="text-xs text-slate-600 leading-relaxed">
                    <Link href="/terms" target="_blank" className="font-bold text-slate-900 underline">
                      利用規約
                    </Link>
                    、
                    <Link href="/privacy" target="_blank" className="font-bold text-slate-900 underline">
                      プライバシーポリシー
                    </Link>
                    および企業掲載基準に同意します。
                  </span>
                </label>
              </div>

              {/* 送信ボタン */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-2xl transition-all disabled:opacity-50 shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? "送信中..." : "企業利用を申し込む（審査申請）"}</span>
              </button>
            </form>

            <div className="pt-4 border-t border-slate-100 text-center text-xs">
              <p className="text-slate-500">
                すでにアカウントをお持ちの企業様は{" "}
                <Link href="/company/login" className="font-bold text-slate-900 hover:underline">
                  企業ログインはこちら
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}