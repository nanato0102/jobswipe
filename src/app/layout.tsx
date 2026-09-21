import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import "./globals.css";

const siteUrl = "https://jobswipe-app.vercel.app";
const siteTitle = "JobSwipe | 短尺自己PR動画で人柄を可視化する新卒逆求人プラットフォーム";
const siteDescription =
  "学生が投稿した60秒の自己PR動画を企業がスワイプ形式で閲覧し、直感的にオファーを送れる新卒逆求人プラットフォーム。紙のESでは伝わらない雰囲気・対話力・人柄を可視化し、面接前のミスマッチを劇的に削減します。";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | JobSwipe",
  },
  description: siteDescription,
  keywords: [
    "新卒採用",
    "自己PR動画",
    "逆求人",
    "動画選考",
    "ダイレクトリクルーティング",
    "Z世代採用",
    "就職活動",
    "JobSwipe",
    "ジョブスワイプ",
  ],
  authors: [{ name: "JobSwipe 運営事務局", url: siteUrl }],
  creator: "JobSwipe",
  publisher: "JobSwipe",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "JobSwipe (ジョブスワイプ)",
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-white text-slate-900 flex flex-col antialiased">
        <AuthProvider>
          <ToastProvider>
            <Navbar />
            <main className="flex-1 flex flex-col w-full pt-16">{children}</main>
            <Footer />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}