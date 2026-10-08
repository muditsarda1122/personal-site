# Mudit Sarda — personal website

Next.js (App Router) + TypeScript + Tailwind CSS v4, exported as a fully static site (`out/`).

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # static export to ./out
npm start        # serves ./out on a local port
```

Optional: set `NEXT_PUBLIC_SITE_URL` (default `https://muditsarda.com`). It drives the canonical URLs, Open Graph, sitemap, robots.txt, llms.txt and JSON-LD.

## Change content

All copy is typed data:

- `src/content/site.ts` — Home page, nav, buttons, footer, titles/descriptions, 404.
- `src/content/about.ts` — About page heading and the chapters (id, date, title, paragraphs, optional photo).
- `src/content/writing.ts` — /writing copy, topics and their chip colours.
- `src/content/writing-external.ts` — Medium (external) posts: `{ title, url, date, summary, topic }`.

Rich text is an array of strings and objects: `{ text, mark: "orange" }` (highlighter), `{ text, href }` (text link), `{ text, strong: true }`.
Tones: `orange`, `green`, `blue`, `lavender`, `pink`, `salmon`.

`/llms.txt`, the sitemap and the JSON-LD are generated from the same data, so editing the content updates them too.

Colours, type and motion live in `src/app/globals.css`.

## Write a post

Add `content/writing/<slug>.md`. The filename is the URL (`/writing/<slug>`):

```md
---
title: "Post title"
date: "2026-10-08"        # YYYY-MM-DD
summary: "One line."
topic: "Agents & memory"  # Agents & memory | Building | Trust & identity | Life
draft: false              # default false; drafts are left out of the build
---

Markdown (GFM) body.
```

`content/writing/_example.md` is a draft that shows every prose style; set `draft: false` to preview it, and set it back before you deploy.
Reading time is words / 220. The feed (`/writing/rss.xml`), sitemap, `/llms.txt` and per-post Open Graph image are generated from the same files.
While there are no published posts the build emits one placeholder page, `/writing/_none` (a `noindex` "Nothing here"), because `output: "export"` refuses an empty `generateStaticParams`.

## Swap the Cal.com link

In `src/content/site.ts`, replace `CALCOM_USERNAME` in `cta.book.href`:

```ts
book: { label: "Book a 20-min call", href: "https://cal.com/CALCOM_USERNAME/20min" },
```

## Photos and icons

Originals live in `photos/` (git-ignored, not served). `npm run images` regenerates `public/img/*.webp` and the browser-tab icons
(`src/app/icon.png`, `apple-icon.png`, `favicon.ico`, cropped from `photos/me.jpeg`) with sharp. The Open Graph image is built from `src/app/opengraph-image.tsx` at build time.

## Deploy on Vercel

1. Push the repo to GitHub and import it in Vercel. The Next.js preset works as is; `output: "export"` makes the build fully static.
2. Add `NEXT_PUBLIC_SITE_URL` (your real domain) under Project Settings → Environment Variables.
3. Enable Web Analytics in the project settings; `<Analytics />` is already in `src/app/layout.tsx`.
