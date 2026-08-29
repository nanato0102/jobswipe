import Link from "next/link";
import { Shield, ArrowLeft, Lock } from "lucide-react";

export default function PrivacyPage() {
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
              <Lock className="w-6 h-6 text-emerald-700" />
              <span>JobSwipe プライバシーポリシー（個人情報保護方針）</span>
            </h1>
            <p className="text-xs text-slate-500">制定日：2026年8月1日 / 最終改定日：2026年8月29日</p>
          </div>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. 基本方針</h2>
            <p>
              JobSwipe運営事務局（以下「当事務局」）は、就職活動における学生および採用企業の皆様からお預かりする個人情報（氏名、学歴、自己PR動画、連絡先等）の重要性を深く認識し、個人情報の保護に関する法律（個人情報保護法）および関係諸法令・ガイドラインを遵守し、適正な取扱いと安全管理を徹底いたします。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. 取得する個人情報</h2>
            <p>当事務局は、本サービスの提供にあたり以下の情報を取得します：</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>基本情報:</strong> 氏名、生年月日、性別、メールアドレス、電話番号等</li>
              <li><strong>学歴・経歴情報:</strong> 大学名、学部、学科、学年、卒業予定年、部活動・課外活動等の経歴</li>
              <li><strong>動画・PRコンテンツ:</strong> 投稿された自己紹介・自己PR動画、タグ、アピールテキスト</li>
              <li><strong>採用・選考情報:</strong> 志望条件、オファー履歴、メッセージチャット履歴</li>
              <li><strong>アクセスログ情報:</strong> IPアドレス、ブラウザ情報、Cookie、端末識別情報等</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. 個人情報の利用目的</h2>
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
            <h2 className="text-base font-bold text-slate-900">4. 第三者への開示・提供の制限</h2>
            <p>
              当事務局は、以下の場合を除き、ユーザーの同意なく個人情報を第三者に提供・開示することはありません：
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>採用選考を目的とする企業への開示:</strong> 学生が本サービスに登録したプロフィールおよび動画は、本サービスを利用する採用企業に公開されます。</li>
              <li>法令に基づく開示請求があった場合</li>
              <li>人の生命、身体または財産の保護のために必要がある場合</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">5. 安全管理措置（セキュリティ対策）</h2>
            <p>
              当事務局は、IPA（情報処理推進機構）が定める「安全なウェブサイトの作り方」に準拠し、通信の暗号化（SSL/TLS）、パスワードのハッシュ化保存、アクセス権限の厳格な管理、不正アクセス対策等の技術的・組織的安全管理措置を実施しています。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">6. 個人情報の開示・訂正・削除</h2>
            <p>
              ユーザーは、マイページ（プロフィール編集画面・動画管理画面）を通じて、自身の登録情報をいつでも確認・訂正・削除することができます。アカウントの完全退会を希望される場合は、お問い合わせ窓口より申請いただけます。
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