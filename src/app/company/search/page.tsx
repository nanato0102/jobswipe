"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SearchRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/company/usage");
  }, [router]);

  return (
    <div className="flex-1 flex items-center justify-center p-12 text-slate-400 text-xs">
      利用状況画面へ移動中...
    </div>
  );
}
