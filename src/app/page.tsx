import Link from "next/link";
import Image from "next/image";
import { Sparkles, User, Building2, ArrowRight, Video, MessageSquare, Play } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col">
      {/* ヒーローセクション */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center space-y-8">
          {/* ブランド公式ロゴアイコン */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden shadow-lg border border-slate-100 bg-white p-2 mb-3">
              <Image
                src="/logo.png"
                alt="JobSwipe Brand Logo"
                width={112}
                height={112}
                className="object-contain w-full h-full"
                priority
              />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              <span>就活版TikTok型 逆求人プラットフォーム</span>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              人柄を可視化する、<br className="hidden sm:inline" />
              新しい新卒採用のカタチ
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              学生は60秒の自己PR動画を投稿するだけ。企業はスワイプ感覚で候補者の「人柄」や「熱意」を直感的に発見し、ダイレクトにスカウトオファーを届けます。
            </p>
          </div>

          {/* CTAボタン群（新規登録・企業ログイン・デモ体験） */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-600 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <User className="h-4 w-4" />
              <span>学生として新規登録</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              <Building2 className="h-4 w-4" />
              <span>ログイン・デモ体験</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3つのコアバリュー */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">従来の就活・採用の課題を解決</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              書類選考だけでは伝わらない「人柄」「コミュニケーション力」を動画で可視化します。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">60秒PR動画で人柄訴求</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                学歴や資格だけでは伝わらない表情や雰囲気、話す熱量を短尺動画でアピールできます。
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">直感スワイプで効率採用</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                企業は隙間時間に縦スワイプで学生をチェック。気になる候補者にワンタップでオファー送信。
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">マッチング後のチャット</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                オファーを承諾した学生とWeb上でスムーズに日程調整やカジュアル面談を行えます。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}