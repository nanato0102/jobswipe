"use client";

import React, { useState, useEffect } from "react";
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
  Camera,
  Lightbulb,
  Lock,
  Compass,
  Briefcase,
  Check,
} from "lucide-react";
import ImageCropperModal from "@/components/ImageCropperModal";
import {
  PERSONALITY_AXES,
  PERSONALITY_16_TYPES,
  calculatePersonalityCode,
  getPersonalityLabelsFromCode,
} from "@/lib/personalityModel";
import { JOB_CATEGORIES } from "@/lib/jobCategories";

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
  const [faculty, setFaculty] = useState("商学部 3年");
  const [graduationYear, setGraduationYear] = useState("2027");
  const [catchphrase, setCatchphrase] = useState("体育会サッカー部主将。チームを巻き込む推進力と愚直な行動力が武器です！");
  const [bio, setBio] = useState(
    "体育会サッカー部で100名規模の組織主将を務めています。「誰よりも声を出し、背中で引っ張る」を行動指針に、部員一人ひとりと対話を重ねながらリーグ昇格を果たしました。ビジネスの現場でも、失敗を恐れず主体的に行動し、周囲をポジティブに巻き込めるリーダーを目指しています。"
  );

  // 志望職種ステート
  const [targetRoles, setTargetRoles] = useState<string[]>([
    "法人営業・ソリューション提案",
    "総合職・ビジネス総合",
  ]);

  // MBTI準拠 4軸パーソナリティ選択ステート
  const [personalitySelections, setPersonalitySelections] = useState<{
    EI: "E" | "I";
    SN: "S" | "N";
    TF: "T" | "F";
    JP: "J" | "P";
  }>({
    EI: "E",
    SN: "S",
    TF: "T",
    JP: "P",
  });

  const [targetIndustries, setTargetIndustries] = useState<string[]>([
    "IT・Webサービス",
    "ベンチャー・スタートアップ",
    "総合営業・セールス",
  ]);

  const studentId = session?.userType === "STUDENT" ? "s1" : "s1";

  // 初期値ロード
  useEffect(() => {
    const s = appStore.getStudentDetails(studentId);
    if (s) {
      setFullName(s.name || "佐藤 健太");
      setGender(s.gender || "MALE");
      setAvatarUrl(s.avatarUrl);
      setUniversity(s.university || "早稲田大学");
      setFaculty(s.faculty || "商学部 3年");
      setGraduationYear(String(s.graduationYear || "2027"));
      setCatchphrase(s.catchphrase || "");
      setBio(s.bio || "");
      if (s.desiredRoles && s.desiredRoles.length > 0) {
        setTargetRoles(s.desiredRoles);
      }
      setTargetIndustries(s.desiredIndustries || []);

      if (s.personalityCode && s.personalityCode.length === 4) {
        setPersonalitySelections({
          EI: s.personalityCode[0] as "E" | "I",
          SN: s.personalityCode[1] as "S" | "N",
          TF: s.personalityCode[2] as "T" | "F",
          JP: s.personalityCode[3] as "J" | "P",
        });
      }
    }
  }, [studentId]);

  const toggleRole = (role: string) => {
    setTargetRoles((prev) =>
      prev.includes(role)
        ? prev.length > 1
          ? prev.filter((r) => r !== role)
          : prev
        : [...prev, role]
    );
  };

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
      e.target.value = "";
    }
  };

  const handleCropComplete = (croppedDataUrl: string) => {
    setAvatarUrl(croppedDataUrl);
  };

  const handleRemoveAvatar = () => {
    setAvatarUrl(undefined);
  };

  // 現在のMBTIコードと算出タグ
  const currentCode = calculatePersonalityCode(personalitySelections);
  const currentProfile = PERSONALITY_16_TYPES[currentCode] || PERSONALITY_16_TYPES.ESTP;
  const currentTags = getPersonalityLabelsFromCode(currentCode);

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
        personalityCode: currentCode,
        personalityTags: currentTags,
        desiredRoles: targetRoles,
        desiredIndustries: targetIndustries,
      });

      // APIへの非同期保存
      fetch("/api/profile/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          university,
          graduationYear: Number(graduationYear),
          bio,
          skills: currentTags.join(", "),
          experience: faculty,
          desiredRoles: targetRoles.join(", "),
        }),
      }).catch((err) => console.warn("API profile save note:", err));

      setLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 4000);
    }, 400);
  };

  const BIO_TEMPLATES = [
    {
      category: "体育会・部活動",
      catchphrase: "体育会サッカー部主将！チームを巻き込む推進力と愚直な行動力が武器です",
      bio: "体育会サッカー部で主将を務め、部員80名の一体感を創出してリーグ昇格を達成しました。誰よりも声を出し、背中で引っ張る行動力と泥臭い課題解決に自信があります。",
      code: "ESTP",
    },
    {
      category: "留学・異文化経験",
      catchphrase: "カナダ留学と国際交流イベント主催。多様性を受け入れ自ら先頭を走る行動派！",
      bio: "1年間のカナダ留学と留学生支援イベントの企画・運営を経験しました。言語や文化の異なるメンバーと信頼関係を築き、ポジティブに前進する推進力が強みです。",
      code: "ENFP",
    },
    {
      category: "長期インターン・開発",
      catchphrase: "SNSマーケティング長期インターンで月間100万PV達成！探求心と笑顔が強みです",
      bio: "大学1年次よりSNSマーケティングベンチャーでインターンを行い、データ分析とコンテンツ企画を担当。ユーザー目線に立った課題発見と自走力に自信があります。",
      code: "ENFJ",
    },
    {
      category: "アルバイト・接客",
      catchphrase: "カフェ時間帯責任者！相手のニーズを先回りするホスピタリティと課題発見力",
      bio: "カフェでの3年間のアルバイトで時間帯責任者を務め、新人育成マニュアルの刷新とリピート率向上を実現しました。現場を観察して自ら改善する推進力が強みです。",
      code: "ESFJ",
    },
  ];

  const handleApplyTemplate = (tmpl: typeof BIO_TEMPLATES[0]) => {
    setCatchphrase(tmpl.catchphrase);
    setBio(tmpl.bio);
    if (tmpl.code && tmpl.code.length === 4) {
      setPersonalitySelections({
        EI: tmpl.code[0] as "E" | "I",
        SN: tmpl.code[1] as "S" | "N",
        TF: tmpl.code[2] as "T" | "F",
        JP: tmpl.code[3] as "J" | "P",
      });
    }
  };

  return (
    <RoleGuard allowedRoles={["STUDENT", "ADMIN"]}>
      <StudentMobileTabs>
        <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6 w-full">
          {/* ================= 統一ページヘッダー ================= */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <User className="w-3.5 h-3.5" />
                <span>学生マイページ</span>
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                プロフィール設定
              </h1>
              <p className="text-sm text-slate-500">
                長文のESは不要です。人柄や強みがひと目で伝わるプロフィールを設定しましょう。
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-shrink-0">
              <Link
                href="/student/video"
                className="px-3.5 py-2 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-colors flex items-center gap-1.5"
              >
                <Video className="w-4 h-4 text-slate-600" />
                <span>動画投稿へ</span>
              </Link>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 rounded-md bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-semibold transition-all shadow-xs flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{loading ? "保存中..." : "保存する"}</span>
              </button>
            </div>
          </div>

          {/* 保存成功フィードバック */}
          {saved && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-md text-emerald-800 text-sm font-semibold flex items-center gap-2 animate-fade-in shadow-2xs">
              <CheckCircle className="w-4 h-4 flex-shrink-0 text-emerald-700" />
              <span>プロフィールを保存しました！動画を投稿して企業からのオファーを待ちましょう。</span>
            </div>
          )}

          {/* プライバシー保護・段階的情報開示の安心案内 */}
          <div className="p-4 bg-blue-50/70 border border-blue-200/90 rounded-lg flex items-start gap-3 shadow-2xs">
            <div className="w-8 h-8 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Lock className="w-4 h-4" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-blue-950 flex items-center gap-1.5">
                <span>安心のプライバシー保護（段階的情報開示）</span>
                <span className="px-2 py-0.5 rounded-md bg-blue-200 text-blue-900 text-xs font-semibold">有効</span>
              </h3>
              <p className="text-xs sm:text-sm text-blue-800 leading-relaxed">
                企業がスワイプ閲覧・オファー送信する段階では、あなたのお名前は<strong>イニシャル（例: S.Kさん）</strong>で安全に表示されます。あなたがオファーを承諾して個別チャットに進むまで、本名は企業に開示されません。
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ================= ブロック1: プロフィール写真 & 性別 ================= */}
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-5">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Camera className="w-4 h-4 text-emerald-700" />
                <span>1. アイコン写真・性別設定</span>
              </h2>

              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                {/* 四角アバタープレビュー */}
                <div className="flex-shrink-0">
                  {avatarUrl ? (
                    <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-slate-200 shadow-xs bg-slate-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={avatarUrl} alt="プロフィール写真" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div
                      className={`w-20 h-20 rounded-lg flex flex-col items-center justify-center shadow-xs text-white border-2 border-white/40 ${
                        gender === "FEMALE"
                          ? "bg-rose-500"
                          : gender === "MALE"
                          ? "bg-blue-600"
                          : "bg-emerald-700"
                      }`}
                    >
                      <User className="w-9 h-9 stroke-[2.2]" />
                      <span className="text-xs font-semibold mt-0.5 opacity-90">
                        {gender === "FEMALE" ? "女性" : gender === "MALE" ? "男性" : "学生"}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-2 flex-1">
                  <div>
                    <p className="text-sm font-bold text-slate-900">顔写真（四角切り抜き）</p>
                    <p className="text-xs text-slate-500">
                      未設定時は、選択した性別カラー（青/ピンク）の人型アバターが表示されます。
                    </p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <label className="cursor-pointer px-3.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold rounded-md shadow-2xs transition-colors inline-block">
                      <span>写真を選択</span>
                      <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                    </label>
                    {avatarUrl && (
                      <button
                        type="button"
                        onClick={handleRemoveAvatar}
                        className="px-2.5 py-1.5 text-xs text-rose-600 hover:underline font-semibold"
                      >
                        写真を削除
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* 性別選択 */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <label className="block text-sm font-semibold text-slate-700">性別</label>
                <div className="grid grid-cols-3 gap-2.5 sm:max-w-md">
                  <button
                    type="button"
                    onClick={() => setGender("MALE")}
                    className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-md border transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer ${
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
                    className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-md border transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer ${
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
                    className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-md border transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer ${
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
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-4">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-700" />
                <span>2. 基本プロフィール</span>
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">
                    氏名 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-md text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">
                    卒業年（就職活動年） <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={graduationYear}
                    onChange={(e) => setGraduationYear(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-md text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 cursor-pointer"
                  >
                    <option value="2027">2027年卒（大学3年生 / 院1年）</option>
                    <option value="2028">2028年卒（大学2年生）</option>
                    <option value="2026">2026年卒（大学4年生 / 院2年）</option>
                    <option value="2025">既卒・第二新卒</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">
                    在籍大学名 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    required
                    placeholder="例: 早稲田大学"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-md text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">学部・学科名</label>
                  <input
                    type="text"
                    value={faculty}
                    onChange={(e) => setFaculty(e.target.value)}
                    placeholder="例: 商学部 経営学科"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-md text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* ================= ブロック3: MBTI準拠 4軸人柄・パーソナリティ設定 (完全MECE) ================= */}
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-5">
              <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-emerald-700" />
                    <span>3. 人柄・行動特性（4つの二項対立スタンス）</span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    4つの軸から、あなたに最も当てはまるスタンスを1つずつ選択してください（全4軸）。
                  </p>
                </div>

                {/* 算出されたパーソナリティタイプカード */}
                <div className="flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded-md shadow-xs self-start sm:self-auto">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs font-bold font-mono text-emerald-400">{currentCode}</span>
                  <span className="text-xs font-semibold">{currentProfile.title}</span>
                </div>
              </div>

              {/* 4軸の2択セレクター */}
              <div className="space-y-4">
                {PERSONALITY_AXES.map((axis) => {
                  const selectedCode = personalitySelections[axis.id];
                  const isA = selectedCode === axis.optionA.code;
                  const isB = selectedCode === axis.optionB.code;

                  return (
                    <div key={axis.id} className="p-3.5 sm:p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
                          <span>{axis.name}</span>
                        </span>
                        <span className="text-xs text-slate-400 font-medium hidden sm:inline">{axis.description}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {/* 選択肢 A */}
                        <button
                          type="button"
                          onClick={() => setPersonalitySelections({ ...personalitySelections, [axis.id]: axis.optionA.code })}
                          className={`p-3 rounded-md text-left transition-all border cursor-pointer ${
                            isA
                              ? "bg-white border-2 border-slate-900 shadow-xs ring-2 ring-slate-900/10"
                              : "bg-white/60 border-slate-200 hover:bg-white hover:border-slate-300 text-slate-600"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                              <span className={`w-2 h-2 rounded-full ${isA ? "bg-slate-900" : "bg-slate-300"}`}></span>
                              <span>{axis.optionA.label}</span>
                            </span>
                            <span className="text-xs font-mono font-bold text-slate-400">{axis.optionA.code}</span>
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed">{axis.optionA.summary}</p>
                        </button>

                        {/* 選択肢 B */}
                        <button
                          type="button"
                          onClick={() => setPersonalitySelections({ ...personalitySelections, [axis.id]: axis.optionB.code })}
                          className={`p-3 rounded-md text-left transition-all border cursor-pointer ${
                            isB
                              ? "bg-white border-2 border-slate-900 shadow-xs ring-2 ring-slate-900/10"
                              : "bg-white/60 border-slate-200 hover:bg-white hover:border-slate-300 text-slate-600"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                              <span className={`w-2 h-2 rounded-full ${isB ? "bg-slate-900" : "bg-slate-300"}`}></span>
                              <span>{axis.optionB.label}</span>
                            </span>
                            <span className="text-xs font-mono font-bold text-slate-400">{axis.optionB.code}</span>
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed">{axis.optionB.summary}</p>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 選択された4タグのプレビュー */}
              <div className="pt-2">
                <span className="text-xs font-semibold text-slate-500 block mb-1.5">設定される人柄タグ（動画スワイプ時に表示）:</span>
                <div className="flex flex-wrap gap-1.5">
                  {currentTags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-md text-xs font-bold shadow-2xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 例文テンプレート選択バー */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-2 mt-4">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  <span>自己PR例文テンプレートをワンタップで反映（4軸スタンスも連動）:</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {BIO_TEMPLATES.map((tmpl) => (
                    <button
                      key={tmpl.category}
                      type="button"
                      onClick={() => handleApplyTemplate(tmpl)}
                      className="p-2.5 bg-white hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 rounded-md text-left transition-all cursor-pointer shadow-2xs group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-800">
                          {tmpl.category}
                        </span>
                        <span className="text-xs text-emerald-700 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                          適用 ↵
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">{tmpl.catchphrase}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* ひとことスローガン */}
              <div className="space-y-1.5 pt-2">
                <label className="block text-sm font-semibold text-slate-700">
                  ひとことキャッチコピー（動画スワイプ時に大きく表示）
                </label>
                <input
                  type="text"
                  value={catchphrase}
                  onChange={(e) => setCatchphrase(e.target.value)}
                  placeholder="例: 行動力と巻き込み力で組織を力強く推進します！"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-md text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                />
              </div>

              {/* 自己PR詳細 */}
              <div className="space-y-1.5 pt-2">
                <label className="block text-sm font-semibold text-slate-700">
                  自己PR・学生時代に力を入れたこと（詳細）
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  placeholder="学生時代に取り組んだ活動や、あなたの強みがわかるエピソードをご記入ください"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-md text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 leading-relaxed"
                />
              </div>
            </div>

            {/* ================= ブロック4: 志望職種・希望ポジション（複数選択可） ================= */}
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-4">
              <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-emerald-700" />
                    <span>4. 志望職種・希望ポジション（複数選択可）</span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    興味のある職種を選択してください（企業の動画スワイプ画面で志望バッジとして表示されます）。
                  </p>
                </div>

                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 self-start sm:self-auto">
                  {targetRoles.length}件選択中
                </span>
              </div>

              {/* 職種選択チップグリッド */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1">
                {JOB_CATEGORIES.map((role) => {
                  const isSelected = targetRoles.includes(role);
                  return (
                    <button
                      key={role}
                      type="button"
                      onClick={() => toggleRole(role)}
                      className={`p-3 rounded-lg border text-left transition-all flex items-center justify-between gap-2 cursor-pointer ${
                        isSelected
                          ? "bg-emerald-50/80 border-emerald-500 text-emerald-950 font-bold shadow-2xs ring-1 ring-emerald-400/40"
                          : "bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-700 font-semibold"
                      }`}
                    >
                      <span className="text-xs sm:text-[13px] leading-snug">{role}</span>
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-colors ${
                          isSelected
                            ? "bg-emerald-700 text-white"
                            : "border border-slate-300 bg-white"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* 選択中の志望職種プレビュー */}
              <div className="pt-2 border-t border-slate-100">
                <span className="text-xs font-semibold text-slate-500 block mb-1.5">
                  企業スワイプ画面での表示プレビュー:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {targetRoles.map((role, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-slate-900 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
                    >
                      <Briefcase className="w-3 h-3 text-emerald-400" />
                      <span>{role}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 下部保存ボタン */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-semibold rounded-md transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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
