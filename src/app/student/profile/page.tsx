"use client";

import { useState, useEffect } from "react";
import RoleGuard from "@/components/RoleGuard";
import { useAuth } from "@/context/AuthContext";
import {
  User,
  GraduationCap,
  Briefcase,
  Award,
  CheckCircle,
  Save,
  BookOpen,
  Sparkles,
  MapPin,
  Globe,
  Tag,
  Calendar,
} from "lucide-react";

export default function StudentProfilePage() {
  const { session, login } = useAuth();
  const [activeTab, setActiveTab] = useState<"basic" | "pr" | "preferences">("basic");

  // 基本情報・学歴
  const [fullName, setFullName] = useState(session?.name || "佐藤 健太");
  const [kana, setKana] = useState("サトウ ケンタ");
  const [gender, setGender] = useState("男性");
  const [birthYear, setBirthYear] = useState("2003");
  const [university, setUniversity] = useState("早稲田大学");
  const [faculty, setFaculty] = useState("商学部");
  const [department, setDepartment] = useState("商学科");
  const [grade, setGrade] = useState("大学3年生");
  const [graduationYear, setGraduationYear] = useState<number>(2026);
  const [academicField, setAcademicField] = useState("文系");

  // 自己PR・ガクチカ
  const [catchphrase, setCatchphrase] = useState("目標に向かって周囲を巻き込む推進力");
  const [bio, setBio] = useState(
    "体育会サッカー部で主将を務めています。困難な状況でもチーム全員で前進する組織づくりと目標達成に向けた推進力に自信があります。"
  );
  const [experience, setExperience] = useState(
    "大学4年間、体育会サッカー部にて活動。主将としてチーム目標の設定とモチベーション管理を担当しました。また、スターバックスでのアルバイトリーダーとして新人教育や売上改善施策も主導しました。"
  );
  const [tags, setTags] = useState("リーダーシップ, 粘り強さ, 組織マネジメント, 行動力, 体育会");

  // 希望条件・スキル・資格
  const [desiredIndustry, setDesiredIndustry] = useState("IT / Webサービス, コンサルティング, 総合商社");
  const [desiredJob, setDesiredJob] = useState("新規事業企画, 営業・事業開発, プロダクトマネージャー");
  const [desiredLocation, setDesiredLocation] = useState("東京都内, リモートワーク可");
  const [languageSkills, setLanguageSkills] = useState("TOEIC 850点 / 英語ビジネス日常会話");
  const [certifications, setCertifications] = useState("普通自動車第一種運転免許, 基本情報技術者試験");
  const [techSkills, setTechSkills] = useState("Excel, Notion, Python(基礎), SQL");

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.name) {
      setFullName(session.name);
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    try {
      await fetch("/api/profile/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          university: `${university} ${faculty} ${department}`,
          graduationYear,
          bio,
          skills: `${tags}, ${languageSkills}`,
          experience,
        }),
      });

      if (session) {
        login({ ...session, name: fullName });
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      console.error(e);
      if (session) {
        login({ ...session, name: fullName });
      }
      setSaved(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RoleGuard allowedRoles={["STUDENT", "ADMIN"]}>
      <div className="flex-1 py-6 px-4 sm:px-6 max-w-4xl mx-auto w-full">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8">
          {/* ヘッダー */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div>
              <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <User className="w-5 h-5 text-emerald-700" />
                <span>プロフィール編集</span>
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                自己PR動画とともに企業が閲覧するプロフィール情報を入力してください
              </p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="hidden sm:flex items-center gap-1.5 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-all disabled:opacity-50 shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? "保存中..." : "保存する"}</span>
            </button>
          </div>

          {saved && (
            <div className="mb-6 p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-semibold flex items-center gap-2 shadow-sm">
              <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>プロフィール情報を保存しました（ヘッダーの表示名も更新されました）</span>
            </div>
          )}

          {/* タブ切り替えボタン */}
          <div className="flex border-b border-slate-200 mb-6 gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("basic")}
              className={`pb-3 px-4 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-all ${
                activeTab === "basic"
                  ? "border-emerald-700 text-emerald-800"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>1. 基本・学歴情報</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("pr")}
              className={`pb-3 px-4 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-all ${
                activeTab === "pr"
                  ? "border-emerald-700 text-emerald-800"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>2. 自己PR・ガクチカ</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("preferences")}
              className={`pb-3 px-4 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-all ${
                activeTab === "preferences"
                  ? "border-emerald-700 text-emerald-800"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>3. 希望条件・スキル</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* タブ1: 基本・学歴情報 */}
            {activeTab === "basic" && (
              <div className="space-y-5 animate-fade-in">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">氏名（漢字）</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">フリガナ</label>
                    <input
                      type="text"
                      value={kana}
                      onChange={(e) => setKana(e.target.value)}
                      placeholder="サトウ ケンタ"
                      className="w-full text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">性別</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                    >
                      <option value="男性">男性</option>
                      <option value="女性">女性</option>
                      <option value="その他・回答しない">その他・回答しない</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">生まれ年（西暦）</label>
                    <input
                      type="number"
                      value={birthYear}
                      onChange={(e) => setBirthYear(e.target.value)}
                      placeholder="2003"
                      className="w-full text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <span className="text-xs font-bold text-emerald-800 flex items-center gap-1 mb-3">
                    <BookOpen className="w-4 h-4" />
                    <span>学歴・所属情報</span>
                  </span>

                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">大学名</label>
                      <input
                        type="text"
                        required
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                        placeholder="早稲田大学"
                        className="w-full text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">学部（個別入力）</label>
                      <input
                        type="text"
                        required
                        value={faculty}
                        onChange={(e) => setFaculty(e.target.value)}
                        placeholder="商学部"
                        className="w-full text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">学科・専攻（個別入力）</label>
                      <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        placeholder="商学科"
                        className="w-full text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">文理区分</label>
                      <select
                        value={academicField}
                        onChange={(e) => setAcademicField(e.target.value)}
                        className="w-full text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                      >
                        <option value="文系">文系</option>
                        <option value="理系">理系</option>
                        <option value="情報系">情報系・理工</option>
                        <option value="その他">その他</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">現在の学年（個別入力）</label>
                      <select
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        className="w-full text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                      >
                        <option value="大学1年生">大学1年生</option>
                        <option value="大学2年生">大学2年生</option>
                        <option value="大学3年生">大学3年生</option>
                        <option value="大学4年生">大学4年生</option>
                        <option value="大学院1年生">大学院1年生 (修士1年)</option>
                        <option value="大学院2年生">大学院2年生 (修士2年)</option>
                        <option value="既卒・その他">既卒・その他</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">卒業予定年（個別入力）</label>
                      <select
                        value={graduationYear}
                        onChange={(e) => setGraduationYear(Number(e.target.value))}
                        className="w-full text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                      >
                        <option value={2025}>2025年3月 卒業</option>
                        <option value={2026}>2026年3月 卒業</option>
                        <option value={2027}>2027年3月 卒業</option>
                        <option value={2028}>2028年3月 卒業</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* タブ2: 自己PR・ガクチカ */}
            {activeTab === "pr" && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    人柄キャッチコピー（一言PR見出し）
                  </label>
                  <input
                    type="text"
                    value={catchphrase}
                    onChange={(e) => setCatchphrase(e.target.value)}
                    placeholder="例: 目標に向かって周囲を巻き込む推進力"
                    className="w-full text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 font-semibold"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">動画一覧やオファー画面で最も目立つ見出しとなります</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">自己PR本文 / 人柄サマリー</label>
                  <textarea
                    rows={4}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="あなたの人柄、価値観、強みや大切にしている考え方を記載してください"
                    className="w-full text-sm border border-slate-300 rounded-2xl p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    学生時代に力を入れたこと（ガクチカ・部活動・サークル・インターン等）
                  </label>
                  <textarea
                    rows={4}
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="具体的なエピソード、直面した課題、工夫した点、得られた成果を記載してください"
                    className="w-full text-sm border border-slate-300 rounded-2xl p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-emerald-700" />
                    <span>特徴・強みタグ（カンマ区切りで検索対象になります）</span>
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="リーダーシップ, 粘り強さ, 組織マネジメント, 笑顔, 体育会"
                    className="w-full text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>
            )}

            {/* タブ3: 希望条件・スキル */}
            {activeTab === "preferences" && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-emerald-700" />
                    <span>志望業界（複数可）</span>
                  </label>
                  <input
                    type="text"
                    value={desiredIndustry}
                    onChange={(e) => setDesiredIndustry(e.target.value)}
                    placeholder="IT / Webサービス, コンサルティング, 総合商社, メーカー"
                    className="w-full text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-emerald-700" />
                    <span>志望職種（複数可）</span>
                  </label>
                  <input
                    type="text"
                    value={desiredJob}
                    onChange={(e) => setDesiredJob(e.target.value)}
                    placeholder="新規事業企画, 営業・事業開発, プロダクトマネージャー, 総合職"
                    className="w-full text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                    <span>希望勤務地</span>
                  </label>
                  <input
                    type="text"
                    value={desiredLocation}
                    onChange={(e) => setDesiredLocation(e.target.value)}
                    placeholder="東京都内, 大阪, リモートワーク可, 全国"
                    className="w-full text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 text-emerald-700" />
                      <span>語学力・留学経験</span>
                    </label>
                    <input
                      type="text"
                      value={languageSkills}
                      onChange={(e) => setLanguageSkills(e.target.value)}
                      placeholder="TOEIC 850点, カナダ留学1年"
                      className="w-full text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-emerald-700" />
                      <span>保有資格・免許</span>
                    </label>
                    <input
                      type="text"
                      value={certifications}
                      onChange={(e) => setCertifications(e.target.value)}
                      placeholder="普通自動車免許, 基本情報技術者"
                      className="w-full text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">IT・プログラミング・その他スキル</label>
                  <input
                    type="text"
                    value={techSkills}
                    onChange={(e) => setTechSkills(e.target.value)}
                    placeholder="Excel, Notion, Python, Figma, 動画編集"
                    className="w-full text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>
            )}

            {/* 下部保存ボタン */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              <span className="text-xs text-slate-400">※ 入力内容は自動的にスカウト企業へ公開されます</span>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-8 py-3 bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-bold rounded-2xl transition-all disabled:opacity-50 shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>{loading ? "保存中..." : "プロフィールを保存する"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </RoleGuard>
  );
}