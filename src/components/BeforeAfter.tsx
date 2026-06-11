import React from 'react';
import { BEFORE_AFTER_ITEMS } from '../data';

const BeforeAfter = React.memo(function BeforeAfter() {
  return (
    <section id="comparativo-section" className="relative py-4 sm:py-6 bg-satin-onyx overflow-hidden">
      
      {/* White background watermark text "TRANSFORMAÇÃO" fading to transparent on the right edge */}
      <div className="absolute top-[28px] sm:top-[38px] right-[-110px] sm:right-[-200px] md:right-[-280px] select-none pointer-events-none z-0">
        <span className="font-editorial-title text-[50px] sm:text-[95px] md:text-[135px] font-black uppercase tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-l from-white/11 via-white/[0.015] to-transparent leading-none block">
          TRANSFORMAÇÃO
        </span>
      </div>

      {/* Dynamic light thread represented as the point of shift */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-[#D4AF37]/40 to-transparent select-none pointer-events-none hidden lg:block" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-36 bg-[#D4AF37] blur-md opacity-40 hidden lg:block" />

      <div className="container relative z-10 px-6 sm:px-12 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-4"> {/* ESPAÇO: mb-6 → mb-4 */}
          <h2 
            className="font-editorial-title text-2xl sm:text-3xl md:text-4xl uppercase tracking-wider mb-4 leading-tight title-gold-gradient"
          >
            A TRANSFORMAÇÃO
          </h2>
        </div>

        {/* Dynamic Dual-Column Compare Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 max-w-4xl mx-auto relative">
          
          {/* Card left: ANTES (Matte, Closed, Dust Wine-Red) */}
          <div className="p-4 sm:p-5 rounded-none bg-[#11070A] border border-red-950/45 flex flex-col gap-3 relative overflow-hidden transition-all duration-500 shadow-xl">
            {/* Matte texture underlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(159,18,57,0.025)_0%,transparent_70%)] pointer-events-none" />

            {/* Top Header Label */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between relative z-10 border-b border-red-950/20 pb-1.5">
              <span className="font-editorial-title text-xl sm:text-2xl tracking-[0.05em] text-red-500 uppercase font-black">
                ANTES:
              </span>
              <span className="text-[0.62rem] tracking-wider font-sans uppercase text-red-400/60 font-bold mt-1 sm:mt-0">
                NÃO CONHECIA A MENTE MASCULINA
              </span>
            </div>

            <div className="space-y-2 text-left relative z-10">
              {BEFORE_AFTER_ITEMS.map((item) => (
                <div key={item.id} className="flex gap-2 items-start pb-2 border-b border-white/[0.02] last:border-b-0 last:pb-0">
                  <span className="text-red-500/40 mt-1 flex-shrink-0 text-xs select-none font-bold">✕</span>
                  <p className="font-sans text-[13px] text-[#f8eeb7]/80 leading-relaxed font-light">
                    {item.before}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* Card right: DEPOIS (Rich Luminous Gold & Satin Black) */}
          <div className="p-4 sm:p-5 rounded-none bg-[#0F0D0A] border border-[#D4AF37]/50 flex flex-col gap-3 relative overflow-hidden shadow-[0_0_45px_rgba(212,175,55,0.1)] transition-all duration-500 hover:border-[#D4AF37]">
            {/* Glowing inner accent */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/[0.035] to-transparent pointer-events-none" />
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-[40px] pointer-events-none" />

            {/* Top Header Label */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between relative z-10 border-b border-[#D4AF37]/10 pb-1.5">
              <span className="font-editorial-title text-xl sm:text-2xl tracking-[0.05em] text-[#D4AF37] uppercase font-black">
                DEPOIS:
              </span>
              <span className="text-[0.62rem] tracking-wider font-sans uppercase text-[#F3E5AB] font-bold mt-1 sm:mt-0">
                COLOCOU O CONTEÚDO EM PRÁTICA
              </span>
            </div>

            <div className="space-y-2 text-left relative z-10">
              {BEFORE_AFTER_ITEMS.map((item) => (
                <div key={item.id} className="flex gap-2 items-start pb-2 border-b border-[#D4AF37]/15 last:border-b-0 last:pb-0">
                  <span className="text-[#D4AF37] mt-1 flex-shrink-0 font-bold text-xs select-none">✓</span>
                  <p className="font-sans text-[13px] text-white/90 leading-relaxed font-light">
                    {item.after}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
});

export default BeforeAfter;
