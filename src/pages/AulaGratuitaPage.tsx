import React, { Suspense, lazy } from 'react';
import Hero from '../components/Hero';
import PainPoints from '../components/PainPoints';
import { CopyAngle } from '../App';

const FasesCerebro  = lazy(() => import('../components/FasesCerebro'));
const About         = lazy(() => import('../components/About'));
const CourseContent = lazy(() => import('../components/CourseContent'));
const BeforeAfter   = lazy(() => import('../components/BeforeAfter'));
const Testimonials  = lazy(() => import('../components/Testimonials'));
const OfferCheckout = lazy(() => import('../components/OfferCheckout'));
const FAQ           = lazy(() => import('../components/FAQ'));
const Footer        = lazy(() => import('../components/Footer'));

export default function AulaGratuitaPage() {
  const activeAngle: CopyAngle = 'attention';

  const [secondsRemaining, setSecondsRemaining] = React.useState<number>(() => {
    const targetHours = 9.7;
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

  const [mobileRevealed, setMobileRevealed] = React.useState(false);

  const handleMobileReveal = React.useCallback(() => {
    setMobileRevealed(true);
  }, []);

  const scrollToOffer = React.useCallback(() => {
    const el = document.getElementById('oferta-section');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div className="relative bg-black min-h-screen text-[#FAF9F6] antialiased overflow-x-hidden">
      <Hero
        onCtaClick={scrollToOffer}
        activeAngle={activeAngle}
        onMobileReveal={handleMobileReveal}
        mobileRevealed={mobileRevealed}
      />

      <main className={mobileRevealed ? undefined : 'hidden md:block'}>
        <PainPoints />

        <Suspense fallback={<div aria-hidden="true" style={{ minHeight: '100vh' }} />}>
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
      </main>
    </div>
  );
}
