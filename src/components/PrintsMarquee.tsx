import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

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

const row1 = [...PRINTS, ...PRINTS];

function Lightbox({ index, onClose, onPrev, onNext }: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Imagem */}
      <div
        className="relative max-h-[90vh] max-w-[92vw] sm:max-w-[480px]"
        onClick={e => e.stopPropagation()}
      >
        <img
          src={PRINTS[index]}
          alt={`Print ${index + 1}`}
          className="max-h-[85vh] w-auto rounded-xl shadow-2xl border border-[#D4AF37]/30 object-contain"
        />
        {/* Contador */}
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[0.65rem] text-white/50 font-sans tracking-widest">
          {index + 1} / {PRINTS.length}
        </span>
      </div>

      {/* Fechar */}
      <button
        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
        onClick={onClose}
      >
        <X size={28} />
      </button>

      {/* Anterior */}
      <button
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
        onClick={e => { e.stopPropagation(); onPrev(); }}
      >
        <ChevronLeft size={36} />
      </button>

      {/* Próximo */}
      <button
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
        onClick={e => { e.stopPropagation(); onNext(); }}
      >
        <ChevronRight size={36} />
      </button>
    </div>
  );
}

function PrintCard({ src, index, onOpen }: { src: string; index: number; onOpen: (i: number) => void }) {
  return (
    <div
      className="relative flex-shrink-0 rounded-[14px] overflow-hidden border border-[#D4AF37]/30 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-[#D4AF37]/70 transition-all duration-300 cursor-pointer bg-[#0a0a0a]"
      style={{ width: '210px', height: '372px' }}
      onClick={() => onOpen(index)}
    >
      <img
        src={src}
        alt={`Resultado ${index + 1}`}
        loading="lazy"
        className="w-full h-full object-contain"
      />
      <div className="absolute inset-0 rounded-[14px] ring-1 ring-inset ring-[#D4AF37]/10 pointer-events-none" />
    </div>
  );
}

const PrintsMarquee = React.memo(function PrintsMarquee() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const open = useCallback((i: number) => setLightboxIndex(i % PRINTS.length), []);
  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => setLightboxIndex(i => i === null ? null : (i - 1 + PRINTS.length) % PRINTS.length), []);
  const next = useCallback(() => setLightboxIndex(i => i === null ? null : (i + 1) % PRINTS.length), []);

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

      <div className="prints-marquee-container">
        <div className="prints-marquee-track">
          {row1.map((src, i) => (
            <PrintCard key={`r1-${i}`} src={src} index={i} onOpen={open} />
          ))}
        </div>
      </div>

      {/* Vignette nas bordas */}
      <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-36 bg-gradient-to-r from-[#020202] to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-[#020202] to-transparent z-20 pointer-events-none" />

      {/* Rodapé discreto */}
      <p className="text-center text-[0.65rem] text-[#FAF9F6]/55 font-sans tracking-wider italic mt-7 relative z-10 px-4">
        Prints compartilhados com autorização. Identidades preservadas.
      </p>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox index={lightboxIndex} onClose={close} onPrev={prev} onNext={next} />
      )}
    </section>
  );
});

export default PrintsMarquee;
