import { motion } from "motion/react";
import { Activity, Timer, Users, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

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

export const Resultats = () => {
  return (
    <div style={{ background: "#EFEFEF", minHeight: "100vh" }}>
      <PageHeader
        subtitle="Édition #1"
        title="Résultats & Suivi Live"
        description="Il n'y a pas encore d'historique de résultats car c'est la toute première édition du Breizh Backyard Ultra."
      />

      <section className="section-light section-py">
        <div className="page-container" style={{ maxWidth: "800px" }}>
          
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              background: "#fff",
              borderRadius: "1.5rem",
              padding: "3rem",
              border: "1.5px solid rgba(39,121,86,0.2)",
              boxShadow: "0 12px 40px rgba(39,121,86,0.08)",
              textAlign: "center",
              position: "relative",
              overflow: "hidden"
            }}
          >
            {/* Background design */}
            <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "150px", height: "150px", background: "rgba(245,201,44,0.1)", borderRadius: "50%" }} />
            
            <div style={{ 
              width: "72px", 
              height: "72px", 
              borderRadius: "50%", 
              background: "rgba(39,121,86,0.1)", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              margin: "0 auto 1.5rem",
              color: "#277956",
              position: "relative"
            }}>
              <Activity size={36} strokeWidth={1.5} />
              <div style={{
                position: "absolute",
                top: "0", right: "0",
                width: "16px", height: "16px",
                background: "#c44",
                borderRadius: "50%",
                border: "3px solid #fff",
                animation: "pulse-ring 2s infinite"
              }} />
            </div>

            <h2 style={{ fontFamily: "'Hobo', sans-serif", fontSize: "2rem", color: "#1a2e22", marginBottom: "1rem" }}>
              Le Suivi Live sera ici !
            </h2>
            
            <p style={{ color: "#4a6b56", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: "600px", margin: "0 auto 2.5rem" }}>
              Le jour de la course, cette page se transformera en <strong>tableau de bord en direct</strong>. 
              Vous pourrez y suivre l'évolution de la course heure par heure, voir les éliminations et soutenir 
              le dernier coureur debout.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "2.5rem", textAlign: "left" }}>
              {[
                { icon: Timer, label: "Temps au tour" },
                { icon: Users, label: "Coureurs en lice" },
                { icon: Trophy, label: "Le vainqueur final" }
              ].map(({ icon: Icon, label }, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "1rem", background: "#f0f4f1", borderRadius: "1rem", border: "1px solid #D0D0D0" }}>
                  <Icon size={20} style={{ color: "#277956" }} />
                  <span style={{ fontSize: "0.9rem", fontWeight: "600", color: "#1a2e22" }}>{label}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
              <Link to="/inscriptions" className="btn-primary" style={{ padding: "0.85rem 2rem" }}>
                Être prévenu de l'ouverture
              </Link>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
};
