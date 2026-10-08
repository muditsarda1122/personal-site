import { meta, siteUrl } from "@/content/site";
import { writingPage } from "@/content/writing";
import { getNativePosts } from "@/lib/writing";

export const dynamic = "force-static";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = getNativePosts().map((post) => {
    const url = `${siteUrl}/writing/${post.slug}`;
    return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${escape(post.summary)}</description>
      <category>${escape(post.topic)}</category>
    </item>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(`${meta.name} — Writing`)}</title>
    <link>${siteUrl}/writing</link>
    <description>${escape(writingPage.intro)}</description>
    <language>en</language>
    <atom:link href="${siteUrl}/writing/rss.xml" rel="self" type="application/rss+xml" />
${items.join("\n")}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
