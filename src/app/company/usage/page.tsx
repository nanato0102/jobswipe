"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import RoleGuard from "@/components/RoleGuard";
import CompanyMobileTabs from "@/components/CompanyMobileTabs";
import { appStore, StoredOffer, CompanyUsageStats } from "@/lib/appStore";
import {
  BarChart3,
  Send,
  Sparkles,
  Heart,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  Calendar,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";

export default function CompanyUsagePage() {
  const [stats, setStats] = useState<CompanyUsageStats | null>(null);
  const [offers, setOffers] = useState<StoredOffer[]>([]);

  useEffect(() => {
    setStats(appStore.getCompanyStats());
    setOffers(appStore.getOffers());
  }, []);

  if (!stats) {
    return null;
  }

  const usagePercent = Math.min(
    100,
    Math.round((stats.sentOffersCount / stats.monthlyQuota) * 100)
  );

  return (
    <RoleGuard allowedRoles={["COMPANY", "ADMIN"]}>
      <CompanyMobileTabs>
        <div className="flex-1 py-6 sm:py-10 px-4 sm:px-6 max-w-6xl mx-auto w-full space-y-6 sm:space-y-8">
          {/* ================= ヘッダーセクション ================= */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-800 text-[11px] font-bold border border-blue-200 mb-1.5">
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>オファー枠・利用実績</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  利用状況・オファー枠管理
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  今月のオファー枠消化状況、動画スワイプ実績、マッチング成果をリアルタイムに確認できます
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/contact"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow-xs whitespace-nowrap"
                >
                  <span>オファー枠の追加相談</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* ================= 主要KPIカード 4連 ================= */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* 1. 残りオファー枠 */}
            <div className="bg-slate-900 border border-slate-800 text-white rounded-xl p-5 shadow-xs space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">残りオファー枠</span>
                <Send className="w-4 h-4 text-blue-400" />
              </div>
              <div className="flex items-baseline gap-1.5 pt-1">
                <span className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  {stats.remainingQuota}
                </span>
                <span className="text-xs text-slate-300 font-medium">/ {stats.monthlyQuota}枠</span>
              </div>
              <p className="text-[11px] text-slate-400">今月あと {stats.remainingQuota} 名に送信可能</p>
            </div>

            {/* 2. 送信済みオファー */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">今月送信済み</span>
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex items-baseline gap-1.5 pt-1">
                <span className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                  {stats.sentOffersCount}
                </span>
                <span className="text-xs text-slate-400 font-medium">枠 ({usagePercent}%)</span>
              </div>
              <p className="text-[11px] text-slate-400">契約枠の {usagePercent}% を消化中</p>
            </div>

            {/* 3. スワイプ閲覧数 */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">スワイプ閲覧数</span>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
              <div className="flex items-baseline gap-1.5 pt-1">
                <span className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                  {stats.totalSwipedVideos}
                </span>
                <span className="text-xs text-slate-400 font-medium">本</span>
              </div>
              <p className="text-[11px] text-slate-400">気になる追加: {stats.totalLikedCount}名</p>
            </div>

            {/* 4. オファー承諾率 */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">オファー承諾率</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex items-baseline gap-1.5 pt-1">
                <span className="text-3xl sm:text-4xl font-bold tracking-tight text-emerald-700">
                  {stats.acceptanceRate}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {stats.acceptedOffersCount}名とマッチング成立中
              </p>
            </div>
          </div>

          {/* ================= オファー枠消化状況 ＆ プラン詳細 ================= */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-700" />
                <h2 className="text-base font-bold text-slate-900">契約プラン ＆ 枠リセット日程</h2>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 bg-blue-50 text-blue-800 rounded-md border border-blue-200">
                {stats.planName}
              </span>
            </div>

            {/* プログレスバー */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-700">
                  オファー枠消化状況: {stats.sentOffersCount} / {stats.monthlyQuota} 枠
                </span>
                <span className="text-blue-700">{usagePercent}% 消化</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-md overflow-hidden p-0.5">
                <div
                  className="h-full bg-blue-600 rounded-sm transition-all duration-500"
                  style={{ width: `${usagePercent}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>次回枠リセット予定日: {stats.nextResetDate}</span>
                </span>
                <span>残り枠数: {stats.remainingQuota}枠</span>
              </div>
            </div>

            {/* 枠追加・プラン変更のアクションカード */}
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 text-xs">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 text-slate-800 font-bold text-xs sm:text-sm">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>オファー枠のスポット追加 ＆ プラン変更</span>
                </div>
                <span className="text-[11px] text-slate-500">※即時アカウントに反映されます</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* 10枠追加 */}
                <button
                  type="button"
                  onClick={() => {
                    appStore.addOfferQuota(10);
                    setStats(appStore.getCompanyStats());
                    alert("オファー枠を +10枠 追加しました！（現在の残り枠: " + (stats.remainingQuota + 10) + "枠）");
                  }}
                  className="p-3.5 bg-white border border-slate-200 hover:border-emerald-500 rounded-xl text-left space-y-1.5 transition-all shadow-2xs hover:shadow-xs cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 group-hover:text-emerald-700">+10枠 スポット追加</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">即時反映</span>
                  </div>
                  <p className="text-[11px] text-slate-500">急ぎでスカウトを送りたい企業様向け</p>
                  <p className="text-xs font-bold text-emerald-800 pt-1">¥5,000 / 回</p>
                </button>

                {/* 30枠追加 */}
                <button
                  type="button"
                  onClick={() => {
                    appStore.addOfferQuota(30);
                    setStats(appStore.getCompanyStats());
                    alert("オファー枠を +30枠 追加しました！（現在の残り枠: " + (stats.remainingQuota + 30) + "枠）");
                  }}
                  className="p-3.5 bg-white border border-slate-200 hover:border-emerald-500 rounded-xl text-left space-y-1.5 transition-all shadow-2xs hover:shadow-xs cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 group-hover:text-emerald-700">+30枠 まとめ追加</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-800 font-bold border border-blue-200">お得</span>
                  </div>
                  <p className="text-[11px] text-slate-500">積極採用シーズンの集中アプローチ用</p>
                  <p className="text-xs font-bold text-blue-800 pt-1">¥12,000 / 回</p>
                </button>

                {/* プレミアムプラン変更 */}
                <button
                  type="button"
                  onClick={() => {
                    appStore.changeCompanyPlan("プレミアムプラン (月150枠)", 150);
                    setStats(appStore.getCompanyStats());
                    alert("プレミアムプラン（月150枠）にアップグレードしました！");
                  }}
                  className="p-3.5 bg-slate-900 border border-slate-800 text-white rounded-xl text-left space-y-1.5 transition-all shadow-xs hover:bg-slate-800 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">プレミアムプラン変更</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-700 text-white font-bold">月150枠</span>
                  </div>
                  <p className="text-[11px] text-slate-300">専任サポート・特別ルート開放</p>
                  <p className="text-xs font-bold text-emerald-400 pt-1">月額 ¥49,800</p>
                </button>
              </div>
            </div>
          </div>

          {/* ================= 直近のオファー送信履歴 ================= */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Send className="w-4 h-4 text-slate-700" />
                <span>直近のオファー送信履歴</span>
              </h2>
              <Link
                href="/company/chat"
                className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1"
              >
                <span>チャット一覧へ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100 overflow-x-auto">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className="py-3.5 flex items-center justify-between gap-4 text-xs hover:bg-slate-50/50 px-2 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs flex-shrink-0">
                      {offer.studentName.slice(0, 1)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 truncate">{offer.studentName} さん</p>
                      <p className="text-[11px] text-slate-400 truncate">{offer.message}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-[11px] text-slate-400 hidden sm:inline">
                      {offer.createdAt}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        offer.status === "ACCEPTED"
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : offer.status === "DECLINED"
                          ? "bg-slate-100 text-slate-500"
                          : "bg-amber-50 text-amber-800 border border-amber-200"
                      }`}
                    >
                      {offer.status === "ACCEPTED"
                        ? "承諾済み"
                        : offer.status === "DECLINED"
                        ? "辞退"
                        : "返答待ち"}
                    </span>

                    {offer.status === "ACCEPTED" && (
                      <Link
                        href="/company/chat"
                        className="p-1.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                        title="チャットを開く"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CompanyMobileTabs>
    </RoleGuard>
  );
}
