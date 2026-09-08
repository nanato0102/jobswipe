"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Building2, Home, FileText, Scale, ShieldCheck, Mail } from "lucide-react";

export default function AboutPage() {
  const router = useRouter();

  const handleGoBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const companyInfo = [
    { label: "サービス名", value: "JobSwipe (ジョブスワイプ)" },
    { label: "運営組織", value: "株式会社JobSwipe (JobSwipe Inc.) / JobSwipe 運営事務局" },
    { label: "代表責任者", value: "代表取締役 / 運営統括責任者" },
    { label: "所在地", value: "〒150-0002 東京都渋谷区渋谷2丁目（※詳細な所在地は請求があった場合に遅滞なく開示いたします）" },
    {
      label: "事業内容",
      value: (
        <div className="space-y-1">
          <p>・短尺自己PR動画を活用した新卒逆求人プラットフォーム「JobSwipe」の企画・開発・運営</p>
          <p>・採用DXソリューションおよび企業向け人材マッチング支援事業</p>
          <p>・募集情報等提供事業（職業安定法準拠）</p>
        </div>
      ),
    },
    {
      label: "連絡先窓口",
      value: (
        <div className="space-y-1">
          <p>
            <Link href="/contact" className="text-emerald-700 font-bold hover:underline">
              公式お問い合わせフォームはこちら
            </Link>
          </p>
          <p className="text-slate-500 text-xs">メール: support@jobswipe.jp（営業時間: 平日 10:00〜18:00）</p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* ナビゲーション戻るボタン */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-600" />
            <span>前の画面に戻る</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>トップページ</span>
          </Link>
        </div>

        {/* ページタイトルヘッダー */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                運営組織・会社概要
              </h1>
              <p className="text-xs text-slate-500">
                JobSwipe 運営組織情報
              </p>
            </div>
          </div>
        </div>

        {/* 会社概要テーブル */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs divide-y divide-slate-100">
          {companyInfo.map((item, idx) => (
            <div
              key={idx}
              className="grid sm:grid-cols-12 p-4 sm:p-6 gap-2 sm:gap-6 hover:bg-slate-50/50 transition-colors text-xs sm:text-sm"
            >
              <div className="sm:col-span-4 font-bold text-slate-900 flex items-start gap-1.5">
                <span>{item.label}</span>
              </div>
              <div className="sm:col-span-8 text-slate-700 leading-relaxed">
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* 法的関連リンクカード */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Scale className="w-4 h-4 text-emerald-700" />
            <span>法的表記・各種ポリシー</span>
          </h3>
          <div className="grid sm:grid-cols-3 gap-3 text-xs">
            <Link
              href="/tokusho"
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-emerald-50 hover:border-emerald-200 transition-colors block font-bold text-slate-800 hover:text-emerald-900"
            >
              特定商取引法・職業安定法表記 ➔
            </Link>
            <Link
              href="/terms"
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-emerald-50 hover:border-emerald-200 transition-colors block font-bold text-slate-800 hover:text-emerald-900"
            >
              利用規約・動画管理方針 ➔
            </Link>
            <Link
              href="/privacy"
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-emerald-50 hover:border-emerald-200 transition-colors block font-bold text-slate-800 hover:text-emerald-900"
            >
              プライバシーポリシー ➔
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
