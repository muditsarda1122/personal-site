import { notFound } from "next/navigation";
import { getNativePosts, postParams } from "@/lib/writing";
import { renderOg } from "@/lib/og";

export const dynamic = "force-static";
export const dynamicParams = false;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return postParams();
}

export default async function PostOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getNativePosts().find((p) => p.slug === slug);
  if (!post) notFound();
  return renderOg({
    heading: post.title,
    headingSize: post.title.length > 40 ? 72 : 92,
    sub: post.summary,
  });
}
