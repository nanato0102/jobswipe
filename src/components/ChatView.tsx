"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { appStore, StoredMessage, MessageAttachment } from "@/lib/appStore";
import {
  Send,
  User,
  ArrowLeft,
  Search,
  MessageSquare,
  Sparkles,
  Paperclip,
  X,
  Flag,
  Zap,
  ShieldCheck,
  Building2,
} from "lucide-react";
import ReportModal from "@/components/ReportModal";

interface ThreadItem {
  id: string;
  offerId: string;
  partnerId: string;
  partnerName: string;
  partnerSub: string;
  partnerType: "student" | "company";
  avatarUrl?: string;
  tags?: string[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  status: string;
}

function ChatInner() {
  const { session, isStudent, isCompany } = useAuth();
  const searchParams = useSearchParams();
  const initialThreadId = searchParams.get("threadId");

  const [threads, setThreads] = useState<ThreadItem[]>([]);
  const [selectedThreadId, setSelectedThreadId] = useState<string>("");
  const [messages, setMessages] = useState<StoredMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState<MessageAttachment | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const currentUserId = session?.id || (isStudent ? "student-demo-id" : "company-demo-id");

  // スレッド一覧の取得関数
  const fetchThreads = async () => {
    try {
      const role = isStudent ? "STUDENT" : "COMPANY";
      const res = await fetch(`/api/chat/threads?userId=${currentUserId}&role=${role}`);
      if (res.ok) {
        const data = await res.json();
        if (data.threads && Array.isArray(data.threads) && data.threads.length > 0) {
          setThreads(data.threads);
          return data.threads;
        }
      }
    } catch (err) {
      console.warn("API threads fetch failed, fallback to local:", err);
    }

    // APIが空またはエラー時のローカルフォールバック
    const localThreads = appStore.getThreads(isStudent).map((t) => ({
      id: t.id,
      offerId: t.id,
      partnerId: t.partnerId,
      partnerName: t.partnerName,
      partnerSub: t.partnerSub,
      partnerType: t.role === "COMPANY" ? ("company" as const) : ("student" as const),
      lastMessage: t.lastMessage,
      lastMessageTime: t.lastTime,
      unreadCount: t.unread,
      status: "ACCEPTED",
    }));
    setThreads(localThreads);
    return localThreads;
  };

  // メッセージ一覧の取得関数
  const fetchMessages = async (threadId: string) => {
    try {
      const res = await fetch(`/api/messages?offerId=${threadId}`);
      if (res.ok) {
        const data = await res.json();
        if (data.messages && Array.isArray(data.messages)) {
          const formatted: StoredMessage[] = data.messages.map((m: any) => ({
            id: m.id,
            threadId: m.offerId,
            senderRole: m.senderId === currentUserId ? (isStudent ? "STUDENT" : "COMPANY") : (isStudent ? "COMPANY" : "STUDENT"),
            senderName: m.senderId === currentUserId ? session?.name || "自分" : "相手",
            content: m.content,
            sentAt: m.sentAt,
            isRead: true,
          }));
          setMessages(formatted);
          return;
        }
      }
    } catch (err) {
      console.warn("API messages fetch failed, fallback to local:", err);
    }

    // フォールバック
    const localMsgs = appStore.getMessages(threadId);
    setMessages(localMsgs);
  };

  // 初期化ロード
  useEffect(() => {
    fetchThreads().then((loadedThreads) => {
      if (initialThreadId && loadedThreads?.some((t: ThreadItem) => t.id === initialThreadId)) {
        setSelectedThreadId(initialThreadId);
      } else if (typeof window !== "undefined" && window.innerWidth >= 768 && loadedThreads?.length > 0) {
        setSelectedThreadId(loadedThreads[0].id);
      }
    });
  }, [isStudent, initialThreadId, currentUserId]);

  // 定期ポーリング（3秒間隔でメッセージとスレッドを同期）
  useEffect(() => {
    if (!selectedThreadId) return;

    fetchMessages(selectedThreadId);

    const interval = setInterval(() => {
      fetchMessages(selectedThreadId);
      fetchThreads();
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedThreadId, currentUserId]);

  // 自動スクロール
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, selectedThreadId]);

  const currentThread = threads.find((t) => t.id === selectedThreadId);

  const handleSelectThread = (threadId: string) => {
    setSelectedThreadId(threadId);
    fetchMessages(threadId);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImg = file.type.startsWith("image/");
    const reader = new FileReader();
    reader.onload = (ev) => {
      setSelectedFile({
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        type: isImg ? "image" : "pdf",
        url: ev.target?.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!inputText.trim() && !selectedFile) || !selectedThreadId || !currentThread || isSending) return;

    const textToSend = inputText.trim();
    const fileToSend = selectedFile;

    setInputText("");
    setSelectedFile(null);
    setIsSending(true);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offerId: selectedThreadId,
          senderId: currentUserId,
          receiverId: currentThread.partnerId,
          content: textToSend,
          attachment: fileToSend,
        }),
      });

      if (res.ok) {
        await fetchMessages(selectedThreadId);
        await fetchThreads();
      } else {
        // フォールバック
        const senderRole = isStudent ? "STUDENT" : "COMPANY";
        const senderName = isStudent ? session?.name || "佐藤 健太" : session?.name || "自社採用担当";
        appStore.sendMessage(selectedThreadId, senderRole, senderName, textToSend, fileToSend || undefined);
        setMessages(appStore.getMessages(selectedThreadId));
      }
    } catch (err) {
      console.error("Message send error:", err);
      // フォールバック
      const senderRole = isStudent ? "STUDENT" : "COMPANY";
      const senderName = isStudent ? session?.name || "佐藤 健太" : session?.name || "自社採用担当";
      appStore.sendMessage(selectedThreadId, senderRole, senderName, textToSend, fileToSend || undefined);
      setMessages(appStore.getMessages(selectedThreadId));
    } finally {
      setIsSending(false);
    }
  };

  const filteredThreads = threads.filter(
    (t) =>
      t.partnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.partnerSub.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderAvatar = (thread: ThreadItem, sizeClass = "w-10 h-10") => {
    if (thread.partnerType === "company") {
      return (
        <div className={`${sizeClass} rounded-lg bg-slate-900 text-white font-bold text-xs sm:text-sm flex items-center justify-center shadow-2xs flex-shrink-0`}>
          <Building2 className="w-5 h-5 text-slate-200 stroke-[2]" />
        </div>
      );
    } else {
      return (
        <div className={`${sizeClass} rounded-lg flex flex-col items-center justify-center shadow-2xs text-white flex-shrink-0 bg-slate-800 border border-slate-700`}>
          <User className="w-5 h-5 text-slate-200 stroke-[2.2]" />
        </div>
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-0 sm:px-4 py-0 sm:py-6 w-full flex-1 flex flex-col min-h-0 h-[calc(100dvh-4.5rem)] md:h-[calc(100vh-7.5rem)]">
      {/* メインチャットフレーム */}
      <div className="bg-white rounded-none sm:rounded-xl border-0 sm:border border-slate-200/90 shadow-none sm:shadow-xs overflow-hidden flex flex-1 min-h-0 h-full">
        {/* ================= 左カラム: スレッド一覧 ================= */}
        <div
          className={`w-full md:w-80 lg:w-96 border-r border-slate-200 flex flex-col bg-white h-full min-h-0 ${
            selectedThreadId ? "hidden md:flex" : "flex"
          }`}
        >
          {/* スレッドヘッダー */}
          <div className="p-3.5 sm:p-4 border-b border-slate-100 space-y-2.5 flex-shrink-0">
            <div className="flex items-center justify-between">
              <h1 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-slate-700" />
                <span>チャット面談</span>
              </h1>
              <span className="text-xs text-slate-400 font-semibold">{threads.length}件</span>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="名前や所属で検索..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
              />
            </div>
          </div>

          {/* スレッドリスト */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 overscroll-contain">
            {filteredThreads.map((thread) => {
              const isSelected = thread.id === selectedThreadId;
              return (
                <div
                  key={thread.id}
                  onClick={() => handleSelectThread(thread.id)}
                  className={`p-3.5 sm:p-4 flex items-start gap-3 cursor-pointer transition-colors ${
                    isSelected ? "bg-slate-100/80" : "hover:bg-slate-50"
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    {renderAvatar(thread, "w-11 h-11")}
                    {thread.unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-600 ring-2 ring-white" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                        {thread.partnerName}
                      </span>
                      <span className="text-xs text-slate-400 whitespace-nowrap">
                        {new Date(thread.lastMessageTime).toLocaleTimeString("ja-JP", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 block truncate">{thread.partnerSub}</span>
                    <p className={`text-xs sm:text-sm truncate ${thread.unreadCount > 0 ? "font-bold text-slate-900" : "text-slate-500"}`}>
                      {thread.lastMessage}
                    </p>
                  </div>
                </div>
              );
            })}

            {filteredThreads.length === 0 && (
              <div className="p-8 text-center text-xs text-slate-400 space-y-2">
                <p>現在アクティブなチャットはありません</p>
              </div>
            )}
          </div>
        </div>

        {/* ================= 右カラム: メッセージ詳細 ================= */}
        <div
          className={`flex-1 flex flex-col bg-slate-50 min-w-0 h-full min-h-0 ${
            !selectedThreadId ? "hidden md:flex" : "flex"
          }`}
        >
          {currentThread ? (
            <>
              {/* チャットヘッダー（固定） */}
              <div className="px-3.5 sm:px-4 py-2.5 sm:py-3 bg-white border-b border-slate-200 flex items-center justify-between gap-3 shadow-2xs flex-shrink-0 z-10">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <button
                    type="button"
                    onClick={() => setSelectedThreadId("")}
                    className="md:hidden p-1.5 -ml-1 rounded-md hover:bg-slate-100 text-slate-700 cursor-pointer"
                    title="一覧に戻る"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    {renderAvatar(currentThread, "w-9 h-9 sm:w-10 sm:h-10")}
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h2 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                          {currentThread.partnerName}
                        </h2>
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                          <ShieldCheck className="w-3 h-3 text-emerald-700 stroke-[2.5]" />
                          <span>オファー承諾済・公式チャット</span>
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate">{currentThread.partnerSub}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsReportModalOpen(true)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                    title="不適切な内容を通報"
                  >
                    <Flag className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* メッセージ表示エリア */}
              <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 overscroll-contain"
              >
                {/* 承諾済みバナー */}
                <div className="max-w-md mx-auto p-3 bg-white rounded-lg border border-slate-200 text-center space-y-1 shadow-2xs">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>マッチングが成立しました</span>
                  </span>
                  <p className="text-xs text-slate-500">
                    企業からのオファーが承諾され、個別メッセージが可能になりました。日程調整やカジュアル面談をご相談ください。
                  </p>
                </div>

                {messages.map((msg) => {
                  const isMine =
                    (isStudent && msg.senderRole === "STUDENT") ||
                    (isCompany && msg.senderRole === "COMPANY");

                  const formattedTime = msg.sentAt
                    ? new Date(msg.sentAt).toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })
                    : "";

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMine ? "items-end" : "items-start"}`}
                    >
                      <div className="flex items-end gap-1.5 max-w-[85%] sm:max-w-[75%]">
                        {isMine && (
                          <span className="text-[11px] text-slate-400 mb-1 font-mono flex-shrink-0">
                            {formattedTime}
                          </span>
                        )}

                        <div
                          className={`rounded-xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed break-words shadow-2xs ${
                            isMine
                              ? "bg-slate-900 text-white rounded-br-xs"
                              : "bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs"
                          }`}
                        >
                          <p className="whitespace-pre-wrap font-normal">{msg.content}</p>
                        </div>

                        {!isMine && (
                          <span className="text-[11px] text-slate-400 mb-1 font-mono flex-shrink-0">
                            {formattedTime}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 添付ファイルプレビュー */}
              {selectedFile && (
                <div className="px-4 py-2 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <Paperclip className="w-4 h-4 text-slate-500" />
                    <span className="font-medium truncate max-w-xs">{selectedFile.name}</span>
                    <span className="text-slate-400">({selectedFile.size})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedFile(null)}
                    className="p-1 hover:bg-slate-200 rounded text-slate-500 hover:text-slate-800"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* 定型文ボタン */}
              <div className="px-3 sm:px-4 pt-2 bg-white flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                <span className="text-xs text-slate-400 flex items-center gap-1 font-medium flex-shrink-0">
                  <Zap className="w-3 h-3 text-slate-500" />
                  <span>定型文:</span>
                </span>
                {(isStudent
                  ? [
                      "オファーありがとうございます！ぜひお話をお聞きしたいです。",
                      "以下の日程でカジュアル面談は可能でしょうか？",
                      "本日は貴重なお時間をいただきありがとうございました。",
                    ]
                  : [
                      "オファーのご承諾ありがとうございます！まずはカジュアルにお話ししませんか？",
                      "以下の日程候補はいかがでしょうか？",
                      "本日は面談のお時間をいただきありがとうございました！",
                    ]
                ).map((tpl, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setInputText(tpl)}
                    className="text-xs px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-md whitespace-nowrap transition-colors cursor-pointer"
                  >
                    {tpl.slice(0, 16)}...
                  </button>
                ))}
              </div>

              {/* 入力フォーム */}
              <form
                onSubmit={handleSendMessage}
                className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-end gap-2"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*,application/pdf"
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer flex-shrink-0"
                  title="画像・PDFを添付"
                >
                  <Paperclip className="w-5 h-5" />
                </button>

                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                  placeholder="メッセージを入力... (Shift+Enterで改行)"
                  rows={2}
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 resize-none min-h-[42px] max-h-32"
                />

                <button
                  type="submit"
                  disabled={(!inputText.trim() && !selectedFile) || isSending}
                  className="p-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-900 transition-colors shadow-xs cursor-pointer flex-shrink-0"
                  title="送信"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-sm text-slate-700">チャットを選択してください</p>
                <p className="text-xs text-slate-400">
                  左のスレッドリストから会話したい相手を選択すると、メッセージ履歴が表示されます。
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 通報モーダル */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        targetId={currentThread?.partnerId || ""}
        targetTitle={currentThread?.partnerName || ""}
        targetType="USER"
      />
    </div>
  );
}

export default function ChatView() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">読み込み中...</div>}>
      <ChatInner />
    </Suspense>
  );
}
