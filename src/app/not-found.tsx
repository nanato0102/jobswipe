import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Home, LogIn, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 py-16 bg-slate-50">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-12 max-w-lg w-full text-center space-y-6 animate-fade-in">
        {/* ロゴ */}
        <div className="w-16 h-16 mx-auto flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="JobSwipe Logo"
            width={56}
            height={56}
            className="object-contain"
            priority
          />
        </div>

        {/* 404 テキスト */}
        <div className="space-y-2">
          <span className="text-xs font-black text-emerald-800 tracking-widest uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
            404 Not Found
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            ページが見つかりません
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
            アクセスしようとしたページは削除されたか、URLが変更された可能性があります。
          </p>
        </div>

        {/* ナビゲーションボタン */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>トップページへ戻る</span>
          </Link>

          <Link
            href="/login"
            className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border border-slate-200 transition-colors cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>ログイン画面へ</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
