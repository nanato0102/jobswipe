"use client";

import React, { useState } from "react";
import { appStore, StoredReport } from "@/lib/appStore";
import { AlertTriangle, X, CheckCircle, ShieldAlert, Flag } from "lucide-react";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetType: "VIDEO" | "CHAT" | "USER";
  targetId: string;
  targetTitle: string;
  targetPreview?: string;
  reporterName?: string;
}

const REPORT_REASONS = [
  { id: "INAPPROPRIATE_CONTENT", label: "不適切なコンテンツ・公序良俗に反する動画" },
  { id: "HARASSMENT", label: "就活セクハラ・迷惑行為・不快な言動" },
  { id: "SPAM", label: "無関係な宣伝・投資等の勧誘・スパム" },
  { id: "DEFAMATION", label: "誹謗中傷・名誉毀損・プライバシー侵害" },
  { id: "OTHER", label: "その他（利用規約違反など）" },
] as const;

export default function ReportModal({
  isOpen,
  onClose,
  targetType,
  targetId,
  targetTitle,
  targetPreview,
  reporterName = "利用ユーザー",
}: ReportModalProps) {
  const [selectedReason, setSelectedReason] = useState<StoredReport["reason"]>("INAPPROPRIATE_CONTENT");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const reasonObj = REPORT_REASONS.find((r) => r.id === selectedReason);

    setTimeout(() => {
      appStore.addReport({
        targetType,
        targetId,
        targetTitle,
        targetPreview,
        reporterName,
        reason: selectedReason,
        reasonText: reasonObj?.label || "利用規約違反",
        details: details.trim() || "詳細の記載なし",
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 400);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setDetails("");
    setSelectedReason("INAPPROPRIATE_CONTENT");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden animate-scale-up">
        {/* ヘッダー */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2 text-rose-600 font-bold text-sm sm:text-base">
            <ShieldAlert className="w-5 h-5" />
            <span>通報・規約違反の報告</span>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 本文 */}
        {isSubmitted ? (
          <div className="p-6 sm:p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-slate-900">通報を受け付けました</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                ご報告いただきありがとうございます。JobSwipe運営事務局にて内容を確認の上、利用規約に基づき厳正に対処いたします。
              </p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
            >
              閉じる
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
            {/* 通報対象 */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
              <span className="text-[11px] font-bold text-slate-500">通報対象:</span>
              <p className="font-bold text-slate-800 truncate">{targetTitle}</p>
              {targetPreview && (
                <p className="text-[11px] text-slate-500 line-clamp-1 italic">「{targetPreview}」</p>
              )}
            </div>

            {/* 通報理由 */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                通報の理由を選択してください <span className="text-rose-500">*</span>
              </label>
              <div className="space-y-1.5">
                {REPORT_REASONS.map((r) => (
                  <label
                    key={r.id}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      selectedReason === r.id
                        ? "border-rose-500 bg-rose-50/60 text-rose-950 font-bold"
                        : "border-slate-200 hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="reportReason"
                      value={r.id}
                      checked={selectedReason === r.id}
                      onChange={() => setSelectedReason(r.id)}
                      className="accent-rose-600"
                    />
                    <span>{r.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 詳細説明 */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                詳細な状況・理由（任意）
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="問題のある箇所や具体的な発言内容などをご記入ください"
                rows={3}
                className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 resize-none"
              />
            </div>

            <p className="text-[10px] text-slate-400 leading-relaxed">
              ※ 通報内容は運営事務局のみに送信され、対象ユーザーにあなたの情報が開示されることは一切ありません。
            </p>

            {/* ボタン */}
            <div className="flex items-center gap-2.5 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
              >
                キャンセル
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs flex items-center justify-center gap-1.5"
              >
                <Flag className="w-3.5 h-3.5" />
                <span>{isSubmitting ? "送信中..." : "通報を送信"}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
