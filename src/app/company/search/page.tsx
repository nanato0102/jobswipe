"use client";

import { useState, useMemo } from "react";
import RoleGuard from "@/components/RoleGuard";
import { appStore, StoredOffer, StoredLike } from "@/lib/appStore";
import {
  Search,
  Filter,
  GraduationCap,
  Sparkles,
  MapPin,
  Globe,
  Tag,
  Heart,
  Send,
  Play,
  X,
  CheckCircle,
  Video,
  User,
  Building2,
  Briefcase,
} from "lucide-react";

interface StudentCandidate {
  id: string;
  name: string;
  kana: string;
  university: string;
  faculty: string;
  grade: string;
  graduationYear: number;
  catchphrase: string;
  bio: string;
  tags: string[];
  locations: string[];
  englishLevel: string;
  videoUrl: string;
  videoTitle: string;
  desiredIndustries?: string[];
}

const CANDIDATES_DATA: StudentCandidate[] = [
  {
    id: "stu-1",
    name: "佐藤 健太",
    kana: "サトウ ケンタ",
    university: "早稲田大学",
    faculty: "商学部",
    grade: "大学3年生",
    graduationYear: 2027,
    catchphrase: "目標に向かって周囲を巻き込む推進力",
    bio: "体育会サッカー部で主将を務めています。困難な状況でもチーム全員で前進する組織づくりと目標達成に向けた推進力に自信があります。",
    tags: ["リーダーシップ", "体育会", "組織マネジメント", "粘り強さ"],
    locations: ["東京都", "神奈川県", "リモートワーク可"],
    englishLevel: "日常会話レベル",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    videoTitle: "体育会サッカー部主将としての挑戦と組織推進力",
  },
  {
    id: "stu-2",
    name: "高橋 美咲",
    kana: "タカハシ ミサキ",
    university: "上智大学",
    faculty: "外国語学部",
    grade: "大学3年生",
    graduationYear: 2027,
    catchphrase: "グローバルな環境で培った柔軟性と伝達力",
    bio: "カナダへ1年間の留学経験があり、現地でのプレゼンコンペで入賞。異なる文化や価値観を持つ人々と協働することが得意です。",
    tags: ["英語対応可", "留学経験", "プレゼンテーション", "笑顔"],
    locations: ["東京都", "大阪府", "リモートワーク可"],
    englishLevel: "ビジネス上級レベル",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    videoTitle: "1年間のカナダ留学と英語プレゼンテーション",
  },
  {
    id: "stu-3",
    name: "田中 翔平",
    kana: "タナカ ショウヘイ",
    university: "慶應義塾大学",
    faculty: "理工学部",
    grade: "大学2年生",
    graduationYear: 2028,
    catchphrase: "課題を自ら見つけ、プロダクトで解決する技術力",
    bio: "未経験から独学でWebサービスを開発し、月間1万PVを達成。最新技術の探求とものづくりへの情熱には誰にも負けません。",
    tags: ["エンジニア志望", "プログラミング", "個人開発", "Python", "React"],
    locations: ["東京都", "リモートワーク可"],
    englishLevel: "日常会話レベル",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    videoTitle: "個人開発したWebサービスのデモと今後の展望",
  },
  {
    id: "stu-4",
    name: "伊藤 桜",
    kana: "イトウ サクラ",
    university: "立教大学",
    faculty: "現代心理学部",
    grade: "大学3年生",
    graduationYear: 2027,
    catchphrase: "人の感情に寄り添い、場の安心感をつくる笑顔",
    bio: "カフェでのアルバイトリーダーとして新人20名のメンターを担当。接客満足度アンケートで店舗1位を獲得しました。",
    tags: ["笑顔", "コミュニケーション", "接客・育成", "傾聴力"],
    locations: ["東京都", "埼玉県", "千葉県"],
    englishLevel: "日常会話レベル",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
    videoTitle: "アルバイトリーダーとしての新人育成と接客へのこだわり",
  },
];

export default function CompanySearchPage() {
  const [keyword, setKeyword] = useState("");
  const [selectedGradYear, setSelectedGradYear] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedEnglish, setSelectedEnglish] = useState<string>("all");

  // モーダル用
  const [previewVideo, setPreviewVideo] = useState<{ url: string; title: string; studentName: string } | null>(null);
  const [offerTarget, setOfferTarget] = useState<StudentCandidate | null>(null);
  const [offerMessage, setOfferMessage] = useState("");
  const [offerSentSuccess, setOfferSentSuccess] = useState(false);

  // いいねステート
  const [likedStudents, setLikedStudents] = useState<string[]>([]);

  const handleLike = (candidate: StudentCandidate) => {
    appStore.addLike({
      studentId: candidate.id,
      studentName: candidate.name,
      university: candidate.university,
      graduationYear: candidate.graduationYear,
      bio: candidate.catchphrase,
      tags: candidate.tags,
      videoTitle: candidate.videoTitle,
      videoUrl: candidate.videoUrl,
    });
    setLikedStudents((prev) =>
      prev.includes(candidate.id) ? prev.filter((id) => id !== candidate.id) : [...prev, candidate.id]
    );
  };

  const handleSendOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerTarget || !offerMessage.trim()) return;

    appStore.sendOffer({
      companyId: "comp-current",
      companyName: "株式会社サイバー・イノベーション",
      industry: "IT / Webサービス",
      studentId: offerTarget.id,
      studentName: offerTarget.name,
      message: offerMessage.trim(),
    });

    setOfferSentSuccess(true);
    setTimeout(() => {
      setOfferSentSuccess(false);
      setOfferTarget(null);
      setOfferMessage("");
    }, 1500);
  };

  // フィルタリング処理
  const filteredCandidates = useMemo(() => {
    return CANDIDATES_DATA.filter((candidate) => {
      // キーワード検索
      if (keyword.trim()) {
        const q = keyword.toLowerCase();
        const matchName = candidate.name.toLowerCase().includes(q);
        const matchUni = candidate.university.toLowerCase().includes(q);
        const matchFaculty = candidate.faculty.toLowerCase().includes(q);
        const matchBio = candidate.bio.toLowerCase().includes(q);
        const matchTags = candidate.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchName && !matchUni && !matchFaculty && !matchBio && !matchTags) {
          return false;
        }
      }

      // 卒業年
      if (selectedGradYear !== "all" && candidate.graduationYear !== Number(selectedGradYear)) {
        return false;
      }

      // 特徴タグ
      if (selectedTag !== "all" && !candidate.tags.includes(selectedTag)) {
        return false;
      }

      // 希望勤務地
      if (selectedLocation !== "all" && !candidate.locations.includes(selectedLocation)) {
        return false;
      }

      // 英語力
      if (selectedEnglish !== "all" && candidate.englishLevel !== selectedEnglish) {
        return false;
      }

      return true;
    });
  }, [keyword, selectedGradYear, selectedTag, selectedLocation, selectedEnglish]);

  return (
    <RoleGuard allowedRoles={["COMPANY", "ADMIN"]}>
      <div className="flex-1 py-6 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-6">
        {/* タイトルヘッダー */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 text-blue-800 text-[11px] font-bold border border-blue-200 mb-1.5">
              <Search className="w-3.5 h-3.5" />
              <span>学生検索</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">学生絞り込み検索</h1>
            <p className="text-xs text-slate-500 mt-1">
              大学・学部、卒業年、特徴タグ、希望勤務地、英語力で自社の求める人材を直接探せます
            </p>
          </div>

          {/* 検索フィルターバー */}
          <div className="space-y-3 pt-2">
            {/* キーワード入力 */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="学生名、大学名、学部、キーワード（例: リーダーシップ、英語、Python）"
                className="w-full text-sm border border-slate-300 rounded-2xl pl-11 pr-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 shadow-sm"
              />
              {keyword && (
                <button
                  onClick={() => setKeyword("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* 条件セレクト群 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">卒業予定年</label>
                <select
                  value={selectedGradYear}
                  onChange={(e) => setSelectedGradYear(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-800 bg-white font-medium focus:outline-none focus:ring-1 focus:ring-slate-900"
                >
                  <option value="all">すべて</option>
                  <option value="2027">2027年卒</option>
                  <option value="2028">2028年卒</option>
                  <option value="2029">2029年卒</option>
                  <option value="2030">2030年卒</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">特徴タグ</label>
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-800 bg-white font-medium focus:outline-none focus:ring-1 focus:ring-slate-900"
                >
                  <option value="all">すべてのタグ</option>
                  <option value="リーダーシップ">リーダーシップ</option>
                  <option value="英語対応可">英語対応可</option>
                  <option value="エンジニア志望">エンジニア志望</option>
                  <option value="体育会">体育会</option>
                  <option value="笑顔">笑顔</option>
                  <option value="個人開発">個人開発</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">希望勤務地</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-800 bg-white font-medium focus:outline-none focus:ring-1 focus:ring-slate-900"
                >
                  <option value="all">全国 / すべて</option>
                  <option value="東京都">東京都</option>
                  <option value="神奈川県">神奈川県</option>
                  <option value="大阪府">大阪府</option>
                  <option value="リモートワーク可">リモートワーク可</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">英語力</label>
                <select
                  value={selectedEnglish}
                  onChange={(e) => setSelectedEnglish(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-800 bg-white font-medium focus:outline-none focus:ring-1 focus:ring-slate-900"
                >
                  <option value="all">不問 / すべて</option>
                  <option value="日常会話レベル">日常会話レベル</option>
                  <option value="ビジネス中級レベル">ビジネス中級レベル</option>
                  <option value="ビジネス上級レベル">ビジネス上級レベル</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 検索結果一覧 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-bold text-slate-700">
              該当する学生: <span className="text-blue-900 text-sm">{filteredCandidates.length}</span> 名
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredCandidates.map((candidate) => {
              const isLiked = likedStudents.includes(candidate.id);

              return (
                <div
                  key={candidate.id}
                  className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    {/* 上部: 大学 & 卒業年 */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{candidate.name}</span>
                        <span className="text-[11px] text-slate-400 font-medium">{candidate.kana}</span>
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {candidate.graduationYear}年卒
                      </span>
                    </div>

                    <div className="text-xs text-slate-700 font-bold">
                      <span>{candidate.university}</span>
                    </div>

                    {/* ひとことスローガン */}
                    <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-2xl">
                      <p className="text-xs font-bold text-emerald-950 leading-relaxed">
                        「{candidate.catchphrase}」
                      </p>
                    </div>

                    {/* 人柄・強みタグ一覧 */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {candidate.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-900 font-bold border border-emerald-200 shadow-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* 興味のある業界 & 勤務地 */}
                    <div className="flex flex-wrap gap-3 text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                      <span className="flex items-center gap-1 text-slate-600 font-medium">
                        <Briefcase className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{candidate.desiredIndustries?.join(", ") || "IT・Web、ベンチャー"}</span>
                      </span>
                      <span className="flex items-center gap-1 text-slate-600 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{candidate.locations.join(", ")}</span>
                      </span>
                    </div>
                  </div>

                  {/* アクションボタン群 */}
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() =>
                        setPreviewVideo({
                          url: candidate.videoUrl,
                          title: candidate.videoTitle,
                          studentName: candidate.name,
                        })
                      }
                      className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5 fill-slate-700" />
                      <span>PR動画</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleLike(candidate)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 border ${
                        isLiked
                          ? "bg-rose-50 border-rose-200 text-rose-600"
                          : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-rose-600 text-rose-600" : ""}`} />
                      <span>{isLiked ? "気になる済" : "気になる"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setOfferTarget(candidate)}
                      className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>オファー</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredCandidates.length === 0 && (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
              <Search className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-700">条件に一致する学生が見つかりませんでした</p>
              <p className="text-xs text-slate-400">検索条件を変更するか、キーワードをクリアしてお試しください</p>
            </div>
          )}
        </div>

        {/* ================= 動画プレビューモーダル ================= */}
        {previewVideo && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 rounded-3xl border border-slate-800 max-w-sm w-full overflow-hidden shadow-2xl space-y-4 p-4 text-white">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div>
                  <span className="text-xs font-bold text-emerald-400">{previewVideo.studentName} のPR動画</span>
                  <p className="text-[11px] text-slate-400 truncate max-w-[240px]">{previewVideo.title}</p>
                </div>
                <button
                  onClick={() => setPreviewVideo(null)}
                  className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden bg-black aspect-[9/16] max-h-96 shadow-lg mx-auto">
                <video src={previewVideo.url} controls autoPlay className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        )}

        {/* ================= スカウトオファー送信モーダル ================= */}
        {offerTarget && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full p-6 shadow-2xl space-y-4 animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4 text-emerald-700" />
                  <span className="font-bold text-sm text-slate-900">オファーを送信</span>
                </div>
                <button
                  onClick={() => setOfferTarget(null)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {offerSentSuccess ? (
                <div className="p-6 text-center space-y-2">
                  <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                  <p className="font-bold text-sm text-slate-900">オファーを送信しました！</p>
                  <p className="text-xs text-slate-500">学生が承諾するとチャットが開始されます</p>
                </div>
              ) : (
                <form onSubmit={handleSendOffer} className="space-y-4">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-1">
                    <span className="text-slate-400">送信先候補者:</span>
                    <p className="font-bold text-slate-900">
                      {offerTarget.name} ({offerTarget.university} / {offerTarget.graduationYear}年卒)
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      オファーメッセージ <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={offerMessage}
                      onChange={(e) => setOfferMessage(e.target.value)}
                      placeholder="PR動画を拝見し、あなたのリーダーシップとチームを推進する熱量に大変魅力を感じました。ぜひ一度カジュアルに弊社の事業についてお話ししませんか？"
                      className="w-full text-xs border border-slate-300 rounded-2xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 leading-relaxed"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setOfferTarget(null)}
                      className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                    >
                      キャンセル
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>オファーを送信する</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </RoleGuard>
  );
}