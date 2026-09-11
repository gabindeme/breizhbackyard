import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Shield, Lock, Eye, Clock, UserCheck, Mail, ExternalLink, FileText, Server } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCookieConsent } from "@/providers/cookie-context";

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

export const PolitiqueConfidentialite = () => {
  const { t } = useTranslation();
  const { openModal } = useCookieConsent();

  return (
    <div style={{ background: "#EFEFEF", minHeight: "100vh" }}>
      <PageHeader
        subtitle={t("privacy_page.subtitle", "Protection de la vie privée & RGPD")}
        title={t("privacy_page.title", "Politique de Confidentialité")}
        description={t(
          "privacy_page.desc",
          "L'Association Delta Events s'engage à protéger la sécurité et la confidentialité des données personnelles de ses coureurs, bénévoles et visiteurs conformément au Règlement Général sur la Protection des Données (RGPD)."
        )}
      />

      <section style={{ padding: "4rem 0 6rem" }}>
        <div className="page-container" style={{ maxWidth: "920px" }}>
          {/* Quick status bar */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #D0D0D0",
              borderRadius: "1.25rem",
              padding: "1.5rem",
              marginBottom: "3rem",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "rgba(39, 121, 86, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#277956",
                  flexShrink: 0,
                }}
              >
                <Shield size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.05rem", color: "#1a2e22", margin: 0, fontWeight: 700 }}>
                  {t("privacy_page.status_title", "Vos Préférences de Consentement")}
                </h3>
                <p style={{ fontSize: "0.88rem", color: "#4a6b56", margin: 0 }}>
                  {t("privacy_page.status_desc", "Vous pouvez modifier ou retirer vos choix de cookies à tout moment.")}
                </p>
              </div>
            </div>
            <button
              onClick={openModal}
              className="btn-primary"
              style={{ fontSize: "0.85rem", padding: "0.6rem 1.2rem" }}
            >
              {t("privacy_page.btn_manage_cookies", "Gérer mes cookies")}
            </button>
          </div>

          {/* Main content grid */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {/* Section 1 */}
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
                <UserCheck style={{ color: "#277956" }} size={22} />
                <h2 style={{ fontSize: "1.4rem", color: "#1a2e22", margin: 0, fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
                  1. Responsable du Traitement des Données
                </h2>
              </div>
              <p style={{ color: "#333", fontSize: "0.95rem", lineHeight: 1.75 }}>
                Le responsable du traitement des données à caractère personnel collectées sur le site{" "}
                <strong>breizhbackyard.com</strong> est :
              </p>
              <div
                style={{
                  background: "#f8faf8",
                  borderLeft: "4px solid #277956",
                  padding: "1rem 1.25rem",
                  borderRadius: "0.5rem",
                  margin: "1rem 0",
                  fontSize: "0.92rem",
                  color: "#1a2e22",
                }}
              >
                <strong>Association Delta Events</strong>
                <br />
                Siège social : 2, rue Victor et Ilona Basch, 35700 Rennes, France
                <br />
                Représentant légal : Gabin Demé, Président
                <br />
                Contact RGPD / DPO :{" "}
                <a href="mailto:contact@breizhbackyard.com" style={{ color: "#277956", fontWeight: 600 }}>
                  contact@breizhbackyard.com
                </a>
              </div>
            </article>

            {/* Section 2 */}
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
                <Eye style={{ color: "#277956" }} size={22} />
                <h2 style={{ fontSize: "1.4rem", color: "#1a2e22", margin: 0, fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
                  2. Données Personnelles Collectées
                </h2>
              </div>
              <p style={{ color: "#333", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "1rem" }}>
                Nous veillons à ne collecter que les données strictly nécessaires aux finalités poursuivies :
              </p>
              <ul style={{ paddingLeft: "1.25rem", color: "#444", fontSize: "0.93rem", lineHeight: 1.8 }}>
                <li>
                  <strong>Inscriptions à la course (Dossards) :</strong> Nom, prénom, date de naissance, sexe, adresse e-mail, numéro de téléphone, personne à contacter en cas d'urgence et justificatifs de licence sportive.
                </li>
                <li>
                  <strong>Formulaires de Contact & Bénévolat :</strong> Nom, prénom, adresse e-mail, numéro de téléphone, disponibilités et message.
                </li>
                <li>
                  <strong>Newsletter :</strong> Adresse e-mail (sur consentement explicite).
                </li>
                <li>
                  <strong>Données techniques & d'audience :</strong> Adresse IP anonymisée, type de navigateur, pages consultées et métriques de performance (Vercel Analytics & Speed Insights, uniquement après consentement).
                </li>
              </ul>
            </article>

            {/* Section 3 */}
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
                <FileText style={{ color: "#277956" }} size={22} />
                <h2 style={{ fontSize: "1.4rem", color: "#1a2e22", margin: 0, fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
                  3. Finalités et Bases Légales du Traitement
                </h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.25rem", marginTop: "1rem" }}>
                <div style={{ background: "#f9fbf9", padding: "1.25rem", borderRadius: "0.85rem", border: "1px solid #e2ece5" }}>
                  <h4 style={{ color: "#277956", margin: "0 0 0.5rem 0", fontSize: "1rem", fontWeight: 700 }}>
                    Exécution du contrat
                  </h4>
                  <p style={{ fontSize: "0.88rem", color: "#555", margin: 0, lineHeight: 1.6 }}>
                    Gestion des inscriptions, attribution des dossards, suivi du chronométrage et sécurité médicale des participants pendant l'épreuve.
                  </p>
                </div>
                <div style={{ background: "#f9fbf9", padding: "1.25rem", borderRadius: "0.85rem", border: "1px solid #e2ece5" }}>
                  <h4 style={{ color: "#277956", margin: "0 0 0.5rem 0", fontSize: "1rem", fontWeight: 700 }}>
                    Consentement
                  </h4>
                  <p style={{ fontSize: "0.88rem", color: "#555", margin: 0, lineHeight: 1.6 }}>
                    Envoi de la newsletter d'information et activation des cookies de mesure d'audience anonymes.
                  </p>
                </div>
                <div style={{ background: "#f9fbf9", padding: "1.25rem", borderRadius: "0.85rem", border: "1px solid #e2ece5" }}>
                  <h4 style={{ color: "#277956", margin: "0 0 0.5rem 0", fontSize: "1rem", fontWeight: 700 }}>
                    Intérêt légitime
                  </h4>
                  <p style={{ fontSize: "0.88rem", color: "#555", margin: 0, lineHeight: 1.6 }}>
                    Sécurité et prévention des fraudes sur le site web, optimisation technique de la plateforme.
                  </p>
                </div>
              </div>
            </article>

            {/* Section 4 */}
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
                <Clock style={{ color: "#277956" }} size={22} />
                <h2 style={{ fontSize: "1.4rem", color: "#1a2e22", margin: 0, fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
                  4. Durée de Conservation des Données
                </h2>
              </div>
              <p style={{ color: "#333", fontSize: "0.95rem", lineHeight: 1.75 }}>
                Vos données sont conservées uniquement pendant la durée nécessaire aux finalités indiquées :
              </p>
              <ul style={{ paddingLeft: "1.25rem", color: "#444", fontSize: "0.93rem", lineHeight: 1.8 }}>
                <li>
                  <strong>Données d'inscription & résultats :</strong> Conservées pendant 3 ans à compter de la fin de l'événement (à l'exception du classement officiel conservé pour l'historique sportif de la course).
                </li>
                <li>
                  <strong>Formulaires de contact :</strong> Supprimés au plus tard 12 mois après le traitement de votre demande.
                </li>
                <li>
                  <strong>Consentement aux cookies :</strong> Mémorisé pour une durée maximale de 13 mois.
                </li>
              </ul>
            </article>

            {/* Section 5 */}
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
                <Server style={{ color: "#277956" }} size={22} />
                <h2 style={{ fontSize: "1.4rem", color: "#1a2e22", margin: 0, fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
                  5. Destinataires des Données & Sous-traitants
                </h2>
              </div>
              <p style={{ color: "#333", fontSize: "0.95rem", lineHeight: 1.75 }}>
                L'Association Delta Events <strong>ne revend, ne loue et ne cède aucune donnée personnelle</strong> à des tiers à des fins commerciales.
              </p>
              <p style={{ color: "#333", fontSize: "0.95rem", lineHeight: 1.75 }}>
                Les seuls destinataires habilités sont :
              </p>
              <ul style={{ paddingLeft: "1.25rem", color: "#444", fontSize: "0.93rem", lineHeight: 1.8 }}>
                <li>L'équipe d'organisation interne et les secours médicaux de l'épreuve.</li>
                <li>
                  Notre plateforme partenaire de gestion des inscriptions et des dossards : <strong>Nextrun</strong>.
                </li>
                <li>
                  Notre prestataire technique d'hébergement : <strong>Vercel Inc.</strong> (infrastructures sécurisées applicables au RGPD).
                </li>
                <li>Les prestataires de chronométrage officiel liés par contrat de confidentialité.</li>
              </ul>
            </article>

            {/* Section 6 */}
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
                <Lock style={{ color: "#277956" }} size={22} />
                <h2 style={{ fontSize: "1.4rem", color: "#1a2e22", margin: 0, fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
                  6. Vos Droits Informatique et Libertés (RGPD)
                </h2>
              </div>
              <p style={{ color: "#333", fontSize: "0.95rem", lineHeight: 1.75 }}>
                Conformément à la réglementation européenne, vous disposez des droits suivants sur vos données :
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", margin: "1.25rem 0" }}>
                <div style={{ padding: "0.85rem 1rem", background: "#f8faf8", borderRadius: "0.5rem", borderLeft: "3px solid #8CBE4F" }}>
                  <strong>Droit d'accès :</strong> Obtenir la confirmation et la copie de vos données.
                </div>
                <div style={{ padding: "0.85rem 1rem", background: "#f8faf8", borderRadius: "0.5rem", borderLeft: "3px solid #8CBE4F" }}>
                  <strong>Droit de rectification :</strong> Corriger toute donnée inexacte ou incomplète.
                </div>
                <div style={{ padding: "0.85rem 1rem", background: "#f8faf8", borderRadius: "0.5rem", borderLeft: "3px solid #8CBE4F" }}>
                  <strong>Droit à l'effacement :</strong> Demander la suppression de vos données ("droit à l'oubli").
                </div>
                <div style={{ padding: "0.85rem 1rem", background: "#f8faf8", borderRadius: "0.5rem", borderLeft: "3px solid #8CBE4F" }}>
                  <strong>Droit d'opposition :</strong> Vous opposer à tout moment au traitement de vos données.
                </div>
              </div>
              <p style={{ color: "#333", fontSize: "0.95rem", lineHeight: 1.75, marginTop: "1rem" }}>
                Pour exercer l'un de ces droits, adressez-nous simplement un courriel à :{" "}
                <a href="mailto:contact@breizhbackyard.com" style={{ color: "#277956", fontWeight: 700 }}>
                  contact@breizhbackyard.com
                </a>
              </p>
              <div
                style={{
                  marginTop: "1.5rem",
                  padding: "1rem",
                  background: "rgba(245, 201, 44, 0.12)",
                  border: "1px solid rgba(245, 201, 44, 0.3)",
                  borderRadius: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                }}
              >
                <div style={{ fontSize: "0.88rem", color: "#1a2e22" }}>
                  Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la CNIL.
                </div>
                <a
                  href="https://www.cnil.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    color: "#0f2d1d",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    textDecoration: "underline",
                  }}
                >
                  Site officiel de la CNIL <ExternalLink size={14} />
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};
