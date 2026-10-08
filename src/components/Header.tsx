"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/content/site";
import { Logo } from "./Logo";
import { SiteLink } from "./SiteLink";

export function Header() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : !href.startsWith("http") && pathname.startsWith(href);

  return (
    <header className="column flex h-[72px] items-center justify-between">
      <Link href="/" className="inline-flex min-h-6 items-center gap-2 font-medium text-ink">
        <Logo size={22} />
        mudit
      </Link>
      <nav aria-label="Main" className="flex items-center gap-5 text-[13px]">
        {nav.map(({ label, href }) => {
          const active = isActive(href);
          return (
            <SiteLink
              key={href}
              href={href}
              current={active}
              className={`inline-flex min-h-6 items-center ${
                active ? "text-ink underline decoration-accent underline-offset-4" : "text-ink-2"
              }`}
            >
              {label}
            </SiteLink>
          );
        })}
      </nav>
    </header>
  );
}
