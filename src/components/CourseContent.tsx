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
          transition={{ duration: 27, repeat: Infinity, ease: "easeInOut" }}
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
          transition={{ duration: 33, repeat: Infinity, ease: "easeInOut" }}
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
          transition={{ duration: 29, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Watermark */}
      <div className="absolute top-[28px] sm:top-[38px] right-[-80px] sm:right-[-140px] md:right-[-200px] select-none pointer-events-none z-0">
        <span className="font-editorial-title text-[50px] sm:text-[95px] md:text-[135px] font-black uppercase tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-l from-white/30 via-white/12 to-transparent leading-none block">
          CONTEÚDO
        </span>
      </div>

      <div className="container-site max-w-[56rem] mx-auto relative z-10">

        {/* Cabeçalho */}
        <div className="text-center max-w-[40rem] mx-auto mb-8 sm:mb-10">
          <h2 className="font-editorial-title text-[30px] sm:text-[36px] uppercase tracking-wider mb-4 leading-tight title-gold-gradient">
            O QUE VOCÊ IRÁ APRENDER:
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto my-3" />
        </div>

        {/* Lista de conteúdos */}
        <div className="space-y-8 sm:space-y-10 max-w-[42rem] mx-auto">
          {COURSE_BLOCKS.map((block, blockIdx) => {
            const isBonus = !!block.isBonus;
            return (
              <motion.div
                key={block.id}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.4, delay: blockIdx * 0.07, ease: 'easeOut' }}
                className="space-y-2"
              >
                {isBonus && (
                  <span className="inline-flex h-7 px-3 items-center justify-center text-[0.7rem] sm:text-[0.78rem] tracking-[0.18em] bg-[#D4AF37]/15 border border-[#D4AF37] text-[#FAF9F6] uppercase font-bold shadow-[0_0_22px_rgba(212,175,55,0.55),0_0_8px_rgba(212,175,55,0.25)] mb-1">
                    ★ BÔNUS EXCLUSIVO
                  </span>
                )}
                {block.subtitle && (
                  <h3 className="font-editorial-title text-white uppercase tracking-wider leading-snug" style={{ fontSize: '16px' }}>
                    {block.subtitle}
                  </h3>
                )}
                <p className="font-sans text-[0.84rem] text-[#FAF9F6]/75 leading-relaxed font-light">
                  {block.items.join(' ')}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
