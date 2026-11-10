// Reports translation keys that exist in one locale file but not in another.
// Exits with code 1 on any mismatch.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "locales");
const LOCALES = ["fr", "en", "br"];

function flatten(obj, prefix = "", out = new Set()) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) flatten(v, key, out);
    else out.add(key);
  }
  return out;
}

const keys = Object.fromEntries(LOCALES.map((l) => [l, flatten(JSON.parse(readFileSync(join(dir, `${l}.json`), "utf8")))]));
const all = new Set(LOCALES.flatMap((l) => [...keys[l]]));

let problems = 0;
for (const key of [...all].sort()) {
  const missing = LOCALES.filter((l) => !keys[l].has(key));
  if (missing.length) {
    problems++;
    console.log(`${key}  — missing in: ${missing.join(", ")}`);
  }
}

if (problems) {
  console.error(`\n${problems} key(s) out of sync across ${LOCALES.join("/")}.`);
  process.exit(1);
}
console.log(`Locales in sync (${all.size} keys).`);
