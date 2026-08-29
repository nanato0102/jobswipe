"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import RoleGuard from "@/components/RoleGuard";
import StudentMobileTabs from "@/components/StudentMobileTabs";
import { appStore, StoredOffer } from "@/lib/appStore";
import { Building2, MessageSquare, Check, X, Clock, Sparkles } from "lucide-react";

export default function StudentOffersPage() {
  const [offers, setOffers] = useState<StoredOffer[]>([]);

  useEffect(() => {
    setOffers(appStore.getOffers());
  }, []);

  const handleStatusChange = (id: string, newStatus: "ACCEPTED" | "DECLINED") => {
    const updated = appStore.updateOfferStatus(id, newStatus);
    setOffers(updated);
  };

  return (
    <RoleGuard allowedRoles={["STUDENT", "ADMIN"]}>
      <StudentMobileTabs>
        <div className="flex-1 py-6 px-4 sm:px-6 max-w-4xl mx-auto w-full">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-700" />
            <span>オファー一覧</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            企業からあなたの自己PR動画を見て届いたオファーです（学生専用）
          </p>
        </div>

        {offers.length === 0 ? (
          <div className="bg-white p-12 rounded-xl border border-slate-200 text-center text-slate-500 text-sm shadow-xs space-y-2">
            <Sparkles className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="font-bold text-slate-700">まだオファーは届いていません</p>
            <p className="text-xs text-slate-400">自己PR動画を投稿すると、企業からオファーが届きます。</p>
          </div>
        ) : (
          <div className="space-y-4">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 sm:p-6 flex flex-col gap-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 tracking-tight">{offer.companyName}</h3>
                    <span className="text-xs text-slate-500">{offer.industry}</span>
                  </div>

                  <span
                    className={`text-[11px] px-2.5 py-0.5 rounded-md font-bold flex items-center gap-1 shadow-2xs ${
                      offer.status === "ACCEPTED"
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        : offer.status === "DECLINED"
                        ? "bg-slate-100 text-slate-500"
                        : "bg-amber-50 text-amber-800 border border-amber-200"
                    }`}
                  >
                    {offer.status === "ACCEPTED" && <Check className="w-3.5 h-3.5" />}
                    {offer.status === "DECLINED" && <X className="w-3.5 h-3.5" />}
                    {offer.status === "SENT" && <Clock className="w-3.5 h-3.5" />}
                    {offer.status === "ACCEPTED" ? "承諾済み" : offer.status === "DECLINED" ? "辞退" : "新着オファー"}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-3.5 rounded-lg border border-slate-200 leading-relaxed">
                  {offer.message}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <span className="text-[11px] text-slate-400">受信日時: {offer.createdAt}</span>

                  <div className="flex items-center gap-2">
                    {offer.status === "SENT" && (
                      <>
                        <button
                          onClick={() => handleStatusChange(offer.id, "DECLINED")}
                          className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-md border border-slate-200 transition-colors"
                        >
                          辞退
                        </button>
                        <button
                          onClick={() => handleStatusChange(offer.id, "ACCEPTED")}
                          className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 rounded-md shadow-2xs transition-colors"
                        >
                          承諾する
                        </button>
                      </>
                    )}

                    {offer.status === "ACCEPTED" && (
                      <Link
                        href={`/company/chat?threadId=thread-${offer.companyId}`}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 rounded-md shadow-2xs transition-colors"
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
        )}
        </div>
      </StudentMobileTabs>
    </RoleGuard>
  );
}