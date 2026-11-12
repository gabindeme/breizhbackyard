// Prints sponsor-kit/dossier.html to the PDF that the Sponsors page offers for download.
// Needs a Chrome or Chromium binary: set CHROME_PATH, or have google-chrome / chromium on the PATH,
// or a Playwright Chromium in ~/.cache/ms-playwright.
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, statSync } from "node:fs";
import { homedir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(import.meta.dirname, "..");
const source = join(root, "sponsor-kit", "dossier.html");
const output = join(root, "public", "dossier-partenariat-breizh-backyard-2027.pdf");

function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  for (const name of ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser"]) {
    try {
      return execFileSync("which", [name], { encoding: "utf8" }).trim();
    } catch {
      // not on the PATH, try the next one
    }
  }
  const cache = join(homedir(), ".cache", "ms-playwright");
  if (existsSync(cache)) {
    for (const dir of readdirSync(cache)
      .filter((d) => d.startsWith("chromium"))
      .sort()
      .reverse()) {
      for (const sub of readdirSync(join(cache, dir))) {
        for (const bin of ["chrome-headless-shell", "chrome"]) {
          const candidate = join(cache, dir, sub, bin);
          if (existsSync(candidate)) return candidate;
        }
      }
    }
  }
  throw new Error("No Chrome found. Set CHROME_PATH to a Chrome or Chromium binary.");
}

const chrome = findChrome();
execFileSync(
  chrome,
  [
    "--headless",
    "--no-sandbox",
    "--disable-gpu",
    // The page loads its fonts and images from ../public and ../node_modules.
    "--allow-file-access-from-files",
    "--run-all-compositor-stages-before-draw",
    "--virtual-time-budget=10000",
    "--no-pdf-header-footer",
    `--print-to-pdf=${output}`,
    pathToFileURL(source).href,
  ],
  { stdio: ["ignore", "ignore", "ignore"] },
);

const kb = Math.round(statSync(output).size / 1024);
console.log(`Wrote ${output.replace(root + "/", "")} (${kb} KB)`);
