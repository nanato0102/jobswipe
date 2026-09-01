"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import RoleGuard from "@/components/RoleGuard";
import CompanyMobileTabs from "@/components/CompanyMobileTabs";
import { appStore } from "@/lib/appStore";
import { useToast } from "@/context/ToastContext";
import {
  Search,
  User,
  GraduationCap,
  Sparkles,
  Heart,
  Send,
  Film,
  CheckCircle2,
  Filter,
  X,
  Building2,
} from "lucide-react";

interface SearchStudentItem {
  id: string;
  fullName: string;
  university: string;
  graduationYear: number;
  bio: string;
  skills: string;
  experience: string;
  tags: string[];
  gender: "MALE" | "FEMALE";
  hasVideo: boolean;
}

export default function StudentSearchPage() {
  const { success, info } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGradYear, setSelectedGradYear] = useState<string>("ALL");
  const [selectedTag, setSelectedTag] = useState<string>("ALL");

  // オファー送信モーダル
  const [targetStudent, setTargetStudent] = useState<SearchStudentItem | null>(null);
  const [offerMessage, setOfferMessage] = useState("");
  const [likedIds, setLikedIds] = useState<string[]>([]);

  // サンプル学生データリスト
  const students: SearchStudentItem[] = useMemo(() => {
    return [
      {
        id: "s1",
        fullName: "佐藤 健太",
        university: "早稲田大学 商学部",
        graduationYear: 2027,
        bio: "体育会サッカー部主将。目標達成に向けたチーム推進力と粘り強さが強みです。成長環境のあるITベンチャーや商社での営業・企画職を志望しています。",
        skills: "リーダーシップ, 目標達成志向, 営業推進力, TOEIC 780",
        experience: "大学サッカー部 主将（部員80名を統率）、Web系スタートアップでの営業インターン（月間新規獲得数1位）",
        tags: ["リーダーシップ", "体育会", "チーム推進力", "営業志望"],
        gender: "MALE",
        hasVideo: true,
      },
      {
        id: "s2",
        fullName: "伊藤 美咲",
        university: "青山学院大学 国際政治経済学部",
        graduationYear: 2026,
        bio: "カナダへの1年間交換留学を経験。SNSマーケティングとクリエイティブ制作が得意で、Instagramアカウントの運用で半年で2万フォロワーを達成しました。",
        skills: "英語（ビジネスレベル）, SNSマーケティング, Figma, 動画編集",
        experience: "アパレルブランドでのSNS運用インターン、学生団体代表",
        tags: ["英語力", "マーケティング", "留学経験", "企画・クリエイティブ"],
        gender: "FEMALE",
        hasVideo: true,
      },
      {
        id: "s3",
        fullName: "高橋 蓮",
        university: "慶應義塾大学 理工学部",
        graduationYear: 2027,
        bio: "大学で機械学習・データ解析を専攻。自作のWebサービスを2本リリースした経験があり、プロダクトマネージャーやエンジニアリングを志望しています。",
        skills: "Python, TypeScript, Next.js, データ分析, SQL",
        experience: "AIベンチャーでの長期インターン、ハッカソン最優秀賞受賞",
        tags: ["理系・IT", "プログラミング", "データ分析", "プロダクト開発"],
        gender: "MALE",
        hasVideo: true,
      },
      {
        id: "s4",
        fullName: "山本 葵",
        university: "上智大学 総合人間科学部",
        graduationYear: 2026,
        bio: "人と深く向き合う対話力と共感力に自信があります。ブライダル・ホテルでの接客アルバイトで優秀スタッフ賞を受賞しました。",
        skills: "接客・ホスピタリティ, コミュニケーション, 課題解決力",
        experience: "高級ホテルでの接客・コンシェルジュアルバイト、ボランティア活動",
        tags: ["ホスピタリティ", "対話力", "接客経験", "人事・総務志望"],
        gender: "FEMALE",
        hasVideo: true,
      },
    ];
  }, []);

  const allTags = ["ALL", "リーダーシップ", "英語力", "マーケティング", "理系・IT", "ホスピタリティ", "体育会"];

  const filteredStudents = useMemo(() => {
    return students.filter((s: SearchStudentItem) => {
      // キーワード検索
      const matchQuery =
        !searchQuery.trim() ||
        s.fullName.includes(searchQuery) ||
        s.university.includes(searchQuery) ||
        s.bio.includes(searchQuery) ||
        s.skills.includes(searchQuery) ||
        s.tags.some((t: string) => t.includes(searchQuery));

      // 卒業年度フィルター
      const matchYear =
        selectedGradYear === "ALL" || s.graduationYear.toString() === selectedGradYear;

      // タグフィルター
      const matchTag = selectedTag === "ALL" || s.tags.includes(selectedTag);

      return matchQuery && matchYear && matchTag;
    });
  }, [students, searchQuery, selectedGradYear, selectedTag]);

  const handleToggleLike = (studentId: string, name: string) => {
    if (likedIds.includes(studentId)) {
      setLikedIds(likedIds.filter((id) => id !== studentId));
      info("気になるを解除しました");
    } else {
      setLikedIds([...likedIds, studentId]);
      success("気になるに追加しました", `${name}さんを気になるリストに保存しました。`);
    }
  };

  const handleSendOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetStudent || !offerMessage.trim()) return;

    appStore.sendOffer({
      companyId: "c1",
      companyName: "株式会社サイバーグロース",
      industry: "IT・Webサービス / SaaS",
      studentId: targetStudent.id,
      studentName: targetStudent.fullName,
      message: offerMessage,
    });

    success("オファーを送信しました！", `${targetStudent.fullName}さんにスカウトメッセージを送りました。`);
    setTargetStudent(null);
    setOfferMessage("");
  };

  return (
    <RoleGuard allowedRoles={["COMPANY", "ADMIN"]}>
      <CompanyMobileTabs>
        <div className="max-w-5xl mx-auto px-4 py-4 sm:py-6 w-full space-y-6">
          {/* ヘッダー */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                <Search className="w-5 h-5 text-slate-700" />
                <span>学生検索・スカウト</span>
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                自己PR動画を投稿している候補者を絞り込み、直接オファーを送ることができます。
              </p>
            </div>
            <span className="text-xs text-slate-500 font-bold bg-slate-100 px-3 py-1.5 rounded-xl self-start sm:self-auto">
              該当: {filteredStudents.length}名
            </span>
          </div>

          {/* 検索バー ＆ フィルター */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 space-y-3.5">
            {/* 検索インプット */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="学生名、大学名、スキル、志望職種で検索..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
              />
            </div>

            {/* 卒業年度チップ */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 font-bold text-[11px] mr-1">卒業年度:</span>
              {[
                { label: "すべて", val: "ALL" },
                { label: "26卒", val: "2026" },
                { label: "27卒", val: "2027" },
                { label: "28卒以降", val: "2028" },
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => setSelectedGradYear(item.val)}
                  className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer text-xs ${
                    selectedGradYear === item.val
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* タグチップ */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs pt-1 border-t border-slate-100">
              <span className="text-slate-400 font-bold text-[11px] mr-1">注目タグ:</span>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer text-[11px] ${
                    selectedTag === tag
                      ? "bg-blue-600 text-white"
                      : "bg-blue-50 text-blue-800 hover:bg-blue-100"
                  }`}
                >
                  {tag === "ALL" ? "全タグ" : `#${tag}`}
                </button>
              ))}
            </div>
          </div>

          {/* 学生カード一覧 */}
          <div className="grid sm:grid-cols-2 gap-4">
            {filteredStudents.map((student: SearchStudentItem) => {
              const isLiked = likedIds.includes(student.id);
              const isFemale = student.gender === "FEMALE";

              return (
                <div
                  key={student.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4 flex flex-col justify-between hover:border-slate-300 transition-all"
                >
                  <div className="space-y-3">
                    {/* 上部: アバター ＆ 基本情報 */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-2xs font-bold text-base flex-shrink-0 ${
                            isFemale ? "bg-rose-500" : "bg-blue-600"
                          }`}
                        >
                          <User className="w-6 h-6 stroke-[2.2]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-bold text-slate-900 text-sm">{student.fullName}</h3>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                              {student.graduationYear}卒
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                            <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                            <span>{student.university}</span>
                          </p>
                        </div>
                      </div>

                      {/* 動画ありバッジ */}
                      {student.hasVideo && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-900 text-emerald-400 text-[10px] font-bold">
                          <Film className="w-3 h-3" />
                          <span>動画あり</span>
                        </span>
                      )}
                    </div>

                    {/* 自己PR抜粋 */}
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {student.bio}
                    </p>

                    {/* タグ */}
                    <div className="flex flex-wrap gap-1">
                      {student.tags.map((t: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-md"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* アクションボタン */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <Link
                      href={`/students/${student.id}`}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                    >
                      詳細を見る
                    </Link>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleToggleLike(student.id, student.fullName)}
                        className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                          isLiked
                            ? "bg-rose-50 border-rose-200 text-rose-600"
                            : "bg-white border-slate-200 text-slate-400 hover:text-rose-500 hover:bg-rose-50/50"
                        }`}
                        title={isLiked ? "気になる解除" : "気になるに追加"}
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? "fill-rose-500" : ""}`} />
                      </button>

                      <button
                        type="button"
                        onClick={() => setTargetStudent(student)}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>オファー</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredStudents.length === 0 && (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 space-y-2">
              <p className="text-sm font-bold text-slate-600">該当する学生が見つかりませんでした</p>
              <p className="text-xs">検索キーワードやフィルター条件を変更してお試しください。</p>
            </div>
          )}
        </div>

        {/* オファー送信モーダル */}
        {targetStudent && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 animate-scale-up">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <h3 className="text-base font-bold text-slate-900">
                    {targetStudent.fullName} さんへオファー送信
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setTargetStudent(null)}
                  className="text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
                <p className="font-bold text-slate-900">{targetStudent.university} ({targetStudent.graduationYear}卒)</p>
                <p className="text-slate-600">{targetStudent.bio}</p>
              </div>

              <form onSubmit={handleSendOffer} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    スカウトメッセージ・オファー内容
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={offerMessage}
                    onChange={(e) => setOfferMessage(e.target.value)}
                    placeholder="例: はじめまして！自己PR動画を拝見し、部活動での推進力に大変感銘を受けました。ぜひ一度オンラインでカジュアルにお話ししませんか？"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 leading-relaxed resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setTargetStudent(null)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    キャンセル
                  </button>
                  <button
                    type="submit"
                    disabled={!offerMessage.trim()}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 disabled:opacity-40"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>オファーを送信する</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </CompanyMobileTabs>
    </RoleGuard>
  );
}
