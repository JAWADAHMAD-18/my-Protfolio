/**
 * Build kb/kb.embeddings.json from the markdown knowledge base.
 *
 * 1. Read every kb/**\/*.md file.
 * 2. Split each file on "##" headings.
 * 3. Skip any chunk that still contains [FILL] or [CONFIRM].
 * 4. Embed the rest with Gemini and write the JSON file.
 *
 * Run from portfolio-next: npm run build:kb
 * Requires GEMINI_API_KEY and GEMINI_EMBED_MODEL in the environment or in .env.local.
 */
import fs from "node:fs";
import path from "node:path";
import { embedText } from "../lib/chat/embed";

const ROOT = process.cwd();
const KB_DIR = path.join(ROOT, "kb");
const OUT_FILE = path.join(KB_DIR, "kb.embeddings.json");
const MAX_WORDS = 300;
const PLACEHOLDER = /\[(FILL|CONFIRM)/;

interface DraftChunk {
  id: string;
  source: string;
  title: string;
  text: string;
}

function loadEnvFile(filePath: string, override: boolean) {
  if (!fs.existsSync(filePath)) return;

  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;

    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (override || process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

function loadEnv() {
  loadEnvFile(path.join(ROOT, ".env"), false);
  loadEnvFile(path.join(ROOT, ".env.local"), true);
}

function walkMarkdown(dir: string): string[] {
  const files: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkMarkdown(full));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(full);
    }
  }
  return files;
}

function parseFrontmatter(raw: string): { title: string; id: string; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  const meta: Record<string, string> = {};

  if (!match) {
    return { title: "", id: "", body: raw };
  }

  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (value.startsWith("[") && value.endsWith("]")) {
      value = value.slice(1, -1);
    }
    meta[key] = value;
  }

  return {
    title: meta.title ?? "",
    id: meta.id ?? "",
    body: raw.slice(match[0].length),
  };
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function splitByWordLimit(text: string, maxWords: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) return [text.trim()];

  const parts: string[] = [];
  for (let i = 0; i < words.length; i += maxWords) {
    parts.push(words.slice(i, i + maxWords).join(" "));
  }
  return parts;
}

function sourcePath(filePath: string): string {
  const rel = path.relative(KB_DIR, filePath).split(path.sep).join("/");
  return `kb/${rel}`;
}

function chunkFile(filePath: string): DraftChunk[] {
  const raw = fs.readFileSync(filePath, "utf8");
  const { title, id, body } = parseFrontmatter(raw);
  const docId = id || slugify(title) || slugify(path.basename(filePath, ".md"));
  const docTitle = title || docId;
  const source = sourcePath(filePath);
  const drafts: DraftChunk[] = [];

  // A leading "##" is a delimiter, so the first piece before it is empty.
  const sections = body.split(/^## /m);

  for (const section of sections) {
    const trimmed = section.trim();
    if (!trimmed) continue;

    const newline = trimmed.indexOf("\n");
    const heading = (newline === -1 ? trimmed : trimmed.slice(0, newline)).trim();
    const content = (newline === -1 ? "" : trimmed.slice(newline + 1)).trim();
    if (!heading || !content) continue;

    const fullText = `## ${heading}\n${content}`;
    if (PLACEHOLDER.test(fullText)) {
      console.warn(
        `[build-kb] Skipping "${heading}" in ${source}: still contains [FILL] or [CONFIRM]`
      );
      continue;
    }

    const parts = splitByWordLimit(fullText, MAX_WORDS);
    parts.forEach((part, index) => {
      const suffix = parts.length > 1 ? `-${index + 1}` : "";
      drafts.push({
        id: `${docId}#${slugify(heading)}${suffix}`,
        source,
        title: docTitle,
        text: part,
      });
    });
  }

  return drafts;
}

async function main() {
  loadEnv();

  if (!fs.existsSync(KB_DIR)) {
    console.error("[build-kb] kb/ directory not found. Run this from portfolio-next.");
    process.exit(1);
  }

  const files = walkMarkdown(KB_DIR).sort();
  const drafts = files.flatMap(chunkFile);

  console.log(`[build-kb] ${drafts.length} chunk(s) ready to embed from ${files.length} file(s).`);

  if (!process.env.GEMINI_API_KEY || !process.env.GEMINI_EMBED_MODEL) {
    console.error("[build-kb] Set GEMINI_API_KEY and GEMINI_EMBED_MODEL, then run again.");
    process.exit(1);
  }

  const embedded = [];
  for (const draft of drafts) {
    const embedding = await embedText(draft.text, "RETRIEVAL_DOCUMENT");
    embedded.push({ ...draft, embedding });
    console.log(`[build-kb] Embedded ${draft.id}`);
  }

  fs.writeFileSync(OUT_FILE, `${JSON.stringify(embedded, null, 2)}\n`);
  console.log(`[build-kb] Wrote ${embedded.length} chunk(s) to kb/kb.embeddings.json`);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "Unknown build error";
  console.error(`[build-kb] ${message}`);
  process.exit(1);
});
