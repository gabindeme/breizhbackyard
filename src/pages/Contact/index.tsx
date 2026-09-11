import { motion } from "motion/react";
import { useState } from "react";
import { Mail, Send, CheckCircle } from "lucide-react";
import { InstagramIcon, FacebookIcon, YoutubeIcon, TiktokIcon } from "@/components/customs/icons";
import { useTranslation } from "react-i18next";

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

export const Contact = () => {
  const { t } = useTranslation();

  const subjects = [
    t("contact_page.subjects.s1"),
    t("contact_page.subjects.s2"),
    t("contact_page.subjects.s3"),
    t("contact_page.subjects.s4"),
    t("contact_page.subjects.s5"),
    t("contact_page.subjects.s6"),
  ];

  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    sujet: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nom.trim()) newErrors.nom = t("contact_page.errors.nom_req");
    if (!formData.email.trim()) newErrors.email = t("contact_page.errors.email_req");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = t("contact_page.errors.email_inv");
    if (!formData.message.trim()) newErrors.message = t("contact_page.errors.msg_req");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
  };

  return (
    <div style={{ background: "#EFEFEF" }}>
      <PageHeader
        subtitle={t("contact_page.header.subtitle")}
        title={t("contact_page.header.title")}
        description={t("contact_page.header.desc")}
      />

      <section className="section-light section-py">
        <div className="page-container">
          <div className="mobile-grid-1" style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "4rem", alignItems: "start" }}>

            {/* Infos contact */}
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <h2 className="section-title" style={{ marginBottom: "2rem" }}>{t("contact_page.info.title")}</h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2.5rem" }}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "0.75rem", background: "rgba(39,121,86,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#277956" }}>
                    <Mail size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div style={{ fontWeight: "700", fontSize: "0.85rem", color: "#1a2e22", marginBottom: "0.2rem" }}>{t("contact_page.info.email")}</div>
                    <a href="mailto:contact@breizhbackyard.com" style={{ color: "#277956", textDecoration: "none", fontSize: "0.95rem" }}>
                      contact@breizhbackyard.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Réseaux */}
              <div>
                <h3 style={{ fontWeight: "700", fontSize: "0.85rem", color: "#4a6b56", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "1rem" }}>
                  {t("contact_page.info.socials")}
                </h3>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  {[
                    { icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com/breizhbackyard/" },
                    { icon: FacebookIcon, label: "Facebook", href: "https://www.facebook.com/people/BreizhBackyard/61588328941008/" },
                    { icon: YoutubeIcon, label: "YouTube", href: "https://www.youtube.com/@breizhbackyard" },
                    { icon: TiktokIcon, label: "TikTok", href: "https://www.tiktok.com/@breizhbackyard" },
                  ].map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.6rem 1rem",
                        borderRadius: "0.75rem",
                        background: "#fff",
                        border: "1.5px solid #D0D0D0",
                        color: "#277956",
                        textDecoration: "none",
                        fontSize: "0.82rem",
                        fontWeight: "600",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "#277956";
                        (e.currentTarget as HTMLElement).style.background = "rgba(39,121,86,0.05)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "#D0D0D0";
                        (e.currentTarget as HTMLElement).style.background = "#fff";
                      }}
                    >
                      <Icon size={16} strokeWidth={1.5} />
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Response time */}
              <div
                style={{
                  marginTop: "2rem",
                  padding: "1rem 1.25rem",
                  borderRadius: "0.875rem",
                  background: "rgba(39,121,86,0.06)",
                  border: "1px solid rgba(39,121,86,0.15)",
                  fontSize: "0.85rem",
                  color: "#4a6b56",
                  lineHeight: 1.65,
                }}
              >
                <strong style={{ color: "#277956" }}>{t("contact_page.info.delay")}</strong>{t("contact_page.info.delay_text")}
              </div>
            </motion.div>

            {/* Formulaire */}
            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
              {!submitted ? (
                <div style={{ background: "#fff", borderRadius: "1.5rem", padding: "2.5rem", border: "1.5px solid #D0D0D0", boxShadow: "0 8px 40px rgba(39,121,86,0.08)" }}>
                  <h3 style={{ fontFamily: "'Hobo', sans-serif", fontSize: "1.4rem", color: "#1a2e22", marginBottom: "2rem" }}>
                    {t("contact_page.form.title")}
                  </h3>

                  <form onSubmit={handleSubmit} noValidate>
                    <div className="form-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                      <div>
                        <label className="bbu-label" htmlFor="c-nom">
                          {t("contact_page.form.nom_label")} <span style={{ color: "#c44" }}>*</span>
                        </label>
                        <input
                          id="c-nom"
                          type="text"
                          className="bbu-input"
                          placeholder={t("contact_page.form.nom_ph")}
                          value={formData.nom}
                          onChange={handleChange("nom")}
                          style={errors.nom ? { borderColor: "#e53" } : {}}
                        />
                        {errors.nom && <p style={{ color: "#e53", fontSize: "0.78rem", marginTop: "0.3rem" }}>{errors.nom}</p>}
                      </div>
                      <div>
                        <label className="bbu-label" htmlFor="c-email">
                          {t("contact_page.form.email_label")} <span style={{ color: "#c44" }}>*</span>
                        </label>
                        <input
                          id="c-email"
                          type="email"
                          className="bbu-input"
                          placeholder={t("contact_page.form.email_ph")}
                          value={formData.email}
                          onChange={handleChange("email")}
                          style={errors.email ? { borderColor: "#e53" } : {}}
                        />
                        {errors.email && <p style={{ color: "#e53", fontSize: "0.78rem", marginTop: "0.3rem" }}>{errors.email}</p>}
                      </div>
                    </div>

                    <div style={{ marginBottom: "1rem" }}>
                      <label className="bbu-label" htmlFor="c-sujet">{t("contact_page.form.sujet_label")}</label>
                      <select
                        id="c-sujet"
                        className="bbu-input"
                        value={formData.sujet}
                        onChange={handleChange("sujet")}
                        style={{ cursor: "pointer", appearance: "none" }}
                      >
                        <option value="">{t("contact_page.form.sujet_ph")}</option>
                        {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    <div style={{ marginBottom: "1.5rem" }}>
                      <label className="bbu-label" htmlFor="c-message">
                        {t("contact_page.form.msg_label")} <span style={{ color: "#c44" }}>*</span>
                      </label>
                      <textarea
                        id="c-message"
                        className="bbu-input"
                        rows={5}
                        placeholder={t("contact_page.form.msg_ph")}
                        value={formData.message}
                        onChange={handleChange("message")}
                        style={{ resize: "vertical", ...(errors.message ? { borderColor: "#e53" } : {}) }}
                      />
                      {errors.message && <p style={{ color: "#e53", fontSize: "0.78rem", marginTop: "0.3rem" }}>{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={loading}
                      style={{ width: "100%", justifyContent: "center", opacity: loading ? 0.75 : 1, gap: "0.5rem" }}
                    >
                      <Send size={16} />
                      {loading ? t("contact_page.form.btn_loading") : t("contact_page.form.btn_submit")}
                    </button>
                  </form>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    background: "#fff",
                    borderRadius: "1.5rem",
                    padding: "3rem",
                    border: "1.5px solid rgba(39,121,86,0.3)",
                    boxShadow: "0 8px 40px rgba(39,121,86,0.1)",
                    textAlign: "center",
                  }}
                >
                  <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "rgba(39,121,86,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                    <CheckCircle size={36} style={{ color: "#277956" }} />
                  </div>
                  <h3 style={{ fontFamily: "'Hobo', sans-serif", fontSize: "1.5rem", color: "#277956", marginBottom: "0.75rem" }}>
                    {t("contact_page.form.success_title")}
                  </h3>
                  <p style={{ color: "#4a6b56", lineHeight: 1.75, fontSize: "1rem" }}>
                    {t("contact_page.form.success_desc", { nom: formData.nom })}
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
