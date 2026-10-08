// One-off: turns the originals in ./photos into the WebP/PNG assets the site uses.
// Run with `npm run images`. Originals are never copied into public/.
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";

const out = "public/img";
await mkdir(out, { recursive: true });

const save = async (pipeline, file) => {
  const info = await pipeline.webp({ quality: 82 }).toFile(`${out}/${file}`);
  console.log(file, `${info.width}x${info.height}`);
};

// Square crop centred on the face (about 49% across, 53% down the 800x800 original).
const face = () =>
  sharp("photos/me.jpeg").extract({ left: 70, top: 110, width: 640, height: 640 });
await save(face().resize(160, 160), "me-160.webp");
await save(face().resize(320, 320), "me-320.webp");

// .rotate() applies the EXIF orientation (the QR photo is stored sideways).
const fit = (src) => sharp(src).rotate().resize({ width: 800, withoutEnlargement: true });
await save(fit("photos/apron.jpeg"), "apron-800.webp");
await save(fit("photos/qr.jpeg"), "qr-800.webp");

// Browser-tab icons: a tight crop on the face (head and a sliver of shoulders, 50% of the width;
// 40% cut off the hair and chin).
const faceTight = () =>
  sharp("photos/me.jpeg").extract({ left: 190, top: 205, width: 400, height: 400 });

const circle = (size) =>
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}"/></svg>`);

// Resize first, then mask, so the circle edge is anti-aliased at the final size.
const round = (size, sharpen) => {
  let img = faceTight().resize(size, size);
  if (sharpen) img = img.sharpen({ sigma: 0.6 });
  return img
    .ensureAlpha()
    .composite([{ input: circle(size), blend: "dest-in" }])
    .png()
    .toBuffer();
};

// A 512px photo PNG is ~600 KB; a 256-colour palette keeps it small enough to fetch on every page.
await sharp(await round(512)).png({ palette: true, quality: 90, compressionLevel: 9 }).toFile("src/app/icon.png");
// iOS rounds the corners itself, so the touch icon is square and opaque.
await faceTight().resize(180, 180).flatten({ background: "#ffffff" }).png().toFile("src/app/apple-icon.png");

// ICO container holding PNG-encoded 32x32 and 16x16 versions of the round icon.
const sizes = [32, 16];
const pngs = await Promise.all(sizes.map((n) => round(n, true)));
const header = Buffer.alloc(6);
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(pngs.length, 4);
let offset = 6 + 16 * pngs.length;
const entries = pngs.map((png, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(sizes[i], 0); // width
  e.writeUInt8(sizes[i], 1); // height
  e.writeUInt16LE(1, 4); // colour planes
  e.writeUInt16LE(32, 6); // bits per pixel
  e.writeUInt32LE(png.length, 8);
  e.writeUInt32LE(offset, 12);
  offset += png.length;
  return e;
});
await writeFile("src/app/favicon.ico", Buffer.concat([header, ...entries, ...pngs]));
console.log("icon.png 512x512, apple-icon.png 180x180, favicon.ico 32+16");
