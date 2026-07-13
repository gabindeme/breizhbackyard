import { motion } from "motion/react";
import { useState } from "react";
import { Mail, CheckCircle, Timer, Bell, Lock } from "lucide-react";

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

export const Inscriptions = () => {
  const [formData, setFormData] = useState({ prenom: "", nom: "", email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email.trim()) newErrors.email = "L'email est requis.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Email invalide.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Simulation d'un envoi (à brancher sur Formspree, Mailchimp, Supabase, etc.)
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
  };

  return (
    <div style={{ background: "#EFEFEF" }}>
      <PageHeader
        subtitle="Rejoignez-nous"
        title="Inscriptions"
        description="Les inscriptions pour la prochaine édition ne sont pas encore ouvertes. Laissez-nous votre email pour être prévenu(e) en priorité."
      />

      <section className="section-light section-py">
        <div className="page-container" style={{ maxWidth: "960px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>

            {/* Info côté gauche */}
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              {/* Badge statut */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "0.6rem 1.25rem",
                  borderRadius: "9999px",
                  background: "rgba(245,201,44,0.15)",
                  border: "1.5px solid rgba(245,201,44,0.4)",
                  color: "#8a6200",
                  fontWeight: "700",
                  fontSize: "0.82rem",
                  letterSpacing: "0.04em",
                  marginBottom: "2rem",
                }}
              >
                <Lock size={14} />
                Inscriptions fermées — Ouverture prochaine
              </div>

              <h2 className="section-title" style={{ marginBottom: "1.25rem" }}>
                Soyez parmi les premiers à courir
              </h2>
              <p style={{ color: "#4a6b56", lineHeight: 1.8, marginBottom: "2rem" }}>
                Les places pour le Breizh Backyard Ultra sont limitées. En vous inscrivant à notre
                newsletter, vous serez alerté(e) dès l'ouverture officielle des inscriptions,
                bien avant l'annonce publique.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  { icon: Bell, text: "Notification immédiate à l'ouverture des inscriptions" },
                  { icon: Timer, text: "Accès prioritaire avant les listes d'attente" },
                  { icon: Mail, text: "Actualités exclusives sur la course et le parcours" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "0.625rem", background: "rgba(39,121,86,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#277956" }}>
                      <Icon size={16} strokeWidth={1.5} />
                    </div>
                    <p style={{ margin: 0, color: "#4a6b56", fontSize: "0.9rem", lineHeight: 1.6, paddingTop: "0.45rem" }}>{text}</p>
                  </div>
                ))}
              </div>

              {/* Infos départ */}
              <div
                style={{
                  marginTop: "2rem",
                  padding: "1.25rem 1.5rem",
                  borderRadius: "1rem",
                  background: "linear-gradient(135deg, #277956 0%, #1a4d36 100%)",
                  color: "#fff",
                }}
              >
                <div style={{ fontSize: "0.7rem", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8CBE4F", marginBottom: "0.5rem" }}>
                  Prochain départ
                </div>
                <div style={{ fontFamily: "'Hobo', sans-serif", fontSize: "1.5rem", color: "#F5C92C", marginBottom: "0.25rem" }}>
                  Samedi 15 Mai 2027
                </div>
                <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem" }}>
                  10h00 — Parc des Gayeulles, Rennes
                </div>
              </div>
            </motion.div>

            {/* Formulaire côté droit */}
            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
              {!submitted ? (
                <div
                  style={{
                    background: "#fff",
                    borderRadius: "1.5rem",
                    padding: "2.5rem",
                    border: "1.5px solid #D0D0D0",
                    boxShadow: "0 8px 40px rgba(39,121,86,0.1)",
                  }}
                >
                  <h3 style={{ fontFamily: "'Hobo', sans-serif", fontSize: "1.4rem", color: "#1a2e22", marginBottom: "0.5rem" }}>
                    Restez informé(e)
                  </h3>
                  <p style={{ color: "#4a6b56", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "2rem" }}>
                    Laissez-nous votre email pour être prévenu(e) dès l'ouverture des inscriptions.
                    Nous ne vous enverrons que des emails importants.
                  </p>

                  <form onSubmit={handleSubmit} noValidate>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                      <div>
                        <label className="bbu-label" htmlFor="prenom">Prénom</label>
                        <input
                          id="prenom"
                          type="text"
                          className="bbu-input"
                          placeholder="Marie"
                          value={formData.prenom}
                          onChange={handleChange("prenom")}
                          autoComplete="given-name"
                        />
                      </div>
                      <div>
                        <label className="bbu-label" htmlFor="nom">Nom</label>
                        <input
                          id="nom"
                          type="text"
                          className="bbu-input"
                          placeholder="Dupont"
                          value={formData.nom}
                          onChange={handleChange("nom")}
                          autoComplete="family-name"
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: "1.5rem" }}>
                      <label className="bbu-label" htmlFor="email">
                        Email <span style={{ color: "#c44" }}>*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="bbu-input"
                        placeholder="marie.dupont@example.com"
                        value={formData.email}
                        onChange={handleChange("email")}
                        autoComplete="email"
                        style={errors.email ? { borderColor: "#e53" } : {}}
                      />
                      {errors.email && (
                        <p style={{ color: "#e53", fontSize: "0.8rem", marginTop: "0.4rem" }}>{errors.email}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={loading}
                      style={{ width: "100%", justifyContent: "center", opacity: loading ? 0.75 : 1 }}
                    >
                      {loading ? "Envoi en cours..." : "Je veux être prévenu(e) →"}
                    </button>

                    <p style={{ fontSize: "0.72rem", color: "#aab8b2", textAlign: "center", marginTop: "0.75rem", lineHeight: 1.5 }}>
                      En vous inscrivant, vous acceptez de recevoir nos emails. Désabonnement possible à tout moment.
                    </p>
                  </form>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    background: "#fff",
                    borderRadius: "1.5rem",
                    padding: "3rem 2.5rem",
                    border: "1.5px solid rgba(39,121,86,0.3)",
                    boxShadow: "0 8px 40px rgba(39,121,86,0.12)",
                    textAlign: "center",
                  }}
                >
                  <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "rgba(39,121,86,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                    <CheckCircle size={36} style={{ color: "#277956" }} />
                  </div>
                  <h3 style={{ fontFamily: "'Hobo', sans-serif", fontSize: "1.5rem", color: "#277956", marginBottom: "0.75rem" }}>
                    Merci !
                  </h3>
                  <p style={{ color: "#4a6b56", lineHeight: 1.75, fontSize: "1rem" }}>
                    Vous serez informé(e) dès l'ouverture des inscriptions.
                    Préparez vos chaussures de trail — ça ne devrait plus tarder !
                  </p>
                  {formData.email && (
                    <p style={{ color: "#277956", fontWeight: "700", marginTop: "1rem", fontSize: "0.9rem" }}>
                      Confirmation envoyée à : {formData.email}
                    </p>
                  )}
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
