"use client";

import { useState } from "react";
import Link from "next/link";
import FadeInView from "@/components/FadeInView";
import {
  Building2,
  ArrowRight,
  ShieldCheck,
  Check,
  Smile,
  Mic,
  Flame,
  Users,
  Play,
  Heart,
  X,
  User,
  Clock,
  Lock,
  ChevronDown,
  MessageSquare,
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
      {/* 1. ヒーローセクション（BtoB企業向けFV・重厚で信頼感のあるエディトリアル） */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 lg:pt-24 lg:pb-32 bg-white border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* 左側：企業向けキャッチコピー ＆ CTA */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <FadeInView>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-100 border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold">
                  <Building2 className="h-4 w-4 text-slate-700 flex-shrink-0" />
                  <span>面接前のミスマッチを根絶する動画スワイプ採用</span>
                </div>
              </FadeInView>

              <FadeInView delay={100}>
                <h1 className="text-3xl min-[400px]:text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-slate-900">
                  <span className="block">面接で、</span>
                  <span className="text-blue-700 inline-block">「思っていた人と違った」</span>
                  <span className="inline-block">をゼロに。</span>
                </h1>
              </FadeInView>

              <FadeInView delay={200}>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                  AI生成ESによる書類選考の形骸化を打破。通勤・移動の隙間時間に縦スワイプで候補者の表情・論理性・熱量を即断し、カルチャーマッチする優秀層をダイレクトスカウト。
                </p>
              </FadeInView>

              <FadeInView delay={300}>
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5">
                  <Link
                    href="/company/register"
                    className="px-8 py-4 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
                  >
                    <Building2 className="w-4 h-4 text-blue-400" />
                    <span>企業利用をお申し込み（無料審査申請）</span>
                    <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 transition-transform" />
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
                    <ShieldCheck className="w-4 h-4 text-slate-700 stroke-[2.5]" />
                    <span>安心の完全審査制</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-slate-700 stroke-[2.5]" />
                    <span>学生動画の非公開管理</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-700 stroke-[2.5]" />
                    <span>1分で簡単申請</span>
                  </span>
                </div>
              </FadeInView>
            </div>

            {/* 右側：企業スワイプUIモックアップ（端正なフレーム） */}
            <div className="lg:col-span-5 flex justify-center">
              <FadeInView delay={200}>
                <div className="relative w-full max-w-[320px] sm:max-w-[340px] rounded-2xl bg-slate-900 p-3 shadow-2xl border border-slate-800 ring-1 ring-white/10">
                  <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-slate-950 flex flex-col justify-between p-4.5 text-white">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-900/60 z-0" />

                    {/* 上部ステータス */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md text-xs font-semibold text-slate-200 border border-white/10">
                        自己PR 0:45 / 1:00
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-blue-600 text-xs font-bold text-white">候補者動画</span>
                    </div>

                    {/* 中央：動画再生インジケータ ＆ 波形 */}
                    <div className="relative z-10 flex flex-col items-center justify-center space-y-3.5 my-auto">
                      <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-lg">
                        <Play className="w-6 h-6 ml-1 fill-white text-white" />
                      </div>

                      <div className="flex items-center gap-1.5 h-6 px-3 py-1 rounded-full bg-slate-900/70 backdrop-blur-sm border border-white/10">
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
                    <div className="relative z-10 space-y-3">
                      <div className="bg-slate-900/90 backdrop-blur-md p-3.5 rounded-lg border border-white/10 space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-base text-white">S.K さん</span>
                          <span className="px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-500/30 text-xs font-semibold">
                            情報科学専攻 (27卒)
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-200 leading-snug font-medium">
                          「チームを巻き込む推進力と、課題を構造化する論理的思考が得意です」
                        </p>
                      </div>

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

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div className="py-2.5 rounded-md bg-slate-800/80 text-slate-300 text-xs font-bold flex items-center justify-center gap-1.5 border border-white/10">
                          <X className="w-4 h-4" />
                          <span>スキップ</span>
                        </div>
                        <div className="py-2.5 rounded-md bg-blue-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm">
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
      {/* 2. 【対比構造】従来の採用課題 vs JobSwipe（スプリット・エディトリアル） */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <FadeInView>
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block">
                PAIN & SOLUTION
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                新卒採用における「構造的な課題」を解決
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-normal">
                従来の文字選考・形骸化した書類選考のムダを、60秒動画が根本から解消します。
              </p>
            </div>
          </FadeInView>

          <div className="grid md:grid-cols-3 gap-6">
            {/* 課題1 */}
            <FadeInView delay={100}>
              <div className="bg-white rounded-lg border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col h-full">
                <div className="p-5 bg-slate-100/60 border-b border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-wider">
                    <X className="w-4 h-4 text-slate-400" />
                    <span>採用課題 01</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    AI生成ESでは「素の対人力」が見えない
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    文章作成テクニックに長けた候補者を書類通過させても、1次面接で落とす工数ロスが膨大に。
                  </p>
                </div>

                <div className="p-6 bg-white flex-1 space-y-2.5">
                  <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider">
                    <Check className="w-4 h-4 text-blue-600 stroke-[3]" />
                    <span>JobSwipeの解決策</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    声のトーンや表情、60秒の構成力で事前に確信
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    会う前に人柄や対話力をチェックできるため、1次面接の通過率と選考精度が飛躍的に向上します。
                  </p>
                </div>
              </div>
            </FadeInView>

            {/* 課題2 */}
            <FadeInView delay={200}>
              <div className="bg-white rounded-lg border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col h-full">
                <div className="p-5 bg-slate-100/60 border-b border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-wider">
                    <X className="w-4 h-4 text-slate-400" />
                    <span>採用課題 02</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    書類選考と面接のギャップによる「選考辞退」
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    「会ってみたら社風と違った」という理由で、選考終盤や内定直前での辞退が発生。
                  </p>
                </div>

                <div className="p-6 bg-white flex-1 space-y-2.5">
                  <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider">
                    <Check className="w-4 h-4 text-blue-600 stroke-[3]" />
                    <span>JobSwipeの解決策</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    求める人物像との相性を事前に見極めてオファー
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    相互のカルチャーフィットを前提にスカウトするため、面談合致率が高く内定承諾につながります。
                  </p>
                </div>
              </div>
            </FadeInView>

            {/* 課題3 */}
            <FadeInView delay={300}>
              <div className="bg-white rounded-lg border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col h-full">
                <div className="p-5 bg-slate-100/60 border-b border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-wider">
                    <X className="w-4 h-4 text-slate-400" />
                    <span>採用課題 03</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    長文スカウト作成の工数過多と低い返信率
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    候補者ごとに長文メッセージを作成する負担が重く、採用担当者のコア業務が圧迫。
                  </p>
                </div>

                <div className="p-6 bg-white flex-1 space-y-2.5">
                  <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider">
                    <Check className="w-4 h-4 text-blue-600 stroke-[3]" />
                    <span>JobSwipeの解決策</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    隙間時間に縦スワイプで即断アプローチ
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    移動中などに動画をサクサク確認し、直感的にオファー送信。スピード感ある日程調整が可能です。
                  </p>
                </div>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. Bento Grid による導入メリット */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <FadeInView>
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block">
                BENEFITS
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                新世代の採用プラットフォームがもたらす価値
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-normal">
                書類選考工数の劇的な削減と、カルチャーマッチする優秀層のダイレクト採用を実現
              </p>
            </div>
          </FadeInView>

          <div className="grid md:grid-cols-12 gap-6">
            {/* メインフィーチャーカード（7カラム） */}
            <div className="md:col-span-7 bg-slate-900 text-white rounded-xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden shadow-lg border border-slate-800">
              <div className="space-y-4 relative z-10">
                <span className="px-2.5 py-1 rounded bg-blue-950 text-blue-400 border border-blue-500/30 text-xs font-bold uppercase tracking-wider">
                  FOR ENTERPRISE 01
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                  書類選考と1次面接の歩留まりを劇的改善。<br />
                  採用工数を最大70%削減。
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  文字の履歴書では見抜けない「素の対人力・論理的思考力・熱量」を60秒で把握。会うべき候補者を事前に確信できるため、無駄な面接を根絶します。
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

            {/* サイドカード2枚（5カラム） */}
            <div className="md:col-span-5 flex flex-col gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 space-y-3 shadow-2xs flex-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  FOR ENTERPRISE 02
                </span>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">移動中の隙間時間に縦スワイプで即断</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  スマホやPCで候補者動画をサクサク閲覧。自社のカルチャーに合う学生にその場でオファー送信。
                </p>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 space-y-3 shadow-2xs flex-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  FOR ENTERPRISE 03
                </span>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">文字では見えない「4大ポテンシャル」</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  対面コミュニケーション力、論理的構成力、推進力、カルチャーフィットを事前に判定。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. 導入から採用までの3ステップ */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <FadeInView>
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block">
                HOW TO START
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                導入からスカウト送信までの3ステップ
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-normal">
                最短1営業日でアカウント発行。すぐに学生の自己PR動画を閲覧し、スカウトを開始できます。
              </p>
            </div>
          </FadeInView>

          <div className="grid sm:grid-cols-3 gap-6">
            <FadeInView delay={100}>
              <div className="bg-white rounded-lg border border-slate-200/90 shadow-2xs p-7 space-y-4 flex flex-col justify-between h-full">
                <div className="space-y-3.5">
                  <span className="text-2xl font-black text-slate-300 font-mono tracking-tighter block">01</span>
                  <h3 className="text-lg font-bold text-slate-900">Webフォームから利用申請</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    会社名、ご担当者情報、ご連絡先を入力して送信（所要時間約1分）。利用申請・審査は完全無料です。
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 text-xs sm:text-[13px] text-slate-500 font-medium">
                  ✓ 費用は一切かかりません
                </div>
              </div>
            </FadeInView>

            <FadeInView delay={200}>
              <div className="bg-white rounded-lg border border-slate-200/90 shadow-2xs p-7 space-y-4 flex flex-col justify-between h-full">
                <div className="space-y-3.5">
                  <span className="text-2xl font-black text-slate-300 font-mono tracking-tighter block">02</span>
                  <h3 className="text-lg font-bold text-slate-900">掲載審査 ＆ アカウント発行</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    運営事務局による法人確認審査（通常1〜2営業日）完了後、専用ログイン情報をメールにてご案内します。
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 text-xs sm:text-[13px] text-slate-500 font-medium">
                  ✓ 最短即日でアカウント発行
                </div>
              </div>
            </FadeInView>

            <FadeInView delay={300}>
              <div className="bg-white rounded-lg border border-slate-200/90 shadow-2xs p-7 space-y-4 flex flex-col justify-between h-full">
                <div className="space-y-3.5">
                  <span className="text-2xl font-black text-slate-300 font-mono tracking-tighter block">03</span>
                  <h3 className="text-lg font-bold text-slate-900">スワイプ閲覧 ＆ スカウト送信</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    候補者のPR動画を縦スワイプで閲覧。気になる学生にオファーを送り、承諾後は個別チャットで日程調整へ。
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 text-xs sm:text-[13px] text-slate-500 font-medium">
                  ✓ チャットで即面談設定
                </div>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. 安心の法人審査制 ＆ セキュリティ方針 */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <FadeInView>
            <div className="bg-slate-900 text-white rounded-xl p-8 sm:p-12 lg:p-14 space-y-10 shadow-lg border border-slate-800">
              <div className="flex flex-col items-center text-center gap-3 border-b border-slate-800 pb-8">
                <div className="w-12 h-12 rounded-lg bg-blue-950 text-blue-400 border border-blue-500/30 flex items-center justify-center flex-shrink-0 mx-auto">
                  <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                    安心・安全の完全審査制 ＆ 非公開動画管理
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
                    学生と参画企業双方の信頼とプライバシーを保護するための厳格なガバナンス体制
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-5 bg-slate-950/60 rounded-lg border border-slate-800 space-y-2">
                  <span className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-400 stroke-[2.5]" />
                    <span>厳格な法人審査</span>
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    登記情報の実在性および採用活動実績を確認した適格な法人企業のみにアカウントを発行。
                  </p>
                </div>

                <div className="p-5 bg-slate-950/60 rounded-lg border border-slate-800 space-y-2">
                  <span className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-400 stroke-[2.5]" />
                    <span>クローズド動画配信</span>
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    一般SNSのような外部公開や拡散を完全防止。審査通過企業の人事担当者のみが限定閲覧。
                  </p>
                </div>

                <div className="p-5 bg-slate-950/60 rounded-lg border border-slate-800 space-y-2">
                  <span className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-400 stroke-[2.5]" />
                    <span>段階的プライバシー</span>
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    スワイプ時はイニシャル表示。学生がオファー承諾後にフルネームが開示される適正管理。
                  </p>
                </div>

                <div className="p-5 bg-slate-950/60 rounded-lg border border-slate-800 space-y-2">
                  <span className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-400 stroke-[2.5]" />
                    <span>IPAセキュリティ準拠</span>
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
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
      <section className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200/80">
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
                        <span className="w-6 h-6 rounded bg-blue-700 text-white text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">
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
      {/* 7. ファイナルCTA */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <FadeInView>
            <div className="bg-slate-950 text-white rounded-xl p-8 sm:p-14 space-y-6 shadow-xl border border-slate-800">
              <div className="space-y-3 max-w-2xl mx-auto">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 text-slate-200 font-semibold text-xs border border-slate-700">
                  <Building2 className="w-4 h-4 text-blue-400" />
                  <span>企業利用お申し込み受付中</span>
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
                  60秒動画で、人柄マッチする優秀な人材と出会う。
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg mx-auto font-normal">
                  文字だけの書類選考を脱却し、熱量とポテンシャルを持った学生をスワイプで直感スカウト。まずは無料の企業利用申請からスタートしてください。
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                <Link
                  href="/company/register"
                  className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-base font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Building2 className="w-4 h-4" />
                  <span>企業利用のお申し込み（無料）</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-[13px] text-slate-400 font-medium pt-2">
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
