import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ・資料請求・導入相談 | JobSwipe（ジョブスワイプ）",
  description: "JobSwipe（ジョブスワイプ）に関するお問い合わせ、企業向け資料請求、導入相談の公式窓口です。",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
