import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import type { Element, Root, RootContent } from "hast";

/** Site link style, new tab + hidden note for external links, lazy images. */
function decorate(node: Root | RootContent) {
  if (node.type === "element") {
    const el: Element = node;
    if (el.tagName === "a" && typeof el.properties.href === "string") {
      el.properties.className = ["text-link"];
      if (el.properties.href.startsWith("http")) {
        el.properties.target = "_blank";
        el.properties.rel = ["noopener", "noreferrer"];
        el.children.push({
          type: "element",
          tagName: "span",
          properties: { className: ["sr-only"] },
          children: [{ type: "text", value: " (opens in a new tab)" }],
        });
      }
    }
    if (el.tagName === "img") {
      el.properties.loading = "lazy";
      el.properties.decoding = "async";
    }
  }
  if ("children" in node) node.children.forEach(decorate);
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(() => decorate)
  .use(rehypeStringify);

export async function renderMarkdown(markdown: string) {
  return String(await processor.process(markdown));
}
