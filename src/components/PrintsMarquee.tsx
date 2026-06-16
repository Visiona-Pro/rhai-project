import React from 'react';

const PRINTS = [
  '/assets/prints/print-1.jpg',
  '/assets/prints/print-2.jpg',
  '/assets/prints/print-3.jpg',
  '/assets/prints/print-4.jpg',
  '/assets/prints/print-5.jpg',
  '/assets/prints/print-6.jpg',
  '/assets/prints/print-7.jpg',
  '/assets/prints/print-8.jpg',
  '/assets/prints/print-9.jpg',
  '/assets/prints/print-10.jpg',
  '/assets/prints/print-11.jpg',
];

// Divide em duas filas com offset para visual alternado
const row1 = [...PRINTS, ...PRINTS];
const row2 = [...[...PRINTS].reverse(), ...[...PRINTS].reverse()];

function PrintCard({ src, index }: { src: string; index: number }) {
  return (
    <div
      className="relative flex-shrink-0 rounded-[14px] overflow-hidden border border-[#D4AF37]/30 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-[#D4AF37]/70 transition-all duration-300"
      style={{ width: '140px', height: '248px' }}
    >
      <img
        src={src}
        alt={`Resultado ${index + 1}`}
        loading="lazy"
        className="w-full h-full object-cover"
      />
      {/* Sutil brilho dourado nas bordas */}
      <div className="absolute inset-0 rounded-[14px] ring-1 ring-inset ring-[#D4AF37]/10 pointer-events-none" />
    </div>
  );
}

const PrintsMarquee = React.memo(function PrintsMarquee() {
  return (
    <section className="relative bg-[#020202] border-y border-[#D4AF37]/15 overflow-hidden py-10 sm:py-14">
      {/* Glow central */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="text-center px-6 mb-8 relative z-10">
        <span className="font-sans text-[0.6rem] sm:text-[0.7rem] tracking-[0.3em] font-bold text-[#D4AF37] uppercase block mb-2">
          Resultados reais
        </span>
        <h2 className="font-editorial-title text-[24px] sm:text-[32px] uppercase tracking-wider leading-tight title-gold-gradient">
          Elas aplicaram.<br className="sm:hidden" /> Ele voltou.
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-3" />
      </div>

      {/* Fila 1 — esquerda */}
      <div className="prints-marquee-container mb-3">
        <div className="prints-marquee-track">
          {row1.map((src, i) => (
            <PrintCard key={`r1-${i}`} src={src} index={i % PRINTS.length} />
          ))}
        </div>
      </div>

      {/* Fila 2 — direita (reversa) */}
      <div className="prints-marquee-container">
        <div className="prints-marquee-track prints-marquee-track--reverse">
          {row2.map((src, i) => (
            <PrintCard key={`r2-${i}`} src={src} index={i % PRINTS.length} />
          ))}
        </div>
      </div>

      {/* Vignette nas bordas */}
      <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-36 bg-gradient-to-r from-[#020202] to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-[#020202] to-transparent z-20 pointer-events-none" />

      {/* Rodapé discreto */}
      <p className="text-center text-[0.65rem] text-[#FAF9F6]/35 font-sans tracking-wider italic mt-7 relative z-10 px-4">
        Prints compartilhados com autorização. Identidades preservadas.
      </p>
    </section>
  );
});

export default PrintsMarquee;
