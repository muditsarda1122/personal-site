import { Footer } from "@/components/Footer";
import { RichText } from "@/components/RichText";
import { SiteLink } from "@/components/SiteLink";
import { notFound } from "@/content/site";

export default function NotFound() {
  return (
    <>
      <main id="main" className="column flex-1">
        <div className="stagger pt-7">
          <h1 className="font-display text-[32px] font-light leading-[1.12] tracking-[-0.8px] text-ink sm:text-[40px]">
            <RichText parts={notFound.h1} />
          </h1>
          <p className="mt-4">
            <SiteLink href={notFound.link.href} className="text-link">
              {notFound.link.label}
            </SiteLink>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
