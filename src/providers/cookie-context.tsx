import React, { createContext, useContext, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

export interface CookieConsentState {
  essential: boolean; // Always true
  analytics: boolean;
  decided: boolean;
  timestamp?: string;
}

interface CookieContextType {
  consent: CookieConsentState;
  acceptAll: () => void;
  declineAll: () => void;
  savePreferences: (analytics: boolean) => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const STORAGE_KEY = "bbu_cookie_consent";

const defaultState: CookieConsentState = {
  essential: true,
  analytics: false,
  decided: false,
};

const CookieContext = createContext<CookieContextType | undefined>(undefined);

export const CookieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [consent, setConsent] = useState<CookieConsentState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          essential: true,
          analytics: Boolean(parsed.analytics),
          decided: true,
          timestamp: parsed.timestamp,
        };
      }
    } catch (e) {
      console.error("Failed to parse cookie consent from localStorage", e);
    }
    return defaultState;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const purgeNonEssentialCookies = () => {
    try {
      if (typeof document !== "undefined" && document.cookie) {
        const cookies = document.cookie.split(";");
        for (const cookie of cookies) {
          const eqPos = cookie.indexOf("=");
          const name = eqPos > -1 ? cookie.slice(0, eqPos).trim() : cookie.trim();
          if (name && name !== STORAGE_KEY) {
            const domain = window.location.hostname;
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain};`;
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${domain};`;
          }
        }
      }
      if (typeof window !== "undefined") {
        (window as unknown as Record<string, unknown>).va = undefined;
      }
    } catch (e) {
      console.error("Error purging non-essential cookies", e);
    }
  };

  React.useEffect(() => {
    if (consent.decided && !consent.analytics) {
      purgeNonEssentialCookies();
    }
  }, [consent.decided, consent.analytics]);

  const saveConsent = (analytics: boolean) => {
    const newState: CookieConsentState = {
      essential: true,
      analytics,
      decided: true,
      timestamp: new Date().toISOString(),
    };
    setConsent(newState);
    if (!analytics) {
      purgeNonEssentialCookies();
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    } catch (e) {
      console.error("Failed to save cookie consent to localStorage", e);
    }
    setIsModalOpen(false);
  };

  const acceptAll = () => {
    saveConsent(true);
  };

  const declineAll = () => {
    saveConsent(false);
  };

  const savePreferences = (analytics: boolean) => {
    saveConsent(analytics);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <CookieContext.Provider
      value={{
        consent,
        acceptAll,
        declineAll,
        savePreferences,
        isModalOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
      {consent.decided && consent.analytics && (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      )}
    </CookieContext.Provider>
  );
};

export const useCookieConsent = () => {
  const context = useContext(CookieContext);
  if (!context) {
    throw new Error("useCookieConsent must be used within a CookieProvider");
  }
  return context;
};
