import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Timer, Repeat, AlertTriangle, Trophy, ChevronRight, Clock, Footprints } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const PageHeader = ({ title, subtitle, description }: { title: string; subtitle?: string; description?: string }) => (
  <div
    className="page-header-inner"
    style={{
      background: "linear-gradient(135deg, #277956 0%, #1a4d36 60%, #164030 100%)",
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
        backgroundImage: `radial-gradient(circle at 80% 50%, rgba(245,201,44,0.08) 0%, transparent 60%)`,
      }}
    />
    {/* Organic bottom wave */}
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "60px", fill: "#EFEFEF" }}>
        <path d="M0,20 C360,60 720,0 1080,40 C1260,55 1380,25 1440,20 L1440,60 L0,60 Z" />
      </svg>
    </div>

    <div className="page-container" style={{ position: "relative", zIndex: 1 }}>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-subtitle"
          style={{ color: "#8CBE4F", marginBottom: "0.75rem" }}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{ fontFamily: "'Hobo', sans-serif", fontSize: "clamp(2rem, 5vw, 4rem)", color: "#fff", marginBottom: description ? "1rem" : 0 }}
      >
        {title}
      </motion.h1>
      {description && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ color: "rgba(255,255,255,0.75)", maxWidth: "600px", fontSize: "1.05rem", lineHeight: 1.75 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  </div>
);

// Schéma visuel du format
const FormatTimeline = () => {
  const { t } = useTranslation();
  const hours = [0, 1, 2, 3, 4, 5, "...", "N"];
  return (
    <div style={{ overflowX: "auto", paddingBottom: "1rem", maxWidth: "100%" }}>
      <div style={{ minWidth: "600px" }}>
        {/* Timeline track */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "3rem" }}>
          {/* Horizontal line */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "0",
              right: "0",
              height: "3px",
              background: "linear-gradient(90deg, #277956, #F5C92C)",
              transform: "translateY(-50%)",
              borderRadius: "2px",
            }}
          />

          {hours.map((h, i) => {
            const isLast = h === "N";
            const isDots = h === "...";
            return (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", position: "relative", zIndex: 1 }}>
                <div
                  style={{
                    width: isDots ? "auto" : isLast ? "52px" : "44px",
                    height: isDots ? "auto" : isLast ? "52px" : "44px",
                    borderRadius: isDots ? "0" : "50%",
                    background: isDots ? "transparent" : isLast ? "#F5C92C" : "#277956",
                    border: isDots ? "none" : `3px solid ${isLast ? "#e0b520" : "#1a4d36"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: isDots ? "none" : `0 4px 16px rgba(${isLast ? "245,201,44" : "39,121,86"},0.35)`,
                    color: isDots ? "#4a6b56" : "#fff",
                    fontWeight: "700",
                    fontSize: isDots ? "1.5rem" : "0.85rem",
                    fontFamily: isDots ? "inherit" : "'Hobo', sans-serif",
                  }}
                >
                  {isDots ? "···" : isLast ? <Trophy size={20} /> : h === 0 ? <Timer size={18} /> : h}
                </div>
                <div style={{ textAlign: "center", fontSize: "0.72rem", color: isDots ? "transparent" : "#4a6b56", fontWeight: "600", whiteSpace: "nowrap" }}>
                  {isDots ? "." : isLast ? t("concept_page.schema.step_vainqueur") : h === 0 ? t("concept_page.schema.step_depart") : `+${h}h`}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { color: "#277956", label: t("concept_page.schema.legend_depart") },
            { color: "#F5C92C", label: t("concept_page.schema.legend_vainqueur") },
          ].map(({ color, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "#4a6b56" }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: color, flexShrink: 0 }} />
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const RuleCard = ({ icon: Icon, title, text, variant = "default" }: { icon: any; title: string; text: string; variant?: "default" | "warning" | "success" }) => {
  const colors: Record<string, { bg: string; border: string; icon: string }> = {
    default: { bg: "rgba(39,121,86,0.06)", border: "rgba(39,121,86,0.15)", icon: "#277956" },
    warning: { bg: "rgba(245,201,44,0.08)", border: "rgba(245,201,44,0.25)", icon: "#c49000" },
    success: { bg: "rgba(140,190,79,0.08)", border: "rgba(140,190,79,0.25)", icon: "#5a8a25" },
  };
  const c = colors[variant];
  return (
    <div style={{ display: "flex", gap: "1rem", padding: "1.25rem", borderRadius: "1rem", background: c.bg, border: `1.5px solid ${c.border}` }}>
      <div style={{ color: c.icon, flexShrink: 0, marginTop: "2px" }}>
        <Icon size={20} strokeWidth={1.5} />
      </div>
      <div>
        <h4 style={{ fontWeight: "700", fontSize: "0.95rem", color: "#1a2e22", marginBottom: "0.3rem" }}>{title}</h4>
        <p style={{ fontSize: "0.88rem", color: "#4a6b56", lineHeight: 1.7, margin: 0 }}>{text}</p>
      </div>
    </div>
  );
};

// FAQ mini accordion
const FaqMini = ({ items }: { items: { q: string; a: string }[] }) => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div>
      {items.map((item, i) => (
        <div key={i} className={`faq-item ${open === i ? "open" : ""}`}>
          <button className="faq-trigger" onClick={() => setOpen(open === i ? null : i)}>
            {item.q}
            <span className="faq-icon">+</span>
          </button>
          <div className="faq-content">
            <div className="faq-content-inner">{item.a}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const Concept = () => {
  const { t } = useTranslation();
  const faqItems = [
    {
      q: t("concept_page.faq.q1"),
      a: t("concept_page.faq.a1"),
    },
    {
      q: t("concept_page.faq.q2"),
      a: t("concept_page.faq.a2"),
    },
    {
      q: t("concept_page.faq.q3"),
      a: t("concept_page.faq.a3"),
    },
    {
      q: t("concept_page.faq.q4"),
      a: t("concept_page.faq.a4"),
    },
    {
      q: t("concept_page.faq.q5"),
      a: t("concept_page.faq.a5"),
    },
  ];

  return (
    <div style={{ background: "#EFEFEF" }}>
      <PageHeader
        subtitle={t("concept_page.header.subtitle")}
        title={t("concept_page.header.title")}
        description={t("concept_page.header.desc")}
      />

      {/* ============================================================
          LE FORMAT EXPLIQUÉ
          ============================================================ */}
      <section className="section-light section-py">
        <div className="page-container">
          <div className="mobile-grid-1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="section-subtitle">{t("concept_page.principe.subtitle")}</p>
              <h2 className="section-title" style={{ marginTop: "0.5rem", marginBottom: "1.5rem" }}>
                {t("concept_page.principe.title_line1")}<br />{t("concept_page.principe.title_line2")}
              </h2>
              <p style={{ color: "#4a6b56", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                {t("concept_page.principe.desc1_start")}
                <strong style={{ color: "#277956" }}>{t("concept_page.principe.desc1_bold")}</strong>
                {t("concept_page.principe.desc1_end")}
              </p>
              <p style={{ color: "#4a6b56", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                {t("concept_page.principe.desc2")}
              </p>
              <p style={{ color: "#4a6b56", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                {t("concept_page.principe.desc3_start")}<strong style={{ color: "#c44" }}>{t("concept_page.principe.desc3_bold")}</strong>{t("concept_page.principe.desc3_end")}
              </p>
              <p style={{ color: "#4a6b56", lineHeight: 1.8 }}>
                {t("concept_page.principe.desc4_start")}<strong>{t("concept_page.principe.desc4_bold")}</strong>{t("concept_page.principe.desc4_end")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              {/* Visual info cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div
                  style={{
                    padding: "1.5rem",
                    borderRadius: "1.25rem",
                    background: "linear-gradient(135deg, #277956 0%, #1a4d36 100%)",
                    color: "#fff",
                  }}
                >
                  <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <Clock size={28} style={{ color: "#F5C92C", flexShrink: 0, marginTop: "2px" }} />
                    <div>
                      <div style={{ fontFamily: "'Hobo', sans-serif", fontSize: "2rem", color: "#F5C92C", lineHeight: 1 }}>
                        {t("concept_page.cards.km")}
                      </div>
                      <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.88rem", marginTop: "0.25rem" }}>
                        {t("concept_page.cards.km_desc")}
                      </div>
                    </div>
                  </div>
                </div>

                {[
                  {
                    icon: Repeat,
                    title: t("concept_page.cards.c1_title"),
                    text: t("concept_page.cards.c1_text"),
                  },
                  {
                    icon: AlertTriangle,
                    title: t("concept_page.cards.c2_title"),
                    text: t("concept_page.cards.c2_text"),
                  },
                  {
                    icon: Trophy,
                    title: t("concept_page.cards.c3_title"),
                    text: t("concept_page.cards.c3_text"),
                  },
                ].map((card, i) => (
                  <div key={i} className="bbu-card" style={{ display: "flex", gap: "1rem" }}>
                    <card.icon size={20} strokeWidth={1.5} style={{ color: "#277956", flexShrink: 0, marginTop: "2px" }} />
                    <div>
                      <h4 style={{ fontWeight: "700", margin: "0 0 0.35rem", fontSize: "0.95rem" }}>{card.title}</h4>
                      <p style={{ margin: 0, fontSize: "0.88rem", color: "#4a6b56", lineHeight: 1.6 }}>{card.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SCHÉMA VISUEL
          ============================================================ */}
      <section className="section-white section-py">
        <div className="page-container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p className="section-subtitle">{t("concept_page.schema.subtitle")}</p>
            <h2 className="section-title" style={{ marginTop: "0.5rem" }}>
              {t("concept_page.schema.title")}
            </h2>
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: "1.5rem",
              padding: "2.5rem",
              border: "1.5px solid #D0D0D0",
              boxShadow: "0 4px 24px rgba(39,121,86,0.08)",
              marginBottom: "3rem",
            }}
          >
            <FormatTimeline />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
            <RuleCard
              icon={Timer}
              title={t("concept_page.rules.r1_title")}
              text={t("concept_page.rules.r1_text")}
              variant="default"
            />
            <RuleCard
              icon={Footprints}
              title={t("concept_page.rules.r2_title")}
              text={t("concept_page.rules.r2_text")}
              variant="success"
            />
            <RuleCard
              icon={AlertTriangle}
              title={t("concept_page.rules.r3_title")}
              text={t("concept_page.rules.r3_text")}
              variant="warning"
            />
            <RuleCard
              icon={Trophy}
              title={t("concept_page.rules.r4_title")}
              text={t("concept_page.rules.r4_text")}
              variant="default"
            />
          </div>
        </div>
      </section>

      {/* ============================================================
          FAQ COURTE
          ============================================================ */}
      <section className="section-light section-py">
        <div className="page-container" style={{ maxWidth: "800px" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p className="section-subtitle">{t("concept_page.faq.subtitle")}</p>
            <h2 className="section-title" style={{ marginTop: "0.5rem" }}>
              {t("concept_page.faq.title")}
            </h2>
          </div>

          <div className="section-white" style={{ borderRadius: "1.5rem", padding: "2rem 2.5rem", boxShadow: "0 2px 16px rgba(39,121,86,0.08)", border: "1px solid #D0D0D0", marginBottom: "2rem" }}>
            <FaqMini items={faqItems} />
          </div>

          <div style={{ textAlign: "center" }}>
            <Link to="/faq" className="btn-outline">
              {t("concept_page.faq.btn")} <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
