import { Footer } from "@/components/Footer";
import { RichText } from "@/components/RichText";
import { WritingList } from "@/components/WritingList";
import { writingPage } from "@/content/writing";
import { pageMetadata } from "@/lib/metadata";
import { getAllItems } from "@/lib/writing";

export const metadata = {
  ...pageMetadata("/writing", writingPage.title, writingPage.intro),
  alternates: { canonical: "/writing", types: { "application/rss+xml": "/writing/rss.xml" } },
};

export default function Writing() {
  return (
    <>
      <main id="main" className="column flex-1">
        <div className="stagger pt-7">
          <h1 className="text-pretty font-display text-[32px] font-light leading-[1.12] tracking-[-0.8px] text-ink sm:text-[40px]">
            <RichText parts={writingPage.h1} />
          </h1>
          <p className="mt-4 text-pretty">{writingPage.intro}</p>
          <div className="mt-8">
            <WritingList posts={getAllItems()} />
          </div>
        </div>
      </main>
      <Footer rss />
    </>
  );
}
