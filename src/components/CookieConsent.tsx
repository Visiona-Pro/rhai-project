import { useState, useEffect } from 'react';

const STORAGE_KEY = 'cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: '#0e0e0e',
        borderTop: '1px solid rgba(212,175,55,0.18)',
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        flexWrap: 'wrap',
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: '12px',
          color: 'rgba(242,236,224,0.55)',
          fontFamily: 'Inter, sans-serif',
          lineHeight: '1.5',
          flex: 1,
          minWidth: '220px',
        }}
      >
        Usamos cookies e tecnologias similares para melhorar sua experiência e exibir
        conteúdo relevante. Ao continuar navegando, você concorda com nossa{' '}
        <a
          href="/privacidade"
          style={{ color: 'rgba(212,175,55,0.7)', textDecoration: 'underline' }}
        >
          Política de Privacidade
        </a>
        .
      </p>

      <button
        onClick={accept}
        type="button"
        style={{
          background: 'rgba(212,175,55,0.12)',
          border: '1px solid rgba(212,175,55,0.35)',
          color: '#D4AF37',
          fontFamily: 'Inter, sans-serif',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          padding: '8px 20px',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        Entendi
      </button>
    </div>
  );
}
