export type Tone = "orange" | "green" | "blue" | "lavender" | "pink" | "salmon";

/** Rich copy: plain strings, or a styled/linked run of text. */
export type Part =
  | string
  | { text: string; mark?: Tone; href?: string; strong?: boolean; underline?: boolean };

export type CardData = {
  title: string;
  href?: string;
  body: string;
  chip?: { label: string; tone: Tone };
};

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://muditsarda.com").replace(
  /\/$/,
  "",
);

export const meta = {
  name: "Mudit Sarda",
  home: {
    title: "Mudit Sarda",
    description: "Software engineer at Dhiway, building Reverie: memory for coding agents.",
  },
  about: {
    title: "About · Mudit Sarda",
    description: "Football, books, a kitchen, blockchain, and an agent that kept forgetting.",
  },
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Writing", href: "/writing" },
];

export const cta = {
  book: { label: "Book a 20-min call", href: "https://cal.com/mudit-sarda/20min" },
  email: { label: "Send email", href: "mailto:muditsarda23@gmail.com?subject=Hello%20Mudit" },
};

export const footer = {
  left: "© 2026 Mudit Sarda · Surat ↔ Bangalore",
  right: "Built with agents, reviewed by me",
  rss: { label: "RSS", href: "/writing/rss.xml" },
};

const dediGuide =
  "https://medium.com/@muditsarda23/what-is-dedi-the-complete-guide-to-the-decentralized-directory-953269ae2017";
const reverie = "https://reverie.muditsarda.com";
const medium = "https://medium.com/@muditsarda23";

export const home = {
  h1: [
    "Hey, I'm ",
    { text: "Mudit", underline: true },
    ". I build things that ",
    { text: "remember", mark: "orange" },
    ".",
  ] satisfies Part[],
  intro: [
    "Software engineer at Dhiway, where I shipped a registry now live in India's energy grid. On the side, I'm building ",
    { text: "Reverie", strong: true },
    ", memory for coding agents.",
  ] satisfies Part[],
  now: {
    title: "NOW",
    sub: "What I'm spending my days on.",
    cards: [
      {
        title: "Reverie",
        href: reverie,
        body: "Open-source memory for coding agents. It keeps what your agent learns, reviewed by you, tied to your code.",
        chip: { label: "Open source", tone: "lavender" },
      },
      {
        title: "Dhiway",
        href: "https://dhiway.com/",
        body: "Backend, latency and durable systems. Took DeDi's writes from 15–20 s to about 1–2 s before launch.",
        chip: { label: "Software developer", tone: "green" },
      },
    ] satisfies CardData[],
  },
  built: {
    title: "THINGS I'VE BUILT",
    sub: "Some shipped, some taught me a lot.",
    cards: [
      {
        title: "DeDi",
        href: dediGuide,
        body: "A decentralised registry, live in the India Energy Stack and the Indonesia Open Network.",
        chip: { label: "Live", tone: "green" },
      },
      {
        title: "Secure QR",
        href: "/about#bangalore",
        body: "A QR that shows if someone stuck a fake one over it, without breaking normal scanning.",
        chip: { label: "Research", tone: "blue" },
      },
      {
        title: "Cyra",
        body: "Peer-to-peer byte sync on Iroh. One command, one node, one UI.",
        chip: { label: "Prototype", tone: "salmon" },
      },
      {
        title: "RWA attestation",
        href: "/about#finternet",
        body: "Stops the same real-world asset being tokenised twice. Got me my first real job.",
        chip: { label: "Solidity", tone: "orange" },
      },
    ] satisfies CardData[],
  },
  writing: {
    title: "TALKS & WRITING",
    rows: [
      {
        kind: "Talk",
        strong: "DeDi, with my CTO",
        rest: "· LF Decentralized Trust meetup",
        href: "https://www.meetup.com/lfdt-sf/events/311538281/",
      },
      {
        kind: "Essay",
        strong: "What is DeDi?",
        rest: "The complete guide · Medium",
        href: dediGuide,
      },
      {
        kind: "Paper",
        strong: "Reverie: A Biological Memory Architecture for AI Agents",
        href: `${reverie}/research/biological-memory-architecture`,
      },
      { kind: "More", strong: "Everything I've written", href: "/writing" },
    ] as { kind: string; strong: string; rest?: string; href: string }[],
  },
  about: {
    title: "A LITTLE ABOUT ME",
    text: [
      "Football since grade one. Read Steve Jobs' biography in grade seven and never recovered. Once talked my way into a restaurant kitchen with no culinary degree, and ",
      { text: "got a raise", mark: "orange" },
      ".",
    ] satisfies Part[],
    link: { label: "The long version →", href: "/about" },
  },
  find: {
    title: "FIND ME ON",
    links: [
      { label: "GitHub", href: "https://github.com/muditsarda1122" },
      { label: "GitHub (work)", href: "https://github.com/muditDhiway" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/mudit-sarda-ab84991bb/" },
      { label: "X", href: "https://x.com/MuditSarda1" },
      { label: "Medium", href: medium },
    ],
  },
};

export const person = {
  jobTitle: "Software Engineer",
  worksFor: "Dhiway",
  // GitHub (personal), LinkedIn, X, Medium
  sameAs: [
    home.find.links[0].href,
    home.find.links[2].href,
    home.find.links[3].href,
    home.find.links[4].href,
  ],
};

export const notFound = {
  h1: ["Nothing ", { text: "here", mark: "orange" }, "."] satisfies Part[],
  link: { label: "Back home →", href: "/" },
};
