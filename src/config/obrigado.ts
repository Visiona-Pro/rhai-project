const DEFAULT_CHECKOUT_URL = "https://pay.kiwify.com.br/KgbOBvS";
const DEFAULT_MEMBERS_URL = "https://members.kiwify.com/?club=52753ac9-0a67-4523-95df-6b9b1c642e49";

export const PRICE_INSTALLMENTS = 12;
export const PRICE_INSTALLMENT_VALUE = "95,15";
export const PRICE_CASH = "920";
export const PRICE_CURRENCY = "R$";

function validateKiwifyUrl(url: string, fallback: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return fallback;
    if (!parsed.hostname.endsWith("kiwify.com.br") && !parsed.hostname.endsWith("kiwify.com")) return fallback;
    return url;
  } catch {
    return fallback;
  }
}

const rawCheckoutUrl = (import.meta.env.VITE_UPSELL_CHECKOUT_URL as string) || DEFAULT_CHECKOUT_URL;
const rawMembersUrl  = (import.meta.env.VITE_UPSELL_MEMBERS_URL  as string) || DEFAULT_MEMBERS_URL;

export const CHECKOUT_URL = validateKiwifyUrl(rawCheckoutUrl, DEFAULT_CHECKOUT_URL);
export const MEMBERS_URL  = validateKiwifyUrl(rawMembersUrl,  DEFAULT_MEMBERS_URL);
