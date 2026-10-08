import type { Part, Tone } from "./site";

export const topics = ["Agents & memory", "Building", "Trust & identity", "Life"] as const;
export type Topic = (typeof topics)[number];

export const topicTone: Record<Topic, Tone> = {
  "Agents & memory": "lavender",
  Building: "salmon",
  "Trust & identity": "blue",
  Life: "orange",
};

/** One row in the /writing list: a native Markdown post or an external one. */
export type PostItem = {
  title: string;
  href: string;
  date: string; // YYYY-MM-DD
  summary: string;
  topic: Topic;
  external: boolean;
  /** Reading time in minutes; native posts only. */
  minutes?: number;
};

export const writingPage = {
  title: "Writing · Mudit Sarda",
  h1: ["Writing, mostly about ", { text: "things that forget", mark: "lavender" }, "."] satisfies Part[],
  intro:
    "Notes on building agents, memory and trust, plus the odd story from a kitchen. Some live here, some on Medium.",
  all: "All" as const,
  filterLabel: "Filter by topic",
  externalLabel: "Medium ↗",
  empty: "Nothing here yet. Try ",
  backToAll: "← All writing",
  previous: "← Previous",
  next: "Next →",
  minutesLabel: (n: number) => `${n} min`,
  readLabel: (n: number) => `${n} min read`,
};

const monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthsLong = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "2026-10-08" -> "Oct 2026" */
export function formatMonthYear(date: string) {
  const [y, m] = date.split("-");
  return `${monthsShort[Number(m) - 1]} ${y}`;
}

/** "2026-10-08" -> "8 October 2026" */
export function formatLongDate(date: string) {
  const [y, m, d] = date.split("-");
  return `${Number(d)} ${monthsLong[Number(m) - 1]} ${y}`;
}
