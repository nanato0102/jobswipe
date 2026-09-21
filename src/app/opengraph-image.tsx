import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "JobSwipe | 履歴書を、スワイプする時代へ。";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#ffffff",
          color: "#0f172a",
          fontFamily: "sans-serif",
          border: "16px solid #f1f5f9",
        }}
      >
        {/* Top Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "8px",
                backgroundColor: "#047857",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontWeight: "900",
                fontSize: "22px",
              }}
            >
              JS
            </div>
            <div style={{ display: "flex", fontSize: "28px", fontWeight: "900", color: "#0f172a", letterSpacing: "-0.5px" }}>
              JobSwipe
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              borderRadius: "6px",
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              color: "#0f172a",
              fontSize: "15px",
              fontWeight: "700",
            }}
          >
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#059669" }} />
            <span>新世代・動画逆求人プラットフォーム</span>
          </div>
        </div>

        {/* Center Main Catchcopy */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "1000px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "58px",
              fontWeight: "900",
              lineHeight: "1.18",
              letterSpacing: "-1.5px",
              color: "#0f172a",
            }}
          >
            <span>履歴書を、</span>
            <span style={{ color: "#047857" }}>スワイプする時代へ。</span>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "22px",
              color: "#475569",
              lineHeight: "1.6",
              fontWeight: "500",
            }}
          >
            AIが量産したテンプレESは、もういらない。スマホ自撮り60秒動画で「素の人柄・熱量・対話力」を可視化し、優良企業から直接オファーが届く。
          </div>
        </div>

        {/* Bottom Trust & Feature Badges */}
        <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "6px",
              backgroundColor: "#f0fdf4",
              border: "1px solid #bbf7d0",
              color: "#166534",
              fontSize: "16px",
              fontWeight: "700",
            }}
          >
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#166534" }} />
            <span>利用料 完全無料</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "6px",
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              color: "#334155",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#047857" }} />
            <span>60秒スマホ自撮りでOK</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "6px",
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              color: "#334155",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#047857" }} />
            <span>承諾まで完全匿名・身バレ防止</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "6px",
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              color: "#334155",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#047857" }} />
            <span>優良企業から面談確約</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
