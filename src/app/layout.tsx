import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "JobSwipe | 短尺自己PR動画で人柄を可視化する新卒逆求人プラットフォーム",
  description: "学生が投稿した自己PR動画を企業がスワイプ形式で閲覧し、直感的にオファーを送れる逆求人プラットフォーム",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
        <AuthProvider>
          <ToastProvider>
            <Navbar />
            <main className="flex-1 flex flex-col w-full pt-16">{children}</main>
            <footer className="hidden md:block border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
              <div className="max-w-7xl mx-auto px-4">
                <p>&copy; {new Date().getFullYear()} JobSwipe. All rights reserved.</p>
              </div>
            </footer>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}