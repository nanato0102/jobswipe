"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Tag, User, GraduationCap, Video, ArrowRight, Play, X, Heart, Send } from "lucide-react";

interface SearchStudent {
  id: string;
  name: string;
  university: string;
  graduationYear: number;
  tags: string[];
  videoTitle: string;
  videoUrl: string;
  bio: string;
}

const ALL_STUDENTS: SearchStudent[] = [
  {
    id: "s1",
    name: "佐藤 健太",
    university: "早稲田大学 商学部",
    graduationYear: 2026,
    tags: ["体育会", "リーダーシップ", "粘り強さ", "行動力"],
    videoTitle: "体育会サッカー部主将 / チームを牽引する行動力",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    bio: "体育会サッカー部主将。組織づくりと目標達成に向けた推進力に自信があります。",
  },
  {
    id: "s2",
    name: "高橋 美咲",
    university: "上智大学 外国語学部",
    graduationYear: 2026,
    tags: ["留学経験", "英語対応可", "笑顔", "コミュニケーション"],
    videoTitle: "1年間のカナダ留学と英語でのプレゼンテーション力",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    bio: "カナダ留学経験者。TOEIC 920点。異文化コミュニケーションと明るい接客が得意です。",
  },
  {
    id: "s3",
    name: "中村 蓮",
    university: "東京工業大学 情報理工学院",
    graduationYear: 2026,
    tags: ["エンジニア志望", "Web開発", "ハッカソン", "好奇心旺盛"],
    videoTitle: "Webアプリ開発とハッカソン優勝経験",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    bio: "大学でフルスタック開発を学習中。技育CAMPハッカソン優秀賞受賞。",
  },
];

const POPULAR_TAGS = ["笑顔", "英語対応可", "体育会", "リーダーシップ", "エンジニア志望", "留学経験", "Web開発"];

export default function CompanySearchPage() {
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [previewStudent, setPreviewStudent] = useState<SearchStudent | null>(null);

  const filteredStudents = ALL_STUDENTS.filter((student) => {
    const matchesTag = selectedTag ? student.tags.includes(selectedTag) : true;
    const matchesQuery = query
      ? student.name.includes(query) ||
        student.university.includes(query) ||
        student.tags.some((t) => t.includes(query)) ||
        student.bio.includes(query)
      : true;
    return matchesTag && matchesQuery;
  });

  return (
    <div className="flex-1 py-6 px-4 sm:px-6 max-w-4xl mx-auto w-full">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Search className="w-5 h-5 text-emerald-700" />
          <span>学生タグ・キーワード検索</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          特徴タグや人柄キーワードから求める学生を直接検索し、動画をその場で再生できます
        </p>
      </div>

      {/* 検索バー */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="学生名、大学名、人柄キーワードを入力..."
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
          />
        </div>

        {/* 人気タグ */}
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2 font-medium">
            <Tag className="w-3.5 h-3.5 text-emerald-700" />
            <span>タグで絞り込む:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedTag(null)}
              className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
                selectedTag === null
                  ? "bg-slate-900 text-white font-semibold shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              すべて
            </button>
            {POPULAR_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
                  selectedTag === tag
                    ? "bg-emerald-700 text-white font-semibold shadow-sm"
                    : "bg-emerald-50 text-emerald-800 border border-emerald-200/60 hover:bg-emerald-100"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 検索結果一覧 */}
      <div className="space-y-4">
        <div className="text-xs text-slate-500 font-semibold flex items-center justify-between">
          <span>検索結果: {filteredStudents.length} 名</span>
        </div>

        {filteredStudents.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500 text-sm">
            該当する学生が見つかりませんでした。条件を変えてお試しください。
          </div>
        ) : (
          filteredStudents.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-base flex items-center gap-1.5">
                    <User className="w-4 h-4 text-slate-500" />
                    {student.name}
                  </span>
                  <span className="text-xs text-slate-500">{student.university}</span>
                  <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                    {student.graduationYear}年卒
                  </span>
                </div>

                <div className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{student.videoTitle}</span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  {student.bio}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {student.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setPreviewStudent(student)}
                  className="flex-1 sm:flex-initial px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm whitespace-nowrap"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>動画を見る</span>
                </button>
                <Link
                  href="/swipe"
                  className="flex-1 sm:flex-initial px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                >
                  <span>スワイプへ</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 動画ポップアッププレビューモーダル */}
      {previewStudent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white rounded-3xl overflow-hidden max-w-sm w-full shadow-2xl border border-slate-800 flex flex-col">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">{previewStudent.name} さんのPR動画</h3>
                <p className="text-xs text-slate-400">{previewStudent.university}</p>
              </div>
              <button
                onClick={() => setPreviewStudent(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-[9/16] bg-black max-h-[60vh] flex items-center justify-center">
              <video
                src={previewStudent.videoUrl}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 bg-slate-900 border-t border-slate-800 flex gap-2">
              <Link
                href="/swipe"
                className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>スワイプでオファーする</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}