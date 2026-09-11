import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { InstagramIcon, FacebookIcon, YoutubeIcon, TiktokIcon } from "@/components/customs/icons";
import { Countdown } from "@/components/customs/countdown";
import { useCookieConsent } from "@/providers/cookie-context";

const footerLinks = [
  { to: "/", labelKey: "home" },
  { to: "/concept", labelKey: "concept" },
  { to: "/parcours", labelKey: "parcours" },
  { to: "/infos-pratiques", labelKey: "infos" },
  { to: "/inscriptions", labelKey: "inscriptions" },
  // { to: "/resultats", labelKey: "resultats" },
  { to: "/faq", labelKey: "faq" },
  // { to: "/galerie", labelKey: "galerie" },
  { to: "/sponsors", labelKey: "sponsors" },
  { to: "/contact", labelKey: "contact" },
  { to: "/benevoles", labelKey: "benevoles" },
];

const socialLinks = [
  { icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com/breizhbackyard/", color: "#E1306C" },
  { icon: FacebookIcon, label: "Facebook", href: "https://www.facebook.com/people/BreizhBackyard/61588328941008/", color: "#1877F2" },
  { icon: YoutubeIcon, label: "YouTube", href: "https://www.youtube.com/@breizhbackyard", color: "#FF0000" },
  { icon: TiktokIcon, label: "TikTok", href: "https://www.tiktok.com/@breizhbackyard", color: "#000000" },
];

export const Footer = () => {
  const { t } = useTranslation();
  const { openModal } = useCookieConsent();
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: "#0f2d1d", color: "#fff", position: "relative" }}>
      {/* Organic top wave */}
      <div style={{ position: "absolute", top: "-59px", left: 0, right: 0, overflow: "hidden", lineHeight: 0, zIndex: 10 }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "60px" }}>
          <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,10 1440,30 L1440,60 L0,60 Z" fill="#0f2d1d" />
        </svg>
      </div>

      {/* Decorative background pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(to bottom, #0f2d1d 0px, transparent 30px),
                            radial-gradient(circle at 20% 80%, rgba(39,121,86,0.15) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(45,145,133,0.1) 0%, transparent 50%)`,
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, paddingTop: "5rem" }}>
        {/* Main footer content */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 1.5rem 3rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "3rem",
          }}
        >
          {/* Brand column */}
          <div style={{ gridColumn: "span 1" }}>
            <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none", marginBottom: "1.25rem" }}>
              <img
                src="/assets/logos/logo-white.svg"
                alt="Logo Breizh Backyard Ultra"
                style={{ width: "44px", height: "44px", objectFit: "contain", flexShrink: 0 }}
              />
              <div>
                <div style={{ fontFamily: "'Hobo', sans-serif", color: "#fff", fontSize: "1.05rem", lineHeight: 1 }}>
                  Breizh Backyard
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", color: "#F5C92C", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  2027
                </div>
              </div>
            </Link>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              {t("footer.description")}
            </p>

            {/* Social links */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.7)",
                    transition: "all 0.25s ease",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(245,201,44,0.2)";
                    (e.currentTarget as HTMLElement).style.borderColor = "#F5C92C";
                    (e.currentTarget as HTMLElement).style.color = "#F5C92C";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ color: "#F5C92C", fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.25rem", fontFamily: "'Inter', sans-serif" }}>
              {t("footer.nav_title")}
            </h4>
            <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {footerLinks.slice(0, 5).map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    color: "rgba(255,255,255,0.65)",
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "#8CBE4F"}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)"}
                >
                  <span style={{ color: "#4DA154", fontSize: "0.7rem" }}>›</span>
                  {t(`navbar.${link.labelKey}`)}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 style={{ color: "#F5C92C", fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.25rem", fontFamily: "'Inter', sans-serif" }}>
              {t("footer.course_title")}
            </h4>
            <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {footerLinks.slice(5).map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    color: "rgba(255,255,255,0.65)",
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "#8CBE4F"}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)"}
                >
                  <span style={{ color: "#4DA154", fontSize: "0.7rem" }}>›</span>
                  {t(`navbar.${link.labelKey}`)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact & Infos */}
          <div>
            <h4 style={{ color: "#F5C92C", fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.25rem", fontFamily: "'Inter', sans-serif" }}>
              {t("footer.info_title")}
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", color: "rgba(255,255,255,0.7)" }}>
                <MapPin size={18} style={{ color: "#277956", flexShrink: 0, marginTop: "2px" }} />
                <span>
                  {t("footer.location")}
                </span>
              </div>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <Mail size={15} style={{ color: "#8CBE4F", flexShrink: 0 }} />
                <a href="mailto:contact@breizhbackyard.com" style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.88rem", textDecoration: "none", transition: "color 0.2s ease" }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "#8CBE4F"}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)"}
                >
                  contact@breizhbackyard.com
                </a>
              </div>
              <div
                style={{
                  marginTop: "0.5rem",
                  padding: "0.75rem 1rem",
                  background: "rgba(245,201,44,0.1)",
                  border: "1px solid rgba(245,201,44,0.25)",
                  borderRadius: "0.75rem",
                }}
              >
                <div style={{ fontSize: "0.7rem", color: "#F5C92C", fontWeight: "700", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                  {t("footer.depart_dans")}
                </div>
                <Countdown targetDateStr="2027-05-15T10:00:00+02:00" hidePrefix />
                <div style={{ fontSize: "0.95rem", color: "#fff", fontFamily: "'Hobo', sans-serif", marginBottom: "0.5rem" }}>
                  {t("footer.date")}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "1.25rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
            <Link to="/mentions-legales" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", textDecoration: "none", transition: "color 0.2s ease" }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "#8CBE4F"}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"}
            >
              {t("footer.mentions")}
            </Link>
            <Link to="/politique-de-confidentialite" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", textDecoration: "none", transition: "color 0.2s ease" }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "#8CBE4F"}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"}
            >
              {t("footer.privacy", "Politique de confidentialité")}
            </Link>
            <button
              onClick={openModal}
              style={{
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.5)",
                fontSize: "0.8rem",
                cursor: "pointer",
                padding: 0,
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "#F5C92C"}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"}
            >
              {t("footer.manage_cookies", "Gestion des cookies")}
            </button>
            <Link to="/contact" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", textDecoration: "none", transition: "color 0.2s ease" }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "#8CBE4F"}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"}
            >
              {t("footer.contact")}
            </Link>
          </div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.78rem", textAlign: "center" }}>
            {t("footer.rights", { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
};
