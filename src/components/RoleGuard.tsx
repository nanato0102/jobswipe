"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthSession } from "@/lib/useAuthSession";
import { ShieldAlert, LogIn, ArrowRight } from "lucide-react";
import type { UserType } from "@/types";

interface RoleGuardProps {
  allowedRoles: UserType[];
  children: React.ReactNode;
}

export default function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const { session, loading } = useAuthSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div>
      </div>
    );
  }

  const hasAccess = session && allowedRoles.includes(session.userType);

  if (!hasAccess) {
    const roleNameMap: Record<UserType, string> = {
      STUDENT: "学生ユーザー",
      COMPANY: "企業採用担当者",
      ADMIN: "システム管理者",
    };

    const requiredNames = allowedRoles.map((r) => roleNameMap[r]).join(" または ");

    return (
      <div className="flex-1 flex items-center justify-center p-6 py-16">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 max-w-md w-full text-center">
          <div className="w-14 h-14 bg-rose-50 border border-rose-200 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-600">
            <ShieldAlert className="w-7 h-7" />
          </div>

          <h2 className="text-lg font-bold text-slate-900 mb-2">アクセス権限がありません</h2>
          <p className="text-xs text-slate-600 mb-6 leading-relaxed">
            このページを閲覧するには <strong>{requiredNames}</strong> としてログインする必要があります。
          </p>

          <div className="space-y-2">
            <Link
              href="/login"
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <LogIn className="w-4 h-4" />
              <span>該当アカウントでログイン</span>
            </Link>

            <Link
              href="/"
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>トップページへ戻る</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}