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
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#141414",
              border: "1px solid #262626",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 5 32 A 19 19 0 0 1 43 32"
                stroke="#f59e0b"
                strokeWidth="2.4"
                strokeLinecap="round"
                opacity="0.3"
              />
              <path
                d="M 11 32 A 13 13 0 0 1 37 32"
                stroke="#f59e0b"
                strokeWidth="2.4"
                strokeLinecap="round"
                opacity="0.6"
              />
              <path
                d="M 16 32 A 8 8 0 0 1 32 32"
                stroke="#f59e0b"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <path
                d="M 12 22 h 7 q 3 0 3 3 v 7 q 0 3 -3 3 h -4 l -4 4 l 1 -4 q -3 0 -3 -3 v -7 q 0 -3 3 -3 z"
                fill="#141414"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <circle cx="12.5" cy="28.5" r="1.3" fill="#f59e0b" />
              <circle cx="15.5" cy="28.5" r="1.3" fill="#f59e0b" />
              <circle cx="18.5" cy="28.5" r="1.3" fill="#f59e0b" />
            </svg>
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
