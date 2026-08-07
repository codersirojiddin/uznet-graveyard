import { getArticles, getProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const baseUrl = process.env.SITE_URL || "https://uznetmuzeyi.uz";
  const [articles, projects] = await Promise.all([getArticles(), getProjects()]);

  const sorted = [...articles].sort(
    (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );

  const items = sorted
    .map((a) => {
      const project = projects.find((p) => p.id === a.project_id);
      const link = `${baseUrl}/maqolalar/${a.slug}`;
      const description = project?.short_summary || a.content.slice(0, 200);
      return `
    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${new Date(a.published_at).toUTCString()}</pubDate>
      <description>${escapeXml(description)}</description>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>UzNet Muzeyi — Maqolalar</title>
    <link>${baseUrl}</link>
    <description>O'zbekiston internet olamining afsonaviy loyihalari haqida maqolalar</description>
    <language>uz</language>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
