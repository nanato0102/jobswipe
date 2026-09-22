"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RoleGuard from "@/components/RoleGuard";
import StudentMobileTabs from "@/components/StudentMobileTabs";
import { appStore, StoredOffer } from "@/lib/appStore";
import { useToast } from "@/context/ToastContext";
import {
  MessageSquare,
  Check,
  X,
  Clock,
  Sparkles,
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

    const handleSync = () => {
      setOffers(appStore.getOffers());
    };

    window.addEventListener("jobswipe_sync", handleSync);
    window.addEventListener("storage", handleSync);

    return () => {
      window.removeEventListener("jobswipe_sync", handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, []);

  const handleStatusChange = (id: string, newStatus: "ACCEPTED" | "DECLINED") => {
    const updated = appStore.updateOfferStatus(id, newStatus);
    setOffers(updated);

    const targetOffer = updated.find((o) => o.id === id);

    // バックエンドDBおよびメール通知への非同期同期
    fetch("/api/offers", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        offerId: id,
        status: newStatus,
      }),
    }).catch((err) => console.warn("API offer status patch error:", err));

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
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>受信オファー</span>
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              オファー一覧
            </h1>
            <p className="text-sm text-slate-500">
              あなたの自己PR動画に関心を持った企業からのオファーです。承諾するとチャット面談へ進めます。
            </p>
          </div>

          {/* ================= オファーリスト / 空状態 ================= */}
          {offers.length === 0 ? (
            <div className="bg-white p-8 sm:p-12 rounded-xl border border-slate-200/90 text-center text-slate-500 text-sm shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-slate-900 text-base">まだオファーは届いていません</p>
                <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                  短尺自己PR動画を投稿すると、あなたの雰囲気や人柄を見た企業の採用担当者から直接スカウト・オファーが届きます。
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/student/video"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-md text-sm font-semibold transition-all shadow-xs"
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
                  className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 sm:p-6 flex flex-col gap-4 hover:border-slate-300 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {(() => {
                        const company = appStore.getCompanyDetails(offer.companyId);
                        if (company?.logoUrl) {
                          return (
                            <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-200 bg-white flex items-center justify-center p-1 shadow-2xs flex-shrink-0">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={company.logoUrl} alt={offer.companyName} className="max-w-full max-h-full object-contain" />
                            </div>
                          );
                        }
                        return (
                          <div className="w-12 h-12 rounded-lg bg-slate-900 text-emerald-400 font-bold text-sm flex items-center justify-center shadow-2xs flex-shrink-0">
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
                          <span className="text-xs font-normal text-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity">
                            (企業情報 →)
                          </span>
                        </Link>
                        <span className="text-xs sm:text-sm text-slate-500 block">{offer.industry}</span>
                      </div>
                    </div>

                    {/* ステータスバッジ */}
                    <span
                      className={`text-xs px-2.5 py-1 rounded-md font-semibold flex items-center gap-1.5 shadow-2xs ${
                        offer.status === "ACCEPTED"
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : offer.status === "DECLINED"
                          ? "bg-slate-100 text-slate-500 border border-slate-200"
                          : "bg-amber-50 text-amber-800 border border-amber-200"
                      }`}
                    >
                      {offer.status === "ACCEPTED" && <Check className="w-3.5 h-3.5 text-emerald-700" />}
                      {offer.status === "DECLINED" && <X className="w-3.5 h-3.5" />}
                      {offer.status === "SENT" && <Clock className="w-3.5 h-3.5 text-amber-700" />}
                      <span>{offer.status === "ACCEPTED" ? "承諾済み" : offer.status === "DECLINED" ? "辞退" : "新着オファー"}</span>
                    </span>
                  </div>

                  <p className="text-sm text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-200 leading-relaxed whitespace-pre-wrap">
                    {offer.message}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 flex-wrap gap-2">
                    <span className="text-xs text-slate-400">受信日時: {offer.createdAt}</span>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/companies/${offer.companyId}`}
                        className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                      >
                        企業詳細
                      </Link>

                      {offer.status === "SENT" && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(offer.id, "DECLINED")}
                            className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-md border border-slate-200 transition-colors cursor-pointer"
                          >
                            辞退
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(offer.id, "ACCEPTED")}
                            className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-600 rounded-md shadow-2xs transition-colors cursor-pointer"
                          >
                            オファーを承諾する
                          </button>
                        </>
                      )}

                      {offer.status === "ACCEPTED" && (
                        <Link
                          href={`/student/chat?threadId=thread-${offer.companyId}`}
                          className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-600 rounded-md shadow-2xs transition-all flex items-center gap-1.5"
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
            <div className="bg-white rounded-xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 text-center space-y-5 animate-scale-in">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">オファーを承諾しました！</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  <span className="font-semibold text-slate-900">{acceptedModalOffer.companyName}</span>{" "}
                  とのチャット面談ルームが開設されました。挨拶メッセージを送信して面談日程を調整しましょう。
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setAcceptedModalOffer(null)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-sm font-semibold transition-colors cursor-pointer"
                >
                  後で確認する
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const compId = acceptedModalOffer.companyId;
                    setAcceptedModalOffer(null);
                    router.push(`/student/chat?threadId=thread-${compId}`);
                  }}
                  className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-md text-sm font-semibold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
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
