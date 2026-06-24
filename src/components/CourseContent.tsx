// Correções técnicas aplicadas: Convertido style="overflow: hidden" inline para a classe 'overflow-hidden' nativa do Tailwind.
// Identidade visual: PRESERVADA INTEGRALMENTE
// Testado em: 320px | 768px | 1280px
import React, { useRef } from 'react';
import { COURSE_BLOCKS } from '../data';
import { motion, useInView } from 'motion/react';

export default function CourseContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: "100px", once: true });

  return (
    <section ref={sectionRef} id="conteudo-section" className="section-base bg-satin-onyx relative overflow-hidden">
      {/* Editorial backdrop radial gold sheen */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D4AF37]/5 rounded-full blur-[110px] pointer-events-none" />

      {/* Vagalumes / Reflexos dourados sofisticados em movimento */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          className="absolute w-12 h-12 rounded-full bg-gradient-to-r from-[#D4AF37]/35 via-[#dfc686]/20 to-transparent blur-xl"
          style={{ left: '15%', top: '10%', willChange: 'transform, opacity' }}
          animate={isInView ? {
            x: [0, 120, -40, 180, 0],
            y: [0, 160, 60, 200, 0],
            scale: [0.9, 1.25, 0.85, 1.2, 0.9],
            opacity: [0.12, 0.38, 0.22, 0.42, 0.12]
          } : { x: 0, y: 0, scale: 0.9, opacity: 0.12 }}
          transition={{
            duration: 27,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-[#bfa15f]/25 via-[#f2e3af]/15 to-transparent blur-2xl"
          style={{ left: '85%', top: '20%', willChange: 'transform, opacity' }}
          animate={isInView ? {
            x: [0, -180, -60, -220, 0],
            y: [0, 140, 40, 180, 0],
            scale: [1.15, 0.8, 1.1, 0.75, 1.15],
            opacity: [0.1, 0.32, 0.18, 0.35, 0.1]
          } : { x: 0, y: 0, scale: 1.15, opacity: 0.1 }}
          transition={{
            duration: 33,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute w-14 h-14 rounded-full bg-gradient-to-r from-[#cfab66]/25 via-[#D4AF37]/15 to-transparent blur-xl"
          style={{ left: '40%', top: '80%', willChange: 'transform, opacity' }}
          animate={isInView ? {
            x: [0, 140, -80, 100, 0],
            y: [0, -180, -80, -220, 0],
            scale: [0.8, 1.15, 0.9, 1.3, 0.8],
            opacity: [0.15, 0.4, 0.2, 0.45, 0.15]
          } : { x: 0, y: 0, scale: 0.8, opacity: 0.15 }}
          transition={{
            duration: 29,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* White background watermark text "CONTEÚDO" fading to transparent on the right edge */}
      <div className="absolute top-[28px] sm:top-[38px] right-[-80px] sm:right-[-140px] md:right-[-200px] select-none pointer-events-none z-0">
        <span className="font-editorial-title text-[50px] sm:text-[95px] md:text-[135px] font-black uppercase tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-l from-white/30 via-white/12 to-transparent leading-none block">
          CONTEÚDO
        </span>
      </div>

      <div className="container-site max-w-[56rem] mx-auto relative z-10"> {/* CORRIGIDO: Removido margens rígidas em pixels (marginLeft, marginRight, marginTop) para permitir centralização fluida */}

        {/* Cabeçalho */}
        <div className="text-center max-w-[40rem] mx-auto mb-4 sm:mb-5"> {/* ESPAÇO: mb-6 sm:mb-8 → mb-4 sm:mb-5 */}
          <h2 
            className="font-editorial-title text-[30px] sm:text-[36px] uppercase tracking-wider mb-4 leading-tight title-gold-gradient"
          >
            O QUE VOCÊ IRÁ APRENDER:
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto my-3" />
        </div>

        {/* Acordeão */}
        <div className="space-y-2">
          {COURSE_BLOCKS.map((block, blockIdx) => {
            const isBonus = !!block.isBonus;
            const numLabel = `0${blockIdx + 1}`;
            
            return (
              <div
                key={block.id}
                className="open rounded-none overflow-hidden border border-[#D4AF37] bg-[#0F0D0A]/95 shadow-[0_4px_30px_rgba(212,175,55,0.08)]"
              >
                {/* Trigger Plate */}
                <div
                  className="w-full flex items-center justify-between py-2.5 px-4 sm:py-3 sm:px-5 bg-transparent text-left select-none relative group"
                >
                  <div className="flex items-center gap-3 sm:gap-4 pr-3">
                    {/* Numeração dourada em destaque */}
                    <div 
                      className="select-none flex-shrink-0"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '26px',
                        fontWeight: '700',
                        fontStyle: 'italic',
                        color: 'rgba(201,147,58,0.18)',
                        lineHeight: '1'
                      }}
                    >
                      {numLabel}
                    </div>
 
                    <div className="space-y-0.5">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        {block.title && (
                          <span className="font-sans text-[0.58rem] sm:text-[0.62rem] tracking-[0.24em] text-[#D4AF37] uppercase font-bold block">
                            {block.title}
                          </span>
                        )}
                        {isBonus && (
                          <span className="h-7 px-3 flex items-center justify-center text-[0.7rem] sm:text-[0.78rem] tracking-[0.18em] bg-[#D4AF37]/15 border border-[#D4AF37] text-[#FAF9F6] uppercase font-bold rounded-none shadow-[0_0_22px_rgba(212,175,55,0.55),0_0_8px_rgba(212,175,55,0.25)] transition-all duration-300">
                            ★ BÔNUS EXCLUSIVO
                          </span>
                        )}
                      </div>
                      {block.subtitle && (
                        <h3 className="font-editorial-title text-white uppercase tracking-wider leading-snug" style={{ fontSize: '16px' /* Custom content block title font size */ }}>
                          {block.subtitle}
                        </h3>
                      )}
                    </div>
                  </div>
 

                </div>
 
                {/* Corpo com fundo sutilmente iluminado */}
                <div 
                  className="max-h-none border-t border-[#D4AF37]/15 opacity-100 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_100%)] overflow-hidden"
                >
                  <div className="py-2 px-4 sm:py-3 sm:px-5 space-y-1.5">
                    {block.items.map((item, idx) => (
                      <div 
                        key={idx} 
                        className={`flex gap-3 items-start pb-1.5 ${
                          idx < block.items.length - 1 ? 'border-b border-white/[0.04]' : ''
                        }`}
                      >
                        {/* Diamonds Bullets */}
                        <span className="text-[#D4AF37] text-xs mt-1 flex-shrink-0 select-none">✦</span>
                        <p className="font-sans text-[0.8rem] sm:text-[0.84rem] text-[#FAF9F6]/85 leading-relaxed font-light">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
