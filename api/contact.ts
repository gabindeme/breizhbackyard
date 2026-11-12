// Vercel Function: POST /api/contact
// Receives the Contact, Bénévoles and Sponsors forms, emails the organisers through Brevo,
// then sends the visitor a short confirmation in their language.
// Needs the BREVO_API_KEY environment variable (set in the Vercel project settings).

import fr from "../src/locales/fr.json" with { type: "json" };
import en from "../src/locales/en.json" with { type: "json" };
import br from "../src/locales/br.json" with { type: "json" };

const ORGANISER_EMAIL = process.env.CONTACT_TO ?? "contact@breizhbackyard.com";
const SENDER_EMAIL = process.env.SENDER_EMAIL ?? "contact@breizhbackyard.com";
const SITE_URL = "https://breizhbackyard.com";

const LOCALES = { fr, en, br };
type Lang = keyof typeof LOCALES;
type FormType = "contact" | "benevole" | "sponsor";

const TYPE_LABEL: Record<FormType, string> = { contact: "Contact", benevole: "Bénévole", sponsor: "Partenaire" };

// Maximum length of each accepted field. Anything else in the body is ignored.
const MAX: Record<string, number> = { nom: 100, email: 254, sujet: 200, societe: 150, dispo: 300, message: 5000 };
const REQUIRED: Record<FormType, string[]> = {
  contact: ["nom", "email", "message"],
  benevole: ["nom", "email"],
  sponsor: ["email"],
};
const FIELD_LABEL: Record<string, string> = {
  nom: "Nom",
  email: "Email",
  sujet: "Sujet",
  societe: "Société",
  dispo: "Disponibilités",
  message: "Message",
};

// One plain address only: no separators, quotes or brackets that a mail server could read as a second recipient.
const EMAIL_RE = /^[^\s@,;:<>()[\]"'\\]+@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/i;

// The largest valid body is about 6 kB of text (see MAX below); 4 bytes per character at worst.
const MAX_BODY_BYTES = 32 * 1024;

// Best-effort rate limits, per server instance (an instance can be recycled at any time, so the
// real protection against floods is a rate-limit rule on /api/contact in the Vercel Firewall):
// at most 5 submissions per IP and 2 per email address every 10 minutes.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_IP = 5;
const MAX_PER_ADDRESS = 2;
const hits = new Map<string, number[]>();

function rateLimited(key: string, max: number): boolean {
  const now = Date.now();
  if (hits.size > 5000) {
    // Drop expired entries first; only forget everything if the map is still full.
    for (const [k, times] of hits) if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    if (hits.size > 5000) hits.clear();
  }
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent.slice(-(max + 1)));
  return recent.length > max;
}

const json = (status: number, body: object) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", "x-content-type-options": "nosniff" },
  });

// Browsers always send Origin on a cross-site POST, so this stops another website from submitting
// the form through a visitor's browser. Comparing with the requested host also covers preview deployments.
function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

// Removes control and invisible formatting characters (kept: tab and line breaks).
const clean = (s: string) =>
  // eslint-disable-next-line no-control-regex
  s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F\u200B-\u200F\u202A-\u202E\u2060-\u2069\uFEFF]/g, "");

// A name that carries a link or an address is not repeated in the confirmation email:
// that email goes to whatever address was typed, and must not deliver someone else's advert.
const looksLikeLink = (s: string) => /[/\\@<>]|www\.|\.[a-z]{2,}(\s|$)/i.test(s);

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

// Keeps header-like values (names, subjects) on a single line.
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

async function sendEmail(apiKey: string, payload: object): Promise<void> {
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Brevo ${res.status}: ${await res.text()}`);
}

// Shared email layout. Images are hosted on the site (PNG, since Outlook can't show WebP);
// every email also reads fine with images blocked (alt text, real text for everything important).
const FONT = "font-family:helvetica,arial,sans-serif";
const GREEN = "#277956";
const SOCIALS = [
  ["instagram", "Instagram", "https://www.instagram.com/breizhbackyard/"],
  ["tiktok", "TikTok", "https://www.tiktok.com/@breizhbackyard"],
  ["youtube", "YouTube", "https://www.youtube.com/@breizhbackyard"],
  ["facebook", "Facebook", "https://www.facebook.com/people/BreizhBackyard/61588328941008/"],
] as const;

function layout(lang: Lang, title: string, content: string, footer: string): string {
  const e = LOCALES[lang].emails;
  const icons = SOCIALS.map(
    ([id, label, url]) =>
      `<td style="padding:0 8px"><a href="${url}" target="_blank"><img src="${SITE_URL}/email/${id}.png" width="32" height="32" alt="${label}" style="display:block;border:0;width:32px;height:32px;${FONT};font-size:11px;color:#ffffff"></a></td>`,
  ).join("");
  return `<!DOCTYPE html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;padding:0;background-color:#EFEFEF">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#EFEFEF" style="background-color:#EFEFEF"><tr><td align="center" style="padding:32px 12px">
<table role="presentation" width="560" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:560px;background-color:#ffffff;border-radius:12px;overflow:hidden">
<tr><td bgcolor="${GREEN}" style="background-color:${GREEN};padding:0"><a href="${SITE_URL}" target="_blank" style="display:block;text-decoration:none"><img src="${SITE_URL}/email/header.png" width="560" alt="Breizh Backyard" style="display:block;width:100%;max-width:560px;height:auto;border:0;${FONT};font-size:24px;font-weight:bold;color:#ffffff;text-align:center;line-height:80px"></a></td></tr>
<tr><td style="padding:40px 40px 32px">${content}</td></tr>
<tr><td bgcolor="${GREEN}" align="center" style="background-color:${GREEN};padding:28px 24px">
<p style="margin:0 0 14px;${FONT};font-size:13px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#F5C92C">${escapeHtml(e.follow)}</p>
<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center"><tr>${icons}</tr></table>
<p style="margin:20px 0 0;${FONT};font-size:12px;line-height:1.6;color:#d6e6dc">${footer}</p>
</td></tr></table></td></tr></table></body></html>`;
}

const para = (html: string, style = "") =>
  `<p style="margin:0 0 16px;${FONT};font-size:15px;line-height:1.7;color:#1a2e22;${style}">${html}</p>`;

const divider = `<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="48" style="margin:0 0 28px"><tr><td height="3" bgcolor="#F5C92C" style="background-color:#F5C92C;font-size:0;line-height:0">&nbsp;</td></tr></table>`;

function organiserEmail(type: FormType, fields: Record<string, string>, lang: Lang) {
  const who = oneLine(fields.nom || fields.email);
  const extra = type === "contact" ? fields.sujet : type === "sponsor" ? fields.societe : "";
  const subject = `[${TYPE_LABEL[type]}] ${extra ? `${oneLine(extra)} | ` : ""}${who}`;

  const rows = Object.keys(FIELD_LABEL)
    .filter((k) => fields[k])
    .map((k) => [FIELD_LABEL[k], fields[k]] as const);
  rows.push(["Langue du site", lang.toUpperCase()]);

  const table = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:12px 0;border-bottom:1px solid #EFEFEF"><p style="margin:0 0 4px;${FONT};font-size:11px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:${GREEN}">${label}</p><p style="margin:0;${FONT};font-size:15px;line-height:1.6;color:#1a2e22;white-space:pre-wrap">${escapeHtml(value)}</p></td></tr>`,
    )
    .join("");
  const content = `<p style="margin:0 0 8px;${FONT};font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#8a9e90">Formulaire ${TYPE_LABEL[type]}</p>
<p style="margin:0 0 20px;${FONT};font-size:22px;font-weight:bold;line-height:1.3;color:#1a2e22">${escapeHtml(who)}</p>
${divider}
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">${table}</table>
${para("Répondez directement à cet email pour écrire à la personne.", "margin:24px 0 0;font-size:13px;color:#4a6b56")}`;
  const html = layout("fr", subject, content, "Message envoyé depuis le site breizhbackyard.com");
  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  return {
    sender: { name: "Site Breizh Backyard", email: SENDER_EMAIL },
    to: [{ email: ORGANISER_EMAIL, name: "Breizh Backyard" }],
    replyTo: { email: fields.email, ...(fields.nom ? { name: oneLine(fields.nom) } : {}) },
    subject,
    htmlContent: html,
    textContent: text,
    tags: ["site-form", type],
  };
}

// The confirmation never repeats what the visitor typed (apart from their name),
// so the form can't be used to send arbitrary content to someone else's address.
function confirmationEmail(type: FormType, fields: Record<string, string>, lang: Lang) {
  const e = LOCALES[lang].emails;
  const rawName = oneLine(fields.nom ?? "").slice(0, 60);
  const name = looksLikeLink(rawName) ? "" : rawName;
  const greeting = name ? e.greeting.replace("{{nom}}", name) : e.greeting_anonymous;
  const subject = { contact: e.subject_contact, benevole: e.subject_benevole, sponsor: e.subject_sponsor }[type];
  const title = { contact: e.title_contact, benevole: e.title_benevole, sponsor: e.title_sponsor }[type];
  const body = { contact: e.body_contact, benevole: e.body_benevole, sponsor: e.body_sponsor }[type];

  const content = `<p style="margin:0 0 20px;${FONT};font-size:24px;font-weight:bold;line-height:1.3;color:#1a2e22">${escapeHtml(title)}</p>
${divider}
${para(escapeHtml(greeting))}
${para(escapeHtml(body))}
${para(escapeHtml(e.reply_hint))}
${para(`${escapeHtml(e.signoff)}<br><strong style="color:${GREEN}">${escapeHtml(e.team)}</strong>`, "margin-bottom:32px")}
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#EFEFEF" style="background-color:#EFEFEF;border-radius:10px"><tr><td align="center" style="padding:24px 20px">
<p style="margin:0 0 16px;${FONT};font-size:14px;font-weight:bold;line-height:1.5;color:#1a2e22">${escapeHtml(e.event)}</p>
<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center"><tr><td bgcolor="${GREEN}" style="background-color:${GREEN};border-radius:8px"><a href="${SITE_URL}" target="_blank" style="display:inline-block;padding:14px 32px;${FONT};font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:8px">${escapeHtml(e.cta)}</a></td></tr></table>
</td></tr></table>`;
  const footer = `${escapeHtml(e.footer)}<br><a href="${SITE_URL}" style="color:#ffffff">breizhbackyard.com</a>`;
  const html = layout(lang, subject, content, footer);
  const text = `${greeting}\n\n${body}\n\n${e.reply_hint}\n\n${e.signoff}\n${e.team}\n\n${e.event}\n${e.cta} : ${SITE_URL}\n\n--\n${e.footer}`;

  return {
    sender: { name: "Breizh Backyard", email: SENDER_EMAIL },
    to: [{ email: fields.email, ...(name ? { name } : {}) }],
    replyTo: { email: ORGANISER_EMAIL, name: "Breizh Backyard" },
    subject,
    htmlContent: html,
    textContent: text,
    tags: ["site-form-confirmation", type],
  };
}

export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("BREVO_API_KEY is not set");
    return json(500, { ok: false, error: "server_config" });
  }

  if (!sameOrigin(request)) return json(403, { ok: false, error: "forbidden" });
  if (!(request.headers.get("content-type") ?? "").toLowerCase().startsWith("application/json")) {
    return json(415, { ok: false, error: "unsupported_media_type" });
  }
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) return json(413, { ok: false, error: "too_large" });

  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return json(413, { ok: false, error: "too_large" });
    body = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return json(400, { ok: false, error: "invalid_json" });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) return json(400, { ok: false, error: "invalid_json" });

  // Honeypot: real visitors never see this field. Pretend it worked so bots don't adapt.
  if (typeof body.website === "string" && body.website.trim() !== "") return json(200, { ok: true });

  // Vercel sets both headers itself, so a client can't choose its own value.
  const ip = request.headers.get("x-real-ip") || (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim();
  if (rateLimited(`ip:${ip || "unknown"}`, MAX_PER_IP)) return json(429, { ok: false, error: "rate_limited" });

  // Object.hasOwn, not `in`: "constructor" or "__proto__" must not pass as a form type or a language.
  if (typeof body.type !== "string" || !Object.hasOwn(REQUIRED, body.type)) return json(400, { ok: false, error: "invalid_type" });
  const type = body.type as FormType;
  const lang: Lang = typeof body.lang === "string" && Object.hasOwn(LOCALES, body.lang) ? (body.lang as Lang) : "fr";

  const fields: Record<string, string> = {};
  for (const [key, max] of Object.entries(MAX)) {
    const value = body[key];
    if (value === undefined || value === null || value === "") continue;
    if (typeof value !== "string") return json(400, { ok: false, error: "invalid_field", field: key });
    const trimmed = clean(value).trim();
    if (trimmed.length > max) return json(400, { ok: false, error: "too_long", field: key });
    if (trimmed) fields[key] = trimmed;
  }
  for (const key of REQUIRED[type]) {
    if (!fields[key]) return json(400, { ok: false, error: "missing_field", field: key });
  }
  if (!EMAIL_RE.test(fields.email)) return json(400, { ok: false, error: "invalid_email", field: "email" });
  // Limits how many confirmation emails one address can be sent, whoever is asking.
  if (rateLimited(`to:${fields.email.toLowerCase()}`, MAX_PER_ADDRESS)) return json(429, { ok: false, error: "rate_limited" });

  try {
    await sendEmail(apiKey, organiserEmail(type, fields, lang));
  } catch (err) {
    console.error("Organiser email failed:", err);
    return json(502, { ok: false, error: "send_failed" });
  }

  // The organisers have the message at this point, so a failed confirmation is logged, not reported.
  try {
    await sendEmail(apiKey, confirmationEmail(type, fields, lang));
  } catch (err) {
    console.error("Confirmation email failed:", err);
  }

  return json(200, { ok: true });
}
