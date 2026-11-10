import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Inter is self-hosted so no visitor data goes to Google Fonts.
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "./styles/index.css";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import "./lib/i18n";
import { CookieProvider } from "./providers/cookie-context";
import { CookieBanner } from "./components/customs/cookie-banner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <CookieProvider>
        <App />
        <CookieBanner />
      </CookieProvider>
    </BrowserRouter>
  </StrictMode>,
);
