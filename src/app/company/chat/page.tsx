"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import RoleGuard from "@/components/RoleGuard";
import { useAuth } from "@/context/AuthContext";
import { appStore, ChatThread, StoredMessage } from "@/lib/appStore";
import {
  Send,
  User,
  Building2,
  ArrowLeft,
  CheckCheck,
  Search,
  MessageSquare,
  Sparkles,
  Calendar,
  Clock,
} from "lucide-react";
import StudentMobileTabs from "@/components/StudentMobileTabs";

function ChatContent() {
  const { session, isStudent, isCompany } = useAuth();
  const searchParams = useSearchParams();
  const initialThreadId = searchParams.get("threadId");

  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [selectedThreadId, setSelectedThreadId] = useState<string>("");
  const [messages, setMessages] = useState<StoredMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 初期スレッド読み込み
  useEffect(() => {
    const list = appStore.getThreads(isStudent);
    setThreads(list);

    if (initialThreadId && list.some((t) => t.id === initialThreadId)) {
      // 特定のthreadIdがURLクエリで指定されている場合のみ個別チャットを開く
      setSelectedThreadId(initialThreadId);
    } else {
      // クエリ指定がない場合: PCでは1件目を選択、スマホではスレッド一覧（全体）を表示
      if (typeof window !== "undefined" && window.innerWidth >= 768 && list.length > 0) {
        setSelectedThreadId(list[0].id);
      } else {
        setSelectedThreadId("");
      }
    }
  }, [isStudent, initialThreadId]);

  // 選択中スレッドのメッセージ読み込み
  useEffect(() => {
    if (selectedThreadId) {
      setMessages(appStore.getMessages(selectedThreadId));
    }
  }, [selectedThreadId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const currentThread = threads.find((t) => t.id === selectedThreadId);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !currentThread) return;

    const senderRole = isStudent ? "STUDENT" : "COMPANY";
    const senderName = session?.name || (isStudent ? "佐藤 健太" : "テックイノベーション株式会社");

    const newMsg = appStore.sendMessage(currentThread.id, senderRole, senderName, inputText.trim());
    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
  };

  const filteredThreads = threads.filter((t) =>
    t.partnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.partnerSub.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <RoleGuard allowedRoles={["COMPANY", "STUDENT", "ADMIN"]}>
      <StudentMobileTabs>
        <div className="flex-1 py-4 sm:py-6 px-3 sm:px-6 max-w-6xl mx-auto w-full flex flex-col h-[calc(100vh-6rem)] min-h-[600px]">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl flex-1 flex overflow-hidden">
          {/* ========================================================================= */}
          {/* 左サイドバー: スレッド一覧（スマホではスレッド未選択時または一覧表示時） */}
          {/* ========================================================================= */}
          <div
            className={`w-full md:w-80 lg:w-96 border-r border-slate-200 flex flex-col bg-slate-50/50 ${
              selectedThreadId ? "hidden md:flex" : "flex"
            }`}
          >
            {/* スレッドヘッダー ＆ 検索 */}
            <div className="p-4 border-b border-slate-200 bg-white space-y-3">
              <div className="flex items-center justify-between">
                <h1 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-emerald-700" />
                  <span>チャット</span>
                </h1>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {threads.length}件のマッチング
                </span>
              </div>

              {/* 検索入力 */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isStudent ? "企業名・業界で検索..." : "候補者名で検索..."}
                  className="w-full text-xs border border-slate-200 rounded-xl pl-9 pr-3 py-2 bg-slate-50 focus:bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 transition-all"
                />
              </div>
            </div>

            {/* スレッドリスト */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
              {filteredThreads.map((thread) => {
                const isSelected = thread.id === selectedThreadId;
                return (
                  <button
                    key={thread.id}
                    type="button"
                    onClick={() => setSelectedThreadId(thread.id)}
                    className={`w-full p-4 text-left flex items-start gap-3 transition-colors ${
                      isSelected
                        ? "bg-emerald-50/70 border-l-4 border-emerald-700"
                        : "hover:bg-slate-100/70 bg-white"
                    }`}
                  >
                    {/* アバター */}
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm shadow-sm flex-shrink-0 ${
                        thread.role === "COMPANY"
                          ? "bg-slate-900 text-emerald-400"
                          : "bg-emerald-700 text-white"
                      }`}
                    >
                      {thread.role === "COMPANY" ? (
                        <Building2 className="w-5 h-5" />
                      ) : (
                        <span>{thread.avatarText}</span>
                      )}
                    </div>

                    {/* スレッド詳細 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {thread.partnerName}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                          {thread.lastTime}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mb-1">{thread.partnerSub}</p>
                      <p className="text-xs text-slate-600 truncate leading-snug">
                        {thread.lastMessage}
                      </p>
                    </div>

                    {/* 未読バッジ */}
                    {thread.unread > 0 && (
                      <span className="w-2 h-2 rounded-full bg-emerald-600 flex-shrink-0 mt-1" />
                    )}
                  </button>
                );
              })}

              {filteredThreads.length === 0 && (
                <div className="p-8 text-center text-xs text-slate-400 space-y-1">
                  <p className="font-bold text-slate-600">一致するスレッドがありません</p>
                  <p>検索キーワードを変更してください</p>
                </div>
              )}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 右側: チャットタイムライン（スマホではスレッド選択時に全画面表示） */}
          {/* ========================================================================= */}
          <div
            className={`flex-1 flex flex-col bg-white ${
              !selectedThreadId ? "hidden md:flex" : "flex"
            }`}
          >
            {currentThread ? (
              <>
                {/* チャットヘッダー */}
                <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
                  <div className="flex items-center gap-3">
                    {/* スマホ用: スレッド一覧に戻るボタン */}
                    <button
                      type="button"
                      onClick={() => setSelectedThreadId("")}
                      className="p-1.5 -ml-1 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-xl transition-colors md:hidden"
                      title="一覧に戻る"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>

                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm shadow-sm flex-shrink-0 ${
                        currentThread.role === "COMPANY"
                          ? "bg-slate-900 text-emerald-400"
                          : "bg-emerald-700 text-white"
                      }`}
                    >
                      {currentThread.role === "COMPANY" ? (
                        <Building2 className="w-5 h-5" />
                      ) : (
                        <span>{currentThread.avatarText}</span>
                      )}
                    </div>

                    <div>
                      <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{currentThread.partnerName}</span>
                      </h2>
                      <p className="text-[11px] text-slate-500">{currentThread.partnerSub}</p>
                    </div>
                  </div>

                  <span className="text-xs bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full font-bold border border-emerald-200 flex items-center gap-1">
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="hidden sm:inline">マッチング成立</span>
                  </span>
                </div>

                {/* メッセージタイムライン */}
                <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/30">
                  {messages.map((m) => {
                    const isMe =
                      (isStudent && m.senderRole === "STUDENT") ||
                      (isCompany && m.senderRole === "COMPANY") ||
                      (!isStudent && !isCompany && m.senderRole === "COMPANY");

                    return (
                      <div
                        key={m.id}
                        className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                      >
                        <div className="flex items-center gap-1.5 mb-1 text-[11px] text-slate-500 font-medium">
                          {m.senderRole === "COMPANY" ? (
                            <>
                              <Building2 className="w-3 h-3 text-slate-400" />
                              <span>{m.senderName}</span>
                            </>
                          ) : (
                            <>
                              <User className="w-3 h-3 text-slate-400" />
                              <span>{m.senderName}</span>
                            </>
                          )}
                          <span>• {m.sentAt}</span>
                        </div>

                        <div
                          className={`max-w-md p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                            isMe
                              ? "bg-emerald-700 text-white rounded-tr-none shadow-md"
                              : "bg-white text-slate-900 border border-slate-200 rounded-tl-none shadow-sm"
                          }`}
                        >
                          {m.content}
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* クイック面談日程調整・定型文テンプレート */}
                <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-xs">
                  <span className="text-[11px] font-bold text-slate-500 whitespace-nowrap">定型文:</span>
                  <button
                    type="button"
                    onClick={() =>
                      setInputText(
                        isStudent
                          ? "オファーありがとうございます！ぜひ一度オンラインでお話しさせていただけますと幸いです。平日の17時以降であれば調整可能です。"
                          : "動画を拝見し、明るく前向きな人柄に大変惹かれました！ぜひ一度15分〜30分程度、オンラインでカジュアルにお話ししませんか？ご都合のよろしい日程をいくつか教えていただけますと幸いです。"
                      )
                    }
                    className="px-3 py-1 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 rounded-full font-medium whitespace-nowrap transition-colors shadow-2xs"
                  >
                    📅 面談日程の調整
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setInputText(
                        isStudent
                          ? "ご案内ありがとうございます！面談の日程について、以下で調整可能でしょうか？\n・第1希望: 〇月〇日 14:00〜\n・第2希望: 〇月〇日 16:00〜"
                          : "以下の日程枠でオンラインカジュアル面談を実施可能です。ご希望の日時をお選びいただけますでしょうか？\n1. 来週火曜日 14:00〜\n2. 来週木曜日 16:00〜\n3. 来週金曜日 11:00〜"
                      )
                    }
                    className="px-3 py-1 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 rounded-full font-medium whitespace-nowrap transition-colors shadow-2xs"
                  >
                    🕒 日程候補の提示
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setInputText(
                        isStudent
                          ? "本日は貴重なお時間をいただき誠にありがとうございました！貴社の雰囲気がよくわかり大変魅力的に感じました。"
                          : "本日はカジュアル面談にご参加いただきありがとうございました！ぜひ次の選考ステップに進んでいただきたく存じます。"
                      )
                    }
                    className="px-3 py-1 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 rounded-full font-medium whitespace-nowrap transition-colors shadow-2xs"
                  >
                    ✨ 面談のお礼
                  </button>
                </div>

                {/* 入力フォーム */}
                <form onSubmit={handleSend} className="p-3 border-t border-slate-200 bg-white flex gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={`${currentThread.partnerName} にメッセージを送信...`}
                    className="flex-1 text-sm border border-slate-300 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-bold rounded-2xl flex items-center gap-1.5 transition-colors disabled:opacity-50 shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>送信</span>
                  </button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400 space-y-2">
                <MessageSquare className="w-12 h-12 text-slate-300" />
                <p className="font-bold text-slate-700 text-sm">スレッドを選択してください</p>
                <p className="text-xs">左側の一覧からメッセージを送る相手を選択できます。</p>
              </div>
            )}
          </div>
        </div>
        </div>
      </StudentMobileTabs>
    </RoleGuard>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">読み込み中...</div>}>
      <ChatContent />
    </Suspense>
  );
}
