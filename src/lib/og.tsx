import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const font = (pkg: string, file: string) =>
  readFile(join(process.cwd(), "node_modules/@fontsource", pkg, "files", file));

type Props = { heading: string; headingSize: number; sub: string };

/** The shared 1200x630 Open Graph card: orange mark, serif heading, mono line underneath. */
export async function renderOg({ heading, headingSize, sub }: Props) {
  const [serif, mono] = await Promise.all([
    font("newsreader", "newsreader-latin-300-normal.woff"),
    font("geist-mono", "geist-mono-latin-400-normal.woff"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: "#fdfdfc",
        }}
      >
        <svg width="96" height="96" viewBox="0 0 32 32">
          <rect width="32" height="32" rx="7" fill="#eb4819" />
          <path
            d="M16 9.5v13M10.37 12.75l11.26 6.5M10.37 19.25l11.26-6.5"
            fill="none"
            stroke="#fff"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontFamily: "Newsreader",
            fontSize: headingSize,
            lineHeight: 1.05,
            letterSpacing: -4,
            color: "#1c1b1b",
          }}
        >
          {heading}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            maxWidth: 900,
            fontFamily: "Geist Mono",
            fontSize: 30,
            lineHeight: 1.45,
            color: "#5a5955",
          }}
        >
          {sub}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Newsreader", data: serif, weight: 300, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
