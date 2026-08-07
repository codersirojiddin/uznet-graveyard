import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "UzNet Muzeyi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0d08",
          backgroundImage:
            "radial-gradient(ellipse at top, rgba(120,90,30,0.25), transparent 60%)",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 60, color: "#78716c", marginBottom: 20 }}>
          🏛️
        </div>
        <div style={{ display: "flex", fontSize: 80, color: "#f5f5f4" }}>UzNet Muzeyi</div>
        <div style={{ display: "flex", fontSize: 32, color: "#a8a29e", marginTop: 20 }}>
          O&apos;zbekiston raqamli merosi arxivi
        </div>
      </div>
    ),
    { ...size }
  );
}
