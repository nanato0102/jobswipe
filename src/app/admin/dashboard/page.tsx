"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin-console/dashboard");
  }, [router]);

  return (
    <div className="flex-1 flex items-center justify-center p-12 text-slate-400 text-xs">
      管理者コンソールへ移動中...
    </div>
  );
}
