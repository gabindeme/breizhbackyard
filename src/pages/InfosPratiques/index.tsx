import { motion } from "motion/react";
import { MapPin, Utensils, Backpack, BookOpen } from "lucide-react";

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
  return (
    <div style={{ background: "#EFEFEF" }}>
      <PageHeader
        subtitle="Organisation"
        title="Infos Pratiques"
        description="Tout ce que vous devez savoir avant de vous engager dans le Breizh Backyard Ultra. Préparez-vous bien — votre confort dépend de votre organisation."
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
            { anchor: "#acces", label: "Accès & Lieu", icon: MapPin },
            { anchor: "#materiel", label: "Matériel", icon: Backpack },
            { anchor: "#ravitaillement", label: "Ravitaillement", icon: Utensils },
            { anchor: "#reglement", label: "Règlement", icon: BookOpen },
          ].map((item) => (
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
                color: "#277956",
                textDecoration: "none",
                borderRadius: "100px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#277956";
                (e.currentTarget as HTMLElement).style.color = "#fff";
                (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "#277956";
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              }}
            >
              <item.icon size={16} strokeWidth={2.5} />
              {item.label}
            </a>
          ))}
        </motion.div>
      </div>

      <section className="section-light section-py">
        <div className="page-container">
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* ACCÈS & LIEU */}
            <InfoSection id="acces" icon={MapPin} color="#277956" title="Accès & Lieu">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                <div>
                  <h3 style={{ fontWeight: "700", fontSize: "1rem", color: "#1a2e22", marginBottom: "1rem" }}>📍 Localisation</h3>
                  <p style={{ color: "#4a6b56", lineHeight: 1.75, marginBottom: "1rem" }}>
                    Le Breizh Backyard Ultra se déroule en Bretagne, dans un cadre naturel préservé.
                    <strong style={{ color: "#277956" }}> L'adresse exacte sera communiquée</strong> aux inscrits par email avant la course.
                  </p>
                  <div style={{ padding: "1rem", background: "rgba(245,201,44,0.1)", borderRadius: "0.75rem", border: "1px solid rgba(245,201,44,0.3)" }}>
                    <p style={{ margin: 0, fontSize: "0.85rem", color: "#8a6200" }}>
                      ℹ️ Les coordonnées GPS et l'accès détaillé seront partagés dans le pack participant, disponible 2 semaines avant la course.
                    </p>
                  </div>
                </div>
                <div>
                  <h3 style={{ fontWeight: "700", fontSize: "1rem", color: "#1a2e22", marginBottom: "1rem" }}>🚗 Accès & Parking</h3>
                  <CheckItem text="Parking gratuit sur place (nombre de places limitées)" />
                  <CheckItem text="Covoiturage fortement encouragé — forum disponible après inscription" />
                  <CheckItem text="Accès en transport en commun possible (informations à venir)" />
                  <CheckItem text="Signalétique fléchée depuis la route principale" />
                </div>
              </div>
            </InfoSection>

            {/* MATÉRIEL */}
            <InfoSection id="materiel" icon={Backpack} color="#2D9185" title="Matériel & Équipement">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.5rem" }}>
                {[
                  {
                    title: "Obligatoire",
                    color: "#277956",
                    items: [
                      "Dossard officiel (fourni)",
                      "Chaussures de trail (recommandé)",
                      "Vêtements adaptés à la météo",
                      "Lampe frontale (pour la nuit)",
                      "Téléphone portable chargé",
                    ],
                  },
                  {
                    title: "Recommandé",
                    color: "#2D9185",
                    items: [
                      "Tente ou abri pour le camp de base",
                      "Chaise longue / matelas",
                      "Sac de couchage",
                      "Vêtements de rechange (x5 min.)",
                      "Kit de soins / ampoules",
                    ],
                  },
                  {
                    title: "Utile",
                    color: "#8CBE4F",
                    items: [
                      "Bâtons de marche (autorisés)",
                      "Montre GPS",
                      "Casque / écouteurs",
                      "Cache-oreilles / bonnet",
                      "Crème solaire & anti-moustiques",
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
            <InfoSection id="ravitaillement" icon={Utensils} color="#4DA154" title="Ravitaillement">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                <div>
                  <h3 style={{ fontWeight: "700", fontSize: "1rem", color: "#1a2e22", marginBottom: "1rem" }}>✅ Ce qui est fourni</h3>
                  <CheckItem text="Point d'eau potable permanent sur la zone de vie" />
                  <CheckItem text="Fruits frais (bananes, oranges...) entre chaque tour" />
                  <CheckItem text="Bouillons chauds pendant la nuit" />
                  <CheckItem text="Café / thé en continu" />
                </div>
                <div>
                  <h3 style={{ fontWeight: "700", fontSize: "1rem", color: "#1a2e22", marginBottom: "1rem" }}>🎒 À apporter</h3>
                  <CheckItem text="Vos aliments préférés et éprouvés (pas d'expérimentation en course !)" />
                  <CheckItem text="Gels / barres énergétiques selon vos habitudes" />
                  <CheckItem text="Boissons de récupération" />
                  <CheckItem text="Repas complets (pâtes, riz...) pour les longues durées" />
                  <CheckItem text="Thermos personnel conseillé pour la nuit" />
                </div>
              </div>
            </InfoSection>

            {/* RÈGLEMENT */}
            <InfoSection id="reglement" icon={BookOpen} color="#F5C92C" title="Règlement & Format">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                <div>
                  <h4 style={{ fontWeight: "700", fontSize: "0.9rem", color: "#277956", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Règles du format Backyard Ultra
                  </h4>
                  <RuleItem number={1} text="Un tour de 6,706 km doit être complété avant chaque top départ horaire." />
                  <RuleItem number={2} text="Tout coureur qui n'a pas franchi la ligne avant le signal est immédiatement éliminé." />
                  <RuleItem number={3} text="Le vainqueur est le dernier coureur capable de terminer un tour de plus que tous les autres." />
                  <RuleItem number={4} text="Le vainqueur doit effectuer un tour supplémentaire seul pour être officiellement déclaré." variant="warning" />
                </div>
                <div>
                  <h4 style={{ fontWeight: "700", fontSize: "0.9rem", color: "#277956", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Règles spécifiques Breizh BU
                  </h4>
                  <RuleItem number={1} text="Le dossard doit être porté visible à l'avant pendant toute la course." />
                  <RuleItem number={2} text="Tout coureur abandonnant doit signaler son abandon à un membre de l'organisation." />
                  <RuleItem number={3} text="Les accompagnants restent dans la zone de vie — pas d'assistance sur le circuit." />
                  <RuleItem number={4} text="Toute aide extérieure sur le circuit entraîne la disqualification immédiate." variant="warning" />
                  <RuleItem number={5} text="Le règlement complet est disponible dans le pack participant." />
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
