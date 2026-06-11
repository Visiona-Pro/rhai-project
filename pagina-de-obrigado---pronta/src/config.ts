/**
 * Configurações de URLs externas do projeto.
 */

// URL padrão de Checkout do produto oferecido (Café sem Migalhas)
const DEFAULT_CHECKOUT_URL = "https://pay.kiwify.com.br/KgbOBvS";
const DEFAULT_MEMBERS_URL = "https://members.kiwify.com.br";

// Constantes de Preços Sincronizadas
export const PRICE_INSTALLMENTS = 12;
export const PRICE_INSTALLMENT_VALUE = "95,15";
export const PRICE_CASH = "920";
export const PRICE_CURRENCY = "R$";

/**
 * Valida de forma robusta se uma string é uma URL válida e segura de checkout da Kiwify.
 * Se a URL for inválida ou não pertencer ao ecossistema Kiwify, usa o fallback.
 */
export function validateUrl(url: string, fallback: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      if (import.meta.env.DEV) {
        console.warn(`URL inválida detectada (protocolo incorreto): ${url}. Usando fallback.`);
      }
      return fallback;
    }
    // Garante que pertença ao ecossistema kiwify para maior segurança
    if (!parsed.hostname.endsWith("kiwify.com.br")) {
      if (import.meta.env.DEV) {
        console.warn(`URL não pertence ao ecossistema Kiwify: ${url}. Usando fallback por segurança.`);
      }
      return fallback;
    }
    return url;
  } catch (e) {
    if (import.meta.env.DEV) {
      console.warn(`Erro ao validar a URL "${url}":`, e);
    }
    return fallback;
  }
}

// Carrega das variáveis de ambiente de forma segura, com fallback padrão
const rawCheckoutUrl = (import.meta.env.VITE_CHECKOUT_URL as string) || DEFAULT_CHECKOUT_URL;
const rawMembersUrl = (import.meta.env.VITE_MEMBERS_URL as string) || DEFAULT_MEMBERS_URL;

export const CHECKOUT_URL = validateUrl(rawCheckoutUrl, DEFAULT_CHECKOUT_URL);
export const MEMBERS_URL = validateUrl(rawMembersUrl, DEFAULT_MEMBERS_URL);

if (import.meta.env.DEV && MEMBERS_URL === "https://members.kiwify.com.br") {
  console.warn("⚠️ VITE_MEMBERS_URL está apontando para a URL genérica do Kiwify. Configure a URL completa com o slug do produto no .env.local");
}
