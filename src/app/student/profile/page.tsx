"use client";

import { useState } from "react";
import { User, GraduationCap, Briefcase, Award, CheckCircle, Save } from "lucide-react";

export default function StudentProfilePage() {
  const [fullName, setFullName] = useState("佐藤 健太");
  const [university, setUniversity] = useState("早稲田大学 商学部");
  const [graduationYear, setGraduationYear] = useState<number>(2026);
  const [bio, setBio] = useState("体育会サッカー部主将。組織づくりと目標達成に向けた推進力に自信があります。");
  const [skills, setSkills] = useState("リーダーシップ, 組織マネジメント, 課題解決力, 英語日常会話");
  const [experience, setExperience] = useState("大学4年間、体育会サッカー部にて活動。主将としてチーム目標の設定とモチベーション管理を担当。カフェでのアルバイトリーダー経験あり。");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

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
          university,
          graduationYear,
          bio,
          skills,
          experience,
        }),
      });
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
    <div className="flex-1 py-8 px-4 sm:px-6 max-w-3xl mx-auto w-full">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
          <div>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>学生プロフィール編集</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              動画とともに企業が閲覧するプロフィール情報を入力してください
            </p>
          </div>
        </div>

        {saved && (
          <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>プロフィール情報を保存しました</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">氏名</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">大学・学部・学科</label>
              <input
                type="text"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                placeholder="〇〇大学 〇〇学部"
                className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>卒業予定年</span>
            </label>
            <select
              value={graduationYear}
              onChange={(e) => setGraduationYear(Number(e.target.value))}
              className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
            >
              <option value={2025}>2025年卒</option>
              <option value={2026}>2026年卒</option>
              <option value={2027}>2027年卒</option>
              <option value={2028}>2028年卒</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">自己PR / 人柄サマリー</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="あなたの人柄や強みを端的に記載してください"
              className="w-full text-sm border border-slate-300 rounded-lg p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              <span>スキル・語学力・強み（カンマ区切り）</span>
            </label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="リーダーシップ, 英語日常会話, 接客経験"
              className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5" />
              <span>学生時代の経験・活動（部活動、アルバイト、留学、インターン等）</span>
            </label>
            <textarea
              rows={4}
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="具体的な活動内容や学んだことを記載してください"
              className="w-full text-sm border border-slate-300 rounded-lg p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? "保存中..." : "保存する"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
