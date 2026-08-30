"use client";

import React, { useState, useEffect, KeyboardEvent } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import RoleGuard from "@/components/RoleGuard";
import StudentMobileTabs from "@/components/StudentMobileTabs";
import { appStore } from "@/lib/appStore";
import {
  User,
  GraduationCap,
  Sparkles,
  Save,
  CheckCircle,
  Video,
  ArrowRight,
  X,
  Plus,
  Compass,
  MapPin,
  Camera,
} from "lucide-react";
import ImageCropperModal from "@/components/ImageCropperModal";

export default function StudentProfilePage() {
  const { session } = useAuth();

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  // 画像切り抜きモーダル用ステート
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [rawImageForCrop, setRawImageForCrop] = useState<string | null>(null);

  // フォームステート
  const [fullName, setFullName] = useState("佐藤 健太");
  const [gender, setGender] = useState<"MALE" | "FEMALE" | "OTHER">("MALE");
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const [university, setUniversity] = useState("早稲田大学");
  const [faculty, setFaculty] = useState("商学部");
  const [graduationYear, setGraduationYear] = useState("2026");
  const [catchphrase, setCatchphrase] = useState("体育会サッカー部主将！チームを前に進める行動力と泥臭い粘り強さが強みです");
  const [bio, setBio] = useState(
    "大学3年間、体育会サッカー部に所属し主将を務めました。\n部員80名の意識改革を行い、創部初の全国大会出場を達成。\n泥臭い課題解決とチームビルディングには絶対の自信があります。"
  );
  const [personalityTags, setPersonalityTags] = useState<string[]>([
    "体育会系・リーダーシップ",
    "粘り強い",
    "フットワーク軽い",
    "笑顔・ポジティブ",
    "チームワーク重視",
  ]);
  const [targetIndustries, setTargetIndustries] = useState<string[]>([
    "IT・Web・通信",
    "人材・コンサルティング",
    "メーカー・商社",
  ]);
  const [newTagInput, setNewTagInput] = useState("");

  const studentId = session?.userType === "STUDENT" ? "s1" : "s1";

  // 初期値ロード
  useEffect(() => {
    const s = appStore.getStudentDetails(studentId);
    if (s) {
      setFullName(s.name || "佐藤 健太");
      setGender(s.gender || "MALE");
      setAvatarUrl(s.avatarUrl);
      setUniversity(s.university || "早稲田大学");
      setFaculty(s.faculty || "商学部");
      setGraduationYear(String(s.graduationYear || "2026"));
      setCatchphrase(s.catchphrase || "");
      setBio(s.bio || "");
      setPersonalityTags(s.personalityTags || []);
      setTargetIndustries(s.desiredIndustries || []);
    }
  }, [studentId]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string;
        setRawImageForCrop(dataUrl);
        setIsCropperOpen(true);
      };
      reader.readAsDataURL(file);
      // 同じファイルを再度選択できるようにリセット
      e.target.value = "";
    }
  };

  const handleCropComplete = (croppedDataUrl: string) => {
    setAvatarUrl(croppedDataUrl);
  };

  const handleRemoveAvatar = () => {
    setAvatarUrl(undefined);
  };

  const handleAddTag = () => {
    const val = newTagInput.trim().replace(/^#/, "");
    if (val && !personalityTags.includes(val) && personalityTags.length < 8) {
      setPersonalityTags([...personalityTags, val]);
      setNewTagInput("");
    }
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setPersonalityTags(personalityTags.filter((t) => t !== tagToRemove));
  };

  const toggleIndustry = (ind: string) => {
    if (targetIndustries.includes(ind)) {
      setTargetIndustries(targetIndustries.filter((i) => i !== ind));
    } else {
      if (targetIndustries.length < 5) {
        setTargetIndustries([...targetIndustries, ind]);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      appStore.saveStudentProfile({
        id: studentId,
        name: fullName,
        gender,
        avatarUrl,
        university,
        faculty,
        graduationYear: Number(graduationYear),
        catchphrase,
        bio,
        personalityTags,
        desiredIndustries: targetIndustries,
      });

      setLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 4000);
    }, 400);
  };

  const PRESET_TAGS = [
    "明るい・笑顔",
    "リーダーシップ",
    "論理的思考力",
    "粘り強い・やり切る力",
    "素直・謙虚",
    "フットワーク軽い",
    "英語・語学力",
    "クリエイティブ",
    "協調性・気配り",
    "負けず嫌い",
  ];

  const INDUSTRY_OPTIONS = [
    "IT・Web・通信",
    "人材・コンサルティング",
    "メーカー・商社",
    "金融・FinTech",
    "広告・メディア",
    "不動産・建設",
    "ベンチャー・スタートアップ",
    "エンタメ・イベント",
    "飲食・フードサービス",
    "医療・ヘルスケア",
  ];

  return (
    <RoleGuard allowedRoles={["STUDENT", "ADMIN"]}>
      <StudentMobileTabs>
        <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6 w-full">
          {/* ================= 統一ページヘッダー ================= */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <User className="w-3.5 h-3.5" />
                <span>学生マイページ</span>
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                プロフィール設定
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                長文のESは不要です。人柄や強みがひと目で伝わるプロフィールを設定しましょう。
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-shrink-0">
              <Link
                href="/student/video"
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Video className="w-4 h-4 text-slate-600" />
                <span>動画投稿へ</span>
              </Link>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{loading ? "保存中..." : "保存する"}</span>
              </button>
            </div>
          </div>

          {/* 保存成功フィードバック */}
          {saved && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fade-in shadow-2xs">
              <CheckCircle className="w-4 h-4 flex-shrink-0 text-emerald-700" />
              <span>プロフィールを保存しました！動画を投稿して企業からのオファーを待ちましょう。</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ================= ブロック1: プロフィール写真 & 性別 ================= */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-5">
              <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Camera className="w-4 h-4 text-emerald-700" />
                <span>1. アイコン写真・性別設定</span>
              </h2>

              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                {/* 四角アバタープレビュー */}
                <div className="flex-shrink-0">
                  {avatarUrl ? (
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-slate-200 shadow-xs bg-slate-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={avatarUrl} alt="プロフィール写真" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div
                      className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center shadow-xs text-white border-2 border-white/40 ${
                        gender === "FEMALE"
                          ? "bg-rose-500"
                          : gender === "MALE"
                          ? "bg-blue-600"
                          : "bg-emerald-700"
                      }`}
                    >
                      <User className="w-9 h-9 stroke-[2.2]" />
                      <span className="text-[10px] font-bold mt-0.5 opacity-90">
                        {gender === "FEMALE" ? "女性" : gender === "MALE" ? "男性" : "学生"}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-2 flex-1">
                  <div>
                    <p className="text-xs font-bold text-slate-900">顔写真（四角切り抜き）</p>
                    <p className="text-[11px] text-slate-500">
                      未設定時は、選択した性別カラー（青/ピンク）の人型アバターが表示されます。
                    </p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <label className="cursor-pointer px-3.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-bold rounded-xl shadow-2xs transition-colors inline-block">
                      <span>写真を選択</span>
                      <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                    </label>
                    {avatarUrl && (
                      <button
                        type="button"
                        onClick={handleRemoveAvatar}
                        className="px-2.5 py-1.5 text-xs text-rose-600 hover:underline font-bold"
                      >
                        写真を削除
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* 性別選択 */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <label className="block text-xs font-bold text-slate-700">性別</label>
                <div className="grid grid-cols-3 gap-2.5 sm:max-w-md">
                  <button
                    type="button"
                    onClick={() => setGender("MALE")}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
                      gender === "MALE"
                        ? "border-2 border-blue-600 bg-blue-50 text-blue-900 shadow-2xs"
                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0"></span>
                    <span>男性</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGender("FEMALE")}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
                      gender === "FEMALE"
                        ? "border-2 border-rose-500 bg-rose-50 text-rose-900 shadow-2xs"
                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0"></span>
                    <span>女性</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGender("OTHER")}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
                      gender === "OTHER"
                        ? "border-2 border-slate-800 bg-slate-100 text-slate-900 shadow-2xs"
                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-slate-400 flex-shrink-0"></span>
                    <span>その他</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ================= ブロック2: 基本プロフィール ================= */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
              <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-700" />
                <span>2. 基本プロフィール</span>
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    氏名 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    卒業年（就職活動年） <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={graduationYear}
                    onChange={(e) => setGraduationYear(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 cursor-pointer"
                  >
                    <option value="2026">2026年卒（大学4年生 / 院2年）</option>
                    <option value="2027">2027年卒（大学3年生 / 院1年）</option>
                    <option value="2028">2028年卒（大学2年生）</option>
                    <option value="2025">既卒・第二新卒</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    在籍大学名 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    required
                    placeholder="例: 早稲田大学"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">学部・学科名</label>
                  <input
                    type="text"
                    value={faculty}
                    onChange={(e) => setFaculty(e.target.value)}
                    placeholder="例: 商学部 経営学科"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                  />
                </div>
              </div>
            </div>

            {/* ================= ブロック3: 自己PR・人柄タグ ================= */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
              <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>3. 人柄タグ・自己PR</span>
              </h2>

              {/* ひとことスローガン */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  ひとことキャッチコピー（動画スワイプ時に大きく表示）
                </label>
                <input
                  type="text"
                  value={catchphrase}
                  onChange={(e) => setCatchphrase(e.target.value)}
                  placeholder="例: 行動力と笑顔でチームを推進します！"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                />
              </div>

              {/* 人柄タグ */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold text-slate-700">
                  あなたを表す人柄・強みタグ（最大8個）
                </label>

                <div className="flex flex-wrap gap-1.5 mb-2">
                  {personalityTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200"
                    >
                      <span>#{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-rose-600 p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    placeholder="新しいタグを入力（Enterで追加）"
                    className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
                  >
                    追加
                  </button>
                </div>

                {/* プリセット候補 */}
                <div className="pt-2">
                  <span className="text-[11px] text-slate-400 font-bold block mb-1.5">よく選ばれているタグ候補:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {PRESET_TAGS.map((pt) => {
                      const selected = personalityTags.includes(pt);
                      return (
                        <button
                          key={pt}
                          type="button"
                          disabled={selected}
                          onClick={() => {
                            if (!selected && personalityTags.length < 8) {
                              setPersonalityTags([...personalityTags, pt]);
                            }
                          }}
                          className={`text-[11px] px-2.5 py-1 rounded-lg border transition-colors ${
                            selected
                              ? "bg-slate-100 text-slate-400 border-slate-200 cursor-default"
                              : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 cursor-pointer"
                          }`}
                        >
                          + #{pt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 自己PR詳細 */}
              <div className="space-y-1.5 pt-2">
                <label className="block text-xs font-bold text-slate-700">
                  自己PR・学生時代に力を入れたこと（詳細）
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  placeholder="学生時代に取り組んだ活動や、あなたの強みがわかるエピソードをご記入ください"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 leading-relaxed"
                />
              </div>
            </div>

            {/* 下部保存ボタン */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3 bg-emerald-700 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{loading ? "保存中..." : "変更を保存する"}</span>
              </button>
            </div>
          </form>

          {/* 画像切り抜きモーダル */}
          <ImageCropperModal
            isOpen={isCropperOpen}
            imageSrc={rawImageForCrop}
            onClose={() => setIsCropperOpen(false)}
            onCropComplete={handleCropComplete}
            title="プロフィール写真の切り抜き"
          />
        </div>
      </StudentMobileTabs>
    </RoleGuard>
  );
}
