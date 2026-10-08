import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card } from "@/components/Card";
import { Footer } from "@/components/Footer";
import { SiteLink } from "@/components/SiteLink";
import { meta, siteUrl } from "@/content/site";
import { formatLongDate, writingPage } from "@/content/writing";
import { getPost, postParams } from "@/lib/writing";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return postParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const found = await getPost((await params).slug);
  if (!found) return {};
  const { post } = found;
  const title = `${post.title} · ${meta.name}`;
  const images = [
    { url: `/writing/${post.slug}/opengraph-image`, width: 1200, height: 630, alt: post.title },
  ];
  return {
    title,
    description: post.summary,
    alternates: { canonical: `/writing/${post.slug}` },
    openGraph: {
      type: "article",
      title,
      description: post.summary,
      url: `/writing/${post.slug}`,
      publishedTime: post.date,
      images,
    },
    twitter: { title, description: post.summary, images },
  };
}

export default async function Post({ params }: Props) {
  const found = await getPost((await params).slug);
  if (!found) notFound();
  const { post, html, previous, next } = found;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    author: { "@type": "Person", name: meta.name, url: siteUrl },
  };

  return (
    <>
      <main id="main" className="column flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <article className="stagger pt-7">
          <p>
            <SiteLink href="/writing" className="text-link">
              {writingPage.backToAll}
            </SiteLink>
          </p>
          <header className="mt-8">
            <h1 className="text-pretty font-display text-[34px] font-light leading-[1.08] tracking-[-1.2px] text-ink sm:text-[46px]">
              {post.title}
            </h1>
            <p className="mt-3 text-[12.5px] text-ink-3">
              {formatLongDate(post.date)} · {writingPage.readLabel(post.minutes)} · {post.topic}
            </p>
          </header>
          <div className="prose-post mt-8" dangerouslySetInnerHTML={{ __html: html }} />
        </article>

        {(previous || next) && (
          <nav aria-label="More writing" className="reveal mt-[52px] grid grid-cols-1 gap-3 sm:grid-cols-2">
            {previous && (
              <Card
                eyebrow={writingPage.previous}
                title={previous.title}
                href={`/writing/${previous.slug}`}
              />
            )}
            {next && (
              <div className={previous ? "" : "sm:col-start-2"}>
                <Card eyebrow={writingPage.next} title={next.title} href={`/writing/${next.slug}`} />
              </div>
            )}
          </nav>
        )}
      </main>
      <Footer />
    </>
  );
}
