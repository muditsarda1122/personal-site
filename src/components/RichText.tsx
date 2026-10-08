import type { Part } from "@/content/site";
import { SiteLink } from "./SiteLink";

export function RichText({ parts }: { parts: Part[] }) {
  return (
    <>
      {parts.map((part, i) => {
        if (typeof part === "string") return part;
        if (part.mark)
          return (
            <span key={i} className={`mark tone-${part.mark}`}>
              {part.text}
            </span>
          );
        if (part.href)
          return (
            <SiteLink key={i} href={part.href} className="text-link">
              {part.text}
            </SiteLink>
          );
        if (part.strong)
          return (
            <strong key={i} className="font-medium text-ink">
              {part.text}
            </strong>
          );
        if (part.underline)
          return (
            <span key={i} className="underline decoration-accent decoration-2 underline-offset-[6px]">
              {part.text}
            </span>
          );
        return part.text;
      })}
    </>
  );
}
