import { useEffect } from "react";

declare global {
  interface Window {
    clarity?: (method: string, key: string, value?: string) => void;
  }
}

export const PIXEL_ID = "2279783359459191";

// fbpixel.js já cria o stub e carrega fbevents.js no <head>.
// Estas funções são um fallback para casos onde fbpixel.js foi bloqueado
// (ex.: ad-blocker parcial) e para disparar eventos em navegação SPA.

function fbq(...args: unknown[]) {
  if (typeof window.fbq === "function") {
    (window.fbq as (...a: unknown[]) => void)(...args);
  }
}

function hasFbeventsScript(): boolean {
  return !!document.querySelector('script[src*="fbevents.js"]');
}

// Fallback: inicializa o pixel caso fbpixel.js tenha sido bloqueado
function ensurePixel() {
  if (typeof window === "undefined") return;
  if (!hasFbeventsScript()) {
    const t = document.createElement("script");
    t.async = true;
    t.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(t);
  }
  fbq("init", PIXEL_ID);
  fbq("track", "PageView");
}

// Chamado uma vez na montagem do app — garante pixel mesmo com fbpixel.js bloqueado
export function usePixelConsent() {
  useEffect(() => {
    if (!hasFbeventsScript()) {
      ensurePixel();
    }
  }, []);
}

// Chamado em cada troca de rota (SPA navigation) — fbq já está inicializado
export function trackPageView() {
  fbq("track", "PageView");
}

// Chamado para eventos de conversão (ex.: InitiateCheckout, ViewContent)
export function firePixelEvent(event: string, data?: Record<string, unknown>) {
  fbq("init", PIXEL_ID);
  fbq("track", event, data ?? {});
}

// Envia propriedade customizada ao Microsoft Clarity (filtrável nas gravações)
export function fireClarity(key: string, value: string) {
  if (typeof window.clarity === "function") {
    window.clarity("set", key, value);
  }
}
