import { StrictMode, lazy, Suspense, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import App from './App.tsx';
import { usePixelConsent, trackPageView } from './hooks/usePixelConsent.ts';
import './index.css';

const ObrigadoPage    = lazy(() => import('./pages/ObrigadoPage.tsx'));
const PrivacidadePage = lazy(() => import('./pages/PrivacidadePage.tsx'));
const AulaGratuitaPage = lazy(() => import('./pages/AulaGratuitaPage.tsx'));
const QuizPage        = lazy(() => import('./pages/QuizPage.tsx'));

function Root() {
  usePixelConsent();
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    trackPageView();
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/aulagratuita"
          element={
            <Suspense fallback={<div className="min-h-screen bg-black" />}>
              <AulaGratuitaPage />
            </Suspense>
          }
        />
        <Route
          path="/obrigado"
          element={
            <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
              <ObrigadoPage />
            </Suspense>
          }
        />
        <Route
          path="/privacidade"
          element={
            <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
              <PrivacidadePage />
            </Suspense>
          }
        />
        <Route
          path="/quiz"
          element={
            <Suspense fallback={<div className="min-h-screen bg-black" />}>
              <QuizPage />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Elemento #root não encontrado. Verifique o index.html.');
createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </StrictMode>,
);
