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
for (const id of ["label-content-name-mismatch", "forced-reflow-insight", "largest-contentful-paint-element", "network-dependency-tree-insight"]) {
  const a = j.audits[id];
  console.log("\n====", id, a?.score, "====");
  console.log(JSON.stringify(a?.details?.items?.slice(0, 6) ?? a?.details, null, 2).slice(0, 5000));
}
const aria = j.audits["aria-prohibited-attr"];
console.log("aria items", aria.details.items.length);
