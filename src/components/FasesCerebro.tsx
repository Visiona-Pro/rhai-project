import React, { useRef } from 'react';
import { MALE_BRAIN_PHASES } from '../data';
import { motion, useInView } from 'motion/react';

const SECTION_TITLES = [
  'FAÇA ELE SE APEGAR',
  'CONQUISTE A MENTE DELE',
  'SEJA INESQUECÍVEL',
  'SE TORNE A MULHER DA VIDA DELE',
];

export default function FasesCerebro() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: '100px', once: true });

  return (
    <section ref={sectionRef} id="mecanismo-section" className="section-base bg-satin-onyx relative overflow-hidden">
      {/* Editorial backdrop textures */}
      <div className="absolute top-0 right-0 w-[380px] h-[380px] bg-[#D4AF37]/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[380px] h-[380px] bg-[#F3E5AB]/3 rounded-full blur-[90px] pointer-events-none" />

      {/* Delicate pulsing luxury lights */}
      <div className="luz-aurora-ouro w-[500px] h-[500px] -top-32 -left-32 opacity-45" />
      <div className="luz-aurora-ouro w-[450px] h-[450px] bottom-10 right-10 opacity-30" />

      <div className="container-site">

        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <h2 className="font-editorial-title text-[30px] sm:text-3xl md:text-4xl lg:text-4xl uppercase tracking-wider mb-4 leading-tight title-gold-gradient">
            ELE NÃO VAI MAIS TE IGNORAR
          </h2>

          <p className="font-sans text-xs sm:text-sm text-[#F5F1E8] font-light max-w-2xl mx-auto mb-4" style={{ lineHeight: '21px' }}>
            Uma aula capaz de transformar a forma como você interpreta os sinais dele.
          </p>

          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto my-3" />
        </div>

        {/* Trilha serpenteada das fases */}
        <div className="relative max-w-3xl mx-auto">
          {MALE_BRAIN_PHASES.map((phase, index) => {
            const isLeft = index % 2 === 0;
            const isLast = index === MALE_BRAIN_PHASES.length - 1;

            return (
              <div key={phase.id} className="relative">
                {/* Nó da fase */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.12 }}
                  className={`flex ${isLeft ? 'justify-start' : 'justify-end'}`}
                >
                  <div className="w-[78%] sm:w-[58%] relative">
                    {/* Quadro da fase */}
                    <div className="relative overflow-hidden rounded-2xl border border-[#996515]/25 bg-[#060504]/90 shadow-[2px_8px_30px_rgba(0,0,0,0.6)] p-5 sm:p-6">
                      {/* Número grande de fundo */}
                      <div className="absolute -top-2 right-2 font-serif text-[5rem] sm:text-[6rem] font-bold text-[#D4AF37]/[0.07] leading-none select-none pointer-events-none">
                        {phase.num}
                      </div>

                      <div className="relative z-10 space-y-2.5">
                        {/* Bolha numerada dourada */}
                        <div className="flex items-center gap-3">
                          <span className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-b from-[#D4AF37] to-[#9c7a1f] flex items-center justify-center font-serif text-sm font-extrabold text-[#0b0908] shadow-[0_0_15px_rgba(212,175,55,0.5)]">
                            {phase.num}
                          </span>
                          <span className="font-sans text-[0.62rem] tracking-[0.18em] text-[#D4AF37] font-bold uppercase leading-tight">
                            {phase.phaseName}
                          </span>
                        </div>

                        <h3 className="font-editorial-title text-white uppercase tracking-wider leading-snug" style={{ fontSize: '17px' }}>
                          {SECTION_TITLES[index]}
                        </h3>

                        <p className="font-sans text-[13px] text-[#f8eeb7] leading-[20px] italic font-light">
                          {phase.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Conector serpenteado com voltas arredondadas */}
                {!isLast && (
                  <div className="h-12 sm:h-14 w-full pointer-events-none" aria-hidden="true">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      fill="none"
                    >
                      <path
                        d={isLeft ? 'M22,0 C22,70 78,30 78,100' : 'M78,0 C78,70 22,30 22,100'}
                        stroke="#D4AF37"
                        strokeOpacity="0.35"
                        strokeWidth="2"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
