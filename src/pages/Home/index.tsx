import Aurora from "@/components/Aurora";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/customs/navbar";
import { Footer } from "@/components/customs/footer";
import { Countdown } from "@/components/customs/countdown";
import {
  Timer,
  Footprints,
  Users,
  MapPin,
  ChevronRight,
  Trophy,
  Mountain,
  Wind,
  Leaf,
} from "lucide-react";

// Hook pour l'animation au scroll
const useReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
};

// Hook pour compteur animé
const useCounter = (target: number, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const start = () => { if (!started) setStarted(true); };
  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const inc = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += inc;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target, duration]);
  return { count, start };
};

const ConceptCard = ({ icon: Icon, title, text, color }: { icon: any; title: string; text: string; color: string }) => (
  <div className="bbu-card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
    <div
      style={{
        width: "52px", height: "52px",
        borderRadius: "0.875rem",
        background: `${color}18`,
        border: `1.5px solid ${color}30`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color,
      }}
    >
      <Icon size={22} strokeWidth={1.5} />
    </div>
    <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#1a2e22", margin: 0 }}>{title}</h3>
    <p style={{ fontSize: "0.9rem", color: "#4a6b56", lineHeight: 1.7, margin: 0 }}>{text}</p>
  </div>
);

const StatCard = ({ number, suffix, label, desc }: { number: number; suffix: string; label: string; desc: string }) => {
  const { ref, visible } = useReveal();
  const { count, start } = useCounter(number);
  useEffect(() => { if (visible) start(); }, [visible]);
  return (
    <div
      ref={ref}
      style={{
        textAlign: "center",
        padding: "2rem 1rem",
        borderRadius: "1.25rem",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="stat-number">
        {count}{suffix}
      </div>
      <div style={{ fontWeight: "700", fontSize: "1rem", color: "#fff", marginTop: "0.4rem" }}>{label}</div>
      <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.55)", marginTop: "0.25rem" }}>{desc}</div>
    </div>
  );
};

export const Home = () => {
  const { ref: conceptRef, visible: conceptVisible } = useReveal();
  const { ref: parcours, visible: parcoursVisible } = useReveal();
  const { ref: ctaRef, visible: ctaVisible } = useReveal();

  return (
    <div style={{ background: "#EFEFEF" }}>
      {/* ============================================================
          HERO — Aurora pleine page
          ============================================================ */}
      <section
        style={{
          position: "relative",
          height: "100dvh",
          minHeight: "600px",
          overflow: "hidden",
          background: "#0a1a0f",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar />

        {/* Aurora background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
          }}
        >
          <Aurora
            colorStops={["#F5C92C", "#8CBE4F", "#277956", "#2D9185"]}
            amplitude={1.2}
            blend={0.45}
          />
        </div>

        {/* Dark overlay for text readability */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(10,26,15,0.3) 0%, rgba(10,26,15,0.6) 60%, #0a1a0f 100%)",
          }}
        />

        {/* Hero content */}
        <div
          style={{
            position: "relative",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "2rem 1.5rem",
            zIndex: 10,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}
          >
            <span className="bbu-badge" style={{ background: "rgba(245,201,44,0.15)", color: "#F5C92C", borderColor: "rgba(245,201,44,0.4)" }}>
              <Timer size={12} />
              Samedi 15 Mai 2027 · 10h00
            </span>
            <div style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.9rem" }}>
              <Countdown targetDateStr="2027-05-15T10:00:00+02:00" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            style={{
              fontFamily: "'Hobo', sans-serif",
              fontSize: "clamp(2.2rem, 8vw, 6.5rem)",
              fontWeight: "500",
              color: "#fff",
              lineHeight: 1.0,
              textShadow: "0 4px 40px rgba(0,0,0,0.5)",
              marginBottom: "0.3rem",
            }}
          >
            BREIZH BACKYARD
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            style={{
              fontFamily: "'Hobo', sans-serif",
              fontSize: "clamp(1rem, 3vw, 2rem)",
              color: "#F5C92C",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              marginBottom: "1.25rem",
            }}
          >
            Ultra
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "clamp(0.95rem, 2.5vw, 1.2rem)",
              maxWidth: "540px",
              lineHeight: 1.7,
              marginBottom: "2rem",
            }}
          >
            6,706 km. Toutes les heures. Jusqu'au dernier debout.
            <br />
            La course sans distance. Sans limite.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0 }}
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}
          >
            <Link to="/inscriptions" className="btn-primary" style={{ fontSize: "1rem", padding: "0.85rem 2rem" }}>
              S'inscrire à la newsletter →
            </Link>
            <Link to="/concept" className="btn-outline-white" style={{ fontSize: "1rem", padding: "0.85rem 2rem" }}>
              Découvrir le concept
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            color: "rgba(255,255,255,0.5)",
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            zIndex: 10,
          }}
        >
          <span>Défiler</span>
          <div
            style={{
              width: "1px",
              height: "32px",
              background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)",
              animation: "fadeInUp 1s ease infinite",
            }}
          />
        </motion.div>
      </section>

      {/* ============================================================
          CONCEPT RAPIDE
          ============================================================ */}
      <section className="section-white section-py">
        <div className="page-container">
          <div
            ref={conceptRef}
            style={{ textAlign: "center", marginBottom: "3rem" }}
            className={`reveal ${conceptVisible ? "revealed" : ""}`}
          >
            <p className="section-subtitle">Le format</p>
            <h2 className="section-title" style={{ marginTop: "0.5rem", marginBottom: "1rem" }}>
              Une course sans fin
            </h2>
            <p style={{ color: "#4a6b56", maxWidth: "560px", margin: "0 auto", fontSize: "1.05rem", lineHeight: 1.75 }}>
              Le Backyard Ultra est une épreuve d'ultra-endurance unique : pas de distance fixée,
              pas d'horaire d'arrivée — seulement un tour de 6,706 km à boucler toutes les heures, pile.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1.5rem",
              marginBottom: "3rem",
            }}
          >
            {[
              {
                icon: Timer,
                color: "#277956",
                title: "Toutes les heures",
                text: "Un top départ est donné chaque heure. Tous les coureurs encore en course repartent ensemble, sans exception.",
                delay: 0,
              },
              {
                icon: Footprints,
                color: "#2D9185",
                title: "6,706 km par tour",
                text: "Chaque boucle fait exactement 6,706 km — 4,1667 miles. À compléter dans l'heure, sinon c'est l'élimination.",
                delay: 0.1,
              },
              {
                icon: Trophy,
                color: "#F5C92C",
                title: "Un seul vainqueur",
                text: "La course continue jusqu'à ce qu'il ne reste plus qu'un seul coureur capable de boucler un tour supplémentaire.",
                delay: 0.2,
              },
              {
                icon: Users,
                color: "#8CBE4F",
                title: "Un esprit unique",
                text: "Entre les tours, le camp de base réunit coureurs, équipes et supporters dans une ambiance conviviale et solidaire.",
                delay: 0.3,
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: card.delay }}
              >
                <ConceptCard icon={card.icon} title={card.title} text={card.text} color={card.color} />
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <Link to="/concept" className="btn-outline">
              En savoir plus sur le concept <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          CHIFFRES CLÉS
          ============================================================ */}
      <section className="section-dark section-py" style={{ position: "relative" }}>
        {/* Organic top wave */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, overflow: "hidden", lineHeight: 0 }}>
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "60px", fill: "#fff" }}>
            <path d="M0,40 C360,0 720,60 1080,20 C1260,5 1380,35 1440,40 L1440,0 L0,0 Z" />
          </svg>
        </div>
        <div className="page-container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p className="section-subtitle" style={{ color: "#8CBE4F" }}>L'événement en chiffres</p>
            <h2 className="section-title-light" style={{ marginTop: "0.5rem" }}>
              Breizh Backyard Ultra
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "1.25rem",
            }}
          >
            <StatCard number={6} suffix=",706 km" label="Par tour" desc="La distance exacte du Backyard Ultra" />
            <StatCard number={150} suffix="" label="Coureurs attendus" desc="Toutes catégories confondues" />
            <StatCard number={114} suffix="h" label="Record mondial" desc="Plus de 760 km parcourus" />
            <StatCard number={1} suffix="ère" label="Édition à Rennes" desc="Un nouveau rendez-vous ultra" />
          </div>
        </div>
      </section>

      {/* ============================================================
          APERÇU PARCOURS
          ============================================================ */}
      <section className="section-light section-py" ref={parcours}>
        <div className="page-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem", alignItems: "center" }}>
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="section-subtitle">Le tracé</p>
              <h2 className="section-title" style={{ marginTop: "0.5rem", marginBottom: "1.25rem" }}>
                Un parcours en pleine nature bretonne
              </h2>
              <p style={{ color: "#4a6b56", lineHeight: 1.75, marginBottom: "1.75rem" }}>
                Le circuit serpente à travers la nature bretonne : sentiers forestiers, sous-bois,
                chemins champêtres... Un cadre inspirant pour repousser vos limites, heure après heure.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "2rem" }}>
                {[
                  { icon: Footprints, label: "Distance par tour", value: "6,706 km" },
                  { icon: Mountain, label: "Dénivelé (indicatif)", value: "à venir" },
                  { icon: Leaf, label: "Type de terrain", value: "Sentiers nature, forêt" },
                  { icon: MapPin, label: "Localisation", value: "Parc des Gayeulles, Rennes" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                    <div
                      style={{
                        width: "38px", height: "38px", borderRadius: "0.625rem",
                        background: "rgba(39,121,86,0.1)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#277956", flexShrink: 0,
                      }}
                    >
                      <Icon size={18} strokeWidth={1.5} />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.75rem", color: "#4a6b56", fontWeight: "600", letterSpacing: "0.04em" }}>{label}</div>
                      <div style={{ fontSize: "0.95rem", color: "#1a2e22", fontWeight: "700" }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/parcours" className="btn-outline">
                Voir le parcours <ChevronRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div
                className="placeholder-img"
                style={{ minHeight: "350px", borderRadius: "1.5rem" }}
              >
                <Mountain size={40} style={{ opacity: 0.5, position: "relative", zIndex: 1 }} />
                <span style={{ position: "relative", zIndex: 1, fontFamily: "'Inter', sans-serif" }}>
                  📍 Photo du parcours à venir
                </span>
                <span style={{ position: "relative", zIndex: 1, fontSize: "0.75rem" }}>
                  Remplacer par vos vraies photos
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          AMBIANCE / COMMUNAUTÉ
          ============================================================ */}
      <section className="section-white section-py">
        <div className="page-container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p className="section-subtitle">L'ambiance</p>
            <h2 className="section-title" style={{ marginTop: "0.5rem" }}>
              Bien plus qu'une course
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {[
              {
                title: "Le camp de base",
                text: "Entre chaque tour, coureurs et accompagnants se retrouvent dans la zone de vie. Tentes, chaises longues, ravitaillement maison... L'ambiance est unique.",
                icon: Wind,
                color: "#2D9185",
              },
              {
                title: "L'entraide",
                text: "Dans le Backyard, les coureurs se soutiennent mutuellement. On se connaît au fil des heures, on s'encourage, on partage. Un esprit de communauté rare en compétition.",
                icon: Users,
                color: "#277956",
              },
              {
                title: "La Bretagne",
                text: "Un cadre naturel exceptionnel : forêts, sentiers, air iodé... La Bretagne offre le décor parfait pour cette aventure d'ultra-endurance.",
                icon: Leaf,
                color: "#8CBE4F",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bbu-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
              >
                <div
                  style={{
                    width: "48px", height: "48px",
                    borderRadius: "0.875rem",
                    background: `${item.color}15`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: item.color,
                  }}
                >
                  <item.icon size={22} strokeWidth={1.5} />
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#1a2e22", margin: 0 }}>{item.title}</h3>
                <p style={{ fontSize: "0.9rem", color: "#4a6b56", lineHeight: 1.75, margin: 0 }}>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          CTA NEWSLETTER
          ============================================================ */}
      <section
        ref={ctaRef}
        className="section-teal"
        style={{ padding: "5rem 0", position: "relative", overflow: "hidden" }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "-60px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "rgba(245,201,44,0.1)",
          }}
        />

        <div className="page-container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="bbu-badge" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", borderColor: "rgba(255,255,255,0.3)", marginBottom: "1.5rem" }}>
              <Timer size={12} />
              Départ : 15 mai 2027
            </span>
            <h2 style={{ fontFamily: "'Hobo', sans-serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#fff", marginBottom: "1rem" }}>
              Ne ratez pas l'ouverture des inscriptions
            </h2>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.05rem", maxWidth: "480px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
              Les places sont limitées. Inscrivez-vous à notre newsletter pour être
              prévenu(e) en priorité dès l'ouverture.
            </p>
            <Link to="/inscriptions" className="btn-primary" style={{ fontSize: "1.05rem", padding: "0.9rem 2.5rem" }}>
              Je veux être prévenu(e) →
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
