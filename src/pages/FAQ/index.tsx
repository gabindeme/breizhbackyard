import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@/components/customs/page-header";

export const FAQ = () => {
  const { t } = useTranslation();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggle = (key: string) => setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));

  // Get FAQ data from translations
  const faqData = t("faq_page.data", { returnObjects: true }) as { category: string, items: { q: string, a: string }[] }[];

  const filteredData = activeCategory ? faqData.filter((c) => c.category === activeCategory) : faqData;



  return (
    <div style={{ background: "#EFEFEF" }}>
      <PageHeader
        subtitle={t("faq_page.header.subtitle")}
        title={t("faq_page.header.title")}
        description={t("faq_page.header.desc")}
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
              {t("faq_page.filters.toutes")}
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
              {t("faq_page.contact.title")}
            </h3>
            <p style={{ color: "#4a6b56", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              {t("faq_page.contact.desc")}
            </p>
            <Link to="/contact" className="btn-primary">
              {t("faq_page.contact.btn")} <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
