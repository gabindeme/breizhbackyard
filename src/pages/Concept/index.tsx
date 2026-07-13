import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Timer, Repeat, AlertTriangle, Trophy, ChevronRight, Clock, Footprints } from "lucide-react";
import { useState } from "react";

const PageHeader = ({ title, subtitle, description }: { title: string; subtitle?: string; description?: string }) => (
  <div
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
  const hours = [0, 1, 2, 3, 4, 5, "...", "N"];
  return (
    <div style={{ overflowX: "auto", paddingBottom: "1rem" }}>
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
                  {isDots ? "." : isLast ? "Vainqueur !" : h === 0 ? "Départ" : `+${h}h`}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { color: "#277956", label: "Top départ toutes les heures" },
            { color: "#F5C92C", label: "Vainqueur = dernier à terminer" },
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
  const faqItems = [
    {
      q: "Que se passe-t-il si je n'arrive pas dans l'heure ?",
      a: "Vous êtes éliminé(e) immédiatement. Si le top départ du tour suivant est donné avant que vous ne franchissiez la ligne d'arrivée, vous ne pouvez pas repartir.",
    },
    {
      q: "Combien de temps peut durer une course ?",
      a: "Personne ne le sait à l'avance ! Le record du monde dépasse les 100 heures, soit plus de 4 jours sans s'arrêter. En pratique, la majorité des courses se terminent entre 24 et 48 heures.",
    },
    {
      q: "Peut-il y avoir plusieurs vainqueurs ?",
      a: "Non. Si tous les coureurs abandonnent au même tour (sans qu'un seul ait pu terminer un tour de plus que les autres), il n'y a pas de vainqueur officiel. Le vainqueur doit toujours effectuer un tour supplémentaire seul.",
    },
    {
      q: "Puis-je dormir entre les tours ?",
      a: "Oui ! Vous disposez d'une fenêtre de temps (variable selon votre rapidité sur le tour) pour vous reposer, manger, vous soigner... C'est là que la gestion de la récupération devient stratégique.",
    },
    {
      q: "Le format est-il adapté aux débutants en ultra ?",
      a: "Le format est accessible à tout le monde — il n'y a pas de seuil technique. Mais il demande une préparation mentale et physique sérieuse, car la durée peut être très longue. Nous conseillons d'avoir déjà couru un trail ou un marathon avant de se lancer.",
    },
  ];

  return (
    <div style={{ background: "#EFEFEF" }}>
      <PageHeader
        subtitle="Le format"
        title="Le Concept Backyard Ultra"
        description="Une épreuve inventée par Gary Cantrell (alias Lazarus Lake) en 2011, dans le Tennessee. Un format unique qui a bouleversé le monde de l'ultra-endurance."
      />

      {/* ============================================================
          LE FORMAT EXPLIQUÉ
          ============================================================ */}
      <section className="section-light section-py">
        <div className="page-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="section-subtitle">Le principe</p>
              <h2 className="section-title" style={{ marginTop: "0.5rem", marginBottom: "1.5rem" }}>
                Simple à comprendre,<br />impossible à maîtriser
              </h2>
              <p style={{ color: "#4a6b56", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                Le principe du Backyard Ultra est d'une simplicité désarmante : boucler un circuit de
                <strong style={{ color: "#277956" }}> 6,706 km </strong> (4,1667 miles —
                soit 100 miles au bout de 24h), et ce toutes les heures, sans exception.
              </p>
              <p style={{ color: "#4a6b56", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                À chaque nouvelle heure, un signal sonore retentit : c'est le top départ. Tous les
                coureurs encore en course repartent ensemble, qu'ils soient frais ou épuisés. Pas de
                départ individuel, pas d'exception.
              </p>
              <p style={{ color: "#4a6b56", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                Si vous n'avez pas terminé votre boucle avant le top départ suivant, <strong style={{ color: "#c44" }}>c'est fini</strong>.
                Vous êtes éliminé(e). Aucune tolérance.
              </p>
              <p style={{ color: "#4a6b56", lineHeight: 1.8 }}>
                La course se poursuit heure après heure, jusqu'à ce qu'il ne reste plus qu'un seul
                coureur capable de boucler un tour supplémentaire. Ce coureur doit ensuite effectuer
                ce tour <strong>seul</strong> pour être déclaré vainqueur officiel — sans cela,
                il n'y a pas de vainqueur.
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
                        6,706 km
                      </div>
                      <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.88rem", marginTop: "0.25rem" }}>
                        par tour — toutes les heures, pile
                      </div>
                    </div>
                  </div>
                </div>

                {[
                  {
                    icon: Repeat,
                    title: "Un tour = une heure",
                    text: "Chaque boucle doit être complétée avant le top départ suivant. Le chronomètre tourne en permanence.",
                  },
                  {
                    icon: AlertTriangle,
                    title: "Pas de vainqueur garanti",
                    text: "Si personne ne peut terminer un tour de plus que les autres, il n'y a officiellement aucun vainqueur.",
                  },
                  {
                    icon: Trophy,
                    title: "Un seul peut gagner",
                    text: "Le vainqueur est le dernier debout — celui qui boucle un tour de plus que tous les autres, seul.",
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
            <p className="section-subtitle">Comprendre le format</p>
            <h2 className="section-title" style={{ marginTop: "0.5rem" }}>
              Une course qui n'a pas de fin prévue
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
              title="Top départ toutes les heures"
              text="Le signal retentit pile à l'heure. Tous les coureurs repartent ensemble, quelles que soient leurs conditions physiques."
              variant="default"
            />
            <RuleCard
              icon={Footprints}
              title="Boucle de 6,706 km exactement"
              text="La distance est standardisée à l'échelle mondiale. Chaque course Backyard Ultra utilise ce même circuit de base."
              variant="success"
            />
            <RuleCard
              icon={AlertTriangle}
              title="Élimination immédiate"
              text="Tout coureur qui n'a pas franchi la ligne d'arrivée avant le top départ suivant est immédiatement éliminé."
              variant="warning"
            />
            <RuleCard
              icon={Trophy}
              title="Le tour du vainqueur"
              text="Pour être déclaré vainqueur officiel, le dernier coureur en lice doit effectuer un tour supplémentaire, seul."
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
            <p className="section-subtitle">Questions fréquentes</p>
            <h2 className="section-title" style={{ marginTop: "0.5rem" }}>
              Vos premières questions
            </h2>
          </div>

          <div className="section-white" style={{ borderRadius: "1.5rem", padding: "2rem 2.5rem", boxShadow: "0 2px 16px rgba(39,121,86,0.08)", border: "1px solid #D0D0D0", marginBottom: "2rem" }}>
            <FaqMini items={faqItems} />
          </div>

          <div style={{ textAlign: "center" }}>
            <Link to="/faq" className="btn-outline">
              Voir toutes les questions <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
