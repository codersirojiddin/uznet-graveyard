import { ImageResponse } from "next/og";
import { getProjects } from "@/lib/data";

export const runtime = "nodejs";
export const alt = "UzNet Muzeyi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const statusColor: Record<string, string> = {
  RIP: "#f87171",
  Acquired: "#fbbf24",
  Archived: "#a8a29e",
};

export default async function OpengraphImage({ params }: { params: { slug: string } }) {
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === params.slug);

  const name = project?.name || "UzNet Muzeyi";
  const tagline = project?.tagline || "O'zbekiston internet olami arxivi";
  const years = project ? `${project.founded_year} — ${project.closed_year}` : "";
  const status = project?.status || "RIP";

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
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            position: "absolute",
            top: 50,
            fontSize: 22,
            color: "#78716c",
            letterSpacing: 2,
          }}
        >
          🏛️ UZNET MUZEYI
        </div>

        <div
          style={{
            display: "flex",
            padding: "10px 24px",
            border: `2px solid ${statusColor[status]}`,
            borderRadius: 999,
            color: statusColor[status],
            fontSize: 24,
            marginBottom: 30,
            letterSpacing: 3,
          }}
        >
          {status}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 72,
            color: "#f5f5f4",
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.15,
          }}
        >
          {name}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#a8a29e",
            marginTop: 20,
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          {tagline}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#78716c",
            marginTop: 40,
            letterSpacing: 2,
          }}
        >
          {years}
        </div>
      </div>
    ),
    { ...size }
  );
}
