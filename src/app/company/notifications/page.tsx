"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { appStore, NotificationItem } from "@/lib/appStore";
import RoleGuard from "@/components/RoleGuard";
import CompanyMobileTabs from "@/components/CompanyMobileTabs";
import { useToast } from "@/context/ToastContext";
import {
  Bell,
  Sparkles,
  MessageSquare,
  Heart,
  Info,
  ChevronRight,
  CheckCheck,
} from "lucide-react";

export default function CompanyNotificationsPage() {
  const router = useRouter();
  const { success } = useToast();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [filter, setFilter] = useState<"ALL" | "UNREAD">("ALL");

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = () => {
    const list = appStore.getNotifications("COMPANY");
    setNotifications(list);
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
    success("すべての通知を既読にしました");
  };

  const filteredNotifications = notifications.filter((item) => {
    if (filter === "UNREAD") return !item.isRead;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "OFFER_ACCEPTED":
        return <Sparkles className="w-4 h-4 text-emerald-700" />;
      case "MESSAGE_RECEIVED":
        return <MessageSquare className="w-4 h-4 text-blue-600" />;
      case "LIKE_RECEIVED":
        return <Heart className="w-4 h-4 text-rose-500" />;
      default:
        return <Info className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <RoleGuard allowedRoles={["COMPANY", "ADMIN"]}>
      <CompanyMobileTabs>
        <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6 w-full">
          {/* ================= 統一ページヘッダー ================= */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-blue-50 text-blue-900 border border-blue-200">
                <Bell className="w-3.5 h-3.5" />
                <span>企業通知センター</span>
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                お知らせ・通知
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                学生からのオファー承諾や新着メッセージの通知を確認できます。
              </p>
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer self-start sm:self-auto"
              >
                <CheckCheck className="w-4 h-4" />
                <span>すべて既読にする</span>
              </button>
            )}
          </div>

          {/* フィルターバー */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <button
              type="button"
              onClick={() => setFilter("ALL")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filter === "ALL"
                  ? "bg-slate-900 text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              すべて ({notifications.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("UNREAD")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                filter === "UNREAD"
                  ? "bg-slate-900 text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <span>未読のみ</span>
              {unreadCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span>
              )}
            </button>
          </div>

          {/* 通知カードリスト / 空状態 */}
          {filteredNotifications.length === 0 ? (
            <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 text-center text-slate-500 text-sm shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Bell className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-slate-900 text-base">通知はありません</p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  学生がオファーを承諾したり、メッセージが届くとここに表示されます。
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleCardClick(item)}
                  className={`bg-white rounded-2xl border shadow-xs p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer transition-all hover:border-slate-300 ${
                    !item.isRead ? "border-blue-300 bg-blue-50/10 ring-1 ring-blue-500/10" : "border-slate-200"
                  }`}
                >
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5">
                      {getIcon(item.type)}
                    </div>
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-xs sm:text-sm">{item.title}</span>
                        {!item.isRead && (
                          <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold text-[10px]">
                            未読
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{item.content}</p>
                      <span className="text-[10px] text-slate-400 font-medium block pt-0.5">{item.createdAt}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0 mt-1" />
                </div>
              ))}
            </div>
          )}
        </div>
      </CompanyMobileTabs>
    </RoleGuard>
  );
}
