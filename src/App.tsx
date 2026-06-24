import React, { Suspense, lazy } from 'react';
import CookieConsent from './components/CookieConsent';

// Carregamento SÍNCRONO: Apenas o que está acima ou muito perto da dobra para otimizar o FCP/LCP inicial
import Hero from './components/Hero';
import PainPoints from './components/PainPoints';

// Carregamento ASSÍNCRONO: Componentes abaixo da dobra carregados sob demanda via lazy loading natural
const FasesCerebro  = lazy(() => import('./components/FasesCerebro'));
const About         = lazy(() => import('./components/About'));
const CourseContent = lazy(() => import('./components/CourseContent'));
const CienciaExplica = lazy(() => import('./components/CienciaExplica'));
const BeforeAfter   = lazy(() => import('./components/BeforeAfter'));
const Testimonials  = lazy(() => import('./components/Testimonials'));
const PrintsMarquee = lazy(() => import('./components/PrintsMarquee'));
const OfferCheckout = lazy(() => import('./components/OfferCheckout'));
const FAQ           = lazy(() => import('./components/FAQ'));
const Footer        = lazy(() => import('./components/Footer'));

export type CopyAngle = 'attention' | 'whatsapp' | 'unequal';

export default function App() {
  const activeAngle: CopyAngle = 'attention';

  // Otimização de Performance: Salvar o Timestamp de Expiração em vez de fazer I/O síncrono no disco (localStorage.setItem) a cada 1 segundo.
  // Evita lentidão crítica nas transições e na CPU de aparelhos celulares.
  const [secondsRemaining, setSecondsRemaining] = React.useState<number>(() => {
    const targetHours = 0.3; // 18 minutos
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
    return 1080;
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

  const scrollToOffer = React.useCallback(() => {
    const el = document.getElementById('oferta-section');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div className="relative bg-black min-h-screen text-[#FAF9F6] antialiased overflow-x-hidden">
      <CookieConsent />

      {/* Hero: seções renderizadas imediatamente sem lag ou shift estrutural */}
      <Hero
        onCtaClick={scrollToOffer}
        activeAngle={activeAngle}
      />

      <main>
        <PainPoints />

        <Suspense fallback={<div aria-hidden="true" style={{minHeight:"100vh"}} />}>
          <FasesCerebro />

          {/* Faixa de destaque pós-fases */}
          <div className="relative py-8 sm:py-10 bg-[#060504] border-y border-[#D4AF37]/25 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/6 to-transparent pointer-events-none" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-24 h-24 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-24 h-24 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="container-site text-center relative z-10 px-6">
              <div className="w-8 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-4" />
              <p className="font-editorial-title uppercase tracking-widest leading-snug text-[18px] sm:text-[22px] md:text-[26px]">
                <span className="text-[#F5F1E8]">Sem joguinhos, sem manipulação. </span>
                <span className="title-gold-gradient">Você continua sendo você, só que irresistível!</span>
              </p>
              <div className="w-8 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4" />
            </div>
          </div>

          <div className="fio-de-luz" />

          <CourseContent />

          <PrintsMarquee />

          <div className="fio-de-luz" />

          <CienciaExplica />

          <div className="fio-de-luz" />

          <BeforeAfter />

          <OfferCheckout activeAngle={activeAngle} secondsRemaining={secondsRemaining} />

          <About activeAngle={activeAngle} />

          <FAQ />

          <Footer />
        </Suspense>
      </main>
    </div>
  );
}
