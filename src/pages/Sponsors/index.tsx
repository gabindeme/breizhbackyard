import { motion } from "motion/react";
import { Mail, Star, Download } from "lucide-react";
import { useState } from "react";

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

const sponsorLevels = [
  {
    level: "Or",
    color: "#F5C92C",
    bg: "rgba(245,201,44,0.1)",
    border: "rgba(245,201,44,0.4)",
    count: 2,
    desc: "Visibilité maximale — logo XXL sur dossard et toute communication",
    price: "Sur devis",
  },
  {
    level: "Argent",
    color: "#9AA8B8",
    bg: "rgba(154,168,184,0.1)",
    border: "rgba(154,168,184,0.35)",
    count: 4,
    desc: "Forte visibilité — logo prominent sur site, réseaux et signalétique",
    price: "Sur devis",
  },
  {
    level: "Bronze",
    color: "#CD7F32",
    bg: "rgba(205,127,50,0.1)",
    border: "rgba(205,127,50,0.35)",
    count: 6,
    desc: "Bonne visibilité — logo sur site et communication de course",
    price: "Sur devis",
  },
];

const benefits = [
  "Logo sur le site internet",
  "Mention sur les réseaux sociaux",
  "Présence dans le kit participant",
  "Stand possible sur la zone de vie",
];

export const Sponsors = () => {
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

  return (
    <div style={{ background: "#EFEFEF" }}>
      <PageHeader
        subtitle="Partenariat"
        title="Sponsors & Partenaires"
        description="Associez votre marque à un événement sportif unique, ancré dans les valeurs de nature, dépassement de soi et convivialité bretonne."
      />

      {/* ============================================================
          DOSSIER SPONSORING
          ============================================================ */}
      <section className="section-light" style={{ padding: "1rem 0 3rem 0" }}>
        <div className="page-container">
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
            <div style={{ position: "relative", zIndex: 1 }}>
              <h3 style={{ fontFamily: "'Hobo', sans-serif", fontSize: "1.5rem", color: "#1a2e22", marginBottom: "0.5rem" }}>
                Kit Partenaire & Dossier de Sponsoring
              </h3>
              <p style={{ color: "#4a6b56", fontSize: "1rem", margin: 0, maxWidth: "600px", lineHeight: 1.6 }}>
                Découvrez en détail notre événement, nos valeurs, nos chiffres clés et l'ensemble de nos offres de visibilité en téléchargeant notre dossier complet.
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
              Télécharger le dossier (PDF)
            </a>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          NIVEAUX DE SPONSORING
          ============================================================ */}
      <section className="section-white section-py">
        <div className="page-container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p className="section-subtitle">Devenez partenaire</p>
            <h2 className="section-title" style={{ marginTop: "0.5rem" }}>
              Niveaux de partenariat
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginBottom: "3rem" }}>
            {sponsorLevels.map((level, i) => (
              <motion.div
                key={level.level}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{
                  background: level.bg,
                  border: `2px solid ${level.border}`,
                  borderRadius: "1.5rem",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <Star size={20} fill={level.color} style={{ color: level.color }} />
                  <span style={{ fontFamily: "'Hobo', sans-serif", fontSize: "1.3rem", color: level.color }}>
                    {level.level}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: "0.88rem", color: "#4a6b56", lineHeight: 1.6 }}>{level.desc}</p>
                <div style={{ marginTop: "auto" }}>
                  <div style={{ fontSize: "0.72rem", color: "#4a6b56", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Tarif
                  </div>
                  <div style={{ fontWeight: "700", color: "#1a2e22", fontSize: "1rem" }}>{level.price}</div>
                </div>

                {/* Logos placeholder */}
                <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(level.count, 2)}, 1fr)`, gap: "0.5rem", marginTop: "0.5rem" }}>
                  {Array.from({ length: level.count }).map((_, j) => (
                    <div key={j} className="sponsor-logo-placeholder" style={{ minHeight: "60px" }}>
                      Logo {j + 1}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Avantages */}
          <div
            style={{
              background: "#EFEFEF",
              borderRadius: "1.25rem",
              padding: "2rem 2.5rem",
              marginBottom: "3rem",
            }}
          >
            <h3 style={{ fontFamily: "'Hobo', sans-serif", fontSize: "1.2rem", color: "#277956", marginBottom: "1.5rem" }}>
              Avantages communs à tous les niveaux
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "0.75rem" }}>
              {benefits.map((benefit) => (
                <div key={benefit} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                  <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#277956", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ color: "#fff", fontSize: "0.65rem", fontWeight: "800" }}>✓</span>
                  </div>
                  <span style={{ fontSize: "0.88rem", color: "#4a6b56" }}>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          FORMULAIRE CONTACT SPONSORS
          ============================================================ */}
      <section className="section-light section-py">
        <div className="page-container" style={{ maxWidth: "700px" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p className="section-subtitle">Intéressé(e) ?</p>
            <h2 className="section-title" style={{ marginTop: "0.5rem" }}>
              Contactez-nous
            </h2>
          </div>

          {!submitted ? (
            <div style={{ background: "#fff", borderRadius: "1.5rem", padding: "2.5rem", border: "1px solid #D0D0D0", boxShadow: "0 4px 24px rgba(39,121,86,0.08)" }}>
              <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                  <div>
                    <label className="bbu-label">Nom</label>
                    <input className="bbu-input" type="text" value={formData.nom} onChange={(e) => setFormData(p => ({ ...p, nom: e.target.value }))} placeholder="Votre nom" />
                  </div>
                  <div>
                    <label className="bbu-label">Société / Organisation</label>
                    <input className="bbu-input" type="text" value={formData.societe} onChange={(e) => setFormData(p => ({ ...p, societe: e.target.value }))} placeholder="Nom de votre entreprise" />
                  </div>
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label className="bbu-label">Email <span style={{ color: "#c44" }}>*</span></label>
                  <input className="bbu-input" type="email" required value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} placeholder="contact@votre-entreprise.fr" />
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label className="bbu-label">Message</label>
                  <textarea
                    className="bbu-input"
                    rows={4}
                    value={formData.message}
                    onChange={(e: any) => setFormData(p => ({ ...p, message: e.target.value }))}
                    placeholder="Décrivez votre intérêt, le niveau de partenariat envisagé..."
                    style={{ resize: "vertical" }}
                  />
                </div>
                <button type="submit" className="btn-primary" disabled={loading} style={{ width: "100%", justifyContent: "center" }}>
                  {loading ? "Envoi..." : "Envoyer ma demande →"}
                </button>
              </form>
            </div>
          ) : (
            <div style={{ background: "#fff", borderRadius: "1.5rem", padding: "3rem", textAlign: "center", border: "1.5px solid rgba(39,121,86,0.25)" }}>
              <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(39,121,86,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                <Mail size={28} style={{ color: "#277956" }} />
              </div>
              <h3 style={{ fontFamily: "'Hobo', sans-serif", fontSize: "1.4rem", color: "#277956", marginBottom: "0.75rem" }}>Message envoyé !</h3>
              <p style={{ color: "#4a6b56", lineHeight: 1.75 }}>Nous vous répondrons dans les meilleurs délais pour discuter d'un partenariat.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
