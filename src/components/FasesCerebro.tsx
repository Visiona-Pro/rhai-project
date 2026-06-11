import React, { useState, useRef } from 'react';
import { MALE_BRAIN_PHASES } from '../data';
import { motion, AnimatePresence, useInView } from 'motion/react';

export default function FasesCerebro() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: "100px", once: true });

  return (
    <section ref={sectionRef} id="mecanismo-section" className="section-base bg-satin-onyx relative overflow-hidden"> {/* CORRIGIDO: Removido height fixo de 576px e margem negativa */}
      {/* Editorial backdrop textures */}
      <div className="absolute top-0 right-0 w-[380px] h-[380px] bg-[#D4AF37]/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[380px] h-[380px] bg-[#F3E5AB]/3 rounded-full blur-[90px] pointer-events-none" />

      {/* Delicate pulsing luxury lights */}
      <div className="luz-aurora-ouro w-[500px] h-[500px] -top-32 -left-32 opacity-45" />
      <div className="luz-aurora-ouro w-[450px] h-[450px] bottom-10 right-10 opacity-30" />

      <div className="container-site"> {/* CORRIGIDO: Removido marginLeft rígido e marginTop negativo que quebravam no mobile */}

        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-5"> {/* ESPAÇO: mb-6 sm:mb-8 → mb-4 sm:mb-5 */}
          <h2 
            className="font-editorial-title text-[30px] sm:text-3xl md:text-4xl lg:text-4xl uppercase tracking-wider mb-4 leading-tight title-gold-gradient"
          >
            O QUE MUDA NA MENTE DELE
          </h2>

          {/* Subtítulo */}
          <p className="font-sans text-xs sm:text-sm text-[#F5F1E8] font-light max-w-2xl mx-auto mb-4" style={{ lineHeight: '21px' /* Custom line-height for body readability */ }}>
            Uma aula capaz de transformar a forma como você interpreta os sinais dele.
          </p>

          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto my-3" />
        </div>

        {/* Tabs das fases */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4"> {/* CORRIGIDO: Removido marginTop negativo e altura restritiva */}
          {MALE_BRAIN_PHASES.map((phase, index) => {
            const sel = activeTab === index;
            return (
              <button
                key={phase.id}
                type="button"
                onClick={() => setActiveTab(index)}
                className={`text-left p-3.5 sm:p-5 transition-all duration-300 rounded-none cursor-pointer border flex items-center justify-between ${
                  sel
                    ? 'bg-[#D4AF37]/12 border-[#D4AF37] shadow-[0_4px_25px_rgba(212,175,55,0.06)] opacity-100'
                    : 'bg-[#0b0b0b]/60 border-white/5 hover:border-[#D4AF37]/30 opacity-75 hover:opacity-95'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`font-sans text-[0.65rem] font-bold tracking-widest ${sel ? 'text-[#F3E5AB]' : 'text-gray-500'}`}>
                    FASE {phase.num}
                  </span>
                  <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${sel ? 'bg-[#D4AF37]' : 'bg-transparent'}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Painel da fase ativa */}
        <div style={{ minHeight: '212px', height: 'auto' }} className="relative overflow-hidden rounded-none shadow-[2px_10px_45px_black] p-6 sm:p-10 lg:p-14 border border-[#996515]/20 bg-[#060504]/90">
          
          {/* Efeito de luz amarela acesa que corre devagar ao redor do quadro */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Rotating golden conic gradient simulating a running light */}
            <div className="absolute -inset-[200%] bg-[conic-gradient(from_0deg,transparent_40%,#D4AF37_48%,#FFF9D0_50%,#D4AF37_52%,transparent_60%)] animate-border-glow-rotate" />
            {/* Inner dark cover mask to keep only a thin 1.5px glowing rim */}
            <div className="absolute inset-[1.5px] bg-[#060504]/98" />
          </div>

          <div className="absolute inset-1 border border-[#D4AF37]/10 pointer-events-none z-10" />
          
          {/* Big background number */}
          <div className="absolute top-2 right-4 font-serif text-[6rem] sm:text-[10rem] lg:text-[12rem] font-bold text-[#D4AF37]/[0.06] leading-none select-none pointer-events-none z-[1]">
            {MALE_BRAIN_PHASES[activeTab].num}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center relative z-10"
            >
              <div className="space-y-3">
                <h3 className="font-editorial-title text-white uppercase tracking-wider leading-snug" style={{ fontSize: '18px' /* Custom section card title font size */ }}>
                  {activeTab === 0 && "POR QUE ELE FICA TÃO CONFORTÁVEL DEPOIS QUE VOCÊ SE AFASTA?"}
                  {activeTab === 1 && "O SILÊNCIO DELE NÃO É O QUE VOCÊ PENSA."}
                  {activeTab === 2 && "POR QUE ELE VOLTA QUANDO VOCÊ PARA DE CORRER?"}
                  {activeTab === 3 && "É AQUI QUE ELE DECIDE O QUANTO VOCÊ VALE."}
                </h3>
                <p className="font-sans text-[13px] text-[#f8eeb7] leading-[21px] italic font-light">
                  {MALE_BRAIN_PHASES[activeTab].description}
                </p>
              </div>

              <div className="border-t border-[#D4AF37]/15 pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10 space-y-3">
                <div>
                  <span className="font-sans text-[0.68rem] sm:text-[0.75rem] tracking-[0.18em] text-[#D4AF37] font-bold uppercase block mb-2 leading-relaxed">
                    {activeTab === 0 && "A FALSA SENSAÇÃO DE CONTROLE"}
                    {activeTab === 1 && "TESTE SILENCIOSO"}
                    {activeTab === 2 && "EGO FERIDO"}
                    {activeTab === 3 && "A PROCURA"}
                  </span>
                </div>
                <div className="w-8 h-[2px] bg-gradient-to-r from-[#D4AF37] to-transparent" />
                <p className="font-sans text-[13px] text-[#908b82] leading-[21px] font-light">
                  {activeTab === 0 && "É exatamente nesse momento que quase todas as mulheres reagem do jeito oposto ao que deveriam."}
                  {activeTab === 1 && "A maioria das mulheres entrega tudo nessa fase sem perceber que está fazendo isso."}
                  {activeTab === 2 && "Nem toda reaproximação é amor. Você precisa saber distinguir os dois antes de abrir espaço."}
                  {activeTab === 3 && "Depois dessa aula, você nunca mais vai confundir silêncio com desinteresse nem reaproximação com amor."}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
