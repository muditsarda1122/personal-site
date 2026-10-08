import { cta, home, meta, siteUrl } from "@/content/site";
import { writingPage } from "@/content/writing";
import { getAllItems } from "@/lib/writing";

export const dynamic = "force-static";

const abs = (href: string) => (href.startsWith("/") ? `${siteUrl}${href}` : href);
const item = (title: string, href?: string, body?: string) =>
  `- ${href ? `[${title}](${abs(href)})` : title}${body ? `: ${body}` : ""}`;

export function GET() {
  const posts = getAllItems();
  // Talks and papers from the Home list; essays are already in the post list.
  const extras = home.writing.rows
    .filter((r) => (r.kind === "Talk" || r.kind === "Paper") && !posts.some((p) => p.href === r.href))
    .map((r) => item(r.strong, r.href, [r.kind, r.rest?.replace(/^· /, "")].filter(Boolean).join(" · ")));

  const body = [
    `# ${meta.name}`,
    "",
    `> ${meta.home.description}`,
    "",
    item("About", "/about", meta.about.description),
    "",
    "## Now",
    ...home.now.cards.map((c) => item(c.title, c.href, c.body)),
    "",
    "## Built",
    ...home.built.cards.map((c) => item(c.title, c.href, c.body)),
    "",
    "## Writing",
    item("All writing", "/writing", writingPage.intro),
    ...posts.map((p) => item(p.title, p.href, p.summary || undefined)),
    ...extras,
    "",
    "## Contact",
    item(cta.book.label, cta.book.href),
    item(cta.email.label, cta.email.href),
    ...home.find.links.map((l) => item(l.label, l.href)),
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
