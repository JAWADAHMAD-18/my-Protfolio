import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const profileDir = path.join(PUBLIC_DIR, "media", "profile");
fs.mkdirSync(profileDir, { recursive: true });

const heroJpg = path.join(profileDir, "jawad-hero.jpg");
const aboutJpg = path.join(profileDir, "jawad-about.jpg");
const fallback = path.join(PUBLIC_DIR, "profile.png");
const source = fs.existsSync(heroJpg)
  ? heroJpg
  : fs.existsSync(aboutJpg)
    ? aboutJpg
    : fallback;
if (!fs.existsSync(source)) {
  throw new Error("Missing profile photo (jawad-hero.jpg, jawad-about.jpg, or profile.png)");
}
console.log(`source ${path.relative(PUBLIC_DIR, source)}`);

const heroPath = path.join(profileDir, "jawad-hero.webp");
await sharp(source)
  .resize({ width: 800, withoutEnlargement: true })
  .webp({ quality: 82, effort: 6 })
  .toFile(heroPath);

const aboutPath = path.join(profileDir, "jawad-about.webp");
await sharp(source)
  .resize({ width: 600, withoutEnlargement: true })
  .webp({ quality: 78, effort: 6 })
  .toFile(aboutPath);

const ogPath = path.join(profileDir, "jawad-og.png");
await sharp(source)
  .resize({ width: 280, withoutEnlargement: true })
  .png({ compressionLevel: 9, palette: true })
  .toFile(ogPath);

for (const file of [heroPath, aboutPath, ogPath]) {
  const meta = await sharp(file).metadata();
  const size = fs.statSync(file).size;
  console.log(
    `${path.relative(PUBLIC_DIR, file)} ${meta.width}x${meta.height} ${(size / 1024).toFixed(1)}KB`
  );
}

const tfDir = path.join(PUBLIC_DIR, "media", "tripfusion");
const browserPng = path.join(PUBLIC_DIR, "media", "placeholder", "tripfusion-browser.png");
const phonePng = path.join(PUBLIC_DIR, "media", "placeholder", "tripfusion-phone.png");

if (fs.existsSync(browserPng)) {
  const dest = path.join(tfDir, "browser.webp");
  await sharp(browserPng)
    .resize({ width: 960, withoutEnlargement: true })
    .webp({ quality: 72, effort: 6 })
    .toFile(dest);
  const meta = await sharp(dest).metadata();
  console.log(
    `media/tripfusion/browser.webp ${meta.width}x${meta.height} ${(fs.statSync(dest).size / 1024).toFixed(1)}KB from placeholder png ${(fs.statSync(browserPng).size / 1024).toFixed(0)}KB`
  );
}

if (fs.existsSync(phonePng)) {
  const dest = path.join(tfDir, "phone.webp");
  await sharp(phonePng)
    .resize({ width: 480, withoutEnlargement: true })
    .webp({ quality: 72, effort: 6 })
    .toFile(dest);
  const meta = await sharp(dest).metadata();
  console.log(
    `media/tripfusion/phone.webp ${meta.width}x${meta.height} ${(fs.statSync(dest).size / 1024).toFixed(1)}KB from placeholder png ${(fs.statSync(phonePng).size / 1024).toFixed(0)}KB`
  );
}
