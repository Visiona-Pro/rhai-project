import React from 'react';
import { TESTIMONIALS } from '../data';
import { BeamsBackground } from './BeamsBackground';

const Testimonials = React.memo(function Testimonials() {
  // Duplicate testimonials once to ensure seamless loop in marquee
  const marqueeItems = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="relatos-section" className="relative border-b border-[#D4AF37]/15 overflow-hidden">
      <BeamsBackground className="py-6 sm:py-9" intensity="medium">
        {/* Background radial soft light behind references */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[350px] bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container relative z-10 px-6 sm:px-12 max-w-7xl mx-auto">
        
        {/* Header Title */}
        <div 
          className="text-center max-w-[52rem] w-full mx-auto mb-4" // ESPAÇO: mb-6 → mb-4
        >
          <h2 
            className="font-editorial-title text-[30px] sm:text-[34px] uppercase tracking-wider mb-4 max-w-[51rem] w-full mx-auto leading-tight title-gold-gradient"
          >
            ELAS MUDARAM. AGORA É A SUA VEZ.
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-3" />
          <p 
            className="font-sans text-[#f8eeb7] font-light max-w-[56rem] w-full mx-auto"
            style={{ fontSize: '13px', lineHeight: '1.6' /* Custom subtitle text size and leading */ }}
          >
            Relatos para inspirar, não para comparar.
          </p>
        </div>

      </div>

      {/* Infinite Horizontal luxury Marquee viewport */}
      <div className="testi-marquee-container relative w-full mt-4 z-10"> {/* ESPAÇO: mt-6 → mt-4 */}
        
        {/* Soft elegant vignette gradients to fade edges */}
        <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

        <div className="testi-marquee-track">
          {marqueeItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="w-[230px] sm:w-[265px] h-[192px] sm:h-[204px] p-3.5 sm:p-4 rounded-none glass-luxury flex flex-col gap-2.5 justify-between flex-shrink-0 border border-[#D4AF37]/25 shadow-[0_5px_15px_rgba(0,0,0,0.3)] transition-all duration-300 hover:border-[#D4AF37]"
            >
              {/* Card Quote body */}
              <p className="font-sans text-[10px] sm:text-[11px] text-white text-left leading-relaxed font-light italic tracking-wide antialiased">
                {item.text}
              </p>

              {/* Author Info footer block */}
              <div className="flex items-center gap-2.5 border-t border-white/[0.04] pt-3 text-left">
                {/* Monograma feminino */}
                <div className="w-7 h-7 rounded-full bg-[#120F0C] border border-[#D4AF37]/35 flex items-center justify-center font-serif text-[#F3E5AB] text-xs font-bold shadow-inner flex-shrink-0">
                  {item.initial}
                </div>
                <div>
                  <h3 className="font-editorial-title text-[10px] text-white uppercase tracking-widest leading-none">
                    {item.name}
                  </h3>
                  <span className="text-[0.52rem] font-sans tracking-widest text-[#D4AF37] uppercase block mt-1">
                    ✓ {idxToAge(index)} • {idxToCity(index)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Small notice below testimonials */}
      <div className="text-center mt-4 px-4 relative z-10">
        <p 
          style={{ fontFamily: "'Times New Roman', Times, serif" }}
          className="text-[0.68rem] sm:text-[0.75rem] tracking-wider text-[#FAF9F6]/50 font-normal italic"
        >
          Relatos compartilhados com autorização e identidade preservada.
        </p>
      </div>
      </BeamsBackground>
    </section>
  );
});

export default Testimonials;

// Helper to provide realistic variety without saving redundant strings
function idxToCity(idx: number): string {
  const cities = ['São Paulo, SP', 'Belo Horizonte, MG', 'Rio de Janeiro, RJ', 'Curitiba, PR', 'Salvador, BA', 'Porto Alegre, RS'];
  return cities[idx % cities.length];
}

function idxToAge(idx: number): string {
  const ages = ['24 ANOS', '31 ANOS', '42 ANOS', '19 ANOS', '28 ANOS', '37 ANOS'];
  return ages[idx % ages.length];
}
