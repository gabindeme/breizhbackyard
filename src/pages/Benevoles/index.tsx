import { motion } from "motion/react";
import { HeartHandshake, Map, Shield, Hammer, Send } from "lucide-react";
import { useState } from "react";
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

export const Benevoles = () => {
  const { t } = useTranslation();
  const [formState, setFormState] = useState({
    nom: "",
    email: "",
    dispo: "",
    msg: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!formState.nom) newErrors.nom = t("contact_page.errors.nom_req");
    if (!formState.email) newErrors.email = t("contact_page.errors.email_req");
    else if (!/\S+@\S+\.\S+/.test(formState.email)) newErrors.email = t("contact_page.errors.email_inv");
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({ nom: "", email: "", dispo: "", msg: "" });
    }, 1500);
  };

  return (
    <div style={{ background: "#EFEFEF", minHeight: "100vh" }}>
      <PageHeader 
        subtitle={t("benevoles_page.header.subtitle")}
        title={t("benevoles_page.header.title")}
        description={t("benevoles_page.header.desc")}
      />

      <div className="page-container" style={{ padding: "4rem 1.5rem" }}>
        
        {/* Intro Section */}
        <section style={{ marginBottom: "5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 className="section-title" style={{ color: "#164030" }}>{t("benevoles_page.intro.title")}</h2>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
            {[
              {
                icon: <HeartHandshake size={32} color="#277956" />,
                title: t("benevoles_page.intro.card1_title"),
                desc: t("benevoles_page.intro.card1_text")
              },
              {
                icon: <Map size={32} color="#277956" />,
                title: t("benevoles_page.intro.card2_title"),
                desc: t("benevoles_page.intro.card2_text")
              },
              {
                icon: <Shield size={32} color="#277956" />,
                title: t("benevoles_page.intro.card3_title"),
                desc: t("benevoles_page.intro.card3_text")
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ 
                  background: "#fff", 
                  padding: "2.5rem", 
                  borderRadius: "24px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
                }}
              >
                <div style={{ width: "64px", height: "64px", borderRadius: "16px", background: "rgba(39,121,86,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontFamily: "'Hobo', sans-serif", fontSize: "1.5rem", color: "#164030", marginBottom: "1rem" }}>{feature.title}</h3>
                <p style={{ color: "#666", lineHeight: 1.6 }}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Roles Section */}
        <section style={{ marginBottom: "5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 className="section-title" style={{ color: "#164030" }}>{t("benevoles_page.roles.title")}</h2>
          </div>
          
          <div style={{ 
            background: "#fff",
            borderRadius: "24px",
            padding: "3rem",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2rem"
          }}>
            {[
              {
                icon: <HeartHandshake size={24} color="#F5C92C" />,
                title: t("benevoles_page.roles.r1_title"),
                desc: t("benevoles_page.roles.r1_text")
              },
              {
                icon: <Map size={24} color="#F5C92C" />,
                title: t("benevoles_page.roles.r2_title"),
                desc: t("benevoles_page.roles.r2_text")
              },
              {
                icon: <Hammer size={24} color="#F5C92C" />,
                title: t("benevoles_page.roles.r3_title"),
                desc: t("benevoles_page.roles.r3_text")
              }
            ].map((role, i) => (
              <div key={i}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                  <div style={{ padding: "0.5rem", background: "rgba(245,201,44,0.1)", borderRadius: "12px" }}>
                    {role.icon}
                  </div>
                  <h4 style={{ fontFamily: "'Hobo', sans-serif", fontSize: "1.25rem", color: "#164030" }}>{role.title}</h4>
                </div>
                <p style={{ color: "#666", lineHeight: 1.6 }}>{role.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Form Section */}
        <section style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ background: "#fff", borderRadius: "32px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}>
            <div style={{ padding: "3rem", background: "#164030", color: "#fff", textAlign: "center" }}>
              <h2 style={{ fontFamily: "'Hobo', sans-serif", fontSize: "2.5rem", marginBottom: "1rem" }}>{t("benevoles_page.form.title")}</h2>
            </div>
            
            <div style={{ padding: "3rem" }}>
              {isSuccess ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "2rem 0" }}>
                  <div style={{ width: "80px", height: "80px", background: "rgba(39,121,86,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                    <Send size={40} color="#277956" />
                  </div>
                  <h3 style={{ fontFamily: "'Hobo', sans-serif", fontSize: "2rem", color: "#164030", marginBottom: "1rem" }}>{t("benevoles_page.form.success_title")}</h3>
                  <p style={{ color: "#666", fontSize: "1.1rem" }}>{t("benevoles_page.form.success_desc", { nom: formState.nom })}</p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    style={{ marginTop: "2rem", background: "none", border: "none", color: "#277956", fontWeight: "600", cursor: "pointer", fontSize: "1rem" }}
                  >
                    Envoyer une autre candidature
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1.5rem" }}>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }}>
                    <div>
                      <label style={{ display: "block", color: "#164030", fontWeight: "600", marginBottom: "0.5rem" }}>{t("benevoles_page.form.nom_label")}</label>
                      <input 
                        type="text" 
                        value={formState.nom}
                        onChange={(e) => setFormState({...formState, nom: e.target.value})}
                        placeholder={t("benevoles_page.form.nom_ph")}
                        style={{ width: "100%", padding: "1rem", borderRadius: "12px", border: `2px solid ${errors.nom ? "#ef4444" : "#e5e7eb"}`, fontSize: "1rem", outline: "none", transition: "border-color 0.2s" }}
                      />
                      {errors.nom && <span style={{ color: "#ef4444", fontSize: "0.875rem", marginTop: "0.5rem", display: "block" }}>{errors.nom}</span>}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", color: "#164030", fontWeight: "600", marginBottom: "0.5rem" }}>{t("benevoles_page.form.email_label")}</label>
                    <input 
                      type="email" 
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                      placeholder={t("benevoles_page.form.email_ph")}
                      style={{ width: "100%", padding: "1rem", borderRadius: "12px", border: `2px solid ${errors.email ? "#ef4444" : "#e5e7eb"}`, fontSize: "1rem", outline: "none", transition: "border-color 0.2s" }}
                    />
                    {errors.email && <span style={{ color: "#ef4444", fontSize: "0.875rem", marginTop: "0.5rem", display: "block" }}>{errors.email}</span>}
                  </div>
                  
                  <div>
                    <label style={{ display: "block", color: "#164030", fontWeight: "600", marginBottom: "0.5rem" }}>{t("benevoles_page.form.dispo_label")}</label>
                    <input 
                      type="text" 
                      value={formState.dispo}
                      onChange={(e) => setFormState({...formState, dispo: e.target.value})}
                      placeholder={t("benevoles_page.form.dispo_ph")}
                      style={{ width: "100%", padding: "1rem", borderRadius: "12px", border: `2px solid #e5e7eb`, fontSize: "1rem", outline: "none", transition: "border-color 0.2s" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", color: "#164030", fontWeight: "600", marginBottom: "0.5rem" }}>{t("benevoles_page.form.msg_label")}</label>
                    <textarea 
                      rows={5}
                      value={formState.msg}
                      onChange={(e) => setFormState({...formState, msg: e.target.value})}
                      placeholder={t("benevoles_page.form.msg_ph")}
                      style={{ width: "100%", padding: "1rem", borderRadius: "12px", border: `2px solid #e5e7eb`, fontSize: "1rem", outline: "none", transition: "border-color 0.2s", resize: "vertical" }}
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    style={{ 
                      background: "#F5C92C", 
                      color: "#164030", 
                      padding: "1.25rem", 
                      borderRadius: "12px", 
                      border: "none", 
                      fontSize: "1.1rem", 
                      fontWeight: "bold", 
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      transition: "transform 0.2s",
                      opacity: isSubmitting ? 0.7 : 1,
                      marginTop: "1rem"
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubmitting) e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {isSubmitting ? t("benevoles_page.form.btn_loading") : (
                      <>
                        <Send size={20} />
                        {t("benevoles_page.form.btn_submit")}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
