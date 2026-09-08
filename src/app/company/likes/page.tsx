"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import RoleGuard from "@/components/RoleGuard";
import CompanyMobileTabs from "@/components/CompanyMobileTabs";
import { appStore, StoredLike } from "@/lib/appStore";
import { useAuth } from "@/context/AuthContext";
import { Heart, Send, User, X, Sparkles, CheckCircle, ArrowRight, Lock } from "lucide-react";
import { getMaskedStudentName } from "@/components/SwipeCard";

export default function CompanyLikesPage() {
  const { session } = useAuth();
  const [likes, setLikes] = useState<StoredLike[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<StoredLike | null>(null);
  const [offerText, setOfferText] = useState("");
  const [sentSuccess, setSentSuccess] = useState(false);

  useEffect(() => {
    setLikes(appStore.getLikes());
  }, []);

  const handleSendOffer = () => {
    if (!offerText.trim() || !selectedStudent) return;

    appStore.sendOffer({
      companyId: session?.id || "c1",
      companyName: session?.name || "自社採用担当",
      industry: "IT / Webサービス",
      studentId: selectedStudent.studentId,
      studentName: selectedStudent.studentName,
      message: offerText.trim(),
    });

    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setSelectedStudent(null);
      setOfferText("");
    }, 1500);
  };

  return (
    <RoleGuard allowedRoles={["COMPANY", "ADMIN"]}>
      <CompanyMobileTabs>
        <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6 w-full">
          {/* ================= 統一ページヘッダー ================= */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-blue-50 text-blue-900 border border-blue-200">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>候補者プール</span>
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                気になる一覧
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                動画スワイプで保存した学生の一覧です。いつでも個別オファーを送信できます。
              </p>
            </div>

            <Link
              href="/swipe"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>動画スワイプへ行く</span>
            </Link>
          </div>

          {/* ================= 気になるリスト / 空状態 ================= */}
          {likes.length === 0 ? (
            <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 text-center text-slate-500 text-sm shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto border border-rose-200">
                <Heart className="w-6 h-6 fill-rose-500" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-slate-900 text-base">気になる学生はまだいません</p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  動画スワイプ画面で気になる学生に「いいね」をすると、ここに候補者としてストックされます。
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/swipe"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                >
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span>学生動画をスワイプする</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {likes.map((item) => {
                const student = appStore.getStudentDetails(item.studentId);
                const gender = student?.gender || "MALE";
                const avatarUrl = student?.avatarUrl;

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 flex flex-col gap-4 hover:border-slate-300 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3.5">
                        {/* 四角アバター（性別カラー対応） */}
                        <div className="flex-shrink-0">
                          {avatarUrl ? (
                            <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200 shadow-2xs bg-slate-100">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={avatarUrl} alt={item.studentName} className="w-full h-full object-cover" />
                            </div>
                          ) : (
                            <div
                              className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center shadow-2xs text-white border border-white/40 ${
                                gender === "FEMALE" ? "bg-rose-500" : "bg-blue-600"
                              }`}
                            >
                              <User className="w-6 h-6 stroke-[2.2]" />
                              <span className="text-[9px] font-bold mt-0.5 opacity-90">
                                {gender === "FEMALE" ? "女性" : "男性"}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="space-y-0.5">
                          <Link
                            href={`/students/${item.studentId}`}
                            className="text-base font-bold text-slate-900 hover:text-blue-700 hover:underline tracking-tight flex items-center gap-2 group"
                          >
                            <span>{getMaskedStudentName(item.studentName)}</span>
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-bold">
                              <Lock className="w-2.5 h-2.5 text-slate-500" />
                              <span>承諾後開示</span>
                            </span>
                            <span className="text-[11px] font-normal text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity">
                              (プロフィール →)
                            </span>
                          </Link>
                          <p className="text-xs text-slate-500">{item.university}</p>
                        </div>
                      </div>

                      <span className="text-[11px] px-2.5 py-1 rounded-lg font-bold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1 shadow-2xs">
                        <Heart className="w-3 h-3 fill-rose-500" />
                        <span>気になる追加済</span>
                      </span>
                    </div>

                    {/* 動画タイトル */}
                    <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 block">自己PR動画タイトル</span>
                      <p className="text-xs font-bold text-slate-800">
                        {item.videoTitle || "60秒自己PR動画"}
                      </p>
                    </div>

                    {/* ひとこと紹介 */}
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {item.bio}
                    </p>

                    {/* タグ & アクション */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags?.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-bold"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/students/${item.studentId}`}
                          className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                        >
                          詳細を見る
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedStudent(item);
                            setOfferText("");
                          }}
                          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5 text-blue-400" />
                          <span>オファーを送る</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ================= オファー送信モーダル ================= */}
        {selectedStudent && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-slate-200 animate-scale-up space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">
                    {getMaskedStudentName(selectedStudent.studentName)} へオファーを送信
                  </h3>
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-bold">
                    <Lock className="w-2.5 h-2.5" />
                    <span>承諾後本名開示</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedStudent(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {sentSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">オファーを送信しました！</h4>
                  <p className="text-xs text-slate-500">学生が承諾すると本名が開示され、チャット面談が開始されます。</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      メッセージ内容 <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={5}
                      value={offerText}
                      onChange={(e) => setOfferText(e.target.value)}
                      placeholder={`${getMaskedStudentName(selectedStudent.studentName)}の自己PR動画を拝見し、ぜひ一度カジュアルにお話ししたくオファーをお送りいたしました...`}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-700/20 focus:border-blue-700 leading-relaxed"
                    />
                  </div>

                  <div className="flex gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedStudent(null)}
                      className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      キャンセル
                    </button>
                    <button
                      type="button"
                      onClick={handleSendOffer}
                      disabled={!offerText.trim()}
                      className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-4 h-4 text-blue-400" />
                      <span>送信する</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </CompanyMobileTabs>
    </RoleGuard>
  );
}
