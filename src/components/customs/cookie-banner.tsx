import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { Cookie, ShieldCheck, X, Settings, Check, Lock, BarChart3 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCookieConsent } from "@/providers/cookie-context";

export const CookieBanner = () => {
  const { t } = useTranslation();
  const { consent, acceptAll, declineAll, savePreferences, isModalOpen, openModal, closeModal } =
    useCookieConsent();

  // Local state for modal toggles
  const [analyticsToggle, setAnalyticsToggle] = useState<boolean>(consent.analytics);

  useEffect(() => {
    setAnalyticsToggle(consent.analytics);
  }, [consent.analytics, isModalOpen]);

  // Lock body scroll when user has not decided yet OR when modal is open
  useEffect(() => {
    if (!consent.decided || isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [consent.decided, isModalOpen]);

  const showBanner = !consent.decided && !isModalOpen;

  return (
    <>
      {/* Blocking Cookie Banner Overlay (When not decided) */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              background: "rgba(0, 0, 0, 0.75)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.5rem",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Consentement aux cookies RGPD"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                maxWidth: "760px",
                width: "100%",
                background: "#0f2d1d",
                border: "1px solid rgba(245, 201, 44, 0.35)",
                borderRadius: "1.5rem",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 30px rgba(39, 121, 86, 0.25)",
                padding: "2rem",
                color: "#fff",
                position: "relative",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1.25rem" }}>
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "50%",
                      background: "rgba(245, 201, 44, 0.15)",
                      border: "1px solid rgba(245, 201, 44, 0.35)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#F5C92C",
                      flexShrink: 0,
                    }}
                  >
                    <Cookie size={26} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
                      <h3
                        style={{
                          fontFamily: "'Hobo', sans-serif",
                          fontSize: "1.3rem",
                          color: "#fff",
                          margin: 0,
                        }}
                      >
                        {t("cookies.banner_title", "Respect de votre vie privée")}
                      </h3>
                      <span
                        style={{
                          fontSize: "0.68rem",
                          padding: "0.15rem 0.5rem",
                          borderRadius: "999px",
                          background: "rgba(140, 190, 79, 0.2)",
                          color: "#8CBE4F",
                          border: "1px solid rgba(140, 190, 79, 0.4)",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        RGPD
                      </span>
                    </div>
                    <p
                      style={{
                        color: "rgba(255, 255, 255, 0.85)",
                        fontSize: "0.92rem",
                        lineHeight: "1.6",
                        margin: 0,
                      }}
                    >
                      {t(
                        "cookies.banner_desc",
                        "Nous utilisons des cookies essentiels au fonctionnement du site. Avec votre accord, nous pouvons également utiliser des cookies de mesure d'audience pour améliorer votre expérience d'ultra-endurance. Aucun traceur publicitaire tiers n'est activé sans votre consentement."
                      )}{" "}
                      <Link
                        to="/politique-de-confidentialite"
                        style={{
                          color: "#F5C92C",
                          textDecoration: "underline",
                          textUnderlineOffset: "3px",
                        }}
                      >
                        {t("cookies.learn_more", "En savoir plus")}
                      </Link>
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: "0.75rem",
                    borderTop: "1px solid rgba(255, 255, 255, 0.12)",
                    paddingTop: "1.25rem",
                  }}
                >
                  <button
                    onClick={openModal}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      padding: "0.65rem 1.25rem",
                      borderRadius: "999px",
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      color: "rgba(255, 255, 255, 0.9)",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                      e.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                      e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                    }}
                  >
                    <Settings size={16} />
                    {t("cookies.btn_customize", "Personnaliser")}
                  </button>

                  <button
                    onClick={declineAll}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      padding: "0.65rem 1.35rem",
                      borderRadius: "999px",
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.25)",
                      color: "#fff",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.18)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                    }}
                  >
                    {t("cookies.btn_decline", "Tout refuser")}
                  </button>

                  <button
                    onClick={acceptAll}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      padding: "0.65rem 1.5rem",
                      borderRadius: "999px",
                      background: "#F5C92C",
                      border: "none",
                      color: "#1a2e22",
                      fontSize: "0.88rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      boxShadow: "0 4px 14px rgba(245, 201, 44, 0.35)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#e0b520";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#F5C92C";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <Check size={17} />
                    {t("cookies.btn_accept", "Tout accepter")}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cookie Preferences Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 10000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
              background: "rgba(0, 0, 0, 0.75)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{
                background: "#0f2d1d",
                border: "1px solid rgba(245, 201, 44, 0.35)",
                borderRadius: "1.5rem",
                width: "100%",
                maxWidth: "600px",
                maxHeight: "90vh",
                overflowY: "auto",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6)",
                color: "#fff",
                padding: "2rem",
                position: "relative",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1.5rem",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
                  paddingBottom: "1rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <ShieldCheck size={26} style={{ color: "#F5C92C" }} />
                  <div>
                    <h2
                      style={{
                        fontFamily: "'Hobo', sans-serif",
                        fontSize: "1.35rem",
                        color: "#fff",
                        margin: 0,
                      }}
                    >
                      {t("cookies.modal_title", "Centre de préférences des cookies")}
                    </h2>
                    <p style={{ margin: 0, fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.6)" }}>
                      Breizh Backyard Ultra — Conforme RGPD
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "none",
                    color: "rgba(255, 255, 255, 0.7)",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: "0.88rem",
                  color: "rgba(255, 255, 255, 0.8)",
                  lineHeight: "1.6",
                  marginBottom: "1.5rem",
                }}
              >
                {t(
                  "cookies.modal_intro",
                  "Vous pouvez personnaliser vos choix pour chaque catégorie de cookies ci-dessous. Vos choix seront conservés pendant 13 mois et peuvent être modifiés à tout moment."
                )}
              </p>

              {/* Categories list */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
                {/* Essential Cookies */}
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "1rem",
                    padding: "1.25rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <Lock size={18} style={{ color: "#8CBE4F" }} />
                      <h4 style={{ fontSize: "0.98rem", fontWeight: 700, margin: 0, color: "#fff" }}>
                        {t("cookies.cat_essential_title", "Cookies nécessaires (Obligatoires)")}
                      </h4>
                    </div>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        padding: "0.25rem 0.6rem",
                        borderRadius: "999px",
                        background: "rgba(140, 190, 79, 0.2)",
                        color: "#8CBE4F",
                        border: "1px solid rgba(140, 190, 79, 0.4)",
                      }}
                    >
                      {t("cookies.always_active", "Toujours actif")}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.82rem", color: "rgba(255, 255, 255, 0.65)", margin: 0, lineHeight: 1.5 }}>
                    {t(
                      "cookies.cat_essential_desc",
                      "Ces cookies sont indispensables au fonctionnement technique du site, à la sécurité et à la mémorisation de vos préférences de consentement."
                    )}
                  </p>
                </div>

                {/* Analytics / Performance Cookies */}
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "1rem",
                    padding: "1.25rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <BarChart3 size={18} style={{ color: "#F5C92C" }} />
                      <h4 style={{ fontSize: "0.98rem", fontWeight: 700, margin: 0, color: "#fff" }}>
                        {t("cookies.cat_analytics_title", "Mesure d'audience & Performance")}
                      </h4>
                    </div>

                    {/* Toggle Switch */}
                    <label
                      style={{
                        position: "relative",
                        display: "inline-block",
                        width: "48px",
                        height: "26px",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={analyticsToggle}
                        onChange={(e) => setAnalyticsToggle(e.target.checked)}
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          inset: 0,
                          backgroundColor: analyticsToggle ? "#277956" : "rgba(255, 255, 255, 0.2)",
                          borderRadius: "34px",
                          transition: "0.3s",
                          border: analyticsToggle
                            ? "1px solid #8CBE4F"
                            : "1px solid rgba(255, 255, 255, 0.3)",
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            content: '""',
                            height: "20px",
                            width: "20px",
                            left: analyticsToggle ? "23px" : "3px",
                            bottom: "2px",
                            backgroundColor: "#fff",
                            borderRadius: "50%",
                            transition: "0.3s",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                          }}
                        />
                      </span>
                    </label>
                  </div>
                  <p style={{ fontSize: "0.82rem", color: "rgba(255, 255, 255, 0.65)", margin: 0, lineHeight: 1.5 }}>
                    {t(
                      "cookies.cat_analytics_desc",
                      "Permet d'analyser anonymement la fréquentation et la vitesse d'affichage de notre site (Vercel Analytics & Speed Insights) afin d'améliorer la navigation des coureurs et supporters."
                    )}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  borderTop: "1px solid rgba(255, 255, 255, 0.12)",
                  paddingTop: "1.25rem",
                }}
              >
                <Link
                  to="/politique-de-confidentialite"
                  onClick={closeModal}
                  style={{
                    color: "#F5C92C",
                    fontSize: "0.82rem",
                    textDecoration: "underline",
                  }}
                >
                  {t("cookies.read_full_policy", "Consulter la politique de confidentialité")}
                </Link>

                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button
                    onClick={() => savePreferences(analyticsToggle)}
                    style={{
                      padding: "0.65rem 1.3rem",
                      borderRadius: "999px",
                      background: "#F5C92C",
                      border: "none",
                      color: "#1a2e22",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#e0b520";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#F5C92C";
                    }}
                  >
                    {t("cookies.save_selection", "Enregistrer mes choix")}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
