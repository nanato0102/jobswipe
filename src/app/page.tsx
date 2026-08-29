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
  XCircle,
  HelpCircle,
  Zap,
  TrendingUp,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "動画はスマートフォンの自撮りで撮影しても大丈夫ですか？",
      a: "はい、全く問題ありません！画質や編集技術を競う場ではなく、あなたの自然な話し方や表情、人柄を伝えることが目的です。スマホのカメラでリラックスして撮影してください。",
    },
    {
      q: "動画の撮り直しや差し替えはできますか？",
      a: "マイページからいつでも何回でも撮り直し・差し替えが可能です。部活動や学業、インターンの進捗に合わせて最新のPR動画にアップデートできます。",
    },
    {
      q: "学生の利用料金は本当に無料ですか？",
      a: "はい、学生の方は新規登録、動画投稿、オファー受信、企業とのチャット面談まですべて完全無料でご利用いただけます。",
    },
    {
      q: "どんな企業からスカウトが届きますか？",
      a: "急成長中のIT・Webベンチャーから、人柄やポテンシャルを重視するメガベンチャー、コンサルティング、商社、メーカーまで幅広い優良企業が参加しています。",
    },
    {
      q: "登録した動画は一般公開されますか？",
      a: "動画はJobSwipeに登録し審査を通過した採用担当企業のみが閲覧できる安全な環境で管理されています。",
    },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-white text-slate-900 overflow-x-hidden">
      {/* ========================================================================= */}
      {/* 1. ヒーローセクション（洗練されたメッセージ中心の大画面デザイン） */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-200 py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* ブランドロゴ & キャッチバッジ */}
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden shadow-md border border-slate-100 bg-white p-2">
              <Image
                src="/logo.png"
                alt="JobSwipe Logo"
                width={96}
                height={96}
                className="object-contain w-full h-full"
                priority
              />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs sm:text-sm font-bold border border-emerald-200 shadow-sm">
              <Sparkles className="h-4 w-4 text-emerald-700" />
              <span>縦型ショート動画で出会う、新時代のスカウト就活</span>
            </div>
          </div>

          {/* メインヘッドライン */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              ES（文字）では伝わらない、<br />
              <span className="text-emerald-800 underline decoration-emerald-300 decoration-wavy decoration-2">
                あなたの本当の人柄
              </span>
              で勝負する。
            </h1>
            <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed pt-2">
              何十枚もエントリーシートを書く就活はもう終わり。
              <br className="hidden sm:inline" />
              60秒の縦型PR動画を投稿するだけで、企業の採用担当者から直接スカウトが届きます。
            </p>
          </div>

          {/* CTAボタン */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/register"
              className="w-full sm:w-auto px-9 py-4 text-base font-bold text-white bg-emerald-700 hover:bg-emerald-600 active:scale-95 rounded-2xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
            >
              <User className="h-5 w-5" />
              <span>学生新規登録（完全無料）</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/login"
              className="w-full sm:w-auto px-9 py-4 text-base font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 active:scale-95 border border-slate-300 rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              <User className="h-5 w-5 text-slate-500" />
              <span>ログイン</span>
            </Link>
          </div>

          {/* スマホ専用 採用担当導線 */}
          <div className="pt-1 sm:hidden">
            <Link
              href="/company/login"
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-emerald-800 font-semibold p-1"
            >
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span>採用担当の方はこちら（企業ログイン）</span>
            </Link>
          </div>

          {/* 3つの安心ポイント */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-600 font-bold">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0" />
              <span>ES・志望動機一切不要</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0" />
              <span>スマホで60秒動画を撮るだけ</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0" />
              <span>優良企業から特別スカウト受信</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. 従来の就活との決定的な違い（Before / After） */}
      {/* ========================================================================= */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold text-emerald-800 tracking-wider uppercase">Why JobSwipe</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              これまでの就活、こんな違和感ありませんか？
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              文字だけの書類選考から、人柄でつながるリアルな出会いへ。
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* 従来の就活 (Before) */}
            <div className="bg-white rounded-3xl border border-rose-200 p-6 sm:p-8 shadow-sm space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-bold border border-rose-200">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>これまでの就活の課題</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900">書類（ES）と学歴だけの足切り</h3>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>何十枚もESをコピペして作成するのに疲れ果ててしまう</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>部活やアルバイトへの熱量・人柄が文字情報だけでは伝わらない</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>面接に行って初めて「思っていた社風と違った」と落とされるミスマッチ</span>
                </li>
              </ul>
            </div>

            {/* JobSwipe (After) */}
            <div className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-5 relative overflow-hidden">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-bold border border-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>JobSwipeが実現する新常識</span>
              </div>

              <h3 className="text-lg font-bold text-white">60秒の動画で「自分らしさ」を伝える</h3>

              <ul className="space-y-3 text-xs sm:text-sm text-emerald-100">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>60秒の自己PR動画を1本投稿して待つだけでオファーが届く</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>笑顔、話し方、行動力など「あなたの人柄そのもの」で評価される</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>会う前から雰囲気が伝わっているため、面談・選考がスムーズ</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. 企業側のリアルな採用メリット */}
      {/* ========================================================================= */}
      <section className="py-20 bg-slate-900 text-white border-b border-slate-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase">For Enterprise</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              なぜ成長企業はJobSwipeで採用するのか？
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              書類選考の工数を削減し、カルチャーにマッチした意欲的な学生を最速で発掘。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/80 rounded-3xl p-6 sm:p-8 border border-slate-700 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">書類選考の工数を大幅削減</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                60秒の動画を隙間時間にスワイプするだけ。表情や受け答えの雰囲気から自社との親和性を瞬時に判断できます。
              </p>
            </div>

            <div className="bg-slate-800/80 rounded-3xl p-6 sm:p-8 border border-slate-700 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">面接前のミスマッチ防止</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                「会ってみたら思っていた雰囲気と違った」という採用ロスをゼロに。カルチャーマッチ率が飛躍的に向上します。
              </p>
            </div>

            <div className="bg-slate-800/80 rounded-3xl p-6 sm:p-8 border border-slate-700 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">熱量の高い母集団に出会える</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                動画を自ら撮影して自分を表現する、意欲的で行動力のあるZ世代のトップ層へダイレクトにアプローチ可能です。
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/company/login"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white text-slate-900 font-bold text-sm hover:bg-slate-100 transition-colors shadow-lg"
            >
              <Building2 className="w-4 h-4" />
              <span>採用企業様向け ログイン・アカウント登録はこちら</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. よくある質問（FAQ） */}
      {/* ========================================================================= */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold text-emerald-800 tracking-wider uppercase">FAQ</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">よくあるご質問</h2>
            <p className="text-xs sm:text-sm text-slate-500">
              利用にあたって疑問や不安な点にお答えします。
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base text-slate-900 flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                {openFaq === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. ラストCTA */}
      {/* ========================================================================= */}
      <section className="py-20 bg-emerald-800 text-white text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            まずは60秒のPR動画で、<br />
            あなたの就活をはじめよう。
          </h2>
          <p className="text-xs sm:text-base text-emerald-100 max-w-xl mx-auto leading-relaxed">
            登録は完全無料。スマホから動画をアップロードして、あなたを必要とする企業からのスカウトをお待ちください。
          </p>

          <div className="pt-2">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-9 py-4 bg-white hover:bg-slate-100 text-slate-900 text-base font-black rounded-2xl shadow-xl transition-all active:scale-95"
            >
              <User className="w-5 h-5 text-emerald-800" />
              <span>今すぐ学生新規登録（無料）</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. 信頼性フッター */}
      {/* ========================================================================= */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-100">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-100 bg-white shadow-sm flex items-center justify-center p-0.5">
                  <Image
                    src="/logo.png"
                    alt="JobSwipe Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <span className="font-bold text-lg text-slate-900">JobSwipe</span>
              </div>
              <p className="text-xs text-slate-500 text-center md:text-left">
                一人柄を可視化する、新時代のスワイプ型 逆求人プラットフォーム
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-600 font-semibold">
              <Link href="/register" className="hover:text-emerald-800 transition-colors">
                学生新規登録
              </Link>
              <Link href="/company/login" className="hover:text-emerald-800 transition-colors">
                採用担当の方はこちら
              </Link>
              <Link href="/login" className="hover:text-emerald-800 transition-colors">
                ログイン
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
            <p>© 2026 JobSwipe. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/terms" className="hover:text-slate-700 transition-colors">
                利用規約
              </Link>
              <Link href="/privacy" className="hover:text-slate-700 transition-colors">
                プライバシーポリシー
              </Link>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500">IPA安全なウェブサイト運用準拠</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}