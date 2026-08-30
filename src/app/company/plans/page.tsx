"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RoleGuard from "@/components/RoleGuard";
import CompanyMobileTabs from "@/components/CompanyMobileTabs";
import { useAuth } from "@/context/AuthContext";
import { appStore } from "@/lib/appStore";
import { useToast } from "@/context/ToastContext";
import {
  Building2,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  CreditCard,
  FileText,
  HelpCircle,
  ExternalLink,
  Zap,
} from "lucide-react";

interface PlanOption {
  id: string;
  name: string;
  quota: number;
  price: number;
  description: string;
  features: string[];
  isPopular?: boolean;
}

const MONTHLY_PLANS: PlanOption[] = [
  {
    id: "plan-light",
    name: "ライトプラン",
    quota: 30,
    price: 3800,
    description: "まずはお試しで新卒スカウトを始めたい企業様向け",
    features: ["月間オファー 30枠付与", "動画スワイプ閲覧 無制限", "ダイレクトチャット面談", "メールサポート"],
  },
  {
    id: "plan-standard",
    name: "スタンダードプラン",
    quota: 100,
    price: 9800,
    description: "積極的な母集団形成・毎月安定してアプローチしたい企業様向け",
    features: ["月間オファー 100枠付与", "動画スワイプ閲覧 無制限", "ダイレクトチャット面談", "優先チャットサポート"],
    isPopular: true,
  },
  {
    id: "plan-premium",
    name: "プレミアムプラン",
    quota: 300,
    price: 24800,
    description: "大量採用や複数職種での積極採用を行う企業様向け",
    features: ["月間オファー 300枠付与", "動画スワイプ閲覧 無制限", "ダイレクトチャット面談", "専任カスタマーサクセス"],
  },
];

interface SpotOption {
  id: string;
  name: string;
  quota: number;
  price: number;
  unitPrice: string;
}

const SPOT_OPTIONS: SpotOption[] = [
  { id: "spot-20", name: "＋20枠 追加パック", quota: 20, price: 2500, unitPrice: "125円/枠" },
  { id: "spot-50", name: "＋50枠 まとめパック", quota: 50, price: 5000, unitPrice: "100円/枠" },
  { id: "spot-100", name: "＋100枠 大口パック", quota: 100, price: 9000, unitPrice: "90円/枠" },
];

export default function CompanyPlansPage() {
  const router = useRouter();
  const { session } = useAuth();
  const { success } = useToast();

  const [selectionType, setSelectionType] = useState<"MONTHLY" | "SPOT">("MONTHLY");
  const [selectedPlanId, setSelectedPlanId] = useState("plan-standard");
  const [selectedSpotId, setSelectedSpotId] = useState("spot-50");

  const [companyName, setCompanyName] = useState(session?.name || "テックイノベーション株式会社");
  const [applicantName, setApplicantName] = useState("採用ご担当者様");
  const [billingEmail, setBillingEmail] = useState(session?.email || "billing@example.com");
  const [paymentMethod, setPaymentMethod] = useState<"INVOICE" | "CREDIT_CARD">("INVOICE");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (session?.name) setCompanyName(session.name);
    if (session?.email) setBillingEmail(session.email);
  }, [session]);

  const selectedPlan = MONTHLY_PLANS.find((p) => p.id === selectedPlanId) || MONTHLY_PLANS[1];
  const selectedSpot = SPOT_OPTIONS.find((s) => s.id === selectedSpotId) || SPOT_OPTIONS[1];

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) return;

    setLoading(true);

    setTimeout(() => {
      if (selectionType === "MONTHLY") {
        appStore.updateCompanyPlan(`${selectedPlan.name} (月${selectedPlan.quota}枠 / 月額¥${selectedPlan.price.toLocaleString()})`, selectedPlan.quota);
      } else {
        appStore.addCompanyExtraQuota(selectedSpot.quota);
      }

      setLoading(false);
      setIsCompleted(true);
    }, 600);
  };

  return (
    <RoleGuard allowedRoles={["COMPANY", "ADMIN"]}>
      <CompanyMobileTabs>
        <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6 w-full">
          {/* ================= 統一ページヘッダー ================= */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>利用状況へ戻る</span>
            </button>
          </div>

          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-blue-50 text-blue-900 border border-blue-200">
              <Building2 className="w-3.5 h-3.5" />
              <span>企業マイページ</span>
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              料金プラン変更・オファー枠追加
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              採用規模やシーズンに合わせて、最適な月額プランへの変更やお急ぎのスポット増枠をお申し込みいただけます。
            </p>
          </div>

          {/* ================= 申し込み完了画面 ================= */}
          {isCompleted ? (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-8 sm:p-12 text-center space-y-6 animate-fade-in">
              <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200 shadow-2xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">お申し込みが完了しました！</h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  {selectionType === "MONTHLY"
                    ? `「${selectedPlan.name}」へのプラン変更を受け付けました。オファー枠が即時反映されました。`
                    : `「${selectedSpot.name}」の追加増枠（+${selectedSpot.quota}枠）が即時反映されました。`}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 max-w-md mx-auto text-left text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">ご請求先メール:</span>
                  <span className="font-bold text-slate-900">{billingEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">お支払い方法:</span>
                  <span className="font-bold text-slate-900">
                    {paymentMethod === "INVOICE" ? "請求書払い（翌月末払い）" : "クレジットカード決済"}
                  </span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-1.5">
                  <span className="text-slate-500">お申し込み金額:</span>
                  <span className="font-bold text-slate-900">
                    ¥{selectionType === "MONTHLY" ? selectedPlan.price.toLocaleString() : selectedSpot.price.toLocaleString()}（税別）
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/company/usage"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-xs transition-all"
                >
                  <span>利用状況画面へ戻る</span>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleApply} className="space-y-6">
              {/* ================= タイプ切り替えタブ ================= */}
              <div className="flex p-1 bg-slate-100 rounded-2xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setSelectionType("MONTHLY")}
                  className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    selectionType === "MONTHLY"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>月額プランの変更（毎月更新）</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectionType("SPOT")}
                  className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    selectionType === "SPOT"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>スポット増枠（今月だけの買い切り）</span>
                </button>
              </div>

              {/* ================= 1. 月額プラン選択 ================= */}
              {selectionType === "MONTHLY" && (
                <div className="space-y-4">
                  <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-700" />
                    <span>月額プランを選択してください</span>
                  </h2>

                  <div className="grid sm:grid-cols-3 gap-4">
                    {MONTHLY_PLANS.map((plan) => {
                      const isSelected = selectedPlanId === plan.id;
                      return (
                        <div
                          key={plan.id}
                          onClick={() => setSelectedPlanId(plan.id)}
                          className={`p-5 rounded-2xl border transition-all cursor-pointer relative space-y-3 flex flex-col justify-between ${
                            isSelected
                              ? "bg-blue-50/40 border-blue-600 ring-2 ring-blue-600/20 shadow-sm"
                              : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                          }`}
                        >
                          {plan.isPopular && (
                            <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full bg-slate-900 text-white font-bold text-[10px] shadow-2xs">
                              一番人気
                            </span>
                          )}

                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-900 text-sm">{plan.name}</span>
                              <div
                                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                  isSelected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300"
                                }`}
                              >
                                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </div>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-snug">{plan.description}</p>
                          </div>

                          <div className="py-2 border-y border-slate-100">
                            <div className="flex items-baseline gap-1">
                              <span className="text-2xl font-black text-slate-900">¥{plan.price.toLocaleString()}</span>
                              <span className="text-xs text-slate-500 font-bold">/月 (税別)</span>
                            </div>
                            <p className="text-xs font-bold text-blue-700 mt-0.5">月間 {plan.quota}枠 付与</p>
                          </div>

                          <ul className="space-y-1.5 text-[11px] text-slate-600">
                            {plan.features.map((feat, idx) => (
                              <li key={idx} className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ================= 2. スポット増枠選択 ================= */}
              {selectionType === "SPOT" && (
                <div className="space-y-4">
                  <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span>追加するオファー枠数を選択してください（今月のみ有効）</span>
                  </h2>

                  <div className="grid sm:grid-cols-3 gap-4">
                    {SPOT_OPTIONS.map((spot) => {
                      const isSelected = selectedSpotId === spot.id;
                      return (
                        <div
                          key={spot.id}
                          onClick={() => setSelectedSpotId(spot.id)}
                          className={`p-5 rounded-2xl border transition-all cursor-pointer relative space-y-3 ${
                            isSelected
                              ? "bg-blue-50/40 border-blue-600 ring-2 ring-blue-600/20 shadow-sm"
                              : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900 text-sm">{spot.name}</span>
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                isSelected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300"
                              }`}
                            >
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                          </div>

                          <div className="pt-1">
                            <div className="flex items-baseline gap-1">
                              <span className="text-2xl font-black text-slate-900">¥{spot.price.toLocaleString()}</span>
                              <span className="text-xs text-slate-500 font-bold">(税別)</span>
                            </div>
                            <span className="text-[11px] font-bold text-emerald-700 block mt-0.5">{spot.unitPrice}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ================= 3. お申し込み情報入力 ================= */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
                <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-700" />
                  <span>お申し込み・ご請求情報</span>
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">法人名 / 企業名</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">お申し込みご担当者様名</label>
                    <input
                      type="text"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      required
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">請求書送付先メールアドレス</label>
                    <input
                      type="email"
                      value={billingEmail}
                      onChange={(e) => setBillingEmail(e.target.value)}
                      required
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
                    />
                  </div>

                  {/* お支払い方法選択 */}
                  <div className="sm:col-span-2 space-y-2 pt-2 border-t border-slate-100">
                    <label className="block text-xs font-bold text-slate-700">お支払い方法</label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <label
                        className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                          paymentMethod === "INVOICE"
                            ? "bg-slate-50 border-slate-900 text-slate-900 font-bold"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "INVOICE"}
                          onChange={() => setPaymentMethod("INVOICE")}
                          className="accent-slate-900"
                        />
                        <FileText className="w-4 h-4 text-slate-700" />
                        <span className="text-xs">請求書払い（月末締め翌月末払い）</span>
                      </label>

                      <label
                        className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                          paymentMethod === "CREDIT_CARD"
                            ? "bg-slate-50 border-slate-900 text-slate-900 font-bold"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "CREDIT_CARD"}
                          onChange={() => setPaymentMethod("CREDIT_CARD")}
                          className="accent-slate-900"
                        />
                        <CreditCard className="w-4 h-4 text-slate-700" />
                        <span className="text-xs">クレジットカード決済（即時決済）</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= 4. 同意チェック ＆ 申し込み実行 ================= */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4">
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-slate-900 cursor-pointer"
                  />
                  <label htmlFor="agreeTerms" className="text-xs text-slate-700 cursor-pointer leading-relaxed">
                    <Link href="/terms" target="_blank" className="font-bold underline hover:text-slate-900">
                      利用規約
                    </Link>
                    および
                    <Link href="/tokusho" target="_blank" className="font-bold underline hover:text-slate-900">
                      特定商取引法に基づく表記
                    </Link>
                    に同意の上、申し込みます。
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-200">
                  <div className="text-xs text-slate-600">
                    <span>お支払い予定金額: </span>
                    <span className="text-xl font-black text-slate-900">
                      ¥
                      {selectionType === "MONTHLY"
                        ? selectedPlan.price.toLocaleString()
                        : selectedSpot.price.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-slate-400">（税別）</span>
                  </div>

                  <button
                    type="submit"
                    disabled={!agreeTerms || loading}
                    className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>{loading ? "処理中..." : "上記の内容で申し込む"}</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </CompanyMobileTabs>
    </RoleGuard>
  );
}
