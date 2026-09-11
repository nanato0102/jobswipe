"use client";

import { useState } from "react";
import Link from "next/link";
import FadeInView from "@/components/FadeInView";
import {
  Sparkles,
  User,
  Building2,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
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
      {/* 1. ヒーローセクション（洗練されたエディトリアルレイアウト ＆ 高精細UIカード） */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 lg:pt-24 lg:pb-32 bg-white border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* 左側：キャッチコピー ＆ 学生特化CTA */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <FadeInView>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span className="text-slate-900 font-bold">新世代・動画逆求人プラットフォーム</span>
                </div>
              </FadeInView>

              <FadeInView delay={100}>
                <h1 className="text-3xl min-[400px]:text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-slate-900">
                  <span className="block">履歴書を、</span>
                  <span className="text-emerald-700 inline-block">スワイプする時代へ。</span>
                </h1>
              </FadeInView>

              <FadeInView delay={200}>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                  AIが量産したテンプレESはもういらない。文字フィルターを超え、スマホ自撮り60秒動画で「素の人柄・熱量・対人力」を可視化。あなたらしさに惹かれた優良企業から直接逆指名オファーが届きます。
                </p>
              </FadeInView>

              <FadeInView delay={300}>
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5">
                  <Link
                    href="/register"
                    className="px-8 py-4 rounded-md bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
                  >
                    <User className="w-4 h-4 text-emerald-200" />
                    <span>動画を投稿してスカウトを待つ（完全無料）</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

                {/* 学生向け安心バッジ（フォントサイズ13px以上で視認性を確保） */}
                <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2.5 gap-x-6 text-xs sm:text-[13px] text-slate-600 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                    <span>利用料 完全無料</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                    <span>承諾まで本名非公開</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <RotateCcw className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                    <span>撮り直し何度でもOK</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                    <span>審査通過企業のみ公開</span>
                  </span>
                </div>

                {/* 企業担当者向け専用導線 */}
                <div className="pt-3 text-xs sm:text-sm text-slate-500 flex items-center justify-center lg:justify-start gap-1.5 font-medium">
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

            {/* 右側：ハイエンド・プロダクトUIカード（高精細プレビュー） */}
            <div className="lg:col-span-5 flex justify-center">
              <FadeInView delay={200}>
                <div className="relative w-full max-w-[320px] sm:max-w-[340px] rounded-2xl bg-slate-900 p-3 shadow-2xl border border-slate-800 ring-1 ring-white/10">
                  <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-slate-950 flex flex-col justify-between p-4.5 text-white">
                    {/* 背景グラデーション */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-900/60 z-0" />

                    {/* トップステータス */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md text-xs font-semibold text-slate-200 border border-white/10">
                        自己PR動画 0:45 / 1:00
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-600 text-xs font-bold text-white tracking-wide">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        VERIFIED
                      </span>
                    </div>

                    {/* 中央：動画再生インジケータ ＆ 波形 */}
                    <div className="relative z-10 flex flex-col items-center justify-center space-y-3.5 my-auto">
                      <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer group">
                        <Play className="w-6 h-6 ml-1 fill-white text-white group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex items-center gap-1.5 h-6 px-3 py-1 rounded-full bg-slate-900/70 backdrop-blur-sm border border-white/10">
                        <span className="w-1 h-3 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="w-1 h-5 bg-emerald-300 rounded-full animate-pulse delay-100" />
                        <span className="w-1 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="w-1 h-6 bg-emerald-300 rounded-full animate-pulse delay-200" />
                        <span className="w-1 h-4 bg-emerald-400 rounded-full animate-pulse delay-100" />
                        <span className="w-1 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="text-[11px] font-mono text-emerald-300 ml-1">AUDIO ON</span>
                      </div>
                    </div>

                    {/* 下部：候補者プロフィール情報 */}
                    <div className="relative z-10 space-y-3">
                      <div className="bg-slate-900/90 backdrop-blur-md p-3.5 rounded-lg border border-white/10 space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-base text-white">S.K さん</span>
                          <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
                            情報科学専攻 (27卒)
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-200 leading-snug font-medium">
                          「チームを巻き込む推進力と、課題を構造化する論理的思考が得意です」
                        </p>
                      </div>

                      {/* ハッシュタグ */}
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2 py-1 bg-white/10 backdrop-blur-sm text-slate-200 border border-white/10 text-xs font-medium rounded-md">
                          #課題解決力
                        </span>
                        <span className="px-2 py-1 bg-white/10 backdrop-blur-sm text-slate-200 border border-white/10 text-xs font-medium rounded-md">
                          #推進力
                        </span>
                        <span className="px-2 py-1 bg-white/10 backdrop-blur-sm text-slate-200 border border-white/10 text-xs font-medium rounded-md">
                          #チームワーク
                        </span>
                      </div>

                      {/* スワイプアクション */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div className="py-2.5 rounded-md bg-slate-800/80 text-slate-300 text-xs font-bold flex items-center justify-center gap-1.5 border border-white/10">
                          <X className="w-4 h-4" />
                          <span>パス</span>
                        </div>
                        <div className="py-2.5 rounded-md bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm">
                          <Heart className="w-4 h-4 fill-white" />
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
      {/* 2. 【対比構造】従来の就活 vs JobSwipe（洗練されたスプリット・エディトリアル） */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <FadeInView>
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block">
                PARADIGM SHIFT
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                文字に縛られた就活を、動画で根本から変える
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                これまでの就活で感じていた理不尽や徒労感を、60秒の自己PR動画が解消します。
              </p>
            </div>
          </FadeInView>

          <div className="grid md:grid-cols-3 gap-6">
            {/* 対比1 */}
            <FadeInView delay={100}>
              <div className="bg-white rounded-lg border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col h-full">
                <div className="p-5 bg-slate-100/60 border-b border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-wider">
                    <X className="w-4 h-4 text-slate-400" />
                    <span>従来の就活</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal line-through decoration-slate-400/60">
                    大学名や文章テクニックだけで足切りされ、本来の人柄を見てもらえない
                  </p>
                </div>

                <div className="p-6 bg-white flex-1 space-y-2.5">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                    <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                    <span>JobSwipeの変革</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    声のトーンや素の笑顔、表情の熱量で直接評価される
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    文字の履歴書では絶対に伝わらない、あなたの魅力と対話力がファーストコンタクトで正当に届きます。
                  </p>
                </div>
              </div>
            </FadeInView>

            {/* 対比2 */}
            <FadeInView delay={200}>
              <div className="bg-white rounded-lg border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col h-full">
                <div className="p-5 bg-slate-100/60 border-b border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-wider">
                    <X className="w-4 h-4 text-slate-400" />
                    <span>従来の就活</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal line-through decoration-slate-400/60">
                    何十社も同じようなエントリーシートを書き直す膨大な時間浪費
                  </p>
                </div>

                <div className="p-6 bg-white flex-1 space-y-2.5">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                    <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                    <span>JobSwipeの変革</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    納得の60秒動画1本で、優良企業から直接逆指名
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    一度ベストな動画を撮影して登録すれば、あなたに魅力を感じた企業からスカウトが届く「待ちの就活」が可能に。
                  </p>
                </div>
              </div>
            </FadeInView>

            {/* 対比3 */}
            <FadeInView delay={300}>
              <div className="bg-white rounded-lg border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col h-full">
                <div className="p-5 bg-slate-100/60 border-b border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-wider">
                    <X className="w-4 h-4 text-slate-400" />
                    <span>従来の就活</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal line-through decoration-slate-400/60">
                    面接で緊張して素が出せず、カルチャー不一致で落とされる
                  </p>
                </div>

                <div className="p-6 bg-white flex-1 space-y-2.5">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                    <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                    <span>JobSwipeの変革</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    あなたの雰囲気に惹かれた企業と、対等に対話できる
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    あらかじめ動画で人柄やテンポを理解した上でオファーされるため、面接時の緊張がほぐれ、高いマッチ率を誇ります。
                  </p>
                </div>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. Bento Grid による機能価値提案 (id="features") */}
      {/* ========================================================================= */}
      <section id="features" className="py-20 sm:py-28 bg-white border-b border-slate-200/80 scroll-mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <FadeInView>
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block">
                WHY JOBSWIPE
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                なぜ、今「動画逆求人」なのか？
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-normal">
                学生と企業、双方のミスマッチと工数を最小化する次世代マッチングの仕組み
              </p>
            </div>
          </FadeInView>

          {/* セグメント切り替えタブ */}
          <div className="flex justify-center">
            <div className="inline-flex p-1 bg-slate-100 rounded-md border border-slate-200 gap-1">
              <button
                type="button"
                onClick={() => setActiveTab("student")}
                className={`px-5 py-2.5 rounded-[4px] text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "student"
                    ? "bg-white text-slate-900 shadow-2xs border border-slate-200/80"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <User className="w-4 h-4 text-emerald-700" />
                <span>学生・求職者の方のメリット</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("company")}
                className={`px-5 py-2.5 rounded-[4px] text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "company"
                    ? "bg-white text-slate-900 shadow-2xs border border-slate-200/80"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Building2 className="w-4 h-4 text-slate-700" />
                <span>企業の採用担当者様のメリット</span>
              </button>
            </div>
          </div>

          {/* Bento Grid レイアウト */}
          {activeTab === "student" ? (
            <div className="grid md:grid-cols-12 gap-6 animate-fade-in">
              {/* メインフィーチャーカード（7カラム） */}
              <div className="md:col-span-7 bg-slate-900 text-white rounded-xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden shadow-lg border border-slate-800">
                <div className="space-y-4 relative z-10">
                  <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
                    FEATURE 01
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                    ESや学歴の壁を突破。<br />
                    あなたの「人柄と熱量」が正当に届く。
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                    文章のテクニックや大学名による書類足切りはありません。声のトーン、思考の深さ、普段のあなたの自然なコミュニケーション力が直接企業に届きます。
                  </p>
                </div>

                <div className="pt-8 relative z-10 flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 font-semibold text-slate-200">
                    <Check className="w-4 h-4 text-emerald-400" /> 完全無料
                  </span>
                  <span className="flex items-center gap-1.5 font-semibold text-slate-200">
                    <Check className="w-4 h-4 text-emerald-400" /> 撮り直し無制限
                  </span>
                </div>
              </div>

              {/* サイドカード2枚（5カラム） */}
              <div className="md:col-span-5 flex flex-col gap-6">
                <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 space-y-3 shadow-2xs flex-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    FEATURE 02
                  </span>
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">動画1本を投稿して待つだけ</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    何十社もエントリーシートを書き直す労力は不要。納得の60秒動画を1本登録すれば、優良企業からスカウトが届きます。
                  </p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 space-y-3 shadow-2xs flex-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    FEATURE 03
                  </span>
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">社風に合う企業から直接オファー</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    あなたの価値観や雰囲気に惹かれた企業から届くため、面接時のミスマッチや選考辞退が大幅に減少します。
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* 企業向けBento Grid */
            <div className="grid md:grid-cols-12 gap-6 animate-fade-in">
              <div className="md:col-span-7 bg-slate-900 text-white rounded-xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden shadow-lg border border-slate-800">
                <div className="space-y-4 relative z-10">
                  <span className="px-2.5 py-1 rounded bg-blue-950 text-blue-400 border border-blue-500/30 text-xs font-bold uppercase tracking-wider">
                    FOR RECRUITER 01
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                    面接前のミスマッチを根絶。<br />
                    会う前に「人柄・対人力」を確信。
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                    文字の履歴書では見抜けない候補者のリアルな雰囲気・論理的思考力・熱量を60秒で把握。「会ってみたら違った」という採用工数の無駄をゼロにします。
                  </p>
                </div>

                <div className="pt-8 relative z-10 flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 font-semibold text-slate-200">
                    <Check className="w-4 h-4 text-blue-400" /> 最短1営業日導入
                  </span>
                  <span className="flex items-center gap-1.5 font-semibold text-slate-200">
                    <Check className="w-4 h-4 text-blue-400" /> 完全審査制
                  </span>
                </div>
              </div>

              <div className="md:col-span-5 flex flex-col gap-6">
                <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 space-y-3 shadow-2xs flex-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    FOR RECRUITER 02
                  </span>
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">縦スワイプで隙間時間に即断</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    移動時間や面接の合間に候補者動画をサクサク閲覧。カルチャーマッチする優秀層へその場でオファーを送信。
                  </p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 space-y-3 shadow-2xs flex-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    FOR RECRUITER 03
                  </span>
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">長文スカウト作成工数の削減</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    個別メッセージの作成負担を最小化し、本当に自社に合うポテンシャル層とスピーディーに面談日程を設定。
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. 流れるような3ステップ (id="how-it-works") */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200/80 scroll-mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <FadeInView>
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block">
                HOW IT WORKS
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                オファー獲得までの3ステップ
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-normal">
                スマートフォンひとつで完結。初めて動画を撮る方でも安心してスタートできます。
              </p>
            </div>
          </FadeInView>

          <div className="grid sm:grid-cols-3 gap-6 relative">
            {/* STEP 1 */}
            <FadeInView delay={100}>
              <div className="bg-white rounded-lg border border-slate-200/90 shadow-2xs p-7 space-y-4 flex flex-col justify-between h-full relative">
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-slate-300 font-mono tracking-tighter">01</span>
                    <div className="w-8 h-8 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
                      <Camera className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">60秒の自己PR動画を撮影</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    スマホのインカメラで自撮りするだけ。編集は一切不要です。台本テンプレートに沿って話すだけで自然なPR動画が完成します。
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2 text-xs sm:text-[13px] text-slate-600 font-medium">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>撮り直し無制限</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>台本テンプレート完備</span>
                  </div>
                </div>
              </div>
            </FadeInView>

            {/* STEP 2 */}
            <FadeInView delay={200}>
              <div className="bg-white rounded-lg border border-slate-200/90 shadow-2xs p-7 space-y-4 flex flex-col justify-between h-full relative">
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-slate-300 font-mono tracking-tighter">02</span>
                    <div className="w-8 h-8 rounded-md bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">審査通過企業がスワイプ閲覧</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    厳正な法人審査を通過した企業の採用担当者のみが動画をチェック。「人柄や熱量に惹かれた」学生へ直接オファーが届きます。
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2 text-xs sm:text-[13px] text-slate-600 font-medium">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>承諾まで本名非公開</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>完全クローズド管理</span>
                  </div>
                </div>
              </div>
            </FadeInView>

            {/* STEP 3 */}
            <FadeInView delay={300}>
              <div className="bg-white rounded-lg border border-slate-200/90 shadow-2xs p-7 space-y-4 flex flex-col justify-between h-full relative">
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-slate-300 font-mono tracking-tighter">03</span>
                    <div className="w-8 h-8 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">オファー承諾 ＆ チャット面談</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    届いたオファー内容を確認して承諾すると個別チャットがオープン。ES選考をスキップしてスムーズにカジュアル面談へ進めます。
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2 text-xs sm:text-[13px] text-slate-600 font-medium">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>ES選考免除で即面談</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>事前相互理解で高マッチ率</span>
                  </div>
                </div>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. 評価軸セクション（エディトリアル・グリッド） */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <FadeInView>
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block">
                EVALUATION CRITERIA
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                外見ではなく「内面と熱量」を正当に評価
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-normal">
                単なる容姿の選別ではありません。動画だからこそ伝わる論理性や熱量、カルチャーフィットを判定します。
              </p>
            </div>
          </FadeInView>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-lg bg-slate-50/70 border border-slate-200/80 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-800 shadow-2xs">
                  <Smile className="w-5 h-5 text-emerald-700" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">自然な対人力・人柄</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  対面した際のような親しみやすさや誠実さ、チームに馴染むコミュニケーション力が伝わります。
                </p>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-slate-50/70 border border-slate-200/80 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-800 shadow-2xs">
                  <Mic className="w-5 h-5 text-slate-700" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">論理的思考・構成力</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  60秒の中で結論から要点を分かりやすく伝える構成力やプレゼンテーション力が伝わります。
                </p>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-slate-50/70 border border-slate-200/80 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-800 shadow-2xs">
                  <Flame className="w-5 h-5 text-slate-700" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">熱量・推進力</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  挑戦した経験や成し遂げたい想いへのパッションが、熱を持ってまっすぐ企業に届きます。
                </p>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-slate-50/70 border border-slate-200/80 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-800 shadow-2xs">
                  <Users className="w-5 h-5 text-slate-700" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">カルチャーフィット</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  企業の社風やチームメンバーの価値観との相性を、事前の動画でスムーズに確かめ合えます。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. 「注目の参画業界」無限ティッカースクロール */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200/80 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <FadeInView>
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block">
                TARGET INDUSTRIES
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                人柄と熱量を重視する多彩な業界が参画中
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-normal">
                急成長ベンチャーから大手グループまで、あなたのポテンシャルを求める企業がオファーを送っています。
              </p>
            </div>
          </FadeInView>

          {/* 無限ループ・ティッカーコンテナ */}
          <div className="space-y-3 pt-2">
            <div className="flex overflow-hidden select-none [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="animate-marquee gap-3 flex">
                {[...targetIndustriesRow1, ...targetIndustriesRow1, ...targetIndustriesRow1].map((ind, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2.5 bg-white text-slate-800 text-sm font-semibold rounded-md border border-slate-200 shadow-2xs whitespace-nowrap flex items-center gap-2.5 hover:border-slate-400 transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-700 flex-shrink-0" />
                    <span>{ind}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex overflow-hidden select-none [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="animate-marquee-reverse gap-3 flex">
                {[...targetIndustriesRow2, ...targetIndustriesRow2, ...targetIndustriesRow2].map((ind, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2.5 bg-white text-slate-800 text-sm font-semibold rounded-md border border-slate-200 shadow-2xs whitespace-nowrap flex items-center gap-2.5 hover:border-slate-400 transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full bg-slate-500 flex-shrink-0" />
                    <span>{ind}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. よくあるご質問（FAQ） */}
      {/* ========================================================================= */}
      <section id="faq" className="py-20 sm:py-28 bg-white border-b border-slate-200/80 scroll-mt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <FadeInView>
            <div className="text-center space-y-3">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block">
                FAQ
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
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
                  className={`rounded-lg border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "border-slate-300 bg-white shadow-sm"
                      : "border-slate-200/90 bg-white hover:border-slate-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start gap-3.5">
                      <span
                        className={`w-6 h-6 rounded text-xs font-black flex items-center justify-center flex-shrink-0 transition-colors mt-0.5 ${
                          isOpen
                            ? "bg-slate-900 text-white"
                            : "bg-slate-100 text-slate-700 border border-slate-200"
                        }`}
                      >
                        Q
                      </span>
                      <span className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                        {faq.q}
                      </span>
                    </div>
                    <div
                      className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-slate-900" : "text-slate-400"
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 bg-slate-50/50">
                      <div className="flex items-start gap-3.5">
                        <span className="w-6 h-6 rounded bg-emerald-700 text-white text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                          A
                        </span>
                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal pt-0.5">
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
      {/* 8. ファイナルCTAセクション */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <FadeInView>
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-8 sm:p-14 space-y-6">
              <div className="space-y-3 max-w-2xl mx-auto">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 text-slate-800 font-semibold text-xs border border-slate-200">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <span>完全無料で今日からスタート</span>
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  60秒の動画で、あなたに惹かれる企業と出会う。
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg mx-auto font-normal">
                  登録・動画投稿・オファー受信まですべて完全無料。スマホひとつで、あなたの熱量と人柄を評価する優良企業からのスカウトを受け取りましょう。
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                <Link
                  href="/register"
                  className="w-full py-4 bg-emerald-700 hover:bg-emerald-600 text-white rounded-md text-base font-bold transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  <span>無料会員登録して動画を投稿する</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-[13px] text-slate-500 font-medium pt-2">
                <span>✓ 撮り直し自由</span>
                <span>✓ 台本テンプレートあり</span>
                <span>✓ 審査通過企業のみ限定公開</span>
              </div>
            </div>
          </FadeInView>

          {/* 企業向け専用LP導線 */}
          <div className="pt-2 text-xs sm:text-sm text-slate-500 flex items-center justify-center gap-2 font-medium">
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
