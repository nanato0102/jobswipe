"use client";

import { useState } from "react";
import Link from "next/link";
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
  Camera,
  Play,
  Heart,
  X,
  MessageSquare,
  Award,
  Check,
  CreditCard,
  Layers,
  Smile,
  Mic,
  Flame,
  Users,
  Target,
  BarChart2,
} from "lucide-react";

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"student" | "company">("student");

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const targetIndustriesRow1 = [
    "IT・Webサービス",
    "AI・ディープテック",
    "ベンチャー・スタートアップ",
    "マーケティング・SNS",
    "総合商社・専門商社",
    "人材・コンサルティング",
    "美容・コスメ・ヘルスケア",
  ];

  const targetIndustriesRow2 = [
    "アパレル・ライフスタイル",
    "総合営業・ソリューション",
    "不動産・PropTech",
    "ブライダル・ホテル・観光",
    "エンタメ・メディア",
    "メーカー・日用品",
    "企画・クリエイティブ",
  ];

  const pricingPlans = [
    {
      name: "ライトプラン",
      price: "3,800",
      quota: "30",
      description: "まずは気軽に新卒スカウトを試したい企業様向け",
      features: [
        "月間オファー 30枠付与",
        "自己PR動画スワイプ閲覧 無制限",
        "ダイレクトチャット面談",
        "メールサポート",
      ],
      popular: false,
    },
    {
      name: "スタンダードプラン",
      price: "9,800",
      quota: "100",
      description: "積極的な母集団形成・毎月安定してスカウトしたい企業様向け",
      features: [
        "月間オファー 100枠付与",
        "自己PR動画スワイプ閲覧 無制限",
        "ダイレクトチャット面談",
        "優先チャットサポート",
        "オファー承諾率アナリティクス",
      ],
      popular: true,
    },
    {
      name: "プレミアムプラン",
      price: "24,800",
      quota: "300",
      description: "複数職種や大量採用をスピード重視で行う企業様向け",
      features: [
        "月間オファー 300枠付与",
        "自己PR動画スワイプ閲覧 無制限",
        "ダイレクトチャット面談",
        "専任カスタマーサクセス",
        "スカウト文面添削サポート",
      ],
      popular: false,
    },
  ];

  const faqs = [
    {
      q: "動画の撮影は何を使えばいいですか？凝った編集は必要ですか？",
      a: "スマートフォンのインカメラで自撮り撮影するだけでOKです。編集や特殊効果は一切不要です。企業が求めているのは完璧なプレゼンテーションではなく、普段のあなたの自然な表情や話し方、人柄の雰囲気です。",
    },
    {
      q: "動画は何回でも撮り直しや差し替えができますか？",
      a: "はい、マイページから何度でも納得いくまで撮り直し・更新が可能です。就活の進捗や新たな挑戦に合わせていつでも最新のPR動画にアップデートできます。",
    },
    {
      q: "求職者・学生の利用料金は本当にかかりませんか？",
      a: "はい、求職者・学生の方は新規登録、動画投稿、オファー受信、チャット面談まですべて完全無料でご利用いただけます。",
    },
    {
      q: "投稿した動画がSNSのように勝手に一般公開・拡散される心配はありませんか？",
      a: "一切ありません。投稿された動画は、JobSwipeの厳格な法人審査を通過した登録企業の採用担当者のみが閲覧できる完全クローズドな環境で安全に管理されています。",
    },
    {
      q: "どんな企業からスカウトが届きますか？",
      a: "学歴や文字の履歴書ではなく、人柄や対人力、熱量を最重視する成長ITベンチャー、マーケティング、総合営業、サービス業界などの優良企業が多数参加しています。",
    },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-white text-slate-900 overflow-x-hidden">
      {/* ========================================================================= */}
      {/* 1. ヒーローセクション（白基調 ＋ 佐藤健太モック ＋ FadeInView） */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* 左側：キャッチコピー ＆ CTA */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <FadeInView>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold shadow-2xs">
                  <Sparkles className="h-4 w-4 text-emerald-700 flex-shrink-0" />
                  <span>人柄が採用の基準になる社会をつくる</span>
                </div>
              </FadeInView>

              <FadeInView delay={100}>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.18] text-slate-900">
                  履歴書を、<br />
                  <span className="text-emerald-700">スワイプする時代へ。</span>
                </h1>
              </FadeInView>

              <FadeInView delay={200}>
                <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  文字だけのESや学歴フィルターでは伝わらない「あなたの人柄や熱量」を、60秒の自己PR動画で可視化。企業から直感的なスカウトが届く新卒逆求人プラットフォームです。
                </p>
              </FadeInView>

              <FadeInView delay={300}>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
                  <Link
                    href="/register"
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <User className="w-4 h-4" />
                    <span>動画を撮ってスカウトを待つ（無料）</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/swipe"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Building2 className="w-4 h-4 text-blue-400" />
                    <span>企業向けスワイプを体験する</span>
                  </Link>
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-500 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-700 stroke-[2.5]" />
                    <span>登録・利用料 完全無料</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700 stroke-[2.5]" />
                    <span>厳格な法人審査制</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-700 stroke-[2.5]" />
                    <span>非公開・安全な動画管理</span>
                  </span>
                </div>
              </FadeInView>
            </div>

            {/* 右側：スワイプ画面の実物スマートフォンモックアップ */}
            <div className="lg:col-span-5 flex justify-center">
              <FadeInView delay={200}>
                <div className="relative w-full max-w-[280px] sm:max-w-[310px] aspect-[9/18] rounded-[36px] bg-slate-950 p-2.5 shadow-2xl border-4 border-slate-200">
                  {/* スマホ画面内部（宣材写真なしのクリーンなUIグラフィック） */}
                  <div className="relative w-full h-full rounded-[28px] overflow-hidden bg-slate-900 flex flex-col justify-between p-4 text-white">
                    {/* 上部ステータス */}
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-slate-800 text-[10px] font-bold text-slate-300 border border-slate-700">
                        自己PR動画 0:45 / 1:00
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-700 text-[10px] font-bold">LIVE</span>
                    </div>

                    {/* 中央：クリーンなアバター ＆ 音声認識波形ビジュアライザー */}
                    <div className="flex flex-col items-center justify-center space-y-3 my-auto">
                      <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center shadow-lg">
                        <User className="w-8 h-8 stroke-[2]" />
                      </div>

                      {/* 音声波形イコライザーバー */}
                      <div className="flex items-center gap-1 h-6">
                        <span className="w-1 h-3 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="w-1 h-5 bg-emerald-400 rounded-full animate-pulse delay-100" />
                        <span className="w-1 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="w-1 h-6 bg-emerald-400 rounded-full animate-pulse delay-200" />
                        <span className="w-1 h-4 bg-emerald-500 rounded-full animate-pulse delay-100" />
                        <span className="w-1 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      </div>

                      <div className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-md">
                        <Play className="w-4 h-4 ml-0.5 fill-current" />
                      </div>
                    </div>

                    {/* 下部プロフィール情報 */}
                    <div className="space-y-2">
                      <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-sm text-white">佐藤 健太</span>
                          <span className="text-[10px] text-slate-300">早稲田大学 (27卒)</span>
                        </div>
                        <p className="text-[10px] text-slate-300 line-clamp-1 mt-0.5">
                          「体育会サッカー部主将。チームを巻き込む推進力が武器です！」
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        <span className="px-2 py-0.5 bg-slate-800 text-slate-300 border border-slate-700 text-[9px] font-bold rounded">
                          #リーダーシップ
                        </span>
                        <span className="px-2 py-0.5 bg-slate-800 text-slate-300 border border-slate-700 text-[9px] font-bold rounded">
                          #行動力
                        </span>
                        <span className="px-2 py-0.5 bg-slate-800 text-slate-300 border border-slate-700 text-[9px] font-bold rounded">
                          #ポジティブ
                        </span>
                      </div>

                      {/* スワイプアクションボタン */}
                      <div className="flex items-center justify-between pt-1 gap-2">
                        <div className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-400 text-[11px] font-bold flex items-center justify-center gap-1 border border-slate-700">
                          <X className="w-3.5 h-3.5" />
                          <span>スキップ</span>
                        </div>
                        <div className="flex-1 py-2 rounded-xl bg-emerald-700 text-white text-[11px] font-bold flex items-center justify-center gap-1 shadow-xs">
                          <Heart className="w-3.5 h-3.5 fill-white" />
                          <span>気になる</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInView>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. 実績・信頼性指標カウンター (4大KPIカード: 単位色統一) */}
      {/* ========================================================================= */}
      <section className="py-8 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-2xs space-y-1">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">70%</span>
              <p className="text-xs text-slate-500 font-bold">面接前ミスマッチ削減</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-2xs space-y-1">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">85%</span>
              <p className="text-xs text-slate-500 font-bold">スカウト承諾率</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-2xs space-y-1">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">94%</span>
              <p className="text-xs text-slate-500 font-bold">登録学生 満足度</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-2xs space-y-1">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">500+</span>
              <p className="text-xs text-slate-500 font-bold">厳選審査 参画企業数</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. インタラクティブな「課題と解決」タブ切り替えセクション (id="features") */}
      {/* ========================================================================= */}
      <section id="features" className="py-16 sm:py-24 bg-white scroll-mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <FadeInView>
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block">
                WHY JOBSWIPE
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                なぜ、今「動画逆求人」なのか？
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                学生と企業、それぞれの就活・採用の課題を動画の力で解決します。
              </p>
            </div>
          </FadeInView>

          {/* 切り替えタブボタン */}
          <div className="flex justify-center">
            <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200 gap-1.5 shadow-2xs">
              <button
                type="button"
                onClick={() => setActiveTab("student")}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "student"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <User className="w-4 h-4 text-emerald-700" />
                <span>学生・求職者の方のメリット</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("company")}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "company"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Building2 className="w-4 h-4 text-blue-600" />
                <span>企業の採用担当者様のメリット</span>
              </button>
            </div>
          </div>

          {/* タブコンテンツ */}
          {activeTab === "student" ? (
            /* 学生向けカード3枚 */
            <div className="grid sm:grid-cols-3 gap-6 animate-fade-in">
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center font-black text-sm">
                  01
                </div>
                <h3 className="font-bold text-slate-900 text-base">ES文章力や学歴で落とされない</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  文章のテクニックではなく、声のトーンや笑顔、普段のあなたの人柄の雰囲気が直接評価されます。
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center font-black text-sm">
                  02
                </div>
                <h3 className="font-bold text-slate-900 text-base">動画を1本投稿して待つだけ</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  何十社もエントリーシートを書き直す必要はありません。スマホで自撮りした納得の60秒動画でスカウトを待てます。
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center font-black text-sm">
                  03
                </div>
                <h3 className="font-bold text-slate-900 text-base">カルチャーの合う企業からオファー</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  あなたの雰囲気や熱量に魅力を感じた企業から直接届くため、面接時のミスマッチが大幅に減ります。
                </p>
              </div>
            </div>
          ) : (
            /* 企業向けカード3枚 */
            <div className="grid sm:grid-cols-3 gap-6 animate-fade-in">
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 border border-blue-200 flex items-center justify-center font-black text-sm">
                  01
                </div>
                <h3 className="font-bold text-slate-900 text-base">面接前のミスマッチを劇的削減</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  文字の履歴書ではわからない候補者のリアルな雰囲気・熱量を把握でき、「会ってみたら違った」を防げます。
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 border border-blue-200 flex items-center justify-center font-black text-sm">
                  02
                </div>
                <h3 className="font-bold text-slate-900 text-base">スワイプで直感的なスカウト</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  隙間時間に学生の自己PR動画を縦スワイプでサクサク閲覧。気になる学生にその場でオファーを送信できます。
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 border border-blue-200 flex items-center justify-center font-black text-sm">
                  03
                </div>
                <h3 className="font-bold text-slate-900 text-base">月額9,800円〜の低リスク導入</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  高額な初期費用は不要。月100枠の充実したスカウト枠で、欲しい人材を効率よく集めることができます。
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. 「3つのステップで始まる逆求人」セクション (id="how-it-works") */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-slate-50 border-y border-slate-200 scroll-mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <FadeInView>
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block">
                HOW IT WORKS
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                オファー獲得までの3ステップ
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                スマートフォンひとつで完結。誰でも今日から簡単に逆求人をスタートできます。
              </p>
            </div>
          </FadeInView>

          <div className="grid sm:grid-cols-3 gap-6">
            {/* STEP 1 */}
            <FadeInView delay={100}>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4 relative h-full">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                    STEP 1
                  </span>
                  <Camera className="w-5 h-5 text-slate-400" />
                </div>
                <h3 className="text-base font-bold text-slate-900">60秒の自己PR動画を撮影</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  スマホのインカメラで自撮りするだけ。編集は不要で、あなたの笑顔や得意なことを素直に伝える動画を投稿します。
                </p>
              </div>
            </FadeInView>

            {/* STEP 2 */}
            <FadeInView delay={200}>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4 relative h-full">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-900 border border-blue-200 text-xs font-bold">
                    STEP 2
                  </span>
                  <Zap className="w-5 h-5 text-slate-400" />
                </div>
                <h3 className="text-base font-bold text-slate-900">企業がスワイプで閲覧</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  厳選された参画企業の採用担当者が、あなたの動画をスワイプ形式でチェック。「気になる」と思った学生へスカウトを送ります。
                </p>
              </div>
            </FadeInView>

            {/* STEP 3 */}
            <FadeInView delay={300}>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4 relative h-full">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-900 border border-slate-200 text-xs font-bold">
                    STEP 3
                  </span>
                  <MessageSquare className="w-5 h-5 text-slate-400" />
                </div>
                <h3 className="text-base font-bold text-slate-900">オファー承諾 ＆ チャット面談</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  届いたオファー内容を確認して承諾すると、個別チャットがオープン。日程を調整してカジュアル面談へ進みます。
                </p>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. 人柄が可視化される4大要素セクション */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <FadeInView>
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block">
                FEATURES
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                動画だから伝わる、4つの魅力
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                エントリーシートの文字では決して表現できない「あなたらしさ」が伝わります。
              </p>
            </div>
          </FadeInView>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-emerald-700 flex items-center justify-center shadow-2xs">
                <Smile className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">笑顔・自然な表情</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                対面した時のような親しみやすさや人柄の良さが、1秒で直感的に届きます。
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-blue-600 flex items-center justify-center shadow-2xs">
                <Mic className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">声のトーン・話し方</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                ハキハキとした話し方や聞き取りやすい声など、コミュニケーションの基礎力が伝わります。
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-amber-600 flex items-center justify-center shadow-2xs">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">熱量・推進力</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                学生時代に打ち込んだ経験への想いやパッションが、熱を持ってまっすぐ届きます。
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-purple-600 flex items-center justify-center shadow-2xs">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">社風・カルチャーマッチ</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                企業の社風やチームメンバーとの相性を、事前の動画でスムーズに確かめられます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. 「注目の参画業界」無限ティッカースクロール（Marqueeアニメーション完全復元） */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-slate-50 border-y border-slate-200 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <FadeInView>
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block">
                TARGET INDUSTRIES
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                人柄を重視する多彩な業界が参画中
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                急成長ベンチャーから大手グループまで、熱量とポテンシャルを求める企業があなたを探しています。
              </p>
            </div>
          </FadeInView>

          {/* 無限ループ・ティッカーコンテナ（Row 1 & Row 2） */}
          <div className="space-y-3 pt-2">
            {/* Row 1: 左へスクロール */}
            <div className="flex overflow-hidden select-none [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="animate-marquee gap-3 flex">
                {[...targetIndustriesRow1, ...targetIndustriesRow1, ...targetIndustriesRow1].map((ind, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2.5 bg-white text-slate-800 text-xs sm:text-sm font-bold rounded-xl border border-slate-200 shadow-2xs whitespace-nowrap flex items-center gap-2 hover:border-slate-400 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 flex-shrink-0" />
                    <span>{ind}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2: 右へスクロール */}
            <div className="flex overflow-hidden select-none [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="animate-marquee-reverse gap-3 flex">
                {[...targetIndustriesRow2, ...targetIndustriesRow2, ...targetIndustriesRow2].map((ind, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2.5 bg-white text-slate-800 text-xs sm:text-sm font-bold rounded-xl border border-slate-200 shadow-2xs whitespace-nowrap flex items-center gap-2 hover:border-slate-400 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                    <span>{ind}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. 「企業の料金プラン」セクション (id="pricing") */}
      {/* ========================================================================= */}
      <section id="pricing" className="py-16 sm:py-24 bg-white scroll-mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <FadeInView>
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block">
                PRICING PLANS
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                導入しやすい透明な料金体系
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                学生・求職者は完全無料。企業様は採用規模に応じて月額 3,800円〜 スタート可能です。
              </p>
            </div>
          </FadeInView>

          <div className="grid sm:grid-cols-3 gap-6">
            {pricingPlans.map((plan, idx) => (
              <FadeInView key={idx} delay={idx * 100}>
                <div
                  className={`bg-white rounded-3xl border p-6 sm:p-7 space-y-5 flex flex-col justify-between relative shadow-xs h-full ${
                    plan.popular
                      ? "border-blue-600 ring-2 ring-blue-600/20"
                      : "border-slate-200"
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-slate-900 text-white font-bold text-[10px] shadow-2xs">
                      一番人気・推奨
                    </span>
                  )}

                  <div className="space-y-3">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{plan.name}</h3>
                      <p className="text-xs text-slate-500 mt-1">{plan.description}</p>
                    </div>

                    <div className="py-3 border-y border-slate-100">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-slate-900">¥{plan.price}</span>
                        <span className="text-xs text-slate-500 font-bold">/月 (税別)</span>
                      </div>
                      <p className="text-xs font-bold text-blue-700 mt-1">月間 {plan.quota}枠 付与</p>
                    </div>

                    <ul className="space-y-2 text-xs text-slate-600">
                      {plan.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href="/company/register"
                    className={`w-full py-3 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer ${
                      plan.popular
                        ? "bg-slate-900 hover:bg-slate-800 text-white"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                    }`}
                  >
                    <span>このプランで無料登録</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </FadeInView>
            ))}
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center text-xs text-slate-500 space-y-1">
            <p>※追加のオファー枠（スポット増枠：+20枠 2,500円〜）はマイページよりいつでも購入可能です。</p>
            <p>
              <Link href="/tokusho" className="underline font-bold text-slate-700 hover:text-slate-900">
                特定商取引法に基づく表記（お支払い方法・解約特約等） ↗
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. 「よくあるご質問（FAQ）」セクション (id="faq") */}
      {/* ========================================================================= */}
      <section id="faq" className="py-16 sm:py-24 bg-slate-50 border-y border-slate-200 scroll-mt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <FadeInView>
            <div className="text-center space-y-3">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block">
                FAQ
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                よくあるご質問
              </h2>
            </div>
          </FadeInView>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-xs sm:text-sm cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <HelpCircle className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. ファイナルCTAセクション */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-6">
            {/* 学生向けカード */}
            <FadeInView delay={100}>
              <div className="bg-white rounded-3xl border border-emerald-200 shadow-xs p-6 sm:p-8 space-y-5 flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200">
                    <User className="w-3.5 h-3.5" />
                    <span>学生・求職者の方</span>
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    60秒の動画で、<br />
                    あなたに惹かれる企業と出会う。
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    登録・動画投稿・オファー受信まですべて完全無料。スマホから今すぐ動画をアップロードしてスカウトを受け取りましょう。
                  </p>
                </div>

                <Link
                  href="/register"
                  className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>無料会員登録して動画を投稿する</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeInView>

            {/* 企業向けカード */}
            <FadeInView delay={200}>
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-5 flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-900 font-bold text-xs border border-blue-200">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>企業の採用ご担当者様</span>
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    面接前の動画スワイプで、<br />
                    採用のミスマッチを劇的に削減。
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    月額 3,800円〜（標準プラン 100枠/9,800円）。まずはデモ環境で動画スワイプの操作性をぜひ体験してください。
                  </p>
                </div>

                <Link
                  href="/company/register"
                  className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>企業アカウントを作成する</span>
                  <ArrowRight className="w-4 h-4 text-blue-400" />
                </Link>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>
    </div>
  );
}
