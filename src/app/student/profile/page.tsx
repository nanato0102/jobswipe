"use client";

import React, { useState, useEffect, KeyboardEvent } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import RoleGuard from "@/components/RoleGuard";
import StudentMobileTabs from "@/components/StudentMobileTabs";
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
} from "lucide-react";

interface TagInputProps {
  label: string;
  placeholder: string;
  tags: string[];
  setTags: (tags: string[]) => void;
  helperText?: string;
  quickTags?: string[];
}

function TagInput({ label, placeholder, tags, setTags, helperText, quickTags }: TagInputProps) {
  const [inputVal, setInputVal] = useState("");

  const handleAdd = (textToAdd?: string) => {
    const target = (textToAdd || inputVal).trim();
    if (target && !tags.includes(target)) {
      setTags([...tags, target]);
      if (!textToAdd) setInputVal("");
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
      
      {/* 選択済みタグバッジ */}
      <div className="flex flex-wrap gap-1.5 mb-2 min-h-[32px]">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-900 border border-emerald-300 rounded-full text-xs font-bold shadow-sm"
          >
            <span>#{tag}</span>
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              className="text-emerald-700 hover:text-emerald-950 p-0.5 rounded-full hover:bg-emerald-200 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        {tags.length === 0 && (
          <span className="text-xs text-slate-400 py-1">未登録です。以下の候補から選ぶか、入力して追加してください</span>
        )}
      </div>

      {/* クイック選択タグ候補 */}
      {quickTags && quickTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {quickTags.map((qt) => {
            const isSelected = tags.includes(qt);
            return (
              <button
                key={qt}
                type="button"
                onClick={() => (isSelected ? handleRemove(tags.indexOf(qt)) : handleAdd(qt))}
                className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                  isSelected
                    ? "bg-emerald-700 text-white border-emerald-700"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:border-emerald-500 hover:text-emerald-800"
                }`}
              >
                + #{qt}
              </button>
            );
          })}
        </div>
      )}

      {/* 直接入力フィールド */}
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
          onClick={() => handleAdd()}
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
  const [activeTab, setActiveTab] = useState<"basic" | "tags">("basic");

  // 基本情報
  const [fullName, setFullName] = useState(session?.name || "佐藤 健太");
  const [university, setUniversity] = useState("早稲田大学");
  const [graduationYear, setGraduationYear] = useState<number>(2027);
  const [catchphrase, setCatchphrase] = useState("笑顔と前向きな行動力で、チームを明るく牽引します！");

  // 人柄・強みタグ（動画を補足する直感キーワード）
  const [personalityTags, setPersonalityTags] = useState<string[]>([
    "笑顔",
    "行動力",
    "粘り強さ",
    "チームワーク",
    "体育会系",
  ]);

  // 希望業界・勤務地
  const [desiredIndustries, setDesiredIndustries] = useState<string[]>([
    "IT・Webサービス",
    "ベンチャー・スタートアップ",
    "総合営業・セールス",
  ]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([
    "東京都",
    "神奈川県",
    "リモートワーク可",
  ]);

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
          university,
          graduationYear,
          bio: catchphrase,
          skills: personalityTags.join(", "),
          experience: desiredIndustries.join(", "),
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

  const quickPersonalityList = [
    "笑顔",
    "ポジティブ",
    "行動力",
    "粘り強さ",
    "素直さ",
    "探求心",
    "コミュニケーション力",
    "チームワーク",
    "体育会系",
    "英語対応可",
    "リーダーシップ",
    "傾聴力",
  ];

  const quickIndustryList = [
    "IT・Webサービス",
    "ベンチャー・スタートアップ",
    "美容・コスメ",
    "アパレル・ファッション",
    "広告・PR・メディア",
    "総合商社・専門商社",
    "不動産・建設",
    "人材・コンサルティング",
    "エンタメ・イベント",
    "飲食・フードサービス",
    "メーカー・日用品",
  ];

  return (
    <RoleGuard allowedRoles={["STUDENT", "ADMIN"]}>
      <StudentMobileTabs>
        <div className="flex-1 py-6 sm:py-10 px-4 sm:px-6 max-w-3xl mx-auto w-full">
        <div className="bg-white rounded-xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
          {/* ヘッダー */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                <User className="w-6 h-6 text-emerald-700" />
                <span>プロフィール</span>
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                長文のESや自己PRは一切不要です。基本情報と人柄タグを設定してください。
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/student/video"
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200 transition-colors"
              >
                <Video className="w-4 h-4 text-emerald-700" />
                <span>動画投稿へ</span>
              </Link>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-1.5 px-5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg transition-all disabled:opacity-50 shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>{loading ? "保存中..." : "保存"}</span>
              </button>
            </div>
          </div>

          {/* 保存成功メッセージ */}
          {saved && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fade-in shadow-sm">
              <CheckCircle className="w-4 h-4 flex-shrink-0 text-emerald-700" />
              <span>プロフィールを保存しました！動画を投稿してオファーを待ちましょう。</span>
            </div>
          )}

          {/* 動画投稿リマインダーバナー */}
          <div className="p-4 bg-slate-900 border border-slate-800 text-white rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-950/80 text-emerald-400 flex items-center justify-center border border-emerald-800/50 flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-white">あなたの最大の武器は「短尺動画」です</p>
                <p className="text-xs text-slate-300">
                  スマホで自撮りした動画を1本置くだけで、企業から直接オファーが届きます。
                </p>
              </div>
            </div>
            <Link
              href="/student/video"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 whitespace-nowrap shadow-sm transition-all"
            >
              <span>動画を投稿・確認</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* タブナビゲーション */}
          <div className="flex border-b border-slate-200 gap-6">
            <button
              type="button"
              onClick={() => setActiveTab("basic")}
              className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === "basic"
                  ? "border-emerald-700 text-emerald-800"
                  : "border-transparent text-slate-400 hover:text-slate-700"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>1. 基本情報・大学</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("tags")}
              className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === "tags"
                  ? "border-emerald-700 text-emerald-800"
                  : "border-transparent text-slate-400 hover:text-slate-700"
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>2. 人柄タグ ＆ 興味のある業界</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 pt-2">
            {/* ================= タブ1: 基本情報・大学 ================= */}
            {activeTab === "basic" && (
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">氏名</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="佐藤 健太"
                    className="w-full text-sm border border-slate-300 rounded-lg px-3.5 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 font-medium"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">大学名</label>
                    <input
                      type="text"
                      required
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      placeholder="早稲田大学"
                      className="w-full text-sm border border-slate-300 rounded-lg px-3.5 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">卒業年</label>
                    <select
                      value={graduationYear}
                      onChange={(e) => setGraduationYear(Number(e.target.value))}
                      className="w-full text-sm border border-slate-300 rounded-lg px-3.5 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white font-medium"
                    >
                      <option value={2027}>2027年3月 卒業（27卒）</option>
                      <option value={2028}>2028年3月 卒業（28卒）</option>
                      <option value={2029}>2029年3月 卒業（29卒）</option>
                      <option value={2030}>2030年3月 卒業（30卒）</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ひとことスローガン（キャッチコピー）
                  </label>
                  <input
                    type="text"
                    value={catchphrase}
                    onChange={(e) => setCatchphrase(e.target.value)}
                    placeholder="例: 笑顔と前向きな行動力で、チームを明るく牽引します！"
                    className="w-full text-sm border border-slate-300 rounded-lg px-3.5 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 font-medium"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    企業がスワイプする際に、動画の下に表示される1行のキャッチコピーです。
                  </p>
                </div>
              </div>
            )}

            {/* ================= タブ2: 人柄タグ ＆ 興味のある業界 ================= */}
            {activeTab === "tags" && (
              <div className="space-y-6">
                {/* 人柄・強みタグ */}
                <TagInput
                  label="あなたの人柄・強みタグ（複数選択可）"
                  placeholder="タグを入力して追加（例: 笑顔、行動力、探求心）"
                  tags={personalityTags}
                  setTags={setPersonalityTags}
                  quickTags={quickPersonalityList}
                  helperText="動画を直感的に表すタグです。企業の検索やスワイプ画面で表示されます。"
                />

                <hr className="border-slate-100" />

                {/* 興味のある業界 */}
                <TagInput
                  label="興味のある業界・分野（複数選択可）"
                  placeholder="業界を入力して追加（例: IT・Web、美容、広告）"
                  tags={desiredIndustries}
                  setTags={setDesiredIndustries}
                  quickTags={quickIndustryList}
                  helperText="希望する業界の採用担当者からオファーが届きやすくなります。"
                />

                <hr className="border-slate-100" />

                {/* 希望勤務地 */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                    <span>希望勤務地（複数選択可）</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "東京都",
                      "神奈川県",
                      "千葉県",
                      "埼玉県",
                      "大阪府",
                      "京都府",
                      "愛知県",
                      "福岡県",
                      "全国どこでも可",
                      "リモートワーク可",
                    ].map((pref) => {
                      const isSelected = selectedLocations.includes(pref);
                      return (
                        <button
                          key={pref}
                          type="button"
                          onClick={() => toggleLocation(pref)}
                          className={`text-xs px-3 py-1 rounded-md border font-semibold transition-all ${
                            isSelected
                              ? "bg-emerald-700 text-white border-emerald-700 shadow-2xs"
                              : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          {isSelected ? "✓ " : "+ "}
                          {pref}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* 保存ボタン */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 py-2.5 bg-emerald-700 hover:bg-emerald-600 active:scale-95 text-white text-sm font-bold rounded-lg transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>{loading ? "保存中..." : "変更を保存する"}</span>
              </button>
            </div>
          </form>
        </div>
        </div>
      </StudentMobileTabs>
    </RoleGuard>
  );
}
