"use client";

import { useState } from "react";
import RoleGuard from "@/components/RoleGuard";
import {
  ShieldCheck,
  Users,
  Building2,
  Send,
  Film,
  TrendingUp,
  Trash2,
  Play,
  X,
  CheckCircle,
  Search,
  AlertTriangle,
  UserX,
  Lock,
} from "lucide-react";

interface AdminVideoItem {
  id: string;
  studentName: string;
  university: string;
  title: string;
  videoUrl: string;
  uploadedAt: string;
  reported: boolean;
}

interface AdminUserItem {
  id: string;
  email: string;
  name: string;
  type: "STUDENT" | "COMPANY";
  detail: string;
  createdAt: string;
  status: "ACTIVE" | "SUSPENDED";
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"kpi" | "videos" | "users">("kpi");

  // KPIデータ
  const [stats, setStats] = useState({
    studentsCount: 124,
    companiesCount: 38,
    offersCount: 89,
    acceptedCount: 52,
  });

  // 動画モデレーション用
  const [videoList, setVideoList] = useState<AdminVideoItem[]>([
    {
      id: "v-1",
      studentName: "佐藤 健太",
      university: "早稲田大学 商学部",
      title: "体育会サッカー部主将としての挑戦と組織推進力",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      uploadedAt: "2026/08/29 11:20",
      reported: false,
    },
    {
      id: "v-2",
      studentName: "高橋 美咲",
      university: "上智大学 外国語学部",
      title: "1年間のカナダ留学と英語プレゼンテーション",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      uploadedAt: "2026/08/28 17:40",
      reported: false,
    },
    {
      id: "v-3",
      studentName: "田中 翔平",
      university: "慶應義塾大学 理工学部",
      title: "個人開発したWebサービスのデモと今後の展望",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      uploadedAt: "2026/08/28 09:15",
      reported: true,
    },
  ]);

  // ユーザー管理用
  const [userList, setUserList] = useState<AdminUserItem[]>([
    {
      id: "u-1",
      email: "student@jobswipe.jp",
      name: "佐藤 健太",
      type: "STUDENT",
      detail: "早稲田大学 商学部 2026卒",
      createdAt: "2026/08/25",
      status: "ACTIVE",
    },
    {
      id: "u-2",
      email: "recruiter@cyber-innov.jp",
      name: "株式会社サイバー・イノベーション",
      type: "COMPANY",
      detail: "IT / Webサービス（150名）",
      createdAt: "2026/08/26",
      status: "ACTIVE",
    },
    {
      id: "u-3",
      email: "takahashi@example.com",
      name: "高橋 美咲",
      type: "STUDENT",
      detail: "上智大学 外国語学部 2026卒",
      createdAt: "2026/08/27",
      status: "ACTIVE",
    },
  ]);

  const [previewVideoUrl, setPreviewVideoUrl] = useState<string | null>(null);
  const [userSearch, setUserSearch] = useState("");
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const handleDeleteVideo = (id: string) => {
    setVideoList(videoList.filter((v) => v.id !== id));
    setActionSuccess("不適切動画を削除しました。");
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const handleToggleUserStatus = (id: string) => {
    setUserList(
      userList.map((u) =>
        u.id === id ? { ...u, status: u.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE" } : u
      )
    );
    setActionSuccess("ユーザーのアカウント状態を変更しました。");
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const filteredUsers = userList.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.detail.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <RoleGuard allowedRoles={["ADMIN"]}>
      <div className="flex-1 py-6 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-6">
        {/* ヘッダー */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-50 text-rose-800 text-[11px] font-bold border border-rose-200 mb-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
                <span>システム管理者ダッシュボード</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">JobSwipe 管理コンソール</h1>
              <p className="text-xs text-slate-500 mt-1">
                KPI数値の分析、投稿動画のモデレーション（監視・削除）、登録ユーザーのアカウント管理を行えます
              </p>
            </div>

            {/* タブ切り替えボタン */}
            <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 self-start">
              <button
                type="button"
                onClick={() => setActiveTab("kpi")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "kpi" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                主要KPI概要
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("videos")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "videos" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                動画監視・削除
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("users")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "users" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                ユーザー管理
              </button>
            </div>
          </div>

          {actionSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>{actionSuccess}</span>
            </div>
          )}
        </div>

        {/* ================= 1. KPI概要タブ ================= */}
        {activeTab === "kpi" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <p className="text-xs text-slate-500 font-semibold">登録学生数</p>
                <p className="text-2xl sm:text-3xl font-black text-slate-900">{stats.studentsCount} 名</p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <p className="text-xs text-slate-500 font-semibold">登録企業数</p>
                <p className="text-2xl sm:text-3xl font-black text-slate-900">{stats.companiesCount} 社</p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                  <Send className="w-5 h-5" />
                </div>
                <p className="text-xs text-slate-500 font-semibold">総オファー送信数</p>
                <p className="text-2xl sm:text-3xl font-black text-slate-900">{stats.offersCount} 件</p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <p className="text-xs text-slate-500 font-semibold">マッチング（承諾）数</p>
                <p className="text-2xl sm:text-3xl font-black text-slate-900">{stats.acceptedCount} 組</p>
              </div>
            </div>
          </div>
        )}

        {/* ================= 2. 動画監視・削除モデレーションタブ ================= */}
        {activeTab === "videos" && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Film className="w-4 h-4 text-emerald-700" />
                <span>投稿動画モデレーション一覧（{videoList.length}件）</span>
              </h2>
              <p className="text-xs text-slate-500">不適切な動画や規約違反コンテンツをプレビュー確認し、即時削除できます</p>
            </div>

            <div className="space-y-3">
              {videoList.map((video) => (
                <div
                  key={video.id}
                  className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    video.reported ? "bg-rose-50/50 border-rose-200" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{video.studentName}</span>
                      <span className="text-xs text-slate-500">（{video.university}）</span>
                      {video.reported && (
                        <span className="text-[10px] bg-rose-100 text-rose-700 font-bold px-2 py-0.5 rounded-full border border-rose-200 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          <span>通報あり</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-bold text-slate-700">{video.title}</p>
                    <p className="text-[11px] text-slate-400">投稿日時: {video.uploadedAt}</p>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      type="button"
                      onClick={() => setPreviewVideoUrl(video.videoUrl)}
                      className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <Play className="w-3.5 h-3.5 fill-slate-700" />
                      <span>動画再生</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteVideo(video.id)}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>不適切動画を削除</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= 3. ユーザーアカウント管理タブ ================= */}
        {activeTab === "users" && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-700" />
                  <span>登録ユーザーアカウント管理（{filteredUsers.length}件）</span>
                </h2>
                <p className="text-xs text-slate-500">学生・企業のアカウント状態（有効 / 停止）の管理が可能です</p>
              </div>

              {/* 検索入力 */}
              <div className="relative max-w-xs w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="ユーザー名、メール、詳細"
                  className="w-full text-xs border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold">
                    <th className="py-2.5 px-3">氏名 / 企業名</th>
                    <th className="py-2.5 px-3">種別</th>
                    <th className="py-2.5 px-3">メールアドレス</th>
                    <th className="py-2.5 px-3">属性 / 詳細</th>
                    <th className="py-2.5 px-3">登録日</th>
                    <th className="py-2.5 px-3">状態</th>
                    <th className="py-2.5 px-3 text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-bold text-slate-900">{user.name}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            user.type === "STUDENT"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {user.type === "STUDENT" ? "学生" : "企業"}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-600">{user.email}</td>
                      <td className="py-3 px-3 text-slate-600">{user.detail}</td>
                      <td className="py-3 px-3 text-slate-400">{user.createdAt}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            user.status === "ACTIVE"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-rose-50 text-rose-700 border border-rose-200"
                          }`}
                        >
                          {user.status === "ACTIVE" ? "有効" : "利用停止中"}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          type="button"
                          onClick={() => handleToggleUserStatus(user.id)}
                          className={`px-3 py-1.5 rounded-lg font-bold text-[11px] transition-colors border ${
                            user.status === "ACTIVE"
                              ? "text-rose-600 border-rose-200 hover:bg-rose-50"
                              : "text-emerald-700 border-emerald-200 hover:bg-emerald-50"
                          }`}
                        >
                          {user.status === "ACTIVE" ? "アカウント停止" : "停止解除"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= 動画プレビューモーダル ================= */}
        {previewVideoUrl && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 rounded-3xl border border-slate-800 max-w-sm w-full overflow-hidden shadow-2xl p-4 text-white space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-emerald-400">管理者モデレーション再生</span>
                <button
                  onClick={() => setPreviewVideoUrl(null)}
                  className="p-1 rounded-full text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="rounded-2xl overflow-hidden bg-black aspect-[9/16] max-h-96 mx-auto">
                <video src={previewVideoUrl} controls autoPlay className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        )}
      </div>
    </RoleGuard>
  );
}