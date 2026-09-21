"use client";

import { useState } from "react";
import Link from "next/link";
import FadeInView from "@/components/FadeInView";
import {
  Building2,
  ArrowRight,
  ShieldCheck,
  Check,
  Play,
  Heart,
  X,
  User,
  Clock,
  Lock,
  ChevronDown,
  MessageSquare,
  Sparkles,
  BarChart3,
  Search,
} from "lucide-react";

export default function ForCompanyPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const companyFaqs = [
    {
      q: "どのような学生が登録していますか？",
      a: "学歴や資格の文字情報だけでなく、自身の『人柄・熱量・対話力』を強みとして企業にアピールしたい意欲的な学生（主に26卒・27卒・28卒の大学生・大学院生）が多数登録しています。",
    },
    {
      q: "導入までにどのくらいの期間がかかりますか？",
      a: "Webフォームからのお申し込み後、最短1営業日で法人審査が完了し、即日アカウントを発行いたします。発行後はすぐに学生のPR動画をスワイプ閲覧・オファー送信していただけます。",
    },
    {
      q: "学生の動画は社外に流出したりSNS等で拡散されたりしませんか？",
      a: "一切ありません。JobSwipeに登録された動画は、厳格な法人審査を通過した登録企業の採用担当者のみがアクセスできる完全非公開・高セキュリティ環境で管理されています。",
    },
    {
      q: "初期費用や利用開始時の料金体系はどうなっていますか？",
      a: "企業利用のお申し込みおよびアカウント開設・掲載審査は完全無料です。具体的なプラン詳細や料金体系につきましては、審査通過後の専用管理画面にてご確認いただくか、お問い合わせフォームより資料をご請求ください。",
    },
    {
      q: "候補者の本名や連絡先はいつ確認できますか？",
      a: "スワイプ閲覧・オファー送信の段階では、学生のプライバシー保護のためイニシャル表示（例：S.Kさん）となります。学生が貴社からのオファーを承諾した時点でフルネーム（本名）が開示され、個別チャットにて面談日程をスムーズに調整いただけます。",
    },
    {
      q: "スカウト送信後の選考フローはどう進めればよいですか？",
      a: "学生がオファーを承諾すると、システム内で個別チャットが利用可能になります。チャット上でカジュアル面談や会社説明会、1次選考の日程調整をスムーズに進めていただけます。",
    },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-white text-slate-900 overflow-x-hidden">
      {/* ========================================================================= */}
      {/* 1. ヒーローセクション（白基調・BtoB向け洗練エディトリアルレイアウト） */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28 bg-white border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* 左側：企業向けキャッチコピー ＆ CTA */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <FadeInView>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-50 border border-blue-200 text-blue-900 text-xs sm:text-sm font-semibold">
                  <Building2 className="h-4 w-4 text-blue-700 flex-shrink-0" />
                  <span>面接前のミスマッチを根絶する動画スワイプ採用</span>
                </div>
              </FadeInView>

              <FadeInView delay={100}>
                <h1 className="text-3xl min-[400px]:text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-slate-900">
                  <span className="block">面接で、</span>
                  <span className="block text-blue-700">「思っていた人と違った」</span>
                  <span className="block">をゼロに。</span>
                </h1>
              </FadeInView>

              <FadeInView delay={200}>
                <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                  AI生成ESによる書類選考の形骸化を打破。<br className="hidden sm:inline" />
                  通勤・移動の隙間時間に縦スワイプで候補者の表情・論理性・熱量を即断し、<br className="hidden sm:inline" />
                  カルチャーマッチする優秀層をダイレクトスカウト。
                </p>
              </FadeInView>

              <FadeInView delay={300}>
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5">
                  <Link
                    href="/company/register"
                    className="px-8 py-4 rounded-md bg-blue-700 hover:bg-blue-600 text-white font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
                  >
                    <Building2 className="w-4 h-4 text-blue-200" />
                    <span>企業利用をお申し込み（無料審査申請）</span>
                    <ArrowRight className="w-4 h-4 text-blue-200 group-hover:translate-x-0.5 transition-transform" />
                  </Link>

                  <Link
                    href="/contact"
                    className="px-6 py-4 rounded-md bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base border border-slate-300 shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-slate-500" />
                    <span>資料請求・導入相談</span>
                  </Link>
                </div>

                {/* 信頼性バッジ */}
                <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2.5 gap-x-6 text-xs sm:text-[13px] text-slate-600 font-medium">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700 stroke-[2.5]" />
                    <span>安心の完全審査制</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-blue-700 stroke-[2.5]" />
                    <span>学生動画の非公開管理</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-700 stroke-[2.5]" />
                    <span>1分で簡単申請</span>
                  </span>
                </div>
              </FadeInView>
            </div>

            {/* 右側：企業スワイプUIモックアップ（白・ライトグレーの洗練されたフレーム） */}
            <div className="lg:col-span-5 flex justify-center">
              <FadeInView delay={200}>
                <div className="relative w-full max-w-[320px] sm:max-w-[340px] rounded-2xl bg-slate-50 p-3 shadow-xl border border-slate-200">
                  <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-slate-900 flex flex-col justify-between p-4.5 text-white shadow-inner">
                    {/* 上部ステータス */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md bg-slate-900/90 text-xs font-semibold text-slate-200 border border-slate-700">
                        自己PR 0:45 / 1:00
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-blue-600 text-xs font-bold text-white shadow-2xs">
                        候補者動画
                      </span>
                    </div>

                    {/* 中央：動画再生インジケータ ＆ 音声バー */}
                    <div className="relative z-10 flex flex-col items-center justify-center space-y-3 my-auto">
                      <div className="w-14 h-14 rounded-full bg-white/20 border border-white/40 text-white flex items-center justify-center shadow-lg">
                        <Play className="w-6 h-6 ml-1 fill-white text-white" />
                      </div>

                      <div className="flex items-center gap-1.5 h-6 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700">
                        <span className="w-1 h-3 bg-blue-400 rounded-full animate-pulse" />
                        <span className="w-1 h-5 bg-blue-300 rounded-full animate-pulse delay-100" />
                        <span className="w-1 h-2 bg-blue-400 rounded-full animate-pulse" />
                        <span className="w-1 h-6 bg-blue-300 rounded-full animate-pulse delay-200" />
                        <span className="w-1 h-4 bg-blue-400 rounded-full animate-pulse delay-100" />
                        <span className="w-1 h-2 bg-blue-400 rounded-full animate-pulse" />
                        <span className="text-[11px] font-mono text-blue-300 ml-1">AUDIO ON</span>
                      </div>
                    </div>

                    {/* 下部プロフィール ＆ アクション */}
                    <div className="relative z-10 space-y-2.5">
                      <div className="bg-white/95 text-slate-900 p-3.5 rounded-lg border border-slate-200 shadow-sm space-y-1.5">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className="font-bold text-sm text-slate-900">S.K さん</span>
                          <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200 text-xs font-semibold">
                            早稲田大学 商学部 (27卒)
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 leading-snug font-medium line-clamp-2">
                          「体育会サッカー部主将。チームを巻き込む推進力と愚直な行動力が武器です！」
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2 py-0.5 bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium rounded-md">
                          #発信・オープン型
                        </span>
                        <span className="px-2 py-0.5 bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium rounded-md">
                          #論理・合理型
                        </span>
                        <span className="px-2 py-0.5 bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium rounded-md">
                          #推進力
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-0.5">
                        <div className="py-2 rounded-md bg-slate-800 text-slate-300 text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-700">
                          <X className="w-3.5 h-3.5" />
                          <span>スキップ</span>
                        </div>
                        <div className="py-2 rounded-md bg-blue-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs">
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
      {/* 2. 【対比構造】従来の採用課題 vs JobSwipe（明るいスプリットカード） */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <FadeInView>
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block">
                PAIN & SOLUTION
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-snug sm:leading-tight">
                <span className="block">新卒採用における</span>
                <span className="block">「構造的な課題」を解決</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-normal">
                従来の文字選考・形骸化した書類選考のムダを、<br className="hidden sm:inline" />
                60秒動画が根本から解消します。
              </p>
            </div>
          </FadeInView>

          <div className="grid md:grid-cols-3 gap-6">
            {/* 課題1 */}
            <FadeInView delay={100}>
              <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col h-full">
                <div className="p-5 bg-slate-100 border-b border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-wider">
                    <X className="w-4 h-4 text-slate-400" />
                    <span>採用課題 01</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    <span className="block">AI生成ESでは</span>
                    <span className="block">「素の対人力」が見えない</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    文章作成テクニックに長けた候補者を書類通過させても、1次面接で落とす工数ロスが膨大に。
                  </p>
                </div>

                <div className="p-5 sm:p-6 bg-white flex-1 space-y-2.5">
                  <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider">
                    <Check className="w-4 h-4 text-blue-600 stroke-[3]" />
                    <span>JobSwipeの解決策</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    <span className="block">声のトーンや表情、</span>
                    <span className="block">60秒の動画で事前に確信</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    会う前に人柄や対話力をチェックできるため、1次面接の通過率と選考精度が飛躍的に向上します。
                  </p>
                </div>
              </div>
            </FadeInView>

            {/* 課題2 */}
            <FadeInView delay={200}>
              <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col h-full">
                <div className="p-5 bg-slate-100 border-b border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-wider">
                    <X className="w-4 h-4 text-slate-400" />
                    <span>採用課題 02</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    <span className="block">書類選考と面接の</span>
                    <span className="block">ギャップによる選考辞退</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    「会ってみたら社風と違った」という理由で、選考終盤や内定直前での辞退が発生。
                  </p>
                </div>

                <div className="p-5 sm:p-6 bg-white flex-1 space-y-2.5">
                  <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider">
                    <Check className="w-4 h-4 text-blue-600 stroke-[3]" />
                    <span>JobSwipeの解決策</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    <span className="block">求める人物像との相性を</span>
                    <span className="block">事前に見極めてオファー</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    相互のカルチャーフィットを前提にスカウトするため、面談合致率が高く内定承諾につながります。
                  </p>
                </div>
              </div>
            </FadeInView>

            {/* 課題3 */}
            <FadeInView delay={300}>
              <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col h-full">
                <div className="p-5 bg-slate-100 border-b border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-wider">
                    <X className="w-4 h-4 text-slate-400" />
                    <span>採用課題 03</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    <span className="block">長文スカウト作成の</span>
                    <span className="block">工数過多と低い返信率</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    候補者ごとに長文メッセージを作成する負担が重く、採用担当者のコア業務が圧迫。
                  </p>
                </div>

                <div className="p-5 sm:p-6 bg-white flex-1 space-y-2.5">
                  <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider">
                    <Check className="w-4 h-4 text-blue-600 stroke-[3]" />
                    <span>JobSwipeの解決策</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    <span className="block">隙間時間に縦スワイプで</span>
                    <span className="block">即断アプローチ</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    移動中などに動画をサクサク確認し、直感的にオファー送信。スピード感ある日程調整が可能です。
                  </p>
                </div>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. Bento Grid による導入メリット（白・ライトブルー基調） */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <FadeInView>
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block">
                BENEFITS
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-snug sm:leading-tight">
                <span className="block">採用プラットフォームが</span>
                <span className="block">もたらす新たな価値</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-normal">
                書類選考工数の劇的な削減と、カルチャーマッチする優秀層のダイレクト採用を実現
              </p>
            </div>
          </FadeInView>

          <div className="grid md:grid-cols-12 gap-6">
            {/* メインフィーチャーカード（7カラム：白＆淡いブルーの洗練されたカード） */}
            <div className="md:col-span-7 bg-blue-50/70 border-2 border-blue-200/90 rounded-xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <span className="px-2.5 py-1 rounded-md bg-blue-100 text-blue-900 border border-blue-300 text-xs font-bold uppercase tracking-wider inline-block">
                  FOR ENTERPRISE 01
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                  <span className="block">選考の歩留まりを劇的に改善し、</span>
                  <span className="block">採用工数を大幅削減。</span>
                </h3>
                <p className="text-xs sm:text-sm lg:text-base text-slate-700 leading-relaxed font-normal">
                  文字の履歴書では見抜けない「素の対人力・論理的思考力・熱量」を60秒動画で把握。会うべき候補者を事前に確信できるため、無駄な面接を根絶します。
                </p>
              </div>

              <div className="pt-6 sm:pt-8 flex flex-wrap items-center gap-4 text-xs text-slate-700 border-t border-blue-200/80 mt-6">
                <span className="flex items-center gap-1.5 font-bold text-blue-900">
                  <Check className="w-4 h-4 text-blue-700 stroke-[2.5]" /> 最短1営業日導入
                </span>
                <span className="flex items-center gap-1.5 font-bold text-blue-900">
                  <Check className="w-4 h-4 text-blue-700 stroke-[2.5]" /> 完全審査制
                </span>
                <span className="flex items-center gap-1.5 font-bold text-blue-900">
                  <Check className="w-4 h-4 text-blue-700 stroke-[2.5]" /> 0円アカウント開設
                </span>
              </div>
            </div>

            {/* サイドカード2枚（5カラム） */}
            <div className="md:col-span-5 flex flex-col gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 space-y-3 shadow-2xs flex-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  FOR ENTERPRISE 02
                </span>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                  <span className="block">移動中の隙間時間に</span>
                  <span className="block">縦スワイプで即断</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  スマホやPCで候補者動画をサクサク閲覧。自社のカルチャーに合う学生にその場でオファー送信。
                </p>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 space-y-3 shadow-2xs flex-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  FOR ENTERPRISE 03
                </span>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                  <span className="block">MBTI準拠の4軸</span>
                  <span className="block">パーソナリティで分析</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  発信力、論理性、推進力、カルチャーフィットなど、求める人物像に合致したタグで検索・スカウト。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. 導入から採用までの3ステップ */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <FadeInView>
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block">
                HOW TO START
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-snug sm:leading-tight">
                <span className="block">導入からスカウト送信までの</span>
                <span className="block">3ステップ</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-normal">
                最短1営業日でアカウント発行。すぐに学生の自己PR動画を閲覧し、スカウトを開始できます。
              </p>
            </div>
          </FadeInView>

          <div className="grid sm:grid-cols-3 gap-6">
            <FadeInView delay={100}>
              <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-6 sm:p-7 space-y-4 flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <span className="text-2xl font-black text-slate-300 font-mono tracking-tighter block">01</span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    <span className="block">Webフォームから</span>
                    <span className="block">利用申請</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    会社名、ご担当者情報、ご連絡先を入力して送信（所要時間約1分）。利用申請・審査は完全無料です。
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
                  ✓ 費用は一切かかりません
                </div>
              </div>
            </FadeInView>

            <FadeInView delay={200}>
              <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-6 sm:p-7 space-y-4 flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <span className="text-2xl font-black text-slate-300 font-mono tracking-tighter block">02</span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    <span className="block">掲載審査 ＆</span>
                    <span className="block">アカウント発行</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    運営事務局による法人確認審査（通常1〜2営業日）完了後、専用ログイン情報をメールにてご案内します。
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
                  ✓ 最短即日でアカウント発行
                </div>
              </div>
            </FadeInView>

            <FadeInView delay={300}>
              <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-6 sm:p-7 space-y-4 flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <span className="text-2xl font-black text-slate-300 font-mono tracking-tighter block">03</span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    <span className="block">スワイプ閲覧 ＆</span>
                    <span className="block">スカウト送信</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    候補者のPR動画を縦スワイプで閲覧。気になる学生にオファーを送り、承諾後は個別チャットで日程調整へ。
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
                  ✓ チャットで即面談設定
                </div>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. 安心の法人審査制 ＆ セキュリティ方針（白・ライトグレー基調） */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <FadeInView>
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-10 lg:p-12 space-y-8 border border-slate-200/90 shadow-xs">
              <div className="flex flex-col items-center text-center gap-3 border-b border-slate-200 pb-6 sm:pb-8">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center flex-shrink-0 mx-auto">
                  <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl min-[390px]:text-2xl sm:text-3xl font-black tracking-tight text-slate-900 leading-snug sm:leading-tight">
                    <span className="block">安心・安全の完全審査制 ＆</span>
                    <span className="block">非公開動画管理</span>
                  </h3>
                  <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
                    学生と参画企業双方の信頼とプライバシーを保護するための厳格なガバナンス体制
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2">
                  <span className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600 stroke-[2.5]" />
                    <span>厳格な法人審査</span>
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    登記情報の実在性および採用活動実績を確認した適格な法人企業のみにアカウントを発行。
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2">
                  <span className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600 stroke-[2.5]" />
                    <span>クローズド動画配信</span>
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    一般SNSのような外部公開や拡散を完全防止。審査通過企業の人事担当者のみが限定閲覧。
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2">
                  <span className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600 stroke-[2.5]" />
                    <span>段階的プライバシー</span>
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    スワイプ時はイニシャル表示。学生がオファー承諾後にフルネームが開示される適正管理。
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2">
                  <span className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600 stroke-[2.5]" />
                    <span>IPAセキュリティ準拠</span>
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    「安全なウェブサイトの作り方」に準拠した通信暗号化および堅牢なアクセス制御を実施。
                  </p>
                </div>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. 企業向けよくあるご質問（FAQ） */}
      {/* ========================================================================= */}
      <section id="faq" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <FadeInView>
            <div className="text-center space-y-3">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block">
                FAQ FOR ENTERPRISE
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                企業様からよくあるご質問
              </h2>
            </div>
          </FadeInView>

          <div className="space-y-3">
            {companyFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "border-blue-300 bg-white shadow-sm ring-1 ring-blue-100"
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
                            ? "bg-blue-700 text-white"
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
                        <p className="text-xs sm:text-sm lg:text-base text-slate-700 leading-relaxed font-normal pt-0.5">
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
      {/* 7. ファイナルCTA（白・淡いブルー基調の爽やかで信頼感のあるアクション枠） */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <FadeInView>
            <div className="bg-blue-50/80 text-slate-900 rounded-2xl p-6 sm:p-12 lg:p-14 space-y-6 shadow-sm border-2 border-blue-200/90">
              <div className="space-y-3 max-w-2xl mx-auto">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white text-blue-900 font-semibold text-xs border border-blue-200 shadow-2xs">
                  <Building2 className="w-4 h-4 text-blue-700" />
                  <span>企業利用お申し込み受付中</span>
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 leading-snug sm:leading-tight">
                  <span className="block">60秒動画で、</span>
                  <span className="block">人柄重視の優秀層と出会う。</span>
                </h2>
                <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed max-w-lg mx-auto font-normal">
                  文字だけの書類選考を脱却し、熱量とポテンシャルを持った学生をスワイプで直感スカウト。まずは無料の企業利用申請からスタートしてください。
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                <Link
                  href="/company/register"
                  className="w-full py-4 bg-blue-700 hover:bg-blue-600 text-white rounded-md text-sm sm:text-base font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <Building2 className="w-4 h-4 text-blue-200" />
                  <span>企業利用のお申し込み（無料）</span>
                  <ArrowRight className="w-4 h-4 text-blue-200 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-[13px] text-slate-600 font-medium pt-2">
                <span>✓ 掲載審査無料</span>
                <span>✓ 最短1営業日でアカウント発行</span>
                <span>✓ クローズド動画管理</span>
              </div>
            </div>
          </FadeInView>

          {/* 学生向けリンク */}
          <div className="pt-2 text-xs sm:text-sm text-slate-500 flex items-center justify-center gap-2 font-medium">
            <User className="w-4 h-4 text-slate-400" />
            <span>学生・求職者の方はこちら ➔ </span>
            <Link
              href="/"
              className="font-bold text-slate-900 hover:text-emerald-700 hover:underline transition-colors"
            >
              学生向けトップページ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
