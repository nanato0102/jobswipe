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
        <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6 w-full">
          {/* ================= 統一ページヘッダー ================= */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-blue-50 text-blue-900 border border-blue-200">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>利用状況・プラン</span>
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                オファー枠・プラン管理
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                今月のオファー枠消化状況、スワイプ実績、マッチング成果をリアルタイムに確認できます。
              </p>
            </div>

            <Link
              href="/contact"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>枠追加・プラン相談</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* ================= 4大KPIサマリー ================= */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* 残りオファー枠 */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                <Send className="w-3.5 h-3.5 text-blue-600" />
                <span>今月の残り枠</span>
              </span>
              <p className="text-2xl font-black text-slate-900">
                {stats.remainingQuota} <span className="text-xs font-normal text-slate-500">/ {stats.monthlyQuota}枠</span>
              </p>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: `${usagePercent}%` }} />
              </div>
            </div>

            {/* 気になる追加 */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                <span>気になる追加数</span>
              </span>
              <p className="text-2xl font-black text-slate-900">
                {stats.totalLikedCount} <span className="text-xs font-normal text-slate-500">名</span>
              </p>
              <p className="text-[10px] text-slate-400 pt-1">スワイプで保存した学生</p>
            </div>

            {/* マッチング承諾数 */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>マッチング成立数</span>
              </span>
              <p className="text-2xl font-black text-slate-900">
                {stats.acceptedOffersCount} <span className="text-xs font-normal text-slate-500">件</span>
              </p>
              <p className="text-[10px] text-emerald-700 font-bold pt-1">承諾率 60%</p>
            </div>

            {/* スワイプ閲覧数 */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>動画閲覧数</span>
              </span>
              <p className="text-2xl font-black text-slate-900">
                {stats.totalSwipedVideos} <span className="text-xs font-normal text-slate-500">本</span>
              </p>
              <p className="text-[10px] text-slate-400 pt-1">今月チェックした学生</p>
            </div>
          </div>

          {/* ================= ご契約プラン情報 ＆ プラン変更申し込みリンク ================= */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200">
                    契約中
                  </span>
                  <h2 className="text-sm sm:text-base font-bold text-slate-900">{stats.planName}</h2>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  月間オファー枠: <span className="font-bold text-slate-900">{stats.monthlyQuota}枠</span> / 次回更新日: <span className="font-bold text-slate-900">{stats.nextResetDate}</span>
                </p>
              </div>

              <Link
                href="/company/plans"
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 whitespace-nowrap self-start sm:self-auto cursor-pointer"
              >
                <span>プラン変更・オファー増枠の申し込み</span>
                <ArrowRight className="w-4 h-4 text-blue-400" />
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
              <p>プランのアップグレードやスポットでの追加増枠（+20枠〜）は専用ページよりお申し込みいただけます。</p>
              <Link
                href="/tokusho"
                target="_blank"
                className="text-[11px] font-bold text-slate-400 hover:text-slate-700 hover:underline inline-flex items-center gap-1 whitespace-nowrap"
              >
                <span>特定商取引法に基づく表記 ↗</span>
              </Link>
            </div>
          </div>

          {/* ================= 直近のオファー送信履歴 ================= */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Send className="w-4 h-4 text-slate-700" />
                <span>直近のオファー送信履歴 ({offers.length}件)</span>
              </h2>
              <Link
                href="/company/chat"
                className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
              >
                <span>チャット一覧へ →</span>
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/students/${offer.studentId}`}
                        className="font-bold text-slate-900 hover:text-blue-700 hover:underline"
                      >
                        {offer.studentName} さん
                      </Link>
                      <span
                        className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                          offer.status === "ACCEPTED"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : offer.status === "DECLINED"
                            ? "bg-slate-100 text-slate-500"
                            : "bg-amber-50 text-amber-800 border border-amber-200"
                        }`}
                      >
                        {offer.status === "ACCEPTED" ? "承諾済み" : offer.status === "DECLINED" ? "辞退" : "返答待ち"}
                      </span>
                    </div>
                    <p className="text-slate-600 line-clamp-1">「{offer.message}」</p>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto flex-shrink-0">
                    <span className="text-[11px] text-slate-400">{offer.createdAt}</span>
                    {offer.status === "ACCEPTED" && (
                      <Link
                        href={`/company/chat?tab=${offer.id}`}
                        className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors"
                      >
                        チャット
                      </Link>
                    )}
                  </div>
                </div>
              ))}

              {offers.length === 0 && (
                <p className="py-6 text-center text-xs text-slate-400">オファー送信履歴はありません</p>
              )}
            </div>
          </div>
        </div>
      </CompanyMobileTabs>
    </RoleGuard>
  );
}
