"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkles, ShieldCheck, Heart, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 text-xs py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-8">
          {/* ブランド概要 */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group inline-block">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="JobSwipe Logo"
                  width={32}
                  height={32}
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="font-black text-lg text-slate-900 tracking-tight">JobSwipe</span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              「短尺自己PR動画で人柄を可視化する新卒逆求人プラットフォーム」。ES文章や学歴フィルターを超えて、あなたの熱量と人柄に惹かれる優良企業と出会えます。
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>厳格な法人審査制・安心安全な非公開動画管理</span>
            </div>
          </div>

          {/* 学生・求職者向け */}
          <div className="space-y-3">
            <h4 className="font-black text-slate-900 text-xs tracking-wider uppercase">学生・求職者の方</h4>
            <ul className="space-y-2 text-xs">
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
                <Link href="/student/video" className="hover:text-emerald-700 transition-colors">
                  動画投稿・自己PR
                </Link>
              </li>
              <li>
                <Link href="/student/offers" className="hover:text-emerald-700 transition-colors">
                  オファー一覧
                </Link>
              </li>
            </ul>
          </div>

          {/* 企業向け */}
          <div className="space-y-3">
            <h4 className="font-black text-slate-900 text-xs tracking-wider uppercase">企業の採用担当者様</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/company/register" className="hover:text-slate-900 transition-colors">
                  企業アカウント登録
                </Link>
              </li>
              <li>
                <Link href="/company/login" className="hover:text-slate-900 transition-colors">
                  企業ログイン
                </Link>
              </li>
              <li>
                <Link href="/swipe" className="hover:text-slate-900 transition-colors">
                  学生動画スワイプ
                </Link>
              </li>
              <li>
                <Link href="/company/search" className="hover:text-slate-900 transition-colors">
                  学生検索・スカウト
                </Link>
              </li>
            </ul>
          </div>

          {/* サポート・法的情報 */}
          <div className="space-y-3">
            <h4 className="font-black text-slate-900 text-xs tracking-wider uppercase">サポート・法的表記</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/contact" className="hover:text-slate-900 transition-colors">
                  お問い合わせ・ご相談
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-slate-900 transition-colors">
                  利用規約
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-slate-900 transition-colors">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/tokusho" className="hover:text-slate-900 transition-colors">
                  特定商取引法に基づく表記
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* コピーライト */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>&copy; {new Date().getFullYear()} JobSwipe Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>人柄が採用の基準になる社会をつくる</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
