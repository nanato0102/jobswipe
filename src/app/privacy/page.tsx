import Link from "next/link";
import { ArrowLeft, Lock, Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* ナビゲーション戻るボタン */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>トップページに戻る</span>
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
              2. 取得する個人情報
            </h2>
            <p>当事務局は、本サービスの提供にあたり以下の情報を適正に取得します：</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>基本情報:</strong> 氏名、メールアドレス、電話番号、パスワード（暗号化保存）</li>
              <li><strong>学歴・経歴情報:</strong> 大学名、学部、学科、学年、卒業予定年、部活動・課外活動等の経歴</li>
              <li><strong>動画・PRコンテンツ:</strong> 投稿された自己紹介・自己PR動画、タグ、アピールテキスト</li>
              <li><strong>採用・選考情報:</strong> オファー履歴、メッセージチャット履歴</li>
              <li><strong>アクセスログ情報:</strong> IPアドレス、ブラウザ情報、Cookie等</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 pb-1 border-b border-slate-100">
              3. 個人情報の利用目的
            </h2>
            <p>取得した個人情報は、以下の目的のためにのみ利用します：</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>本サービスにおける学生と企業のマッチング、スカウトオファー送信、チャット機能の提供</li>
              <li>ユーザー認証、アカウント管理、本人確認のため</li>
              <li>不適切な動画・規約違反コンテンツの監視およびセキュリティ対策のため</li>
              <li>本サービスの品質向上、新機能開発、統計データの作成（個人を特定できない形式）のため</li>
              <li>ユーザーからのお問い合わせ対応、重要なお知らせの通知のため</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 pb-1 border-b border-slate-100">
              4. 第三者への開示・提供の制限
            </h2>
            <p>
              当事務局は、以下の場合を除き、ユーザーの同意なく個人情報を第三者に提供・開示することはありません：
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>採用選考を目的とする審査済み企業への開示:</strong> 学生が本サービスに登録したプロフィールおよび動画は、本サービスを利用する採用企業に公開されます。</li>
              <li>法令に基づく開示請求があった場合</li>
              <li>人の生命、身体または財産の保護のために必要がある場合</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 pb-1 border-b border-slate-100">
              5. 安全管理措置（セキュリティ対策）
            </h2>
            <p>
              当事務局は、IPA（情報処理推進機構）が定める「安全なウェブサイトの作り方」に準拠し、通信の暗号化（SSL/TLS）、パスワードのハッシュ化保存、アクセス権限の厳格な管理、不正アクセス対策等の技術的・組織的安全管理措置を実施しています。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 pb-1 border-b border-slate-100">
              6. 個人情報の開示・訂正・削除
            </h2>
            <p>
              ユーザーは、マイページ（プロフィール編集画面・各種設定）を通じて、自身の登録情報をいつでも確認・訂正・削除することができます。アカウントの完全退会を希望される場合は、お問い合わせ窓口より申請いただけます。
            </p>
          </section>
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