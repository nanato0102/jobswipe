import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー・個人情報保護方針 | JobSwipe（ジョブスワイプ）",
  description: "JobSwipeの個人情報保護方針、自己PR動画の安全管理措置、セキュリティ方針に関するページです。",
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
