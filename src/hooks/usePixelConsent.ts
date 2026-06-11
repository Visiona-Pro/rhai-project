import { useEffect } from "react";

const PIXEL_ID = "2279783359459191";
const CONSENT_KEY = "cookie_consent";

export type ConsentStatus = "accepted" | "declined" | null;

export function getConsentStatus(): ConsentStatus {
  try {
    return (localStorage.getItem(CONSENT_KEY) as ConsentStatus) ?? null;
  } catch {
    return null;
  }
}

export function setConsentStatus(status: "accepted" | "declined") {
  try {
    localStorage.setItem(CONSENT_KEY, status);
  } catch {}
}

function initPixel() {
  if (typeof window === "undefined") return;
  // Carrega fbevents.js dinamicamente após consentimento
  const existing = document.querySelector('script[src*="fbevents.js"]');
  if (!existing) {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }
  window.fbq?.("init", PIXEL_ID);
  window.fbq?.("track", "PageView");
}

// Inicializa pixel se já houver consentimento salvo
export function usePixelConsent() {
  useEffect(() => {
    if (getConsentStatus() === "accepted") {
      initPixel();
    }
  }, []);
}

// Chamado pelo banner ao aceitar
export function acceptConsent() {
  setConsentStatus("accepted");
  initPixel();
}

// Chamado pelo banner ao recusar
export function declineConsent() {
  setConsentStatus("declined");
}
