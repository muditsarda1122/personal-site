import type { Topic } from "./writing";

export type ExternalPost = {
  title: string;
  url: string;
  date: string; // YYYY-MM-DD
  summary: string;
  topic: Topic;
};

// Title, date and summary come from each post's og:title, article:published_time and og:description.
export const externalPosts: ExternalPost[] = [
  {
    title: "$ whoami",
    url: "https://medium.com/@muditsarda23/whoami-f8989599fb1f",
    date: "2025-08-19",
    summary: "How a whitepaper, a LinkedIn trial, and a cold DM changed my career",
    topic: "Life",
  },
  {
    title: "What is DeDi? The Complete Guide to the Decentralized Directory",
    url: "https://medium.com/@muditsarda23/what-is-dedi-the-complete-guide-to-the-decentralized-directory-953269ae2017",
    date: "2025-08-21",
    summary:
      "An introduction to DeDi — its vision, use cases, and why it could reshape how we access decentralized information.",
    topic: "Trust & identity",
  },
  {
    title: "A Developer’s Guide to DeDi APIs",
    url: "https://medium.com/@muditsarda23/a-developers-guide-to-dedi-apis-2be7474ae900",
    date: "2025-11-18",
    summary: "The essential API reference for developers building on Decentralized Directory.",
    topic: "Trust & identity",
  },
  {
    title: "Life in a DeDi-powered India: A glimpse into the future",
    url: "https://medium.com/@muditsarda23/life-in-a-dedi-powered-india-a-glimpse-into-the-future-66b1c11dfa75",
    date: "2025-09-08",
    summary: "Reimagining everyday life with trusted data at the core",
    topic: "Trust & identity",
  },
  {
    title: "What is Offline Verification Seeking Entity(OVSE)?",
    url: "https://medium.com/@muditsarda23/what-is-offline-verification-seeking-entity-ovse-4f94e800819e",
    date: "2026-05-03",
    summary: "Understanding OVSE, Aadhaar Verifiable Credentials, and the shift toward portable identity",
    topic: "Trust & identity",
  },
];
