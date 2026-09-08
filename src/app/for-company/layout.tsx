import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "企業向け採用サービスのご案内 | JobSwipe（ジョブスワイプ）",
  description:
    "60秒の自己PR動画を縦スワイプ。ESの定型文や学歴フィルターでは見抜けない「リアルな人柄・熱量・対人力」を面接前に可視化する新卒逆求人プラットフォーム。",
};

export default function ForCompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
