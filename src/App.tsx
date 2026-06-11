import React, { Suspense, lazy } from 'react';

// Carregamento SÍNCRONO: Apenas o que está acima ou muito perto da dobra para otimizar o FCP/LCP inicial
import Hero from './components/Hero';
import PainPoints from './components/PainPoints';

// Carregamento ASSÍNCRONO: Componentes abaixo da dobra carregados sob demanda via lazy loading natural
const FasesCerebro  = lazy(() => import('./components/FasesCerebro'));
const About         = lazy(() => import('./components/About'));
const CourseContent = lazy(() => import('./components/CourseContent'));
const BeforeAfter   = lazy(() => import('./components/BeforeAfter'));
const Testimonials  = lazy(() => import('./components/Testimonials'));
const OfferCheckout = lazy(() => import('./components/OfferCheckout'));
const FAQ           = lazy(() => import('./components/FAQ'));
const Footer        = lazy(() => import('./components/Footer'));

export type CopyAngle = 'attention' | 'whatsapp' | 'unequal';

function formatTime(num: number): string {
  return String(num).padStart(2, '0');
}

export default function App() {
  const activeAngle: CopyAngle = 'attention';

  // Otimização de Performance: Salvar o Timestamp de Expiração em vez de fazer I/O síncrono no disco (localStorage.setItem) a cada 1 segundo.
  // Evita lentidão crítica nas transições e na CPU de aparelhos celulares.
  const [secondsRemaining, setSecondsRemaining] = React.useState<number>(() => {
    const targetHours = 9.7; // Equivalente a ~34914 segundos
    const defaultDurationMs = Math.round(targetHours * 60 * 60 * 1000);
    
    if (typeof window !== 'undefined') {
      const savedExpiration = localStorage.getItem('offer_expiration_time');
      if (savedExpiration) {
        const remainingMs = parseInt(savedExpiration, 10) - Date.now();
        if (remainingMs > 0) {
          return Math.floor(remainingMs / 1000);
        } else {
          // Reinicia a oferta mantendo o gatilho de urgência ativo para novas sessões
          const newExpiration = Date.now() + defaultDurationMs;
          localStorage.setItem('offer_expiration_time', newExpiration.toString());
          return Math.floor(defaultDurationMs / 1000);
        }
      } else {
        const expirationTime = Date.now() + defaultDurationMs;
        localStorage.setItem('offer_expiration_time', expirationTime.toString());
        return Math.floor(defaultDurationMs / 1000);
      }
    }
    return 34914;
  });

  React.useEffect(() => {
    const expiration = localStorage.getItem('offer_expiration_time');
    if (!expiration) return;
    const expirationMs = parseInt(expiration, 10);

    const interval = setInterval(() => {
      const remainingMs = expirationMs - Date.now();
      if (remainingMs <= 0) {
        setSecondsRemaining(0);
        clearInterval(interval);
      } else {
        setSecondsRemaining(Math.floor(remainingMs / 1000));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const { hrs, mins, secs } = React.useMemo(() => ({
    hrs:  Math.floor(secondsRemaining / 3600),
    mins: Math.floor((secondsRemaining % 3600) / 60),
    secs: secondsRemaining % 60,
  }), [secondsRemaining]);

  const scrollToOffer = React.useCallback(() => {
    const el = document.getElementById('oferta-section');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div className="relative bg-black min-h-screen text-[#FAF9F6] antialiased overflow-x-hidden">

      {/* Sticky bar de urgência */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-[#C8A96B]/15 px-4 py-1.5 flex items-center justify-center gap-3 flex-wrap shadow-md">
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <span className="text-[0.72rem] sm:text-xs text-[#FAF9F6] bg-[rgba(201,147,58,0.06)] border border-[rgba(201,147,58,0.22)] px-2 py-0.5 tracking-wider font-bold flex items-center gap-1.5 rounded-none shadow-[0_0_10px_rgba(201,147,58,0.1)]">
            <span className="relative flex h-1 w-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c9933a] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1 w-1 bg-[#c9933a]"></span>
            </span>
            <span className="text-[#f2ece0] font-bold tabular-nums" style={{ fontFamily: "'Playfair Display', serif" }}>{formatTime(hrs)}</span>
            <span className="text-[rgba(201,147,58,0.4)] animate-pulse font-serif">:</span>
            <span className="text-[#f2ece0] font-bold tabular-nums" style={{ fontFamily: "'Playfair Display', serif" }}>{formatTime(mins)}</span>
            <span className="text-[rgba(201,147,58,0.4)] animate-pulse font-serif">:</span>
            <span className="text-[#f2ece0] font-bold tabular-nums" style={{ fontFamily: "'Playfair Display', serif" }}>{formatTime(secs)}</span>
          </span>
        </div>
        <button
          type="button"
          onClick={scrollToOffer}
          className="font-sans text-[0.54rem] sm:text-[0.6rem] tracking-[0.16em] uppercase text-black bg-gradient-to-r from-[#e5c158] via-[#FFF5C3] to-[#b89030] px-3.5 py-1 cursor-pointer font-extrabold rounded-[4px] shadow-[0_0_10px_rgba(229,193,88,0.3)] hover:shadow-[0_0_18px_rgba(229,193,88,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 animate-pulse"
          style={{ animationDuration: '3s' }}
        >
          Seu Bônus Aqui →
        </button>
      </div>

      <div className="h-9 sm:h-10" />

      {/* Hero: seções renderizadas imediatamente sem lag ou shift estrutural */}
      <Hero onCtaClick={scrollToOffer} activeAngle={activeAngle} />

      <PainPoints />

      <Suspense fallback={<div aria-hidden="true" style={{minHeight:"100vh"}} />}>
        <FasesCerebro />
        
        <About activeAngle={activeAngle} />

        <div className="fio-de-luz" />

        <CourseContent />
        
        <Testimonials />

        <div className="fio-de-luz" />

        <BeforeAfter />
        
        <OfferCheckout activeAngle={activeAngle} secondsRemaining={secondsRemaining} />
        
        <FAQ />
        
        <Footer />
      </Suspense>
    </div>
  );
}
