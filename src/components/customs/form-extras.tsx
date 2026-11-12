import { AlertCircle } from "lucide-react";
import { Trans } from "react-i18next";
import { CONTACT_EMAIL } from "@/lib/submit-form";

/** Red asterisk after the label of a required field. */
export const RequiredMark = () => (
  <span className="bbu-required" aria-hidden="true">
    *
  </span>
);

/** Red message under a field that failed validation. Pair it with aria-invalid on the field. */
export const FieldError = ({ id, message }: { id: string; message?: string }) =>
  message ? (
    <p id={id} className="bbu-field-error" role="alert">
      {message}
    </p>
  ) : null;

/** Hidden field that only bots fill in. Kept off-screen rather than display:none, which some bots skip. */
export const Honeypot = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
    <label>
      Website
      <input type="text" name="website" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  </div>
);

/** Error shown when a form couldn't be sent, with the email address as a fallback. */
export const FormError = () => (
  <div
    role="alert"
    style={{
      display: "flex",
      gap: "0.75rem",
      alignItems: "flex-start",
      padding: "1rem 1.25rem",
      marginBottom: "1.25rem",
      borderRadius: "0.875rem",
      background: "rgba(229,85,51,0.07)",
      border: "1px solid rgba(229,85,51,0.3)",
      color: "#7a2a18",
      fontSize: "0.9rem",
      lineHeight: 1.6,
      textAlign: "left",
    }}
  >
    <AlertCircle size={20} style={{ flexShrink: 0, marginTop: "0.1rem" }} />
    <div>
      <strong style={{ display: "block" }}>
        <Trans i18nKey="forms.error_title" />
      </strong>
      <Trans
        i18nKey="forms.error_desc"
        values={{ email: CONTACT_EMAIL }}
        components={{ mail: <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "inherit", fontWeight: 600 }} /> }}
      />
    </div>
  </div>
);
