import { footer } from "@/content/site";

/** `dark` continues the About page's dark band; `rss` adds the feed link. */
export function Footer({ dark = false, rss = false }: { dark?: boolean; rss?: boolean }) {
  return (
    <footer className={dark ? "bg-dark text-[#d8d7d3]" : "mt-16 text-ink-3"}>
      <div className="column">
        <div
          className={`flex flex-col gap-1 border-t pb-10 pt-[22px] text-[13px] sm:flex-row sm:justify-between ${
            dark ? "border-white/15" : "border-line"
          }`}
        >
          <p>{footer.left}</p>
          <p>
            {footer.right}
            {rss && (
              <>
                {" · "}
                <a href={footer.rss.href} className="text-link">
                  {footer.rss.label}
                </a>
              </>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
