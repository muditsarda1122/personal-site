"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  formatMonthYear,
  topics,
  topicTone,
  writingPage,
  type PostItem,
  type Topic,
} from "@/content/writing";
import { SiteLink } from "./SiteLink";

type Filter = Topic | typeof writingPage.all;
type ViewProps = { posts: PostItem[]; topic: Filter; onSelect: (topic: Filter) => void };

const pill = "inline-flex min-h-6 items-center rounded-full border px-3 py-[5px] text-[13px]";

function View({ posts, topic, onSelect }: ViewProps) {
  const present = topics.filter((t) => posts.some((p) => p.topic === t));
  const visible = topic === writingPage.all ? posts : posts.filter((p) => p.topic === topic);

  // Posts arrive newest first, so years come out newest first too.
  const years: { year: string; posts: PostItem[] }[] = [];
  for (const post of visible) {
    const year = post.date.slice(0, 4);
    const last = years[years.length - 1];
    if (last?.year === year) last.posts.push(post);
    else years.push({ year, posts: [post] });
  }

  return (
    <>
      {present.length >= 2 && (
        <div role="group" aria-label={writingPage.filterLabel} className="flex flex-wrap gap-2">
          {[writingPage.all, ...present].map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={t === topic}
              onClick={() => onSelect(t)}
              className={`${pill} cursor-pointer ${
                t === topic
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-white text-ink hover:bg-[#f4f4f2]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      {years.length === 0 && (
        <p className="mt-8">
          {writingPage.empty}
          <button type="button" className="text-link cursor-pointer" onClick={() => onSelect(writingPage.all)}>
            {writingPage.all}
          </button>
          .
        </p>
      )}

      {years.map(({ year, posts }) => (
        <section key={year} aria-label={year} className="mt-8">
          <h2 className="mb-2 text-[12px] font-medium tracking-[0.05em] text-ink-3">{year}</h2>
          <ul className="border-t border-line">
            {posts.map((post) => (
              <li key={post.href} className="border-b border-line">
                <SiteLink href={post.href} className="group block py-4">
                  <span className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <span className="font-display text-[19px] font-light leading-[1.25] text-ink sm:text-[21px]">
                      <span className="group-hover:underline group-hover:decoration-accent group-hover:underline-offset-[5px]">
                        {post.title}
                      </span>
                      {post.external && (
                        <span className="ml-2 whitespace-nowrap font-body text-[12px] text-accent">
                          {writingPage.externalLabel}
                        </span>
                      )}
                    </span>
                    <time dateTime={post.date} className="shrink-0 text-[12px] text-ink-3">
                      {formatMonthYear(post.date)}
                      {post.minutes && ` · ${writingPage.minutesLabel(post.minutes)}`}
                    </time>
                  </span>
                  {post.summary && <span className="mt-1 block text-[13.5px] leading-[1.5]">{post.summary}</span>}
                  <span className={`chip tone-${topicTone[post.topic]} mt-2`}>{post.topic}</span>
                </SiteLink>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}

function Filtered({ posts }: { posts: PostItem[] }) {
  const requested = useSearchParams().get("topic");
  const topic: Filter = topics.find((t) => t === requested) ?? writingPage.all;

  const onSelect = (next: Filter) => {
    const url = new URL(window.location.href);
    if (next === writingPage.all) url.searchParams.delete("topic");
    else url.searchParams.set("topic", next);
    window.history.replaceState(null, "", url);
  };

  return <View posts={posts} topic={topic} onSelect={onSelect} />;
}

/** Topic filter lives in `?topic=`. The static HTML shows All; the URL applies after hydration. */
export function WritingList({ posts }: { posts: PostItem[] }) {
  return (
    <Suspense fallback={<View posts={posts} topic={writingPage.all} onSelect={() => {}} />}>
      <Filtered posts={posts} />
    </Suspense>
  );
}
