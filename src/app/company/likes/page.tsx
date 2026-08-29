"use client";

import { useState } from "react";
import Link from "next/link";
import RoleGuard from "@/components/RoleGuard";
import { Heart, Send, User, GraduationCap, X } from "lucide-react";

interface LikedStudent {
  id: string;
  name: string;
  university: string;
  graduationYear: number;
  bio: string;
  tags: string[];
  videoTitle: string;
}

const SAMPLE_LIKES: LikedStudent[] = [
  {
    id: "s1",
    name: "佐藤 健太",
    university: "早稲田大学 商学部",
    graduationYear: 2026,
    bio: "体育会サッカー部主将。組織づくりと目標達成に向けた推進力に自信があります。",
    tags: ["体育会", "リーダーシップ", "粘り強さ"],
    videoTitle: "体育会サッカー部主将 / チームを牽引する行動力",
  },
  {
    id: "s2",
    name: "高橋 美咲",
    university: "上智大学 外国語学部",
    graduationYear: 2026,
    bio: "カナダ留学経験者。TOEIC 920点。異文化コミュニケーションと明るい接客が得意です。",
    tags: ["留学経験", "英語対応可", "笑顔"],
    videoTitle: "1年間のカナダ留学と英語でのプレゼンテーション力",
  },
];

export default function CompanyLikesPage() {
  const [likes, setLikes] = useState<LikedStudent[]>(SAMPLE_LIKES);
  const [selectedStudent, setSelectedStudent] = useState<LikedStudent | null>(null);
  const [offerText, setOfferText] = useState("");
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSendOffer = () => {
    if (!offerText.trim()) return;
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setSelectedStudent(null);
      setOfferText("");
    }, 1500);
  };

  return (
    <RoleGuard allowedRoles={["COMPANY", "ADMIN"]}>
      <div className="flex-1 py-6 px-4 sm:px-6 max-w-4xl mx-auto w-full">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <span>「気になる」学生リスト</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              スワイプで気になるに追加した学生の一覧です。オファーを送信できます（企業専用）。
            </p>
          </div>

          <Link
            href="/swipe"
            className="text-xs font-semibold px-3.5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl shadow-sm transition-colors"
          >
            スワイプに戻る
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {likes.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                      <User className="w-4 h-4 text-slate-500" />
                      <span>{student.name}</span>
                    </h3>
                    <p className="text-xs text-slate-500">{student.university}</p>
                  </div>
                  <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-medium">
                    <GraduationCap className="w-3 h-3" />
                    {student.graduationYear}年卒
                  </span>
                </div>

                <div className="mb-3">
                  <span className="text-xs font-medium text-slate-700 block mb-1">
                    動画: {student.videoTitle}
                  </span>
                  <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                    {student.bio}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {student.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium"
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
                  <span>スカウトオファーを送る</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* オファー送信モーダル */}
        {selectedStudent && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">
                  {selectedStudent.name} さんへのオファー送信
                </h3>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {sentSuccess ? (
                <div className="py-8 text-center text-emerald-700 font-bold text-sm">
                  オファーを送信しました！
                </div>
              ) : (
                <>
                  <p className="text-xs text-slate-600 mb-3">
                    スカウト理由や、面談・選考のご案内メッセージを入力してください。
                  </p>

                  <textarea
                    value={offerText}
                    onChange={(e) => setOfferText(e.target.value)}
                    placeholder="例: 自己PR動画を拝見しました。ぜひ一度カジュアル面談でお話しさせてください！"
                    rows={4}
                    className="w-full text-sm border border-slate-300 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />

                  <div className="mt-4 flex gap-2 justify-end">
                    <button
                      onClick={() => setSelectedStudent(null)}
                      className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-xl"
                    >
                      キャンセル
                    </button>
                    <button
                      onClick={handleSendOffer}
                      disabled={!offerText.trim()}
                      className="px-4 py-2 text-xs font-semibold bg-emerald-700 text-white rounded-xl hover:bg-emerald-600 disabled:opacity-50 shadow-sm"
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
    </RoleGuard>
  );
}