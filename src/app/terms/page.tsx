"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, FileText, Home, ArrowUpRight } from "lucide-react";

export default function TermsPage() {
  const router = useRouter();

  const handleGoBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/register");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* ナビゲーション戻るボタングループ */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-600" />
            <span>前の画面（登録画面）に戻る</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>トップページ</span>
          </Link>
        </div>

        {/* ページタイトルヘッダー */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-slate-700" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                JobSwipe 利用規約
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                制定日：2026年3月1日 / 最終改定日：2026年8月30日
              </p>
            </div>
          </div>
        </div>

        {/* 規約本文コンテナ */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 pb-1 border-b border-slate-100">
              第1条（はじめに・適用範囲）
            </h2>
            <p>
              本利用規約（以下「本規約」）は、JobSwipe運営事務局（以下「当事務局」）が提供する新卒向け短尺動画型逆求人プラットフォーム「JobSwipe」（以下「本サービス」）の利用条件を定めるものです。本サービスを利用するすべての学生ユーザーおよび企業ユーザー（以下「ユーザー」）は、本規約に同意した上で本サービスを利用するものとします。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 pb-1 border-b border-slate-100">
              第2条（ユーザー登録・アカウント管理）
            </h2>
            <p>
              1. ユーザーは、本サービスの利用に際して真実、正確かつ最新の情報を登録しなければなりません。
              <br />
              2. ユーザーは、自己の責任においてメールアドレスおよびパスワードを厳重に管理するものとし、第三者への譲渡・貸与は一切禁止します。
              <br />
              3. 当事務局は、登録情報が不正確または虚偽であると判断した場合、事前の通知なくアカウントの利用停止または削除を行うことができます。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 pb-1 border-b border-slate-100">
              第3条（自己PR動画の投稿・権利の帰属）
            </h2>
            <p>
              1. 学生ユーザーが本サービスに投稿する自己PR動画（以下「投稿動画」）の著作権は、投稿した学生ユーザー本人に帰属します。
              <br />
              2. 学生ユーザーは、当事務局および本サービスに登録する審査済み企業ユーザーに対し、採用選考およびマッチングを目的として投稿動画を閲覧・利用することを許諾するものとします。
              <br />
              3. 投稿動画は、JobSwipeの審査を通過した企業ユーザーのみが閲覧できる安全な環境で管理されます。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 pb-1 border-b border-slate-100">
              第4条（禁止事項）
            </h2>
            <p>ユーザーは、本サービスの利用にあたり以下の行為を行ってはなりません：</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>虚偽の経歴・プロフィール情報または動画を投稿する行為</li>
              <li>公序良俗に反する動画・メッセージを投稿・送信する行為</li>
              <li>他のユーザー、企業、第三者の著作権、肖像権、プライバシーを侵害する行為</li>
              <li>本サービスを通じて取得した個人情報・企業情報を採用活動以外の目的で利用または漏洩する行為</li>
              <li>求人・就職活動の目的を逸脱した営業・勧誘・迷惑行為</li>
              <li>不正アクセス、リバースエンジニアリング、サーバーに過度な負荷をかける行為</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 pb-1 border-b border-slate-100">
              第5条（オファーおよびチャットの利用規律）
            </h2>
            <p>
              1. 企業ユーザーは、学生ユーザーの動画・プロフィールを確認の上、誠実な採用選考を目的としてオファーを送信するものとします。
              <br />
              2. チャット機能において、ハラスメント行為、差別的言動、労働条件の虚偽提示等は厳格に禁止され、違反が認められた場合は即時アカウント停止処分となります。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 pb-1 border-b border-slate-100">
              第6条（免責事項）
            </h2>
            <p>
              1. 当事務局は、本サービスを通じて行われる企業と学生の間の採用選考、内定、雇用契約の成立を保証するものではありません。
              <br />
              2. ユーザー間で生じたトラブルについて、当事務局に故意または重過失がある場合を除き、当事務局は一切の責任を負いません。
            </p>
          </section>
        </div>

        {/* ページ下部：戻るCTAカード */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600 font-medium">
            利用規約の確認が完了しましたら、元の登録画面へお戻りください。
          </p>
          <button
            type="button"
            onClick={handleGoBack}
            className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>登録画面に戻る</span>
          </button>
        </div>

        {/* 関連リンク */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 pt-2 pb-6">
          <Link href="/company/about" className="hover:text-slate-900 underline">
            会社概要・特定商取引法
          </Link>
          <span>•</span>
          <Link href="/privacy" className="hover:text-slate-900 underline">
            プライバシーポリシー
          </Link>
          <span>•</span>
          <Link href="/contact" className="hover:text-slate-900 underline">
            お問い合わせ・サポート
          </Link>
        </div>
      </div>
    </div>
  );
}