import { motion } from "motion/react";
import { HeartHandshake, Map, Shield, Hammer, Send } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { submitForm } from "@/lib/submit-form";
import { Honeypot, FormError, RequiredMark, FieldError } from "@/components/customs/form-extras";
import { PageHeader } from "@/components/customs/page-header";

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
  const [website, setWebsite] = useState("");
  const [sendError, setSendError] = useState(false);

  const handleChange = (field: keyof typeof formState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!formState.nom.trim()) newErrors.nom = t("contact_page.errors.nom_req");
    if (!formState.email.trim()) newErrors.email = t("contact_page.errors.email_req");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email.trim())) newErrors.email = t("contact_page.errors.email_inv");
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setSendError(false);
    const ok = await submitForm("benevole", {
      nom: formState.nom,
      email: formState.email,
      dispo: formState.dispo,
      message: formState.msg,
      website,
    });
    setIsSubmitting(false);
    if (ok) setIsSuccess(true);
    else setSendError(true);
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
                    onClick={() => {
                      setFormState({ nom: "", email: "", dispo: "", msg: "" });
                      setIsSuccess(false);
                    }}
                    style={{ marginTop: "2rem", background: "none", border: "none", color: "#277956", fontWeight: "600", cursor: "pointer", fontSize: "1rem" }}
                  >
                    {t("benevoles_page.form.another")}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate style={{ display: "grid", gap: "1.5rem", position: "relative" }}>
                  <Honeypot value={website} onChange={setWebsite} />
                  
                  <div>
                    <label className="bbu-label" htmlFor="b-nom">
                      {t("benevoles_page.form.nom_label")} <RequiredMark />
                    </label>
                    <input
                      id="b-nom"
                      type="text"
                      className="bbu-input"
                      value={formState.nom}
                      onChange={handleChange("nom")}
                      placeholder={t("benevoles_page.form.nom_ph")}
                      aria-invalid={!!errors.nom}
                      aria-describedby={errors.nom ? "b-nom-error" : undefined}
                    />
                    <FieldError id="b-nom-error" message={errors.nom} />
                  </div>

                  <div>
                    <label className="bbu-label" htmlFor="b-email">
                      {t("benevoles_page.form.email_label")} <RequiredMark />
                    </label>
                    <input
                      id="b-email"
                      type="email"
                      className="bbu-input"
                      value={formState.email}
                      onChange={handleChange("email")}
                      placeholder={t("benevoles_page.form.email_ph")}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "b-email-error" : undefined}
                    />
                    <FieldError id="b-email-error" message={errors.email} />
                  </div>

                  <div>
                    <label className="bbu-label" htmlFor="b-dispo">{t("benevoles_page.form.dispo_label")}</label>
                    <input
                      id="b-dispo"
                      type="text"
                      className="bbu-input"
                      value={formState.dispo}
                      onChange={handleChange("dispo")}
                      placeholder={t("benevoles_page.form.dispo_ph")}
                    />
                  </div>

                  <div>
                    <label className="bbu-label" htmlFor="b-msg">{t("benevoles_page.form.msg_label")}</label>
                    <textarea
                      id="b-msg"
                      rows={5}
                      className="bbu-input"
                      value={formState.msg}
                      onChange={handleChange("msg")}
                      placeholder={t("benevoles_page.form.msg_ph")}
                      style={{ resize: "vertical" }}
                    />
                  </div>

                  {sendError && <FormError />}

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
