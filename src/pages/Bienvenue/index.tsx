import { motion } from "motion/react";
import { CheckCircle, Compass, MapPin, Info, ArrowRight, Sparkles, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Bienvenue = () => {
  const { t } = useTranslation();

  return (
    <div style={{ background: "#EFEFEF", minHeight: "100vh" }}>
      {/* Header Héro */}
      <div
        className="page-header-inner"
        style={{
          background: "linear-gradient(135deg, #277956 0%, #1a4d36 60%, #164030 100%)",
          paddingTop: "8rem",
          paddingBottom: "6rem",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(circle at 50% 40%, rgba(245,201,44,0.12) 0%, transparent 60%)`,
          }}
        />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "60px", fill: "#EFEFEF" }}>
            <path d="M0,20 C360,60 720,0 1080,40 C1260,55 1380,25 1440,20 L1440,60 L0,60 Z" />
          </svg>
        </div>

        <div className="page-container" style={{ position: "relative", zIndex: 1, maxWidth: "800px" }}>
          {/* Badge confirmation */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "rgba(245,201,44,0.2)",
              border: "2px solid #F5C92C",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem",
              boxShadow: "0 0 30px rgba(245,201,44,0.3)",
            }}
          >
            <CheckCircle size={44} style={{ color: "#F5C92C" }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.4rem 1rem",
              borderRadius: "9999px",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#8CBE4F",
              fontSize: "0.85rem",
              fontWeight: "600",
              marginBottom: "1rem",
            }}
          >
            <Sparkles size={16} /> {t("bienvenue_page.badge")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              fontFamily: "'Hobo', sans-serif",
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              color: "#fff",
              marginBottom: "1rem",
              lineHeight: 1.15,
            }}
          >
            {t("bienvenue_page.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
              lineHeight: 1.7,
              maxWidth: "680px",
              margin: "0 auto",
            }}
          >
            {t("bienvenue_page.subtitle")}
          </motion.p>
        </div>
      </div>

      {/* Contenu principal */}
      <section className="section-light section-py">
        <div className="page-container" style={{ maxWidth: "1000px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "3rem" }}
          >
            <h2 className="section-title" style={{ marginBottom: "0.75rem" }}>
              {t("bienvenue_page.explore_title")}
            </h2>
            <p style={{ color: "#4a6b56", fontSize: "1.05rem", maxWidth: "600px", margin: "0 auto" }}>
              {t("bienvenue_page.explore_desc")}
            </p>
          </motion.div>

          {/* Cartes d'action */}
          <div
            className="mobile-grid-1"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5rem",
              marginBottom: "3.5rem",
            }}
          >
            {/* Carte Concept */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bbu-card"
              style={{
                background: "#fff",
                borderRadius: "1.25rem",
                padding: "2rem 1.5rem",
                border: "1.5px solid #D0D0D0",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              }}
            >
              <div>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "0.75rem",
                    background: "rgba(39,121,86,0.1)",
                    color: "#277956",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.25rem",
                  }}
                >
                  <Compass size={24} />
                </div>
                <h3 style={{ fontFamily: "'Hobo', sans-serif", fontSize: "1.3rem", color: "#1a2e22", marginBottom: "0.75rem" }}>
                  {t("bienvenue_page.card_concept_title")}
                </h3>
                <p style={{ color: "#4a6b56", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                  {t("bienvenue_page.card_concept_desc")}
                </p>
              </div>
              <Link to="/concept" className="btn-outline" style={{ justifyContent: "center", width: "100%" }}>
                {t("bienvenue_page.card_concept_btn")} <ArrowRight size={16} style={{ marginLeft: "0.4rem" }} />
              </Link>
            </motion.div>

            {/* Carte Parcours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bbu-card"
              style={{
                background: "#fff",
                borderRadius: "1.25rem",
                padding: "2rem 1.5rem",
                border: "1.5px solid #D0D0D0",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              }}
            >
              <div>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "0.75rem",
                    background: "rgba(45,145,133,0.1)",
                    color: "#2D9185",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.25rem",
                  }}
                >
                  <MapPin size={24} />
                </div>
                <h3 style={{ fontFamily: "'Hobo', sans-serif", fontSize: "1.3rem", color: "#1a2e22", marginBottom: "0.75rem" }}>
                  {t("bienvenue_page.card_parcours_title")}
                </h3>
                <p style={{ color: "#4a6b56", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                  {t("bienvenue_page.card_parcours_desc")}
                </p>
              </div>
              <Link to="/parcours" className="btn-outline" style={{ justifyContent: "center", width: "100%" }}>
                {t("bienvenue_page.card_parcours_btn")} <ArrowRight size={16} style={{ marginLeft: "0.4rem" }} />
              </Link>
            </motion.div>

            {/* Carte Infos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bbu-card"
              style={{
                background: "#fff",
                borderRadius: "1.25rem",
                padding: "2rem 1.5rem",
                border: "1.5px solid #D0D0D0",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              }}
            >
              <div>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "0.75rem",
                    background: "rgba(245,201,44,0.15)",
                    color: "#8a6200",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.25rem",
                  }}
                >
                  <Info size={24} />
                </div>
                <h3 style={{ fontFamily: "'Hobo', sans-serif", fontSize: "1.3rem", color: "#1a2e22", marginBottom: "0.75rem" }}>
                  {t("bienvenue_page.card_infos_title")}
                </h3>
                <p style={{ color: "#4a6b56", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                  {t("bienvenue_page.card_infos_desc")}
                </p>
              </div>
              <Link to="/infos-pratiques" className="btn-outline" style={{ justifyContent: "center", width: "100%" }}>
                {t("bienvenue_page.card_infos_btn")} <ArrowRight size={16} style={{ marginLeft: "0.4rem" }} />
              </Link>
            </motion.div>
          </div>

          {/* Banner réassurance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{
              background: "linear-gradient(135deg, #277956 0%, #1a4d36 100%)",
              borderRadius: "1.5rem",
              padding: "2.5rem 2rem",
              color: "#fff",
              textAlign: "center",
              boxShadow: "0 8px 30px rgba(39,121,86,0.15)",
            }}
          >
            <Heart size={32} style={{ color: "#F5C92C", margin: "0 auto 1rem" }} />
            <h3 style={{ fontFamily: "'Hobo', sans-serif", fontSize: "1.6rem", color: "#fff", marginBottom: "0.75rem" }}>
              {t("bienvenue_page.banner_title")}
            </h3>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.95rem", maxWidth: "600px", margin: "0 auto 1.5rem", lineHeight: 1.6 }}>
              {t("bienvenue_page.banner_desc")}
            </p>
            <Link to="/" className="btn-primary" style={{ background: "#F5C92C", color: "#1a2e22", padding: "0.75rem 2rem", fontWeight: "700" }}>
              {t("bienvenue_page.btn_home")}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
