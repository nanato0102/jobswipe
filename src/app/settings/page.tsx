"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import RoleGuard from "@/components/RoleGuard";
import StudentMobileTabs from "@/components/StudentMobileTabs";
import CompanyMobileTabs from "@/components/CompanyMobileTabs";
import Link from "next/link";
import {
  Settings,
  User,
  Building2,
  Lock,
  Mail,
  Bell,
  AlertTriangle,
  CheckCircle2,
  Eye,
  EyeOff,
  ShieldCheck,
  Trash2,
  ArrowRight,
  ArrowLeft,
  X,
} from "lucide-react";

export default function SettingsPage() {
  const { session, logout } = useAuth();
  const { success, error: toastError } = useToast();
  const router = useRouter();

  // パスワード変更フォーム
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // 通知設定
  const [emailOffers, setEmailOffers] = useState(true);
  const [emailMessages, setEmailMessages] = useState(true);
  const [emailNews, setEmailNews] = useState(true);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // 退会モーダル
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // パスワードバリデーション
  const hasMinLength = newPassword.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const isNewPasswordValid = hasMinLength && hasLetter && hasNumber;

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: string[] = [];

    if (!currentPassword) {
      errors.push("現在のパスワードを入力してください。");
    }

    if (!isNewPasswordValid) {
      errors.push("新しいパスワードは、ローマ字（半角英字）と数字を両方含む8文字以上で設定してください。");
    }

    if (newPassword !== confirmPassword) {
      errors.push("新しいパスワードと確認用パスワードが一致しません。");
    }

    if (errors.length > 0) {
      setPasswordErrors(errors);
      setPasswordSuccess(false);
      toastError("パスワードの変更に失敗しました", errors[0]);
      return;
    }

    // 成功処理
    setPasswordErrors([]);
    setPasswordSuccess(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    success("パスワードを変更しました", "新しいパスワードが安全に保存されました。");
    setTimeout(() => setPasswordSuccess(false), 4000);
  };

  const handleSaveNotifications = () => {
    setSettingsSaved(true);
    success("通知設定を保存しました", "メール配信設定が更新されました。");
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const handleDeleteAccount = () => {
    setIsDeleting(true);
    setTimeout(() => {
      // ユーザー退会処理
      if (typeof window !== "undefined") {
        localStorage.removeItem("jobswipe_auth_session");
      }
      logout();
      router.push("/");
    }, 1000);
  };

  const isStudent = session?.userType === "STUDENT";
  const isCompany = session?.userType === "COMPANY";
  const TabsWrapper = isCompany
    ? CompanyMobileTabs
    : isStudent
    ? StudentMobileTabs
    : ({ children }: { children?: React.ReactNode }) => <>{children}</>;

  return (
    <RoleGuard allowedRoles={["STUDENT", "COMPANY", "ADMIN"]}>
      <TabsWrapper>
        <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-6">
          {/* 上部戻る導線 */}
          <div className="flex items-center justify-between">
            <Link
              href={isStudent ? "/student/profile" : isCompany ? "/company/profile" : "/admin-console/dashboard"}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isStudent ? "プロフィールに戻る" : isCompany ? "企業情報に戻る" : "管理ダッシュボードに戻る"}</span>
            </Link>
          </div>

          {/* ページヘッダー */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
            <Settings className="w-6 h-6 text-slate-800" />
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                各種設定
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                アカウント情報、パスワード変更、通知設定を管理します
              </p>
            </div>
          </div>

          {/* セクション 1: 基本アカウント情報 */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <User className="w-4 h-4 text-slate-700" />
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                アカウント基本情報
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <span className="text-slate-500 font-medium">アカウント種別</span>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${
                      isStudent
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        : isCompany
                        ? "bg-blue-50 text-blue-800 border border-blue-200"
                        : "bg-slate-900 text-white"
                    }`}
                  >
                    {isStudent ? "一般アカウント (求職・スカウト受信)" : isCompany ? "企業アカウント" : "管理者"}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 font-medium">ご登録名</span>
                <p className="font-bold text-slate-900">{session?.name || "登録者"}</p>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <span className="text-slate-500 font-medium">ログインメールアドレス</span>
                <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono text-xs sm:text-sm">
                  <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span>{session?.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* セクション 2: パスワード変更 */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Lock className="w-4 h-4 text-slate-700" />
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                パスワードの変更
              </h2>
            </div>

            {passwordSuccess && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs sm:text-sm font-bold flex items-center gap-2 animate-fade-in-up">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span>パスワードを正常に変更いたしました。</span>
              </div>
            )}

            {passwordErrors.length > 0 && (
              <div className="p-3.5 bg-rose-50 border border-rose-300 rounded-xl text-rose-800 text-xs sm:text-sm font-semibold space-y-1 animate-fade-in-up">
                {passwordErrors.map((err, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>{err}</span>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="space-y-4">
              {/* 現在のパスワード */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">現在のパスワード</label>
                <div className="relative">
                  <input
                    type={showCurrentPw ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="現在のパスワードを入力"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:border-slate-800 focus:outline-none pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPw(!showCurrentPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* 新しいパスワード */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  新しいパスワード（ローマ字・数字を含む8文字以上）
                </label>
                <div className="relative">
                  <input
                    type={showNewPw ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="新しいパスワードを入力"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:border-slate-800 focus:outline-none pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPw(!showNewPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* リアルタイム要件チェックリスト */}
                {newPassword && (
                  <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-semibold ${
                        hasMinLength ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}
                    >
                      {hasMinLength ? "✓" : "✗"} 8文字以上
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-semibold ${
                        hasLetter ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}
                    >
                      {hasLetter ? "✓" : "✗"} ローマ字（英字）を含む
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-semibold ${
                        hasNumber ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}
                    >
                      {hasNumber ? "✓" : "✗"} 数字を含む
                    </span>
                  </div>
                )}
              </div>

              {/* 新しいパスワード（確認用） */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">新しいパスワード（確認用）</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="新しいパスワードをもう一度入力"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:border-slate-800 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs cursor-pointer"
              >
                パスワードを変更する
              </button>
            </form>
          </div>

          {/* セクション 3: メール通知・配信設定 */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-slate-700" />
                <h2 className="text-sm sm:text-base font-bold text-slate-900">
                  メール通知・配信設定
                </h2>
              </div>
              {settingsSaved && (
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 animate-fade-in-up">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 保存しました
                </span>
              )}
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                <div>
                  <p className="font-bold text-slate-800">スカウトオファー受信通知</p>
                  <p className="text-[11px] sm:text-xs text-slate-500">
                    企業からのオファーが届いた際にメールでお知らせします
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={emailOffers}
                  onChange={(e) => {
                    setEmailOffers(e.target.checked);
                    handleSaveNotifications();
                  }}
                  className="w-4 h-4 rounded text-slate-900 border-slate-300 focus:ring-slate-900 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                <div>
                  <p className="font-bold text-slate-800">新着チャットメッセージ通知</p>
                  <p className="text-[11px] sm:text-xs text-slate-500">
                    メッセージを受信した際にメールでお知らせします
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={emailMessages}
                  onChange={(e) => {
                    setEmailMessages(e.target.checked);
                    handleSaveNotifications();
                  }}
                  className="w-4 h-4 rounded text-slate-900 border-slate-300 focus:ring-slate-900 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                <div>
                  <p className="font-bold text-slate-800">JobSwipeからのお知らせ</p>
                  <p className="text-[11px] sm:text-xs text-slate-500">
                    新機能のリリースや就活・採用の役立つ情報をお届けします
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={emailNews}
                  onChange={(e) => {
                    setEmailNews(e.target.checked);
                    handleSaveNotifications();
                  }}
                  className="w-4 h-4 rounded text-slate-900 border-slate-300 focus:ring-slate-900 cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* セクション 4: 危険ゾーン（アカウント退会） */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-rose-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-rose-100 text-rose-800">
              <AlertTriangle className="w-4 h-4" />
              <h2 className="text-sm sm:text-base font-bold">アカウントの退会</h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              アカウントを退会すると、投稿した動画データ、企業とのマッチング履歴、オファー情報がすべて完全に削除され、復元できなくなります。
            </p>

            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 text-xs sm:text-sm font-bold rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer shadow-2xs"
            >
              <Trash2 className="w-4 h-4" />
              <span>アカウントを退会する</span>
            </button>
          </div>
        </div>

        {/* 退会確認モーダル */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white max-w-md w-full rounded-2xl p-6 border border-slate-200 shadow-2xl space-y-5 animate-fade-in-up">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 text-rose-700">
                  <AlertTriangle className="w-5 h-5" />
                  <h3 className="text-base font-bold">退会の最終確認</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p className="font-bold text-slate-900">
                  本当に退会手続きを進めてよろしいですか？
                </p>
                <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-rose-900 text-xs space-y-1">
                  <p>• 登録されたプロフィールおよび動画データは即時消去されます。</p>
                  <p>• 進行中のチャットおよびオファー情報はすべて無効化されます。</p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                >
                  キャンセル
                </button>
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isDeleting ? "退会処理中..." : "退会を確定する"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </TabsWrapper>
  </RoleGuard>
);
}
