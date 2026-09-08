"use client";

import { useState } from "react";
import Link from "next/link";
import FadeInView from "@/components/FadeInView";
import {
  Sparkles,
  User,
  Building2,
  ArrowRight,
  HelpCircle,
  Zap,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Camera,
  Play,
  Heart,
  X,
  MessageSquare,
  Check,
  Smile,
  Mic,
  Flame,
  Users,
  FileText,
  RotateCcw,
  Lock,
  ArrowUpRight,
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

  const faqs = [
    {
      q: "動画の撮影は何を使えばいいですか？凝った編集は必要ですか？",
      a: "スマートフォンのインカメラで自撮り撮影するだけでOKです。編集や特殊効果は一切不要です。企業が求めているのは完璧な動画編集ではなく、普段のあなたの自然な話し方や人柄、熱量の雰囲気です。",
    },
    {
      q: "話す内容に自信がありません。何を話せばいいですか？",
      a: "ご安心ください。JobSwipeでは『自己紹介・ガクチカ・強み・将来の志向』など、質問に答えるだけで60秒の自己PRが完成する台本テンプレートとお題アシストをご用意しています。",
    },
    {
      q: "動画は何回でも撮り直しや差し替えができますか？",
      a: "はい、納得いくまで何度でも撮り直し・更新が可能です。就活の進捗や新たな挑戦に合わせていつでも最新のPR動画にアップデートできます。",
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
      q: "容姿や見た目だけで選別されるのではないかと不安です。",
      a: "JobSwipeはルッキズムを助長するものではありません。動画を通じて『話す内容の論理性』『課題に対する行動力や想い』『企業のカルチャーとの相性』など、文字の履歴書では拾いきれない本質的なポテンシャルや人柄を正当に評価するためのプラットフォームです。",
    },
    {
      q: "大学の友人や知人、インターン先の企業に身バレしませんか？",
      a: "ご安心ください。スワイプ閲覧・オファー送信の段階では、お名前はプライバシー保護のためイニシャル（例：S.Kさん）で表示されます。あなたが企業のオファーを承諾して個別チャットに進むまで本名は開示されません。また、厳格な法人審査を通過した企業のみがアクセスできる完全非公開環境で安全に管理されています。",
    },
    {
      q: "どんな企業からスカウトが届きますか？",
      a: "学歴や文字の履歴書ではなく、人柄や対人力、熱量を最重視する成長ITベンチャー、マーケティング、総合営業、コンサルティングなどの優良企業が多数参加しています。",
    },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-white text-slate-900 overflow-x-hidden">
      {/* ========================================================================= */}
      {/* 1. ヒーローセクション（白基調 ＋ 専攻・強み軸モック ＋ 新規性エッジCTA） */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* 左側：キャッチコピー ＆ 学生特化CTA */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <FadeInView>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold shadow-2xs">
                  <Sparkles className="h-4 w-4 text-emerald-700 flex-shrink-0" />
                  <span>【新世代の動画逆求人】ES不要・履歴書スワイプ採用</span>
                </div>
              </FadeInView>

              <FadeInView delay={100}>
                <h1 className="text-2xl min-[390px]:text-[26px] sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-slate-900">
                  <span className="block sm:inline">履歴書を、</span>
                  <span className="text-emerald-700 whitespace-nowrap inline-block">スワイプする時代へ。</span>
                </h1>
              </FadeInView>

              <FadeInView delay={200}>
                <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  AIが量産したテンプレESはもういらない。文字フィルターを超え、スマホ自撮り60秒動画で「素の人柄・熱量・対人力」を可視化。あなたらしさに惹かれた優良企業から直接逆指名オファーが届きます。
                </p>
              </FadeInView>

              <FadeInView delay={300}>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
                  <Link
                    href="/register"
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <User className="w-4 h-4" />
                    <span>動画を投稿してスカウトを待つ（完全無料）</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* 学生向け安心バッジ */}
                <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-5 text-xs text-slate-600 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-700 stroke-[2.5]" />
                    <span>登録・利用料 完全無料</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-emerald-700 stroke-[2.5]" />
                    <span>承諾まで本名非公開（イニシャル表示）</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <RotateCcw className="w-4 h-4 text-emerald-700 stroke-[2.5]" />
                    <span>何度でも撮り直し可能</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-emerald-700 stroke-[2.5]" />
                    <span>台本テンプレート完備</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700 stroke-[2.5]" />
                    <span>審査通過企業のみ限定公開</span>
                  </span>
                </div>

                {/* 企業担当者向け専用導線 */}
                <div className="pt-3 text-xs text-slate-500 flex items-center justify-center lg:justify-start gap-1.5">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  <span>採用ご担当者様はこちら ➔ </span>
                  <Link
                    href="/for-company"
                    className="font-bold text-slate-900 hover:text-emerald-700 hover:underline transition-colors"
                  >
                    企業向けサービス案内ページ
                  </Link>
                </div>
              </FadeInView>
            </div>

            {/* 右側：スワイプ画面の実物スマートフォンモックアップ（専攻・強み軸） */}
            <div className="lg:col-span-5 flex justify-center">
              <FadeInView delay={200}>
                <div className="relative w-full max-w-[280px] sm:max-w-[310px] aspect-[9/18] rounded-[36px] bg-slate-950 p-2.5 shadow-2xl border-4 border-slate-200">
                  <div className="relative w-full h-full rounded-[28px] overflow-hidden bg-slate-900 flex flex-col justify-between p-4 text-white">
                    {/* 上部ステータス */}
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-slate-800 text-[10px] font-bold text-slate-300 border border-slate-700">
                        自己PR動画 0:45 / 1:00
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-700 text-[10px] font-bold">LIVE</span>
                    </div>

                    {/* 中央：アバター ＆ 音声波形 */}
                    <div className="flex flex-col items-center justify-center space-y-3 my-auto">
                      <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center shadow-lg">
                        <User className="w-8 h-8 stroke-[2]" />
                      </div>

                      <div className="flex items-center gap-1 h-6">
                        <span className="w-1 h-3 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="w-1 h-5 bg-emerald-400 rounded-full animate-pulse delay-100" />
                        <span className="w-1 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="w-1 h-6 bg-emerald-400 rounded-full animate-pulse delay-200" />
                        <span className="w-1 h-4 bg-emerald-500 rounded-full animate-pulse delay-100" />
                        <span className="w-1 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      </div>

                      <div className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-md">
                        <Play className="w-4 h-4 ml-0.5 fill-current" />
                      </div>
                    </div>

                    {/* 下部プロフィール情報（専攻・強み軸） */}
                    <div className="space-y-2">
                      <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-sm text-white">佐藤 健太</span>
                          <span className="text-[10px] text-emerald-400 font-bold">情報科学・データ専攻 (27卒)</span>
                        </div>
                        <p className="text-[10px] text-slate-300 line-clamp-1 mt-0.5">
                          「チームを巻き込む推進力と、課題を構造化する論理的思考が得意です！」
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        <span className="px-2 py-0.5 bg-slate-800 text-slate-300 border border-slate-700 text-[9px] font-bold rounded">
                          #課題解決力
                        </span>
                        <span className="px-2 py-0.5 bg-slate-800 text-slate-300 border border-slate-700 text-[9px] font-bold rounded">
                          #推進力
                        </span>
                        <span className="px-2 py-0.5 bg-slate-800 text-slate-300 border border-slate-700 text-[9px] font-bold rounded">
                          #チームワーク
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
      {/* 2. 【対比構造】従来の就活 vs JobSwipeによる革命（Before / After） */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <FadeInView>
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block">
                PARADIGM SHIFT
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                <span className="inline-block">文字に縛られた就活を、</span>
                <span className="inline-block">動画で根本からアップデート</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                これまでの就活で感じていた理不尽や徒労感を、60秒の自己PR動画がすべて解消します。
              </p>
            </div>
          </FadeInView>

          <div className="grid md:grid-cols-3 gap-6">
            {/* 対比1 */}
            <FadeInView delay={100}>
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 space-y-5 shadow-2xs h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 space-y-1">
                    <span className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                      <X className="w-4 h-4 text-rose-700" />
                      <span>従来の就活の苦痛</span>
                    </span>
                    <p className="text-xs text-rose-800 leading-relaxed font-bold">
                      大学名や文章力だけで足切りされ、人柄を見てもらえない
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1.5">
                  <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-700 stroke-[2.5]" />
                    <span>JobSwipeの変革</span>
                  </span>
                  <p className="text-xs text-emerald-900 leading-relaxed font-bold">
                    【文字フィルター撤廃】声のトーンや素の笑顔、表情の熱量で一発評価される。
                  </p>
                </div>
              </div>
            </FadeInView>

            {/* 対比2 */}
            <FadeInView delay={200}>
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 space-y-5 shadow-2xs h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 space-y-1">
                    <span className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                      <X className="w-4 h-4 text-rose-700" />
                      <span>従来の就活の苦痛</span>
                    </span>
                    <p className="text-xs text-rose-800 leading-relaxed font-bold">
                      何十社も志望動機やガクチカを書き直す膨大な時間浪費
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1.5">
                  <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-700 stroke-[2.5]" />
                    <span>JobSwipeの変革</span>
                  </span>
                  <p className="text-xs text-emerald-900 leading-relaxed font-bold">
                    【自撮り動画1本で待つだけ】納得の60秒を投稿すれば、優良企業から逆指名。
                  </p>
                </div>
              </div>
            </FadeInView>

            {/* 対比3 */}
            <FadeInView delay={300}>
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 space-y-5 shadow-2xs h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 space-y-1">
                    <span className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                      <X className="w-4 h-4 text-rose-700" />
                      <span>従来の就活の苦痛</span>
                    </span>
                    <p className="text-xs text-rose-800 leading-relaxed font-bold">
                      面接で緊張して素が出せず、カルチャー不一致で落とされる
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1.5">
                  <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-700 stroke-[2.5]" />
                    <span>JobSwipeの変革</span>
                  </span>
                  <p className="text-xs text-emerald-900 leading-relaxed font-bold">
                    【志望動機不要のカジュアル面談】あなたの雰囲気に惹かれた企業と対等に対話。
                  </p>
                </div>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. インタラクティブな「学生 ＆ 企業 メリット」タブ切り替え (id="features") */}
      {/* ========================================================================= */}
      <section id="features" className="py-16 sm:py-24 bg-white scroll-mt-16 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <FadeInView>
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block">
                WHY JOBSWIPE
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                <span className="inline-block">なぜ、今</span>
                <span className="inline-block">「動画逆求人」なのか？</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                学生と企業、双方のミスマッチと工数を最小化する次世代マッチングの仕組み
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
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-7 space-y-3.5 text-center flex flex-col items-center justify-between shadow-2xs">
                <div className="space-y-3 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center font-black text-sm mx-auto shadow-2xs">
                    01
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base whitespace-nowrap">ESや学歴で落とされない</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    文章のテクニックや大学名ではなく、声のトーンや思考の深さ、普段のあなたの人柄の雰囲気が直接評価されます。
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-7 space-y-3.5 text-center flex flex-col items-center justify-between shadow-2xs">
                <div className="space-y-3 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center font-black text-sm mx-auto shadow-2xs">
                    02
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base whitespace-nowrap">動画1本を投稿して待つだけ</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    何十社も同じようなエントリーシートを書き直す必要はありません。スマホで自撮りした納得の60秒動画でスカウトを待てます。
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-7 space-y-3.5 text-center flex flex-col items-center justify-between shadow-2xs">
                <div className="space-y-3 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center font-black text-sm mx-auto shadow-2xs">
                    03
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base whitespace-nowrap">社風の合う企業からオファー</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    あなたの雰囲気や熱量、価値観に魅力を感じた企業から直接届くため、面接時のミスマッチが大幅に減ります。
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* 企業向けカード3枚 */
            <div className="grid sm:grid-cols-3 gap-6 animate-fade-in">
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-7 space-y-3.5 text-center flex flex-col items-center justify-between shadow-2xs">
                <div className="space-y-3 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 border border-blue-200 flex items-center justify-center font-black text-sm mx-auto shadow-2xs">
                    01
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base whitespace-nowrap">面接前のミスマッチを削減</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    文字の履歴書ではわからない候補者のリアルな雰囲気・熱量・論理的思考力を把握でき、「会ってみたら違った」を防げます。
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-7 space-y-3.5 text-center flex flex-col items-center justify-between shadow-2xs">
                <div className="space-y-3 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 border border-blue-200 flex items-center justify-center font-black text-sm mx-auto shadow-2xs">
                    02
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base whitespace-nowrap">スワイプで直感スカウト</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    隙間時間に学生の自己PR動画を縦スワイプでサクサク閲覧。自社に合う学生にその場でオファーを送信できます。
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-7 space-y-3.5 text-center flex flex-col items-center justify-between shadow-2xs">
                <div className="space-y-3 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 border border-blue-200 flex items-center justify-center font-black text-sm mx-auto shadow-2xs">
                    03
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base whitespace-nowrap">人柄重視の効率的な採用</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    学歴や資格の文字情報だけでは見抜けない、自社のカルチャーにマッチしたポテンシャル層を効率よく採用できます。
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. 「3つのステップで始まる逆求人」セクション (id="how-it-works") */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200 scroll-mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <FadeInView>
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block">
                HOW IT WORKS
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                <span className="inline-block">オファー獲得までの</span>
                <span className="inline-block">3ステップ</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                スマートフォンひとつで完結。初めて動画を撮る方でも安心してスタートできます。
              </p>
            </div>
          </FadeInView>

          <div className="grid sm:grid-cols-3 gap-6">
            {/* STEP 1 */}
            <FadeInView delay={100}>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-7 space-y-4 relative h-full flex flex-col items-center text-center justify-between">
                <div className="space-y-3 flex flex-col items-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                    <Camera className="w-3.5 h-3.5" />
                    <span>STEP 1</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">60秒の自己PR動画を自撮り</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    スマホのインカメラで自撮りするだけ。編集は不要で、用意された質問に答えるだけで自然なPR動画が完成します。
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 w-full space-y-1.5 text-[11px] text-slate-600 font-bold text-left max-w-[240px] mx-auto">
                  <div className="flex items-center gap-1.5 text-emerald-800">
                    <Check className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>何度でも撮り直しOK</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-800">
                    <Check className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>台本テンプレート完備</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-800">
                    <Check className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>審査通過企業のみ限定公開</span>
                  </div>
                </div>
              </div>
            </FadeInView>

            {/* STEP 2 */}
            <FadeInView delay={200}>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-7 space-y-4 relative h-full flex flex-col items-center text-center justify-between">
                <div className="space-y-3 flex flex-col items-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-blue-900 border border-blue-200 text-xs font-bold">
                    <Zap className="w-3.5 h-3.5" />
                    <span>STEP 2</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">企業がスワイプで閲覧</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    厳選された参画企業の採用担当者が、あなたの動画をチェック。「人柄や熱量に惹かれた」学生へ直接スカウトを送ります。
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 w-full text-[11px] text-slate-500 text-center">
                  <span className="font-bold text-slate-700">安心の非公開管理</span>
                  <p className="text-[10px] text-slate-400 mt-0.5">法人審査済みの採用担当者のみ閲覧</p>
                </div>
              </div>
            </FadeInView>

            {/* STEP 3 */}
            <FadeInView delay={300}>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-7 space-y-4 relative h-full flex flex-col items-center text-center justify-between">
                <div className="space-y-3 flex flex-col items-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 text-slate-900 border border-slate-200 text-xs font-bold">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>STEP 3</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">オファー承諾 ＆ チャット面談</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    届いたオファー内容を確認して承諾すると個別チャットがオープン。日程を調整してカジュアル面談へ進みます。
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 w-full text-[11px] text-slate-500 text-center">
                  <span className="font-bold text-slate-700">ES選考なしで即面談</span>
                  <p className="text-[10px] text-slate-400 mt-0.5">事前の雰囲気確認で高マッチ率</p>
                </div>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. 人柄・内面が可視化される4大要素セクション */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <FadeInView>
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block">
                EVALUATION CRITERIA
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                <span className="inline-block">外見ではなく</span>
                <span className="inline-block">「内面と熱量」を正当に評価</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                単なる容姿の選別ではありません。動画だからこそ伝わる『話す内容の論理性』『行動への熱量』『カルチャーマッチ』を評価する仕組みです。
              </p>
            </div>
          </FadeInView>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3 text-center flex flex-col items-center justify-between shadow-2xs">
              <div className="space-y-2.5 flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-emerald-700 flex items-center justify-center shadow-2xs mx-auto">
                  <Smile className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">自然な対人力・人柄</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  対面した際のような親しみやすさや誠実さ、チームに馴染むコミュニケーション力が伝わります。
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3 text-center flex flex-col items-center justify-between shadow-2xs">
              <div className="space-y-2.5 flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-blue-600 flex items-center justify-center shadow-2xs mx-auto">
                  <Mic className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">論理的思考・構成力</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  60秒という限られた時間の中で、結論から分かりやすく伝える構成力やプレゼンテーション力が伝わります。
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3 text-center flex flex-col items-center justify-between shadow-2xs">
              <div className="space-y-2.5 flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-amber-600 flex items-center justify-center shadow-2xs mx-auto">
                  <Flame className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">熱量・推進力</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  学生時代に挑戦した経験や、将来成し遂げたい想いへのパッションが、熱を持ってまっすぐ届きます。
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3 text-center flex flex-col items-center justify-between shadow-2xs">
              <div className="space-y-2.5 flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-purple-600 flex items-center justify-center shadow-2xs mx-auto">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">カルチャーフィット</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  企業の社風やチームメンバーの価値観との相性を、事前の動画でスムーズに確かめ合えます。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. 「注目の参画業界」無限ティッカースクロール（Marqueeアニメーション） */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <FadeInView>
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block">
                TARGET INDUSTRIES
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                <span className="inline-block">人柄と熱量を重視する</span>
                <span className="inline-block">多彩な業界が参画中</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                急成長ベンチャーから大手グループまで、あなたのポテンシャルを求める企業がオファーを送っています。
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
      {/* 7. よくあるご質問（FAQ） (id="faq") */}
      {/* ========================================================================= */}
      <section id="faq" className="py-16 sm:py-24 bg-white border-b border-slate-200 scroll-mt-16">
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
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "border-emerald-400/80 bg-white shadow-sm ring-1 ring-emerald-300/40"
                      : "border-slate-200 bg-white hover:border-slate-300 shadow-2xs"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 sm:p-5 text-left flex items-start sm:items-center justify-between gap-4 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <span
                        className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center flex-shrink-0 transition-colors mt-0.5 sm:mt-0 ${
                          isOpen
                            ? "bg-emerald-700 text-white"
                            : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        }`}
                      >
                        Q
                      </span>
                      <span className="font-bold text-slate-900 text-xs sm:text-sm leading-snug">
                        {faq.q}
                      </span>
                    </div>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? "bg-emerald-50 text-emerald-700 rotate-180" : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-3.5 border-t border-slate-100 bg-slate-50/70 animate-fade-in">
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs font-black flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5">
                          A
                        </span>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-0.5">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. ファイナルCTAセクション（学生特化メイン ＆ 企業専用LP導線） */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <FadeInView>
            <div className="bg-white rounded-3xl border border-emerald-200 shadow-xs p-8 sm:p-12 space-y-6">
              <div className="space-y-3 max-w-2xl mx-auto">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>完全無料で今日からスタート</span>
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  <span className="inline-block">60秒の動画で、</span>
                  <span className="inline-block">あなたに惹かれる企業と出会う。</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
                  登録・動画投稿・オファー受信まですべて完全無料。スマホひとつで、あなたの熱量と人柄を評価する優良企業からのスカウトを受け取りましょう。
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                <Link
                  href="/register"
                  className="w-full py-4 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  <span>無料会員登録して動画を投稿する</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs text-slate-500 font-bold pt-2">
                <span>✓ 撮り直し自由</span>
                <span>✓ 台本テンプレートあり</span>
                <span>✓ 審査通過企業のみ限定公開</span>
              </div>
            </div>
          </FadeInView>

          {/* 企業向け専用LP導線 */}
          <div className="pt-2 text-xs text-slate-500 flex items-center justify-center gap-2">
            <Building2 className="w-4 h-4 text-slate-400" />
            <span>採用担当者様向けのご案内はこちら ➔ </span>
            <Link
              href="/for-company"
              className="font-bold text-slate-900 hover:text-emerald-700 hover:underline transition-colors"
            >
              企業向けサービスのご案内（企業専用ページ）
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
