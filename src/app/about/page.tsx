import Image from "next/image";
import { CtaButtons } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { RichText } from "@/components/RichText";
import { about, chapters } from "@/content/about";
import { meta } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/about", meta.about.title, meta.about.description);

export default function About() {
  return (
    <>
      <main id="main" className="flex-1">
        <div className="column">
          <div className="stagger pt-7">
            <h1 className="text-pretty font-display text-[42px] font-light leading-[1.02] tracking-[-2px] text-ink sm:text-[64px]">
              <RichText parts={about.h1} />
            </h1>
            <p className="mt-4">{about.sub}</p>
          </div>

          <ol className="mt-12">
            {chapters.map((chapter) => (
              <li
                key={chapter.id}
                id={chapter.id}
                className="reveal grid grid-cols-1 gap-y-1 border-t border-line py-[34px] sm:grid-cols-[120px_1fr] sm:gap-x-6"
              >
                <p className="text-[12px] text-ink-3 sm:pt-2">{chapter.date}</p>
                <div className="min-w-0">
                  <h2 className="font-display text-[26px] font-light leading-[1.15] tracking-[-0.6px] text-ink sm:text-[30px]">
                    <RichText parts={chapter.title} />
                  </h2>
                  {chapter.paragraphs.map((parts, i) => (
                    <p key={i} className="mt-2 text-[14.5px]">
                      <RichText parts={parts} />
                    </p>
                  ))}
                  {chapter.photo && (
                    <Image
                      src={chapter.photo.src}
                      alt={chapter.photo.alt}
                      width={chapter.photo.width}
                      height={chapter.photo.height}
                      className="mt-4 h-auto w-[260px] max-w-full rounded-[6px]"
                    />
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>

        <section aria-labelledby="band-title" className="reveal bg-dark py-14">
          <div className="column">
            <h2
              id="band-title"
              className="mb-6 font-display text-[40px] font-light leading-[1.12] text-white"
            >
              {about.band}
            </h2>
            <CtaButtons inverted />
          </div>
        </section>
      </main>
      <Footer dark />
    </>
  );
}
