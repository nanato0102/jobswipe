"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  User,
  Building2,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Zap,
  TrendingUp,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Heart,
  X,
  Layers,
  Lock,
  Camera,
  Flame,
} from "lucide-react";

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"student" | "company">("student");

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const targetIndustries = [
    "美容・コスメ",
    "アパレル・ファッション",
    "ベンチャー営業",
    "ブライダル・ホテル",
    "飲食・サービス",
    "SNSマーケ・クリエイティブ",
    "総合営業・セールス",
    "カスタマーサクセス",
  ];

  const faqs = [
    {
      q: "動画の撮影は何を使えばいいですか？凝った編集は必要ですか？",
      a: "スマートフォンのインカメラで自撮り撮影するだけでOKです。編集や特殊効果は一切不要です。企業が求めているのは完璧なプレゼンではなく、普段のあなたの自然な表情や話し方、人柄の雰囲気です。",
    },
    {
      q: "動画は何回でも撮り直しや差し替えができますか？",
      a: "はい、マイページから何度でも納得いくまで撮り直し・更新が可能です。就活の進捗や新たな挑戦に合わせていつでも最新のPR動画にアップデートできます。",
    },
    {
      q: "学生の利用料金は本当にかかりませんか？",
      a: "はい、学生の方は新規登録、動画投稿、オファー受信、チャット面談まですべて完全無料でご利用いただけます。",
    },
    {
      q: "投稿した動画がSNSのように勝手に一般公開・拡散される心配はありませんか？",
      a: "一切ありません。投稿された動画は、JobSwipeの厳格な法人審査を通過した登録企業の採用担当者のみが閲覧できる完全クローズドな環境で安全に管理されています。",
    },
    {
      q: "どんな企業からスカウトが届きますか？",
      a: "学歴や文字の履歴書ではなく、人柄や対人力、熱量を最重視する美容、アパレル、成長ITベンチャー、総合営業、サービス業界などの優良企業が多数参加しています。",
    },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#090A0F] text-white overflow-x-hidden selection:bg-pink-500 selection:text-white">
      {/* ========================================================================= */}
      {/* 1. ヒーローセクション（漆黒 × ネオンパープル〜ピンク × 2カラム） */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden border-b border-white/10 py-16 sm:py-24 lg:py-32">
        {/* 背景のネオンメッシュグロー */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[400px] bg-gradient-to-tr from-purple-600/20 via-pink-600/20 to-blue-600/10 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute -top-24 right-0 w-96 h-96 bg-pink-500/10 blur-[100px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* 左側：核心コピー ＆ アクション (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* ブランド公式バッジ */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 border border-pink-500/30 text-pink-400 text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(236,72,153,0.15)]">
                <Sparkles className="h-3.5 w-3.5 text-pink-400 animate-pulse" />
                <span>人柄が採用の基準になる社会をつくる</span>
              </div>

              {/* メインヘッドライン */}
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]">
                  履歴書を、<br />
                  <span className="bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-sm">
                    スワイプする時代へ。
                  </span>
                </h1>
                <p className="text-lg sm:text-2xl font-bold text-slate-200 pt-1">
                  数秒で伝わる、人柄でつながる。
                </p>
                <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed pt-2">
                  文章力で落とされる就活は、もう終わり。自撮り感覚のショート動画を投稿するだけで、あなたの「雰囲気」や「熱量」に惚れ込んだ企業から直接スカウトが届く。
                </p>
              </div>

              {/* デュアルCTAボタン */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-3">
                <Link
                  href="/register"
                  className="w-full sm:w-auto px-8 py-4 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:opacity-90 active:scale-95 rounded-2xl transition-all shadow-[0_0_30px_rgba(236,72,153,0.4)] flex items-center justify-center gap-2 group"
                >
                  <User className="h-4 w-4" />
                  <span>[学生] 無料でスカウトを受け取る</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/company/login"
                  className="w-full sm:w-auto px-8 py-4 text-sm sm:text-base font-bold text-slate-200 bg-[#131522] hover:bg-[#1c1f33] hover:text-white border border-white/15 hover:border-purple-500/50 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Building2 className="h-4 w-4 text-purple-400" />
                  <span>[企業] 候補者をスワイプする</span>
                </Link>
              </div>

              {/* 特徴チェックバッジ */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-slate-400 font-semibold">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-pink-500" />
                  <span>ES・志望動機一切不要</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  <span>自撮り短尺動画で即スタート</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                  <span>厳選企業から直接スカウト</span>
                </div>
              </div>
            </div>

            {/* 右側：ダークガラス浮遊スワイプモック (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[300px] sm:max-w-[340px]">
                {/* グローオーラ */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 rounded-[38px] blur-xl opacity-40 animate-pulse" />

                {/* スワイプカード */}
                <div className="relative rounded-[32px] overflow-hidden bg-[#12141F] border border-white/15 shadow-2xl p-4 flex flex-col justify-between aspect-[9/15] text-white">
                  {/* 上部バッジ */}
                  <div className="flex items-center justify-between z-20">
                    <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/40 flex items-center gap-1">
                      <Flame className="w-3 h-3 text-pink-400" />
                      <span>短尺PR動画</span>
                    </span>
                    <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-slate-300 backdrop-blur font-bold">
                      早稲田大 26卒
                    </span>
                  </div>

                  {/* 右側アクションアイコン */}
                  <div className="absolute right-4 bottom-24 z-20 flex flex-col items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-pink-600 to-purple-600 text-white flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.5)] transform active:scale-90 transition-transform">
                      <Heart className="w-5 h-5 fill-white" />
                    </div>
                    <span className="text-[10px] font-bold text-pink-300 drop-shadow">気になる</span>

                    <div className="w-11 h-11 rounded-full bg-black/60 border border-white/10 text-slate-300 flex items-center justify-center shadow-lg">
                      <X className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 drop-shadow">スキップ</span>
                  </div>

                  {/* 下部：学生情報オーバーレイ */}
                  <div className="relative z-20 space-y-2 pb-1 bg-gradient-to-t from-[#12141F] via-[#12141F]/80 to-transparent pt-8 -mx-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-white">佐藤 健太</span>
                      <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full font-bold">
                        商学部
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-medium leading-snug">
                      「体育会サッカー部主将。困難な状況でも周囲を巻き込んで前進する推進力に自信があります！」
                    </p>
                    {/* タグ */}
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-pink-300 border border-white/10">
                        #リーダーシップ
                      </span>
                      <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-purple-300 border border-white/10">
                        #体育会
                      </span>
                      <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-indigo-300 border border-white/10">
                        #笑顔
                      </span>
                    </div>
                  </div>

                  {/* 再生プログレスバー */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30">
                    <div className="h-full bg-gradient-to-r from-pink-500 to-purple-500 w-[70%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. マニフェスト（Manifesto: 就活のパラダイムシフト） */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#0C0E17] border-b border-white/10 relative">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-black tracking-widest text-pink-400 uppercase">
            Manifesto
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            ESという名の「作文コンテスト」を、<br />
            <span className="bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              終わらせよう。
            </span>
          </h2>
          <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed pt-2">
            「どれだけ綺麗に文章を盛れたか」で合否が決まる就活に、何の意味があるのか。<br className="hidden sm:inline" />
            「会ってみたら思っていた雰囲気と違った」と落胆する採用に、何の価値があるのか。
          </p>
          <div className="p-6 sm:p-8 bg-[#121422] rounded-3xl border border-white/10 max-w-3xl mx-auto text-xs sm:text-sm text-slate-300 leading-relaxed text-left space-y-3 shadow-xl">
            <p>
              文字情報では、あなたの最高の笑顔も、場を和ませる空気感も、対人での魅力も絶対に伝わらない。
            </p>
            <p className="font-bold text-white">
              だから私たちは、最初の接点を「数秒のショート動画」に変える。着飾った言葉ではなく、あなたそのものの人柄で惹かれあう新卒採用へ。
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. プロダクト体感（Interactive Swipe Experience） */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#090A0F] border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-black tracking-widest text-purple-400 uppercase">
              Product Experience
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              最初の数秒で、人柄を見抜く。
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              指先ひとつのスワイプから、運命のオファーが生まれる。
            </p>
          </div>

          {/* 切り替えタブ */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex p-1 bg-[#131522] rounded-2xl border border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab("student")}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === "student"
                    ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <User className="w-4 h-4" />
                <span>学生視点（動画でアピール）</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("company")}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === "company"
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>企業視点（スワイプで発掘）</span>
              </button>
            </div>
          </div>

          {/* 体感カード */}
          <div className="max-w-md mx-auto bg-[#121422] rounded-3xl border border-white/15 p-6 sm:p-8 shadow-2xl space-y-6">
            {activeTab === "student" ? (
              <div className="space-y-4 text-center">
                <div className="w-14 h-14 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center mx-auto border border-pink-500/30">
                  <Camera className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-white">自撮り感覚で数秒の動画を置くだけ</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  エントリーシートは何十枚も書く必要はありません。スマホで撮ったPR動画を1本投稿したら、あとは企業からのスカウト通知を待つだけです。
                </p>
                <div className="pt-2">
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs font-bold shadow-md hover:opacity-90 transition-opacity"
                  >
                    <span>無料でショート動画を投稿する</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-center">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto border border-purple-500/30">
                  <Layers className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-white">隙間時間に縦スワイプで即戦力発掘</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  通勤時間や面接の合間にショート動画をサクサク閲覧。表情や受け答えのテンポから、自社にフィットする候補者を直感的にスカウトできます。
                </p>
                <div className="pt-2">
                  <Link
                    href="/company/login"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-md hover:opacity-90 transition-opacity"
                  >
                    <span>候補者をスワイプで探す</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. 学生向けベネフィット（For Candidates） */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#0C0E17] border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-black tracking-widest text-pink-400 uppercase">
              For Candidates
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              盛ったESはもう終わり。<br />
              <span className="text-pink-400">短尺動画で届く、逆求人。</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              文字の綺麗さではなく、あなたの表情やエネルギーそのものが最大の武器になる。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#121422] rounded-3xl border border-white/10 p-6 sm:p-8 space-y-4 hover:border-pink-500/40 transition-colors shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center border border-pink-500/30">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">文章力より、あなたらしさ</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                盛った自己PRや志望動機は不要。自然な笑顔、声のトーン、熱量がそのまま企業に届きます。
              </p>
            </div>

            <div className="bg-[#121422] rounded-3xl border border-white/10 p-6 sm:p-8 space-y-4 hover:border-purple-500/40 transition-colors shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">動画を置いたら待つだけ</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                何十社もエントリーして疲弊する就活から解放。あなたに興味を持った企業から特別スカウトが届きます。
              </p>
            </div>

            <div className="bg-[#121422] rounded-3xl border border-white/10 p-6 sm:p-8 space-y-4 hover:border-indigo-500/40 transition-colors shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">「人柄重視」の優良企業だけが集結</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                美容、アパレル、成長ベンチャーなど、あなたのポテンシャルと個性を正当に評価する企業と直接つながれます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. 企業向けベネフィット（For Recruiters） */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#090A0F] border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-black tracking-widest text-purple-400 uppercase">
              For Recruiters
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              会ってガッカリをゼロに。<br />
              <span className="text-purple-400">直感スワイプで即戦力をハックする。</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              書類選考の工数を劇的に削減し、カルチャーにフィットする意欲的な人材を最速で獲得。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#121422] rounded-3xl border border-white/10 p-6 sm:p-8 space-y-4 hover:border-purple-500/40 transition-colors shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">書類選考の時間を90%削減</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                100人のESを読むのに10時間。JobSwipeなら15分のスワイプで会うべき人材を直感的に判断可能です。
              </p>
            </div>

            <div className="bg-[#121422] rounded-3xl border border-white/10 p-6 sm:p-8 space-y-4 hover:border-indigo-500/40 transition-colors shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">カルチャーマッチ率の最大化</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                表情やトーン、受け答えのテンポ感から、自社の社風にマッチする人材だけをピンポイント採用。
              </p>
            </div>

            <div className="bg-[#121422] rounded-3xl border border-white/10 p-6 sm:p-8 space-y-4 hover:border-pink-500/40 transition-colors shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center border border-pink-500/30">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">熱量の高い母集団へアプローチ</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                動画を自ら投稿して自分を表現する、意欲的で行動力のあるZ世代のトップ層へダイレクトにオファー送信。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. 活躍業界マトリクス（Target Industries） */}
      {/* ========================================================================= */}
      <section className="py-20 bg-[#0C0E17] border-b border-white/10 text-center">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-black tracking-widest text-indigo-400 uppercase">
              Target Sectors
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              「文字」よりも「対人印象」が武器になる、すべての業界へ。
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
            {targetIndustries.map((ind) => (
              <span
                key={ind}
                className="text-xs sm:text-sm font-bold px-4 py-2.5 rounded-2xl bg-[#121422] border border-white/15 text-slate-200 hover:border-pink-500/50 hover:text-pink-300 transition-colors shadow-sm"
              >
                #{ind}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. 不安ゼロの安心設計（Trust & Safety） */}
      {/* ========================================================================= */}
      <section className="py-20 bg-[#090A0F] border-b border-white/10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-black tracking-widest text-pink-400 uppercase">
              Trust & Safety
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              安心して自己表現できる、完全クローズド環境
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 sm:p-8 bg-[#121422] rounded-3xl border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-pink-400 font-bold text-sm">
                <Lock className="w-5 h-5" />
                <span>審査制企業のみに限定公開</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                投稿された動画は、厳格な法人審査を通過した JobSwipe 登録企業の人事のみが閲覧可能です。SNSのように一般公開されたり外部へ拡散されることは一切ありません。
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-[#121422] rounded-3xl border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                <Camera className="w-5 h-5" />
                <span>編集不要・お題テンプレート付き</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                動画編集スキルは一切不要。話す内容に迷わないお題テンプレート（挨拶・人柄・強み）に沿ってスマホで撮影するだけで、魅力的なPR動画が完成します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. スマート利用ステップ（How it Works） */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#0C0E17] border-b border-white/10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-black tracking-widest text-purple-400 uppercase">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">かんたん3ステップでスタート</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 sm:p-8 bg-[#121422] rounded-3xl border border-white/10 space-y-3 relative">
              <span className="text-4xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                01
              </span>
              <h3 className="text-base font-bold text-white">数秒のPR動画を投稿</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                スマホで撮影した短尺動画をアップロード。あなたの強みや人柄を自由にアピールします。
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-[#121422] rounded-3xl border border-white/10 space-y-3 relative">
              <span className="text-4xl font-black bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
                02
              </span>
              <h3 className="text-base font-bold text-white">企業からスカウトが届く</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                あなたの動画を見た企業の採用担当者からオファーが届きます。メッセージを確認して承諾。
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-[#121422] rounded-3xl border border-white/10 space-y-3 relative">
              <span className="text-4xl font-black bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent">
                03
              </span>
              <h3 className="text-base font-bold text-white">チャットでカジュアル面談</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                承諾後はWebチャットで日程を調整し、一次面接をスキップして面談へと進みます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. よくある質問（FAQ） */}
      {/* ========================================================================= */}
      <section className="py-20 bg-[#090A0F] border-b border-white/10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-black tracking-widest text-pink-400 uppercase">FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">よくあるご質問</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#121422] rounded-2xl border border-white/10 overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base text-white flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-pink-400 flex-shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                {openFaq === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 bg-black/20">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. ファイナルCTA */}
      {/* ========================================================================= */}
      <section className="py-24 sm:py-32 bg-gradient-to-b from-[#090A0F] via-[#121422] to-[#090A0F] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-600/20 via-purple-600/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            さあ、あなたの魅力を<br />
            <span className="bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              短尺動画に解き放とう。
            </span>
          </h2>
          <p className="text-xs sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            履歴書の文字数で悩む時間は、今日でおしまい。<br />
            スマホひとつで、あなたを本当に求める企業に出会おう。
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="w-full sm:w-auto px-9 py-4 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:opacity-90 text-white text-base font-black rounded-2xl shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <User className="w-5 h-5" />
              <span>今すぐ学生新規登録（完全無料）</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/company/login"
              className="w-full sm:w-auto px-8 py-4 bg-[#131522] hover:bg-[#1c1f33] text-slate-200 border border-white/15 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2"
            >
              <Building2 className="w-4 h-4 text-purple-400" />
              <span>採用企業様 ログイン・登録</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. 信頼性フッター（ダークモード仕様） */}
      {/* ========================================================================= */}
      <footer className="bg-[#06070B] border-t border-white/10 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/10 bg-white shadow-sm flex items-center justify-center p-0.5">
                  <Image
                    src="/logo.png"
                    alt="JobSwipe Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <span className="font-bold text-lg text-white">JobSwipe</span>
              </div>
              <p className="text-xs text-slate-400 text-center md:text-left">
                人柄が採用の基準になる社会をつくる。短尺動画スワイプ型 逆求人プラットフォーム
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-300 font-semibold">
              <Link href="/register" className="hover:text-pink-400 transition-colors">
                学生新規登録
              </Link>
              <Link href="/company/login" className="hover:text-purple-400 transition-colors">
                採用担当の方はこちら
              </Link>
              <Link href="/login" className="hover:text-white transition-colors">
                ログイン
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
            <p>© 2026 JobSwipe. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/terms" className="hover:text-slate-200 transition-colors">
                利用規約
              </Link>
              <Link href="/privacy" className="hover:text-slate-200 transition-colors">
                プライバシーポリシー
              </Link>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">IPA安全なウェブサイト運用準拠</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
