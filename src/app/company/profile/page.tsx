"use client";

import { useState, useEffect } from "react";
import RoleGuard from "@/components/RoleGuard";
import CompanyMobileTabs from "@/components/CompanyMobileTabs";
import { useAuth } from "@/context/AuthContext";
import { appStore } from "@/lib/appStore";
import {
  Building2,
  Globe,
  MapPin,
  CheckCircle,
  Save,
  Camera,
  Sparkles,
} from "lucide-react";

export default function CompanyProfilePage() {
  const { session } = useAuth();
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState(session?.name || "テックイノベーション株式会社");
  const [industry, setIndustry] = useState("IT / Webサービス");
  const [representative, setRepresentative] = useState("代表取締役 田中 健一");
  const [establishedYear, setEstablishedYear] = useState("2020");
  const [employeesCount, setEmployeesCount] = useState("120名");
  const [location, setLocation] = useState("東京都渋谷区道玄坂1丁目 渋谷イノベーションタワー14F");
  const [websiteUrl, setWebsiteUrl] = useState("https://example.com/tech-innovations");
  const [description, setDescription] = useState(
    "「テクノロジーで次世代の当たり前を創る」をミッションに、急成長中の自社SaaSプロダクトおよびAIソリューションを展開するメガベンチャーです。若手社員が裁量を持って挑戦できるフラットな組織風土が特徴です。"
  );
  const [idealCandidate, setIdealCandidate] = useState(
    "・自ら課題を発見し、主体的に行動できる方\n・チームでのコミュニケーションと協調性を大切にする方\n・新しい技術やトレンドへの探求心・学習意欲が高い方"
  );
  const [benefits, setBenefits] = useState("フルリモート・フレックスタイム制度, 書籍購入・資格取得支援, 家賃補助（月3万円）");

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.name) {
      setCompanyName(session.name);
    }
    const currentCompany = appStore.getCompanyDetails("c1");
    if (currentCompany) {
      if (currentCompany.logoUrl) setLogoUrl(currentCompany.logoUrl);
      if (currentCompany.name) setCompanyName(currentCompany.name);
      if (currentCompany.industry) setIndustry(currentCompany.industry);
      if (currentCompany.location) setLocation(currentCompany.location);
      if (currentCompany.description) setDescription(currentCompany.description);
    }
  }, [session]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      appStore.saveCompanyProfile({
        id: "c1",
        name: companyName,
        industry,
        established: establishedYear,
        employees: employeesCount,
        location,
        websiteUrl,
        description,
        logoUrl: logoUrl || undefined,
      });

      setLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 4000);
    }, 400);
  };

  return (
    <RoleGuard allowedRoles={["COMPANY", "ADMIN"]}>
      <CompanyMobileTabs>
        <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6 w-full">
          {/* ================= 統一ページヘッダー ================= */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-blue-50 text-blue-900 border border-blue-200">
                <Building2 className="w-3.5 h-3.5" />
                <span>企業マイページ</span>
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                企業情報・求人編集
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                学生に公開される企業プロフィールや募集要項、カルチャー情報を設定します。
              </p>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 disabled:opacity-50 cursor-pointer self-start sm:self-auto"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? "保存中..." : "変更を保存する"}</span>
            </button>
          </div>

          {/* 保存成功メッセージ */}
          {saved && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fade-in shadow-2xs">
              <CheckCircle className="w-4 h-4 flex-shrink-0 text-emerald-700" />
              <span>企業プロフィールを保存しました！学生詳細ページ等に即時反映されます。</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ================= ブロック1: 自社ロゴ画像設定 ================= */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-5">
              <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Camera className="w-4 h-4 text-slate-700" />
                <span>1. 自社ロゴ画像設定</span>
              </h2>

              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <div className="flex-shrink-0">
                  {logoUrl ? (
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-slate-200 shadow-2xs bg-white flex items-center justify-center p-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={logoUrl} alt="自社ロゴ" className="max-w-full max-h-full object-contain" />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-slate-900 text-emerald-400 font-black text-xl flex items-center justify-center shadow-xs">
                      {companyName.slice(0, 1) || "企"}
                    </div>
                  )}
                </div>

                <div className="space-y-2 flex-1">
                  <div>
                    <p className="text-xs font-bold text-slate-900">企業ロゴ画像（正方形推奨）</p>
                    <p className="text-[11px] text-slate-500">
                      オファー一覧やチャット、企業詳細ページで学生に表示されます。
                    </p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <label className="cursor-pointer px-3.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-bold rounded-xl shadow-2xs transition-colors inline-block">
                      <span>ロゴを選択</span>
                      <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
                    </label>
                    {logoUrl && (
                      <button
                        type="button"
                        onClick={() => setLogoUrl(null)}
                        className="px-2.5 py-1.5 text-xs text-rose-600 hover:underline font-bold"
                      >
                        ロゴをリセット
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ================= ブロック2: 企業基本情報 ================= */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
              <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-slate-700" />
                <span>2. 会社基本情報</span>
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    企業名（法人名） <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    業界・事業領域 <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 cursor-pointer"
                  >
                    <option value="IT / Webサービス">IT / Webサービス / SaaS</option>
                    <option value="AI・テクノロジー">AI / ディープテック</option>
                    <option value="人材・コンサルティング">人材 / 組織コンサルティング</option>
                    <option value="金融・FinTech">金融 / FinTech / 投資</option>
                    <option value="メーカー・製造">メーカー / モビリティ / 精密</option>
                    <option value="商社・流通">総合商社 / 専門商社</option>
                    <option value="広告・メディア">広告 / メディア / マーケティング</option>
                    <option value="不動産・建設">不動産 / PropTech / 建設</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">代表者氏名</label>
                  <input
                    type="text"
                    value={representative}
                    onChange={(e) => setRepresentative(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">従業員数</label>
                  <input
                    type="text"
                    value={employeesCount}
                    onChange={(e) => setEmployeesCount(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">本社所在地</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">企業公式WebサイトURL</label>
                  <input
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* ================= ブロック3: 会社紹介・求める人物像 ================= */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
              <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-slate-700" />
                <span>3. 会社紹介・カルチャー・求める人物像</span>
              </h2>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    事業内容・会社のミッション <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 leading-relaxed"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">求める人物像（人柄・スタンス）</label>
                  <textarea
                    rows={3}
                    value={idealCandidate}
                    onChange={(e) => setIdealCandidate(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 leading-relaxed"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">福利厚生・働く環境（カンマ区切り）</label>
                  <input
                    type="text"
                    value={benefits}
                    onChange={(e) => setBenefits(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* 保存ボタン */}
            <div className="flex items-center justify-end pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{loading ? "保存中..." : "変更を保存する"}</span>
              </button>
            </div>
          </form>
        </div>
      </CompanyMobileTabs>
    </RoleGuard>
  );
}
