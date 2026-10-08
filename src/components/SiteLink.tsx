import Link from "next/link";
import type { ReactNode } from "react";

type Props = { href: string; className?: string; current?: boolean; children: ReactNode };

/** Internal links use next/link; http(s) links open in a new tab with a screen-reader note. */
export function SiteLink({ href, className, current, children }: Props) {
  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  if (href.startsWith("mailto:")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} aria-current={current ? "page" : undefined}>
      {children}
    </Link>
  );
}
