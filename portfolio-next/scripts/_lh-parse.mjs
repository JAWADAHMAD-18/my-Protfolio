import fs from "node:fs";

const html = fs.readFileSync(
  "d:/my-Protfolio/localhost_2026-11-09_14-03-41.report.html",
  "utf8"
);
const marker = "window.__LIGHTHOUSE_JSON__ = ";
const start = html.indexOf(marker);
if (start < 0) {
  console.log("marker not found");
  process.exit(1);
}
const jsonStart = start + marker.length;
let i = jsonStart;
let depth = 0;
let inStr = false;
let esc = false;
for (; i < html.length; i++) {
  const c = html[i];
  if (inStr) {
    if (esc) esc = false;
    else if (c === "\\") esc = true;
    else if (c === '"') inStr = false;
    continue;
  }
  if (c === '"') inStr = true;
  else if (c === "{") depth++;
  else if (c === "}") {
    depth--;
    if (depth === 0) {
      i++;
      break;
    }
  }
}
const j = JSON.parse(html.slice(jsonStart, i));
const cats = j.categories;
for (const k of Object.keys(cats)) {
  console.log(k, Math.round(cats[k].score * 100));
}
const ids = [
  "aria-prohibited-attr",
  "errors-in-console",
  "largest-contentful-paint",
  "total-blocking-time",
  "mainthread-work-breakdown",
  "unused-javascript",
  "render-blocking-resources",
  "bootup-time",
  "lcp-lazy-loaded",
  "prioritize-lcp-image",
  "unsized-images",
  "offscreen-images",
  "uses-responsive-images",
  "modern-image-formats",
  "font-display",
  "server-response-time",
  "interactive",
  "speed-index",
  "cumulative-layout-shift",
  "diagnostics",
  "network-rtt",
  "main-thread-tasks",
  "long-tasks",
  "third-party-summary",
  "dom-size",
  "image-delivery-insight",
  "lcp-discovery-insight",
  "legacy-javascript",
  "duplicated-javascript",
  "total-byte-weight",
];
for (const id of ids) {
  const a = j.audits[id];
  if (!a) continue;
  console.log("\n==", id, "score", a.score, a.displayValue || "", "==");
  if (a.details?.items) {
    const items = a.details.items.slice(0, 12).map((item) => {
      const copy = { ...item };
      if (copy.node) {
        copy.node = {
          snippet: copy.node.snippet,
          nodeLabel: copy.node.nodeLabel,
          selector: copy.node.selector,
          explanation: copy.node.explanation,
        };
      }
      return copy;
    });
    console.log(JSON.stringify(items, null, 2).slice(0, 6000));
  }
}

const failing = Object.values(j.audits).filter(
  (a) => a.score !== null && a.score < 1 && a.scoreDisplayMode !== "informative" && a.scoreDisplayMode !== "manual"
);
console.log("\n\nFAILING AUDITS:");
for (const a of failing) {
  console.log(`- ${a.id}: ${a.score} ${a.title} ${a.displayValue || ""}`);
}
