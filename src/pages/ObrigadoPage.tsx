import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import ObrigadoTopBar from "../components/obrigado/TopBar";
import ObrigadoHeroSection from "../components/obrigado/HeroSection";
import ObrigadoOfferSection from "../components/obrigado/OfferSection";
import ObrigadoErrorBoundary from "../components/obrigado/ErrorBoundary";
import { VturbPlayer } from "../components/obrigado/VturbPlayer";
import { firePixelEvent } from "../hooks/usePixelConsent";
import { CHECKOUT_URL } from "../config/obrigado";

// 3 minutos e 7 segundos
const CTA_CUE_SECONDS = 187;

export default function ObrigadoPage() {
  const [showOverlay, setShowOverlay] = useState(true);
  const [showCta, setShowCta] = useState(false);
  const [pageVisible, setPageVisible] = useState(false);
  const ctaFiredRef = useRef(false);

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    try { firePixelEvent("ViewContent"); } catch {}
    return () => { document.head.removeChild(meta); };
  }, []);

  const handleTimeUpdate = (t: number) => {
    if (!ctaFiredRef.current && t >= CTA_CUE_SECONDS) {
      ctaFiredRef.current = true;
      setShowCta(true);
    }
  };

  const handleVideoEnded = () => {
    // Cross-fade: página começa a aparecer enquanto overlay some
    setPageVisible(true);
    setShowOverlay(false);
  };

  return (
    <div className="relative w-full bg-[#050505] text-[#e5e7eb] font-sans antialiased overflow-x-hidden pb-12">

      {/* ── CINEMA OVERLAY ─────────────────────────────────────────── */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            key="cinema"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center"
          >
            {/* Luzes ambientes douradas */}
            <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] bg-gradient-to-br from-[#c4a34f]/10 to-transparent rounded-full blur-[100px] sm:blur-[160px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-gradient-to-bl from-[#e7c279]/6 to-transparent rounded-full blur-[80px] sm:blur-[140px] pointer-events-none" />

            {/* Player — vídeo vertical 9:16; o CTA é ancorado a este wrapper
                para subir exatamente na largura do vídeo */}
            <div className="w-full px-3 sm:px-6 mx-auto flex justify-center">
              <div className="relative h-[64vh] sm:h-[72vh] aspect-[9/16] max-w-full">
                <VturbPlayer
                  src="https://pub-376e95972e5d4a7c80693b50c84d09e4.r2.dev/UPSELL_web_v2.mp4"
                  onTimeUpdate={handleTimeUpdate}
                  onVideoEnded={handleVideoEnded}
                  containerClassName="relative w-full h-full bg-black rounded-lg sm:rounded-xl overflow-hidden shadow-2xl group font-sans"
                  disablePause
                />

                {/* Botão de compra — sobe no segundo 3:07, alinhado ao vídeo */}
                <AnimatePresence>
                  {showCta && (
                    <motion.div
                      key="cta-bar"
                      initial={{ y: 80, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 40, opacity: 0 }}
                      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full left-0 right-0 mt-3 flex flex-col items-center gap-2 z-10"
                    >
                      <div className="relative w-full">
                        <div className="ob-btn-golden-backlight" />
                        <motion.a
                          href={CHECKOUT_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => { try { firePixelEvent("InitiateCheckout"); } catch {} }}
                          className="ob-btn-glitter-gold text-center relative z-10 w-full no-underline block"
                          animate={{ scale: [1, 1.025, 1] }}
                          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                        >
                          <span className="relative z-10 flex items-center justify-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] font-bold !text-[14px] sm:!text-[17px]">
                            QUERO MEUS ENCONTROS
                          </span>
                        </motion.a>
                      </div>
                      <p className="text-[10px] text-stone-500 tracking-wide text-center">
                        Vagas limitadas · oferta válida apenas nesta página
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PÁGINA COMPLETA — aparece após o vídeo ─────────────────── */}
      <motion.div
        animate={{ opacity: pageVisible ? 1 : 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className={pageVisible ? undefined : "pointer-events-none select-none"}
      >
        {/* Luzes de fundo */}
        <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-gradient-to-br from-[#c4a34f]/10 to-transparent rounded-full blur-[90px] sm:blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-5 w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] bg-gradient-to-bl from-[#e7c279]/5 to-transparent rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />
        <div className="absolute top-[85%] left-0 -translate-y-1/2 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-gradient-to-tr from-[#c4a34f]/5 to-transparent rounded-full blur-[70px] sm:blur-[120px] pointer-events-none" />

        <ObrigadoTopBar />

        <ObrigadoErrorBoundary>
          <main className="relative w-full flex flex-col gap-0 pb-0">
            <ObrigadoHeroSection />
            <ObrigadoOfferSection />
          </main>
        </ObrigadoErrorBoundary>
      </motion.div>
    </div>
  );
}
