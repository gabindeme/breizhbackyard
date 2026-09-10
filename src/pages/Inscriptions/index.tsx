import { motion } from "motion/react";
import { useEffect } from "react";
import { Mail, Timer, Bell, Send, AlertCircle, CheckCircle2 } from "lucide-react";
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

export const Inscriptions = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Globals pour Brevo
    (window as any).REQUIRED_CODE_ERROR_MESSAGE = 'Veuillez choisir un code pays';
    (window as any).LOCALE = 'fr';
    (window as any).EMAIL_INVALID_MESSAGE = (window as any).SMS_INVALID_MESSAGE = "Les informations fournies ne sont pas valides.";
    (window as any).REQUIRED_ERROR_MESSAGE = "Ce champ est requis.";
    (window as any).GENERIC_INVALID_MESSAGE = "Les informations fournies ne sont pas valides.";
    (window as any).INVALID_NUMBER = "Numéro invalide.";
    (window as any).INVALID_DATE = "Veuillez saisir une date valide.";
    (window as any).REQUIRED_MULTISELECT_MESSAGE = 'Veuillez choisir au moins une option.';
    (window as any).translation = {
      common: {
        selectedList: '{quantity} liste sélectionnée',
        selectedLists: '{quantity} listes sélectionnées',
        selectedOption: '{quantity} sélectionné',
        selectedOptions: '{quantity} sélectionnés',
      }
    };
    (window as any).AUTOHIDE = Boolean(0);
    (window as any).handleCaptchaResponse = function () {
      const event = new Event('captchaChange');
      const el = document.getElementById('sib-captcha');
      if (el) el.dispatchEvent(event);
    };

    // Script Google reCAPTCHA
    const recaptchaId = 'google-recaptcha-script';
    if (!document.getElementById(recaptchaId)) {
      const script = document.createElement('script');
      script.id = recaptchaId;
      script.src = 'https://www.google.com/recaptcha/api.js?hl=fr';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    // Script Brevo
    const mainScriptId = 'brevo-main-script';
    const existingScript = document.getElementById(mainScriptId);
    if (existingScript) {
      existingScript.remove();
    }
    const script = document.createElement('script');
    script.id = mainScriptId;
    script.src = 'https://sibforms.com/forms/end-form/build/main.js';
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div style={{ background: "#EFEFEF", overflowX: "hidden" }}>
      {/* Dynamic CSS override & Mobile Accessibility Rules */}
      <style>{`
        .input--hidden { display: none !important; }
        .entry__error { color: #e53935; font-size: 0.8rem; margin-top: 0.35rem; display: block; font-weight: 500; }
        #sib-container input:focus {
          border-color: #277956 !important;
          box-shadow: 0 0 0 4px rgba(39, 121, 86, 0.15) !important;
          outline: none !important;
        }
        .sib-hide-loader-icon { display: inline-block; }

        /* Responsive Mobile Accessibility & Fix iPhone 14 Pro overflow */
        .bbu-form-card {
          padding: 2.5rem 2.25rem;
          border-radius: 1.5rem;
          background: #ffffff;
          border: 1.5px solid rgba(39,121,86,0.18);
          box-shadow: 0 10px 30px -5px rgba(0,0,0,0.05), 0 20px 40px -10px rgba(39,121,86,0.08);
          position: relative;
          overflow: hidden;
          width: 100%;
          box-sizing: border-box;
        }

        .recaptcha-responsive-box {
          background: #f8faf9;
          border-radius: 0.75rem;
          padding: 0.6rem;
          border: 1px solid #e2ece6;
          display: flex;
          justify-content: center;
          align-items: center;
          max-width: 100%;
          overflow: hidden;
        }

        @media (max-width: 640px) {
          .bbu-form-card {
            padding: 1.5rem 1.15rem !important;
            border-radius: 1.25rem !important;
          }

          .recaptcha-responsive-box {
            padding: 0.4rem 0.2rem !important;
          }

          .recaptcha-responsive-box > div {
            transform: scale(0.92);
            transform-origin: center center;
          }
        }

        @media (max-width: 380px) {
          .recaptcha-responsive-box > div {
            transform: scale(0.84);
            transform-origin: center center;
          }
        }
      `}</style>

      <PageHeader
        subtitle={t("inscriptions_page.header.subtitle")}
        title={t("inscriptions_page.header.title")}
        description={t("inscriptions_page.header.desc")}
      />

      <section className="section-light section-py" style={{ overflow: "hidden" }}>
        <div className="page-container" style={{ maxWidth: "1020px" }}>
          <div className="mobile-grid-1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3.5rem", alignItems: "start" }}>

            {/* Info côté gauche */}
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <h2 className="section-title" style={{ marginBottom: "1.25rem" }}>
                {t("inscriptions_page.info.title")}
              </h2>
              <p style={{ color: "#4a6b56", lineHeight: 1.8, marginBottom: "2rem" }}>
                {t("inscriptions_page.info.desc")}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  { icon: Bell, text: t("inscriptions_page.info.list1") },
                  { icon: Timer, text: t("inscriptions_page.info.list2") },
                  { icon: Mail, text: t("inscriptions_page.info.list3") },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "0.625rem", background: "rgba(39,121,86,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#277956" }}>
                      <Icon size={16} strokeWidth={1.5} />
                    </div>
                    <p style={{ margin: 0, color: "#4a6b56", fontSize: "0.9rem", lineHeight: 1.6, paddingTop: "0.45rem" }}>{text}</p>
                  </div>
                ))}
              </div>

              {/* Infos départ */}
              <div
                style={{
                  marginTop: "2.25rem",
                  padding: "1.5rem",
                  borderRadius: "1.25rem",
                  background: "linear-gradient(135deg, #277956 0%, #1a4d36 100%)",
                  color: "#fff",
                  boxShadow: "0 10px 25px -5px rgba(39,121,86,0.25)",
                }}
              >
                <div style={{ fontSize: "0.72rem", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8CBE4F", marginBottom: "0.5rem" }}>
                  {t("inscriptions_page.info.depart_title")}
                </div>
                <div style={{ fontFamily: "'Hobo', sans-serif", fontSize: "1.5rem", color: "#F5C92C", marginBottom: "0.25rem" }}>
                  {t("inscriptions_page.info.depart_date")}
                </div>
                <div style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.9rem" }}>
                  {t("inscriptions_page.info.depart_loc")}
                </div>
              </div>
            </motion.div>

            {/* Formulaire Brevo côté droit — Design Responsive Mobile */}
            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }} style={{ width: "100%", maxWidth: "100%" }}>
              <div className="sib-form" style={{ background: "transparent", width: "100%" }}>
                <div id="sib-form-container" className="sib-form-container" style={{ width: "100%" }}>

                  {/* Message d'erreur Brevo */}
                  <div
                    id="error-message"
                    className="sib-form-message-panel"
                    style={{
                      fontFamily: "inherit",
                      fontSize: "14px",
                      textAlign: "left",
                      color: "#721c24",
                      backgroundColor: "#f8d7da",
                      borderColor: "#f5c6cb",
                      borderRadius: "0.85rem",
                      padding: "1rem 1.25rem",
                      marginBottom: "1.5rem",
                      maxWidth: "100%",
                      display: "none",
                      border: "1.5px solid #f5c6cb",
                    }}
                  >
                    <div className="sib-form-message-panel__text sib-form-message-panel__text--center" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <AlertCircle size={20} style={{ flexShrink: 0, color: "#721c24" }} />
                      <span className="sib-form-message-panel__inner-text">
                        {t("inscriptions_page.messages.error")}
                      </span>
                    </div>
                  </div>

                  {/* Message de succès Brevo */}
                  <div
                    id="success-message"
                    className="sib-form-message-panel"
                    style={{
                      fontFamily: "inherit",
                      fontSize: "14px",
                      textAlign: "left",
                      color: "#155724",
                      backgroundColor: "#d4edda",
                      borderColor: "#c3e6cb",
                      borderRadius: "0.85rem",
                      padding: "1.25rem 1.5rem",
                      marginBottom: "1.5rem",
                      maxWidth: "100%",
                      display: "none",
                      border: "1.5px solid #c3e6cb",
                    }}
                  >
                    <div className="sib-form-message-panel__text sib-form-message-panel__text--center" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <CheckCircle2 size={24} style={{ flexShrink: 0, color: "#155724" }} />
                      <span className="sib-form-message-panel__inner-text">
                        {t("inscriptions_page.messages.success")}
                      </span>
                    </div>
                  </div>

                  {/* Form Card (Optimisée Mobile iPhone 14 Pro) */}
                  <div id="sib-container" className="bbu-form-card">
                    {/* Visual accent top border */}
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "5px", background: "linear-gradient(90deg, #277956 0%, #8CBE4F 50%, #F5C92C 100%)", borderTopLeftRadius: "1.5rem", borderTopRightRadius: "1.5rem" }} />

                    <form
                      id="sib-form"
                      method="POST"
                      action="https://434611cc.sibforms.com/serve/MUIFACTFT4dgBWGCyE4ZVGaI_NvESSTluXJDvY4DT-7HwuOAO4fgvKZHfL0od8cEdFBqtG5rFssy-G6j-sDkXQEN7KyJzpkTd5VJIBHjnukLV7-qeUfLoj5y8tkw5H5nte76b4Ao0EmFgTXTY0ZLvnm5LHoarVOzZZJMd9iYnpE5JQqBc1k3ooJEcuurVKlIewOcJ4JPUBujktp78Q=="
                      data-type="subscription"
                      style={{ width: "100%" }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.58rem", marginBottom: "0.4rem" }}>
                        <Mail size={22} style={{ color: "#277956", flexShrink: 0 }} />
                        <h3 style={{ fontFamily: "'Hobo', sans-serif", fontSize: "1.5rem", color: "#1a2e22", margin: 0 }}>
                          {t("inscriptions_page.form.title")}
                        </h3>
                      </div>
                      <p style={{ color: "#4a6b56", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                        {t("inscriptions_page.form.desc")}
                      </p>

                      {/* Champ PRENOM */}
                      <div className="sib-input sib-form-block" style={{ marginBottom: "1.25rem" }}>
                        <div className="form__entry entry_block">
                          <label className="bbu-label" htmlFor="PRENOM" style={{ display: "block", marginBottom: "0.45rem", fontWeight: "600", fontSize: "0.88rem", color: "#1a2e22" }}>
                            {t("inscriptions_page.form.prenom_label")}
                          </label>
                          <div className="entry__field">
                            <input
                              className="bbu-input input"
                              maxLength={200}
                              type="text"
                              id="PRENOM"
                              name="PRENOM"
                              autoComplete="given-name"
                              placeholder={t("inscriptions_page.form.prenom_ph")}
                              data-required="true"
                              required
                              style={{
                                width: "100%",
                                boxSizing: "border-box",
                                padding: "0.8rem 1rem",
                                borderRadius: "0.75rem",
                                border: "1.5px solid #d0dcd5",
                                background: "#f8faf9",
                                fontSize: "0.95rem",
                                color: "#1a2e22",
                                minHeight: "46px",
                                transition: "all 0.2s ease",
                              }}
                            />
                          </div>
                          <label className="entry__error entry__error--primary"></label>
                        </div>
                      </div>

                      {/* Champ EMAIL */}
                      <div className="sib-input sib-form-block" style={{ marginBottom: "1.25rem" }}>
                        <div className="form__entry entry_block">
                          <label className="bbu-label" htmlFor="EMAIL" style={{ display: "block", marginBottom: "0.45rem", fontWeight: "600", fontSize: "0.88rem", color: "#1a2e22" }}>
                            {t("inscriptions_page.form.email_label")}
                          </label>
                          <div className="entry__field">
                            <input
                              className="bbu-input input"
                              type="email"
                              id="EMAIL"
                              name="EMAIL"
                              autoComplete="email"
                              placeholder={t("inscriptions_page.form.email_ph")}
                              data-required="true"
                              required
                              style={{
                                width: "100%",
                                boxSizing: "border-box",
                                padding: "0.8rem 1rem",
                                borderRadius: "0.75rem",
                                border: "1.5px solid #d0dcd5",
                                background: "#f8faf9",
                                fontSize: "0.95rem",
                                color: "#1a2e22",
                                minHeight: "46px",
                                transition: "all 0.2s ease",
                              }}
                            />
                          </div>
                          <label className="entry__error entry__error--primary"></label>
                        </div>
                      </div>

                      {/* Opt-in Checkbox (Mobile accessible) */}
                      <div className="sib-optin sib-form-block" data-required="true" style={{ marginBottom: "1.5rem" }}>
                        <div className="form__entry entry_mcq">
                          <div className="form__label-row">
                            <div className="entry__choice">
                              <label style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", cursor: "pointer", userSelect: "none" }}>
                                <input
                                  type="checkbox"
                                  className="input_replaced"
                                  value="1"
                                  id="OPT_IN"
                                  name="OPT_IN"
                                  required
                                  style={{
                                    marginTop: "0.2rem",
                                    width: "22px",
                                    height: "22px",
                                    minWidth: "22px",
                                    minHeight: "22px",
                                    accentColor: "#277956",
                                    cursor: "pointer",
                                    borderRadius: "0.35rem",
                                    flexShrink: 0,
                                  }}
                                />
                                <span style={{ fontSize: "0.82rem", color: "#3c5245", lineHeight: 1.5 }}>
                                  {t("inscriptions_page.form.optin_text")}
                                  <span data-required="*" style={{ display: "inline" }} className="entry__label entry__label_optin"></span>
                                </span>
                              </label>
                            </div>
                          </div>
                          <label className="entry__error entry__error--primary"></label>
                        </div>
                      </div>

                      {/* Google reCAPTCHA Container (Responsive mobile scaling) */}
                      <div className="sib-captcha sib-form-block" style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "center", width: "100%" }}>
                        <div className="form__entry entry_block" style={{ width: "100%" }}>
                          <div className="form__label-row">
                            <div className="recaptcha-responsive-box">
                              <div
                                className="g-recaptcha sib-visible-recaptcha"
                                id="sib-captcha"
                                data-sitekey="6Lfj9rMtAAAAAC83oYpJpHxnZY8nxpoqvjNDEffW"
                                data-callback="handleCaptchaResponse"
                                style={{ direction: "ltr" }}
                              ></div>
                            </div>
                          </div>
                          <label className="entry__error entry__error--primary"></label>
                        </div>
                      </div>

                      {/* Bouton Submit */}
                      <div>
                        <button
                          className="btn-primary sib-form-block__button sib-form-block__button-with-loader"
                          style={{
                            width: "100%",
                            justifyContent: "center",
                            padding: "0.95rem 1.5rem",
                            fontSize: "0.95rem",
                            fontWeight: "700",
                            borderRadius: "0.75rem",
                            background: "linear-gradient(135deg, #277956 0%, #1e5c41 100%)",
                            color: "#FFFFFF",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.6rem",
                            minHeight: "48px",
                            boxShadow: "0 6px 20px rgba(39,121,86,0.25)",
                            letterSpacing: "0.02em",
                          }}
                          form="sib-form"
                          type="submit"
                        >
                          <Send size={18} style={{ color: "#F5C92C", flexShrink: 0 }} />
                          {t("inscriptions_page.form.btn_submit")}
                        </button>
                      </div>

                      {/* Inputs masqués Brevo */}
                      <input type="text" name="email_address_check" defaultValue="" className="input--hidden" style={{ display: "none" }} />
                      <input type="hidden" name="locale" value="fr" />
                    </form>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
