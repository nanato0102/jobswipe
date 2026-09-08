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
      {/* 1. ヒーローセクション（BtoB企業向けFV・シャープで端正なデザイン） */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* 左側：企業向けキャッチコピー ＆ CTA */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <FadeInView>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold">
                  <Building2 className="h-3.5 w-3.5 text-slate-700 flex-shrink-0" />
                  <span>面接前のミスマッチを根絶する動画スワイプ採用</span>
                </div>
              </FadeInView>

              <FadeInView delay={100}>
                <h1 className="text-2xl min-[390px]:text-[28px] sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-slate-900">
                  <span className="block sm:inline">面接で、</span>
                  <span className="text-blue-700 whitespace-nowrap inline-block">「思っていた人と違った」</span>
                  <span className="whitespace-nowrap inline-block">をゼロに。</span>
                </h1>
              </FadeInView>

              <FadeInView delay={200}>
                <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                  AI生成ESによる書類選考の形骸化を打破。通勤・移動の隙間時間に縦スワイプで候補者の表情・論理性・熱量を即断し、カルチャーマッチする優秀層をダイレクトスカウト。
                </p>
              </FadeInView>

              <FadeInView delay={300}>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
                  <Link
                    href="/company/register"
                    className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Building2 className="w-4 h-4 text-blue-400" />
                    <span>企業利用をお申し込み（無料審査申請）</span>
                    <ArrowRight className="w-4 h-4 text-blue-400" />
                  </Link>

                  <Link
                    href="/contact"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-slate-500" />
                    <span>資料請求・導入のご相談</span>
                  </Link>
                </div>

                {/* 信頼性バッジ */}
                <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-5 text-xs text-slate-600 font-medium">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-700 stroke-[2.5]" />
                    <span>安心の完全審査制</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-slate-700 stroke-[2.5]" />
                    <span>学生動画の非公開管理</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-700 stroke-[2.5]" />
                    <span>1分で簡単申請</span>
                  </span>
                </div>
              </FadeInView>
            </div>

            {/* 右側：企業スワイプUIモックアップ（端正なフレーム） */}
            <div className="lg:col-span-5 flex justify-center">
              <FadeInView delay={200}>
                <div className="relative w-full max-w-[280px] sm:max-w-[310px] aspect-[9/18] rounded-2xl bg-slate-950 p-2 shadow-lg border-2 border-slate-300">
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-900 flex flex-col justify-between p-4 text-white">
                    {/* 上部ステータス */}
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-semibold text-slate-300 border border-slate-700">
                        自己PR 0:45 / 1:00
                      </span>
                      <span className="px-2 py-0.5 rounded bg-blue-600 text-[10px] font-bold">候補者動画</span>
                    </div>

                    {/* 中央：アバター ＆ 音声波形 */}
                    <div className="flex flex-col items-center justify-center space-y-3 my-auto">
                      <div className="w-14 h-14 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center">
                        <User className="w-7 h-7 stroke-[1.8]" />
                      </div>

                      <div className="flex items-center gap-1 h-5">
                        <span className="w-1 h-3 bg-blue-500 rounded-full animate-pulse" />
                        <span className="w-1 h-5 bg-blue-400 rounded-full animate-pulse delay-100" />
                        <span className="w-1 h-2 bg-blue-500 rounded-full animate-pulse" />
                        <span className="w-1 h-5 bg-blue-400 rounded-full animate-pulse delay-200" />
                        <span className="w-1 h-3.5 bg-blue-500 rounded-full animate-pulse delay-100" />
                        <span className="w-1 h-2 bg-blue-500 rounded-full animate-pulse" />
                      </div>

                      <div className="w-9 h-9 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-sm">
                        <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />
                      </div>
                    </div>

                    {/* 下部プロフィール ＆ アクション */}
                    <div className="space-y-2">
                      <div className="bg-slate-800/90 p-2.5 rounded-lg border border-slate-700">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-bold text-sm text-white">S.Kさん</span>
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-900 text-amber-300 border border-amber-400/30 text-[9px] font-medium">
                            <Lock className="w-2.5 h-2.5" />
                            <span>承諾後開示</span>
                          </span>
                          <span className="text-[10px] text-blue-300 font-medium">情報科学専攻 (27卒)</span>
                        </div>
                        <p className="text-[10px] text-slate-300 line-clamp-1 mt-0.5 font-normal">
                          「チームを巻き込む推進力と、課題を構造化する論理的思考が得意です！」
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        <span className="px-1.5 py-0.5 bg-slate-800 text-slate-300 border border-slate-700 text-[9px] font-medium rounded">
                          #課題解決力
                        </span>
                        <span className="px-1.5 py-0.5 bg-slate-800 text-slate-300 border border-slate-700 text-[9px] font-medium rounded">
                          #推進力
                        </span>
                        <span className="px-1.5 py-0.5 bg-slate-800 text-slate-300 border border-slate-700 text-[9px] font-medium rounded">
                          #チームワーク
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-1 gap-2">
                        <div className="flex-1 py-1.5 rounded-md bg-slate-800 text-slate-400 text-[11px] font-medium flex items-center justify-center gap-1 border border-slate-700">
                          <X className="w-3.5 h-3.5" />
                          <span>スキップ</span>
                        </div>
                        <div className="flex-1 py-1.5 rounded-md bg-blue-600 text-white text-[11px] font-medium flex items-center justify-center gap-1">
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
      {/* 2. 【対比構造】従来の採用課題 vs JobSwipeによる解決（端正なエディトリアル形式） */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <FadeInView>
            <div className="text-center space-y-2.5 max-w-2xl mx-auto">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                PAIN & SOLUTION
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                <span className="inline-block">新卒採用における</span>
                <span className="inline-block">「構造的な課題」を解決</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-normal">
                従来の文字選考・形骸化した書類選考のムダを、60秒動画が根本から解消します。
              </p>
            </div>
          </FadeInView>

          <div className="grid md:grid-cols-3 gap-6">
            {/* 課題1 */}
            <FadeInView delay={100}>
              <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 rounded-lg border-l-2 border-slate-400 space-y-1">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <X className="w-3.5 h-3.5 text-slate-500" />
                      <span>採用課題 01</span>
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      AI生成ESでは「素の対人力」が見えない
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      文章作成テクニックに長けた候補者を書類通過させても、1次面接で落とす工数ロスが膨大に。
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-white rounded-lg border-l-2 border-blue-700 border border-slate-200 space-y-1">
                  <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-blue-700 stroke-[2.5]" />
                    <span>JobSwipeの解決策</span>
                  </span>
                  <p className="text-xs text-slate-800 leading-relaxed font-semibold">
                    声のトーンや表情、60秒の構成力を直感的に確認。会う前に確信を持てます。
                  </p>
                </div>
              </div>
            </FadeInView>

            {/* 課題2 */}
            <FadeInView delay={200}>
              <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 rounded-lg border-l-2 border-slate-400 space-y-1">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <X className="w-3.5 h-3.5 text-slate-500" />
                      <span>採用課題 02</span>
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      書類選考と面接のギャップによる「選考辞退」
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      「会ってみたら雰囲気が違った」「社風に合わない」という理由で、選考終盤での辞退が発生。
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-white rounded-lg border-l-2 border-blue-700 border border-slate-200 space-y-1">
                  <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-blue-700 stroke-[2.5]" />
                    <span>JobSwipeの解決策</span>
                  </span>
                  <p className="text-xs text-slate-800 leading-relaxed font-semibold">
                    求める人物像との相性を事前に見極めてオファーするため、高い面談合致率を実現。
                  </p>
                </div>
              </div>
            </FadeInView>

            {/* 課題3 */}
            <FadeInView delay={300}>
              <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 rounded-lg border-l-2 border-slate-400 space-y-1">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <X className="w-3.5 h-3.5 text-slate-500" />
                      <span>採用課題 03</span>
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      長文スカウト作成の工数過多と低い返信率
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      候補者ごとに長文メッセージを作成する負担が重く、採用担当者のコア業務が圧迫されている。
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-white rounded-lg border-l-2 border-blue-700 border border-slate-200 space-y-1">
                  <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-blue-700 stroke-[2.5]" />
                    <span>JobSwipeの解決策</span>
                  </span>
                  <p className="text-xs text-slate-800 leading-relaxed font-semibold">
                    隙間時間にサクサク閲覧し、気になる学生に直感的にアプローチできる圧倒的スピード。
                  </p>
                </div>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. 動画だからこそ見抜ける「4大評価軸」（落ち着いたモノトーン・グリッド） */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <FadeInView>
            <div className="text-center space-y-2.5 max-w-2xl mx-auto">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                EVALUATION AXIS
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                <span className="inline-block">60秒動画で可視化される、</span>
                <span className="inline-block">4つの採用指標</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-normal">
                学歴や資格の文字情報だけでは見抜けない、ビジネスで活躍するポテンシャルを多角的に評価できます。
              </p>
            </div>
          </FadeInView>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between text-center items-center shadow-xs">
              <div className="space-y-2.5 w-full">
                <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 flex items-center justify-center mx-auto">
                  <Smile className="w-4 h-4 text-blue-700" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">対面コミュニケーション力</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  笑顔や自然な表情、第一印象の良さなど、顧客やチームメンバーに信頼される人柄の基礎力が伝わります。
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between text-center items-center shadow-xs">
              <div className="space-y-2.5 w-full">
                <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 flex items-center justify-center mx-auto">
                  <Mic className="w-4 h-4 text-slate-700" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">論理的思考・要約力</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  60秒で結論から要点を整理して伝える構成力や、ビジネスにおける基礎的なプレゼンテーション能力を判定。
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between text-center items-center shadow-xs">
              <div className="space-y-2.5 w-full">
                <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 flex items-center justify-center mx-auto">
                  <Flame className="w-4 h-4 text-slate-700" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">行動への熱量・主体性</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  学生時代に挑戦した経験や挫折を乗り越えた想いへのパッションなど、文字では伝わらない熱量が届きます。
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between text-center items-center shadow-xs">
              <div className="space-y-2.5 w-full">
                <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 flex items-center justify-center mx-auto">
                  <Users className="w-4 h-4 text-slate-700" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">自社カルチャーマッチ</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  自社の社風やチームメンバーの価値観にフィットするかどうかを、事前の動画でスムーズに確かめ合えます。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. 導入から採用までのシンプルな3ステップ */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <FadeInView>
            <div className="text-center space-y-2.5 max-w-2xl mx-auto">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                HOW TO START
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                <span className="inline-block">導入からスカウト送信までの</span>
                <span className="inline-block">3ステップ</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-normal">
                最短1営業日でアカウント発行。すぐに学生の自己PR動画を閲覧し、スカウトを開始できます。
              </p>
            </div>
          </FadeInView>

          <div className="grid sm:grid-cols-3 gap-6">
            <FadeInView delay={100}>
              <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-3.5 h-full flex flex-col justify-between text-center items-center">
                <div className="space-y-3 w-full">
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold">
                    STEP 01
                  </span>
                  <h3 className="text-base font-bold text-slate-900">Webフォームから利用申請</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    会社名、ご担当者情報、ご連絡先を入力して送信（所要時間約1分）。利用申請・審査は完全無料です。
                  </p>
                </div>
              </div>
            </FadeInView>

            <FadeInView delay={200}>
              <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-3.5 h-full flex flex-col justify-between text-center items-center">
                <div className="space-y-3 w-full">
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold">
                    STEP 02
                  </span>
                  <h3 className="text-base font-bold text-slate-900">掲載審査 ＆ アカウント発行</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    運営事務局による法人確認審査（通常1〜2営業日）完了後、専用ログイン情報をメールにてご案内します。
                  </p>
                </div>
              </div>
            </FadeInView>

            <FadeInView delay={300}>
              <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-3.5 h-full flex flex-col justify-between text-center items-center">
                <div className="space-y-3 w-full">
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-slate-900 text-white text-xs font-bold">
                    STEP 03
                  </span>
                  <h3 className="text-base font-bold text-slate-900">スワイプ閲覧 ＆ スカウト送信</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    候補者のPR動画を縦スワイプで閲覧。気になる学生にオファーを送り、承諾後は個別チャットで日程調整へ。
                  </p>
                </div>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. 安心の法人審査制 ＆ セキュリティ方針 */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <FadeInView>
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 sm:p-10 lg:p-12 space-y-8 shadow-xs">
              <div className="flex flex-col items-center text-center gap-3 border-b border-slate-200/80 pb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 flex items-center justify-center flex-shrink-0 mx-auto">
                  <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-blue-700 stroke-[2.2]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
                    <span className="inline-block">安心・安全の完全審査制 ＆</span>
                    <span className="inline-block">非公開動画管理</span>
                  </h3>
                  <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed font-normal">
                    学生と参画企業双方の信頼とプライバシーを保護するための厳格なガバナンス体制
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2.5 shadow-xs flex flex-col justify-between text-center items-center">
                  <div className="space-y-2 w-full">
                    <span className="font-bold text-slate-900 text-sm flex items-center justify-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-blue-700 stroke-[2.5] flex-shrink-0" />
                      <span>厳格な法人審査</span>
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      登記情報の実在性および採用活動実績を確認した適格な法人企業のみにアカウントを発行します。
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2.5 shadow-xs flex flex-col justify-between text-center items-center">
                  <div className="space-y-2 w-full">
                    <span className="font-bold text-slate-900 text-sm flex items-center justify-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-blue-700 stroke-[2.5] flex-shrink-0" />
                      <span>クローズド動画配信</span>
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      一般SNSのような外部公開や拡散を完全防止。審査通過企業の人事担当者のみが限定閲覧できます。
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2.5 shadow-xs flex flex-col justify-between text-center items-center">
                  <div className="space-y-2 w-full">
                    <span className="font-bold text-slate-900 text-sm flex items-center justify-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-blue-700 stroke-[2.5] flex-shrink-0" />
                      <span>段階的プライバシー保護</span>
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      スワイプ時はイニシャル表示。学生がオファーを承諾した時点でフルネームが開示される適正管理。
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2.5 shadow-xs flex flex-col justify-between text-center items-center">
                  <div className="space-y-2 w-full">
                    <span className="font-bold text-slate-900 text-sm flex items-center justify-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-blue-700 stroke-[2.5] flex-shrink-0" />
                      <span>IPAセキュリティ準拠</span>
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      「安全なウェブサイトの作り方」に準拠した通信暗号化（SSL/TLS）および堅牢なアクセス制御を実施。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. 企業向けよくあるご質問（FAQ） */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <FadeInView>
            <div className="text-center space-y-2.5">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                FAQ FOR ENTERPRISE
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                企業様からよくあるご質問
              </h2>
            </div>
          </FadeInView>

          <div className="space-y-2.5">
            {companyFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`rounded-lg border transition-colors duration-150 overflow-hidden ${
                    isOpen
                      ? "border-slate-400 bg-white"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 sm:p-4.5 text-left flex items-start sm:items-center justify-between gap-4 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <span
                        className={`w-5 h-5 rounded text-[11px] font-black flex items-center justify-center flex-shrink-0 transition-colors mt-0.5 sm:mt-0 ${
                          isOpen
                            ? "bg-slate-900 text-white"
                            : "bg-slate-100 text-slate-700 border border-slate-200"
                        }`}
                      >
                        Q
                      </span>
                      <span className="font-bold text-slate-900 text-xs sm:text-sm leading-snug">
                        {faq.q}
                      </span>
                    </div>
                    <div
                      className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 transition-transform duration-150 ${
                        isOpen ? "bg-slate-100 text-slate-700 rotate-180" : "text-slate-400"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-4.5 pb-4 pt-3 border-t border-slate-100 bg-slate-50/60">
                      <div className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded bg-blue-700 text-white text-[11px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                          A
                        </span>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pt-0.5">
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
      {/* 7. ファイナルCTA（企業向けお申し込み導線） */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <FadeInView>
            <div className="bg-slate-900 text-white rounded-xl p-8 sm:p-12 space-y-6 shadow-md">
              <div className="space-y-3 max-w-2xl mx-auto">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700">
                  <Building2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>企業利用お申し込み受付中</span>
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
                  <span className="inline-block">60秒動画で、</span>
                  <span className="inline-block">人柄マッチする優秀な人材と出会う。</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto font-normal">
                  文字だけの書類選考を脱却し、熱量とポテンシャルを持った学生をスワイプで直感スカウト。まずは無料の企業利用申請からスタートしてください。
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                <Link
                  href="/company/register"
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-bold transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Building2 className="w-4 h-4" />
                  <span>企業利用のお申し込み（無料）</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs text-slate-400 font-medium pt-2">
                <span>✓ 掲載審査無料</span>
                <span>✓ 最短1営業日でアカウント発行</span>
                <span>✓ クローズド動画管理</span>
              </div>
            </div>
          </FadeInView>

          {/* 学生向けリンク */}
          <div className="pt-2 text-xs text-slate-500 flex items-center justify-center gap-2 font-medium">
            <User className="w-3.5 h-3.5 text-slate-400" />
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
