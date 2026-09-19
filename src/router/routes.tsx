import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Lazy-loaded pages for code splitting (performance mobile)
const Home = lazy(() => import("@/pages/Home").then((m) => ({ default: m.Home })));
const LayoutWrapper = lazy(() =>
  import("./layout-wrapper").then((m) => ({ default: m.LayoutWrapper }))
);

const Concept = lazy(() => import("@/pages/Concept").then((m) => ({ default: m.Concept })));
// const Parcours = lazy(() => import("@/pages/Parcours").then((m) => ({ default: m.Parcours })));
const InfosPratiques = lazy(() => import("@/pages/InfosPratiques").then((m) => ({ default: m.InfosPratiques })));
const Inscriptions = lazy(() => import("@/pages/Inscriptions").then((m) => ({ default: m.Inscriptions })));
const Bienvenue = lazy(() => import("@/pages/Bienvenue").then((m) => ({ default: m.Bienvenue })));
// const Resultats = lazy(() => import("@/pages/Resultats").then((m) => ({ default: m.Resultats })));
const FAQ = lazy(() => import("@/pages/FAQ").then((m) => ({ default: m.FAQ })));
const Sponsors = lazy(() => import("@/pages/Sponsors").then((m) => ({ default: m.Sponsors })));
// const Galerie = lazy(() => import("@/pages/Galerie").then((m) => ({ default: m.Galerie })));
const Contact = lazy(() => import("@/pages/Contact").then((m) => ({ default: m.Contact })));
const Benevoles = lazy(() => import("@/pages/Benevoles").then((m) => ({ default: m.Benevoles })));
const MentionsLegales = lazy(() =>
  import("@/pages/MentionsLegales").then((m) => ({ default: m.MentionsLegales }))
);
const PolitiqueConfidentialite = lazy(() =>
  import("@/pages/PolitiqueConfidentialite").then((m) => ({ default: m.PolitiqueConfidentialite }))
);

const NotFound = lazy(() => import("@/pages/NotFound").then((m) => ({ default: m.NotFound })));

// Branded BBU loading fallback
const PageLoader = () => (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "28px",
      background: "#EFEFEF",
    }}
  >
    {/* Logo */}
    <img
      src="/assets/logos/logo-white.svg"
      alt="Breizh Backyard Ultra"
      style={{
        height: "64px",
        width: "auto",
        animation: "bbuPulse 1.8s ease-in-out infinite",
      }}
    />

    {/* Spinner ring */}
    <div style={{ position: "relative", width: "44px", height: "44px" }}>
      {/* Static track */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: "3px solid #D0D0D0",
        }}
      />
      {/* Animated arc */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: "3px solid transparent",
          borderTopColor: "#277956",
          borderRightColor: "#2D9185",
          animation: "bbuSpin 0.9s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        }}
      />
    </div>

    <style>{`
      @keyframes bbuSpin {
        to { transform: rotate(360deg); }
      }
      @keyframes bbuPulse {
        0%, 100% { opacity: 1;   transform: scale(1); }
        50%       { opacity: 0.6; transform: scale(0.96); }
      }
    `}</style>
  </div>
);

export const Router = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Home — sans navbar/footer car hero pleine page */}
        <Route path="/" element={<Home />} />

        {/* Toutes les autres pages — avec navbar + footer */}
        <Route element={<LayoutWrapper />}>
          <Route path="/concept" element={<Concept />} />
          {/* <Route path="/parcours" element={<Parcours />} /> */}
          <Route path="/infos-pratiques" element={<InfosPratiques />} />
          <Route path="/inscriptions" element={<Inscriptions />} />
          <Route path="/bienvenue" element={<Bienvenue />} />
          {/* <Route path="/resultats" element={<Resultats />} /> */}
          <Route path="/faq" element={<FAQ />} />
          <Route path="/sponsors" element={<Sponsors />} />
          {/* <Route path="/galerie" element={<Galerie />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/benevoles" element={<Benevoles />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/politique-de-confidentialite" element={<PolitiqueConfidentialite />} />

          {/* 404 Page Not Found (with navbar/footer) */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
