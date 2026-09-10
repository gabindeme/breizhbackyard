import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FR, GB } from "country-flag-icons/react/3x2";
import { listOfLocales, getFullNamesOfLocales } from "@/lib/i18n";

const navLinks = [
  { to: "/concept", key: "concept" },
  { to: "/parcours", key: "parcours" },
  { to: "/infos-pratiques", key: "infos" },
  // { to: "/resultats", key: "resultats" },
  { to: "/faq", key: "faq" },
  { to: "/sponsors", key: "sponsors" },
  // { to: "/galerie", key: "galerie" },
  { to: "/contact", key: "contact" },
  { to: "/benevoles", key: "benevoles" },
];

const BRFlag = ({ style }: { style?: React.CSSProperties }) => (
  <img src="/Gwenn_ha_du.svg" alt="Drapeau Breton" style={{ ...style, objectFit: "cover" }} />
);

const LanguageDropdown = ({ closeMenu, isMobile = false }: { closeMenu?: () => void, isMobile?: boolean }) => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const changeLang = (l: string) => {
    localStorage.setItem("i18nextLng", l);
    i18n.changeLanguage(l);
    setOpen(false);
    if (closeMenu) closeMenu();
  };

  const getFlag = (l: string) => {
    if (l === "fr") return <FR style={{ width: 22, borderRadius: 2 }} />;
    if (l === "en") return <GB style={{ width: 22, borderRadius: 2 }} />;
    return <BRFlag style={{ width: 22, borderRadius: 2, border: "1px solid rgba(0,0,0,0.1)" }} />;
  };

  return (
    <div ref={ref} style={{ position: "relative", width: isMobile ? "100%" : "auto" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: isMobile ? "space-between" : "center",
          gap: "0.5rem",
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.2)",
          padding: isMobile ? "0.85rem 1rem" : "0.5rem 0.75rem",
          borderRadius: "0.75rem",
          color: "#fff",
          cursor: "pointer",
          fontSize: "0.85rem",
          fontWeight: "600",
          width: isMobile ? "100%" : "auto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {getFlag(i18n.language)}
          <span style={{ textTransform: "uppercase" }}>{i18n.language}</span>
        </div>
        <ChevronDown size={14} style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "0.2s" }} />
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: isMobile ? "auto" : "120%",
            bottom: isMobile ? "110%" : "auto",
            right: 0,
            left: isMobile ? 0 : "auto",
            background: "#fff",
            borderRadius: "0.75rem",
            padding: "0.5rem",
            minWidth: "150px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
            border: "1px solid #D0D0D0",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
            zIndex: 1000,
          }}
        >
          {listOfLocales.map((l) => (
            <button
              key={l}
              onClick={() => changeLang(l)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.5rem 0.75rem",
                border: "none",
                background: i18n.language === l ? "rgba(39,121,86,0.1)" : "transparent",
                borderRadius: "0.5rem",
                cursor: "pointer",
                textAlign: "left",
                color: i18n.language === l ? "#277956" : "#4a6b56",
                fontWeight: i18n.language === l ? "700" : "500",
                fontSize: "0.85rem",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => { if (i18n.language !== l) (e.currentTarget as HTMLElement).style.background = "#f0f4f1"; }}
              onMouseLeave={(e) => { if (i18n.language !== l) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              {getFlag(l)}
              {getFullNamesOfLocales(l)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  const close = () => setOpen(false);

  useEffect(() => {
    close();
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        close();
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: scrolled ? "1rem" : 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: scrolled ? "calc(100% - 2rem)" : "100%",
          maxWidth: scrolled ? "1200px" : "100%",
          zIndex: 100,
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          backgroundColor: scrolled ? "rgba(22, 71, 48, 0.85)" : "rgba(22, 71, 48, 0)",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderRadius: scrolled ? "100px" : "0px",
          border: `1px solid ${scrolled ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0)"}`,
          boxShadow: scrolled ? "0 10px 40px rgba(0,0,0,0.2)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: scrolled ? "0 1.5rem" : "0 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: scrolled ? "64px" : "80px",
            transition: "height 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.4s",
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            onClick={close}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <img
              src="/logo-white.svg"
              alt="Logo Breizh Backyard Ultra"
              style={{ width: "40px", height: "40px", objectFit: "contain", flexShrink: 0 }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
              <span
                style={{
                  fontFamily: "'Hobo', sans-serif",
                  fontWeight: "500",
                  fontSize: "1.05rem",
                  color: "#fff",
                  lineHeight: 1,
                  letterSpacing: "0.02em",
                }}
              >
                Breizh Backyard
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: "600",
                  fontSize: "0.65rem",
                  color: "#F5C92C",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  lineHeight: 1,
                }}
              >
                Ultra
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav
            style={{
              display: "none",
              alignItems: "center",
              gap: "0.25rem",
            }}
            className="desktop-nav"
          >
            <Link
              to="/"
              className={`nav-link ${isActive("/") ? "active" : ""}`}
              style={{ padding: "0.4rem 0.75rem", borderRadius: "0.5rem" }}
            >
              {t("navbar.home")}
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link ${isActive(link.to) ? "active" : ""}`}
                style={{ padding: "0.4rem 0.75rem", borderRadius: "0.5rem" }}
              >
                {t(`navbar.${link.key}`)}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div
            style={{ display: "none", alignItems: "center", gap: "1rem" }}
            className="desktop-cta"
          >
            <LanguageDropdown />
            <Link to="/inscriptions" className="btn-primary" style={{ padding: "0.55rem 1.25rem", fontSize: "0.82rem" }}>
              {t("navbar.newsletter")} →
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setOpen(!open)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "44px",
              height: "44px",
              background: "rgba(255,255,255,0.1)",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
              color: "#fff",
              transition: "background 0.2s ease",
            }}
            aria-label="Menu"
            className="mobile-burger"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {open && (
        <div
          className="mobile-nav-overlay"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <div
        ref={menuRef}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(320px, 85vw)",
          background: "linear-gradient(160deg, #164730 0%, #1e5c3e 50%, #1a4d36 100%)",
          zIndex: 101,
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-8px 0 40px rgba(0,0,0,0.3)",
        }}
      >
        {/* Drawer header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Link to="/" onClick={close} style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            <img
              src="/logo-white.svg"
              alt="Logo Breizh Backyard Ultra"
              style={{ width: "32px", height: "32px", objectFit: "contain", flexShrink: 0 }}
            />
            <span style={{ fontFamily: "'Hobo', sans-serif", color: "#fff", fontSize: "1rem" }}>
              Breizh Backyard Ultra
            </span>
          </Link>
          <button
            onClick={close}
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "none",
              borderRadius: "0.5rem",
              color: "#fff",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav links */}
        <nav style={{ padding: "1rem 1.5rem", flex: 1 }}>
          <Link
            to="/"
            onClick={close}
            style={{
              display: "block",
              padding: "0.85rem 1rem",
              color: location.pathname === "/" ? "#F5C92C" : "rgba(255,255,255,0.9)",
              fontWeight: location.pathname === "/" ? "700" : "500",
              fontSize: "1rem",
              textDecoration: "none",
              borderRadius: "0.75rem",
              background: location.pathname === "/" ? "rgba(245,201,44,0.12)" : "transparent",
              marginBottom: "0.25rem",
              transition: "all 0.2s ease",
            }}
          >
            {t("navbar.home")}
          </Link>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={close}
              style={{
                display: "block",
                padding: "0.85rem 1rem",
                color: isActive(link.to) ? "#F5C92C" : "rgba(255,255,255,0.9)",
                fontWeight: isActive(link.to) ? "700" : "500",
                fontSize: "1rem",
                textDecoration: "none",
                borderRadius: "0.75rem",
                background: isActive(link.to) ? "rgba(245,201,44,0.12)" : "transparent",
                marginBottom: "0.25rem",
                transition: "all 0.2s ease",
              }}
            >
              {t(`navbar.${link.key}`)}
            </Link>
          ))}
        </nav>

        {/* Mobile CTA */}
        <div style={{ padding: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <LanguageDropdown isMobile={true} />
          <Link
            to="/inscriptions"
            onClick={close}
            className="btn-primary"
            style={{ width: "100%", justifyContent: "center" }}
          >
            {t("navbar.newsletter")} →
          </Link>
          <p style={{ textAlign: "center", marginTop: "0.25rem", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>
            Départ : Samedi 15 mai 2027 — 10h00
          </p>
        </div>
      </div>

      {/* Desktop nav styles via inline style tag */}
      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav { display: flex !important; }
          .desktop-cta { display: flex !important; }
          .mobile-burger { display: none !important; }
        }
      `}</style>
    </>
  );
};
