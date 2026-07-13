import { motion } from "motion/react";
import { useState } from "react";
import { Mail, Send, CheckCircle, MapPin } from "lucide-react";
import { InstagramIcon, FacebookIcon, YoutubeIcon, TiktokIcon } from "@/components/customs/icons";

const PageHeader = ({ title, subtitle, description }: { title: string; subtitle?: string; description?: string }) => (
  <div style={{ background: "linear-gradient(135deg, #277956 0%, #1a4d36 60%, #164030 100%)", paddingTop: "8rem", paddingBottom: "5rem", position: "relative", overflow: "hidden" }}>
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

const subjects = [
  "Question générale",
  "Demande de partenariat / sponsor",
  "Presse / Média",
  "Bénévolat",
  "Question médicale / sécurité",
  "Autre",
];

export const Contact = () => {
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
    if (!formData.nom.trim()) newErrors.nom = "Votre nom est requis.";
    if (!formData.email.trim()) newErrors.email = "L'email est requis.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Email invalide.";
    if (!formData.message.trim()) newErrors.message = "Votre message est requis.";
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
        subtitle="Écrivez-nous"
        title="Contact"
        description="Une question, une demande de partenariat, un besoin d'information ? Notre équipe vous répondra dans les meilleurs délais."
      />

      <section className="section-light section-py">
        <div className="page-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "4rem", alignItems: "start" }}>

            {/* Infos contact */}
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <h2 className="section-title" style={{ marginBottom: "2rem" }}>Nous trouver</h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2.5rem" }}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "0.75rem", background: "rgba(39,121,86,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#277956" }}>
                    <Mail size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div style={{ fontWeight: "700", fontSize: "0.85rem", color: "#1a2e22", marginBottom: "0.2rem" }}>Email</div>
                    <a href="mailto:contact@breizhbackyard.com" style={{ color: "#277956", textDecoration: "none", fontSize: "0.95rem" }}>
                      contact@breizhbackyard.com
                    </a>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "0.75rem", background: "rgba(39,121,86,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#277956" }}>
                    <MapPin size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div style={{ fontWeight: "700", fontSize: "0.85rem", color: "#1a2e22", marginBottom: "0.2rem" }}>Localisation</div>
                    <p style={{ margin: 0, color: "#4a6b56", fontSize: "0.9rem", lineHeight: 1.6 }}>
                      Parc des Gayeulles, Rennes
                    </p>
                  </div>
                </div>
              </div>

              {/* Réseaux */}
              <div>
                <h3 style={{ fontWeight: "700", fontSize: "0.85rem", color: "#4a6b56", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "1rem" }}>
                  Réseaux sociaux
                </h3>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  {[
                    { icon: InstagramIcon, label: "Instagram" },
                    { icon: FacebookIcon, label: "Facebook" },
                    { icon: YoutubeIcon, label: "YouTube" },
                    { icon: TiktokIcon, label: "TikTok" },
                  ].map(({ icon: Icon, label }) => (
                    <a
                      key={label}
                      href="#"
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
                <strong style={{ color: "#277956" }}>⏱ Délai de réponse</strong> : nous répondons généralement sous 48h ouvrées. Pour les demandes urgentes, merci de l'indiquer dans votre message.
              </div>
            </motion.div>

            {/* Formulaire */}
            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
              {!submitted ? (
                <div style={{ background: "#fff", borderRadius: "1.5rem", padding: "2.5rem", border: "1.5px solid #D0D0D0", boxShadow: "0 8px 40px rgba(39,121,86,0.08)" }}>
                  <h3 style={{ fontFamily: "'Hobo', sans-serif", fontSize: "1.4rem", color: "#1a2e22", marginBottom: "2rem" }}>
                    Envoyer un message
                  </h3>

                  <form onSubmit={handleSubmit} noValidate>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                      <div>
                        <label className="bbu-label" htmlFor="c-nom">
                          Nom complet <span style={{ color: "#c44" }}>*</span>
                        </label>
                        <input
                          id="c-nom"
                          type="text"
                          className="bbu-input"
                          placeholder="Mathieu Blanchard"
                          value={formData.nom}
                          onChange={handleChange("nom")}
                          style={errors.nom ? { borderColor: "#e53" } : {}}
                        />
                        {errors.nom && <p style={{ color: "#e53", fontSize: "0.78rem", marginTop: "0.3rem" }}>{errors.nom}</p>}
                      </div>
                      <div>
                        <label className="bbu-label" htmlFor="c-email">
                          Email <span style={{ color: "#c44" }}>*</span>
                        </label>
                        <input
                          id="c-email"
                          type="email"
                          className="bbu-input"
                          placeholder="mat@ilovekiprun.com"
                          value={formData.email}
                          onChange={handleChange("email")}
                          style={errors.email ? { borderColor: "#e53" } : {}}
                        />
                        {errors.email && <p style={{ color: "#e53", fontSize: "0.78rem", marginTop: "0.3rem" }}>{errors.email}</p>}
                      </div>
                    </div>

                    <div style={{ marginBottom: "1rem" }}>
                      <label className="bbu-label" htmlFor="c-sujet">Sujet</label>
                      <select
                        id="c-sujet"
                        className="bbu-input"
                        value={formData.sujet}
                        onChange={handleChange("sujet")}
                        style={{ cursor: "pointer", appearance: "none" }}
                      >
                        <option value="">Choisir un sujet...</option>
                        {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    <div style={{ marginBottom: "1.5rem" }}>
                      <label className="bbu-label" htmlFor="c-message">
                        Message <span style={{ color: "#c44" }}>*</span>
                      </label>
                      <textarea
                        id="c-message"
                        className="bbu-input"
                        rows={5}
                        placeholder="Votre message..."
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
                      {loading ? "Envoi en cours..." : "Envoyer le message"}
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
                    Message envoyé !
                  </h3>
                  <p style={{ color: "#4a6b56", lineHeight: 1.75, fontSize: "1rem" }}>
                    Merci pour votre message, {formData.nom} ! Nous vous répondrons sous 48h ouvrées.
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
