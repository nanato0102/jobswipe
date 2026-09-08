"use client";

import Link from "next/link";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 text-xs py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* 1. ブランド概要 */}
          <div className="space-y-3 md:col-span-1">
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
              <span className="font-black text-base text-slate-900 tracking-tight">JobSwipe</span>
            </Link>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              短尺自己PR動画で人柄を可視化する新世代の新卒逆求人プラットフォーム。
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
              <span>完全審査制・動画非公開管理</span>
            </div>
          </div>

          {/* 2. 学生・求職者向け */}
          <div className="space-y-2.5">
            <h4 className="font-black text-slate-900 text-xs tracking-wider uppercase">学生・求職者の方</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/register" className="hover:text-emerald-700 transition-colors">
                  新規会員登録（無料）
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-emerald-700 transition-colors">
                  学生ログイン
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-emerald-700 transition-colors">
                  サービスの特徴・使い方
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. 企業の採用担当者様 */}
          <div className="space-y-2.5">
            <h4 className="font-black text-slate-900 text-xs tracking-wider uppercase">企業の採用担当者様</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/for-company" className="hover:text-slate-900 transition-colors font-bold text-blue-700">
                  企業向けサービス案内
                </Link>
              </li>
              <li>
                <Link href="/company/register" className="hover:text-slate-900 transition-colors">
                  企業利用お申し込み
                </Link>
              </li>
              <li>
                <Link href="/company/login" className="hover:text-slate-900 transition-colors">
                  企業ログイン
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. サポート・法的情報（集約） */}
          <div className="space-y-2.5">
            <h4 className="font-black text-slate-900 text-xs tracking-wider uppercase">サポート・法的表記</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/contact" className="hover:text-slate-900 transition-colors">
                  お問い合わせ・ご相談
                </Link>
              </li>
              <li>
                <Link href="/company/about" className="hover:text-slate-900 transition-colors">
                  運営会社概要
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-slate-900 transition-colors">
                  利用規約・動画管理方針
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-slate-900 transition-colors">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/tokusho" className="hover:text-slate-900 transition-colors">
                  特定商取引法・職業安定法表記
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* コピーライト */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
          <p>&copy; {new Date().getFullYear()} JobSwipe Inc. All rights reserved.</p>
          <p>人柄が採用の基準になる社会をつくる</p>
        </div>
      </div>
    </footer>
  );
}
