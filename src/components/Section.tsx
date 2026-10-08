import type { ReactNode } from "react";

type Props = { id: string; title: string; sub?: string; children: ReactNode };

export function Section({ id, title, sub, children }: Props) {
  return (
    <section aria-labelledby={`${id}-title`} className="reveal">
      <h2 id={`${id}-title`} className="text-[13px] font-medium uppercase tracking-[0.05em] text-ink">
        {title}
      </h2>
      {sub && <p className="mt-1 text-[13px] text-ink-3">{sub}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}
