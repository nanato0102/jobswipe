"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock, Shield, Home } from "lucide-react";

export default function PrivacyPage() {
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
              <Lock className="w-6 h-6 text-slate-700" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                JobSwipe プライバシーポリシー
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                制定日：2026年3月1日 / 最終改定日：2026年8月30日
              </p>
            </div>
          </div>
        </div>

        {/* ポリシー本文コンテナ */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 pb-1 border-b border-slate-100">
              1. 基本方針
            </h2>
            <p>
              JobSwipe運営事務局（以下「当事務局」）は、就職活動における学生および採用企業の皆様からお預かりする個人情報（氏名、学歴、自己PR動画、連絡先等）の重要性を深く認識し、個人情報の保護に関する法律（個人情報保護法）および関係諸法令・ガイドラインを遵守し、適正な取扱いと安全管理を徹底いたします。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 pb-1 border-b border-slate-100">
              2. 取得する個人情報の項目
            </h2>
            <p>当事務局は、本サービスの提供にあたり以下の情報を取得します：</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>学生ユーザー：</strong>氏名、メールアドレス、大学・学部・学年、自己PR動画、プロフィール情報、希望業界・職種等</li>
              <li><strong>企業ユーザー：</strong>企業名、所在地、担当者氏名、部署・役職、企業メールアドレス、電話番号、採用情報等</li>
              <li><strong>利用ログ：</strong>アクセスログ、動画閲覧履歴、オファー送信履歴、チャットメッセージ履歴、Cookie情報等</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 pb-1 border-b border-slate-100">
              3. 個人情報の利用目的
            </h2>
            <p>取得した個人情報は、以下の目的のために利用いたします：</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>学生と企業の採用マッチングおよびオファー・チャット機能の提供</li>
              <li>ユーザー認証、アカウント管理、本人確認</li>
              <li>不適切な動画・規約違反コンテンツの監視およびサービス品質の維持</li>
              <li>お問い合わせ・サポート対応および各種お知らせの配信</li>
              <li>サービスの改善、統計データ分析（個人を特定できない形での集計）</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 pb-1 border-b border-slate-100">
              4. 第三者提供の制限
            </h2>
            <p>
              当事務局は、以下の場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません：
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>学生ユーザーが公開設定した自己PR動画・プロフィールを、当事務局の審査を通過した登録企業に開示する場合</li>
              <li>法令に基づく開示要請（裁判所、警察等からの適法な照会）がある場合</li>
              <li>人の生命、身体または財産の保護のために緊急の必要がある場合</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 pb-1 border-b border-slate-100">
              5. 安全管理措置（セキュリティ）
            </h2>
            <p>
              当事務局は、IPA（情報処理推進機構）の「安全なウェブサイトの作り方」に準拠した設計を行い、通信のSSL/TLS暗号化、アクセス権限の厳格な管理、データベースの保護等、不正アクセスや漏洩を防止するための高度な技術的・組織的安全対策を講じています。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 pb-1 border-b border-slate-100">
              6. 個人情報の開示・訂正・削除
            </h2>
            <p>
              ユーザーは、本サービスの設定画面またはお問い合わせ窓口より、自己の個人情報の開示、訂正、利用停止、アカウント削除（退会）をいつでも請求することができます。
            </p>
          </section>
        </div>

        {/* ページ下部：戻るCTAカード */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600 font-medium">
            プライバシーポリシーの確認が完了しましたら、元の登録画面へお戻りください。
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
          <Link href="/terms" className="hover:text-slate-900 underline">
            利用規約
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