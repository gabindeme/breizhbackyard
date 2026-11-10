import { motion } from "motion/react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  /** "legal": darker gradient, smaller title and a wider description, for the long legal intros. */
  variant?: "default" | "legal";
}

/** Green gradient header with a wave at the bottom, shared by every page except Home. */
export const PageHeader = ({ title, subtitle, description, variant = "default" }: PageHeaderProps) => {
  const legal = variant === "legal";
  return (
    <div
      className="page-header-inner"
      style={{
        background: `linear-gradient(135deg, var(--bbu-green-dark) 0%, #1a4d36 60%, ${legal ? "#0f2d1d" : "#164030"} 100%)`,
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
          backgroundImage: `radial-gradient(circle at 80% 50%, rgba(245,201,44,${legal ? 0.1 : 0.08}) 0%, transparent 60%)`,
        }}
      />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: "60px", fill: "var(--bbu-off-white)" }}
        >
          <path d="M0,20 C360,60 720,0 1080,40 C1260,55 1380,25 1440,20 L1440,60 L0,60 Z" />
        </svg>
      </div>
      <div className="page-container" style={{ position: "relative", zIndex: 1 }}>
        {subtitle && (
          <p className="section-subtitle" style={{ color: "var(--bbu-green-light)", marginBottom: "0.75rem" }}>
            {subtitle}
          </p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontFamily: "'Hobo', sans-serif",
            fontSize: `clamp(2rem, 5vw, ${legal ? "3.5rem" : "4rem"})`,
            color: "#fff",
            marginBottom: description ? "1rem" : 0,
          }}
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              color: legal ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.75)",
              maxWidth: legal ? "700px" : "600px",
              fontSize: "1.05rem",
              lineHeight: 1.75,
            }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </div>
  );
};
