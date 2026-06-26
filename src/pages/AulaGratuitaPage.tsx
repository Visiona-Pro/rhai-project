import React, { Suspense, lazy } from 'react';
import CookieConsent from '../components/CookieConsent';
import Hero from '../components/Hero';
import PainPoints from '../components/PainPoints';
import { CopyAngle } from '../App';

const FasesCerebro   = lazy(() => import('../components/FasesCerebro'));
const About          = lazy(() => import('../components/About'));
const CourseContent  = lazy(() => import('../components/CourseContent'));
const CienciaExplica = lazy(() => import('../components/CienciaExplica'));
const PrintsMarquee  = lazy(() => import('../components/PrintsMarquee'));
const OfferCheckout  = lazy(() => import('../components/OfferCheckout'));
const FAQ            = lazy(() => import('../components/FAQ'));
const Footer         = lazy(() => import('../components/Footer'));

export default function AulaGratuitaPage() {
  const activeAngle: CopyAngle = 'attention';

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

  const [contentRevealed, setContentRevealed] = React.useState(false);

  const handleReveal = React.useCallback(() => {
    setContentRevealed(true);
  }, []);

  const scrollToOffer = React.useCallback(() => {
    const el = document.getElementById('oferta-section');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div className="relative bg-black min-h-screen text-[#FAF9F6] antialiased overflow-x-hidden">
      <CookieConsent />

      <Hero
        onCtaClick={scrollToOffer}
        activeAngle={activeAngle}
        onMobileReveal={handleReveal}
        disablePause
      />

      <main className={contentRevealed ? undefined : 'hidden'}>
        <PainPoints />

        <Suspense fallback={<div aria-hidden="true" style={{ minHeight: '100vh' }} />}>
          <FasesCerebro />

          <div className="relative py-8 sm:py-10 bg-gradient-to-b from-[#0e0c08] to-[#0a0805] border-y border-[#D4AF37]/25 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/8 to-transparent pointer-events-none" />
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

          <div className="relative py-8 sm:py-10 bg-[#060504] border-y border-[#D4AF37]/25 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/6 to-transparent pointer-events-none" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-24 h-24 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-24 h-24 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="container-site text-center relative z-10 px-6">
              <div className="w-8 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-4" />
              <p className="font-editorial-title uppercase tracking-widest leading-snug text-[18px] sm:text-[22px] md:text-[26px]">
                <span className="title-gold-gradient">"Uma mulher que entende o coração masculino tem o mundo aos seus pés."</span>
              </p>
              <p className="font-sans text-[12px] sm:text-[13px] text-[#908b82] font-semibold tracking-wide mt-3">
                — Psicólogo Dr. John Gray
              </p>
              <div className="w-8 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4" />
            </div>
          </div>

          <OfferCheckout activeAngle={activeAngle} secondsRemaining={secondsRemaining} />

          <About activeAngle={activeAngle} />

          <FAQ />

          <Footer />
        </Suspense>
      </main>
    </div>
  );
}
