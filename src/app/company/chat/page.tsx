"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import RoleGuard from "@/components/RoleGuard";
import { useAuth } from "@/context/AuthContext";
import { appStore, ChatThread, StoredMessage, MessageAttachment } from "@/lib/appStore";
import {
  Send,
  User,
  Building2,
  ArrowLeft,
  Search,
  MessageSquare,
  Sparkles,
  Paperclip,
  FileText,
  Download,
  X,
  Flag,
} from "lucide-react";
import StudentMobileTabs from "@/components/StudentMobileTabs";
import CompanyMobileTabs from "@/components/CompanyMobileTabs";
import ReportModal from "@/components/ReportModal";

function ChatContent() {
  const { session, isStudent, isCompany } = useAuth();
  const searchParams = useSearchParams();
  const initialThreadId = searchParams.get("threadId");

  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [selectedThreadId, setSelectedThreadId] = useState<string>("");
  const [messages, setMessages] = useState<StoredMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState<MessageAttachment | null>(null);
  const [previewImageModal, setPreviewImageModal] = useState<string | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 初期スレッド読み込み
  useEffect(() => {
    const list = appStore.getThreads(isStudent);
    setThreads(list);

    if (initialThreadId && list.some((t) => t.id === initialThreadId)) {
      setSelectedThreadId(initialThreadId);
    } else {
      if (typeof window !== "undefined" && window.innerWidth >= 768 && list.length > 0) {
        setSelectedThreadId(list[0].id);
      } else {
        setSelectedThreadId("");
      }
    }
  }, [isStudent, initialThreadId]);

  // メッセージ読み込み & 同期
  useEffect(() => {
    const refreshData = () => {
      const updatedThreads = appStore.getThreads(isStudent);
      setThreads(updatedThreads);

      if (selectedThreadId) {
        const latestMsgs = appStore.getMessages(selectedThreadId);
        setMessages((prev) => {
          if (JSON.stringify(prev) !== JSON.stringify(latestMsgs)) {
            return latestMsgs;
          }
          return prev;
        });
      }
    };

    refreshData();
    const interval = setInterval(refreshData, 3000);
    return () => clearInterval(interval);
  }, [isStudent, selectedThreadId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const currentThread = threads.find((t) => t.id === selectedThreadId);

  const handleSelectThread = (threadId: string) => {
    setSelectedThreadId(threadId);
    setThreads(appStore.getThreads(isStudent));
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

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if ((!inputText.trim() && !selectedFile) || !selectedThreadId || !currentThread) return;

    const senderRole = isStudent ? "STUDENT" : "COMPANY";
    const senderName = isStudent ? session?.name || "佐藤 健太" : session?.name || "自社採用担当";

    appStore.sendMessage(
      selectedThreadId,
      senderRole,
      senderName,
      inputText.trim(),
      selectedFile || undefined
    );

    setInputText("");
    setSelectedFile(null);
    setMessages(appStore.getMessages(selectedThreadId));
    setThreads(appStore.getThreads(isStudent));
  };

  const filteredThreads = threads.filter(
    (t) =>
      t.partnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.partnerSub.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderAvatar = (thread: ChatThread, sizeClass = "w-10 h-10") => {
    if (thread.role === "COMPANY") {
      const comp = appStore.getCompanyDetails(thread.partnerId);
      if (comp?.logoUrl) {
        return (
          <div className={`${sizeClass} rounded-xl overflow-hidden border border-slate-200 bg-white flex items-center justify-center p-1 shadow-2xs flex-shrink-0`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={comp.logoUrl} alt={thread.partnerName} className="max-w-full max-h-full object-contain" />
          </div>
        );
      }
      return (
        <div className={`${sizeClass} rounded-xl bg-slate-900 text-emerald-400 font-black text-xs sm:text-sm flex items-center justify-center shadow-2xs flex-shrink-0`}>
          <span>{thread.partnerName.slice(0, 1) || "企"}</span>
        </div>
      );
    } else {
      const student = appStore.getStudentDetails(thread.partnerId);
      const gender = student?.gender || "MALE";
      const avatarUrl = student?.avatarUrl;

      if (avatarUrl) {
        return (
          <div className={`${sizeClass} rounded-xl overflow-hidden border border-slate-200 shadow-2xs bg-slate-100 flex-shrink-0`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={avatarUrl} alt={thread.partnerName} className="w-full h-full object-cover" />
          </div>
        );
      }

      return (
        <div
          className={`${sizeClass} rounded-xl flex flex-col items-center justify-center shadow-2xs text-white flex-shrink-0 border border-white/40 ${
            gender === "FEMALE" ? "bg-rose-500" : "bg-blue-600"
          }`}
        >
          <User className="w-5 h-5 stroke-[2.2]" />
        </div>
      );
    }
  };

  const offers = appStore.getOffers();
  const currentOffer = currentThread
    ? offers.find(
        (o) =>
          (o.companyId === currentThread.partnerId || o.studentId === currentThread.partnerId) &&
          o.status === "ACCEPTED"
      )
    : null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 sm:py-6 w-full flex-1 flex flex-col min-h-0">
      {/* メインチャットフレーム */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-1 min-h-[560px] max-h-[calc(100dvh-7rem)]">
        {/* ================= 左カラム: スレッド一覧 ================= */}
        <div
          className={`w-full md:w-80 lg:w-96 border-r border-slate-200 flex flex-col bg-white ${
            selectedThreadId ? "hidden md:flex" : "flex"
          }`}
        >
          {/* スレッドヘッダー */}
          <div className="p-4 border-b border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <h1 className="text-base font-black text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-slate-700" />
                <span>チャット面談</span>
              </h1>
              <span className="text-xs text-slate-400 font-bold">{threads.length}件</span>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="名前や所属で検索..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
              />
            </div>
          </div>

          {/* スレッドリスト */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
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
                    {thread.unread > 0 && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                        {thread.partnerName}
                      </span>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap">{thread.lastTime}</span>
                    </div>
                    <span className="text-[11px] text-slate-400 block truncate">{thread.partnerSub}</span>
                    <p className={`text-xs truncate ${thread.unread > 0 ? "font-bold text-slate-900" : "text-slate-500"}`}>
                      {thread.lastMessage}
                    </p>
                  </div>
                </div>
              );
            })}

            {filteredThreads.length === 0 && (
              <div className="p-8 text-center text-xs text-slate-400 space-y-2">
                <p>該当するチャットはありません</p>
              </div>
            )}
          </div>
        </div>

        {/* ================= 右カラム: メッセージ詳細 ================= */}
        <div
          className={`flex-1 flex flex-col bg-slate-50 min-w-0 ${
            !selectedThreadId ? "hidden md:flex" : "flex"
          }`}
        >
          {currentThread ? (
            <>
              {/* チャットヘッダー */}
              <div className="px-4 py-3 bg-white border-b border-slate-200 flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    type="button"
                    onClick={() => setSelectedThreadId("")}
                    className="md:hidden p-1.5 rounded-xl hover:bg-slate-100 text-slate-600"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  <Link
                    href={
                      currentThread.role === "COMPANY"
                        ? `/companies/${currentThread.partnerId}`
                        : `/students/${currentThread.partnerId}`
                    }
                    className="flex items-center gap-3 min-w-0 group hover:opacity-90 transition-opacity"
                  >
                    {renderAvatar(currentThread, "w-10 h-10")}
                    <div className="min-w-0">
                      <h2 className="text-sm font-bold text-slate-900 truncate group-hover:text-blue-700 flex items-center gap-1.5">
                        <span>{currentThread.partnerName}</span>
                        <span className="text-[11px] font-normal text-blue-700 hidden sm:inline">(詳細 →)</span>
                      </h2>
                      <p className="text-[11px] text-slate-500 truncate">{currentThread.partnerSub}</p>
                    </div>
                  </Link>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={
                      currentThread.role === "COMPANY"
                        ? `/companies/${currentThread.partnerId}`
                        : `/students/${currentThread.partnerId}`
                    }
                    className="hidden sm:inline-flex px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                  >
                    {currentThread.role === "COMPANY" ? "企業詳細" : "学生詳細"}
                  </Link>

                  <button
                    type="button"
                    onClick={() => setIsReportModalOpen(true)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="通報する"
                  >
                    <Flag className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* メッセージタイムライン */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
                {/* オファー固定カード */}
                {currentOffer && (
                  <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>届いたオファー内容</span>
                      </span>
                      <span className="text-[10px] text-slate-400">{currentOffer.createdAt}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                      {currentOffer.message}
                    </p>
                  </div>
                )}

                {/* メッセージ吹き出し */}
                {messages.map((m) => {
                  const isMe =
                    (isStudent && m.senderRole === "STUDENT") ||
                    (isCompany && m.senderRole === "COMPANY") ||
                    (!isStudent && !isCompany && m.senderRole === "COMPANY");

                  return (
                    <div key={m.id} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                      <span className="text-[10px] text-slate-400 mb-1 px-1">{m.sentAt}</span>
                      <div
                        className={`max-w-[85%] sm:max-w-md p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap shadow-2xs space-y-2 ${
                          isMe
                            ? "bg-slate-900 text-white"
                            : "bg-white text-slate-900 border border-slate-200"
                        }`}
                      >
                        {/* 添付画像 */}
                        {m.attachment && m.attachment.type === "image" && (
                          <div
                            onClick={() => setPreviewImageModal(m.attachment!.url)}
                            className="cursor-pointer overflow-hidden rounded-xl border border-slate-700/30 max-w-xs"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={m.attachment.url} alt="添付画像" className="w-full object-cover" />
                          </div>
                        )}

                        <p>{m.content}</p>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* メッセージ入力フォーム */}
              <form onSubmit={handleSendMessage} className="p-3 sm:p-4 bg-white border-t border-slate-200 space-y-2">
                {selectedFile && (
                  <div className="flex items-center justify-between p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
                    <span className="truncate max-w-xs font-medium">📎 {selectedFile.name}</span>
                    <button type="button" onClick={() => setSelectedFile(null)} className="text-slate-400 hover:text-rose-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                    title="ファイルを添付"
                  >
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <input ref={fileInputRef} type="file" onChange={handleFileChange} className="hidden" />

                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="メッセージを入力..."
                    className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
                  />

                  <button
                    type="submit"
                    disabled={!inputText.trim() && !selectedFile}
                    className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
                  >
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">送信</span>
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-300 shadow-xs">
                <MessageSquare className="w-6 h-6" />
              </div>
              <p className="text-xs">左の一覧からチャットを選択してください</p>
            </div>
          )}
        </div>
      </div>

      {/* 通報モーダル */}
      {currentThread && (
        <ReportModal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          targetId={currentThread.partnerId}
          targetTitle={`${currentThread.partnerName} (${currentThread.partnerSub}) とのチャット`}
          targetType="CHAT"
          targetPreview={messages.slice(-1)[0]?.content}
        />
      )}
    </div>
  );
}

export default function ChatPage() {
  const { isStudent, isCompany } = useAuth();

  const Wrapper = isStudent
    ? StudentMobileTabs
    : isCompany
    ? CompanyMobileTabs
    : ({ children }: { children: React.ReactNode }) => <>{children}</>;

  return (
    <RoleGuard allowedRoles={["STUDENT", "COMPANY", "ADMIN"]}>
      <Wrapper>
        <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">チャットを読み込み中...</div>}>
          <ChatContent />
        </Suspense>
      </Wrapper>
    </RoleGuard>
  );
}
