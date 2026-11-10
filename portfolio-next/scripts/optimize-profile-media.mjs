import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const profileDir = path.join(PUBLIC_DIR, "media", "profile");
fs.mkdirSync(profileDir, { recursive: true });

function findPortraitSource(name) {
  for (const extension of [".jpg", ".jpeg", ".png"]) {
    const source = path.join(profileDir, `${name}${extension}`);
    if (fs.existsSync(source)) return source;
  }
  return null;
}

const heroJpg = path.join(profileDir, "jawad-hero.jpg");
const aboutJpg = path.join(profileDir, "jawad-about.jpg");
const heroSource = findPortraitSource("jawad-hero");
const aboutSource = findPortraitSource("jawad-about");
const fallback = path.join(PUBLIC_DIR, "profile.png");
const ogSource = fs.existsSync(heroJpg)
  ? heroJpg
  : fs.existsSync(aboutJpg)
    ? aboutJpg
    : fallback;
if (!fs.existsSync(ogSource)) {
  throw new Error("Missing profile photo (jawad-hero.jpg, jawad-about.jpg, or profile.png)");
}

async function writePortrait(source, output, width) {
  if (!source || !fs.existsSync(source)) {
    const name = path.basename(output, ".webp");
    console.warn(
      `Missing ${name} source (.jpg, .jpeg, or .png); provide a high-resolution JPEG or PNG to generate ${path.basename(output)}. No fallback upscaling was done.`
    );
    return;
  }

  console.log(`${path.basename(output, ".webp")} source: ${path.basename(source)}`);
  const sourceMetadata = await sharp(source).metadata();
  await sharp(source)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(output);

  const outputMetadata = await sharp(output).metadata();
  const size = fs.statSync(output).size;
  console.log(
    `${path.relative(PUBLIC_DIR, source)} ${sourceMetadata.width}x${sourceMetadata.height} -> ${path.relative(PUBLIC_DIR, output)} ${outputMetadata.width}x${outputMetadata.height} ${(size / 1024).toFixed(1)}KB`
  );
}

const heroPath = path.join(profileDir, "jawad-hero.webp");
const aboutPath = path.join(profileDir, "jawad-about.webp");
await writePortrait(heroSource, heroPath, 960);
await writePortrait(aboutSource, aboutPath, 720);

const ogPath = path.join(profileDir, "jawad-og.png");
await sharp(ogSource)
  .resize({ width: 280, withoutEnlargement: true })
  .png({ compressionLevel: 9, palette: true })
  .toFile(ogPath);
console.log(`Open Graph portrait source: ${path.relative(PUBLIC_DIR, ogSource)}`);

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
