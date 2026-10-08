import type { Metadata } from "next";
import { Geist_Mono, Newsreader } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/Header";
import { Reveal } from "@/components/Reveal";
import { meta, siteUrl } from "@/content/site";
import "./globals.css";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: meta.home.title,
  description: meta.home.description,
  openGraph: { type: "website", siteName: meta.name },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistMono.variable} ${newsreader.variable}`}>
      <body className="flex min-h-screen flex-col">
        <noscript>
          {/* Without JS nothing would ever reveal, so show everything drawn. */}
          <style>{`.reveal{opacity:1;transform:none}.reveal .mark{background-size:100% 100%!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-10 focus:rounded-[6px] focus:bg-ink focus:px-3 focus:py-1 focus:text-white"
        >
          Skip to main content
        </a>
        <Header />
        {children}
        <Reveal />
        <Analytics />
      </body>
    </html>
  );
}
