import React from "react";
import Link from "next/link";
import { ArrowLeft, Scale, ShieldCheck, Mail, Building, FileText, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "特定商取引法に基づく表記 | JobSwipe",
  description: "JobSwipe（ジョブスワイプ）の特定商取引法に基づく表記に関するページです。",
};

export default function TokushoPage() {
  const items = [
    {
      label: "サービス名",
      value: "JobSwipe（ジョブスワイプ）",
    },
    {
      label: "販売事業者名",
      value: "JobSwipe 運営事務局 / 株式会社JobSwipe（準備室）",
    },
    {
      label: "運営統括責任者",
      value: "代表取締役 / 運営責任者",
    },
    {
      label: "所在地",
      value: "〒150-0002 東京都渋谷区渋谷2丁目（※詳細な番地・建物名は請求があった場合に遅滞なく開示いたします）",
    },
    {
      label: "お問い合わせ窓口",
      value: (
        <div className="space-y-1">
          <p>
            メールアドレス:{" "}
            <a href="mailto:support@jobswipe.jp" className="text-emerald-700 font-bold hover:underline">
              support@jobswipe.jp
            </a>
          </p>
          <p>
            お問い合わせフォーム:{" "}
            <Link href="/contact" className="text-emerald-700 font-bold hover:underline">
              https://jobswipe.jp/contact
            </Link>
          </p>
          <p className="text-[11px] text-slate-500">※お電話によるお問い合わせ窓口は設置しておりません。フォームまたはメールにて承ります（営業時間: 平日 10:00〜18:00）。</p>
        </div>
      ),
    },
    {
      label: "販売価格（利用料金）",
      value: (
        <div className="space-y-2">
          <div>
            <p className="font-bold text-slate-900">【企業向け オファー枠追加パック】</p>
            <ul className="list-disc list-inside space-y-0.5 text-slate-700">
              <li>10枠パック: ¥5,000（税込 ¥5,500）</li>
              <li>30枠パック: ¥12,000（税込 ¥13,200）</li>
              <li>50枠パック: ¥18,000（税込 ¥19,800）</li>
            </ul>
          </div>
          <div className="pt-1">
            <p className="font-bold text-slate-900">【企業向け 定額プラン】</p>
            <ul className="list-disc list-inside space-y-0.5 text-slate-700">
              <li>スタンダードプラン: 月額 ¥19,800（税込 ¥21,780）</li>
              <li>エンタープライズプラン: 月額 ¥49,800（税込 ¥54,780）</li>
            </ul>
          </div>
          <p className="text-[11px] text-slate-500">※学生ユーザー（求職者）はすべての機能を完全無料でご利用いただけます。</p>
        </div>
      ),
    },
    {
      label: "商品代金以外の必要料金",
      value: "インターネット接続料金、通信料金等（お客様の通信環境に応じて発生します）",
    },
    {
      label: "お支払い方法",
      value: "クレジットカード決済（VISA, Mastercard, JCB, American Express, Diners Club）、銀行振込（請求書払い ※法人のみ）",
    },
    {
      label: "お支払い時期",
      value: (
        <div className="space-y-1">
          <p>・クレジットカード決済: 購入手続き完了時に即時決済されます。</p>
          <p>・月額定額プラン: 初回購入時に決済され、以降は翌月同日に自動更新・課金されます。</p>
          <p>・銀行振込: 請求書発行月末締め、翌月末払い。</p>
        </div>
      ),
    },
    {
      label: "役務の提供時期",
      value: "クレジットカード決済完了後、直ちにオファー枠の付与またはプラン機能をご利用いただけます。",
    },
    {
      label: "返品・キャンセル・解約特約",
      value: (
        <div className="space-y-1.5">
          <p>
            <strong>【デジタル役務の特性による返金不可】</strong><br />
            デジタルコンテンツおよびオファー送信権利の性質上、購入手続き完了後のお客様都合によるキャンセル・返金・換金には応じかねます。
          </p>
          <p>
            <strong>【月額プランの解約】</strong><br />
            月額プランはマイページのプラン設定画面よりいつでも解約手続きが可能です。次回更新日の前日までに解約手続きを完了した場合、次月以降の請求は発生いたしません（日割り計算による返金は行いません）。
          </p>
        </div>
      ),
    },
    {
      label: "動作推奨環境",
      value: (
        <div className="space-y-1">
          <p>・PC: Google Chrome, Apple Safari, Microsoft Edge（最新版）</p>
          <p>・スマートフォン: iOS Safari（iOS 15以降）, Android Google Chrome（最新版）</p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-6">
        {/* ナビゲーション */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>トップページに戻る</span>
          </Link>
          <span className="text-xs text-slate-400 font-medium">最終改定日: 2026年8月30日</span>
        </div>

        {/* ヘッダーカード */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Scale className="w-4 h-4 text-emerald-700" />
            <span>Legal Disclosure</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            特定商取引法に基づく表記
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            「特定商取引に関する法律」第11条（通信販売についての広告）に基づき、以下の通り販売条件および事業者の情報を表示いたします。
          </p>
        </div>

        {/* 法定表記テーブル */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs divide-y divide-slate-100">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="grid sm:grid-cols-12 p-4 sm:p-6 gap-2 sm:gap-6 hover:bg-slate-50/50 transition-colors"
            >
              <div className="sm:col-span-4 text-xs font-bold text-slate-900 flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{item.label}</span>
              </div>
              <div className="sm:col-span-8 text-xs text-slate-700 leading-relaxed">
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* フッターリンク */}
        <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
          <span>JobSwipe (ジョブスワイプ) 運営事務局</span>
          <div className="flex items-center gap-4 font-bold">
            <Link href="/terms" className="hover:text-emerald-800 hover:underline">
              利用規約
            </Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-emerald-800 hover:underline">
              プライバシーポリシー
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-emerald-800 hover:underline">
              お問い合わせ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
