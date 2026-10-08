import type { Part } from "./site";

export type Chapter = {
  id: string;
  date: string;
  title: Part[];
  paragraphs: Part[][];
  photo?: { src: string; width: number; height: number; alt: string };
};

export const about = {
  h1: ["A short history of getting ", { text: "bored", mark: "orange" }, " and building things."] satisfies Part[],
  sub: "Born in Surat, 2002. The rest, in chapters.",
  band: "Building something? Let's talk.",
};

export const chapters: Chapter[] = [
  {
    id: "early",
    date: "2008 – 2020",
    title: ["Football, and a lot of ", { text: "books", mark: "green" }],
    paragraphs: [
      [
        "Played since grade one: house team from grade three, school team from grade five, then Surat. Never got to play for Gujarat, and I still think about it.",
      ],
      [
        "I read everything, from Tintin, Asterix, Amar Chitra Katha and Tinkle to encyclopedias about space. In grade seven I read Steve Jobs' biography. Then Musk, JRD Tata, Branson. I've wanted to build a company ever since, and tech felt like the place to do it.",
      ],
    ],
  },
  {
    id: "blockchain",
    date: "2020 – 2024",
    title: ["Blockchain, through ", { text: "cartoon zombies", mark: "blue" }],
    paragraphs: [
      [
        "Engineering at the LNM Institute of Information Technology, Jaipur. DSA never pulled me in. A technology that could rebuild finance and trust did.",
      ],
      [
        "I learned it through CryptoZombies (I've always liked learning from pictures), then Patrick Collins' videos. No blockchain company came to campus, so I went looking on my own.",
      ],
    ],
  },
  {
    id: "kitchen",
    date: "Summer 2023",
    title: ["The chef who ", { text: "wasn't hired", mark: "orange" }],
    paragraphs: [
      [
        "I'd always cooked with my mum. A restaurant near home had a \"front desk\" opening, and I assumed that meant the kitchen. It didn't, and they only hired chefs with a culinary degree.",
      ],
      [
        "So I offered to work a week for free; if they didn't like me, they could let me go. I joined the prep team, stayed two months, and got a raise.",
      ],
    ],
    photo: {
      src: "/img/apron-800.webp",
      width: 750,
      height: 749,
      alt: "My feet in the restaurant's lift, the summer I worked as a chef",
    },
  },
  {
    id: "finternet",
    date: "2024",
    title: ["Five weeks, then ", { text: "out", mark: "pink" }],
    paragraphs: [
      [
        "My first internship was building NFT marketplaces. Then more NFT marketplaces. It was repetitive, and it felt off. I left in under five weeks.",
      ],
      [
        "Then I read ",
        {
          text: "the Finternet paper",
          href: "https://www.bis.org/publications/working-paper-1178-finternet-financial-system-future",
        },
        " by Nandan Nilekani and the BIS, and it blew my mind. It raised a question I couldn't stop thinking about: if anyone can tokenise any asset, who checks the token is real? I built smart contracts that let the issuing authority attest its tokens.",
      ],
      [
        "A friend told me, over coffee, to show it to people who'd care. So I wrote to people across the Finternet ecosystem. Dhiway wrote back.",
      ],
    ],
  },
  {
    id: "bangalore",
    date: "2024 – 2025",
    title: ["Bangalore, and ", { text: "72 hours of AI", mark: "lavender" }],
    paragraphs: [
      [
        "A six-month internship at Dhiway: tests for their blockchain, a middleware, a tamper-evident QR, experiments with Iroh, a crawler.",
      ],
      [
        "Then the Beckn Energetic Hackathon. None of us had built anything with AI. In three days we built an assistant that onboarded people to solar, a main agent routing to sub-agents over Beckn's APIs. We came second, just behind a team of AI engineers.",
      ],
    ],
    photo: {
      src: "/img/qr-800.webp",
      width: 800,
      height: 1067,
      alt: "The tamper-evident QR, taped to a wall for testing",
    },
  },
  {
    id: "dedi",
    date: "2025 – now",
    title: ["DeDi, and the ", { text: "startup life", mark: "salmon" }],
    paragraphs: [
      [
        "I went full-time and got DeDi, the best product I've worked on. Frontend, backend, customer calls, support, docs: everything. It went live in India's energy stack, and I presented it with my CTO at an ",
        { text: "LF Decentralized Trust meetup", href: "https://www.meetup.com/lfdt-sf/events/311538281/" },
        ".",
      ],
      [
        "Late nights, a lot of coffee, and the most I've ever learned. Lately that includes a local-first sync layer I can't talk about yet.",
      ],
    ],
  },
  {
    id: "reverie",
    date: "2026",
    title: ["Then my agent ", { text: "forgot", mark: "lavender" }, " again"],
    paragraphs: [
      [
        "My coding agents got smarter every day, but only within a session. Whatever we'd figured out in session three was gone by session four, so I kept re-explaining the same decisions.",
      ],
      ["So I started building ", { text: "Reverie", href: "https://reverie.muditsarda.com" }, "."],
    ],
  },
];
