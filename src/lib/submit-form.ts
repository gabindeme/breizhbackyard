import i18n from "i18next";

export { CONTACT_EMAIL } from "@/lib/event";

export type FormType = "contact" | "benevole" | "sponsor";

/**
 * Sends a site form to the /api/contact Vercel Function.
 * Resolves to true only when the server confirms the email was sent.
 * `website` is the honeypot field: it must stay empty for real visitors.
 */
export async function submitForm(type: FormType, fields: Record<string, string>): Promise<boolean> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ type, lang: i18n.resolvedLanguage ?? i18n.language, ...fields }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
