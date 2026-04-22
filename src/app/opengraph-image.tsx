import { ImageResponse } from "next/og";

export const alt = "OffX · Tweet without internet";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          color: "#ededed",
          fontFamily: "Inter, sans-serif",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundImage:
            "radial-gradient(ellipse at top right, rgba(245, 158, 11, 0.18), transparent 60%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 38,
            fontWeight: 600,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "#141414",
              border: "1px solid #262626",
              alignItems: "center",
              justifyContent: "center",
              color: "#f59e0b",
              fontFamily: "monospace",
              fontWeight: 700,
            }}
          >
            ))
          </div>
          <div style={{ display: "flex" }}>
            <span>Off</span>
            <span style={{ color: "#f59e0b" }}>X</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 108,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.02,
            }}
          >
            <div style={{ display: "flex" }}>Tweet without</div>
            <div style={{ display: "flex", color: "#f59e0b" }}>internet.</div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#a1a1aa",
              maxWidth: 960,
              lineHeight: 1.35,
            }}
          >
            The first X bridge that posts your tweets over SMS. Built for
            censorship, blackouts, and broken networks.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#71717a",
            fontSize: 22,
          }}
        >
          <div style={{ display: "flex" }}>offlinex.org</div>
          <div style={{ display: "flex" }}>
            313 shutdowns · 52 countries · 2025
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
