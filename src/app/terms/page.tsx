import Link from "next/link";
import Image from "next/image";
import { Shield, ArrowLeft, FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="flex-1 bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
        <div className="border-b border-slate-100 pb-6 flex items-center justify-between">
          <div className="space-y-1">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-emerald-800 font-semibold mb-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>トップページに戻る</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2">
              <FileText className="w-6 h-6 text-emerald-700" />
              <span>JobSwipe 利用規約（ドラフト版）</span>
            </h1>
            <p className="text-xs text-slate-500">制定日：2026年8月1日 / 最終改定日：2026年8月29日</p>
          </div>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">第1条（はじめに・適用範囲）</h2>
            <p>
              本利用規約（以下「本規約」）は、JobSwipe運営事務局（以下「当サービス」）が提供する新卒向けスワイプ型逆求人プラットフォーム「JobSwipe」（以下「本サービス」）の利用条件を定めるものです。本サービスを利用するすべての学生ユーザーおよび企業ユーザー（以下「ユーザー」）は、本規約に同意した上で本サービスを利用するものとします。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">第2条（ユーザー登録・アカウント管理）</h2>
            <p>
              1. ユーザーは、本サービスの利用に際して真実、正確かつ最新の情報を登録しなければなりません。
              <br />
              2. ユーザーは、自己の責任においてメールアドレスおよびパスワードを厳重に管理するものとし、第三者への譲渡・貸与は一切禁止します。
              <br />
              3. 当サービスは、登録情報が不正確であると判断した場合、事前の通知なくアカウントの利用停止または削除を行うことができます。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">第3条（自己PR動画の投稿・権利の帰属）</h2>
            <p>
              1. 学生ユーザーが本サービスに投稿する自己PR動画（以下「投稿動画」）の著作権は、投稿した学生ユーザーに帰属します。
              <br />
              2. 学生ユーザーは、当サービスおよび本サービスに登録する企業ユーザーに対し、採用選考およびマッチングを目的として投稿動画を閲覧・利用することを許諾するものとします。
              <br />
              3. 投稿動画は、JobSwipeの審査を通過した企業ユーザーのみが閲覧できる安全な環境で管理されます。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">第4条（禁止事項）</h2>
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
            <h2 className="text-base font-bold text-slate-900">第5条（オファーおよびチャットの利用規律）</h2>
            <p>
              1. 企業ユーザーは、学生ユーザーの動画・プロフィールを確認の上、誠実な採用選考を目的としてオファーを送信するものとします。
              <br />
              2. チャット機能において、ハラスメント行為、差別的言動、労働条件の虚偽提示等は厳格に禁止され、違反が認められた場合は即時アカウント停止処分となります。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">第6条（コンテンツの監視および削除）</h2>
            <p>
              当サービスは、本サービスの適切な運営のため、投稿された動画およびメッセージを監視し、本規約に違反すると判断したコンテンツを事前の通知なく削除する権利を有します。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">第7条（免責事項）</h2>
            <p>
              1. 当サービスは、本サービスを通じて行われる企業と学生の間の採用選考、内定、雇用契約の成立を保証するものではありません。
              <br />
              2. ユーザー間で生じたトラブルについて、当サービスに故意または重過失がある場合を除き、当サービスは一切の責任を負いません。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">第8条（規約の変更）</h2>
            <p>
              当サービスは、必要に応じて本規約を変更することができます。重要な変更を行う場合は、サービス上での告知またはメール等によりユーザーに事前に通知します。
            </p>
          </section>
        </div>

        <div className="pt-6 border-t border-slate-100 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-bold transition-colors"
          >
            <span>トップページへ戻る</span>
          </Link>
        </div>
      </div>
    </div>
  );
}