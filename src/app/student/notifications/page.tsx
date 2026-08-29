"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { appStore, NotificationItem, NotificationType } from "@/lib/appStore";
import RoleGuard from "@/components/RoleGuard";
import StudentMobileTabs from "@/components/StudentMobileTabs";
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
} from "lucide-react";

export default function StudentNotificationsPage() {
  const { session } = useAuth();
  const router = useRouter();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [filter, setFilter] = useState<"ALL" | "UNREAD" | "OFFER_MSG" | "SYSTEM">("ALL");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = () => {
    const list = appStore.getNotifications("STUDENT");
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
    appStore.markAllNotificationsAsRead("STUDENT");
    loadNotifications();
    showToast("すべての通知を既読にしました");
  };

  const filteredNotifications = notifications.filter((item) => {
    if (filter === "UNREAD") return !item.isRead;
    if (filter === "OFFER_MSG") {
      return item.type === "OFFER_RECEIVED" || item.type === "MESSAGE_RECEIVED" || item.type === "LIKE_RECEIVED";
    }
    if (filter === "SYSTEM") return item.type === "SYSTEM_NOTICE";
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "OFFER_RECEIVED":
        return <Sparkles className="w-5 h-5 text-emerald-700" />;
      case "MESSAGE_RECEIVED":
        return <MessageSquare className="w-5 h-5 text-emerald-700" />;
      case "LIKE_RECEIVED":
        return <Heart className="w-5 h-5 text-rose-600" />;
      default:
        return <Info className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <RoleGuard allowedRoles={["STUDENT"]}>
      <StudentMobileTabs>
        <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* ヘッダー・タイトル */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <Bell className="w-6 h-6 text-emerald-700" />
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
                  オファーの受信、新着メッセージ、運営からのお知らせを確認できます
                </p>
              </div>

              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={handleMarkAllRead}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors self-start sm:self-auto shadow-2xs cursor-pointer"
                >
                  <CheckCheck className="w-4 h-4 text-emerald-700" />
                  <span>すべて既読にする</span>
                </button>
              )}
            </div>

            {/* トースト通知 */}
            {toastMessage && (
              <div className="bg-emerald-800 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-fade-in-up">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
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
                    ? "bg-emerald-700 text-white shadow-xs"
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
                    ? "bg-emerald-700 text-white shadow-xs"
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
                    ? "bg-emerald-700 text-white shadow-xs"
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
                    ? "bg-emerald-700 text-white shadow-xs"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                お知らせ
              </button>
            </div>

            {/* 通知カード一覧 */}
            <div className="space-y-3">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <Bell className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">現在、通知はありません</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    企業からのスカウトや新着メッセージが届くと、ここにリアルタイムで表示されます。
                  </p>
                </div>
              ) : (
                filteredNotifications.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleCardClick(item)}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 group ${
                      !item.isRead
                        ? "bg-white border-emerald-300 shadow-xs hover:border-emerald-500 hover:shadow-md"
                        : "bg-white/70 border-slate-200 hover:bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="flex-shrink-0 mt-0.5">
                        {getIcon(item.type)}
                      </div>

                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
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

                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {item.content}
                        </p>

                        <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-400">
                          <span>{item.createdAt}</span>
                          {!item.isRead ? (
                            <span className="font-bold text-emerald-800">未読</span>
                          ) : (
                            <span>既読</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-3" />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </StudentMobileTabs>
    </RoleGuard>
  );
}
