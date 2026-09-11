import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Building2, User, Server, Copyright, AlertTriangle, ShieldCheck, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

const PageHeader = ({ title, subtitle, description }: { title: string; subtitle?: string; description?: string }) => (
  <div
    className="page-header-inner"
    style={{
      background: "linear-gradient(135deg, #277956 0%, #1a4d36 60%, #0f2d1d 100%)",
      paddingTop: "8rem",
      paddingBottom: "5rem",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `radial-gradient(circle at 80% 50%, rgba(245,201,44,0.1) 0%, transparent 60%)`,
      }}
    />
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: "60px", fill: "#EFEFEF" }}
      >
        <path d="M0,20 C360,60 720,0 1080,40 C1260,55 1380,25 1440,20 L1440,60 L0,60 Z" />
      </svg>
    </div>
    <div className="page-container" style={{ position: "relative", zIndex: 1 }}>
      {subtitle && (
        <p className="section-subtitle" style={{ color: "#8CBE4F", marginBottom: "0.75rem" }}>
          {subtitle}
        </p>
      )}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          fontFamily: "'Hobo', sans-serif",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          color: "#fff",
          marginBottom: description ? "1rem" : 0,
        }}
      >
        {title}
      </motion.h1>
      {description && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ color: "rgba(255,255,255,0.85)", maxWidth: "700px", fontSize: "1.05rem", lineHeight: 1.75 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  </div>
);

export const MentionsLegales = () => {
  const { t } = useTranslation();

  return (
    <div style={{ background: "#EFEFEF", minHeight: "100vh" }}>
      <PageHeader
        subtitle={t("mentions_page.subtitle", "Informations réglementaires & Éditeur")}
        title={t("mentions_page.title", "Mentions Légales")}
        description={t(
          "mentions_page.desc",
          "Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN), retrouvez ci-dessous les informations légales relatives à l'éditeur et à l'hébergeur du site Breizh Backyard Ultra."
        )}
      />

      <section style={{ padding: "4rem 0 6rem" }}>
        <div className="page-container" style={{ maxWidth: "920px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* 1. Éditeur du site */}
            <article
              style={{
                background: "#fff",
                borderRadius: "1.25rem",
                padding: "2rem",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                <Building2 style={{ color: "#277956" }} size={24} />
                <h2 style={{ fontSize: "1.35rem", color: "#1a2e22", margin: 0, fontWeight: 700 }}>
                  1. Éditeur du Site (Propriétaire)
                </h2>
              </div>
              <p style={{ color: "#333", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "1rem" }}>
                Le site internet <strong>breizhbackyard.com</strong> est édité et géré par l'association sportive :
              </p>
              <div
                style={{
                  background: "#f8faf8",
                  borderLeft: "4px solid #277956",
                  padding: "1.25rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.93rem",
                  color: "#1a2e22",
                  lineHeight: 1.8,
                }}
              >
                <strong>Association Delta Events</strong>
                <br />
                Association loi 1901 à but non lucratif
                <br />
                <strong>Siège social :</strong> 2, rue Victor et Ilona Basch, 35700 Rennes, France
                <br />
                <strong>Courriel :</strong>{" "}
                <a href="mailto:contact@breizhbackyard.com" style={{ color: "#277956", fontWeight: 700 }}>
                  contact@breizhbackyard.com
                </a>
              </div>
            </article>

            {/* 2. Responsable de la publication */}
            <article
              style={{
                background: "#fff",
                borderRadius: "1.25rem",
                padding: "2rem",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                <User style={{ color: "#277956" }} size={24} />
                <h2 style={{ fontSize: "1.35rem", color: "#1a2e22", margin: 0, fontWeight: 700 }}>
                  2. Responsable de la Publication
                </h2>
              </div>
              <div
                style={{
                  background: "#f8faf8",
                  padding: "1rem 1.25rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.93rem",
                  color: "#1a2e22",
                  lineHeight: 1.7,
                }}
              >
                <strong>Directeur de la publication :</strong> Gabin Demé
                <br />
                <strong>Qualité :</strong> Président de l'Association Delta Events
                <br />
                <strong>Contact :</strong>{" "}
                <a href="mailto:contact@breizhbackyard.com" style={{ color: "#277956", fontWeight: 600 }}>
                  contact@breizhbackyard.com
                </a>
              </div>
            </article>

            {/* 3. Hébergeur */}
            <article
              style={{
                background: "#fff",
                borderRadius: "1.25rem",
                padding: "2rem",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                <Server style={{ color: "#277956" }} size={24} />
                <h2 style={{ fontSize: "1.35rem", color: "#1a2e22", margin: 0, fontWeight: 700 }}>
                  3. Hébergement du Site
                </h2>
              </div>
              <p style={{ color: "#333", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "1rem" }}>
                Le site Breizh Backyard Ultra est hébergé par la société :
              </p>
              <div
                style={{
                  background: "#f8faf8",
                  borderLeft: "4px solid #F5C92C",
                  padding: "1.25rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.93rem",
                  color: "#1a2e22",
                  lineHeight: 1.8,
                }}
              >
                <strong>Vercel Inc.</strong>
                <br />
                440 N Barranca Ave #4133, Covina, CA 91723, États-Unis
                <br />
                <strong>Site Internet :</strong>{" "}
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#277956", fontWeight: 600 }}
                >
                  https://vercel.com
                </a>
              </div>
            </article>

            {/* 4. Propriété intellectuelle */}
            <article
              style={{
                background: "#fff",
                borderRadius: "1.25rem",
                padding: "2rem",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                <Copyright style={{ color: "#277956" }} size={24} />
                <h2 style={{ fontSize: "1.35rem", color: "#1a2e22", margin: 0, fontWeight: 700 }}>
                  4. Propriété Intellectuelle & Droits d'Auteur
                </h2>
              </div>
              <p style={{ color: "#333", fontSize: "0.95rem", lineHeight: 1.75 }}>
                L'ensemble des éléments constituant le site web (textes, graphismes, logos, images, visuels, vidéos, sons, architecture, icônes) est la propriété exclusive de l'<strong>Association Delta Events</strong> ou fait l'objet d’un droit d’utilisation ou d'une licence.
              </p>
              <p style={{ color: "#333", fontSize: "0.95rem", lineHeight: 1.75 }}>
                Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est strictement interdite sans l'autorisation écrite préalable de l'association.
              </p>
            </article>

            {/* 5. Limitation de responsabilité */}
            <article
              style={{
                background: "#fff",
                borderRadius: "1.25rem",
                padding: "2rem",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                <AlertTriangle style={{ color: "#277956" }} size={24} />
                <h2 style={{ fontSize: "1.35rem", color: "#1a2e22", margin: 0, fontWeight: 700 }}>
                  5. Limitation de Responsabilité & Liens
                </h2>
              </div>
              <p style={{ color: "#333", fontSize: "0.95rem", lineHeight: 1.75 }}>
                L'Association Delta Events s'efforce de fournir des informations aussi précises que possible sur le site. Toutefois, elle ne pourra être tenue responsable des omissions ou inexactitudes dans la mise à jour des informations relatives aux épreuves et au programme.
              </p>
              <p style={{ color: "#333", fontSize: "0.95rem", lineHeight: 1.75 }}>
                Le site peut inclure des liens hypertextes vers d'autres sites web. L'association n'exerce aucun contrôle sur ces sites externes et décline toute responsabilité quant à leur contenu ou leurs politiques de confidentialité.
              </p>
            </article>

            {/* Link to Privacy Policy */}
            <div
              style={{
                background: "linear-gradient(135deg, #0f2d1d 0%, #277956 100%)",
                borderRadius: "1.25rem",
                padding: "1.75rem 2rem",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                <ShieldCheck style={{ color: "#F5C92C" }} size={28} />
                <div>
                  <h4 style={{ fontSize: "1.1rem", margin: 0, fontWeight: 700, fontFamily: "'Hobo', sans-serif" }}>
                    Protection des Données Personnelles (RGPD)
                  </h4>
                  <p style={{ fontSize: "0.88rem", margin: 0, color: "rgba(255,255,255,0.8)" }}>
                    Consultez les détails sur la collecte, la conservation et vos droits sur vos données.
                  </p>
                </div>
              </div>
              <Link
                to="/politique-de-confidentialite"
                className="btn-primary"
                style={{ fontSize: "0.88rem" }}
              >
                Voir la politique de confidentialité →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
