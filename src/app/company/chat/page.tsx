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
  CheckCheck,
  Search,
  MessageSquare,
  Sparkles,
  Calendar,
  Clock,
  Paperclip,
  FileText,
  Image as ImageIcon,
  Download,
  X,
  Eye,
} from "lucide-react";
import StudentMobileTabs from "@/components/StudentMobileTabs";
import CompanyMobileTabs from "@/components/CompanyMobileTabs";

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
  const fileInputRef = useRef<HTMLInputElement>(null);
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
  const currentOffer = currentThread ? appStore.getOfferForThread(currentThread.id) : null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ファイルサイズフォーマット
    const sizeStr =
      file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(file.size / 1024)} KB`;

    const isPdf = file.type === "application/pdf" || file.name.endsWith(".pdf");
    const isImg = file.type.startsWith("image/");

    if (!isPdf && !isImg) {
      alert("送信できるファイル形式は画像（PNG, JPG, WEBP等）またはPDFのみです。");
      return;
    }

    const reader = new FileReader();
    reader.onload = (loadEvt) => {
      const url = loadEvt.target?.result as string;
      setSelectedFile({
        name: file.name,
        size: sizeStr,
        type: isPdf ? "pdf" : "image",
        url,
      });
    };
    reader.readAsDataURL(file);
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if ((!inputText.trim() && !selectedFile) || !currentThread) return;

    const senderRole = isStudent ? "STUDENT" : "COMPANY";
    const senderName = session?.name || (isStudent ? "佐藤 健太" : "テックイノベーション株式会社");

    const messageContent = inputText.trim() || (selectedFile?.type === "pdf" ? `[ファイル送信] ${selectedFile.name}` : "[画像送信]");

    const newMsg = appStore.sendMessage(
      currentThread.id,
      senderRole,
      senderName,
      messageContent,
      selectedFile || undefined
    );
    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
    removeSelectedFile();

    // スレッド一覧の最終メッセージ＆時刻を即座に更新して同期
    setThreads(appStore.getThreads(isStudent));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSend();
    }
  };

  const insertTemplate = (template: string) => {
    setInputText(template);
  };

  const filteredThreads = threads.filter((t) =>
    t.partnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.partnerSub.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const TabsWrapper = isCompany ? CompanyMobileTabs : StudentMobileTabs;

  return (
    <RoleGuard allowedRoles={["COMPANY", "STUDENT", "ADMIN"]}>
      <TabsWrapper>
        <div className="flex-1 py-1.5 sm:py-6 px-1 sm:px-6 max-w-6xl mx-auto w-full flex flex-col h-[calc(100dvh-5.5rem)] sm:h-[calc(100vh-5rem)] min-h-0 sm:min-h-[620px] overflow-x-hidden">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs flex-1 flex overflow-hidden">
            {/* ========================================================================= */}
            {/* 左サイドバー: スレッド一覧（スマホではスレッド未選択時に表示） */}
            {/* ========================================================================= */}
            <div
              className={`w-full md:w-80 lg:w-96 border-r border-slate-200 flex flex-col bg-slate-50/50 ${
                selectedThreadId ? "hidden md:flex" : "flex"
              }`}
            >
              {/* スレッドヘッダー ＆ 検索 */}
              <div className="p-4 border-b border-slate-200 bg-white space-y-3">
                <div className="flex items-center justify-between">
                  <h1 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-emerald-700" />
                    <span>メッセージ一覧</span>
                  </h1>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {threads.length}件
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
                    className="w-full text-xs border border-slate-200 rounded-lg pl-9 pr-3 py-2 bg-slate-50 focus:bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 transition-all"
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
                          ? "bg-emerald-50/80 border-l-4 border-emerald-700"
                          : "hover:bg-slate-100/70 bg-white"
                      }`}
                    >
                      {/* アバター */}
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shadow-2xs flex-shrink-0 ${
                          thread.role === "COMPANY"
                            ? "bg-slate-900 text-emerald-400"
                            : "bg-emerald-700 text-white"
                        }`}
                      >
                        {thread.role === "COMPANY" ? (
                          <Building2 className="w-4 h-4" />
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
              className={`flex-1 min-w-0 flex flex-col bg-slate-50/40 w-full overflow-hidden ${
                !selectedThreadId ? "hidden md:flex" : "flex"
              }`}
            >
              {currentThread ? (
                <>
                  {/* チャットヘッダー */}
                  <div className="p-3 sm:p-4 border-b border-slate-200 flex items-center justify-between bg-white shadow-2xs gap-2 min-w-0 w-full">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      {/* スマホ用: スレッド一覧に戻るボタン */}
                      <button
                        type="button"
                        onClick={() => setSelectedThreadId("")}
                        className="p-1.5 -ml-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors md:hidden flex-shrink-0"
                        title="一覧に戻る"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>

                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm shadow-2xs flex-shrink-0 ${
                          currentThread.role === "COMPANY"
                            ? "bg-slate-900 text-emerald-400"
                            : "bg-emerald-700 text-white"
                        }`}
                      >
                        {currentThread.role === "COMPANY" ? (
                          <Building2 className="w-4 h-4" />
                        ) : (
                          <span>{currentThread.avatarText}</span>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h2 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                          {currentThread.partnerName}
                        </h2>
                        <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">
                          {currentThread.partnerSub}
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] sm:text-[11px] bg-emerald-50 text-emerald-800 px-2 sm:px-2.5 py-0.5 rounded-md font-bold border border-emerald-200 flex items-center gap-1 flex-shrink-0">
                      <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="hidden xs:inline">成立</span>
                    </span>
                  </div>

                  {/* メッセージタイムライン（縦スクロール） */}
                  <div className="flex-1 min-w-0 p-3 sm:p-6 overflow-y-auto space-y-4 w-full">
                    {/* オファーメッセージ固定ピン留めカード */}
                    {currentOffer && (
                      <div className="p-3.5 sm:p-4 bg-white rounded-lg border border-emerald-200 shadow-2xs space-y-2 min-w-0 w-full">
                        <div className="flex items-center justify-between border-b border-emerald-100 pb-2 gap-2">
                          <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5 truncate">
                            <Sparkles className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                            <span className="truncate">届いたオファー内容</span>
                          </span>
                          <span className="text-[10px] text-slate-400 whitespace-nowrap flex-shrink-0">
                            {currentOffer.createdAt}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed break-words">
                          {currentOffer.message}
                        </p>
                      </div>
                    )}

                    {/* メッセージ吹き出しリスト */}
                    {messages.map((m) => {
                      const isMe =
                        (isStudent && m.senderRole === "STUDENT") ||
                        (isCompany && m.senderRole === "COMPANY") ||
                        (!isStudent && !isCompany && m.senderRole === "COMPANY");

                      return (
                        <div
                          key={m.id}
                          className={`flex flex-col min-w-0 w-full ${isMe ? "items-end" : "items-start"}`}
                        >
                          <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] text-slate-400 font-medium">
                            <span className="truncate max-w-[150px]">{m.senderName}</span>
                            <span className="whitespace-nowrap">• {m.sentAt}</span>
                          </div>

                          <div
                            className={`max-w-[85%] sm:max-w-md p-3 sm:p-3.5 rounded-lg text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words shadow-2xs space-y-2 ${
                              isMe
                                ? "bg-slate-900 text-white"
                                : "bg-white text-slate-900 border border-slate-200"
                            }`}
                          >
                            {/* 添付画像 */}
                            {m.attachment && m.attachment.type === "image" && (
                              <div className="space-y-1">
                                <div
                                  onClick={() => setPreviewImageModal(m.attachment!.url)}
                                  className="cursor-pointer overflow-hidden rounded-lg border border-slate-700/40 relative group max-w-sm"
                                >
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={m.attachment.url}
                                    alt={m.attachment.name}
                                    className="w-full max-h-64 object-cover group-hover:scale-102 transition-transform duration-200"
                                  />
                                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                    <Eye className="w-5 h-5 drop-shadow-md" />
                                  </div>
                                </div>
                                <div className="text-[10px] opacity-75 truncate flex items-center gap-1">
                                  <ImageIcon className="w-3 h-3 flex-shrink-0" />
                                  <span className="truncate">{m.attachment.name}</span>
                                  <span className="flex-shrink-0">({m.attachment.size})</span>
                                </div>
                              </div>
                            )}

                            {/* 添付PDFファイル */}
                            {m.attachment && m.attachment.type === "pdf" && (
                              <a
                                href={m.attachment.url}
                                download={m.attachment.name}
                                target="_blank"
                                rel="noreferrer"
                                className={`flex items-center gap-2.5 p-2.5 rounded-lg border transition-all ${
                                  isMe
                                    ? "bg-slate-800/90 border-slate-700 hover:bg-slate-800 text-white"
                                    : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-900"
                                }`}
                              >
                                <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500 flex-shrink-0">
                                  <FileText className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-bold text-xs truncate">{m.attachment.name}</p>
                                  <p className="text-[10px] opacity-70">{m.attachment.size} • PDFドキュメント</p>
                                </div>
                                <Download className="w-4 h-4 opacity-70 hover:opacity-100 flex-shrink-0" />
                              </a>
                            )}

                            {/* メッセージテキスト（添付ファイルのみで自動挿入された文字列以外の実際テキストを表示） */}
                            {(!m.attachment || (m.content !== "[画像送信]" && !m.content.startsWith("[ファイル送信]"))) && (
                              <div>{m.content}</div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* ========================================================================= */}
                  {/* 下部: 定型文チップ ＆ ファイル添付 ＆ 入力フォーム */}
                  {/* ========================================================================= */}
                  <div className="border-t border-slate-200 bg-white p-2.5 sm:p-4 space-y-2 min-w-0 w-full">
                    {/* クイック定型文テンプレートチップ */}
                    <div className="w-full min-w-0 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                      <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 whitespace-nowrap flex-shrink-0">
                        定型文:
                      </span>

                      {isStudent ? (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              insertTemplate(
                                "オファーいただき誠にありがとうございます！自己PR動画を見ていただけて大変光栄です。ぜひ一度オンラインでお話しさせていただけますと幸いです。"
                              )
                            }
                            className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-md font-medium whitespace-nowrap transition-colors text-[11px] sm:text-xs flex-shrink-0 cursor-pointer"
                          >
                            オファー承諾・挨拶
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              insertTemplate(
                                "ご案内ありがとうございます！面談の日程について、以下の候補日はいかがでしょうか？\n\n・第1希望: \n・第2希望: \n・第3希望: \n\n※所要時間は30分程度を想定しております。ご確認のほどよろしくお願いいたします。"
                              )
                            }
                            className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-md font-medium whitespace-nowrap transition-colors text-[11px] sm:text-xs flex-shrink-0 cursor-pointer"
                          >
                            日程候補の提示
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              insertTemplate(
                                "日程のご調整ありがとうございます！それでは以下の日時にてよろしくお願いいたします。\n\n【日時】\n\n当日お話しできることを楽しみにしております。"
                              )
                            }
                            className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-md font-medium whitespace-nowrap transition-colors text-[11px] sm:text-xs flex-shrink-0 cursor-pointer"
                          >
                            日程の確定・お礼
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              insertTemplate(
                                "本日は貴重なお時間をいただき誠にありがとうございました！事業内容やチームの雰囲気がよく理解でき、大変魅力に感じました。ぜひ次の選考ステップにも挑戦させていただきたく存じます。"
                              )
                            }
                            className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-md font-medium whitespace-nowrap transition-colors text-[11px] sm:text-xs flex-shrink-0 cursor-pointer"
                          >
                            面談後のお礼
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              insertTemplate(
                                "オファーをご快諾いただきありがとうございます！動画を拝見し、ぜひ一度カジュアルにお話ししたいと思いご連絡いたしました。\n\n以下の日程枠で15〜30分程度のオンライン面談を実施可能です。ご都合の良い日時をお知らせいただけますでしょうか？\n\n1. \n2. \n3. \n\n上記以外でも調整可能ですのでお気軽にご相談ください。"
                              )
                            }
                            className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-md font-medium whitespace-nowrap transition-colors text-[11px] sm:text-xs flex-shrink-0 cursor-pointer"
                          >
                            承諾感謝・日程提示
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              insertTemplate(
                                "日程のご連絡ありがとうございます！それでは以下の日程・URLにて実施させていただきます。\n\n【日時】\n【面談URL】\n【所要時間】約30分\n\n私服でリラックスしてご参加ください。当日お話しできることを楽しみにしております！"
                              )
                            }
                            className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-md font-medium whitespace-nowrap transition-colors text-[11px] sm:text-xs flex-shrink-0 cursor-pointer"
                          >
                            面談URLのご案内
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              insertTemplate(
                                "本日はカジュアル面談にご参加いただき誠にありがとうございました！熱意やお人柄がよく伝わる大変有意義な時間となりました。\n\nぜひ次の選考ステップに進んでいただきたく存じます。詳細なご案内を改めてお送りいたします。"
                              )
                            }
                            className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-md font-medium whitespace-nowrap transition-colors text-[11px] sm:text-xs flex-shrink-0 cursor-pointer"
                          >
                            面談後のお礼・次回案内
                          </button>
                        </>
                      )}
                    </div>

                    {/* 選択中ファイルの送信前プレビューバー */}
                    {selectedFile && (
                      <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-lg animate-fade-in-up">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="p-1.5 rounded-md bg-white border border-slate-200 flex-shrink-0">
                            {selectedFile.type === "pdf" ? (
                              <FileText className="w-4 h-4 text-rose-500" />
                            ) : (
                              <ImageIcon className="w-4 h-4 text-emerald-600" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-800 truncate">{selectedFile.name}</p>
                            <p className="text-[10px] text-slate-500">{selectedFile.size}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={removeSelectedFile}
                          className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                          title="添付を解除"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* 隠しファイル入力要素 */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      accept="image/*,application/pdf,.pdf"
                      className="hidden"
                    />

                    {/* 複数行テキストエリア入力フォーム */}
                    <form onSubmit={handleSend} className="w-full min-w-0 flex flex-col sm:flex-row gap-2 items-stretch sm:items-end">
                      <div className="w-full min-w-0 relative flex-1">
                        <textarea
                          rows={3}
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder={`${currentThread.partnerName} へのメッセージを入力... (Ctrl+Enter で送信)`}
                          className="w-full text-xs sm:text-sm border border-slate-300 rounded-lg p-2.5 sm:p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 leading-relaxed resize-none break-words pr-10"
                        />

                        {/* ファイル添付クリップボタン */}
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="absolute right-2 bottom-2.5 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                          title="PDF・画像を添付"
                        >
                          <Paperclip className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        type="submit"
                        disabled={!inputText.trim() && !selectedFile}
                        className="w-full sm:w-auto px-5 py-2.5 sm:py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50 shadow-xs flex-shrink-0 cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>送信</span>
                      </button>
                    </form>
                  </div>
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

        {/* 添付画像の拡大プレビューモーダル */}
        {previewImageModal && (
          <div
            onClick={() => setPreviewImageModal(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 cursor-zoom-out animate-fade-in"
          >
            <div className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center">
              <button
                type="button"
                onClick={() => setPreviewImageModal(null)}
                className="absolute -top-10 right-0 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                title="閉じる"
              >
                <X className="w-6 h-6" />
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewImageModal}
                alt="Enlarged preview"
                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl border border-white/10"
              />
            </div>
          </div>
        )}
      </TabsWrapper>
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
