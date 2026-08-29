"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import FadeInView from "@/components/FadeInView";
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
  Lock,
  Camera,
  Layers,
  Flame,
} from "lucide-react";

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"student" | "company">("student");

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const targetIndustriesRow1 = [
    "IT・Webサービス",
    "ベンチャー・スタートアップ",
    "美容・コスメ",
    "アパレル・ファッション",
    "総合商社・専門商社",
    "広告・PR・メディア",
    "不動産・建設・住宅",
  ];

  const targetIndustriesRow2 = [
    "人材・コンサルティング",
    "ブライダル・ホテル・観光",
    "飲食・フードサービス",
    "エンタメ・イベント・音楽",
    "メーカー・日用品・消費財",
    "総合営業・セールス",
    "SNSマーケ・クリエイティブ",
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
    <div className="flex-1 flex flex-col min-h-screen bg-[#0B0F19] text-white overflow-x-hidden selection:bg-emerald-500 selection:text-white">
      {/* ========================================================================= */}
      {/* 1. ヒーローセクション（エメラルドグリーン × ディープトーン × 入場アニメーション） */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden border-b border-slate-800/80 py-20 sm:py-28 lg:py-36">
        {/* 上質なエメラルドグローの環境光（呼吸アニメーション） */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[450px] bg-emerald-600/15 blur-[140px] pointer-events-none rounded-full animate-pulse-slow" />
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-teal-500/10 blur-[120px] pointer-events-none animate-pulse-slow delay-300" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* ブランド公式バッジ (Delay 0ms) */}
          <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-bold tracking-wide shadow-sm mx-auto hover:bg-emerald-500/20 transition-colors">
            <Sparkles className="h-4 w-4 text-emerald-400 flex-shrink-0 animate-pulse" />
            <span className="inline-block">人柄が採用の基準になる社会をつくる</span>
          </div>

          {/* メインヘッドライン (Delay 100ms) */}
          <div className="animate-fade-in-up delay-100 space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.15] text-white">
              <span className="inline-block">履歴書を、</span><br className="hidden sm:inline" />
              <span className="text-emerald-400 inline-block drop-shadow-[0_0_30px_rgba(52,211,153,0.35)]">
                スワイプする時代へ。
              </span>
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-200 pt-2">
              <span className="inline-block">数秒で伝わる、</span>
              <span className="inline-block">人柄でつながる。</span>
            </p>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed pt-2">
              <span className="inline-block">文章力で落とされる就活は、もう終わり。</span>
              <span className="inline-block">自撮り感覚のショート動画を投稿するだけで、</span>
              <span className="inline-block">あなたの「雰囲気」や「熱量」に惚れ込んだ企業から</span>
              <span className="inline-block">直接スカウトが届く。</span>
            </p>
          </div>

          {/* デュアルCTAボタン (Delay 300ms) */}
          <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/register"
              className="w-full sm:w-auto px-9 py-4 text-base font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:scale-95 rounded-2xl transition-all shadow-[0_10px_25px_rgba(5,150,105,0.3)] hover:shadow-[0_15px_35px_rgba(5,150,105,0.5)] hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
            >
              <User className="h-5 w-5 flex-shrink-0" />
              <span>[学生] 無料でスカウトを受け取る</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 flex-shrink-0" />
            </Link>

            <Link
              href="/company/login"
              className="w-full sm:w-auto px-8 py-4 text-base font-bold text-slate-200 bg-[#141B2D] hover:bg-[#1D263F] hover:text-white border border-slate-700/80 hover:border-emerald-500/50 hover:-translate-y-0.5 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Building2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
              <span>[企業] 候補者をスワイプする</span>
            </Link>
          </div>

          {/* 特徴チェックバッジ (Delay 400ms) */}
          <div className="animate-fade-in-up delay-400 pt-6 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-300 font-semibold">
            <div className="flex items-center gap-2 hover:text-emerald-300 transition-colors">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>ES・志望動機一切不要</span>
            </div>
            <div className="flex items-center gap-2 hover:text-emerald-300 transition-colors">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>自撮り短尺動画で即スタート</span>
            </div>
            <div className="flex items-center gap-2 hover:text-emerald-300 transition-colors">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>厳選企業から直接スカウト</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. マニフェスト（Manifesto: スクロール出現） */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#0F1423] border-b border-slate-800/80 relative">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <FadeInView>
            <span className="text-xs font-black tracking-widest text-emerald-400 uppercase">
              Manifesto
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mt-2">
              <span className="inline-block">ESという名の</span>
              <span className="inline-block">「作文コンテスト」を、</span><br className="hidden sm:inline" />
              <span className="text-emerald-400 inline-block">
                終わらせよう。
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed pt-3">
              <span className="inline-block">「どれだけ綺麗に文章を盛れたか」で</span>
              <span className="inline-block">合否が決まる就活に、</span>
              <span className="inline-block">何の意味があるのか。</span><br className="hidden sm:inline" />
              <span className="inline-block">「会ってみたら思っていた雰囲気と違った」と</span>
              <span className="inline-block">落胆する採用に、何の価値があるのか。</span>
            </p>
          </FadeInView>

          <FadeInView delay={200}>
            <div className="p-6 sm:p-8 bg-[#141B2D] rounded-3xl border border-slate-700/60 hover:border-emerald-500/40 transition-all duration-300 max-w-3xl mx-auto text-xs sm:text-sm text-slate-300 leading-relaxed text-left space-y-3 shadow-xl hover:shadow-[0_15px_30px_rgba(5,150,105,0.15)]">
              <p>
                文字情報では、あなたの最高の笑顔も、場を和ませる空気感も、対人での魅力も絶対に伝わらない。
              </p>
              <p className="font-bold text-white">
                だから私たちは、最初の接点を「数秒のショート動画」に変える。着飾った言葉ではなく、あなたそのものの人柄で惹かれあう新卒採用へ。
              </p>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. プロダクト体感（Interactive Experience: スクロール出現） */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#0B0F19] border-b border-slate-800/80">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FadeInView>
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <span className="text-xs font-black tracking-widest text-emerald-400 uppercase">
                Product Experience
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                <span className="inline-block">最初の数秒で、</span>
                <span className="inline-block">人柄を見抜く。</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                <span className="inline-block">指先ひとつのスワイプから、</span>
                <span className="inline-block">運命のオファーが生まれる。</span>
              </p>
            </div>
          </FadeInView>

          {/* 切り替えタブ */}
          <FadeInView delay={100}>
            <div className="flex justify-center mb-8">
              <div className="inline-flex p-1 bg-[#141B2D] rounded-2xl border border-slate-700/60 shadow-lg">
                <button
                  type="button"
                  onClick={() => setActiveTab("student")}
                  className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                    activeTab === "student"
                      ? "bg-emerald-600 text-white shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>学生視点（動画でアピール）</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("company")}
                  className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                    activeTab === "company"
                      ? "bg-emerald-600 text-white shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>企業視点（スワイプで発掘）</span>
                </button>
              </div>
            </div>
          </FadeInView>

          {/* 体感カード */}
          <FadeInView delay={200}>
            <div className="max-w-lg mx-auto bg-[#141B2D] rounded-3xl border border-slate-700/80 p-6 sm:p-8 shadow-2xl space-y-6 hover:border-emerald-500/50 hover:shadow-[0_20px_40px_rgba(5,150,105,0.2)] transition-all duration-300">
              {activeTab === "student" ? (
                <div className="space-y-5 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20 shadow-inner">
                    <Camera className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">
                      <span className="inline-block">自撮り感覚で</span>
                      <span className="inline-block">数秒の動画を置くだけ</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      エントリーシートは何十枚も書く必要はありません。スマホで撮ったPR動画を1本投稿したら、あとは企業からのスカウト通知を待つだけです。
                    </p>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="/register"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
                    >
                      <span>無料でショート動画を投稿する</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-5 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20 shadow-inner">
                    <Layers className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">
                      <span className="inline-block">隙間時間に縦スワイプで</span>
                      <span className="inline-block">即戦力発掘</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      通勤時間や面接の合間にショート動画をサクサク閲覧。表情や受け答えのテンポから、自社にフィットする候補者を直感的にスカウトできます。
                    </p>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="/company/login"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
                    >
                      <span>候補者をスワイプで探す</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. 学生向けベネフィット（For Candidates: スクロール出現） */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#0F1423] border-b border-slate-800/80">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeInView>
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
              <span className="text-xs font-black tracking-widest text-emerald-400 uppercase">
                For Candidates
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                <span className="inline-block">盛ったESはもう終わり。</span><br className="hidden sm:inline" />
                <span className="text-emerald-400 inline-block">短尺動画で届く、逆求人。</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                <span className="inline-block">文字の綺麗さではなく、</span>
                <span className="inline-block">あなたの表情やエネルギーそのものが最大の武器になる。</span>
              </p>
            </div>
          </FadeInView>

          <div className="grid md:grid-cols-3 gap-6">
            <FadeInView delay={100}>
              <div className="bg-[#141B2D] rounded-3xl border border-slate-700/60 p-6 sm:p-8 space-y-4 hover:border-emerald-500/50 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(5,150,105,0.2)] transition-all duration-300 shadow-lg h-full">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">文章力より、あなたらしさ</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  盛った自己PRや志望動機は不要。自然な笑顔、声のトーン、熱量がそのまま企業に届きます。
                </p>
              </div>
            </FadeInView>

            <FadeInView delay={200}>
              <div className="bg-[#141B2D] rounded-3xl border border-slate-700/60 p-6 sm:p-8 space-y-4 hover:border-emerald-500/50 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(5,150,105,0.2)] transition-all duration-300 shadow-lg h-full">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">動画を置いたら待つだけ</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  何十社もエントリーして疲弊する就活から解放。あなたに興味を持った企業から特別スカウトが届きます。
                </p>
              </div>
            </FadeInView>

            <FadeInView delay={300}>
              <div className="bg-[#141B2D] rounded-3xl border border-slate-700/60 p-6 sm:p-8 space-y-4 hover:border-emerald-500/50 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(5,150,105,0.2)] transition-all duration-300 shadow-lg h-full">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">「人柄重視」の優良企業が集結</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  美容、アパレル、成長ベンチャーなど、あなたのポテンシャルと個性を正当に評価する企業と直接つながれます。
                </p>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. 企業向けベネフィット（For Recruiters: スクロール出現） */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#0B0F19] border-b border-slate-800/80">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeInView>
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
              <span className="text-xs font-black tracking-widest text-emerald-400 uppercase">
                For Recruiters
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                <span className="inline-block">会ってガッカリをゼロに。</span><br className="hidden sm:inline" />
                <span className="text-emerald-400 inline-block">直感スワイプで即戦力をハックする。</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                <span className="inline-block">書類選考の工数を劇的に削減し、</span>
                <span className="inline-block">カルチャーにフィットする意欲的な人材を最速で獲得。</span>
              </p>
            </div>
          </FadeInView>

          <div className="grid md:grid-cols-3 gap-6">
            <FadeInView delay={100}>
              <div className="bg-[#141B2D] rounded-3xl border border-slate-700/60 p-6 sm:p-8 space-y-4 hover:border-emerald-500/50 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(5,150,105,0.2)] transition-all duration-300 shadow-lg h-full">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">書類選考の時間を90%削減</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  100人のESを読むのに10時間。JobSwipeなら15分のスワイプで会うべき人材を直感的に判断可能です。
                </p>
              </div>
            </FadeInView>

            <FadeInView delay={200}>
              <div className="bg-[#141B2D] rounded-3xl border border-slate-700/60 p-6 sm:p-8 space-y-4 hover:border-emerald-500/50 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(5,150,105,0.2)] transition-all duration-300 shadow-lg h-full">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">カルチャーマッチ率の最大化</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  表情やトーン、受け答えのテンポ感から、自社の社風にマッチする人材だけをピンポイント採用。
                </p>
              </div>
            </FadeInView>

            <FadeInView delay={300}>
              <div className="bg-[#141B2D] rounded-3xl border border-slate-700/60 p-6 sm:p-8 space-y-4 hover:border-emerald-500/50 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(5,150,105,0.2)] transition-all duration-300 shadow-lg h-full">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                  <Flame className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">熱量の高い母集団へアプローチ</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  動画を自ら投稿して自分を表現する、意欲的で行動力のあるZ世代のトップ層へダイレクトにオファー送信。
                </p>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. 活躍業界マトリクス（無限ループ・ティッカースクロール） */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-24 bg-[#0F1423] border-b border-slate-800/80 text-center overflow-hidden">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8 mb-10">
          <FadeInView>
            <div className="space-y-2">
              <span className="text-xs font-black tracking-widest text-emerald-400 uppercase">
                Target Sectors
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white">
                <span className="inline-block">「文字」よりも「対人印象」が</span>
                <span className="inline-block">武器になる、</span>
                <span className="inline-block">すべての業界へ。</span>
              </h2>
            </div>
          </FadeInView>
        </div>

        {/* 無限ループティッカー 1段目（左流動） */}
        <div className="relative w-full overflow-hidden py-2 mb-4">
          <div className="animate-marquee gap-3">
            {[...targetIndustriesRow1, ...targetIndustriesRow1, ...targetIndustriesRow1].map((ind, idx) => (
              <span
                key={`${ind}-${idx}`}
                className="text-xs sm:text-sm font-bold px-5 py-3 rounded-2xl bg-[#141B2D] border border-slate-700/80 text-slate-200 hover:border-emerald-500 hover:text-emerald-300 hover:scale-105 transition-all duration-200 shadow-md cursor-default whitespace-nowrap"
              >
                #{ind}
              </span>
            ))}
          </div>
        </div>

        {/* 無限ループティッカー 2段目（右流動） */}
        <div className="relative w-full overflow-hidden py-2">
          <div className="animate-marquee-reverse gap-3">
            {[...targetIndustriesRow2, ...targetIndustriesRow2, ...targetIndustriesRow2].map((ind, idx) => (
              <span
                key={`${ind}-${idx}`}
                className="text-xs sm:text-sm font-bold px-5 py-3 rounded-2xl bg-[#141B2D] border border-slate-700/80 text-slate-200 hover:border-emerald-500 hover:text-emerald-300 hover:scale-105 transition-all duration-200 shadow-md cursor-default whitespace-nowrap"
              >
                #{ind}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. 不安ゼロの安心設計（Trust & Safety: スクロール出現） */}
      {/* ========================================================================= */}
      <section className="py-20 bg-[#0B0F19] border-b border-slate-800/80">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
          <FadeInView>
            <div className="text-center space-y-2">
              <span className="text-xs font-black tracking-widest text-emerald-400 uppercase">
                Trust & Safety
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                <span className="inline-block">安心して自己表現できる、</span>
                <span className="inline-block">完全クローズド環境</span>
              </h2>
            </div>
          </FadeInView>

          <div className="grid md:grid-cols-2 gap-6">
            <FadeInView delay={100}>
              <div className="p-6 sm:p-8 bg-[#141B2D] rounded-3xl border border-slate-700/60 hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 space-y-3 shadow-lg h-full">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm sm:text-base">
                  <Lock className="w-5 h-5 flex-shrink-0" />
                  <span>審査制企業のみに限定公開</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  投稿された動画は、厳格な法人審査を通過した JobSwipe 登録企業の人事のみが閲覧可能です。SNSのように一般公開されたり外部へ拡散されることは一切ありません。
                </p>
              </div>
            </FadeInView>

            <FadeInView delay={200}>
              <div className="p-6 sm:p-8 bg-[#141B2D] rounded-3xl border border-slate-700/60 hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 space-y-3 shadow-lg h-full">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm sm:text-base">
                  <Camera className="w-5 h-5 flex-shrink-0" />
                  <span>編集不要・お題テンプレート付き</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  動画編集スキルは一切不要。話す内容に迷わないお題テンプレート（挨拶・人柄・強み）に沿ってスマホで撮影するだけで、魅力的なPR動画が完成します。
                </p>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. スマート利用ステップ（How it Works: スクロール出現） */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#0F1423] border-b border-slate-800/80">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <FadeInView>
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
              <span className="text-xs font-black tracking-widest text-emerald-400 uppercase">
                How It Works
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                <span className="inline-block">かんたん3ステップで</span>
                <span className="inline-block">スタート</span>
              </h2>
            </div>
          </FadeInView>

          <div className="grid md:grid-cols-3 gap-6">
            <FadeInView delay={100}>
              <div className="p-6 sm:p-8 bg-[#141B2D] rounded-3xl border border-slate-700/60 hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 space-y-3 relative shadow-lg h-full">
                <span className="text-4xl font-black text-emerald-400">
                  01
                </span>
                <h3 className="text-base font-bold text-white">数秒のPR動画を投稿</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  スマホで撮影した短尺動画をアップロード。あなたの強みや人柄を自由にアピールします。
                </p>
              </div>
            </FadeInView>

            <FadeInView delay={200}>
              <div className="p-6 sm:p-8 bg-[#141B2D] rounded-3xl border border-slate-700/60 hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 space-y-3 relative shadow-lg h-full">
                <span className="text-4xl font-black text-emerald-400">
                  02
                </span>
                <h3 className="text-base font-bold text-white">企業からオファーが届く</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  あなたの動画を見た企業の採用担当者からオファーが届きます。メッセージを確認して承諾。
                </p>
              </div>
            </FadeInView>

            <FadeInView delay={300}>
              <div className="p-6 sm:p-8 bg-[#141B2D] rounded-3xl border border-slate-700/60 hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 space-y-3 relative shadow-lg h-full">
                <span className="text-4xl font-black text-emerald-400">
                  03
                </span>
                <h3 className="text-base font-bold text-white">チャットでカジュアル面談</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  承諾後はWebチャットで日程を調整し、一次面接をスキップして面談へと進みます。
                </p>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. よくある質問（FAQ: スクロール出現） */}
      {/* ========================================================================= */}
      <section className="py-20 bg-[#0B0F19] border-b border-slate-800/80">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FadeInView>
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
              <span className="text-xs font-black tracking-widest text-emerald-400 uppercase">FAQ</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">よくあるご質問</h2>
            </div>
          </FadeInView>

          <FadeInView delay={100}>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-[#141B2D] rounded-2xl border border-slate-700/60 overflow-hidden transition-all shadow-sm hover:border-slate-600"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                  >
                    <span className="font-bold text-sm sm:text-base text-white flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    {openFaq === idx ? (
                      <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    )}
                  </button>

                  {openFaq === idx && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-700/40 bg-black/20">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. ファイナルCTA（スクロール出現） */}
      {/* ========================================================================= */}
      <section className="py-24 sm:py-32 bg-[#0B0F19] border-t border-slate-800 text-white text-center relative overflow-hidden">

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-6">
          <FadeInView>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              <span className="inline-block">さあ、あなたの魅力を</span><br className="hidden sm:inline" />
              <span className="text-emerald-400 inline-block drop-shadow-[0_0_30px_rgba(52,211,153,0.35)]">
                短尺動画に解き放とう。
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed pt-2">
              <span className="inline-block">履歴書の文字数で悩む時間は、今日でおしまい。</span><br className="hidden sm:inline" />
              <span className="inline-block">スマホひとつで、あなたを本当に求める企業に出会おう。</span>
            </p>
          </FadeInView>

          <FadeInView delay={200}>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="w-full sm:w-auto px-9 py-4 bg-emerald-600 hover:bg-emerald-500 text-white text-base font-bold rounded-2xl shadow-[0_10px_25px_rgba(5,150,105,0.3)] hover:shadow-[0_15px_35px_rgba(5,150,105,0.5)] transition-all active:scale-95 hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <User className="h-5 w-5 flex-shrink-0" />
                <span>今すぐ学生新規登録（完全無料）</span>
                <ArrowRight className="w-5 h-5 flex-shrink-0" />
              </Link>

              <Link
                href="/company/login"
                className="w-full sm:w-auto px-8 py-4 bg-[#141B2D] hover:bg-[#1D263F] text-slate-200 border border-slate-700/80 hover:border-emerald-500/50 hover:-translate-y-0.5 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2"
              >
                <Building2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>採用企業様 ログイン・登録</span>
              </Link>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. 信頼性フッター */}
      {/* ========================================================================= */}
      <footer className="bg-[#080B12] border-t border-slate-800 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-700 bg-white shadow-sm flex items-center justify-center p-0.5">
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
              <Link href="/register" className="hover:text-emerald-400 transition-colors">
                学生新規登録
              </Link>
              <Link href="/company/login" className="hover:text-emerald-400 transition-colors">
                採用担当の方はこちら
              </Link>
              <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                お問い合わせ・導入相談
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
