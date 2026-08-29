"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Send, User, Building2, ArrowLeft, Info, CheckCheck } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "student" | "company";
  text: string;
  time: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "m1",
    sender: "company",
    text: "佐藤さん、はじめまして！動画を拝見し、体育会での主将経験と推進力に大変感銘を受けました。弊社の新規事業部にて一度カジュアル面談でお話ししませんか？",
    time: "14:00",
  },
  {
    id: "m2",
    sender: "student",
    text: "オファーいただき誠にありがとうございます！自己PR動画を見ていただき大変嬉しいです。ぜひカジュアル面談でお話しさせていただけますと幸いです。",
    time: "14:15",
  },
  {
    id: "m3",
    sender: "company",
    text: "ご快諾ありがとうございます！来週の平日（火曜または木曜の16:00以降など）でご都合の良い日時はございますでしょうか？",
    time: "14:30",
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: "m-" + Date.now(),
      sender: "company",
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
  };

  return (
    <div className="flex-1 py-4 px-3 sm:px-6 max-w-4xl mx-auto w-full flex flex-col h-[calc(100vh-8rem)] min-h-[500px]">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden">
        {/* チャットヘッダー */}
        <div className="p-3.5 sm:p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <Link
              href="/company/likes"
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors md:hidden"
              title="戻る"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              佐
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <span>佐藤 健太 さん</span>
              </h2>
              <p className="text-[11px] text-slate-500">早稲田大学 商学部 / 2026年卒</p>
            </div>
          </div>

          <span className="text-xs bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full font-semibold border border-emerald-200 flex items-center gap-1">
            <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>マッチング成立</span>
          </span>
        </div>

        {/* メッセージリスト */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
          {messages.map((m) => {
            const isCompany = m.sender === "company";
            return (
              <div
                key={m.id}
                className={`flex flex-col ${isCompany ? "items-end" : "items-start"}`}
              >
                <div className="flex items-center gap-1.5 mb-1 text-[11px] text-slate-500">
                  {isCompany ? (
                    <>
                      <span>自社（採用担当）</span>
                      <Building2 className="w-3 h-3 text-slate-400" />
                    </>
                  ) : (
                    <>
                      <User className="w-3 h-3 text-slate-400" />
                      <span>佐藤 健太</span>
                    </>
                  )}
                  <span>• {m.time}</span>
                </div>

                <div
                  className={`max-w-md p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isCompany
                      ? "bg-slate-900 text-white rounded-tr-none shadow-sm"
                      : "bg-white text-slate-900 border border-slate-200 rounded-tl-none shadow-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* 入力フォーム */}
        <form onSubmit={handleSend} className="p-3 border-t border-slate-100 bg-white flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="メッセージを入力してください..."
            className="flex-1 text-sm border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl flex items-center gap-1.5 transition-colors disabled:opacity-50 shadow-sm"
          >
            <Send className="w-4 h-4" />
            <span>送信</span>
          </button>
        </form>
      </div>
    </div>
  );
}