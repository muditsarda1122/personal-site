// One-off: turns the originals in ./photos into the WebP/PNG assets the site uses.
// Run with `npm run images`. Originals are never copied into public/.
import sharp from "sharp";
import { mkdir, readFile } from "node:fs/promises";

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

// Apple touch icon: the favicon mark, full-bleed (iOS applies its own rounded mask).
const icon = (await readFile("src/app/icon.svg", "utf8")).replace('rx="7"', 'rx="0"');
await sharp(Buffer.from(icon), { density: 450 }).resize(180, 180).png().toFile("src/app/apple-icon.png");
console.log("apple-icon.png 180x180");
