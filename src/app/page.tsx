"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  User,
  Building2,
  ArrowRight,
  Video,
  MessageSquare,
  Heart,
  X,
  Play,
  CheckCircle2,
  Zap,
  TrendingUp,
  Shield,
  ChevronRight,
  Briefcase,
  Layers,
  Smartphone,
} from "lucide-react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"student" | "company">("student");

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      {/* ========================================================================= */}
      {/* 1. ヒーローセクション（PC: 2カラム / スマホ: 縦積み最適化） */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200 py-12 sm:py-20 lg:py-24">
        {/* 背景のアンビエントソフトブラー */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-100/50 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* 左側：キャッチコピー ＆ アクション (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* ブランド公式ロゴ & バッジ */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-emerald-700" />
                <span>縦型ショート動画で出会う、新時代のスカウト就活</span>
              </div>

              {/* メインヘッドライン */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-black text-slate-900 tracking-tight leading-[1.15]">
                  人柄を可視化する、<br className="hidden sm:inline" />
                  <span className="text-emerald-800">新時代のスカウト就活</span>
                </h1>
                <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  学生は60秒の縦型PR動画を投稿するだけ。企業はスワイプ感覚で候補者の「人柄」や「熱意」を直感的に発見し、ダイレクトにスカウトオファーを届けます。
                </p>
              </div>

              {/* CTAボタン群 */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <Link
                  href="/register"
                  className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-600 active:scale-98 rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                >
                  <User className="h-4 w-4" />
                  <span>新規登録（無料）</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>

                <Link
                  href="/login"
                  className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 active:scale-98 border border-slate-300 rounded-2xl transition-all flex items-center justify-center gap-2"
                >
                  <User className="h-4 w-4 text-slate-500" />
                  <span>ログイン</span>
                </Link>
              </div>

              {/* スマホ専用 採用担当の方はこちら */}
              <div className="pt-1 sm:hidden">
                <Link
                  href="/company/login"
                  className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-emerald-800 font-semibold p-1"
                >
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>採用担当の方はこちら</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* 信頼性・特徴バッジ */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>完全無料でオファー受信</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>60秒スマホ動画で即スタート</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>優良ベンチャー・成長企業多数</span>
                </div>
              </div>
            </div>

            {/* 右側：スマホ端末フレームモックアップ (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] rounded-[42px] p-3 bg-slate-900 shadow-2xl border-4 border-slate-800 ring-1 ring-slate-700">
                {/* スマホスピーカー/ノッチ */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-800 rounded-full z-30 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700 mr-2" />
                  <div className="w-8 h-1 bg-slate-700 rounded-full" />
                </div>

                {/* スマホ画面内部 */}
                <div className="relative rounded-[32px] overflow-hidden bg-slate-950 aspect-[9/16] border border-slate-800 flex flex-col justify-between p-4 text-white">
                  {/* 背景動画風グラフィック */}
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-950/90 z-10 pointer-events-none" />
                  
                  {/* 上部ヘッダー */}
                  <div className="relative z-20 flex items-center justify-between pt-4">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-900/80 text-emerald-300 border border-emerald-700/50">
                      PR動画 0:42 / 1:00
                    </span>
                    <div className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-full text-[10px] text-slate-300">
                      <Zap className="w-3 h-3 text-amber-400" />
                      <span>早稲田大学 26卒</span>
                    </div>
                  </div>

                  {/* 右側アクションボタン（TikTok/リール風） */}
                  <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg transform active:scale-90 transition-transform">
                      <Heart className="w-5 h-5 fill-white" />
                    </div>
                    <span className="text-[10px] font-bold text-white drop-shadow">気になる</span>

                    <div className="w-10 h-10 rounded-full bg-slate-800/80 text-slate-300 flex items-center justify-center shadow-lg">
                      <X className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-300 drop-shadow">スキップ</span>
                  </div>

                  {/* 下部：学生情報オーバーレイ */}
                  <div className="relative z-20 space-y-1.5 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">佐藤 健太</span>
                      <span className="text-[10px] bg-slate-800/90 px-2 py-0.5 rounded text-emerald-400 border border-emerald-900">
                        商学部
                      </span>
                    </div>
                    <p className="text-xs text-slate-200 line-clamp-2 font-medium">
                      「体育会サッカー部主将。組織づくりと目標達成に向けた巻き込み力に自信があります！」
                    </p>
                    {/* タグ一覧 */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur">
                        #リーダーシップ
                      </span>
                      <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur">
                        #体育会
                      </span>
                      <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur">
                        #TOEIC850
                      </span>
                    </div>
                  </div>

                  {/* 最下部再生プログレスバー */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800 z-30">
                    <div className="h-full bg-emerald-500 w-[68%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. 特徴セクション（Bento Grid風・UIパーツ組み込み型） */}
      {/* ========================================================================= */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <h2 className="text-xs font-bold text-emerald-800 tracking-wider uppercase">Features</h2>
            <p className="text-2xl sm:text-3xl font-black text-slate-900">
              書類だけでは伝わらない「人柄」を直感的に届ける
            </p>
            <p className="text-xs sm:text-sm text-slate-500">
              テキストの履歴書を何十枚も読む採用から、60秒の縦型動画で雰囲気を掴む新時代の就活体験へ。
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* 特徴 1: 60秒PR動画 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Video className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">60秒の縦型PR動画</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  話し方や表情、熱量など、学歴や資格の文字情報だけでは見えない「一人ひとりの人柄」をショート動画で表現できます。
                </p>
              </div>

              {/* UIパーツモック */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                  <span className="flex items-center gap-1 text-emerald-700">
                    <Play className="w-3 h-3 fill-emerald-700" />
                    <span>自己PR再生中</span>
                  </span>
                  <span>0:60</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full w-3/4 rounded-full" />
                </div>
                <div className="flex flex-wrap gap-1 pt-1">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700 font-bold">
                    #笑顔
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700 font-bold">
                    #チーム推進力
                  </span>
                </div>
              </div>
            </div>

            {/* 特徴 2: 直感スワイプ */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">直感スワイプで候補者発見</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  企業は隙間時間に縦スワイプで学生をチェック。「気になる」を押すだけで候補者リストにストックされ、即オファー送信が可能です。
                </p>
              </div>

              {/* UIパーツモック */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-around">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-white border border-slate-300 text-slate-600 flex items-center justify-center shadow-sm">
                    <X className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">スキップ</span>
                </div>

                <span className="text-xs font-bold text-slate-400">スワイプ操作</span>

                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center shadow-md">
                    <Heart className="w-5 h-5 fill-white" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800">気になる</span>
                </div>
              </div>
            </div>

            {/* 特徴 3: マッチング即チャット */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">オファー承諾で即チャット</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  学生がオファーを承諾すると、すぐにメッセージ画面が開通。日程調整やカジュアル面談へスムーズに進めます。
                </p>
              </div>

              {/* UIパーツモック */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-[11px]">
                <div className="bg-emerald-100 text-emerald-900 p-2 rounded-xl rounded-tl-none max-w-[85%] font-medium">
                  「自己PR動画を拝見し、ぜひ一度カジュアルにお話ししたいです！」
                </div>
                <div className="bg-white border border-slate-200 text-slate-800 p-2 rounded-xl rounded-tr-none max-w-[85%] ml-auto font-medium shadow-sm">
                  「オファーありがとうございます！ぜひお伺いしたいです。」
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. 利用ステップ（How it Works）セクション */}
      {/* ========================================================================= */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-xs font-bold text-emerald-800 tracking-wider uppercase">How it Works</h2>
            <p className="text-2xl sm:text-3xl font-black text-slate-900">かんたん3ステップでスタート</p>
          </div>

          {/* 学生 / 企業 切り替えタブ */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200">
              <button
                type="button"
                onClick={() => setActiveTab("student")}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === "student"
                    ? "bg-white text-emerald-800 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <User className="w-4 h-4" />
                <span>学生の方（就職活動）</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("company")}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === "company"
                    ? "bg-white text-blue-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>採用企業の方（スカウト採用）</span>
              </button>
            </div>
          </div>

          {/* 学生向けフロー */}
          {activeTab === "student" && (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="relative p-6 sm:p-8 bg-slate-50 rounded-3xl border border-slate-200 space-y-4">
                <span className="text-4xl font-black text-emerald-700/30">01</span>
                <h3 className="text-base font-bold text-slate-900">プロフィール ＆ 60秒動画を投稿</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  スマホで撮影した60秒の自己PR動画をアップロード。あなたの強みや人柄を自由にアピールします。
                </p>
              </div>

              <div className="relative p-6 sm:p-8 bg-slate-50 rounded-3xl border border-slate-200 space-y-4">
                <span className="text-4xl font-black text-emerald-700/30">02</span>
                <h3 className="text-base font-bold text-slate-900">企業からスカウトオファーが届く</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  あなたの動画を見た企業の採用担当者からオファーが届きます。メッセージと企業情報を確認して承諾。
                </p>
              </div>

              <div className="relative p-6 sm:p-8 bg-slate-50 rounded-3xl border border-slate-200 space-y-4">
                <span className="text-4xl font-black text-emerald-700/30">03</span>
                <h3 className="text-base font-bold text-slate-900">チャットでカジュアル面談へ</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  承諾後はWebチャットで日程を調整し、オンラインカジュアル面談や選考へと進みます。
                </p>
              </div>
            </div>
          )}

          {/* 企業向けフロー */}
          {activeTab === "company" && (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="relative p-6 sm:p-8 bg-blue-50/50 rounded-3xl border border-blue-100 space-y-4">
                <span className="text-4xl font-black text-blue-700/30">01</span>
                <h3 className="text-base font-bold text-slate-900">隙間時間に縦スワイプで学生を閲覧</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  通勤中や面接の合間にショート動画をサクサク閲覧。雰囲気やコミュニケーション力を短時間で把握。
                </p>
              </div>

              <div className="relative p-6 sm:p-8 bg-blue-50/50 rounded-3xl border border-blue-100 space-y-4">
                <span className="text-4xl font-black text-blue-700/30">02</span>
                <h3 className="text-base font-bold text-slate-900">気になる候補者にダイレクトオファー</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  「気になる」リストからワンクリックでスカウトメッセージを送信。自社の魅力を直接伝えます。
                </p>
              </div>

              <div className="relative p-6 sm:p-8 bg-blue-50/50 rounded-3xl border border-blue-100 space-y-4">
                <span className="text-4xl font-black text-blue-700/30">03</span>
                <h3 className="text-base font-bold text-slate-900">チャットでスムーズに日程調整</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  オファー承諾後は即座にチャットが開始。カジュアル面談や面接日程をスムーズに設定できます。
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. 信頼性フッターセクション */}
      {/* ========================================================================= */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-100">
            {/* ロゴ ＆ 概要 */}
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
                人柄を可視化する、新時代のスワイプ型 逆求人プラットフォーム
              </p>
            </div>

            {/* ナビゲーションリンク */}
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
              <span>利用規約</span>
              <span>プライバシーポリシー</span>
              <span>セキュリティ方針</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}