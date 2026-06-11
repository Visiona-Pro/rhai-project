import { motion } from "motion/react";
import ObrigadoBenefitList from "./BenefitList";
import offerImage from "../../assets/images/regenerated_image_1780716160590.png";
import {
  CHECKOUT_URL,
  MEMBERS_URL,
  PRICE_INSTALLMENTS,
  PRICE_INSTALLMENT_VALUE,
  PRICE_CASH,
  PRICE_CURRENCY,
} from "../../config/obrigado";

export default function ObrigadoOfferSection() {
  const [installmentInteger, installmentCents] = PRICE_INSTALLMENT_VALUE.split(",");

  return (
    <section aria-label="Oferta exclusiva — Café sem Migalhas" className="relative px-4 pt-1 pb-0 max-w-4xl mx-auto z-10 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full bg-[#0a0a0a] border border-[#c4a34f]/15 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-[100px_1fr] gap-x-4 gap-y-3 sm:flex sm:flex-row relative p-3 sm:p-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(#c4a34f_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

        {/* Image */}
        <div className="col-start-1 row-start-1 w-full h-[145px] sm:w-[150px] md:w-[210px] sm:max-w-none sm:h-auto sm:min-h-[220px] md:min-h-[300px] sm:p-2.5 shrink-0 flex flex-col bg-black/60 sm:border-r border-[#c4a34f]/10 justify-center rounded-xl overflow-hidden sm:rounded-none">
          <div className="relative w-full h-full min-h-[140px] sm:min-h-[149px] overflow-hidden rounded-xl border border-[#c4a34f]/15 sm:border-[#c4a34f]/10 shadow-lg sm:shadow-2xl select-none group">
            <img
              src={offerImage}
              alt="Café sem Migalhas por Rhaiane Pimenta"
              referrerPolicy="no-referrer"
              width={420}
              height={600}
              loading="eager"
              fetchPriority="high"
              className="absolute inset-0 w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-700 ease-in-out hover:scale-105"
            />
          </div>
        </div>

        {/* Content */}
        <div className="contents sm:flex sm:flex-col sm:flex-1 sm:p-3 md:p-4 sm:justify-between sm:min-w-0">
          <div className="col-start-2 row-start-1 mb-2 sm:mb-1.5 flex flex-col justify-center min-w-0">
            <h2 className="font-serif text-sm xs:text-base sm:text-2xl md:text-[23px] font-bold tracking-tight mb-0.5">
              <span className="ob-gold-brushed-text">CAFÉ SEM MIGALHAS</span>
            </h2>
            <p className="font-serif italic text-[9.5px] xs:text-[10px] sm:text-[11px] md:text-xs text-[#e7c279] mb-1 sm:mb-1.5">
              seu cafezinho exclusivo comigo
            </p>
            <p
              className="text-[9px] xs:text-[9.5px] sm:text-[10px] text-stone-300/95 leading-[13px] font-sans border-l pl-2 text-justify"
              style={{ borderColor: "rgba(255, 255, 255, 0.4)", lineHeight: "13px" }}
            >
              Cada encontro tem um propósito dentro do seu processo. Você não vai ouvir teorias prontas nem conselhos genéricos. Eu vou te ajudar a enxergar com clareza o que está acontecendo na sua vida.
            </p>
          </div>

          {/* Benefits */}
          <div className="col-start-1 col-end-3 row-start-2 w-full border-t border-[#c4a34f]/10 pt-1.5 mb-1.5">
            <h3 className="ob-section-title text-center">
              Quatro encontros que<br />
              <em>o padrão não espera você ter.</em>
            </h3>
            <ObrigadoBenefitList />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="ob-urgency-bar rounded-xl flex items-center justify-center gap-1.5 text-center mt-2 relative z-10"
            >
              <svg className="w-3.5 h-3.5 text-[#ff9090] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>Ao fechar a página não existe link de retorno. Oportunidade única. Vagas limitadas.</span>
            </motion.div>
          </div>

          {/* Pricing + CTA */}
          <div className="col-start-1 col-end-3 row-start-3 w-full flex flex-row items-center gap-2 mt-1 pt-2 border-t border-[#c4a34f]/10">
            <div className="border border-[#c4a34f]/30 bg-[#c4a34f]/5 rounded-xl p-1 md:p-1.5 text-center shrink-0 flex flex-col justify-center w-[120px] xs:w-[145px] sm:w-[180px] md:w-[190px] max-w-[45%] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_8px_20px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-center gap-[4px] !ml-0 !mt-0.5">
                <span className="font-light text-[#f2ece0]/40 font-sans !mt-[12px] !text-[9px] xs:text-[10px]">
                  {PRICE_INSTALLMENTS}x de
                </span>
                <span className="font-serif text-[21px] xs:text-[26px] sm:text-[30px] md:text-[34px] lg:text-[36px] font-bold text-[#f2ece0] leading-none ml-[-1px] mt-[-4px] inline-block">
                  <span className="text-[10px] xs:text-[13px] md:text-[15px] font-normal align-super text-[#c9933a]">{PRICE_CURRENCY}</span>
                  {installmentInteger}
                  <span className="text-[14px] xs:text-[18px] md:text-[22px] font-normal align-baseline text-[#f2ece0]">,{installmentCents}</span>
                </span>
              </div>
              <p className="text-[7.5px] xs:text-[8.5px] font-normal text-[#f2ece0]/30 uppercase text-center !mt-0.5">
                no cartão ou à vista por {PRICE_CURRENCY}{PRICE_CASH}
              </p>
            </div>

            <div className="flex-1 flex flex-col justify-center gap-1 min-w-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 12 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-[340px] mx-auto flex items-center justify-center"
              >
                <div className="ob-btn-golden-backlight" />
                <motion.a
                  aria-label="Comprar Café sem Migalhas — abre o checkout em nova aba"
                  href={CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      try { window.fbq?.("track", "InitiateCheckout"); } catch {}
                      try {
                        window.gtag?.("event", "begin_checkout", {
                          value: Number(PRICE_CASH),
                          currency: "BRL",
                          items: [{ item_id: "cafe_sem_migalhas", item_name: "Café sem Migalhas", price: Number(PRICE_CASH), quantity: 1 }],
                        });
                      } catch {}
                    }
                  }}
                  className="ob-btn-glitter-gold text-center relative z-10 w-full no-underline"
                >
                  <span className="relative z-10 flex items-center justify-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] font-bold !text-[13px]">
                    QUERO MEUS ENCONTROS
                  </span>
                </motion.a>
              </motion.div>

              <div className="flex items-center justify-center gap-1.5 text-[9px] text-gray-500">
                <svg width="10" height="10" fill="currentColor" viewBox="0 0 24 24" className="text-[#c4a34f]/80">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
                <span>Vagas abertas apenas enquanto esta página estiver ativa.</span>
              </div>
            </div>
          </div>

          {/* Rejection link */}
          <div className="col-start-1 col-end-3 row-start-4 w-full text-center mt-2.5 pt-1 border-t border-[#c4a34f]/5">
            <a
              href={MEMBERS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-gray-600 hover:text-gray-400 transition-colors"
            >
              Não quero.{" "}
              <span className="underline decoration-[#c4a34f] text-[#e7c279]">
                Voltar pro meu acesso.
              </span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
