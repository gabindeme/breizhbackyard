import { motion } from "motion/react";
import { MapPin, Mountain, Leaf, Footprints, Sun, Compass, Camera, ExternalLink } from "lucide-react";

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

const terrainFeatures = [
  { icon: Leaf, label: "Sentiers forestiers", desc: "La majorité du tracé serpente sous les frondaisons, offrant une ombre bienvenue et une atmosphère immersive." },
  { icon: Mountain, label: "Terrain varié", desc: "Chemins de terre, petites montées et descentes douces, passages en sous-bois. Accessible mais exigeant sur la durée." },
  { icon: Sun, label: "Exposition lumière", desc: "Quelques portions à découvert permettent de profiter de la lumière naturelle. Pensez à la protection solaire en été." },
  { icon: Footprints, label: "Sol meuble et ferme", desc: "Alternance de sol meuble (terre) et de chemin plus stabilisé. Des chaussures de trail sont recommandées." },
];

export const Parcours = () => {
  const photos = [
    { label: "Sentier forestier", desc: "Votre photo ici" },
    { label: "Vue sur la nature", desc: "Votre photo ici" },
    { label: "Le départ / arrivée", desc: "Votre photo ici" },
    { label: "Zone de vie", desc: "Votre photo ici" },
    { label: "Vue panoramique", desc: "Votre photo ici" },
    { label: "Détail du tracé", desc: "Votre photo ici" },
  ];

  return (
    <div style={{ background: "#EFEFEF" }}>
      <PageHeader
        subtitle="Le circuit"
        title="Le Parcours"
        description="Un tracé de 6,706 km conçu pour le format Backyard Ultra, au cœur de la nature bretonne. Chaque tour est une nouvelle aventure."
      />

      {/* ============================================================
          STATS DU PARCOURS
          ============================================================ */}
      <section className="section-light" style={{ padding: "3rem 0" }}>
        <div className="page-container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1.25rem" }}>
            {[
              { value: "6,706", unit: "km", label: "Distance exacte" },
              { value: "À venir", unit: "", label: "Dénivelé positif" },
              { value: "100%", unit: "", label: "Sentiers nature" },
              { value: "Coral", unit: "", label: "Base entre les tours" },
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <p className="section-subtitle">Le tracé</p>
              <h2 className="section-title" style={{ marginTop: "0.5rem", marginBottom: "1.5rem" }}>
                Présentation du circuit
              </h2>
              <p style={{ color: "#4a6b56", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                Le tracé du Breizh Backyard Ultra a été pensé pour être à la fois beau et équitable
                pour tous les coureurs. Une boucle unique de <strong style={{ color: "#277956" }}>6,706 km</strong>,
                parcourue dans le même sens à chaque tour.
              </p>
              <p style={{ color: "#4a6b56", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                Le départ et l'arrivée sont situés dans la <strong>zone de vie</strong> — le camp de
                base où coureurs et accompagnants se retrouvent entre les boucles. Vous disposez du
                temps non couru (si vous terminez en 45 minutes, vous avez 15 minutes pour récupérer)
                avant le prochain top départ.
              </p>
              <p style={{ color: "#4a6b56", lineHeight: 1.8, marginBottom: "2rem" }}>
                <em style={{ color: "#2D9185" }}>
                  Le détail complet du tracé (carte interactive, profil alti) sera publié prochainement.
                </em>
              </p>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <button className="btn-outline" style={{ cursor: "not-allowed", opacity: 0.6 }}>
                  <MapPin size={16} /> Voir sur Strava (à venir)
                </button>
                <button className="btn-outline" style={{ cursor: "not-allowed", opacity: 0.6 }}>
                  <ExternalLink size={16} /> Télécharger le GPX (à venir)
                </button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
              {/* Carte placeholder */}
              <div
                style={{
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                  border: "1.5px solid #D0D0D0",
                  boxShadow: "0 8px 32px rgba(39,121,86,0.12)",
                }}
              >
                <div
                  style={{
                    background: "linear-gradient(135deg, #2D9185 0%, #277956 50%, #4DA154 100%)",
                    minHeight: "320px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                    color: "rgba(255,255,255,0.8)",
                    padding: "2rem",
                  }}
                >
                  <Compass size={48} style={{ opacity: 0.5 }} />
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontWeight: "700", color: "#fff", fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                      Carte interactive
                    </div>
                    <div style={{ fontSize: "0.85rem" }}>
                      Publication du tracé définitif à venir
                    </div>
                    <div style={{ fontSize: "0.78rem", marginTop: "0.5rem", color: "rgba(255,255,255,0.6)" }}>
                      Intégration Strava / Google Maps / IGN prévue
                    </div>
                  </div>
                </div>
                <div style={{ background: "#fff", padding: "1rem 1.5rem", display: "flex", alignItems: "center", gap: "0.5rem", borderTop: "1px solid #D0D0D0" }}>
                  <MapPin size={14} style={{ color: "#277956" }} />
                  <span style={{ fontSize: "0.82rem", color: "#4a6b56" }}>Parc des Gayeulles, Rennes</span>
                </div>
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
            <p className="section-subtitle">Le terrain</p>
            <h2 className="section-title" style={{ marginTop: "0.5rem" }}>
              Ce que vous trouverez sur le tracé
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            <div>
              <p className="section-subtitle" style={{ color: "#8CBE4F" }}>Entre les tours</p>
              <h2 className="section-title-light" style={{ marginTop: "0.5rem", marginBottom: "1.5rem" }}>
                La zone de vie & camp de base
              </h2>
              <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                Au centre de la boucle se trouve le camp de base : votre QG pendant toute la durée de la course.
                C'est ici que vous revenez après chaque tour pour récupérer, manger, dormir si nécessaire.
              </p>
              <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.8 }}>
                Vous pouvez installer votre propre installation (tente, chaise longue, table...).
                Vos accompagnants, famille et amis peuvent rester dans cette zone pour vous soutenir tout au long de la course.
              </p>
            </div>
            <div>
              <div className="placeholder-img" style={{ minHeight: "280px", borderRadius: "1.25rem" }}>
                <Camera size={36} style={{ opacity: 0.5, position: "relative", zIndex: 1 }} />
                <span style={{ position: "relative", zIndex: 1 }}>📸 Photo de la zone de vie à venir</span>
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
            <p className="section-subtitle">Aperçu</p>
            <h2 className="section-title" style={{ marginTop: "0.5rem" }}>Photos du parcours</h2>
            <p style={{ color: "#4a6b56", marginTop: "0.75rem", fontSize: "0.9rem" }}>
              Les vraies photos seront ajoutées prochainement — emplacements réservés ci-dessous.
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
