import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { externalPosts } from "@/content/writing-external";
import { topics, type PostItem, type Topic } from "@/content/writing";
import { renderMarkdown } from "./markdown";

const dir = path.join(process.cwd(), "content/writing");
const WORDS_PER_MINUTE = 220;

export type NativePost = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  topic: Topic;
  minutes: number;
  body: string;
};

function readPost(file: string): { post: NativePost; draft: boolean } {
  const { data, content } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
  const fail = (msg: string) => new Error(`content/writing/${file}: ${msg}`);

  // YAML turns an unquoted 2026-10-08 into a Date (UTC midnight).
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date;
  if (typeof data.title !== "string" || !data.title) throw fail("missing title");
  if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) throw fail("date must be YYYY-MM-DD");
  if (typeof data.summary !== "string") throw fail("missing summary");
  if (!topics.includes(data.topic)) throw fail(`topic must be one of: ${topics.join(", ")}`);

  const words = content.trim().split(/\s+/).length;
  const post: NativePost = {
    slug: file.replace(/\.md$/, ""),
    title: data.title,
    date,
    summary: data.summary,
    topic: data.topic,
    minutes: Math.max(1, Math.ceil(words / WORDS_PER_MINUTE)),
    body: content,
  };
  return { post, draft: data.draft === true };
}

/** Published native posts, newest first. Drafts never leave this function. */
export function getNativePosts(): NativePost[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map(readPost)
    .filter(({ draft }) => !draft)
    .map(({ post }) => post)
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
}

/**
 * `output: "export"` rejects an empty generateStaticParams(), so with no published posts
 * we emit one placeholder slug; its page and image call notFound().
 */
export function postParams() {
  const posts = getNativePosts();
  return posts.length ? posts.map(({ slug }) => ({ slug })) : [{ slug: "_none" }];
}

export async function getPost(slug: string) {
  const posts = getNativePosts();
  const i = posts.findIndex((p) => p.slug === slug);
  if (i < 0) return null;
  return {
    post: posts[i],
    html: await renderMarkdown(posts[i].body),
    // List is newest first: the next-older post is "previous", the next-newer is "next".
    previous: posts[i + 1] ?? null,
    next: posts[i - 1] ?? null,
  };
}

/** Native and external posts merged, newest first. */
export function getAllItems(): PostItem[] {
  const native: PostItem[] = getNativePosts().map((p) => ({
    title: p.title,
    href: `/writing/${p.slug}`,
    date: p.date,
    summary: p.summary,
    topic: p.topic,
    external: false,
    minutes: p.minutes,
  }));
  const external: PostItem[] = externalPosts.map((p) => ({
    title: p.title,
    href: p.url,
    date: p.date,
    summary: p.summary,
    topic: p.topic,
    external: true,
  }));
  return [...native, ...external].sort(
    (a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title),
  );
}
