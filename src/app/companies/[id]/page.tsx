"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { appStore, CompanyDetail } from "@/lib/appStore";
import StudentMobileTabs from "@/components/StudentMobileTabs";
import {
  Building2,
  ArrowLeft,
  Globe,
  MapPin,
  Calendar,
  Users,
  MessageSquare,
  Sparkles,
  ExternalLink,
} from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export default function CompanyDetailPage({ params }: Props) {
  const resolvedParams = use(params);
  const router = useRouter();
  const companyId = resolvedParams.id;

  const [company, setCompany] = useState<CompanyDetail | null>(null);

  useEffect(() => {
    if (companyId) {
      setCompany(appStore.getCompanyDetails(companyId));
    }
  }, [companyId]);

  if (!company) {
    return (
      <div className="flex-1 flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div>
      </div>
    );
  }

  const threadId = `thread-${company.id}`;

  return (
    <StudentMobileTabs>
      <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6 space-y-5 w-full">
        {/* ナビゲーションバー */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>戻る</span>
          </button>
        </div>

        {/* ================= 企業ヘッダーカード ================= */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-7 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-4">
              {/* 四角ロゴ */}
              <div className="flex-shrink-0">
                {company.logoUrl ? (
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 shadow-2xs bg-white flex items-center justify-center p-1.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={company.logoUrl} alt={company.name} className="max-w-full max-h-full object-contain" />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 text-emerald-400 font-black text-xl flex items-center justify-center shadow-xs">
                    {company.name.slice(0, 1) || "企"}
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{company.name}</h1>
                <p className="text-xs sm:text-sm font-bold text-slate-600 flex items-center gap-2">
                  <span>{company.industry}</span>
                  {company.location && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <MapPin className="w-3.5 h-3.5" />
                        {company.location.split(" ")[0]}
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>

            <Link
              href={`/company/chat?threadId=${threadId}`}
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 whitespace-nowrap self-start sm:self-auto"
            >
              <MessageSquare className="w-4 h-4" />
              <span>チャットを開く</span>
            </Link>
          </div>

          {/* 会社概要クイックテーブル */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-slate-400">設立年</span>
              <p className="font-bold text-slate-900">{company.established || "2020年"}</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-slate-400">従業員数</span>
              <p className="font-bold text-slate-900">{company.employees || "100名"}</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-slate-400">所在地</span>
              <p className="font-bold text-slate-900 truncate">{company.location || "東京都"}</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-slate-400">公式Webサイト</span>
              {company.websiteUrl ? (
                <a
                  href={company.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-700 hover:underline flex items-center gap-1 truncate"
                >
                  <span>訪問する</span>
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                </a>
              ) : (
                <p className="font-bold text-slate-900">-</p>
              )}
            </div>
          </div>

          {/* 事業内容・ミッション */}
          {company.description && (
            <div className="space-y-2">
              <h2 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>事業内容・ミッション</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                {company.description}
              </p>
            </div>
          )}

          {/* 求める人物像 */}
          {company.seeking && company.seeking.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h2 className="text-xs font-bold text-slate-900">求める人物像・スタンス</h2>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {company.seeking.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* 企業カルチャー・働く環境 */}
          {company.culture && company.culture.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h2 className="text-xs font-bold text-slate-900">企業カルチャー・働く環境</h2>
              <div className="flex flex-wrap gap-1.5">
                {company.culture.map((b: string, i: number) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </StudentMobileTabs>
  );
}
