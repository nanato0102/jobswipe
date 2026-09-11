"use client";

import Link from "next/link";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white text-slate-600 text-xs sm:text-sm py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
          {/* 1. ブランド概要 */}
          <div className="space-y-3.5 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 group inline-block">
              <div className="relative w-7 h-7 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="JobSwipe Logo"
                  width={28}
                  height={28}
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="font-black text-lg text-slate-900 tracking-tight">JobSwipe</span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
              短尺自己PR動画で人柄を可視化する新世代の新卒逆求人プラットフォーム。
            </p>
            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
              <span>完全審査制・非公開動画管理</span>
            </div>
          </div>

          {/* 2. 学生・求職者向け */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-xs sm:text-sm tracking-wider uppercase">学生・求職者の方</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/register" className="text-slate-600 hover:text-emerald-700 transition-colors">
                  新規会員登録（無料）
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-slate-600 hover:text-emerald-700 transition-colors">
                  学生ログイン
                </Link>
              </li>
              <li>
                <Link href="/#features" className="text-slate-600 hover:text-emerald-700 transition-colors">
                  サービスの特徴・使い方
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. 企業の採用担当者様 */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-xs sm:text-sm tracking-wider uppercase">企業の採用担当者様</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/for-company" className="text-blue-700 hover:text-blue-800 transition-colors font-bold">
                  企業向けサービス案内
                </Link>
              </li>
              <li>
                <Link href="/company/register" className="text-slate-600 hover:text-slate-900 transition-colors">
                  企業利用お申し込み
                </Link>
              </li>
              <li>
                <Link href="/company/login" className="text-slate-600 hover:text-slate-900 transition-colors">
                  企業ログイン
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. サポート・法的情報 */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-xs sm:text-sm tracking-wider uppercase">サポート・法的表記</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-slate-900 transition-colors">
                  お問い合わせ・ご相談
                </Link>
              </li>
              <li>
                <Link href="/company/about" className="text-slate-600 hover:text-slate-900 transition-colors">
                  運営会社概要
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-600 hover:text-slate-900 transition-colors">
                  利用規約・動画管理方針
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-600 hover:text-slate-900 transition-colors">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/tokusho" className="text-slate-600 hover:text-slate-900 transition-colors">
                  特定商取引法・職業安定法表記
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* コピーライト */}
        <div className="pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-medium">
          <p>&copy; {new Date().getFullYear()} JobSwipe Inc. All rights reserved.</p>
          <p>人柄が採用の基準になる社会をつくる</p>
        </div>
      </div>
    </footer>
  );
}
