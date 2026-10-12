import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";
import { heatColor } from "@/lib/colorRamp";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = SITE_NAME;

// A leakage profile like the home page's silicon strip: quiet, then a hotspot.
const STRIP = Array.from({ length: 48 }, (_, i) => Math.min(1, 0.06 + ((i * 37) % 11) / 70 + 0.9 * Math.exp(-((i - 33) ** 2) / 22)));

// Link-preview card in the site's own language: near-black ground, one accent,
// generated at build time.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#08090A",
          backgroundImage: "radial-gradient(60% 80% at 75% 0%, rgba(245,165,36,0.10), transparent 70%)",
          color: "#F7F8F8",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            alignSelf: "flex-start",
            padding: "8px 18px",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.12)",
            backgroundColor: "#16171C",
            color: "#9CA3AF",
            fontSize: "24px",
          }}
        >
          <div style={{ width: "10px", height: "10px", borderRadius: "999px", backgroundColor: "#F5A524" }} />
          QDSA defence research project
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          {/* Broken by hand: left to wrap, the title split "Quantum-Safe" at its hyphen. */}
          <div style={{ display: "flex", flexDirection: "column", fontSize: "84px", fontWeight: 600, lineHeight: 1.02, letterSpacing: "-3px" }}>
            <div style={{ display: "flex" }}>Transitioning to</div>
            <div style={{ display: "flex" }}>Quantum-Safe</div>
          </div>
          <div style={{ display: "flex", fontSize: "30px", color: "#9CA3AF", maxWidth: "980px", lineHeight: 1.35 }}>
            Side-channel and fault-injection testing of quantum-safe chips
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          <div style={{ display: "flex", height: "14px", width: "520px", gap: "2px" }}>
            {STRIP.map((t, i) => (
              <div key={i} style={{ flex: 1, backgroundColor: heatColor(t), borderRadius: "2px" }} />
            ))}
          </div>
          <div style={{ display: "flex", fontSize: "26px", color: "#7F8691" }}>
            <span style={{ color: "#F7F8F8" }}>The University of Queensland</span>
            <span style={{ padding: "0 14px" }}>·</span>
            QDSA Collaborative Research Grant
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
