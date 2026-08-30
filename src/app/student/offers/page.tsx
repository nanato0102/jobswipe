"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RoleGuard from "@/components/RoleGuard";
import StudentMobileTabs from "@/components/StudentMobileTabs";
import { appStore, StoredOffer } from "@/lib/appStore";
import { useToast } from "@/context/ToastContext";
import {
  Building2,
  MessageSquare,
  Check,
  X,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Film,
} from "lucide-react";

export default function StudentOffersPage() {
  const [offers, setOffers] = useState<StoredOffer[]>([]);
  const [acceptedModalOffer, setAcceptedModalOffer] = useState<StoredOffer | null>(null);
  const { success, info } = useToast();
  const router = useRouter();

  useEffect(() => {
    setOffers(appStore.getOffers());
  }, []);

  const handleStatusChange = (id: string, newStatus: "ACCEPTED" | "DECLINED") => {
    const updated = appStore.updateOfferStatus(id, newStatus);
    setOffers(updated);

    const targetOffer = updated.find((o) => o.id === id);

    if (newStatus === "ACCEPTED" && targetOffer) {
      success("オファーを承諾しました！", `${targetOffer.companyName} とのチャットを開始できます。`);
      setAcceptedModalOffer(targetOffer);
    } else if (newStatus === "DECLINED") {
      info("オファーを辞退しました。");
    }
  };

  return (
    <RoleGuard allowedRoles={["STUDENT", "ADMIN"]}>
      <StudentMobileTabs>
        <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6 w-full">
          {/* ================= 統一ページヘッダー ================= */}
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>受信オファー</span>
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              オファー一覧
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              あなたの自己PR動画に関心を持った企業からのオファーです。承諾するとチャット面談へ進めます。
            </p>
          </div>

          {/* ================= オファーリスト / 空状態 ================= */}
          {offers.length === 0 ? (
            <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 text-center text-slate-500 text-sm shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-slate-900 text-base">まだオファーは届いていません</p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  短尺自己PR動画を投稿すると、あなたの雰囲気や人柄を見た企業の採用担当者から直接スカウト・オファーが届きます。
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/student/video"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                >
                  <Film className="w-4 h-4" />
                  <span>自己PR動画を投稿・管理する</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 flex flex-col gap-4 hover:border-slate-300 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {(() => {
                        const company = appStore.getCompanyDetails(offer.companyId);
                        if (company?.logoUrl) {
                          return (
                            <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200 bg-white flex items-center justify-center p-1 shadow-2xs flex-shrink-0">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={company.logoUrl} alt={offer.companyName} className="max-w-full max-h-full object-contain" />
                            </div>
                          );
                        }
                        return (
                          <div className="w-12 h-12 rounded-xl bg-slate-900 text-emerald-400 font-black text-sm flex items-center justify-center shadow-2xs flex-shrink-0">
                            <span>{offer.companyName.slice(0, 1) || "企"}</span>
                          </div>
                        );
                      })()}

                      <div className="space-y-0.5">
                        <Link
                          href={`/companies/${offer.companyId}`}
                          className="text-base font-bold text-slate-900 hover:text-emerald-800 hover:underline tracking-tight flex items-center gap-1.5 group"
                        >
                          <span>{offer.companyName}</span>
                          <span className="text-[11px] font-normal text-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity">
                            (企業情報 →)
                          </span>
                        </Link>
                        <span className="text-xs text-slate-500 block">{offer.industry}</span>
                      </div>
                    </div>

                    {/* ステータスバッジ（厳選された1つ） */}
                    <span
                      className={`text-[11px] px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5 shadow-2xs ${
                        offer.status === "ACCEPTED"
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : offer.status === "DECLINED"
                          ? "bg-slate-100 text-slate-500"
                          : "bg-amber-50 text-amber-800 border border-amber-200"
                      }`}
                    >
                      {offer.status === "ACCEPTED" && <Check className="w-3.5 h-3.5 text-emerald-700" />}
                      {offer.status === "DECLINED" && <X className="w-3.5 h-3.5" />}
                      {offer.status === "SENT" && <Clock className="w-3.5 h-3.5 text-amber-700" />}
                      <span>{offer.status === "ACCEPTED" ? "承諾済み" : offer.status === "DECLINED" ? "辞退" : "新着オファー"}</span>
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200 leading-relaxed whitespace-pre-wrap">
                    {offer.message}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 flex-wrap gap-2">
                    <span className="text-[11px] text-slate-400">受信日時: {offer.createdAt}</span>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/companies/${offer.companyId}`}
                        className="px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                      >
                        企業詳細
                      </Link>

                      {offer.status === "SENT" && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(offer.id, "DECLINED")}
                            className="px-3.5 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors cursor-pointer"
                          >
                            辞退
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(offer.id, "ACCEPTED")}
                            className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 rounded-xl shadow-2xs transition-colors cursor-pointer"
                          >
                            オファーを承諾する
                          </button>
                        </>
                      )}

                      {offer.status === "ACCEPTED" && (
                        <Link
                          href={`/company/chat?tab=${offer.id}`}
                          className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 rounded-xl shadow-2xs transition-all flex items-center gap-1.5"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>チャットで返信する</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 承諾お祝いモーダル */}
        {acceptedModalOffer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 text-center space-y-5 animate-scale-in">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border-2 border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900">オファーを承諾しました！</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <span className="font-bold text-slate-900">{acceptedModalOffer.companyName}</span>{" "}
                  とのチャット面談ルームが開設されました。挨拶メッセージを送信して面談日程を調整しましょう。
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setAcceptedModalOffer(null)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  後で確認する
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const id = acceptedModalOffer.id;
                    setAcceptedModalOffer(null);
                    router.push(`/company/chat?tab=${id}`);
                  }}
                  className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>チャットを開く</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </StudentMobileTabs>
    </RoleGuard>
  );
}
