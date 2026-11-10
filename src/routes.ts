import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

// Parcours, Resultats and Galerie are parked on purpose: their pages are kept in src/pages but not routed.
export default [
  // Home renders its own Navbar (inside the full-screen hero) and Footer.
  index("routes/home.tsx"),
  // Every other page gets Navbar and Footer from the layout.
  layout("routes/layout.tsx", [
    route("concept", "routes/concept.tsx"),
    route("infos-pratiques", "routes/infos-pratiques.tsx"),
    route("inscriptions", "routes/inscriptions.tsx"),
    route("bienvenue", "routes/bienvenue.tsx"),
    route("faq", "routes/faq.tsx"),
    route("sponsors", "routes/sponsors.tsx"),
    route("contact", "routes/contact.tsx"),
    route("benevoles", "routes/benevoles.tsx"),
    route("mentions-legales", "routes/mentions-legales.tsx"),
    route("politique-de-confidentialite", "routes/politique-de-confidentialite.tsx"),
    route("*", "routes/not-found.tsx"),
  ]),
] satisfies RouteConfig;
