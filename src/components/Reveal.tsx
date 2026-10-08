"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Adds `.is-visible` to each `.reveal` element the first time 15% of it is on screen. */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 },
    );
    document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
