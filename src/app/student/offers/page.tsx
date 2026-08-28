"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2, MessageSquare, Check, X, Clock } from "lucide-react";

interface OfferItem {
  id: string;
  companyName: string;
  industry: string;
  message: string;
  status: "SENT" | "ACCEPTED" | "DECLINED";
  date: string;
}

const SAMPLE_OFFERS: OfferItem[] = [
  {
    id: "off-1",
    companyName: "テックイノベーション株式会社",
    industry: "IT / Webサービス",
    message: "動画を拝見しました！チームでのリーダーシップと技術への熱意に大変共感いたしました。ぜひ一度カジュアル面談でお話しさせてください。",
    status: "SENT",
    date: "2026/08/28",
  },
  {
    id: "off-2",
    companyName: "グローバルコンサルティング合同会社",
    industry: "コンサルティング",
    message: "英語力と前向きな姿勢が弊社のグローバル案件推進にマッチすると感じました。特別選考ルートをご案内いたします。",
    status: "ACCEPTED",
    date: "2026/08/25",
  },
];

export default function StudentOffersPage() {
  const [offers, setOffers] = useState<OfferItem[]>(SAMPLE_OFFERS);

  const handleStatusChange = (id: string, newStatus: "ACCEPTED" | "DECLINED") => {
    setOffers((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <div className="flex-1 py-8 px-4 sm:px-6 max-w-4xl mx-auto w-full">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Building2 className="w-5 h-5" />
          <span>届いたオファー一覧</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          企業からあなたの自己PR動画を見て届いたスカウトオファーです
        </p>
      </div>

      <div className="space-y-4">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col gap-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">{offer.companyName}</h3>
                <span className="text-xs text-slate-500">{offer.industry}</span>
              </div>

              <span
                className={`text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1 ${
                  offer.status === "ACCEPTED"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : offer.status === "DECLINED"
                    ? "bg-slate-100 text-slate-500"
                    : "bg-amber-50 text-amber-700 border border-amber-200"
                }`}
              >
                {offer.status === "ACCEPTED" && <Check className="w-3.5 h-3.5" />}
                {offer.status === "DECLINED" && <X className="w-3.5 h-3.5" />}
                {offer.status === "SENT" && <Clock className="w-3.5 h-3.5" />}
                {offer.status === "ACCEPTED" ? "承諾済み" : offer.status === "DECLINED" ? "辞退" : "オファー受信"}
              </span>
            </div>

            <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
              {offer.message}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-xs text-slate-400">受信日: {offer.date}</span>

              <div className="flex items-center gap-2">
                {offer.status === "SENT" && (
                  <>
                    <button
                      onClick={() => handleStatusChange(offer.id, "DECLINED")}
                      className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg border border-slate-200"
                    >
                      辞退
                    </button>
                    <button
                      onClick={() => handleStatusChange(offer.id, "ACCEPTED")}
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
                    >
                      承諾する
                    </button>
                  </>
                )}

                {offer.status === "ACCEPTED" && (
                  <Link
                    href="/company/chat"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>チャットを開く</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
