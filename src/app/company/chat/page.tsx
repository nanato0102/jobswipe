"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import RoleGuard from "@/components/RoleGuard";
import { useAuth } from "@/context/AuthContext";
import { appStore, StoredMessage } from "@/lib/appStore";
import { Send, User, Building2, ArrowLeft, CheckCheck } from "lucide-react";

export default function ChatPage() {
  const { session, isStudent, isCompany } = useAuth();
  const [messages, setMessages] = useState<StoredMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const loadMessages = () => {
    setMessages(appStore.getMessages());
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const senderRole = isStudent ? "STUDENT" : "COMPANY";
    const senderName = session?.name || (isStudent ? "佐藤 健太" : "テックイノベーション株式会社");

    const newMsg = appStore.sendMessage(senderRole, senderName, inputText.trim());
    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
  };

  const partnerName = isStudent ? "テックイノベーション株式会社" : "佐藤 健太 さん";
  const partnerSub = isStudent ? "IT / Webサービス • 採用担当" : "早稲田大学 商学部 / 2027年卒";

  return (
    <RoleGuard allowedRoles={["COMPANY", "STUDENT", "ADMIN"]}>
      <div className="flex-1 py-4 px-3 sm:px-6 max-w-4xl mx-auto w-full flex flex-col h-[calc(100vh-8rem)] min-h-[500px]">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl flex-1 flex flex-col overflow-hidden">
          {/* チャットヘッダー */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-3">
              <Link
                href={isStudent ? "/student/offers" : "/company/likes"}
                className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-xl transition-colors md:hidden"
                title="戻る"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                {isStudent ? <Building2 className="w-5 h-5 text-emerald-400" /> : "佐"}
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <span>{partnerName}</span>
                </h2>
                <p className="text-[11px] text-slate-500">{partnerSub}</p>
              </div>
            </div>

            <span className="text-xs bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full font-bold border border-emerald-200 flex items-center gap-1">
              <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>マッチング中</span>
            </span>
          </div>

          {/* メッセージリスト */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/40">
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
                    className={`max-w-md p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
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
          <form onSubmit={handleSend} className="p-3 border-t border-slate-100 bg-white flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`${partnerName} にメッセージを送信...`}
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
        </div>
      </div>
    </RoleGuard>
  );
}