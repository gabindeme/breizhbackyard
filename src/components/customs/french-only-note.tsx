import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

/** Shown on the legal pages when the site is not in French: their text is only available (and binding) in French. */
export const FrenchOnlyNote = () => {
  const { t, i18n } = useTranslation();
  if ((i18n.resolvedLanguage ?? "fr") === "fr") return null;
  return (
    <div
      role="note"
      style={{
        display: "flex",
        gap: "0.75rem",
        alignItems: "flex-start",
        padding: "1rem 1.25rem",
        marginBottom: "2rem",
        borderRadius: "0.875rem",
        background: "rgba(245, 201, 44, 0.12)",
        border: "1px solid rgba(245, 201, 44, 0.35)",
        color: "#1a2e22",
        fontSize: "0.92rem",
        lineHeight: 1.6,
      }}
    >
      <Languages size={20} style={{ flexShrink: 0, marginTop: "0.1rem", color: "#277956" }} />
      <span>{t("legal.french_only")}</span>
    </div>
  );
};
