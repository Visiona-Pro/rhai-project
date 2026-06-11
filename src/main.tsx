import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import CookieConsent from './components/CookieConsent.tsx';
import { usePixelConsent } from './hooks/usePixelConsent.ts';
import './index.css';

const ObrigadoPage  = lazy(() => import('./pages/ObrigadoPage.tsx'));
const PrivacidadePage = lazy(() => import('./pages/PrivacidadePage.tsx'));

function Root() {
  usePixelConsent();
  return (
    <>
      <Routes>
        <Route path="/" element={<App />} />
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
      </Routes>
      <CookieConsent />
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
