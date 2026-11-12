// After `react-router build`:
// 1. turn the pre-rendered catch-all page into build/client/404.html, which Vercel serves
//    (with a 404 status) for any URL that has no file;
// 2. give every HTML page a Content-Security-Policy that only lets its own inline scripts run.
import { createHash } from "node:crypto";
import { copyFileSync, existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const out = "build/client";

const src = join(out, "404/index.html");
if (!existsSync(src)) {
  console.error(`postbuild: ${src} is missing (is "/404" still in react-router.config.ts prerender?)`);
  process.exit(1);
}
copyFileSync(src, join(out, "404.html"));
rmSync(join(out, "404"), { recursive: true });
console.log("postbuild: wrote build/client/404.html");

// React Router leaves an app shell for SPA hosting. Every URL here is a real file, so nothing uses it.
rmSync(join(out, "__spa-fallback.html"), { force: true });

// Content-Security-Policy.
// React and React Router hydrate through small inline scripts whose content changes with each page and
// build, so the policy lists the SHA-256 of each one: any other inline script (an injected one) is refused.
// It is written as a <meta> tag because the hashes are only known here; the directives a <meta> tag
// can't carry (frame-ancestors) are sent as a header from vercel.json.
// When the site starts calling a new third party, add its origin below (and name it in PolitiqueConfidentialite).
const BREVO = "https://sibforms.com https://*.sibforms.com"; // newsletter form on /inscriptions
const policy = (hashes) =>
  [
    "default-src 'self'",
    `script-src 'self' ${hashes.join(" ")} https://sibforms.com`,
    "style-src 'self' 'unsafe-inline'", // the pages use style="" attributes throughout
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    `connect-src 'self' ${BREVO}`,
    `form-action 'self' ${BREVO}`,
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "manifest-src 'self'",
    "worker-src 'self' blob:",
    "upgrade-insecure-requests",
  ].join("; ");

// Scripts that run: no type, or type="module". JSON-LD blocks are data and need no hash.
const INLINE_SCRIPT = /<script(?![^>]*\ssrc=)(?![^>]*\stype="(?!module")[^"]*")[^>]*>([\s\S]*?)<\/script>/g;

function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? htmlFiles(path) : entry.name.endsWith(".html") ? [path] : [];
  });
}

const pages = htmlFiles(out);
for (const file of pages) {
  const html = readFileSync(file, "utf8");
  const hashes = [...new Set([...html.matchAll(INLINE_SCRIPT)].map((m) => m[1]).filter(Boolean))].map(
    (code) => `'sha256-${createHash("sha256").update(code).digest("base64")}'`,
  );
  const meta = `<meta http-equiv="Content-Security-Policy" content="${policy(hashes)}"/>`;
  // Right after the charset declaration, so the policy is in place before anything else loads.
  const charset = /<meta charSet="[^"]*"\s*\/?>/i;
  if (!charset.test(html)) {
    console.error(`postbuild: no <meta charset> in ${file}, can't place the Content-Security-Policy`);
    process.exit(1);
  }
  writeFileSync(
    file,
    html.replace(charset, (tag) => tag + meta),
  );
}
console.log(`postbuild: added a Content-Security-Policy to ${pages.length} pages`);
