"use client";

import Link from "next/link";
import Image from "next/image";
import { Building2, ShieldCheck, Mail, MapPin, Calendar, CreditCard, RefreshCw, FileText, ArrowLeft, Globe } from "lucide-react";

export default function AboutAndLegalPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* ナビゲーション戻るボタン */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>トップページに戻る</span>
          </Link>
        </div>

        {/* ページヘッダー */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
              <Image
                src="/logo.png"
                alt="JobSwipe Logo"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                運営会社概要 & 特定商取引法に基づく表記
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                JobSwipe（ジョブスワイプ）の公式運営組織情報および法的表記
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 1. 運営会社概要 */}
        {/* ========================================================================= */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <Building2 className="w-5 h-5 text-slate-800" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              運営会社概要（Company Profile）
            </h2>
          </div>

          <div className="overflow-hidden">
            <dl className="divide-y divide-slate-100 text-xs sm:text-sm">
              <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <dt className="font-bold text-slate-600 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  サービス名
                </dt>
                <dd className="sm:col-span-2 text-slate-900 font-bold">
                  JobSwipe (ジョブスワイプ)
                </dd>
              </div>

              <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <dt className="font-bold text-slate-600 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  運営組織
                </dt>
                <dd className="sm:col-span-2 text-slate-900">
                  JobSwipe 運営事務局 / 株式会社JobSwipe (JobSwipe Inc.)
                </dd>
              </div>

              <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <dt className="font-bold text-slate-600 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-slate-400" />
                  代表責任者
                </dt>
                <dd className="sm:col-span-2 text-slate-900">
                  代表取締役 / プロジェクト代表
                </dd>
              </div>

              <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <dt className="font-bold text-slate-600 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  所在地
                </dt>
                <dd className="sm:col-span-2 text-slate-900">
                  〒150-0002 東京都渋谷区渋谷2丁目（JobSwipe 運営本部）
                </dd>
              </div>

              <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <dt className="font-bold text-slate-600 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  設立 / サービス開始
                </dt>
                <dd className="sm:col-span-2 text-slate-900">
                  2026年3月
                </dd>
              </div>

              <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <dt className="font-bold text-slate-600 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-slate-400" />
                  主な事業内容
                </dt>
                <dd className="sm:col-span-2 text-slate-900 leading-relaxed">
                  1. 短尺動画型・逆求人就活プラットフォーム「JobSwipe」の企画・開発・運営<br />
                  2. 新卒・Z世代向け採用支援および採用DXコンサルティング事業<br />
                  3. 人材マッチング・スカウト支援サービスの提供
                </dd>
              </div>

              <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <dt className="font-bold text-slate-600 flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-slate-400" />
                  公式お問い合わせ
                </dt>
                <dd className="sm:col-span-2 text-slate-900">
                  <Link href="/contact" className="text-emerald-800 font-bold hover:underline">
                    お問い合わせフォームはこちら
                  </Link>
                  {" "}(support@jobswipe.jp)
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. 特定商取引法に基づく表記 */}
        {/* ========================================================================= */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <CreditCard className="w-5 h-5 text-slate-800" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              特定商取引法に基づく表記（Specified Commercial Transactions Act）
            </h2>
          </div>

          <div className="overflow-hidden">
            <dl className="divide-y divide-slate-100 text-xs sm:text-sm">
              <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <dt className="font-bold text-slate-600">販売事業者名</dt>
                <dd className="sm:col-span-2 text-slate-900">JobSwipe 運営事務局</dd>
              </div>

              <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <dt className="font-bold text-slate-600">運営責任者</dt>
                <dd className="sm:col-span-2 text-slate-900">代表責任者</dd>
              </div>

              <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <dt className="font-bold text-slate-600">所在地</dt>
                <dd className="sm:col-span-2 text-slate-900">
                  〒150-0002 東京都渋谷区渋谷2丁目（お問い合わせ受付時に遅滞なく開示いたします）
                </dd>
              </div>

              <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <dt className="font-bold text-slate-600">電話番号 / 連絡先</dt>
                <dd className="sm:col-span-2 text-slate-900">
                  お問い合わせ窓口メール（support@jobswipe.jp）または{" "}
                  <Link href="/contact" className="text-emerald-800 font-bold hover:underline">
                    お問い合わせフォーム
                  </Link>
                  {" "}よりご連絡ください（電話番号につきましては請求があり次第、電磁的方法により遅滞なく提供いたします）。
                </dd>
              </div>

              <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <dt className="font-bold text-slate-600">販売価格・利用料金</dt>
                <dd className="sm:col-span-2 text-slate-900 space-y-1">
                  <p><strong>学生ユーザー:</strong> 完全無料（登録・動画投稿・オファー受信・チャットすべて無料）</p>
                  <p><strong>企業ユーザー:</strong> 選択プランまたはオファー枠数に応じた月額利用料 / 成果報酬料（各プランのお申し込み画面および企業管理画面にて表示された税込価格）</p>
                </dd>
              </div>

              <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <dt className="font-bold text-slate-600">商品代金以外の必要料金</dt>
                <dd className="sm:col-span-2 text-slate-900">
                  インターネット接続料金および通信回線費（パケット通信料等）はお客様のご負担となります。
                </dd>
              </div>

              <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <dt className="font-bold text-slate-600">代金の支払方法</dt>
                <dd className="sm:col-span-2 text-slate-900">
                  クレジットカード決済（Visa, Mastercard, JCB, American Express）、銀行振込（請求書払い）
                </dd>
              </div>

              <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <dt className="font-bold text-slate-600">代金の支払時期</dt>
                <dd className="sm:col-span-2 text-slate-900">
                  クレジットカード決済：各カード会社の引き落とし日<br />
                  銀行振込：請求書に記載された指定期日（月末締め翌月末払い等）
                </dd>
              </div>

              <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <dt className="font-bold text-slate-600">役務の提供時期</dt>
                <dd className="sm:col-span-2 text-slate-900">
                  アカウント登録およびプラン購入決済手続き完了後、即時（即日）ご利用いただけます。
                </dd>
              </div>

              <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <dt className="font-bold text-slate-600">返品・キャンセル・中途解約</dt>
                <dd className="sm:col-span-2 text-slate-900 space-y-1.5 leading-relaxed">
                  <p>
                    <strong>デジタル役務の性質上:</strong> ご購入手続き完了後のお客様都合による返品・返金・キャンセルはお受けいたしかねます。
                  </p>
                  <p>
                    <strong>月額プランの解約:</strong> 次回更新日の前日までに管理画面（各種設定）より解約手続きを行うことで、次回以降の自動更新・請求を停止することができます。
                  </p>
                </dd>
              </div>

              <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <dt className="font-bold text-slate-600">動作環境</dt>
                <dd className="sm:col-span-2 text-slate-900 leading-relaxed">
                  最新版のGoogle Chrome, Apple Safari, Microsoft Edge, Mozilla Firefox（iOS, Android, macOS, Windowsの主要ブラウザに対応）
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* 関連リンク */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 pt-2 pb-6">
          <Link href="/terms" className="hover:text-slate-900 underline">
            利用規約
          </Link>
          <span>•</span>
          <Link href="/privacy" className="hover:text-slate-900 underline">
            プライバシーポリシー
          </Link>
          <span>•</span>
          <Link href="/contact" className="hover:text-slate-900 underline">
            お問い合わせ・サポート
          </Link>
        </div>
      </div>
    </div>
  );
}
