import Image from "next/image";
import { Card } from "@/components/Card";
import { CtaButtons } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { RichText } from "@/components/RichText";
import { Section } from "@/components/Section";
import { SiteLink } from "@/components/SiteLink";
import { home, meta, person, siteUrl } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/", meta.home.title, meta.home.description);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: meta.name,
  url: siteUrl,
  jobTitle: person.jobTitle,
  worksFor: { "@type": "Organization", name: person.worksFor },
  sameAs: person.sameAs,
};

export default function Home() {
  return (
    <>
      <main id="main" className="column flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <div className="stagger">
          <Image
            src="/img/me-160.webp"
            alt="Mudit Sarda, smiling, in a café"
            width={72}
            height={72}
            priority
            className="mt-7 size-[72px] rounded-full object-cover object-[50%_30%]"
          />
          <h1 className="mt-5 text-pretty font-display text-[32px] font-light leading-[1.12] tracking-[-0.8px] text-ink sm:text-[40px]">
            <RichText parts={home.h1} />
          </h1>
          <p className="mt-4 text-pretty">
            <RichText parts={home.intro} />
          </p>
          <div className="mt-6">
            <CtaButtons />
          </div>
        </div>

        <div className="mt-[52px] flex flex-col gap-[52px]">
          <Section id="now" title={home.now.title} sub={home.now.sub}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {home.now.cards.map((card) => (
                <Card key={card.title} {...card} chipBelow />
              ))}
            </div>
          </Section>

          <Section id="built" title={home.built.title} sub={home.built.sub}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {home.built.cards.map((card) => (
                <Card key={card.title} {...card} />
              ))}
            </div>
          </Section>

          <Section id="writing" title={home.writing.title}>
            <ul className="border-t border-line">
              {home.writing.rows.map((row) => (
                <li key={row.href} className="border-b border-line">
                  <SiteLink
                    href={row.href}
                    className="group grid grid-cols-[92px_1fr] items-baseline py-3"
                  >
                    <span className="text-[12px] text-ink-3">{row.kind}</span>
                    <span>
                      <strong className="font-medium text-ink group-hover:underline group-hover:decoration-accent group-hover:underline-offset-4">
                        {row.strong}
                      </strong>
                      {row.rest && ` ${row.rest}`}
                    </span>
                  </SiteLink>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="about" title={home.about.title}>
            <p className="font-display text-[22px] font-light leading-[1.45] text-ink">
              <RichText parts={home.about.text} />
            </p>
            <p className="mt-4">
              <SiteLink href={home.about.link.href} className="text-link">
                {home.about.link.label}
              </SiteLink>
            </p>
          </Section>

          <Section id="find" title={home.find.title}>
            <ul className="flex flex-wrap gap-2">
              {home.find.links.map(({ label, href }) => (
                <li key={href}>
                  <SiteLink
                    href={href}
                    className="inline-block rounded-full border border-line bg-white px-3 py-[5px] text-[13px] text-ink hover:bg-[#f4f4f2]"
                  >
                    {label}
                  </SiteLink>
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </main>
      <Footer />
    </>
  );
}
