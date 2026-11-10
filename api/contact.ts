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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort rate limit, per server instance: at most 5 submissions per IP every 10 minutes.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const json = (status: number, body: object) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

// Keeps header-like values (names, subjects) on a single line.
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

async function sendEmail(apiKey: string, payload: object): Promise<void> {
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Brevo ${res.status}: ${await res.text()}`);
}

function organiserEmail(type: FormType, fields: Record<string, string>, lang: Lang) {
  const who = oneLine(fields.nom || fields.email);
  const extra = type === "contact" ? fields.sujet : type === "sponsor" ? fields.societe : "";
  const subject = `[${TYPE_LABEL[type]}] ${extra ? `${oneLine(extra)} | ` : ""}${who}`;

  const rows = Object.keys(FIELD_LABEL)
    .filter((k) => fields[k])
    .map((k) => [FIELD_LABEL[k], fields[k]] as const);
  rows.push(["Langue du site", lang.toUpperCase()]);

  const html = `<div style="font-family:helvetica,arial,sans-serif;font-size:15px;color:#1a2e22">
<p>Nouveau message depuis le formulaire <strong>${TYPE_LABEL[type]}</strong> du site.</p>
<table cellpadding="6" style="border-collapse:collapse">${rows
    .map(
      ([label, value]) =>
        `<tr><td style="vertical-align:top;font-weight:bold;white-space:nowrap">${label}</td><td style="white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
    )
    .join("")}</table>
<p style="color:#4a6b56">Répondez directement à cet email pour écrire à la personne.</p></div>`;
  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  return {
    sender: { name: "Site Breizh Backyard Ultra", email: SENDER_EMAIL },
    to: [{ email: ORGANISER_EMAIL, name: "Breizh Backyard Ultra" }],
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
  const name = oneLine(fields.nom ?? "").slice(0, 60);
  const greeting = name ? e.greeting.replace("{{nom}}", name) : e.greeting_anonymous;
  const subject = { contact: e.subject_contact, benevole: e.subject_benevole, sponsor: e.subject_sponsor }[type];
  const body = { contact: e.body_contact, benevole: e.body_benevole, sponsor: e.body_sponsor }[type];

  const p = (content: string, style = "") =>
    `<p style="margin:0 0 16px;font-family:helvetica,arial,sans-serif;font-size:15px;line-height:1.6;color:#1a2e22;${style}">${content}</p>`;

  const html = `<!DOCTYPE html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:0;background-color:#EFEFEF">
<table width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#EFEFEF" style="background-color:#EFEFEF"><tr><td align="center" style="padding:32px 16px">
<table width="560" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:560px;background-color:#ffffff;border:1px solid #D0D0D0;border-radius:12px">
<tr><td bgcolor="#277956" style="background-color:#277956;padding:20px 32px;border-radius:12px 12px 0 0;font-family:helvetica,arial,sans-serif;font-size:20px;font-weight:bold;color:#ffffff">Breizh Backyard Ultra</td></tr>
<tr><td style="padding:32px">
${p(escapeHtml(greeting))}
${p(escapeHtml(body))}
${p(escapeHtml(e.reply_hint))}
${p(`${escapeHtml(e.signoff)}<br>${escapeHtml(e.team)}`, "margin-bottom:0")}
</td></tr>
<tr><td style="padding:16px 32px;border-top:1px solid #EFEFEF;font-family:helvetica,arial,sans-serif;font-size:12px;line-height:1.5;color:#6b7f72">
${escapeHtml(e.footer)}<br><a href="${SITE_URL}" style="color:#277956">breizhbackyard.com</a>
</td></tr></table></td></tr></table></body></html>`;
  const text = `${greeting}\n\n${body}\n\n${e.reply_hint}\n\n${e.signoff}\n${e.team}\n\n--\n${e.footer}\n${SITE_URL}`;

  return {
    sender: { name: "Breizh Backyard Ultra", email: SENDER_EMAIL },
    to: [{ email: fields.email, ...(name ? { name } : {}) }],
    replyTo: { email: ORGANISER_EMAIL, name: "Breizh Backyard Ultra" },
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

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json(400, { ok: false, error: "invalid_json" });
  }
  if (!body || typeof body !== "object") return json(400, { ok: false, error: "invalid_json" });

  // Honeypot: real visitors never see this field. Pretend it worked so bots don't adapt.
  if (typeof body.website === "string" && body.website.trim() !== "") return json(200, { ok: true });

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return json(429, { ok: false, error: "rate_limited" });

  const type = body.type as FormType;
  if (!(type in REQUIRED)) return json(400, { ok: false, error: "invalid_type" });
  const lang: Lang = typeof body.lang === "string" && body.lang in LOCALES ? (body.lang as Lang) : "fr";

  const fields: Record<string, string> = {};
  for (const [key, max] of Object.entries(MAX)) {
    const value = body[key];
    if (value === undefined || value === null || value === "") continue;
    if (typeof value !== "string") return json(400, { ok: false, error: "invalid_field", field: key });
    const trimmed = value.trim();
    if (trimmed.length > max) return json(400, { ok: false, error: "too_long", field: key });
    if (trimmed) fields[key] = trimmed;
  }
  for (const key of REQUIRED[type]) {
    if (!fields[key]) return json(400, { ok: false, error: "missing_field", field: key });
  }
  if (!EMAIL_RE.test(fields.email)) return json(400, { ok: false, error: "invalid_email", field: "email" });

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
