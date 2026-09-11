import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
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
