import { cta } from "@/content/site";
import { SiteLink } from "./SiteLink";

const base =
  "inline-flex h-9 items-center gap-2 rounded-[6px] px-[14px] text-[14px] font-medium transition-colors";

const styles = {
  light: {
    primary: "bg-ink text-white hover:bg-black",
    secondary: "border border-ink/20 text-ink hover:bg-[#f4f4f2]",
  },
  // On the dark band the buttons invert.
  dark: {
    primary: "bg-white text-ink hover:bg-[#f4f4f2]",
    secondary: "border border-white/30 text-white hover:bg-white/10",
  },
};

export function CtaButtons({ inverted = false }: { inverted?: boolean }) {
  const s = styles[inverted ? "dark" : "light"];
  return (
    <div className="flex flex-wrap gap-3">
      <SiteLink href={cta.book.href} className={`${base} ${s.primary}`}>
        <span aria-hidden="true" className="size-2 rounded-full bg-[#7fbc5d]" />
        {cta.book.label}
      </SiteLink>
      <SiteLink href={cta.email.href} className={`${base} ${s.secondary}`}>
        {cta.email.label}
      </SiteLink>
    </div>
  );
}
