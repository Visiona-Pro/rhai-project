import { useEffect } from "react";

export const PIXEL_ID = "2279783359459191";
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

function hasFbeventsScript(): boolean {
  return !!document.querySelector('script[src*="fbevents.js"]');
}

// Garante que fbq("init") sempre precede qualquer fbq("track") na fila,
// independente da ordem de execução dos efeitos React (filhos antes de pais).
// fbevents.js ignora chamadas duplicadas de init com o mesmo pixel ID.
export function firePixelEvent(event: string, data?: Record<string, unknown>) {
  if (getConsentStatus() === "declined") return;
  if (typeof window.fbq !== "function") return;
  window.fbq("init", PIXEL_ID);
  window.fbq("track", event, data);
}

export function initPixel(options?: { pageView?: boolean }) {
  if (typeof window === "undefined") return;
  if (getConsentStatus() === "declined") return;

  const hadFbevents = hasFbeventsScript();

  if (!hadFbevents) {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }

  window.fbq?.("init", PIXEL_ID);

  const shouldTrackPageView = options?.pageView ?? !hadFbevents;
  if (shouldTrackPageView) {
    window.fbq?.("track", "PageView");
  }
}

// Fallback: garante pixel se fbpixel.js não carregou (ex.: bloqueador parcial)
export function usePixelConsent() {
  useEffect(() => {
    if (getConsentStatus() === "declined") return;
    if (!hasFbeventsScript()) {
      initPixel({ pageView: true });
    }
  }, []);
}

// Dispara PageView a cada troca de rota (SPA navigation)
export function trackPageView() {
  if (getConsentStatus() === "declined") return;
  if (typeof window.fbq !== "function") return;
  window.fbq("track", "PageView");
}

// Chamado pelo banner ao aceitar (ex.: usuário havia recusado antes)
export function acceptConsent() {
  const hadFbevents = hasFbeventsScript();
  setConsentStatus("accepted");
  initPixel({ pageView: !hadFbevents });
}

// Chamado pelo banner ao recusar
export function declineConsent() {
  setConsentStatus("declined");
}
