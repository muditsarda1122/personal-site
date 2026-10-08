import type { Metadata } from "next";

const ogImage = { url: "/opengraph-image", width: 1200, height: 630, alt: "Mudit Sarda" };

/**
 * A page-level `openGraph` replaces the layout's, dropping the generated image,
 * so each page restates it here.
 */
export function pageMetadata(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, images: [ogImage] },
    twitter: { title, description, images: [ogImage] },
  };
}
