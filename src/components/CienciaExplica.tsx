import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

export default function CienciaExplica() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: '100px', once: true });

  return (
    <section ref={sectionRef} className="section-base bg-satin-onyx relative overflow-hidden">

      {/* Luzes ambiente */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[260px] bg-[#D4AF37]/6 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#D4AF37]/4 rounded-full blur-[80px] pointer-events-none" />

      {/* Marca d'água editorial */}
      <div className="absolute bottom-2 right-[-80px] select-none pointer-events-none z-0">
        <span className="font-editorial-title text-[80px] sm:text-[130px] font-black uppercase tracking-[0.12em] text-transparent bg-clip-text bg-gradient-to-l from-white/[0.04] via-white/[0.01] to-transparent leading-none block">
          NEUROLOGIA
        </span>
      </div>

      <div className="container-site relative z-10">

        {/* Cabeçalho */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <h2 className="font-editorial-title text-[28px] sm:text-[34px] md:text-[40px] uppercase tracking-wider mb-4 leading-tight title-gold-gradient">
            POR QUE FUNCIONA?<br className="hidden sm:block" /> A CIÊNCIA EXPLICA
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />
        </motion.div>

        {/* Card principal */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
        >
          <div className="relative border border-[#D4AF37]/20 bg-[#060504]/90 p-6 sm:p-10 shadow-[0_4px_40px_rgba(212,175,55,0.07)]">

            {/* Borda luminosa interna */}
            <div className="absolute inset-[1px] border border-[#D4AF37]/8 pointer-events-none" />

            {/* Número decorativo */}
            <div className="absolute top-3 right-5 font-serif text-[5rem] sm:text-[7rem] font-bold text-[#D4AF37]/[0.05] leading-none select-none pointer-events-none">
              ✦
            </div>

            <div className="space-y-8 relative z-10">

              {/* Bloco 1 — Harvard (imagem à esquerda, texto à direita) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
                {/* Imagem Harvard */}
                <div className="rotate-[-1.5deg] hover:rotate-0 transition-transform duration-500 ease-out">
                  <div className="overflow-hidden rounded-xl border border-[#D4AF37]/15">
                    <img
                      src="/assets/harvard-research.jpeg"
                      alt="Pesquisa Harvard Medical School — O amor e o cérebro"
                      className="w-full h-auto block"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-[11px] font-bold text-[#908b82] text-center mt-2">
                    Estudo: "O Amor e o Cérebro" — Harvard Medical School
                  </p>
                </div>

                {/* Texto Harvard */}
                <div className="space-y-4">
                  <p className="font-sans text-[13px] sm:text-[14px] text-[#F5F1E8] leading-[1.8] font-light">
                    Pesquisadores da{' '}
                    <span className="text-[#F3E5AB] font-semibold">Universidade de Harvard</span>{' '}
                    já provaram: quando um homem desenvolve atração emocional de verdade, as mesmas áreas do cérebro ligadas ao{' '}
                    <span className="text-[#F3E5AB] font-semibold">vício</span>{' '}
                    são ativadas.
                  </p>
                  <p className="font-editorial-title text-[16px] sm:text-[18px] uppercase tracking-wider text-[#F3E5AB] leading-snug">
                    Ele não consegue parar de pensar em você.<br />
                    Não é sorte. É neurologia.
                  </p>
                  <p className="font-sans text-[13px] sm:text-[14px] text-[#908b82] leading-[1.8] font-light">
                    E quando você aplica o que ensino corretamente, ele literalmente se torna{' '}
                    <span className="title-gold-gradient font-semibold">"viciado" em você</span>.
                  </p>
                </div>
              </div>

              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

              {/* Bloco 2 — Cleópatra (imagem à esquerda, texto à direita) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
                {/* Imagem Cleópatra & Marilyn */}
                <div className="rotate-[-1.5deg] hover:rotate-0 transition-transform duration-500 ease-out">
                  <div className="overflow-hidden rounded-xl border border-[#D4AF37]/15">
                    <img
                      src="/assets/cleopatra-marilyn.jpeg"
                      alt="Cleópatra e Marilyn Monroe — poder de atração emocional"
                      className="w-full h-auto block"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Texto Cleópatra */}
                <p className="font-editorial-title text-[16px] sm:text-[19px] uppercase tracking-wider text-[#F3E5AB] leading-snug">
                  Cleópatra e Marilyn Monroe dominavam os princípios de atração emocional.
                  Não era só beleza, era o poder de fazer qualquer homem ficar de joelhos diante delas.
                </p>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
