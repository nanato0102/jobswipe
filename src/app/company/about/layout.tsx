import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "運営組織・会社概要 | JobSwipe（ジョブスワイプ）",
  description: "JobSwipe（ジョブスワイプ）の運営組織情報、事業内容、連絡先窓口に関するページです。",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
