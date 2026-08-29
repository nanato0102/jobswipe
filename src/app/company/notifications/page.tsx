"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { appStore, NotificationItem, NotificationType } from "@/lib/appStore";
import RoleGuard from "@/components/RoleGuard";
import CompanyMobileTabs from "@/components/CompanyMobileTabs";
import {
  Bell,
  Sparkles,
  MessageSquare,
  Heart,
  Info,
  CheckCircle2,
  ChevronRight,
  Filter,
  CheckCheck,
  UserCheck,
} from "lucide-react";

export default function CompanyNotificationsPage() {
  const { session } = useAuth();
  const router = useRouter();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [filter, setFilter] = useState<"ALL" | "UNREAD" | "OFFER_MSG" | "SYSTEM">("ALL");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = () => {
    const list = appStore.getNotifications("COMPANY");
    setNotifications(list);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCardClick = (item: NotificationItem) => {
    if (!item.isRead) {
      appStore.markNotificationAsRead(item.id);
      loadNotifications();
    }
    if (item.linkUrl) {
      router.push(item.linkUrl);
    }
  };

  const handleMarkAllRead = () => {
    appStore.markAllNotificationsAsRead("COMPANY");
    loadNotifications();
    showToast("すべての通知を既読にしました");
  };

  const filteredNotifications = notifications.filter((item) => {
    if (filter === "UNREAD") return !item.isRead;
    if (filter === "OFFER_MSG") {
      return (
        item.type === "OFFER_ACCEPTED" ||
        item.type === "MESSAGE_RECEIVED" ||
        item.type === "OFFER_DECLINED"
      );
    }
    if (filter === "SYSTEM") return item.type === "SYSTEM_NOTICE";
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "OFFER_ACCEPTED":
        return <UserCheck className="w-5 h-5 text-blue-700" />;
      case "MESSAGE_RECEIVED":
        return <MessageSquare className="w-5 h-5 text-blue-700" />;
      case "OFFER_DECLINED":
        return <Info className="w-5 h-5 text-slate-500" />;
      default:
        return <Info className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <RoleGuard allowedRoles={["COMPANY"]}>
      <CompanyMobileTabs>
        <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* ヘッダー・タイトル */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <Bell className="w-6 h-6 text-blue-700" />
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    通知センター
                  </h1>
                  {unreadCount > 0 && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                      未読 {unreadCount}件
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-500">
                  学生からのオファー承諾、新着チャットメッセージ、システム通知を確認できます
                </p>
              </div>

              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={handleMarkAllRead}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors self-start sm:self-auto shadow-2xs cursor-pointer"
                >
                  <CheckCheck className="w-4 h-4 text-blue-700" />
                  <span>すべて既読にする</span>
                </button>
              )}
            </div>

            {/* トースト通知 */}
            {toastMessage && (
              <div className="bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-fade-in-up">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{toastMessage}</span>
              </div>
            )}

            {/* フィルターツールバー */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <button
                type="button"
                onClick={() => setFilter("ALL")}
                className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                  filter === "ALL"
                    ? "bg-blue-900 text-white shadow-xs"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                すべて ({notifications.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter("UNREAD")}
                className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                  filter === "UNREAD"
                    ? "bg-blue-900 text-white shadow-xs"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                未読のみ ({unreadCount})
              </button>
              <button
                type="button"
                onClick={() => setFilter("OFFER_MSG")}
                className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                  filter === "OFFER_MSG"
                    ? "bg-blue-900 text-white shadow-xs"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                オファー・チャット
              </button>
              <button
                type="button"
                onClick={() => setFilter("SYSTEM")}
                className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                  filter === "SYSTEM"
                    ? "bg-blue-900 text-white shadow-xs"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                お知らせ
              </button>
            </div>

            {/* コンパクト統合通知リスト一覧 */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-16 px-4 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <Bell className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">現在、通知はありません</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    学生からのオファー承諾や新着メッセージが届くと、ここにリアルタイムで表示されます。
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {filteredNotifications.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleCardClick(item)}
                      className={`px-4 py-3.5 sm:px-5 sm:py-3.5 transition-all cursor-pointer flex items-center justify-between gap-3 group relative ${
                        !item.isRead
                          ? "bg-blue-50/25 hover:bg-blue-50/40 border-l-4 border-l-blue-600"
                          : "hover:bg-slate-50/80 border-l-4 border-l-transparent"
                      }`}
                    >
                      <div className="flex items-start gap-3 min-w-0 flex-1">
                        <div className="flex-shrink-0 mt-0.5">
                          {getIcon(item.type)}
                        </div>

                        <div className="min-w-0 flex-1 space-y-0.5">
                          {/* 1行目: タイトルと日時 */}
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5 min-w-0">
                              {!item.isRead && (
                                <span className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0" />
                              )}
                              <h4
                                className={`text-xs sm:text-sm font-bold truncate ${
                                  !item.isRead ? "text-slate-950" : "text-slate-700"
                                }`}
                              >
                                {item.title}
                              </h4>
                            </div>
                            <span className="text-[11px] text-slate-400 whitespace-nowrap flex-shrink-0">
                              {item.createdAt}
                            </span>
                          </div>

                          {/* 2行目: 本文プレビュー */}
                          <p className="text-xs text-slate-500 truncate leading-relaxed">
                            {item.content}
                          </p>
                        </div>
                      </div>

                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-700 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </CompanyMobileTabs>
    </RoleGuard>
  );
}
