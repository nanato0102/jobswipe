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
  CheckCircle2,
  Briefcase,
  MessageSquare,
  Sparkles,
  HeartHandshake,
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
      <div className="flex-1 py-6 sm:py-10 px-4 sm:px-6 max-w-4xl mx-auto w-full space-y-6">
        {/* 上部ナビゲーションバー */}
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>前の画面に戻る</span>
          </button>

          <div className="flex items-center gap-2">
            <Link
              href="/student/offers"
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold transition-colors"
            >
              オファー一覧
            </Link>
            <Link
              href={`/company/chat?threadId=${threadId}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>チャットを開く</span>
            </Link>
          </div>
        </div>

        {/* 企業ヘッダーカード */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-900 text-emerald-400 font-black text-2xl sm:text-3xl flex items-center justify-center shadow-md flex-shrink-0">
              {company.logoText}
            </div>

            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-800 text-[11px] font-bold border border-blue-200">
                <Building2 className="w-3.5 h-3.5" />
                <span>{company.industry}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {company.name}
              </h1>
              <p className="text-xs sm:text-sm font-bold text-emerald-800">
                {company.catchphrase}
              </p>
            </div>
          </div>

          {/* 会社概要クイック情報 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 text-xs">
            <div className="space-y-1">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>所在地</span>
              </span>
              <p className="font-bold text-slate-800 truncate">{company.location}</p>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-500" />
                <span>従業員規模</span>
              </span>
              <p className="font-bold text-slate-800">{company.employees}</p>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>設立</span>
              </span>
              <p className="font-bold text-slate-800">{company.established}</p>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span>Webサイト</span>
              </span>
              <a
                href={company.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-emerald-700 hover:underline flex items-center gap-0.5 truncate"
              >
                <span>公式HP</span>
                <ExternalLink className="w-3 h-3 flex-shrink-0" />
              </a>
            </div>
          </div>
        </div>

        {/* 事業内容 & 企業メッセージ */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Briefcase className="w-4 h-4 text-emerald-700" />
            <span>事業概要・ビジョン</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
            {company.description}
          </p>
        </div>

        {/* カルチャー & 求める人柄（2カラム） */}
        <div className="grid sm:grid-cols-2 gap-6">
          {/* カルチャー */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>カルチャー・働く環境</span>
            </h2>
            <ul className="space-y-2.5 text-xs text-slate-700">
              {company.culture.map((c, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 求める人物像 */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <HeartHandshake className="w-4 h-4 text-blue-700" />
              <span>歓迎する人柄・ポテンシャル</span>
            </h2>
            <ul className="space-y-2.5 text-xs text-slate-700">
              {company.seeking.map((s, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 募集ポジション・採用職種 */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
          <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Briefcase className="w-4 h-4 text-emerald-700" />
            <span>募集ポジション・オファー対象職種</span>
          </h2>

          <div className="space-y-4">
            {company.positions.map((pos, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 hover:border-emerald-300 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    {pos.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-[11px] font-bold">
                      {pos.type}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-200 text-slate-800 text-[11px] font-medium">
                      {pos.location}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {pos.description}
                </p>

                <p className="text-[11px] font-bold text-slate-700">
                  給与・待遇: <span className="text-emerald-800">{pos.salary}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 下部アクションCTA */}
        <div className="p-6 bg-slate-900 rounded-3xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base font-bold">この企業とチャット面談を進める</h3>
            <p className="text-xs text-slate-400">
              オファーメッセージの確認や日程調整はチャット画面から行えます
            </p>
          </div>

          <Link
            href={`/company/chat?threadId=${threadId}`}
            className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
          >
            <MessageSquare className="w-4 h-4" />
            <span>チャット画面を開く</span>
          </Link>
        </div>
      </div>
    </StudentMobileTabs>
  );
}
