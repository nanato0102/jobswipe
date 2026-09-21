# 🚀 JobSwipe 連携サービス＆インフラ管理一覧

JobSwipe（ジョブスワイプ）の運用・開発において連携している外部クラウドサービス、無料枠の上限、使用状況の確認方法、環境変数の対応関係をまとめたドキュメントです。
（※Notionにそのまま全選択コピーして貼り付けると、見出しやテーブルが自動で整形されます）

---

## 1. 連携サービス早見表

| サービス名 | 主な役割 | 現在のプラン | 主な無料枠（月間/全体） | ダッシュボード・使用状況リンク |
| :--- | :--- | :--- | :--- | :--- |
| **Vercel** | Webサイト公開 / Next.js実行 / 自動デプロイ | Hobby (無料) | ・転送量: 100 GB/月<br>・ビルド時間: 6,000分/月 | [Vercel Usage 画面](https://vercel.com/dashboard/usage) |
| **Supabase** | データベース (PostgreSQL) / 動画ファイル保存 (Storage) | Free (無料) | ・DB容量: 500 MB<br>・Storage容量: 1 GB<br>・ファイル転送量: 2 GB/月 | [Supabase Project 画面](https://supabase.com/dashboard) |
| **Resend** | お問い合わせ通知 / 自動返信メール送信 | Free (無料) | ・送信数: 3,000通/月<br>（1日最大100通） | [Resend Dashboard](https://resend.com/overview) |
| **GitHub** | ソースコード管理 / バージョン管理 | Free (無料) | ・リポジトリ保存無制限<br>・GitHub Actions: 2,000分/月 | [GitHub リポジトリ](https://github.com/nanato0102/jobswipe) |

---

## 2. 各サービスの詳細と使用状況の確認手順

### ① Vercel（Webホスティング・API実行）
* **役割:** ユーザーがアクセスするWebサイト（`https://jobswipe-app.vercel.app`）を全世界に高速配信し、サーバー側処理（API Routes）を実行します。
* **本番サイトURL:** [https://jobswipe-app.vercel.app](https://jobswipe-app.vercel.app)
* **プロジェクト名:** `jobswipe-app` (チーム: `job-swipe1`)
* **使用状況の確認手順:**
  1. [Vercel Usage 画面](https://vercel.com/dashboard/usage) を開く。
  2. **Bandwidth（転送量）** や **Serverless Functions（処理時間）** の当月利用メーター（％）を確認。

---

### ② Supabase（データベース & 動画ストレージ）
* **役割:** 
  - **Database:** 学生・企業のアカウント情報、プロフィール、職種タグ、オファー、チャットメッセージの保存。
  - **Storage (`videos` バケット):** 学生が投稿した自己PR動画（MP4等）の保存とストリーミング配信。
* **バケット名:** `videos` (Publicアクセス有効)
* **使用状況の確認手順:**
  1. [Supabase Dashboard](https://supabase.com/dashboard) を開き、JobSwipeプロジェクトを選択。
  2. 左サイドバー最下部の **「Settings（歯車アイコン ⚙️）」➔「Usage」** をクリック。
  3. **Database**（現在何MB使用中か / 500MB）、**Storage**（動画合計何MBか / 1GB）を確認。

---

### ③ Resend（メール送信・通知）
* **役割:** お問い合わせフォーム（`/contact`）から送信された内容を管理者にメール通知し、ユーザーへ自動受付メールを返信します。
* **使用状況の確認手順:**
  1. [Resend Dashboard](https://resend.com/overview) を開く。
  2. ホーム画面右上の **「Emails Sent This Month」**（今月送信された通数 / 3,000通）を確認。

---

### ④ GitHub（ソースコード管理）
* **役割:** アプリケーションのすべてのプログラムコードを安全に保存し、コードを更新（Push）した際にVercelへ自動デプロイを連携します。
* **リポジトリURL:** [https://github.com/nanato0102/jobswipe](https://github.com/nanato0102/jobswipe)
* **メインブランチ:** `main`

---

## 3. 環境変数（.env）とサービス対応一覧表

各サービスとアプリを安全に接続するために設定している環境変数の一覧です。

| 環境変数名 | 連携先サービス | 役割・説明 |
| :--- | :--- | :--- |
| `DATABASE_URL` | Supabase (PostgreSQL) | Prisma経由でデータベースに接続・読み書きするための接続文字列 |
| `DIRECT_URL` | Supabase (PostgreSQL) | マイグレーション実行時のダイレクト接続用URL |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase | Storageの動画アップロード・取得を行うAPIエンドポイント |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase | クライアント側（ブラウザ）から安全にSupabaseへアクセスする公開キー |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase | サーバー側から動画保存バケットを管理者権限で操作するシークレットキー |
| `RESEND_API_KEY` | Resend | お問い合わせメールを安全に送信するためのAPIキー |
| `ADMIN_NOTIFICATION_EMAIL` | Resend | お問い合わせがあった際に通知を受け取る管理者メールアドレス |
| `AUTH_SECRET` | NextAuth (認証) | ログインセッションやJWTトークンを暗号化・復号化するための秘密鍵 |

---

## 4. 上限・トラブル時の対応方針

* **動画の保存容量（1GB）が近づいた場合:**
  - 不要になったテスト動画を [Supabase Storage](https://supabase.com/dashboard) 画面から削除するか、必要に応じてProプラン（$25/月）へ切り替えることで容量を拡張できます。
* **本番ドメインへの反映が遅い場合:**
  - Vercel CLIコマンド `npx vercel deploy --prod` により手動で直接最新ビルドを本番へ反映させることができます。
