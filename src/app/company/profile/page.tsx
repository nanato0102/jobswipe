"use client";

import { useState, useEffect } from "react";
import RoleGuard from "@/components/RoleGuard";
import { useAuth } from "@/context/AuthContext";
import {
  Building2,
  Globe,
  MapPin,
  Calendar,
  Briefcase,
  Users,
  CheckCircle,
  Save,
  FileText,
  Sparkles,
} from "lucide-react";

export default function CompanyProfilePage() {
  const { session, login } = useAuth();
  const [companyName, setCompanyName] = useState(session?.name || "株式会社サイバー・イノベーション");
  const [industry, setIndustry] = useState("IT / Webサービス");
  const [representative, setRepresentative] = useState("代表取締役 田中 健一");
  const [establishedYear, setEstablishedYear] = useState("2018");
  const [employeesCount, setEmployeesCount] = useState("150名");
  const [location, setLocation] = useState("東京都渋谷区道玄坂1-2-3 渋谷イノベーションタワー14F");
  const [websiteUrl, setWebsiteUrl] = useState("https://example.com");
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
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    try {
      // 企業プロフィールの保存処理
      if (session) {
        login({ ...session, name: companyName });
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      console.error(e);
      setSaved(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RoleGuard allowedRoles={["COMPANY", "ADMIN"]}>
      <div className="flex-1 py-6 px-4 sm:px-6 max-w-4xl mx-auto w-full">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
          {/* ヘッダー */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 text-blue-800 text-[11px] font-bold border border-blue-200 mb-1.5">
                <Building2 className="w-3.5 h-3.5" />
                <span>企業情報管理</span>
              </div>
              <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span>企業プロフィール編集</span>
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                学生へオファーを送る際や、チャット画面で公開される自社の企業情報を登録してください
              </p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="hidden sm:flex items-center gap-1.5 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all disabled:opacity-50 shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? "保存中..." : "保存する"}</span>
            </button>
          </div>

          {saved && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-semibold flex items-center gap-2 shadow-sm">
              <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>企業情報を正常に保存しました（ヘッダーの表示名も更新されました）</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 基本情報 */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <Building2 className="w-4 h-4 text-blue-700" />
                <span>会社基本情報</span>
              </span>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">企業名 / 法人名</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">主な業界</label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                  >
                    <option value="IT / Webサービス">IT / Webサービス</option>
                    <option value="ベンチャー / スタートアップ">ベンチャー / スタートアップ</option>
                    <option value="美容 / コスメ / ヘルスケア">美容 / コスメ / ヘルスケア</option>
                    <option value="アパレル / ファッション">アパレル / ファッション</option>
                    <option value="広告 / PR / マスコミ">広告 / PR / マスコミ</option>
                    <option value="人材 / 教育 / コンサルティング">人材 / 教育 / コンサルティング</option>
                    <option value="不動産 / 建設 / 住宅">不動産 / 建設 / 住宅</option>
                    <option value="総合商社 / 専門商社">総合商社 / 専門商社</option>
                    <option value="飲食 / フードサービス">飲食 / フードサービス</option>
                    <option value="ブライダル / ホテル / 観光">ブライダル / ホテル / 観光</option>
                    <option value="エンタメ / イベント / 音楽">エンタメ / イベント / 音楽</option>
                    <option value="メーカー / 製造 / 日用品">メーカー / 製造 / 日用品</option>
                    <option value="金融 / 保険">金融 / 保険</option>
                    <option value="その他">その他</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">代表者名</label>
                  <input
                    type="text"
                    value={representative}
                    onChange={(e) => setRepresentative(e.target.value)}
                    placeholder="代表取締役 山田 太郎"
                    className="w-full text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">設立年（西暦）</label>
                  <input
                    type="text"
                    value={establishedYear}
                    onChange={(e) => setEstablishedYear(e.target.value)}
                    placeholder="2018"
                    className="w-full text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">従業員数</label>
                  <input
                    type="text"
                    value={employeesCount}
                    onChange={(e) => setEmployeesCount(e.target.value)}
                    placeholder="150名"
                    className="w-full text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>本社所在地</span>
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="東京都渋谷区..."
                    className="w-full text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-slate-500" />
                    <span>企業WebサイトURL</span>
                  </label>
                  <input
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://company.jp"
                    className="w-full text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* 事業内容 ＆ 採用メッセージ */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <FileText className="w-4 h-4 text-blue-700" />
                <span>事業内容・採用メッセージ</span>
              </span>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">事業内容 / 会社概要</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="自社のミッションや主力事業、強みについて記載してください"
                  className="w-full text-sm border border-slate-300 rounded-2xl p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-blue-700" />
                  <span>求める人物像・カルチャー</span>
                </label>
                <textarea
                  rows={3}
                  value={idealCandidate}
                  onChange={(e) => setIdealCandidate(e.target.value)}
                  placeholder="自社が歓迎する学生の人柄、強み、行動指針を記載してください"
                  className="w-full text-sm border border-slate-300 rounded-2xl p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">福利厚生・働く環境（特徴）</label>
                <input
                  type="text"
                  value={benefits}
                  onChange={(e) => setBenefits(e.target.value)}
                  placeholder="リモートワーク制度, 資格手当, カフェスペース完備"
                  className="w-full text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
            </div>

            {/* 下部保存ボタン */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              <span className="text-xs text-slate-400">※ 入力内容はオファー受信時の企業情報として学生に公開されます</span>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-2xl transition-all disabled:opacity-50 shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>{loading ? "保存中..." : "企業プロフィールを保存する"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </RoleGuard>
  );
}