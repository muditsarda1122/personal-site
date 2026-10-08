import { meta } from "@/content/site";
import { renderOg } from "@/lib/og";

export const dynamic = "force-static";
export const alt = meta.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderOg({ heading: meta.name, headingSize: 132, sub: meta.home.description });
}
