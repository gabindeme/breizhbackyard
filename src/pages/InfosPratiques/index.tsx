import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { MapPin, Utensils, Backpack, BookOpen } from "lucide-react";
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

const InfoSection = ({ id, icon: Icon, color, title, children }: { id: string; icon: any; color: string; title: string; children: React.ReactNode }) => (
  <motion.div
    id={id}
    className="bbu-card"
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    style={{ padding: "2.5rem", scrollMarginTop: "180px" }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.75rem" }}>
      <div style={{ width: "52px", height: "52px", borderRadius: "1rem", background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center", color, flexShrink: 0, border: `1.5px solid ${color}25` }}>
        <Icon size={24} strokeWidth={1.5} />
      </div>
      <h2 style={{ fontFamily: "'Hobo', sans-serif", fontSize: "1.5rem", color: "#1a2e22", margin: 0 }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

const CheckItem = ({ text }: { text: string }) => (
  <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", marginBottom: "0.6rem" }}>
    <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#277956", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
      <span style={{ color: "#fff", fontSize: "0.65rem", fontWeight: "800" }}>✓</span>
    </div>
    <span style={{ color: "#4a6b56", fontSize: "0.92rem", lineHeight: 1.6 }}>{text}</span>
  </div>
);

const RuleItem = ({ number, text, variant = "default" }: { number: number; text: string; variant?: "default" | "warning" }) => (
  <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1rem" }}>
    <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: variant === "warning" ? "#F5C92C" : "#277956", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: variant === "warning" ? "#1a2e22" : "#fff", fontWeight: "700", fontSize: "0.78rem" }}>
      {number}
    </div>
    <p style={{ margin: 0, color: "#4a6b56", fontSize: "0.92rem", lineHeight: 1.7 }}>{text}</p>
  </div>
);

export const InfosPratiques = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -50% 0px" }
    );

    const sectionIds = ["acces", "materiel", "ravitaillement", "reglement"];
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    sections.forEach((s) => observer.observe(s as Element));

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ background: "#EFEFEF" }}>
      <PageHeader
        subtitle={t("infos_page.header.subtitle")}
        title={t("infos_page.header.title")}
        description={t("infos_page.header.desc")}
      />

      {/* Quick nav */}
      <div style={{ position: "sticky", top: "85px", zIndex: 50, padding: "1.5rem 1rem", display: "flex", justifyContent: "center", pointerEvents: "none" }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(39, 121, 86, 0.2)",
            borderRadius: "100px",
            boxShadow: "0 10px 40px rgba(39, 121, 86, 0.12)",
            padding: "0.4rem",
            display: "inline-flex",
            gap: "0.25rem",
            overflowX: "auto",
            maxWidth: "100%",
            pointerEvents: "auto",
            scrollbarWidth: "none"
          }}
          className="no-scrollbar"
        >
          {[
            { anchor: "#acces", label: t("infos_page.nav.acces"), icon: MapPin },
            { anchor: "#materiel", label: t("infos_page.nav.materiel"), icon: Backpack },
            { anchor: "#ravitaillement", label: t("infos_page.nav.ravitaillement"), icon: Utensils },
            { anchor: "#reglement", label: t("infos_page.nav.reglement"), icon: BookOpen },
          ].map((item) => {
            const isActive = activeSection === item.anchor.substring(1);
            return (
              <a
                key={item.anchor}
                href={item.anchor}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1.25rem",
                  fontSize: "0.85rem",
                  fontWeight: "700",
                  color: isActive ? "#fff" : "#277956",
                  background: isActive ? "#277956" : "transparent",
                  textDecoration: "none",
                  borderRadius: "100px",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background = "rgba(39, 121, 86, 0.1)";
                    (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  }
                }}
              >
                <item.icon size={16} strokeWidth={2.5} />
                {item.label}
              </a>
            );
          })}
        </motion.div>
      </div>

      <section className="section-light section-py">
        <div className="page-container">
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* ACCÈS & LIEU */}
            <InfoSection id="acces" icon={MapPin} color="#277956" title={t("infos_page.acces.title")}>
              <div className="mobile-grid-1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                <div>
                  <h3 style={{ fontWeight: "700", fontSize: "1rem", color: "#1a2e22", marginBottom: "1rem" }}>{t("infos_page.acces.loc_title")}</h3>
                  <p style={{ color: "#4a6b56", lineHeight: 1.75, marginBottom: "1rem" }}>
                    {t("infos_page.acces.loc_p1_start")}
                    <strong style={{ color: "#277956" }}>{t("infos_page.acces.loc_p1_bold")}</strong>
                    {t("infos_page.acces.loc_p1_end")}
                  </p>
                  <div style={{ padding: "1rem", background: "rgba(245,201,44,0.1)", borderRadius: "0.75rem", border: "1px solid rgba(245,201,44,0.3)" }}>
                    <p style={{ margin: 0, fontSize: "0.85rem", color: "#8a6200" }}>
                      {t("infos_page.acces.loc_info")}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 style={{ fontWeight: "700", fontSize: "1rem", color: "#1a2e22", marginBottom: "1rem" }}>{t("infos_page.acces.parking_title")}</h3>
                  <CheckItem text={t("infos_page.acces.p1")} />
                  <CheckItem text={t("infos_page.acces.p2")} />
                  <CheckItem text={t("infos_page.acces.p3")} />
                  <CheckItem text={t("infos_page.acces.p4")} />
                </div>
              </div>
            </InfoSection>

            {/* MATÉRIEL */}
            <InfoSection id="materiel" icon={Backpack} color="#2D9185" title={t("infos_page.materiel.title")}>
              <div className="mobile-grid-1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.5rem" }}>
                {[
                  {
                    title: t("infos_page.materiel.ob_title"),
                    color: "#277956",
                    items: [
                      t("infos_page.materiel.ob1"),
                      t("infos_page.materiel.ob2"),
                      t("infos_page.materiel.ob3"),
                      t("infos_page.materiel.ob4"),
                      t("infos_page.materiel.ob5"),
                    ],
                  },
                  {
                    title: t("infos_page.materiel.rec_title"),
                    color: "#2D9185",
                    items: [
                      t("infos_page.materiel.rec1"),
                      t("infos_page.materiel.rec2"),
                      t("infos_page.materiel.rec3"),
                      t("infos_page.materiel.rec4"),
                      t("infos_page.materiel.rec5"),
                    ],
                  },
                  {
                    title: t("infos_page.materiel.ut_title"),
                    color: "#8CBE4F",
                    items: [
                      t("infos_page.materiel.ut1"),
                      t("infos_page.materiel.ut2"),
                      t("infos_page.materiel.ut3"),
                      t("infos_page.materiel.ut4"),
                      t("infos_page.materiel.ut5"),
                    ],
                  },
                ].map((col) => (
                  <div key={col.title}>
                    <div style={{ fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.07em", textTransform: "uppercase", color: col.color, marginBottom: "0.75rem" }}>
                      {col.title}
                    </div>
                    {col.items.map((item) => <CheckItem key={item} text={item} />)}
                  </div>
                ))}
              </div>
            </InfoSection>

            {/* RAVITAILLEMENT */}
            <InfoSection id="ravitaillement" icon={Utensils} color="#4DA154" title={t("infos_page.ravitaillement.title")}>
              <div className="mobile-grid-1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                <div>
                  <h3 style={{ fontWeight: "700", fontSize: "1rem", color: "#1a2e22", marginBottom: "1rem" }}>{t("infos_page.ravitaillement.fourni_title")}</h3>
                  <CheckItem text={t("infos_page.ravitaillement.f1")} />
                  <CheckItem text={t("infos_page.ravitaillement.f2")} />
                  <CheckItem text={t("infos_page.ravitaillement.f3")} />
                  <CheckItem text={t("infos_page.ravitaillement.f4")} />
                </div>
                <div>
                  <h3 style={{ fontWeight: "700", fontSize: "1rem", color: "#1a2e22", marginBottom: "1rem" }}>{t("infos_page.ravitaillement.apporter_title")}</h3>
                  <CheckItem text={t("infos_page.ravitaillement.a1")} />
                  <CheckItem text={t("infos_page.ravitaillement.a2")} />
                  <CheckItem text={t("infos_page.ravitaillement.a3")} />
                  <CheckItem text={t("infos_page.ravitaillement.a4")} />
                  <CheckItem text={t("infos_page.ravitaillement.a5")} />
                </div>
              </div>
            </InfoSection>

            {/* RÈGLEMENT */}
            <InfoSection id="reglement" icon={BookOpen} color="#F5C92C" title={t("infos_page.reglement.title")}>
              <div className="mobile-grid-1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                <div>
                  <h4 style={{ fontWeight: "700", fontSize: "0.9rem", color: "#277956", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {t("infos_page.reglement.r_bu_title")}
                  </h4>
                  <RuleItem number={1} text={t("infos_page.reglement.r1")} />
                  <RuleItem number={2} text={t("infos_page.reglement.r2")} />
                  <RuleItem number={3} text={t("infos_page.reglement.r3")} />
                  <RuleItem number={4} text={t("infos_page.reglement.r4")} variant="warning" />
                </div>
                <div>
                  <h4 style={{ fontWeight: "700", fontSize: "0.9rem", color: "#277956", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {t("infos_page.reglement.r_breizh_title")}
                  </h4>
                  <RuleItem number={1} text={t("infos_page.reglement.br1")} />
                  <RuleItem number={2} text={t("infos_page.reglement.br2")} />
                  <RuleItem number={3} text={t("infos_page.reglement.br3")} />
                  <RuleItem number={4} text={t("infos_page.reglement.br4")} variant="warning" />
                  <RuleItem number={5} text={t("infos_page.reglement.br5")} />
                </div>
              </div>
            </InfoSection>

            {/* SÉCURITÉ */}
            {/*
            <InfoSection id="securite" icon={Shield} color="#277956" title="Sécurité & Assistance">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                <div>
                  <h3 style={{ fontWeight: "700", fontSize: "1rem", color: "#1a2e22", marginBottom: "1rem" }}>
                    🏥 Assistance médicale
                  </h3>
                  <CheckItem text="Équipe médicale présente 24h/24 pendant toute la durée de la course" />
                  <CheckItem text="Point de secours visible et signalisé sur la zone de vie" />
                  <CheckItem text="Protocole d'arrêt médical défini et communiqué avant la course" />
                  <CheckItem text="Balisage lumineux du circuit la nuit" />
                </div>
                <div>
                  <h3 style={{ fontWeight: "700", fontSize: "1rem", color: "#1a2e22", marginBottom: "1rem" }}>
                    📞 Contacts urgence
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {[
                      { label: "Direction de course", value: "À venir", icon: Phone },
                      { label: "Médecin de course", value: "À venir", icon: Heart },
                      { label: "SAMU (urgences)", value: "15", icon: Shield },
                    ].map(({ label, value, icon: Icon }) => (
                      <div key={label} style={{ display: "flex", gap: "0.75rem", alignItems: "center", padding: "0.75rem", borderRadius: "0.625rem", background: "rgba(39,121,86,0.06)", border: "1px solid rgba(39,121,86,0.12)" }}>
                        <Icon size={16} style={{ color: "#277956", flexShrink: 0 }} />
                        <div>
                          <div style={{ fontSize: "0.75rem", color: "#4a6b56", fontWeight: "600" }}>{label}</div>
                          <div style={{ fontSize: "0.95rem", fontWeight: "700", color: "#1a2e22" }}>{value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </InfoSection>
*/}
          </div>
        </div>
      </section>
    </div>
  );
};
