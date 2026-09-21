import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "採用企業様向け | JobSwipe - 60秒自己PR動画で人柄を見極める新卒逆求人",
  description:
    "初期費用0円。エントリーシート選考の限界を超え、60秒の短尺自己PR動画で候補者のリアルな人柄・熱量・対話力をスワイプ閲覧。面接前のミスマッチを劇的に削減する新卒ダイレクトリクルーティング。",
  openGraph: {
    title: "採用企業様向け | JobSwipe - 60秒自己PR動画で人柄を見極める新卒逆求人",
    description:
      "初期費用0円。エントリーシート選考の限界を超え、60秒の短尺自己PR動画で候補者のリアルな人柄・熱量・対話力をスワイプ閲覧。面接前のミスマッチを劇的に削減する新卒ダイレクトリクルーティング。",
  },
  twitter: {
    title: "採用企業様向け | JobSwipe - 60秒自己PR動画で人柄を見極める新卒逆求人",
    description:
      "初期費用0円。エントリーシート選考の限界を超え、60秒の短尺自己PR動画で候補者のリアルな人柄・熱量・対話力をスワイプ閲覧。面接前のミスマッチを劇的に削減する新卒ダイレクトリクルーティング。",
  },
};

export default function ForCompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
