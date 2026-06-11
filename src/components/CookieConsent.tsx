import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getConsentStatus, acceptConsent, declineConsent } from "../hooks/usePixelConsent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getConsentStatus() === null) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed bottom-0 left-0 right-0 z-[999] bg-[#0d0d0d] border-t border-[#c4a34f]/20 px-4 py-3 shadow-[0_-4px_24px_rgba(0,0,0,0.5)]"
    >
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
        <p className="text-[11px] text-gray-400 leading-relaxed flex-1 font-sans">
          Este site usa cookies e tecnologias de rastreamento (incluindo o Meta Pixel) para melhorar sua experiência e personalizar conteúdo. Ao continuar, você concorda com nossa{" "}
          <Link to="/privacidade" className="underline text-[#c4a34f] hover:text-[#e7c279] transition-colors">
            Política de Privacidade
          </Link>
          .
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => { acceptConsent(); setVisible(false); }}
            className="text-[11px] font-bold uppercase tracking-wider bg-gradient-to-r from-[#c4a34f] to-[#e7c279] text-black px-4 py-1.5 rounded-full hover:brightness-110 transition-all"
          >
            Aceitar
          </button>
          <button
            onClick={() => { declineConsent(); setVisible(false); }}
            className="text-[11px] text-gray-500 hover:text-gray-300 transition-colors underline"
          >
            Recusar
          </button>
        </div>
      </div>
    </div>
  );
}
