import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = SITE_NAME;

// Branded 1200x630 link-preview card, generated at build time.
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
          backgroundColor: "#F6F5F1",
          color: "#14171C",
          padding: "72px",
          borderLeft: "20px solid #51247A",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            color: "#5C6672",
            fontSize: "26px",
            letterSpacing: "8px",
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: "56px", height: "2px", backgroundColor: "#51247A" }} />
          <div style={{ display: "flex" }}>QDSA · Defence Research</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              display: "flex",
              fontSize: "82px",
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-2px",
            }}
          >
            Transitioning to Quantum-Safe
          </div>
          <div style={{ display: "flex", fontSize: "30px", color: "#5C6672", maxWidth: "960px" }}>
            Security testing of post-quantum cryptography in security-critical applications
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* heat-ramp strip echoes the data visual language */}
          <div style={{ display: "flex", height: "10px", width: "420px" }}>
            {["#180F3E", "#7B2382", "#D44842", "#F6A21E", "#FCFFA4"].map((c) => (
              <div key={c} style={{ flex: 1, backgroundColor: c }} />
            ))}
          </div>
          <div style={{ display: "flex", fontSize: "28px", color: "#14171C" }}>
            The University of Queensland
            <span style={{ color: "#0E7C86", padding: "0 14px" }}>·</span>
            QDSA Collaborative Research Grant
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
