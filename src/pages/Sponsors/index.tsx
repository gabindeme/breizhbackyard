import { motion } from "motion/react";
import { Mail, Download } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SEOHead } from "@/components/SEOHead";
import { createBreadcrumbSchema } from "@/lib/seoSchemas";

const PageHeader = ({ title, subtitle, description }: { title: string; subtitle?: string; description?: string }) => (
  <div className="page-header-inner" style={{ background: "linear-gradient(135deg, #277956 0%, #1a4d36 60%, #164030 100%)", paddingTop: "8rem", paddingBottom: "5rem", position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 80% 50%, rgba(245,201,44,0.08) 0%, transparent 60%)` }} />
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "60px", fill: "#EFEFEF" }}>
        <path d="M0,20 C360,60 720,0 1080,40 C1260,55 1380,25 1440,20 L1440,60 L0,60 Z" />
      </svg>
    </div>
    <div className="page-container" style={{ position: "relative", zIndex: 1 }}>
      {subtitle && <p className="section-subtitle" style={{ color: "#8CBE4F", marginBottom: "0.75rem" }}>{subtitle}</p>}
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ fontFamily: "'Hobo', sans-serif", fontSize: "clamp(2rem, 5vw, 4rem)", color: "#fff", marginBottom: description ? "1rem" : 0 }}>{title}</motion.h1>
      {description && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ color: "rgba(255,255,255,0.75)", maxWidth: "600px", fontSize: "1.05rem", lineHeight: 1.75 }}>{description}</motion.p>}
    </div>
  </div>
);

export const Sponsors = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({ nom: "", societe: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  const breadcrumbs = createBreadcrumbSchema([
    { name: "Accueil", path: "/" },
    { name: "Sponsors & Partenaires", path: "/sponsors" },
  ]);

  return (
    <div style={{ background: "#EFEFEF" }}>
      <SEOHead
        title="Partenaires & Sponsors | Breizh Backyard Ultra"
        description="Associez votre marque au Breizh Backyard Ultra : découvrez notre dossier partenaire et soutenez un événement d'ultra-endurance d'exception."
        canonicalPath="/sponsors"
        jsonLd={breadcrumbs}
      />
      <PageHeader
        subtitle={t("sponsors_page.header.subtitle")}
        title={t("sponsors_page.header.title")}
        description={t("sponsors_page.header.desc")}
      />

      {/* ============================================================
          DOSSIER & FORMULAIRE CONTACT SPONSORS
          ============================================================ */}
      <section className="section-light" style={{ paddingTop: "2rem", paddingBottom: "5rem" }}>
        {/* Card Dossier - Largeur standard du site */}
        <div className="page-container" style={{ marginBottom: "3rem" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              background: "#fff",
              borderRadius: "1rem",
              padding: "2.5rem 2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "2rem",
              boxShadow: "0 10px 40px rgba(39, 121, 86, 0.08)",
              border: "1px solid rgba(39, 121, 86, 0.15)",
              flexWrap: "wrap",
              position: "relative",
              overflow: "hidden"
            }}
          >
            <div style={{ position: "absolute", top: -40, right: -40, opacity: 0.04, color: "#277956", pointerEvents: "none" }}>
              <Download size={200} />
            </div>
            <div style={{ position: "relative", zIndex: 1, flex: 1, minWidth: "250px" }}>
              <h3 style={{ fontFamily: "'Hobo', sans-serif", fontSize: "1.5rem", color: "#1a2e22", marginBottom: "0.5rem" }}>
                {t("sponsors_page.dossier.title")}
              </h3>
              <p style={{ color: "#4a6b56", fontSize: "1rem", margin: 0, maxWidth: "600px", lineHeight: 1.6 }}>
                {t("sponsors_page.dossier.desc")}
              </p>
            </div>
            <a
              href="#"
              download
              className="bbu-btn"
              style={{
                background: "#277956",
                color: "#fff",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                textDecoration: "none",
                flexShrink: 0,
                position: "relative",
                zIndex: 1,
                padding: "0.85rem 1.5rem",
                borderRadius: "0.75rem",
              }}
            >
              <Download size={18} strokeWidth={2.5} />
              {t("sponsors_page.dossier.btn")}
            </a>
          </motion.div>
        </div>

        {/* Formulaire - Largeur réduite centrée */}
        <div className="page-container" style={{ maxWidth: "700px" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <p className="section-subtitle">{t("sponsors_page.contact.subtitle")}</p>
            <h2 className="section-title" style={{ marginTop: "0.5rem" }}>
              {t("sponsors_page.contact.title")}
            </h2>
          </div>

          {!submitted ? (
            <div style={{ background: "#fff", borderRadius: "1.5rem", padding: "2.5rem", border: "1px solid #D0D0D0", boxShadow: "0 4px 24px rgba(39,121,86,0.08)" }}>
              <form onSubmit={handleSubmit}>
                <div className="form-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                  <div>
                    <label className="bbu-label">{t("sponsors_page.contact.nom_label")}</label>
                    <input className="bbu-input" type="text" value={formData.nom} onChange={(e) => setFormData(p => ({ ...p, nom: e.target.value }))} placeholder={t("sponsors_page.contact.nom_ph")} />
                  </div>
                  <div>
                    <label className="bbu-label">{t("sponsors_page.contact.societe_label")}</label>
                    <input className="bbu-input" type="text" value={formData.societe} onChange={(e) => setFormData(p => ({ ...p, societe: e.target.value }))} placeholder={t("sponsors_page.contact.societe_ph")} />
                  </div>
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label className="bbu-label">{t("sponsors_page.contact.email_label")} <span style={{ color: "#c44" }}>*</span></label>
                  <input className="bbu-input" type="email" required value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} placeholder={t("sponsors_page.contact.email_ph")} />
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label className="bbu-label">{t("sponsors_page.contact.message_label")}</label>
                  <textarea
                    className="bbu-input"
                    rows={4}
                    value={formData.message}
                    onChange={(e: any) => setFormData(p => ({ ...p, message: e.target.value }))}
                    placeholder={t("sponsors_page.contact.message_ph")}
                    style={{ resize: "vertical" }}
                  />
                </div>
                <button type="submit" className="btn-primary" disabled={loading} style={{ width: "100%", justifyContent: "center" }}>
                  {loading ? t("sponsors_page.contact.btn_loading") : t("sponsors_page.contact.btn_submit")}
                </button>
              </form>
            </div>
          ) : (
            <div style={{ background: "#fff", borderRadius: "1.5rem", padding: "3rem", textAlign: "center", border: "1.5px solid rgba(39,121,86,0.25)" }}>
              <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(39,121,86,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                <Mail size={28} style={{ color: "#277956" }} />
              </div>
              <h3 style={{ fontFamily: "'Hobo', sans-serif", fontSize: "1.4rem", color: "#277956", marginBottom: "0.75rem" }}>{t("sponsors_page.contact.success_title")}</h3>
              <p style={{ color: "#4a6b56", lineHeight: 1.75 }}>{t("sponsors_page.contact.success_desc")}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
