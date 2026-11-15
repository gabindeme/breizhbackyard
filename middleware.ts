// Vercel Routing Middleware: runs on Vercel before every request (pages, files and /api), not in `pnpm dev`.
// Everything that isn't the live site (the dev site on dev.breizhbackyard.com, preview deployments)
// asks for a shared password and is never indexed. The live site passes straight through.
// Needs the DEV_SITE_PASSWORD environment variable in Vercel (Preview environment). Without it,
// the non-production deployments stay closed rather than open.

import { next } from "@vercel/functions";

const PRODUCTION_HOSTS = new Set(["breizhbackyard.com", "www.breizhbackyard.com"]);

// The images of the form emails: mail clients (Gmail, Outlook) fetch them without a password.
// They hold nothing private (the logo banner and four social icons).
const PUBLIC_PATH = /^\/email\/[a-z0-9-]+\.png$/;

const NO_INDEX = { "X-Robots-Tag": "noindex, nofollow" };

function isProduction(request: Request): boolean {
  if (process.env.VERCEL_ENV === "production") return true;
  // Safety net so the live site can never end up behind the password if VERCEL_ENV is missing.
  // The host comes from the URL Vercel routed (not from a header a client could add): a request
  // for the live host always reaches the live deployment.
  return PRODUCTION_HOSTS.has(new URL(request.url).hostname.toLowerCase());
}

// Compares every character whatever the result, so the time taken says nothing about the password.
function sameText(a: string, b: string): boolean {
  let diff = a.length ^ b.length;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i % (b.length || 1));
  return diff === 0;
}

// Password from an "Authorization: Basic base64(user:password)" header. The user name is ignored.
function sentPassword(request: Request): string | null {
  const [scheme, encoded] = (request.headers.get("authorization") ?? "").split(" ");
  if (scheme?.toLowerCase() !== "basic" || !encoded) return null;
  try {
    const decoded = new TextDecoder().decode(Uint8Array.from(atob(encoded), (c) => c.charCodeAt(0)));
    const colon = decoded.indexOf(":");
    return colon === -1 ? null : decoded.slice(colon + 1);
  } catch {
    return null;
  }
}

const refuse = (status: number, message: string, headers: Record<string, string> = {}) =>
  new Response(message, {
    status,
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store", ...NO_INDEX, ...headers },
  });

export default function middleware(request: Request): Response {
  if (isProduction(request)) return next();

  const { pathname } = new URL(request.url);
  if (PUBLIC_PATH.test(pathname) && (request.method === "GET" || request.method === "HEAD")) return next({ headers: NO_INDEX });

  const password = process.env.DEV_SITE_PASSWORD;
  if (!password) return refuse(503, "Site de test non configuré (DEV_SITE_PASSWORD manquant).");

  const sent = sentPassword(request);
  if (sent !== null && sameText(sent, password)) return next({ headers: NO_INDEX });

  return refuse(401, "Site de test de la Breizh Backyard : accès réservé à l'équipe d'organisation.", {
    "www-authenticate": 'Basic realm="Breizh Backyard (site de test)", charset="UTF-8"',
  });
}
