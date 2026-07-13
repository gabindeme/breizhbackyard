import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

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

const faqData = [
  {
    category: "🏃 Le format Backyard Ultra",
    items: [
      { q: "Qu'est-ce que le format Backyard Ultra ?", a: "Le Backyard Ultra est un format de course d'ultra-endurance inventé par Gary Cantrell (alias Lazarus Lake) en 2011. Le principe : boucler un circuit de 6,706 km toutes les heures, jusqu'à ce qu'il ne reste plus qu'un seul coureur capable de compléter un tour supplémentaire." },
      { q: "D'où vient la distance de 6,706 km ?", a: "Cette distance correspond exactement à 4,16667 miles, soit un centième de mile dans une heure. Multiplié par le nombre de tours, cela donne toujours un nombre entier de miles parcourus." },
      { q: "Combien de temps peut durer une course ?", a: "La durée est totalement indéterminée. Des courses de moins de 10 heures existent, mais le record mondial dépasse les 100 heures (plus de 4 jours). En pratique, la plupart des courses régionales se terminent entre 20 et 40 heures." },
      { q: "Peut-il y avoir plusieurs vainqueurs ?", a: "Non, un seul vainqueur officiel est possible. Si plusieurs coureurs abandonnent au même tour, ou si le dernier coureur restant ne peut pas compléter le tour supplémentaire solo, il n'y a pas de vainqueur officiel pour l'édition." },
      { q: "Qu'est-ce que la 'big's backyard ultra' ?", a: "C'est la course originale créée par Lazarus Lake dans le Tennessee, aux États-Unis. Elle est considérée comme le championnat mondial non officiel du format. Les meilleurs coureurs de chaque course qualificative peuvent y être invités." },
    ],
  },
  {
    category: "📋 Les inscriptions",
    items: [
      { q: "Quand ouvrent les inscriptions ?", a: "Les inscriptions pour la prochaine édition ne sont pas encore ouvertes. Inscrivez-vous à notre newsletter pour être prévenu(e) en priorité dès leur ouverture." },
      { q: "Combien de places sont disponibles ?", a: "Le nombre de places sera précisé lors de l'ouverture des inscriptions. Le format Backyard Ultra fonctionne mieux avec un nombre modéré de participants — attendez-vous à des places limitées." },
      { q: "Y a-t-il un niveau minimum requis ?", a: "Il n'y a pas de qualification technique obligatoire, mais nous recommandons d'avoir une expérience en trail ou en courses de longue durée (marathon minimum). Le format est physiquement et mentalement très exigeant." },
      { q: "Les inscriptions sont-elles remboursables ?", a: "La politique de remboursement sera précisée lors de l'ouverture des inscriptions. Des conditions d'annulation seront indiquées dans le règlement." },
    ],
  },
  {
    category: "🎒 Matériel & Logistique",
    items: [
      { q: "De quoi ai-je besoin comme matériel ?", a: "L'essentiel : des chaussures de trail, une lampe frontale, des vêtements adaptés à la météo et votre ravitaillement. Pour le camp de base : une tente ou un abri, une chaise longue, un sac de couchage et des vêtements de rechange. Voir la page 'Infos pratiques' pour la liste complète." },
      { q: "Puis-je avoir une équipe de soutien ?", a: "Oui ! Vos accompagnants peuvent être présents dans la zone de vie tout au long de la course. Ils ne peuvent cependant pas vous assister sur le circuit lui-même." },
      { q: "Les bâtons de trail sont-ils autorisés ?", a: "Oui, les bâtons de marche / trail sont autorisés pendant toute la course." },
      { q: "Y a-t-il des douches ou sanitaires sur place ?", a: "Des sanitaires seront disponibles sur la zone de vie. Les détails complets seront communiqués dans le pack participant." },
    ],
  },
  {
    category: "🍌 Ravitaillement",
    items: [
      { q: "Qu'est-ce qui est fourni par l'organisation ?", a: "L'organisation fournit de l'eau potable en continu, des fruits frais (bananes, oranges) entre les tours, des bouillons chauds de nuit et du café/thé. Un ravitaillement complet sera détaillé dans le règlement." },
      { q: "Puis-je apporter mes propres aliments ?", a: "Oui, et c'est fortement recommandé ! Vous connaissez mieux que quiconque ce qui fonctionne pour vous lors des longues efforts. Évitez tout aliment que vous n'avez pas testé à l'entraînement." },
      { q: "Y a-t-il un point de ravitaillement sur le circuit ?", a: "Non. Le seul ravitaillement se trouve à la zone de vie, au départ/arrivée. Vous disposerez du temps restant après chaque tour pour vous ravitailler avant le prochain départ." },
    ],
  },
  {
    category: "🌙 La nuit & La récupération",
    items: [
      { q: "Comment gère-t-on les nuits ?", a: "La course se poursuit 24h/24, y compris la nuit. Le circuit est balisé avec des rubalises réfléchissantes. La lampe frontale est obligatoire dès la tombée de la nuit." },
      { q: "Peut-on dormir entre les tours ?", a: "Oui ! Si vous terminez votre tour en 45 minutes, vous avez 15 minutes pour vous reposer. Certains coureurs utilisent des alarmes pour des micro-siestes de 10-12 minutes. C'est une des clés tactiques du format." },
      { q: "Que se passe-t-il si un coureur est blessé ?", a: "Une équipe médicale est présente 24h/24. Tout coureur en difficulté peut être pris en charge immédiatement. Nous préférons un abandon volontaire à une mise en danger." },
    ],
  },
];

export const FAQ = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggle = (key: string) => setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));

  const filteredData = activeCategory ? faqData.filter((c) => c.category === activeCategory) : faqData;

  return (
    <div style={{ background: "#EFEFEF" }}>
      <PageHeader
        subtitle="Aide"
        title="Questions Fréquentes"
        description="Vous avez des questions sur le format, l'organisation ou la course ? Vous trouverez probablement la réponse ici."
      />

      <section className="section-light section-py">
        <div className="page-container" style={{ maxWidth: "900px" }}>

          {/* Filtres catégories */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            <button
              onClick={() => setActiveCategory(null)}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "9999px",
                border: `1.5px solid ${activeCategory === null ? "#277956" : "#D0D0D0"}`,
                background: activeCategory === null ? "#277956" : "#fff",
                color: activeCategory === null ? "#fff" : "#4a6b56",
                fontWeight: "600",
                fontSize: "0.82rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              Toutes
            </button>
            {faqData.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category === activeCategory ? null : cat.category)}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "9999px",
                  border: `1.5px solid ${activeCategory === cat.category ? "#277956" : "#D0D0D0"}`,
                  background: activeCategory === cat.category ? "#277956" : "#fff",
                  color: activeCategory === cat.category ? "#fff" : "#4a6b56",
                  fontWeight: "600",
                  fontSize: "0.82rem",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {cat.category.split(" ").slice(1).join(" ")}
              </button>
            ))}
          </div>

          {/* FAQ items */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {filteredData.map((category, ci) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: ci * 0.05 }}
              >
                <h2 style={{ fontFamily: "'Hobo', sans-serif", fontSize: "1.2rem", color: "#277956", marginBottom: "1.25rem" }}>
                  {category.category}
                </h2>
                <div style={{ background: "#fff", borderRadius: "1.25rem", border: "1px solid #D0D0D0", padding: "0.5rem 1.5rem", boxShadow: "0 2px 12px rgba(39,121,86,0.06)" }}>
                  {category.items.map((item, ii) => {
                    const key = `${ci}-${ii}`;
                    const isOpen = !!openItems[key];
                    return (
                      <div key={key} className={`faq-item ${isOpen ? "open" : ""}`}>
                        <button className="faq-trigger" onClick={() => toggle(key)}>
                          {item.q}
                          <span className="faq-icon">+</span>
                        </button>
                        <div className="faq-content">
                          <div className="faq-content-inner">{item.a}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA contact */}
          <div
            style={{
              marginTop: "3rem",
              textAlign: "center",
              padding: "2.5rem",
              background: "#fff",
              borderRadius: "1.5rem",
              border: "1.5px solid #D0D0D0",
            }}
          >
            <h3 style={{ fontFamily: "'Hobo', sans-serif", fontSize: "1.4rem", color: "#1a2e22", marginBottom: "0.75rem" }}>
              Vous n'avez pas trouvé votre réponse ?
            </h3>
            <p style={{ color: "#4a6b56", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              Notre équipe se fera un plaisir de répondre à toutes vos questions.
            </p>
            <Link to="/contact" className="btn-primary">
              Nous contacter <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
