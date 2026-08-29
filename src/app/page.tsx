import Link from "next/link";
import Image from "next/image";
import { Film, Sparkles, Building2, UserCheck, ShieldCheck, ArrowRight, Video, Heart, Send } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col flex-1">
      {/* ヒーローセクション */}
      <section className="bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* ロゴアイコン表示 */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white p-2 shadow-2xl mb-6 flex items-center justify-center border border-slate-700">
            <Image
              src="/logo.png"
              alt="JobSwipe Official Logo"
              width={112}
              height={112}
              className="object-contain w-full h-full"
              priority
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-700 bg-slate-800 text-slate-300 text-xs font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5 text-slate-300" />
            <span>就活版TikTok型 逆求人プラットフォーム</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            ESだけでは伝わらない<br />
            「人柄」と「雰囲気」で出会う就活
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            学生が投稿した60秒の自己PR動画を企業がスワイプ形式で閲覧。<br className="hidden sm:inline" />
            直感的にオファーを送り、ミスマッチのない採用を実現します。
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            <Link
              href="/swipe"
              className="w-full sm:w-auto px-6 py-3 bg-white text-slate-900 hover:bg-slate-100 font-semibold rounded-xl text-sm transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <Film className="w-4 h-4" />
              <span>動画スワイプを体験する</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/register"
              className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-sm border border-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>無料で新規登録</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 特徴セクション */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-slate-900">JobSwipeが選ばれる理由</h2>
          <p className="text-sm text-slate-500 mt-2">書類選考では見えない魅力をダイレクトに届けます</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-start">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-4">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">60秒の自己PR動画</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              学生はスマホから手軽に自己紹介動画をアップロード。表情や話し方、熱意など人柄の魅力を直接アピールできます。
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-start">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-4">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">縦スワイプで直感的な出会い</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              企業はTikTokのような縦スワイプUIでテンポよく動画を閲覧。「気になる」学生をストックして効率的に比較検討できます。
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-start">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-4">
              <Send className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">ダイレクトオファー＆チャット</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              気になる学生にスカウトメッセージを直接送信。オファー承諾後はチャット機能でスムーズに面談設定が可能です。
            </p>
          </div>
        </div>
      </section>

      {/* デモ・機能クイックリンク */}
      <section className="bg-slate-100 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-lg font-bold text-slate-900 mb-6 text-center">各ユーザー種別の機能一覧（デモ）</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {/* 学生メニュー */}
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900 mb-3">
                <UserCheck className="w-4 h-4 text-slate-700" />
                <span>学生向け機能</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li>
                  <Link href="/student/profile" className="hover:text-slate-900 hover:underline">
                    • プロフィール登録・編集
                  </Link>
                </li>
                <li>
                  <Link href="/student/video" className="hover:text-slate-900 hover:underline">
                    • PR動画の投稿・管理
                  </Link>
                </li>
                <li>
                  <Link href="/student/offers" className="hover:text-slate-900 hover:underline">
                    • 届いたオファーの確認
                  </Link>
                </li>
              </ul>
            </div>

            {/* 企業メニュー */}
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900 mb-3">
                <Building2 className="w-4 h-4 text-slate-700" />
                <span>企業向け機能</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li>
                  <Link href="/swipe" className="hover:text-slate-900 hover:underline">
                    • 動画スワイプ閲覧（Like/Skip）
                  </Link>
                </li>
                <li>
                  <Link href="/company/search" className="hover:text-slate-900 hover:underline">
                    • タグ検索（笑顔、英語等）
                  </Link>
                </li>
                <li>
                  <Link href="/company/likes" className="hover:text-slate-900 hover:underline">
                    • 気になる一覧 & オファー送信
                  </Link>
                </li>
                <li>
                  <Link href="/company/chat" className="hover:text-slate-900 hover:underline">
                    • チャット機能
                  </Link>
                </li>
              </ul>
            </div>

            {/* 管理者メニュー */}
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900 mb-3">
                <ShieldCheck className="w-4 h-4 text-slate-700" />
                <span>管理者機能</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li>
                  <Link href="/admin/dashboard" className="hover:text-slate-900 hover:underline">
                    • KPIダッシュボード
                  </Link>
                </li>
                <li>
                  <Link href="/admin/dashboard" className="hover:text-slate-900 hover:underline">
                    • ユーザー・投稿動画の管理
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}