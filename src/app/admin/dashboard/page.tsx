"use client";

import { useState } from "react";
import { ShieldCheck, Users, Building2, Film, Send, Trash2, Eye, CheckCircle } from "lucide-react";

interface AdminStat {
  label: string;
  value: number;
  change: string;
  icon: typeof Users;
}

const STATS: AdminStat[] = [
  { label: "学生登録数", value: 1240, change: "+12% 先月比", icon: Users },
  { label: "企業登録数", value: 86, change: "+5社 今月", icon: Building2 },
  { label: "投稿動画数", value: 1450, change: "+95本 今週", icon: Film },
  { label: "オファー送信総数", value: 3120, change: "+24% 成長率", icon: Send },
];

const VIDEOS_TO_REVIEW = [
  {
    id: "vid-101",
    studentName: "佐藤 健太",
    title: "体育会サッカー部主将 / チームを牽引する行動力",
    uploadedAt: "2026/08/28",
    status: "APPROVED",
  },
  {
    id: "vid-102",
    studentName: "高橋 美咲",
    title: "1年間のカナダ留学と英語でのプレゼンテーション力",
    uploadedAt: "2026/08/27",
    status: "APPROVED",
  },
  {
    id: "vid-103",
    studentName: "山田 太郎",
    title: "カフェ接客での売上貢献と笑顔のサービス",
    uploadedAt: "2026/08/26",
    status: "PENDING",
  },
];

export default function AdminDashboardPage() {
  const [videos, setVideos] = useState(VIDEOS_TO_REVIEW);

  const handleDelete = (id: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <div className="flex-1 py-8 px-4 sm:px-6 max-w-6xl mx-auto w-full">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" />
            <span>JobSwipe 管理ダッシュボード</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            プラットフォーム全体のKPI状況と投稿コンテンツの監視
          </p>
        </div>

        <span className="text-xs bg-slate-900 text-white px-3 py-1.5 rounded-lg font-medium">
          管理者権限モード
        </span>
      </div>

      {/* KPIカード一覧 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-500 font-medium">{stat.label}</span>
                <div className="p-2 bg-slate-100 rounded-lg text-slate-700">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-slate-900">
                {stat.value.toLocaleString()}
              </div>
              <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
                {stat.change}
              </span>
            </div>
          );
        })}
      </div>

      {/* 動画コンテンツ監視テーブル */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Film className="w-4 h-4" />
            <span>投稿動画の監視・コンテンツ管理</span>
          </h2>
          <span className="text-xs text-slate-500">最新3件を表示中</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase border-b border-slate-100">
              <tr>
                <th className="p-3.5">学生氏名</th>
                <th className="p-3.5">動画タイトル</th>
                <th className="p-3.5">投稿日</th>
                <th className="p-3.5">ステータス</th>
                <th className="p-3.5 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {videos.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50">
                  <td className="p-3.5 font-semibold text-slate-900">{v.studentName}</td>
                  <td className="p-3.5 text-slate-700">{v.title}</td>
                  <td className="p-3.5 text-slate-500">{v.uploadedAt}</td>
                  <td className="p-3.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${
                        v.status === "APPROVED"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {v.status === "APPROVED" ? (
                        <>
                          <CheckCircle className="w-3 h-3" /> 公開中
                        </>
                      ) : (
                        "確認中"
                      )}
                    </span>
                  </td>
                  <td className="p-3.5 text-right space-x-2">
                    <button
                      onClick={() => handleDelete(v.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                      title="削除"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
