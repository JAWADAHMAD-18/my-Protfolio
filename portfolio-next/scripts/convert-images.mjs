import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const MEDIA_DIR = path.join(PUBLIC_DIR, "media");

const imagesToConvert = [
  "portfolioTrip.png",
  "rolex.png",
  "aiagent.jpeg",
  "portfolioHisabKitab.png",
  "portfolioWhatsappBot.png",
  "biztrack.png",
  "myblog.png",
  "profile.png",
  "project1.jpg",
  "project2.jpg",
  "project3.jpg",
];

async function convert() {
  console.log("Converting images to WebP...");

  for (const filename of imagesToConvert) {
    const srcPath = path.join(PUBLIC_DIR, filename);
    if (!fs.existsSync(srcPath)) {
      console.warn(`File not found: ${filename}`);
      continue;
    }

    const baseName = path.parse(filename).name;
    const destPath = path.join(PUBLIC_DIR, `${baseName}.webp`);

    await sharp(srcPath)
      .webp({ quality: 85, effort: 6 })
      .toFile(destPath);

    const oldSize = fs.statSync(srcPath).size;
    const newSize = fs.statSync(destPath).size;
    const saving = (((oldSize - newSize) / oldSize) * 100).toFixed(1);
    console.log(`Converted ${filename} (${(oldSize / 1024).toFixed(0)}KB) -> ${baseName}.webp (${(newSize / 1024).toFixed(0)}KB, -${saving}%)`);
  }

  // Also create structured media folders in public/media/<slug>/
  const projectSlugs = [
    { slug: "tripfusion", src: "portfolioTrip.png" },
    { slug: "ahmed-ai-voice-receptionist", src: "aiagent.jpeg" },
    { slug: "hisab-kitab", src: "portfolioHisabKitab.png" },
    { slug: "whatsapp-auto-reply-assistant", src: "portfolioWhatsappBot.png" },
    { slug: "biztrack", src: "biztrack.png" },
    { slug: "student-guidance-portal", src: "project2.jpg" },
    { slug: "blogging-platform", src: "myblog.png" },
    { slug: "rolex-frontend", src: "rolex.png" },
    { slug: "bata-clone", src: "project1.jpg" },
  ];

  for (const item of projectSlugs) {
    const folder = path.join(MEDIA_DIR, item.slug);
    fs.mkdirSync(folder, { recursive: true });

    const srcPath = path.join(PUBLIC_DIR, item.src);
    if (fs.existsSync(srcPath)) {
      const destWebp = path.join(folder, "poster.webp");
      await sharp(srcPath)
        .resize({ width: 1280, withoutEnlargement: true })
        .webp({ quality: 85, effort: 6 })
        .toFile(destWebp);
      console.log(`Created ${path.relative(PUBLIC_DIR, destWebp)}`);
    }
  }

  // Create TripFusion browser & phone specific mockups in public/media/tripfusion/
  const tfSrc = path.join(PUBLIC_DIR, "portfolioTrip.png");
  if (fs.existsSync(tfSrc)) {
    await sharp(tfSrc)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(path.join(MEDIA_DIR, "tripfusion", "browser.webp"));

    await sharp(tfSrc)
      .resize({ width: 600, height: 1200, fit: "cover", position: "top" })
      .webp({ quality: 85 })
      .toFile(path.join(MEDIA_DIR, "tripfusion", "phone.webp"));
  }

  console.log("Image conversion complete.");
}

convert().catch(console.error);
