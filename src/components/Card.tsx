import type { CardData } from "@/content/site";
import { SiteLink } from "./SiteLink";

type Props = Omit<CardData, "body"> & { body?: string; eyebrow?: string; chipBelow?: boolean };

export function Card({ title, href, body, eyebrow, chip, chipBelow = false }: Props) {
  const chipEl = chip && <span className={`chip tone-${chip.tone}`}>{chip.label}</span>;
  return (
    <div className={`card ${href ? "card-linked" : ""}`}>
      {href && (
        <span aria-hidden="true" className="card-arrow text-[14px]">
          ↗
        </span>
      )}
      {eyebrow && <p className="mb-1 text-[12px] text-ink-3">{eyebrow}</p>}
      <div className={`flex items-center justify-between gap-2 ${href ? "pr-5" : ""}`}>
        <h3 className="text-[14px] font-medium text-ink">
          {href ? (
            <SiteLink href={href} className="card-link">
              {title}
            </SiteLink>
          ) : (
            title
          )}
        </h3>
        {!chipBelow && chipEl}
      </div>
      {body && <p className="mt-1 text-[13.5px] leading-[1.5]">{body}</p>}
      {chipBelow && <div className="mt-2.5">{chipEl}</div>}
    </div>
  );
}
