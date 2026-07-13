import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
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

export const Galerie = () => {
  const { t } = useTranslation();

  const photos = [
    { id: 1, category: t("galerie_page.categories.coureurs"), label: t("galerie_page.photos.p1_label"), desc: t("galerie_page.photos.p1_desc"), height: "300px" },
    { id: 2, category: t("galerie_page.categories.parcours"), label: t("galerie_page.photos.p2_label"), desc: t("galerie_page.photos.p2_desc"), height: "220px" },
    { id: 3, category: t("galerie_page.categories.ambiance"), label: t("galerie_page.photos.p3_label"), desc: t("galerie_page.photos.p3_desc"), height: "260px" },
    { id: 4, category: t("galerie_page.categories.coureurs"), label: t("galerie_page.photos.p4_label"), desc: t("galerie_page.photos.p4_desc"), height: "240px" },
    { id: 5, category: t("galerie_page.categories.parcours"), label: t("galerie_page.photos.p5_label"), desc: t("galerie_page.photos.p5_desc"), height: "300px" },
    { id: 6, category: t("galerie_page.categories.ambiance"), label: t("galerie_page.photos.p6_label"), desc: t("galerie_page.photos.p6_desc"), height: "220px" },
    { id: 7, category: t("galerie_page.categories.coureurs"), label: t("galerie_page.photos.p7_label"), desc: t("galerie_page.photos.p7_desc"), height: "260px" },
    { id: 8, category: t("galerie_page.categories.parcours"), label: t("galerie_page.photos.p8_label"), desc: t("galerie_page.photos.p8_desc"), height: "240px" },
    { id: 9, category: t("galerie_page.categories.ambiance"), label: t("galerie_page.photos.p9_label"), desc: t("galerie_page.photos.p9_desc"), height: "280px" },
    { id: 10, category: t("galerie_page.categories.coureurs"), label: t("galerie_page.photos.p10_label"), desc: t("galerie_page.photos.p10_desc"), height: "320px" },
    { id: 11, category: t("galerie_page.categories.parcours"), label: t("galerie_page.photos.p11_label"), desc: t("galerie_page.photos.p11_desc"), height: "220px" },
    { id: 12, category: t("galerie_page.categories.ambiance"), label: t("galerie_page.photos.p12_label"), desc: t("galerie_page.photos.p12_desc"), height: "250px" },
  ];

  const categories = [t("galerie_page.categories.toutes"), t("galerie_page.categories.coureurs"), t("galerie_page.categories.parcours"), t("galerie_page.categories.ambiance")];

const gradients = [
  "linear-gradient(135deg, #277956 0%, #1a4d36 100%)",
  "linear-gradient(135deg, #2D9185 0%, #277956 100%)",
  "linear-gradient(135deg, #4DA154 0%, #2D9185 100%)",
  "linear-gradient(135deg, #8CBE4F 0%, #4DA154 100%)",
  "linear-gradient(135deg, #BFC53C 0%, #8CBE4F 100%)",
  "linear-gradient(135deg, #1a4d36 0%, #2D9185 100%)",
];

  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === categories[0] ? photos : photos.filter((p) => p.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null));
  const next = () => setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null));

  return (
    <div style={{ background: "#EFEFEF" }}>
      <PageHeader
        subtitle={t("galerie_page.header.subtitle")}
        title={t("galerie_page.header.title")}
        description={t("galerie_page.header.desc")}
      />

      <section className="section-light section-py">
        <div className="page-container">
          {/* Filtres */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2.5rem", justifyContent: "center" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "0.55rem 1.25rem",
                  borderRadius: "9999px",
                  border: `1.5px solid ${activeCategory === cat ? "#277956" : "#D0D0D0"}`,
                  background: activeCategory === cat ? "#277956" : "#fff",
                  color: activeCategory === cat ? "#fff" : "#4a6b56",
                  fontWeight: "600",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grille masonry */}
          <div
            style={{
              columns: "3",
              columnGap: "1rem",
            }}
          >
            {filtered.map((photo, i) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                onClick={() => openLightbox(i)}
                style={{
                  marginBottom: "1rem",
                  breakInside: "avoid",
                  cursor: "pointer",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  position: "relative",
                  background: gradients[i % gradients.length],
                  minHeight: photo.height,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  color: "rgba(255,255,255,0.8)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Hover overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0.35)",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "1rem",
                  }}
                  className="gallery-hover-overlay"
                >
                  <Maximize2 size={28} style={{ color: "#fff" }} />
                </div>

                <Camera size={24} style={{ opacity: 0.5, position: "relative", zIndex: 1 }} />
                <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 1rem" }}>
                  <div style={{ fontWeight: "700", fontSize: "0.85rem" }}>{photo.label}</div>
                  <div style={{ fontSize: "0.72rem", opacity: 0.7 }}>{photo.desc}</div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "0.75rem",
                    right: "0.75rem",
                    background: "rgba(0,0,0,0.4)",
                    borderRadius: "9999px",
                    padding: "0.2rem 0.6rem",
                    fontSize: "0.65rem",
                    fontWeight: "700",
                    color: "#fff",
                    letterSpacing: "0.05em",
                  }}
                >
                  {photo.category}
                </div>
              </motion.div>
            ))}
          </div>

          <style>{`
            .gallery-item:hover .gallery-hover-overlay { opacity: 1 !important; }
            @media (max-width: 768px) { [style*="columns: 3"] { columns: 2 !important; } }
            @media (max-width: 480px) { [style*="columns: 3"] { columns: 1 !important; } }
          `}</style>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={closeLightbox}
            style={{ userSelect: "none" }}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                background: "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#fff",
                zIndex: 10,
              }}
            >
              <X size={22} />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              style={{
                position: "absolute",
                left: "1.5rem",
                background: "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: "50%",
                width: "48px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#fff",
                zIndex: 10,
              }}
            >
              <ChevronLeft size={24} />
            </button>

            {/* Image lightbox */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: gradients[lightboxIndex % gradients.length],
                width: "min(600px, 90vw)",
                height: "min(400px, 70vh)",
                borderRadius: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                color: "rgba(255,255,255,0.9)",
                padding: "2rem",
                textAlign: "center",
                boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
              }}
            >
              <Camera size={40} style={{ opacity: 0.5 }} />
              <div>
                <div style={{ fontFamily: "'Hobo', sans-serif", fontSize: "1.4rem", color: "#fff", marginBottom: "0.5rem" }}>
                  {filtered[lightboxIndex].label}
                </div>
                <div style={{ fontSize: "0.85rem", opacity: 0.7 }}>{filtered[lightboxIndex].desc}</div>
                <div style={{ fontSize: "0.72rem", opacity: 0.5, marginTop: "0.25rem" }}>
                  {t("galerie_page.lightbox.photo")} {lightboxIndex + 1} / {filtered.length} — {filtered[lightboxIndex].category}
                </div>
              </div>
            </motion.div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              style={{
                position: "absolute",
                right: "1.5rem",
                background: "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: "50%",
                width: "48px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#fff",
                zIndex: 10,
              }}
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
