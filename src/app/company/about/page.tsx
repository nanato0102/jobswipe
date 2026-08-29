"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Building2, CreditCard, ShieldCheck } from "lucide-react";

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

        {/* ページタイトルヘッダー */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
              <Image
                src="/logo.png"
                alt="JobSwipe Logo"
                width={36}
                height={36}
                className="object-contain"
                priority
              />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                会社概要 & 特定商取引法に基づく表記
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                JobSwipe 運営組織情報および公式法的表記
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 1. 運営会社概要（シンプルテーブル） */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50/50 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-slate-700" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              会社概要
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-left border-collapse">
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50">
                  <th className="py-3.5 px-5 sm:px-6 font-bold text-slate-600 w-1/3 sm:w-1/4 bg-slate-50/30">
                    サービス名
                  </th>
                  <td className="py-3.5 px-5 sm:px-6 font-bold text-slate-900">
                    JobSwipe (ジョブスワイプ)
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50">
                  <th className="py-3.5 px-5 sm:px-6 font-bold text-slate-600 bg-slate-50/30">
                    運営組織
                  </th>
                  <td className="py-3.5 px-5 sm:px-6 text-slate-900">
                    株式会社JobSwipe (JobSwipe Inc.) / JobSwipe 運営事務局
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50">
                  <th className="py-3.5 px-5 sm:px-6 font-bold text-slate-600 bg-slate-50/30">
                    代表責任者
                  </th>
                  <td className="py-3.5 px-5 sm:px-6 text-slate-900">
                    代表取締役 / プロジェクト代表
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50">
                  <th className="py-3.5 px-5 sm:px-6 font-bold text-slate-600 bg-slate-50/30">
                    所在地
                  </th>
                  <td className="py-3.5 px-5 sm:px-6 text-slate-900">
                    〒150-0002 東京都渋谷区渋谷2丁目
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50">
                  <th className="py-3.5 px-5 sm:px-6 font-bold text-slate-600 bg-slate-50/30">
                    設立 / 開設
                  </th>
                  <td className="py-3.5 px-5 sm:px-6 text-slate-900">
                    2026年3月
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50">
                  <th className="py-3.5 px-5 sm:px-6 font-bold text-slate-600 bg-slate-50/30 align-top">
                    事業内容
                  </th>
                  <td className="py-3.5 px-5 sm:px-6 text-slate-900 leading-relaxed space-y-1">
                    <p>・短尺自己PR動画を活用した新卒逆求人プラットフォーム「JobSwipe」の企画・開発・運営</p>
                    <p>・採用DXソリューションおよび企業向け人材マッチング支援事業</p>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50">
                  <th className="py-3.5 px-5 sm:px-6 font-bold text-slate-600 bg-slate-50/30">
                    連絡先窓口
                  </th>
                  <td className="py-3.5 px-5 sm:px-6 text-slate-900">
                    <Link href="/contact" className="text-emerald-800 font-bold hover:underline">
                      公式お問い合わせフォーム
                    </Link>
                    {" "}(support@jobswipe.jp)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. 特定商取引法に基づく表記（シンプルテーブル） */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50/50 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-slate-700" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              特定商取引法に基づく表記
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-left border-collapse">
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50">
                  <th className="py-3.5 px-5 sm:px-6 font-bold text-slate-600 w-1/3 sm:w-1/4 bg-slate-50/30">
                    販売事業者
                  </th>
                  <td className="py-3.5 px-5 sm:px-6 text-slate-900">
                    JobSwipe 運営事務局
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50">
                  <th className="py-3.5 px-5 sm:px-6 font-bold text-slate-600 bg-slate-50/30">
                    運営統括責任者
                  </th>
                  <td className="py-3.5 px-5 sm:px-6 text-slate-900">
                    代表責任者
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50">
                  <th className="py-3.5 px-5 sm:px-6 font-bold text-slate-600 bg-slate-50/30">
                    所在地
                  </th>
                  <td className="py-3.5 px-5 sm:px-6 text-slate-900">
                    〒150-0002 東京都渋谷区渋谷2丁目（請求があり次第、遅滞なく開示いたします）
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50">
                  <th className="py-3.5 px-5 sm:px-6 font-bold text-slate-600 bg-slate-50/30">
                    お問い合わせ先
                  </th>
                  <td className="py-3.5 px-5 sm:px-6 text-slate-900">
                    support@jobswipe.jp（または{" "}
                    <Link href="/contact" className="text-emerald-800 font-bold hover:underline">
                      お問い合わせフォーム
                    </Link>
                    {" "}よりご連絡ください）
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50">
                  <th className="py-3.5 px-5 sm:px-6 font-bold text-slate-600 bg-slate-50/30 align-top">
                    販売価格・利用料
                  </th>
                  <td className="py-3.5 px-5 sm:px-6 text-slate-900 leading-relaxed space-y-1">
                    <p><strong>学生ユーザー:</strong> 完全無料（登録・動画投稿・オファー受信・チャットすべて無料）</p>
                    <p><strong>企業ユーザー:</strong> 選択された月額プランおよびスカウト枠に応じた料金（管理画面・お申し込み画面に税込表示）</p>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50">
                  <th className="py-3.5 px-5 sm:px-6 font-bold text-slate-600 bg-slate-50/30">
                    商品代金以外の費用
                  </th>
                  <td className="py-3.5 px-5 sm:px-6 text-slate-900">
                    インターネット接続料金およびパケット通信料
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50">
                  <th className="py-3.5 px-5 sm:px-6 font-bold text-slate-600 bg-slate-50/30">
                    お支払い方法
                  </th>
                  <td className="py-3.5 px-5 sm:px-6 text-slate-900">
                    クレジットカード決済（Visa / Mastercard / JCB / American Express）、銀行振込（請求書払い）
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50">
                  <th className="py-3.5 px-5 sm:px-6 font-bold text-slate-600 bg-slate-50/30">
                    代金の支払時期
                  </th>
                  <td className="py-3.5 px-5 sm:px-6 text-slate-900">
                    クレジットカード：各カード会社の引き落とし日 / 銀行振込：請求書記載の支払期日
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50">
                  <th className="py-3.5 px-5 sm:px-6 font-bold text-slate-600 bg-slate-50/30">
                    役務の提供時期
                  </th>
                  <td className="py-3.5 px-5 sm:px-6 text-slate-900">
                    お申し込みおよび決済手続き完了後、即時（即日）ご利用可能
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50">
                  <th className="py-3.5 px-5 sm:px-6 font-bold text-slate-600 bg-slate-50/30 align-top">
                    キャンセル・解約特約
                  </th>
                  <td className="py-3.5 px-5 sm:px-6 text-slate-900 leading-relaxed space-y-1">
                    <p>・デジタル役務の特性上、決済完了後のお客様都合による返金・キャンセルはお受けいたしかねます。</p>
                    <p>・月額プランの解約は、管理画面（各種設定）より次回更新日前日までに手続きを行うことで、次回以降の請求を停止できます。</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 関連フッターリンク */}
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
