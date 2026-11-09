import fs from "node:fs";

const html = fs.readFileSync(
  "d:/my-Protfolio/localhost_2026-11-09_14-03-41.report.html",
  "utf8"
);
const marker = "window.__LIGHTHOUSE_JSON__ = ";
const start = html.indexOf(marker) + marker.length;
let i = start;
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
const j = JSON.parse(html.slice(start, i));
for (const k of Object.keys(j.categories)) {
  console.log(k, Math.round(j.categories[k].score * 100));
}
for (const id of [
  "aria-prohibited-attr",
  "errors-in-console",
  "aria-allowed-attr",
  "button-name",
  "image-alt",
]) {
  const a = j.audits[id];
  console.log("\n====", id, "score", a?.score, "====");
  const items = a?.details?.items || [];
  console.log("items", items.length);
  console.log(JSON.stringify(items, null, 2).slice(0, 9000));
}
const lcp = j.audits["largest-contentful-paint-element"];
console.log("\nLCP element");
console.log(JSON.stringify(lcp?.details?.items?.[0] ?? null, null, 2).slice(0, 2000));
console.log("TBT", j.audits["total-blocking-time"]?.displayValue);
console.log("LCP", j.audits["largest-contentful-paint"]?.displayValue);
const main = j.audits["mainthread-work-breakdown"];
console.log("\nMAIN THREAD");
console.log(JSON.stringify(main?.details?.items ?? null, null, 2).slice(0, 2500));
