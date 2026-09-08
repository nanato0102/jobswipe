import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約・動画管理方針 | JobSwipe（ジョブスワイプ）",
  description: "JobSwipeの利用規約、自己PR動画の権利帰属、肖像権保護、無断転載禁止規定に関するページです。",
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
