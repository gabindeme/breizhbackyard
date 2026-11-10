// Document shell for every page (replaces index.html + main.tsx).
// Inter is self-hosted so no visitor data goes to Google Fonts.
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "./styles/index.css";
import "./lib/i18n";

import { useEffect } from "react";
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { useTranslation } from "react-i18next";
import { CookieProvider } from "./providers/cookie-context";
import { CookieBanner } from "./components/customs/cookie-banner";
import { storageGet } from "./lib/safe-storage";

export function Layout({ children }: { children: React.ReactNode }) {
  // Subscribing to the language re-renders <Meta />, so titles and descriptions follow a language switch.
  const { i18n } = useTranslation();
  return (
    <html lang={i18n.resolvedLanguage ?? "fr"}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <link rel="icon" type="image/svg+xml" href="/assets/logos/logo-white.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preload" href="/fonts/hobo.woff2" as="font" type="font/woff2" crossOrigin="" />
        <meta name="author" content="Breizh Backyard Ultra" />
        <meta name="theme-color" content="#113322" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Breizh Backyard" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#113322" />
        <meta name="msapplication-navbutton-color" content="#113322" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { i18n } = useTranslation();

  // Pages are pre-rendered in French. A visitor who chose another language gets it right after
  // hydration (reading it earlier would make the first render differ from the HTML).
  useEffect(() => {
    const saved = storageGet("i18nextLng");
    if (saved && saved !== i18n.resolvedLanguage) i18n.changeLanguage(saved);
  }, [i18n]);

  return (
    <CookieProvider>
      <Outlet />
      <CookieBanner />
    </CookieProvider>
  );
}

export function ErrorBoundary({ error }: { error: unknown }) {
  const message = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : "Une erreur est survenue.";
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "2rem", textAlign: "center" }}>
      <div>
        <h1 style={{ fontFamily: "'Hobo', sans-serif", color: "var(--bbu-green-dark)" }}>Breizh Backyard Ultra</h1>
        <p>{message}</p>
        <a href="/">breizhbackyard.com</a>
      </div>
    </main>
  );
}
