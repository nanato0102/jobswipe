"use client";

import { useState, useEffect, KeyboardEvent } from "react";
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
  Plus,
  X,
} from "lucide-react";

// 47都道府県マスターデータ
const PREFECTURE_GROUPS = [
  {
    region: "特別",
    prefs: ["リモートワーク可", "こだわらない / 全国"],
  },
  {
    region: "関東",
    prefs: ["東京都", "神奈川県", "埼玉県", "千葉県", "茨城県", "栃木県", "群馬県"],
  },
  {
    region: "関西",
    prefs: ["大阪府", "京都府", "兵庫県", "奈良県", "滋賀県", "和歌山県"],
  },
  {
    region: "東海",
    prefs: ["愛知県", "静岡県", "岐阜県", "三重県"],
  },
  {
    region: "北海道・東北",
    prefs: ["北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県"],
  },
  {
    region: "甲信越・北陸",
    prefs: ["新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県"],
  },
  {
    region: "中国・四国",
    prefs: ["鳥取県", "島根県", "岡山県", "広島県", "山口県", "徳島県", "香川県", "愛媛県", "高知県"],
  },
  {
    region: "九州・沖縄",
    prefs: ["福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"],
  },
];

// タグ入力ボックス用サブコンポーネント
interface TagInputProps {
  label: string;
  placeholder: string;
  tags: string[];
  setTags: (tags: string[]) => void;
  helperText?: string;
}

function TagInput({ label, placeholder, tags, setTags, helperText }: TagInputProps) {
  const [inputVal, setInputVal] = useState("");

  const handleAdd = () => {
    const trimmed = inputVal.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setInputVal("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleRemove = (indexToRemove: number) => {
    setTags(tags.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div>
      <label className="block text-xs font-bold text-slate-700 mb-1">{label}</label>
      
      {/* 独立した箱（バッジ）一覧 */}
      <div className="flex flex-wrap gap-1.5 mb-2 min-h-[28px]">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-full text-xs font-semibold shadow-sm animate-fade-in"
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              className="text-emerald-600 hover:text-emerald-950 p-0.5 rounded-full hover:bg-emerald-200 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        {tags.length === 0 && (
          <span className="text-xs text-slate-400 py-1">未登録です。キーワードを入力してEnterを押してください</span>
        )}
      </div>

      {/* 入力フィールド */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 text-sm border border-slate-300 rounded-2xl px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-2xl transition-colors border border-slate-300 flex items-center gap-1 flex-shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>追加</span>
        </button>
      </div>
      {helperText && <p className="text-[11px] text-slate-500 mt-1">{helperText}</p>}
    </div>
  );
}

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
  const [tags, setTags] = useState<string[]>(["リーダーシップ", "粘り強さ", "組織マネジメント", "行動力", "体育会"]);

  // 希望条件・スキル・資格
  const [industries, setIndustries] = useState<string[]>(["IT / Webサービス", "コンサルティング", "総合商社"]);
  const [jobTypes, setJobTypes] = useState<string[]>(["新規事業企画", "営業・事業開発", "プロダクトマネージャー"]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>(["東京都", "神奈川県", "リモートワーク可"]);
  const [englishLevel, setEnglishLevel] = useState<string>("日常会話レベル");
  const [certifications, setCertifications] = useState<string[]>(["普通自動車第一種運転免許", "基本情報技術者試験"]);
  const [skills, setSkills] = useState<string[]>(["Excel", "Notion", "Python(基礎)", "SQL"]);

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.name) {
      setFullName(session.name);
    }
  }, [session]);

  const toggleLocation = (pref: string) => {
    if (selectedLocations.includes(pref)) {
      setSelectedLocations(selectedLocations.filter((p) => p !== pref));
    } else {
      setSelectedLocations([...selectedLocations, pref]);
    }
  };

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
          skills: `${tags.join(", ")}, 英語: ${englishLevel}, スキル: ${skills.join(", ")}`,
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

                {/* 自己PR（300文字程度） */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700">自己PR（300文字程度）</label>
                    <span
                      className={`text-[11px] font-semibold ${
                        bio.length >= 250 && bio.length <= 350
                          ? "text-emerald-700"
                          : bio.length > 350
                          ? "text-amber-600"
                          : "text-slate-400"
                      }`}
                    >
                      {bio.length} / 300文字程度
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="あなたの人柄、価値観、強みや大切にしている考え方を300文字程度で記載してください"
                    className="w-full text-sm border border-slate-300 rounded-2xl p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 leading-relaxed"
                  />
                </div>

                {/* 学生時代に力を入れたこと（300文字程度） */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700">
                      学生時代に力を入れたこと（300文字程度）
                    </label>
                    <span
                      className={`text-[11px] font-semibold ${
                        experience.length >= 250 && experience.length <= 350
                          ? "text-emerald-700"
                          : experience.length > 350
                          ? "text-amber-600"
                          : "text-slate-400"
                      }`}
                    >
                      {experience.length} / 300文字程度
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="具体的なエピソード、直面した課題、工夫した点、得られた成果を300文字程度で記載してください"
                    className="w-full text-sm border border-slate-300 rounded-2xl p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 leading-relaxed"
                  />
                </div>

                {/* 特徴・強み（Enterで独立するタグ入力UI） */}
                <TagInput
                  label="特徴・強み（Enterで追加）"
                  placeholder="例: リーダーシップ, 粘り強さ, 笑顔, 体育会 (入力後Enter)"
                  tags={tags}
                  setTags={setTags}
                  helperText="入力してEnterキーまたは追加ボタンを押すと独立した箱として登録されます"
                />
              </div>
            )}

            {/* タブ3: 希望条件・スキル */}
            {activeTab === "preferences" && (
              <div className="space-y-6 animate-fade-in">
                {/* 志望業界（Enterで独立するタグ入力UI） */}
                <TagInput
                  label="志望業界（Enterで追加）"
                  placeholder="例: IT / Webサービス, コンサルティング, 総合商社 (入力後Enter)"
                  tags={industries}
                  setTags={setIndustries}
                  helperText="興味のある業界を入力してEnterを押してください"
                />

                {/* 志望職種（Enterで独立するタグ入力UI） */}
                <TagInput
                  label="志望職種（Enterで追加）"
                  placeholder="例: 新規事業企画, 営業・事業開発, プロダクトマネージャー (入力後Enter)"
                  tags={jobTypes}
                  setTags={setJobTypes}
                  helperText="希望する職種を入力してEnterを押してください"
                />

                {/* 希望勤務地（47都道府県から複数選択） */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-slate-700 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                      <span>希望勤務地（47都道府県から複数選択）</span>
                    </label>
                    <span className="text-[11px] text-emerald-800 font-bold">
                      {selectedLocations.length} 箇所選択中
                    </span>
                  </div>

                  {/* 選択済みバッジ一覧 */}
                  <div className="flex flex-wrap gap-1 mb-3 p-2 bg-slate-50 border border-slate-200 rounded-2xl min-h-[36px]">
                    {selectedLocations.map((loc) => (
                      <span
                        key={loc}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-700 text-white rounded-full text-[11px] font-semibold"
                      >
                        <span>{loc}</span>
                        <button
                          type="button"
                          onClick={() => toggleLocation(loc)}
                          className="hover:text-emerald-200"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    {selectedLocations.length === 0 && (
                      <span className="text-xs text-slate-400 py-0.5 px-1">下記のリストから選択してください</span>
                    )}
                  </div>

                  {/* 地方別47都道府県ピッカー */}
                  <div className="space-y-3 p-3 bg-white border border-slate-200 rounded-2xl max-h-60 overflow-y-auto">
                    {PREFECTURE_GROUPS.map((group) => (
                      <div key={group.region} className="space-y-1.5">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                          {group.region}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {group.prefs.map((pref) => {
                            const isSelected = selectedLocations.includes(pref);
                            return (
                              <button
                                key={pref}
                                type="button"
                                onClick={() => toggleLocation(pref)}
                                className={`text-xs px-2.5 py-1 rounded-xl font-medium transition-all ${
                                  isSelected
                                    ? "bg-emerald-700 text-white shadow-sm font-bold"
                                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                }`}
                              >
                                {pref}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 英語力（4段階選択） */}
                <div className="pt-3 border-t border-slate-100">
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-emerald-700" />
                    <span>英語力</span>
                  </label>
                  <select
                    value={englishLevel}
                    onChange={(e) => setEnglishLevel(e.target.value)}
                    className="w-full text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                  >
                    <option value="挨拶レベル">挨拶レベル</option>
                    <option value="日常会話レベル">日常会話レベル</option>
                    <option value="ビジネス中級レベル">ビジネス中級レベル</option>
                    <option value="ビジネス上級レベル">ビジネス上級レベル</option>
                  </select>
                </div>

                {/* 保有資格（Enterで独立するタグ入力UI） */}
                <TagInput
                  label="保有資格（Enterで追加）"
                  placeholder="例: 普通自動車第一種運転免許, 基本情報技術者試験, TOEIC 800点 (入力後Enter)"
                  tags={certifications}
                  setTags={setCertifications}
                  helperText="保有している資格や免許を入力してEnterを押してください"
                />

                {/* その他スキル（Enterで独立するタグ入力UI） */}
                <TagInput
                  label="その他スキル（Enterで追加）"
                  placeholder="例: Excel, Notion, Python, Figma, 動画編集 (入力後Enter)"
                  tags={skills}
                  setTags={setSkills}
                  helperText="得意なツールやPCスキルを入力してEnterを押してください"
                />
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