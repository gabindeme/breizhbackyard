import { motion } from "motion/react";
import { useEffect } from "react";
import { Mountain, Leaf, Footprints, Sun, Camera, ExternalLink } from "lucide-react";
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

export const Parcours = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const oldScript = document.getElementById("strava-embed-script");
    if (oldScript) oldScript.remove();
    
    const script = document.createElement("script");
    script.id = "strava-embed-script";
    script.src = "https://strava-embeds.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const s = document.getElementById("strava-embed-script");
      if (s) s.remove();
    };
  }, []);

  const terrainFeatures = [
    { icon: Leaf, label: t("parcours_page.terrainFeatures.f1_label"), desc: t("parcours_page.terrainFeatures.f1_desc") },
    { icon: Mountain, label: t("parcours_page.terrainFeatures.f2_label"), desc: t("parcours_page.terrainFeatures.f2_desc") },
    { icon: Sun, label: t("parcours_page.terrainFeatures.f3_label"), desc: t("parcours_page.terrainFeatures.f3_desc") },
    { icon: Footprints, label: t("parcours_page.terrainFeatures.f4_label"), desc: t("parcours_page.terrainFeatures.f4_desc") },
  ];

  const photos = [
    { label: t("parcours_page.galerie.p1_label"), desc: t("parcours_page.galerie.p1_desc") },
    { label: t("parcours_page.galerie.p2_label"), desc: t("parcours_page.galerie.p2_desc") },
    { label: t("parcours_page.galerie.p3_label"), desc: t("parcours_page.galerie.p3_desc") },
    { label: t("parcours_page.galerie.p4_label"), desc: t("parcours_page.galerie.p4_desc") },
    { label: t("parcours_page.galerie.p5_label"), desc: t("parcours_page.galerie.p5_desc") },
    { label: t("parcours_page.galerie.p6_label"), desc: t("parcours_page.galerie.p6_desc") },
  ];

  return (
    <div style={{ background: "#EFEFEF" }}>
      <PageHeader
        subtitle={t("parcours_page.header.subtitle")}
        title={t("parcours_page.header.title")}
        description={t("parcours_page.header.desc")}
      />

      {/* ============================================================
          STATS DU PARCOURS
          ============================================================ */}
      <section className="section-light" style={{ padding: "3rem 0" }}>
        <div className="page-container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1.25rem" }}>
            {[
              { value: t("parcours_page.stats.s1_val"), unit: t("parcours_page.stats.s1_unit"), label: t("parcours_page.stats.s1_label") },
              { value: t("parcours_page.stats.s2_val"), unit: t("parcours_page.stats.s2_unit"), label: t("parcours_page.stats.s2_label") },
              { value: t("parcours_page.stats.s3_val"), unit: t("parcours_page.stats.s3_unit"), label: t("parcours_page.stats.s3_label") },
              { value: t("parcours_page.stats.s4_val"), unit: t("parcours_page.stats.s4_unit"), label: t("parcours_page.stats.s4_label") },
            ].map((s) => (
              <div key={s.label} className="bbu-card" style={{ textAlign: "center", padding: "1.5rem 1rem" }}>
                <div style={{ fontFamily: "'Hobo', sans-serif", fontSize: "1.8rem", color: "#277956", lineHeight: 1 }}>
                  {s.value}<span style={{ fontSize: "1rem" }}>{s.unit}</span>
                </div>
                <div style={{ fontSize: "0.8rem", color: "#4a6b56", fontWeight: "600", marginTop: "0.4rem" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          DESCRIPTION + CARTE
          ============================================================ */}
      <section className="section-white section-py">
        <div className="page-container">
          <div className="mobile-grid-1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <p className="section-subtitle">{t("parcours_page.description.subtitle")}</p>
              <h2 className="section-title" style={{ marginTop: "0.5rem", marginBottom: "1.5rem" }}>
                {t("parcours_page.description.title")}
              </h2>
              <p style={{ color: "#4a6b56", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                {t("parcours_page.description.p1_start")}<strong style={{ color: "#277956" }}>{t("parcours_page.description.p1_bold")}</strong>{t("parcours_page.description.p1_end")}
              </p>
              <p style={{ color: "#4a6b56", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                {t("parcours_page.description.p2_start")}<strong>{t("parcours_page.description.p2_bold")}</strong>{t("parcours_page.description.p2_end")}
              </p>
              <p style={{ color: "#4a6b56", lineHeight: 1.8, marginBottom: "2rem" }}>
                <em style={{ color: "#2D9185" }}>
                  {t("parcours_page.description.p3")}
                </em>
              </p>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <a
                  href="https://www.strava.com/routes/3511871122974369520/export_gpx"
                  download
                  className="btn-outline"
                >
                  <ExternalLink size={16} />{t("parcours_page.description.btn_gpx")}
                </a>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
              {/* Carte Strava Embed */}
              <div
                style={{
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                  border: "1.5px solid #D0D0D0",
                  boxShadow: "0 8px 32px rgba(39,121,86,0.12)",
                  background: "#fff",
                  minHeight: "400px",
                }}
              >
                <div 
                  className="strava-embed-placeholder" 
                  data-embed-type="route" 
                  data-embed-id="3511871122974369520" 
                  data-hide-elevation="true"
                  data-style="standard" 
                  data-terrain="2d" 
                  data-map-hash="13.13/48.1345/-1.6449" 
                  data-from-embed="true" 
                  data-token="IOn6tL0nyVGfAaWdqoU2QCEpLxwZJ5Jue1GI8U8s7JI"
                ></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          TERRAIN
          ============================================================ */}
      <section className="section-light section-py">
        <div className="page-container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p className="section-subtitle">{t("parcours_page.terrain.subtitle")}</p>
            <h2 className="section-title" style={{ marginTop: "0.5rem" }}>
              {t("parcours_page.terrain.title")}
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
            {terrainFeatures.map((f, i) => (
              <motion.div
                key={i}
                className="bbu-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div style={{ width: "44px", height: "44px", borderRadius: "0.75rem", background: "rgba(39,121,86,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                  <f.icon size={20} strokeWidth={1.5} style={{ color: "#277956" }} />
                </div>
                <h3 style={{ fontWeight: "700", fontSize: "1rem", color: "#1a2e22", marginBottom: "0.5rem" }}>{f.label}</h3>
                <p style={{ fontSize: "0.88rem", color: "#4a6b56", lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          ZONE DE VIE
          ============================================================ */}
      <section className="section-dark section-py">
        <div className="page-container">
          <div className="mobile-grid-1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            <div>
              <p className="section-subtitle" style={{ color: "#8CBE4F" }}>{t("parcours_page.zone_vie.subtitle")}</p>
              <h2 className="section-title-light" style={{ marginTop: "0.5rem", marginBottom: "1.5rem" }}>
                {t("parcours_page.zone_vie.title")}
              </h2>
              <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                {t("parcours_page.zone_vie.p1")}
              </p>
              <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.8 }}>
                {t("parcours_page.zone_vie.p2")}
              </p>
            </div>
            <div>
              <div className="placeholder-img" style={{ minHeight: "280px", borderRadius: "1.25rem" }}>
                <Camera size={36} style={{ opacity: 0.5, position: "relative", zIndex: 1 }} />
                <span style={{ position: "relative", zIndex: 1 }}>{t("parcours_page.zone_vie.placeholder")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          GALERIE TERRAIN
          ============================================================ */}
      <section className="section-white section-py">
        <div className="page-container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p className="section-subtitle">{t("parcours_page.galerie.subtitle")}</p>
            <h2 className="section-title" style={{ marginTop: "0.5rem" }}>{t("parcours_page.galerie.title")}</h2>
            <p style={{ color: "#4a6b56", marginTop: "0.75rem", fontSize: "0.9rem" }}>
              {t("parcours_page.galerie.desc")}
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
            {photos.map((photo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="placeholder-img"
                style={{ minHeight: "200px", cursor: "pointer", borderRadius: "1rem" }}
              >
                <Camera size={28} style={{ opacity: 0.4, position: "relative", zIndex: 1 }} />
                <span style={{ position: "relative", zIndex: 1, fontWeight: "600", fontSize: "0.85rem" }}>{photo.label}</span>
                <span style={{ position: "relative", zIndex: 1, fontSize: "0.72rem" }}>{photo.desc}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
