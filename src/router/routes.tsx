import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Lazy-loaded pages for code splitting (performance mobile)
const Home = lazy(() => import("@/pages/Home").then((m) => ({ default: m.Home })));
const LayoutWrapper = lazy(() =>
  import("./layout-wrapper").then((m) => ({ default: m.LayoutWrapper }))
);

const Concept = lazy(() => import("@/pages/Concept").then((m) => ({ default: m.Concept })));
const Parcours = lazy(() => import("@/pages/Parcours").then((m) => ({ default: m.Parcours })));
const InfosPratiques = lazy(() => import("@/pages/InfosPratiques").then((m) => ({ default: m.InfosPratiques })));
const Inscriptions = lazy(() => import("@/pages/Inscriptions").then((m) => ({ default: m.Inscriptions })));
const Bienvenue = lazy(() => import("@/pages/Bienvenue").then((m) => ({ default: m.Bienvenue })));
// const Resultats = lazy(() => import("@/pages/Resultats").then((m) => ({ default: m.Resultats })));
const FAQ = lazy(() => import("@/pages/FAQ").then((m) => ({ default: m.FAQ })));
const Sponsors = lazy(() => import("@/pages/Sponsors").then((m) => ({ default: m.Sponsors })));
// const Galerie = lazy(() => import("@/pages/Galerie").then((m) => ({ default: m.Galerie })));
const Contact = lazy(() => import("@/pages/Contact").then((m) => ({ default: m.Contact })));
const Benevoles = lazy(() => import("@/pages/Benevoles").then((m) => ({ default: m.Benevoles })));

const NotFound = lazy(() => import("@/pages/NotFound").then((m) => ({ default: m.NotFound })));

// Minimal loading fallback
const PageLoader = () => (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#EFEFEF",
    }}
  >
    <div
      style={{
        width: "40px",
        height: "40px",
        border: "3px solid #D0D0D0",
        borderTopColor: "#277956",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }}
    />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
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
          <Route path="/parcours" element={<Parcours />} />
          <Route path="/infos-pratiques" element={<InfosPratiques />} />
          <Route path="/inscriptions" element={<Inscriptions />} />
          <Route path="/bienvenue" element={<Bienvenue />} />
          {/* <Route path="/resultats" element={<Resultats />} /> */}
          <Route path="/faq" element={<FAQ />} />
          <Route path="/sponsors" element={<Sponsors />} />
          {/* <Route path="/galerie" element={<Galerie />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/benevoles" element={<Benevoles />} />
          <Route path="/mentions-legales" element={<Contact />} />
          
          {/* 404 Page Not Found (with navbar/footer) */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
