"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import RoleGuard from "@/components/RoleGuard";
import CompanyMobileTabs from "@/components/CompanyMobileTabs";
import { appStore, StoredLike } from "@/lib/appStore";
import { useAuth } from "@/context/AuthContext";
import { Heart, Send, User, GraduationCap, X, Sparkles, CheckCircle, MessageSquare } from "lucide-react";

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
        <div className="flex-1 py-6 px-4 sm:px-6 max-w-5xl mx-auto w-full">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                <span>気になる一覧</span>
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                動画スワイプで「気になる」に追加した学生の一覧です。いつでもオファーを送信できます（企業専用）。
              </p>
            </div>

          <Link
            href="/swipe"
            className="text-xs font-semibold px-3.5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl shadow-sm transition-colors"
          >
            スワイプに戻る
          </Link>
        </div>

        {likes.length === 0 ? (
          <div className="bg-white p-12 rounded-xl border border-slate-200 text-center text-slate-500 text-sm shadow-sm space-y-3">
            <Sparkles className="w-10 h-10 text-slate-400 mx-auto" />
            <p className="font-bold text-slate-700">気になる学生はまだいません</p>
            <p className="text-xs text-slate-400">動画スワイプ画面で「❤️ 気になる」を押すとここにストックされます。</p>
            <Link
              href="/swipe"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm"
            >
              スワイプへ行く
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {likes.map((student) => (
              <div
                key={student.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                        <User className="w-4 h-4 text-slate-500" />
                        <span>{student.studentName}</span>
                      </h3>
                      <p className="text-xs text-slate-500">{student.university}</p>
                    </div>
                    <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-medium">
                      <GraduationCap className="w-3 h-3" />
                      {student.graduationYear}年卒
                    </span>
                  </div>

                  <div className="mb-3">
                    <span className="text-xs font-semibold text-slate-700 block mb-1">
                      動画: {student.videoTitle}
                    </span>
                    <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed">
                      {student.bio || "自己PRサマリーが登録されています。"}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {student.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => setSelectedStudent(student)}
                    className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>オファーを送る</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* オファー送信モーダル */}
        {selectedStudent && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">
                  {selectedStudent.studentName} さんへのオファー送信
                </h3>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {sentSuccess ? (
                <div className="py-6 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-slate-900">オファーを送信しました！</h4>
                    <p className="text-xs text-slate-500">
                      学生マイページへ即時通知されました。学生がオファーを承諾するとチャット面談を開始できます。
                    </p>
                  </div>
                  <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                    <Link
                      href="/company/chat"
                      className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>チャット画面を確認する</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedStudent(null);
                        setSentSuccess(false);
                      }}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      続けて候補者を見る
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-xs text-slate-600 mb-3">
                    オファー理由や、面談のご案内メッセージを入力してください。
                  </p>

                  <textarea
                    value={offerText}
                    onChange={(e) => setOfferText(e.target.value)}
                    placeholder="例: 自己PR動画を拝見しました。ぜひ一度カジュアル面談でお話しさせてください！"
                    rows={4}
                    className="w-full text-sm border border-slate-300 rounded-lg p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />

                  <div className="mt-4 flex gap-2 justify-end">
                    <button
                      onClick={() => setSelectedStudent(null)}
                      className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
                    >
                      キャンセル
                    </button>
                    <button
                      onClick={handleSendOffer}
                      disabled={!offerText.trim()}
                      className="px-4 py-2 text-xs font-semibold bg-emerald-700 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 shadow-sm"
                    >
                      送信する
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        </div>
      </CompanyMobileTabs>
    </RoleGuard>
  );
}