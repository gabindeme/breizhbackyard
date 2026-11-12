import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Mail, Bell, Send, AlertCircle, CheckCircle2, X, PartyPopper } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@/components/customs/page-header";
import { RequiredMark } from "@/components/customs/form-extras";

export const Inscriptions = () => {
  const { t, i18n } = useTranslation();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Validation messages read by Brevo's script, in the current language.
  // Brevo reads them when it validates, so updating them on a language change is enough.
  useEffect(() => {
    const w = window;
    w.REQUIRED_CODE_ERROR_MESSAGE = t("inscriptions_page.brevo.required_code");
    w.LOCALE = i18n.resolvedLanguage === "en" ? "en" : "fr";
    w.EMAIL_INVALID_MESSAGE = w.SMS_INVALID_MESSAGE = t("inscriptions_page.brevo.invalid");
    w.REQUIRED_ERROR_MESSAGE = t("inscriptions_page.brevo.required");
    w.GENERIC_INVALID_MESSAGE = t("inscriptions_page.brevo.invalid");
    w.INVALID_NUMBER = t("inscriptions_page.brevo.invalid_number");
    w.INVALID_DATE = t("inscriptions_page.brevo.invalid_date");
    w.REQUIRED_MULTISELECT_MESSAGE = t("inscriptions_page.brevo.required_multiselect");
    w.translation = {
      common: {
        selectedList: t("inscriptions_page.brevo.selected_list"),
        selectedLists: t("inscriptions_page.brevo.selected_lists"),
        selectedOption: t("inscriptions_page.brevo.selected_option"),
        selectedOptions: t("inscriptions_page.brevo.selected_options"),
      },
    };
  }, [t, i18n.resolvedLanguage]);

  useEffect(() => {
    window.AUTOHIDE = false;
    // Chargement du script Brevo
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

    // Brevo's script reports a successful signup by adding this class to #success-message.
    // We show our own popup instead of Brevo's panel (hidden in CSS below).
    const successEl = document.getElementById('success-message');
    let observer: MutationObserver | null = null;
    if (successEl) {
      observer = new MutationObserver(() => {
        if (successEl.classList.contains('sib-form-message-panel--active')) {
          setShowSuccessPopup(true);
        }
      });
      observer.observe(successEl, { attributes: true, attributeFilter: ['class'] });
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);


  return (
    <div style={{ background: "#EFEFEF", overflowX: "hidden" }}>

      {/* Popup modal de confirmation d'envoi */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            key="success-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setShowSuccessPopup(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              background: "rgba(10, 30, 18, 0.72)",
              backdropFilter: "blur(6px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.5rem",
            }}
          >
            <motion.div
              key="success-modal"
              initial={{ opacity: 0, scale: 0.85, y: 32 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 320, damping: 28, delay: 0.05 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#ffffff",
                borderRadius: "1.75rem",
                padding: "2.75rem 2.25rem 2.25rem",
                maxWidth: "460px",
                width: "100%",
                boxShadow: "0 30px 80px -10px rgba(0,0,0,0.25), 0 0 0 1.5px rgba(39,121,86,0.15)",
                position: "relative",
                textAlign: "center",
                overflow: "hidden",
              }}
            >
              {/* Gradient top accent */}
              <div style={{
                position: "absolute",
                top: 0, left: 0, right: 0,
                height: "5px",
                background: "linear-gradient(90deg, #277956 0%, #8CBE4F 50%, #F5C92C 100%)",
                borderTopLeftRadius: "1.75rem",
                borderTopRightRadius: "1.75rem",
              }} />

              {/* Bouton fermer */}
              <button
                onClick={() => setShowSuccessPopup(false)}
                aria-label={t("inscriptions_page.close")}
                style={{
                  position: "absolute",
                  top: "1.1rem",
                  right: "1.1rem",
                  background: "rgba(39,121,86,0.08)",
                  border: "none",
                  borderRadius: "0.65rem",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#277956",
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(39,121,86,0.15)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(39,121,86,0.08)")}
              >
                <X size={18} strokeWidth={2} />
              </button>

              {/* Icône succès animée */}
              <motion.div
                initial={{ scale: 0, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.15 }}
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(39,121,86,0.12) 0%, rgba(140,190,79,0.15) 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem",
                  border: "2px solid rgba(39,121,86,0.2)",
                }}
              >
                <CheckCircle2 size={40} style={{ color: "#277956" }} strokeWidth={1.75} />
              </motion.div>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  background: "rgba(245,201,44,0.15)",
                  border: "1px solid rgba(245,201,44,0.4)",
                  borderRadius: "9999px",
                  padding: "0.3rem 0.85rem",
                  fontSize: "0.75rem",
                  fontWeight: "700",
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  color: "#a07a00",
                  marginBottom: "1rem",
                }}
              >
                <PartyPopper size={13} />
                {t("inscriptions_page.popup.badge")}
              </motion.div>

              {/* Titre */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                style={{
                  fontFamily: "'Hobo', sans-serif",
                  fontSize: "1.65rem",
                  color: "#1a2e22",
                  marginBottom: "0.75rem",
                  lineHeight: 1.25,
                }}
              >
                {t("inscriptions_page.popup.title")}
              </motion.h2>

              {/* Message principal */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                  color: "#4a6b56",
                  fontSize: "0.92rem",
                  lineHeight: 1.7,
                  marginBottom: "1.5rem",
                }}
              >
                {t("inscriptions_page.popup.message")}
              </motion.p>

              {/* Info email */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                style={{
                  background: "linear-gradient(135deg, rgba(39,121,86,0.07) 0%, rgba(140,190,79,0.07) 100%)",
                  border: "1px solid rgba(39,121,86,0.15)",
                  borderRadius: "1rem",
                  padding: "0.9rem 1.1rem",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.65rem",
                  textAlign: "left",
                  marginBottom: "1.75rem",
                }}
              >
                <Mail size={17} style={{ color: "#277956", flexShrink: 0, marginTop: "0.15rem" }} />
                <p style={{ margin: 0, fontSize: "0.82rem", color: "#3c5245", lineHeight: 1.55 }}>
                  {t("inscriptions_page.popup.email_hint")}
                </p>
              </motion.div>

              {/* Bouton fermer */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => setShowSuccessPopup(false)}
                style={{
                  width: "100%",
                  padding: "0.9rem 1.5rem",
                  borderRadius: "0.75rem",
                  background: "linear-gradient(135deg, #277956 0%, #1e5c41 100%)",
                  color: "#ffffff",
                  border: "none",
                  fontSize: "0.95rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  letterSpacing: "0.02em",
                  boxShadow: "0 6px 20px rgba(39,121,86,0.3)",
                  transition: "transform 0.15s, box-shadow 0.15s",
                }}
                whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(39,121,86,0.4)" }}
                whileTap={{ scale: 0.98 }}
              >
                {t("inscriptions_page.popup.btn_close")}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic CSS override & Mobile Accessibility Rules */}
      <style>{`
        .input--hidden { display: none !important; }
        /* Brevo validation, styled like the other forms: red border on .entry_errored fields, red message below. */
        .entry__error { color: var(--bbu-error); font-size: 0.8rem; margin-top: 0.35rem; display: block; font-weight: 500; }
        .entry__error:empty { display: none; }
        #sib-container .entry_errored .bbu-input { border-color: var(--bbu-error) !important; }
        .entry_errored input[type="checkbox"] { border-color: var(--bbu-error) !important; }
        #sib-container input:focus {
          border-color: #277956 !important;
          box-shadow: 0 0 0 4px rgba(39, 121, 86, 0.15) !important;
          outline: none !important;
        }
        .sib-hide-loader-icon { display: inline-block; }
        /* Brevo toggles --active on its message panels. Success is shown as a popup instead. */
        .sib-form-message-panel { display: none; }
        #error-message.sib-form-message-panel--active { display: block; }

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

        @media (max-width: 640px) {
          .bbu-form-card {
            padding: 1.5rem 1.15rem !important;
            border-radius: 1.25rem !important;
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

            {/* Formulaire Brevo + reCAPTCHA Enterprise côté droit */}
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

                  {/* Form Card */}
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
                          <label className="bbu-label" htmlFor="PRENOM">
                            {t("inscriptions_page.form.prenom_label")} <RequiredMark />
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
                            />
                          </div>
                          <label className="entry__error entry__error--primary"></label>
                        </div>
                      </div>

                      {/* Champ EMAIL */}
                      <div className="sib-input sib-form-block" style={{ marginBottom: "1.25rem" }}>
                        <div className="form__entry entry_block">
                          <label className="bbu-label" htmlFor="EMAIL">
                            {t("inscriptions_page.form.email_label")} <RequiredMark />
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
                            />
                          </div>
                          <label className="entry__error entry__error--primary"></label>
                        </div>
                      </div>

                      {/* Opt-in Checkbox */}
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
                                    cursor: "pointer",
                                    borderRadius: "0.35rem",
                                    flexShrink: 0,
                                    WebkitAppearance: "none",
                                    appearance: "none",
                                    backgroundColor: "#ffffff",
                                    border: "2px solid #277956",
                                    position: "relative" as const,
                                  }}
                                />
                                <span style={{ fontSize: "0.82rem", color: "#3c5245", lineHeight: 1.5 }}>
                                  {t("inscriptions_page.form.optin_text")}
                                  <RequiredMark />
                                </span>
                              </label>
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
                      {/* Language Brevo uses for its own messages; the Brevo form is set up in French. */}
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
