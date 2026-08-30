"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import RoleGuard from "@/components/RoleGuard";
import { appStore, StoredInquiry, StoredReport } from "@/lib/appStore";
import { useToast } from "@/context/ToastContext";
import { useAuth } from "@/context/AuthContext";
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
  Mail,
  Download,
  Clock,
  CheckCircle2,
  FileSpreadsheet,
  ArrowUpRight,
  Sparkles,
  Eye,
  EyeOff,
  AlertOctagon,
  Globe,
  LogOut,
  ShieldAlert,
  Flag,
  Ban,
} from "lucide-react";

interface AdminVideoItem {
  id: string;
  studentName: string;
  university: string;
  title: string;
  videoUrl: string;
  uploadedAt: string;
  reported: boolean;
  status: "PUBLISHED" | "UNPUBLISHED";
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

export default function AdminConsoleDashboardPage() {
  const { logout } = useAuth();
  const { success, info, error } = useToast();
  const [activeTab, setActiveTab] = useState<"kpi" | "inquiries" | "reports" | "videos" | "users">("inquiries");

  // KPIデータ
  const [stats, setStats] = useState({
    studentsCount: 124,
    companiesCount: 38,
    offersCount: 89,
    acceptedCount: 52,
  });

  // お問い合わせデータ
  const [inquiries, setInquiries] = useState<StoredInquiry[]>([]);
  const [inquirySearch, setInquirySearch] = useState("");
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<"ALL" | "UNTOUCHED" | "IN_PROGRESS" | "RESOLVED">("ALL");
  const [inquiryTypeFilter, setInquiryTypeFilter] = useState<"ALL" | "student" | "company">("ALL");

  // 通報モデレーションデータ
  const [reports, setReports] = useState<StoredReport[]>([]);
  const [reportStatusFilter, setReportStatusFilter] = useState<"ALL" | "PENDING" | "RESOLVED" | "DISMISSED">("ALL");

  const loadReports = () => {
    setReports(appStore.getReports());
  };

  useEffect(() => {
    setInquiries(appStore.getInquiries());
    loadReports();
  }, []);

  const handleUpdateReportStatus = (reportId: string, status: StoredReport["status"], actionText?: string) => {
    appStore.updateReportStatus(reportId, status, actionText);
    loadReports();
    if (status === "RESOLVED") {
      success("通報への対処を完了として記録しました");
    } else if (status === "DISMISSED") {
      info("通報を却下（問題なし）としてクローズしました");
    }
  };

  const handleBanUser = (userId: string, userName: string, reportId?: string) => {
    if (!confirm(`ユーザー「${userName}」のアカウントを停止（BAN）しますか？`)) return;
    appStore.banUser(userId, "規約違反・通報によるアカウント停止");
    if (reportId) {
      appStore.updateReportStatus(reportId, "RESOLVED", "アカウント利用停止措置（BAN）を実施");
    }
    loadReports();
    success(`ユーザー「${userName}」をアカウント停止にしました`);
  };

  const handleHideVideo = (videoId: string, videoTitle: string, reportId?: string) => {
    if (!confirm(`動画「${videoTitle}」を非公開（削除扱い）にしますか？`)) return;
    appStore.hideVideo(videoId, "利用規約違反コンテンツのため非公開化");
    if (reportId) {
      appStore.updateReportStatus(reportId, "RESOLVED", "動画の非公開・削除措置を実施");
    }
    loadReports();
    success(`動画「${videoTitle}」を非公開に設定しました`);
  };

  // 動画モデレーション用
  const [videoList, setVideoList] = useState<AdminVideoItem[]>([
    {
      id: "v-1",
      studentName: "佐藤 健太",
      university: "早稲田大学 商学部",
      title: "体育会サッカー部主将としての挑戦と組織推進力",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      uploadedAt: "2026/08/29 12:00",
      reported: false,
      status: "PUBLISHED",
    },
    {
      id: "v-2",
      studentName: "田中 美咲",
      university: "慶應義塾大学 総合政策学部",
      title: "留学経験と多文化環境での課題解決プロジェクト",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      uploadedAt: "2026/08/28 17:30",
      reported: false,
      status: "PUBLISHED",
    },
    {
      id: "v-3",
      studentName: "高橋 翔太",
      university: "東京大学 工学部",
      title: "自作Webアプリ開発を通じたエンジニアリングへの情熱",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      uploadedAt: "2026/08/27 15:45",
      reported: true,
      status: "REPORTED" as any,
    },
  ]);

  // ユーザー管理用
  const [userList, setUserList] = useState<AdminUserItem[]>([
    {
      id: "u-1",
      email: "kenta.sato@example.com",
      name: "佐藤 健太",
      type: "STUDENT",
      detail: "早稲田大学 商学部 / 2026年卒",
      createdAt: "2026/08/25",
      status: "ACTIVE",
    },
    {
      id: "u-2",
      email: "recruit@cyber-innovation.example.com",
      name: "株式会社サイバー・イノベーション",
      type: "COMPANY",
      detail: "IT・Webサービス / 従業員150名",
      createdAt: "2026/08/20",
      status: "ACTIVE",
    },
    {
      id: "u-3",
      email: "misaki.tanaka@example.com",
      name: "田中 美咲",
      type: "STUDENT",
      detail: "慶應義塾大学 総合政策学部 / 2026年卒",
      createdAt: "2026/08/26",
      status: "ACTIVE",
    },
    {
      id: "u-4",
      email: "hr@global-tech.example.com",
      name: "グローバルテック株式会社",
      type: "COMPANY",
      detail: "AI・通信 / 従業員300名",
      createdAt: "2026/08/22",
      status: "ACTIVE",
    },
  ]);
  const [userSearch, setUserSearch] = useState("");
  const [userTypeFilter, setUserTypeFilter] = useState<"ALL" | "STUDENT" | "COMPANY">("ALL");

  const [previewVideo, setPreviewVideo] = useState<string | null>(null);

  // お問い合わせステータス更新
  const handleUpdateStatus = (id: string, newStatus: "UNTOUCHED" | "IN_PROGRESS" | "RESOLVED") => {
    const updated = appStore.updateInquiryStatus(id, newStatus);
    setInquiries(updated);
  };

  // Googleスプレッドシート用 CSVダウンロード
  const handleExportCSV = () => {
    const headers = [
      "受付番号",
      "受付日時",
      "種別",
      "会社名・学生名",
      "担当者名",
      "大学・学部",
      "メールアドレス",
      "電話番号",
      "お問い合わせ種別",
      "内容",
      "対応ステータス",
    ];

    const rows = filteredInquiries.map((item) => [
      `"${item.receiptNumber}"`,
      `"${item.createdAt}"`,
      `"${item.userType === "company" ? "企業" : "学生"}"`,
      `"${item.senderName}"`,
      `"${item.repName || ""}"`,
      `"${item.university || ""}"`,
      `"${item.email}"`,
      `"${item.phone || ""}"`,
      `"${item.inquiryType}"`,
      `"${item.message.replace(/"/g, '""').replace(/\n/g, " ")}"`,
      `"${item.status === "RESOLVED" ? "対応完了" : item.status === "IN_PROGRESS" ? "対応中" : "未対応"}"`,
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `jobswipe_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // フィルタリングされたお問い合わせ
  const filteredInquiries = inquiries.filter((item) => {
    const matchSearch =
      item.senderName.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      item.email.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      item.receiptNumber.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      item.message.toLowerCase().includes(inquirySearch.toLowerCase());

    const matchStatus =
      inquiryStatusFilter === "ALL" || item.status === inquiryStatusFilter;

    const matchType =
      inquiryTypeFilter === "ALL" || item.userType === inquiryTypeFilter;

    return matchSearch && matchStatus && matchType;
  });

  // フィルタリングされたユーザー一覧
  const filteredUsers = userList.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.detail.toLowerCase().includes(userSearch.toLowerCase());

    const matchType =
      userTypeFilter === "ALL" || u.type === userTypeFilter;

    return matchSearch && matchType;
  });

  return (
    <RoleGuard allowedRoles={["ADMIN"]}>
      <div className="flex-1 py-6 sm:py-10 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-6">
        {/* ================= ヘッダー ================= */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-rose-50 text-rose-800 text-[11px] font-bold border border-rose-200 mb-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>JobSwipe 管理者専用コンソール</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                統括管理ダッシュボード
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                お問い合わせの確認、Googleスプレッドシート連携、主要KPI、動画監視、ユーザー管理を行います
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                title="一般ユーザー向けトップページを別タブで開く"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>一般サイト(LP)を確認</span>
              </Link>
              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors cursor-pointer border border-rose-200"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>ログアウト</span>
              </button>
            </div>
          </div>

          {/* 管理タブ切り替え */}
          <div className="flex border-b border-slate-200 gap-2 sm:gap-6 pt-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`pb-3 text-xs sm:text-sm font-bold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
                activeTab === "inquiries"
                  ? "border-rose-600 text-rose-700 font-black"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>お問い合わせ管理</span>
              <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 text-[10px]">
                {inquiries.length}件
              </span>
            </button>

            <button
              onClick={() => setActiveTab("reports")}
              className={`pb-3 text-xs sm:text-sm font-bold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
                activeTab === "reports"
                  ? "border-rose-600 text-rose-700 font-black"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>通報・モデレーション</span>
              {reports.filter((r) => r.status === "PENDING").length > 0 ? (
                <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white font-bold text-[10px] animate-pulse">
                  未対応 {reports.filter((r) => r.status === "PENDING").length}件
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px]">
                  {reports.length}件
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("kpi")}
              className={`pb-3 text-xs sm:text-sm font-bold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
                activeTab === "kpi"
                  ? "border-rose-600 text-rose-700 font-black"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>KPIサマリー</span>
            </button>

            <button
              onClick={() => setActiveTab("videos")}
              className={`pb-3 text-xs sm:text-sm font-bold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
                activeTab === "videos"
                  ? "border-rose-600 text-rose-700 font-black"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <Film className="w-4 h-4" />
              <span>動画コンテンツ管理</span>
            </button>

            <button
              onClick={() => setActiveTab("users")}
              className={`pb-3 text-xs sm:text-sm font-bold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
                activeTab === "users"
                  ? "border-rose-600 text-rose-700 font-black"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>ユーザー管理</span>
            </button>
          </div>
        </div>

        {/* ================= 1. お問い合わせ管理タブ ================= */}
        {activeTab === "inquiries" && (
          <div className="space-y-6">
            {/* ツールバー */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 sm:p-5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              {/* 検索・フィルター */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={inquirySearch}
                    onChange={(e) => setInquirySearch(e.target.value)}
                    placeholder="送信元・メール・番号で検索..."
                    className="w-full text-xs border border-slate-300 rounded-lg pl-8 pr-3 py-1.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                {/* 企業 / 学生 フィルター */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setInquiryTypeFilter("ALL")}
                    className={`px-2.5 py-1 rounded-md text-xs font-bold transition-colors ${
                      inquiryTypeFilter === "ALL"
                        ? "bg-white text-slate-900 shadow-2xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    すべて
                  </button>
                  <button
                    type="button"
                    onClick={() => setInquiryTypeFilter("student")}
                    className={`px-2.5 py-1 rounded-md text-xs font-bold transition-colors ${
                      inquiryTypeFilter === "student"
                        ? "bg-emerald-600 text-white shadow-2xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    学生
                  </button>
                  <button
                    type="button"
                    onClick={() => setInquiryTypeFilter("company")}
                    className={`px-2.5 py-1 rounded-md text-xs font-bold transition-colors ${
                      inquiryTypeFilter === "company"
                        ? "bg-blue-600 text-white shadow-2xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    企業
                  </button>
                </div>

                {/* ステータスフィルター */}
                <div className="flex items-center gap-1 overflow-x-auto">
                  {(["ALL", "UNTOUCHED", "IN_PROGRESS", "RESOLVED"] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setInquiryStatusFilter(st)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                        inquiryStatusFilter === st
                          ? "bg-slate-900 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {st === "ALL"
                        ? "全対応"
                        : st === "UNTOUCHED"
                        ? "未対応"
                        : st === "IN_PROGRESS"
                        ? "対応中"
                        : "完了"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Googleスプレッドシート連携 / CSVエクスポート */}
              <div className="flex items-center gap-2 w-full lg:w-auto justify-end flex-shrink-0">
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="w-full lg:w-auto px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-2xs active:scale-95"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>CSV出力 ({filteredInquiries.length}件)</span>
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* お問い合わせカード一覧 */}
            <div className="space-y-4">
              {filteredInquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4 hover:shadow-sm transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          inq.userType === "company"
                            ? "bg-blue-50 text-blue-800 border border-blue-200"
                            : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        }`}
                      >
                        {inq.userType === "company" ? "企業" : "学生"}
                      </span>
                      <span className="text-xs font-bold text-slate-500">{inq.receiptNumber}</span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{inq.createdAt}</span>
                      </span>
                    </div>

                    {/* ステータスドロップダウン */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">対応状況:</span>
                      <select
                        value={inq.status}
                        onChange={(e) =>
                          handleUpdateStatus(
                            inq.id,
                            e.target.value as "UNTOUCHED" | "IN_PROGRESS" | "RESOLVED"
                          )
                        }
                        className={`text-xs font-bold px-2.5 py-1 rounded-md border focus:outline-none ${
                          inq.status === "UNTOUCHED"
                            ? "bg-rose-50 text-rose-800 border-rose-200"
                            : inq.status === "IN_PROGRESS"
                            ? "bg-amber-50 text-amber-800 border-amber-200"
                            : "bg-emerald-50 text-emerald-800 border-emerald-200"
                        }`}
                      >
                        <option value="UNTOUCHED">未対応</option>
                        <option value="IN_PROGRESS">対応中</option>
                        <option value="RESOLVED">対応完了</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <span className="text-slate-400 block font-medium">送信元情報</span>
                      <p className="font-bold text-slate-900 text-sm">{inq.senderName}</p>
                      {inq.repName && (
                        <p className="text-slate-600">
                          ご担当者: {inq.repName} ({inq.department || "未記入"})
                        </p>
                      )}
                      {inq.university && <p className="text-slate-600">学校: {inq.university}</p>}
                    </div>

                    <div className="space-y-1">
                      <span className="text-slate-400 block font-medium">連絡先</span>
                      <p className="text-slate-700">
                        メール:{" "}
                        <a href={`mailto:${inq.email}`} className="text-blue-700 hover:underline font-bold">
                          {inq.email}
                        </a>
                      </p>
                      {inq.phone && <p className="text-slate-700">電話番号: {inq.phone}</p>}
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-700 font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                      <span>【種別】 {inq.inquiryType}</span>
                    </div>
                    <p className="text-slate-800 whitespace-pre-wrap leading-relaxed pt-1">
                      {inq.message}
                    </p>
                  </div>
                </div>
              ))}

              {filteredInquiries.length === 0 && (
                <div className="bg-white p-12 rounded-xl border border-slate-200 text-center text-slate-400 text-xs shadow-xs">
                  該当するお問い合わせは見つかりませんでした。
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= 🚨 通報・モデレーション管理タブ ================= */}
        {activeTab === "reports" && (
          <div className="space-y-4">
            {/* フィルターバー */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>ステータス:</span>
                </span>
                <div className="flex items-center gap-1">
                  {(["ALL", "PENDING", "RESOLVED", "DISMISSED"] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setReportStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        reportStatusFilter === st
                          ? "bg-slate-900 text-white shadow-2xs"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {st === "ALL"
                        ? "すべて"
                        : st === "PENDING"
                        ? "未対応"
                        : st === "RESOLVED"
                        ? "対応済"
                        : "却下"}
                    </button>
                  ))}
                </div>
              </div>

              <span className="text-xs font-bold text-slate-500">
                通報総数: {reports.length}件 (未対応: {reports.filter((r) => r.status === "PENDING").length}件)
              </span>
            </div>

            {/* 通報カードリスト */}
            <div className="space-y-3">
              {reports
                .filter((r) => reportStatusFilter === "ALL" || r.status === reportStatusFilter)
                .map((rep) => {
                  const isPending = rep.status === "PENDING";
                  const isResolved = rep.status === "RESOLVED";

                  return (
                    <div
                      key={rep.id}
                      className={`bg-white rounded-2xl border shadow-xs p-5 sm:p-6 space-y-4 transition-all ${
                        isPending
                          ? "border-rose-300 ring-2 ring-rose-500/10"
                          : "border-slate-200"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${
                              isPending
                                ? "bg-rose-100 text-rose-800 border border-rose-200"
                                : isResolved
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            <ShieldAlert className="w-3.5 h-3.5" />
                            <span>
                              {isPending ? "🚨 未対応の通報" : isResolved ? "✅ 対応完了" : "🚫 却下（問題なし）"}
                            </span>
                          </span>

                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                            対象: {rep.targetType === "VIDEO" ? "自己PR動画" : rep.targetType === "CHAT" ? "チャット" : "ユーザー"}
                          </span>

                          <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                            {rep.reasonText}
                          </span>
                        </div>

                        <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap">
                          通報日時: {rep.createdAt}
                        </span>
                      </div>

                      {/* 対象 & 通報理由サマリー */}
                      <div className="grid sm:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <div className="space-y-1">
                          <span className="text-slate-400 font-medium">通報対象コンテンツ:</span>
                          <p className="font-bold text-slate-900 text-sm">{rep.targetTitle}</p>
                          {rep.targetPreview && (
                            <p className="text-slate-600 italic">「{rep.targetPreview}」</p>
                          )}
                        </div>

                        <div className="space-y-1">
                          <span className="text-slate-400 font-medium">通報者:</span>
                          <p className="font-bold text-slate-800">{rep.reporterName}</p>
                          <span className="text-slate-400 font-medium block pt-1">通報理由詳細:</span>
                          <p className="text-slate-800 whitespace-pre-wrap">{rep.details}</p>
                        </div>
                      </div>

                      {/* 過去に実施した措置 */}
                      {rep.actionTaken && (
                        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 space-y-0.5">
                          <span className="font-bold">実施済みの措置:</span>
                          <p>{rep.actionTaken}</p>
                        </div>
                      )}

                      {/* 管理者アクションボタン群 */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 flex-wrap gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          {rep.targetType === "VIDEO" && (
                            <button
                              type="button"
                              onClick={() => handleHideVideo(rep.targetId, rep.targetTitle, rep.id)}
                              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
                            >
                              <EyeOff className="w-3.5 h-3.5" />
                              <span>動画を即時非公開にする</span>
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => handleBanUser(rep.targetId, rep.targetTitle, rep.id)}
                            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
                          >
                            <Ban className="w-3.5 h-3.5 text-rose-400" />
                            <span>アカウントを停止（BAN）する</span>
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleUpdateReportStatus(rep.id, "DISMISSED", "内容精査の結果、利用規約違反には該当しないと判断")}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-bold transition-colors"
                          >
                            問題なし（却下）
                          </button>

                          <button
                            type="button"
                            onClick={() => handleUpdateReportStatus(rep.id, "RESOLVED", "警告および是正措置の実施")}
                            className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>対応完了とする</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

              {reports.length === 0 && (
                <div className="bg-white p-12 rounded-xl border border-slate-200 text-center text-slate-400 text-xs shadow-xs">
                  現在、通報されたコンテンツはありません。プラットフォームは健全に保たれています。
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= 2. KPIサマリータブ ================= */}
        {activeTab === "kpi" && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">登録学生数</span>
                <Users className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-3xl font-bold tracking-tight text-slate-900">{stats.studentsCount} 名</p>
              <p className="text-[11px] text-emerald-700 font-bold">前週比 +12%</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">登録企業数</span>
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-3xl font-bold tracking-tight text-slate-900">{stats.companiesCount} 社</p>
              <p className="text-[11px] text-blue-700 font-bold">前週比 +4社</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">総オファー数</span>
                <Send className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-3xl font-bold tracking-tight text-slate-900">{stats.offersCount} 件</p>
              <p className="text-[11px] text-purple-700 font-bold">今月目標の 89%</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">マッチング成立数</span>
                <CheckCircle className="w-5 h-5 text-amber-600" />
              </div>
              <p className="text-3xl font-bold tracking-tight text-slate-900">{stats.acceptedCount} 組</p>
              <p className="text-[11px] text-amber-700 font-bold">承諾率 58.4%</p>
            </div>
          </div>
        )}

        {/* ================= 3. 動画コンテンツ管理タブ ================= */}
        {activeTab === "videos" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">公開中PR動画の監視・モデレーション</h2>
                <p className="text-xs text-slate-500">不適切な動画や通報動画をワンクリックで非公開化・削除できます</p>
              </div>
              <span className="text-xs text-slate-500 font-bold">動画数: {videoList.length}本</span>
            </div>

            <div className="divide-y divide-slate-100">
              {videoList.map((v) => (
                <div key={v.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-900 text-sm">{v.studentName}</span>
                      <span className="text-slate-500">({v.university})</span>

                      {/* ステータスバッジ */}
                      {v.status === "UNPUBLISHED" ? (
                        <span className="px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 font-bold text-[10px] flex items-center gap-1">
                          <EyeOff className="w-3 h-3" />
                          非公開中
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          公開中
                        </span>
                      )}

                      {v.reported && (
                        <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 font-bold text-[10px] flex items-center gap-1">
                          <AlertOctagon className="w-3 h-3" />
                          通報あり
                        </span>
                      )}
                    </div>
                    <p className="text-slate-700 font-medium">{v.title}</p>
                    <span className="text-[11px] text-slate-400">投稿日時: {v.uploadedAt}</span>
                  </div>

                  {/* モデレーション操作ボタングループ */}
                  <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
                    {/* 再生プレビュー */}
                    <button
                      type="button"
                      onClick={() => setPreviewVideo(v.videoUrl)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                      title="動画をプレビュー"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>再生</span>
                    </button>

                    {/* ワンクリック非公開化 / 公開復帰 */}
                    {v.status === "UNPUBLISHED" ? (
                      <button
                        type="button"
                        onClick={() => {
                          setVideoList(
                            videoList.map((item) =>
                              item.id === v.id ? { ...item, status: "PUBLISHED", reported: false } : item
                            )
                          );
                          success("動画を再公開しました", `${v.studentName} さんの動画を公開状態に戻しました。`);
                        }}
                        className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-lg flex items-center gap-1 border border-emerald-200 transition-colors cursor-pointer"
                        title="動画を公開に戻す"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>公開に戻す</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setVideoList(
                            videoList.map((item) =>
                              item.id === v.id ? { ...item, status: "UNPUBLISHED" } : item
                            )
                          );
                          info("動画を非公開に設定しました", `${v.studentName} さんの動画の公開を停止しました。`);
                        }}
                        className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold rounded-lg flex items-center gap-1 border border-amber-200 transition-colors cursor-pointer"
                        title="動画を一時非公開にする"
                      >
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>非公開にする</span>
                      </button>
                    )}

                    {/* 警告通知 */}
                    {v.reported && (
                      <button
                        type="button"
                        onClick={() => {
                          info("警告メッセージを送信しました", `${v.studentName} さんに規約遵守の警告を送りました。`);
                        }}
                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold rounded-lg flex items-center gap-1 border border-rose-200 transition-colors cursor-pointer"
                        title="投稿者に警告を送信"
                      >
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>警告送信</span>
                      </button>
                    )}

                    {/* 削除 */}
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`${v.studentName} さんの動画「${v.title}」を完全に削除しますか？`)) {
                          setVideoList(videoList.filter((item) => item.id !== v.id));
                          error("動画を削除しました", "データベースから完全に削除されました。");
                        }
                      }}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 font-bold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                      title="動画を完全に削除"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>削除</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= 4. ユーザー管理タブ ================= */}
        {activeTab === "users" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-700" />
                  <span>登録アカウント管理 ({filteredUsers.length}件)</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  学生・企業アカウントの検索、詳細確認、利用停止などのアカウント管理を行います
                </p>
              </div>

              {/* 検索 ＆ フィルター */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative w-full sm:w-60">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    placeholder="氏名・企業名・メールで検索..."
                    className="w-full text-xs border border-slate-300 rounded-lg pl-8 pr-3 py-1.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                {/* 企業 / 学生 フィルター */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setUserTypeFilter("ALL")}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-colors ${
                      userTypeFilter === "ALL"
                        ? "bg-white text-slate-900 shadow-2xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    すべて ({userList.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserTypeFilter("STUDENT")}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-colors ${
                      userTypeFilter === "STUDENT"
                        ? "bg-emerald-600 text-white shadow-2xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    学生 ({userList.filter((u) => u.type === "STUDENT").length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserTypeFilter("COMPANY")}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-colors ${
                      userTypeFilter === "COMPANY"
                        ? "bg-blue-600 text-white shadow-2xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    企業 ({userList.filter((u) => u.type === "COMPANY").length})
                  </button>
                </div>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {filteredUsers.map((u) => (
                <div key={u.id} className="py-4 flex items-center justify-between gap-4 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{u.name}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          u.type === "STUDENT"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "bg-blue-50 text-blue-800 border border-blue-200"
                        }`}
                      >
                        {u.type === "STUDENT" ? "学生" : "企業"}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          u.status === "ACTIVE"
                            ? "bg-slate-100 text-slate-600"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {u.status === "ACTIVE" ? "正常" : "アカウント停止中"}
                      </span>
                    </div>
                    <p className="text-slate-600">{u.detail}</p>
                    <p className="text-slate-400 text-[11px]">{u.email} / 登録日: {u.createdAt}</p>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        setUserList(
                          userList.map((item) =>
                            item.id === u.id
                              ? {
                                  ...item,
                                  status: item.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE",
                                }
                              : item
                          )
                        )
                      }
                      className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                        u.status === "ACTIVE"
                          ? "bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-rose-700 border border-slate-200"
                          : "bg-rose-100 text-rose-800 hover:bg-rose-200"
                      }`}
                    >
                      {u.status === "ACTIVE" ? "アカウント停止" : "停止中 (解除)"}
                    </button>
                  </div>
                </div>
              ))}

              {filteredUsers.length === 0 && (
                <div className="py-12 text-center text-slate-400 text-xs">
                  該当する登録アカウントは見つかりませんでした。
                </div>
              )}
            </div>
          </div>
        )}

        {/* 動画プレビューモーダル */}
        {previewVideo && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 rounded-3xl border border-slate-800 max-w-sm w-full overflow-hidden shadow-2xl p-4 text-white space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-rose-400">管理者 監視プレビュー</span>
                <button
                  onClick={() => setPreviewVideo(null)}
                  className="p-1 rounded-full text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="rounded-2xl overflow-hidden bg-black aspect-[9/16] max-h-96 mx-auto">
                <video src={previewVideo} controls autoPlay className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        )}
      </div>
    </RoleGuard>
  );
}
