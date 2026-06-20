// Correções técnicas aplicadas: Convertido outline: 'none' inline para classe outline-none do Tailwind. Mantido o box-shadow personalizado para preservar a estética de "caixa de joias" e a identidade visual.
// Identidade visual: PRESERVADA INTEGRALMENTE
// Testado em: 320px | 768px | 1280px
import React, { useState, useEffect, useRef } from 'react';
import { CopyAngle } from '../App';
import { firePixelEvent } from '../hooks/usePixelConsent';

const _DEFAULT_MAIN_CHECKOUT = "https://pay.kiwify.com.br/QZs39JM";
const _rawMain = (import.meta.env.VITE_MAIN_CHECKOUT_URL as string) || _DEFAULT_MAIN_CHECKOUT;
const MAIN_CHECKOUT_URL = (() => {
  try {
    const p = new URL(_rawMain);
    return p.protocol === "https:" && p.hostname.endsWith("kiwify.com.br") ? _rawMain : _DEFAULT_MAIN_CHECKOUT;
  } catch { return _DEFAULT_MAIN_CHECKOUT; }
})();
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Check } from 'lucide-react';
import ImageUpload from './ImageUpload';

interface OfferCheckoutProps {
  activeAngle: CopyAngle;
  secondsRemaining: number;
}

const BackgroundStopwatchDigital = ({ isVisible }: { isVisible: boolean }) => {
  const [timeStr, setTimeStr] = React.useState("00:00:00.00");

  useEffect(() => {
    if (!isVisible) return;

    const start = Date.now();

    const update = () => {
      const elapsed = Date.now() - start;
      const ms   = Math.floor((elapsed % 1000) / 10);
      const secs = Math.floor((elapsed / 1000) % 60);
      const mins = Math.floor((elapsed / 60000) % 60);
      const hrs  = Math.floor((elapsed / 3600000) % 24);
      setTimeStr(
        `${String(hrs).padStart(2,'0')}:${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}.${String(ms).padStart(2,'0')}`
      );
    };

    // 250ms = 4 atualizações/segundo — visual idêntico, 60% menos trabalho e desliga fora da viewport
    const interval = setInterval(update, 250);
    return () => clearInterval(interval);
  }, [isVisible]);

  return <span>{timeStr}</span>;
};

const OfferCheckout = function OfferCheckout({ activeAngle, secondsRemaining }: OfferCheckoutProps) {
  const [isSwapped, setIsSwapped] = useState<boolean>(false);
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useInView(sectionRef, { margin: "200px", once: true });

  const hrs = Math.floor(secondsRemaining / 3600);
  const mins = Math.floor((secondsRemaining % 3600) / 60);
  const secs = secondsRemaining % 60;

  const displayHours = String(hrs).padStart(2, '0');
  const displayMinutes = String(mins).padStart(2, '0');
  const displaySeconds = String(secs).padStart(2, '0');

  // Marketing A/B configurations for Offer Section
  const offerMaps = {
    attention: {
      bonusTitle: '+ SUPERBÔNUS EXCLUSIVO: O GATILHO QUE VIRA O JOGO',
      description: 'Muito além de um simples treinamento offline. Este bônus exclusivo foi desenhado para ser um divisor de águas prático na sua vida afetiva. Ao entrar, você recebe acesso imediato ao material de posicionamento e, ao longo dos próximos dias, nossa plataforma liberará surpresas secretas em áudio e PDFs dinâmicos, que já ajudaram mais de 5.400 mulheres a restaurar relacionamentos quase frios. Prepare-se para ver a mágica do recuo ativo acontecer diante dos seus olhos.',
      comparison: 'R$0,48 por dia, é menos do que um cafezinho! Menos do que você gasta tentando esquecer o alecrim que não te merece.',
      ctaText: 'QUERO VIRAR O JOGO AGORA'
    },
    whatsapp: {
      bonusTitle: '+ SUPERBÔNUS EXCLUSIVO: O GATILHO QUE VIRA O JOGO',
      description: 'Este não é mais um compilado de dicas rasas de internet. Este material é uma verdadeira caixa-preta contendo roteiros prontos de diálogos, táticas de escrita magnética e ferramentas de postura íntima. Quem já seguiu essa metodologia relata um alívio absurdo na ansiedade e um retorno de interesse surpreendente do parceiro. Além de tudo isso, preparamos conteúdos surpresa ocultos que vão destravar a sua autoconfiança de uma forma que você nunca experimentou.',
      comparison: 'R$0,48 por dia, é menos do que um cafezinho! Menos do que você gasta tentando esquecer o alecrim que não te merece.',
      ctaText: 'QUERO VIRAR O JOGO AGORA'
    },
    unequal: {
      bonusTitle: '+ SUPERBÔNUS EXCLUSIVO: O GATILHO QUE VIRA O JOGO',
      description: 'Desenvolvido pela própria Rhaiane Pimenta com base das dores de milhares de suas seguidoras, esse bônus atua como um atalho de segurança máxima para os dias mais difíceis da relação. Você terá acesso aos materiais secretos que ela guardou apenas para suas mentoradas mais próximas. E mais: ao longo dos módulos, materiais de apoio em formato de áudio-pílulas surpresa serão liberados, consolidando a mudança de papel de quem corre atrás para quem é procurada com desejo.',
      comparison: 'R$0,48 por dia, é menos do que um cafezinho! Menos do que você gasta tentando esquecer o alecrim que não te merece.',
      ctaText: 'QUERO VIRAR O JOGO AGORA'
    }
  };

  const currentOffer = offerMaps[activeAngle] || offerMaps.attention;

  const memoizedBackground = React.useMemo(() => {
    return (
      <>
        {/* Editorial backdrop textures */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute top-1/4 left-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Dynamic ambient reflection beams (feixes de luz) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Beam 1: rotating conic gold beam (intensified) */}
          <div 
            className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(212,175,55,0.045)_25deg,transparent_55deg,transparent_180deg,rgba(212,175,55,0.045)_205deg,transparent_235deg)] pointer-events-none opacity-90"
            style={{
              animation: isVisible ? 'rotate-clockwise 24s linear infinite' : 'none',
              transformOrigin: '50% 50%'
            }}
          />
          {/* Beam 2: diagonal sweeping soft gold ray (intensified shimmer) */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#D4AF37]/[0.055] to-transparent pointer-events-none animate-beam-glow" />
          
          {/* Beam 3: secondary rotating conic ray */}
          <div 
            className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0deg,rgba(255,255,255,0.035)_15deg,transparent_45deg,transparent_180deg,rgba(255,255,255,0.035)_195deg,transparent_225deg)] pointer-events-none opacity-80"
            style={{
              animation: isVisible ? 'rotate-clockwise 32s linear infinite reverse' : 'none',
              transformOrigin: '50% 50%'
            }}
          />
        </div>

        {/* Giant Luxury Analog Stopwatch Map with thicker lines and details */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] sm:w-[1080px] sm:h-[1080px] pointer-events-none z-0 opacity-[0.03]"
          style={{ userSelect: 'none' }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full text-[#D4AF37]" stroke="currentColor" fill="none">
            {/* Concentric rings to symbolize high precision (slightly thinner lines for elegance) */}
            <circle cx="100" cy="100" r="98" strokeWidth="0.8" />
            <circle cx="100" cy="100" r="95" strokeWidth="0.4" strokeDasharray="1,2" />
            <circle cx="100" cy="100" r="91" strokeWidth="0.65" strokeDasharray="0.5,1.5" />
            
            {/* Middle aesthetic track ring */}
            <circle cx="100" cy="100" r="76" strokeWidth="0.4" strokeDasharray="4,4" opacity="0.6" />

            {/* Luxury Numeric Dial Indices (05...60) */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const r = 83;
              const tx = 100 + r * Math.sin(angle);
              const ty = 100 - r * Math.cos(angle) + 1.5; // Slight vertical adjustment for baseline
              const val = i === 0 ? 60 : i * 5;
              return (
                <text 
                  key={i} 
                  x={tx} 
                  y={ty} 
                  textAnchor="middle" 
                  fill="currentColor" 
                  fontSize="4.5" 
                  fontWeight="700" 
                  stroke="none" 
                  fontFamily="'JetBrains Mono', monospace"
                  className="opacity-90 select-none"
                >
                  {String(val).padStart(2, '0')}
                </text>
              );
            })}

            {/* Outer major ticks (12 hour/hour positions) */}
            <g strokeWidth="1.2">
              {Array.from({ length: 12 }).map((_, i) => (
                <line 
                  key={i} 
                  x1="100" 
                  y1="2" 
                  x2="100" 
                  y2="9" 
                  transform={`rotate(${i * 30} 100 100)`} 
                />
              ))}
            </g>
            {/* Outer minor ticks (60 seconds/minutes chronograph ticks) */}
            <g strokeWidth="0.6" opacity="0.95">
              {Array.from({ length: 60 }).map((_, i) => {
                if (i % 5 === 0) return null;
                return (
                  <line 
                    key={i} 
                    x1="100" 
                    y1="2" 
                    x2="100" 
                    y2="6" 
                    transform={`rotate(${i * 6} 100 100)`} 
                  />
                );
              })}
            </g>

            {/* Chronograph mini indicators (Subdials with thicker borders) */}
            {/* Subdial 1: Top (Minutes) */}
            <g transform="translate(0, -35)">
              <circle cx="100" cy="100" r="14" strokeWidth="0.75" strokeDasharray="1,1" />
              <line x1="100" y1="86" x2="100" y2="90" strokeWidth="0.95" />
              <line x1="100" y1="110" x2="100" y2="114" strokeWidth="0.95" />
              <line x1="86" y1="100" x2="90" y2="100" strokeWidth="0.95" />
              <line x1="110" y1="100" x2="114" y2="100" strokeWidth="0.95" />
              <text x="100" y="105" textAnchor="middle" fill="currentColor" fontSize="3" fontWeight="bold" stroke="none" fontFamily="'JetBrains Mono', monospace" opacity="0.7">MIN</text>
              <g className={`animate-hand-fast${isVisible ? ' is-playing' : ''}`}>
                <line x1="100" y1="100" x2="100" y2="88" strokeWidth="1.1" />
              </g>
            </g>

            {/* Subdial 2: Left (Seconds) */}
            <g transform="translate(-35, 0)">
              <circle cx="100" cy="100" r="14" strokeWidth="0.75" strokeDasharray="1,1" />
              <line x1="100" y1="86" x2="100" y2="90" strokeWidth="0.95" />
              <line x1="100" y1="110" x2="100" y2="114" strokeWidth="0.95" />
              <line x1="86" y1="100" x2="90" y2="100" strokeWidth="0.95" />
              <line x1="110" y1="100" x2="114" y2="100" strokeWidth="0.95" />
              <text x="100" y="105" textAnchor="middle" fill="currentColor" fontSize="3" fontWeight="bold" stroke="none" fontFamily="'JetBrains Mono', monospace" opacity="0.7">SEC</text>
              <g className={`animate-hand-medium${isVisible ? ' is-playing' : ''}`}>
                <line x1="100" y1="100" x2="100" y2="88" strokeWidth="1.1" />
              </g>
            </g>

            {/* Elegant central stopwatch pointer hand spinning */}
            <g className={`animate-hand-main${isVisible ? ' is-playing' : ''}`}>
              {/* Sleek needle */}
              <line x1="100" y1="100" x2="100" y2="10" strokeWidth="1.2" />
              {/* Counterweight */}
              <line x1="100" y1="100" x2="100" y2="112" strokeWidth="1.6" />
              {/* Diamond tip */}
              <polygon points="100,5 97.5,12 102.5,12" fill="currentColor" stroke="none" />
              <circle cx="100" cy="100" r="4.5" fill="#050403" strokeWidth="1.6" />
              <circle cx="100" cy="100" r="1.5" fill="currentColor" />
            </g>
          </svg>
        </div>

        {/* Giant Digitally Ticking Stopwatch Background (More visible and prominent) */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none z-0 opacity-[0.01] text-[#D4AF37] text-[65px] sm:text-[110px] md:text-[150px] tracking-[0.2em] font-black tabular-nums"
          style={{
            fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace',
          }}
        >
          <BackgroundStopwatchDigital isVisible={isVisible} />
        </div>
      </>
    );
  }, [isVisible]);

  const memoizedImageStack = React.useMemo(() => {
    return (
      <>
        <div className="relative w-full max-w-[280px] sm:max-w-[320px] h-[340px] sm:h-[380px] mx-auto mt-2 select-none group">

          {/* Floor reflection & light spot element */}
          <div className="absolute bottom-[-15px] left-1/2 -translate-x-1/2 w-[220px] h-[25px] bg-[#D4AF37]/15 rounded-full blur-[18px] opacity-70 pointer-events-none" />
          <div className="absolute bottom-[-22px] left-1/2 -translate-x-1/2 w-[160px] h-[10px] bg-black/80 rounded-full blur-[4px] pointer-events-none" />

          {/* Primary Cover Image */}
          <button
            onClick={() => setIsSwapped(!isSwapped)}
            type="button"
            className={`absolute inset-0 rounded-none overflow-hidden border border-[#D4AF37]/35 shadow-2xl transition-all duration-500 cursor-pointer outline-none ${
              isSwapped
                ? 'z-10 translate-x-8 translate-y-6 scale-90 rotate-6 opacity-40 filter brightness-50'
                : 'z-20 scale-100 rotate-0 opacity-100 filter brightness-100 shadow-[0_15px_35px_rgba(0,0,0,0.8)]'
            }`}
          >
            <ImageUpload
              storageKey="img_product_main"
              defaultSrc="/assets/produto-principal.webp"
              alt="Curso: Porque Eles Perdem o Interesse"
              imgClassName="w-full h-full object-cover"
              wrapperClassName="w-full h-full"
              imgProps={{ loading: 'lazy', width: 280, height: 340 }}
            />
          </button>

          {/* Bonus Cover Image */}
          <button
            onClick={() => setIsSwapped(!isSwapped)}
            type="button"
            className={`absolute inset-0 rounded-none overflow-hidden border border-[#D4AF37]/35 shadow-2xl transition-all duration-500 cursor-pointer outline-none ${
              isSwapped
                ? 'z-20 scale-100 rotate-0 opacity-100 filter brightness-100 shadow-[0_15px_35px_rgba(0,0,0,0.8)]'
                : 'z-10 translate-x-8 translate-y-6 scale-90 rotate-6 opacity-40 filter brightness-50'
            }`}
          >
            <ImageUpload
              storageKey="img_product_bonus"
              defaultSrc="/assets/produto-bonus.webp"
              alt="Bônus: O Gatilho que Vira o Jogo"
              imgClassName="w-full h-full object-cover"
              wrapperClassName="w-full h-full"
              imgProps={{ loading: 'lazy', width: 280, height: 340 }}
            />
          </button>
        </div>

        {/* Indicador abaixo do stack — pontos reativos + micro texto clicável */}
        <div className="flex flex-col items-center gap-1.5 mt-3 mb-3 select-none">
          <div className="flex items-center gap-2">
            <span
              className="block rounded-full transition-all duration-400"
              style={{
                width: isSwapped ? '6px' : '8px',
                height: '6px',
                background: isSwapped ? 'rgba(212,175,55,0.28)' : '#D4AF37',
              }}
            />
            <span
              className="block rounded-full transition-all duration-400"
              style={{
                width: isSwapped ? '8px' : '6px',
                height: '6px',
                background: isSwapped ? '#D4AF37' : 'rgba(212,175,55,0.28)',
              }}
            />
          </div>
          <button
            onClick={() => setIsSwapped(!isSwapped)}
            type="button"
            style={{
              fontSize: '9px',
              letterSpacing: '0.15em',
              color: 'rgba(212,175,55,0.5)',
              fontFamily: 'Inter, sans-serif',
              textTransform: 'uppercase',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '2px 0',
            }}
          >
            ⇄ alternar capa
          </button>
        </div>
      </>
    );
  }, [isSwapped]);

  const memoizedOfferDetails = React.useMemo(() => {
    return (
      <>
        {/* Premium Authenticity Certificate Box / Syllabus Items */}
        <div 
          style={{
            border: '1px solid rgba(201,147,58,0.18)',
            background: 'rgba(255,255,255,0.015)',
            padding: '16px 20px',
            position: 'relative',
            borderRadius: '0px'
          }}
          className="max-w-[600px] w-full mx-auto mb-2 text-left"
        >
          {/* LABEL INTERNO */}
          <span 
            className="block text-center mb-3.5 text-[14px] font-bold tracking-[0.3em] uppercase bg-gradient-to-r from-[#e5c158] via-[#FFF5C3] to-[#b89030] bg-clip-text text-transparent"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '14px',
              lineHeight: '1.2',
              filter: 'drop-shadow(0px 2px 4px rgba(229,193,88,0.3))'
            }}
          >
            ✦ O QUE VOCÊ LEVA ✦
          </span>

          {/* LISTA DE ITENS */}
          {[
            { label: 'Método Completo em VideoAula', value: 'R$1.199', indicator: 'chase-indicator-1' },
            { label: 'Materiais Complementares',     value: 'R$550',   indicator: 'chase-indicator-2' },
            { label: 'Reflexões Guiadas',            value: 'R$297',   indicator: 'chase-indicator-3' },
            { label: '2 Ebooks de Apoio',            value: 'R$92',    indicator: 'chase-indicator-4' },
            { label: 'AULÃO SUPERBÔNUS',             value: 'R$497',   indicator: 'chase-indicator-5' },
            { label: 'Material Complementar do AULÃO', value: 'R$234', indicator: 'chase-indicator-6' },
          ].map((item) => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', paddingBottom: '6px', borderBottom: '1px solid rgba(201,147,58,0.07)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className={item.indicator} style={{ width: '13px', height: '13px', border: '1.5px solid #e5c158', background: 'rgba(229,193,88,0.25)', boxShadow: '0 0 10px rgba(229,193,88,0.75)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <strong style={{ color: 'rgba(242,236,224,0.85)', fontWeight: '500', fontSize: '12.5px' }}>{item.label}</strong>
              </div>
              <span style={{ fontSize: '11px', color: 'rgba(242,236,224,0.35)', textDecoration: 'line-through', whiteSpace: 'nowrap', flexShrink: 0 }}>{item.value}</span>
            </div>
          ))}

          {/* DIVISOR */}
          <div
            style={{
              width: '100%',
              height: '1px',
              background: 'rgba(201,147,58,0.08)',
              margin: '12px 0'
            }}
          />

        </div>

        {/* Pricing panel with ultimate hierarchy */}
        <div
          className="py-4 max-w-[600px] w-full mx-auto text-center flex flex-col gap-1 mb-4"
          style={{ marginTop: '16px' }}
        >
          {/* PREÇO RISCADO */}
          <div
            style={{
              fontSize: '17px',
              fontWeight: 500,
              color: 'rgba(242,236,224,0.45)',
              textDecoration: 'line-through',
              textAlign: 'center',
              letterSpacing: '0.03em'
            }}
          >
            De R$2.869,00
          </div>

          <div className="flex flex-col items-center relative">
            {/* Subtle white glow background */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-24 bg-white/[0.06] blur-2xl rounded-full pointer-events-none select-none" />

            {/* LINHA DO PARCELAMENTO (destaque principal) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'center',
                gap: '4px',
                position: 'relative',
                zIndex: 10
              }}
            >
              {/* PREFIX "12x de" */}
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 300,
                  color: 'rgba(242,236,224,0.4)',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                12x de
              </span>

              {/* VALOR PRINCIPAL */}
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '108px',
                  fontWeight: 700,
                  color: '#f2ece0',
                  lineHeight: 1,
                  fontVariantNumeric: 'tabular-nums'
                }}
              >
                <span
                  style={{
                    fontSize: '28px',
                    fontWeight: 400,
                    verticalAlign: 'super',
                    color: '#c9933a'
                  }}
                >
                  R$
                </span>
                15
                <span
                  style={{
                    fontSize: '42px',
                    fontWeight: 400,
                    verticalAlign: 'baseline',
                    color: '#f2ece0'
                  }}
                >
                  ,30
                </span>
              </span>
            </div>

            {/* LABEL ABAIXO DO VALOR */}
            <span
              style={{
                fontSize: '11px',
                fontWeight: 400,
                color: 'rgba(242,236,224,0.3)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textAlign: 'center',
                marginBottom: '14px',
                marginTop: '19px',
                position: 'relative',
                zIndex: 10
              }}
            >
              no cartão de crédito ou R$147 à vista
            </span>
          </div>
        </div>
      </>
    );
  }, []);

  const memoizedBottomPanel = React.useMemo(() => {
    return (
      <>
        <div 
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 bg-transparent p-0"
          style={{ marginTop: '10px' }}
        >
          {/* Item 1 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#c9933a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <span 
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 300,
                fontSize: '9.5px',
                color: 'rgba(242,236,224,0.4)',
                letterSpacing: '0.08em'
              }}
            >
              Acesso imediato
            </span>
          </div>

          {/* Item 2 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#c9933a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span 
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 300,
                fontSize: '9.5px',
                color: 'rgba(242,236,224,0.4)',
                letterSpacing: '0.08em'
              }}
            >
              Compra segura
            </span>
          </div>

          {/* Item 3 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#c9933a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 11 11 13 15 9" />
            </svg>
            <span 
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 300,
                fontSize: '9.5px',
                color: 'rgba(242,236,224,0.4)',
                letterSpacing: '0.08em'
              }}
            >
              7 dias de garantia
            </span>
          </div>
        </div>

        {/* 7-Days Ironclad Guarantee panel redesigned as a compact, discrete, high-efficiency horizontal card with premium design effects */}
        <div 
          className="relative max-w-[550px] w-full mx-auto mt-2 p-[1px] bg-gradient-to-r from-[#D4AF37]/10 via-[#D4AF37]/25 to-[#D4AF37]/10 shadow-[0_5px_20px_rgba(0,0,0,0.6)] transition-all duration-500 hover:scale-[1.01] hover:shadow-[0_8px_32px_rgba(212,175,55,0.12)]"
          style={{ marginTop: '21px' }}
        >
          <div 
            className="bg-[#050403] px-3.5 py-4 relative overflow-hidden transition-colors duration-500 flex items-center"
            style={{
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: '#d4af37',
              minHeight: '82px',
              height: 'auto',
              marginTop: '3px'
            }}
          >
            {/* Elegant mini corners to convey luxury craftsmanship */}
            <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-[#D4AF37]/50 pointer-events-none" />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-[#D4AF37]/50 pointer-events-none" />
            <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-[#D4AF37]/50 pointer-events-none" />
            <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-[#D4AF37]/50 pointer-events-none" />

            {/* Subtle gentle gold highlight inside */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#D4AF37]/[0.03] rounded-full blur-3xl pointer-events-none" />
            
            {/* Discrete linear glare effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/[0.02] to-transparent -translate-x-full animate-[shimmer_6s_infinite] pointer-events-none" />

            {/* Subtle background emblem in second plan */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 border border-[#D4AF37]/10 rounded-full pointer-events-none select-none flex items-center justify-center opacity-20 -rotate-12 z-0">
              <div className="w-[90%] h-[90%] border border-dashed border-[#D4AF37]/15 rounded-full flex items-center justify-center">
                <span className="font-sans text-[20px] text-[#D4AF37]/40 uppercase tracking-[0.25em] text-center font-black leading-none">
                  7 DIAS
                </span>
              </div>
            </div>

            {/* Dynamic visual alignment: Title on Left, Description on Right */}
            <div className="relative z-10 w-full flex flex-col md:flex-row items-center gap-3 md:gap-5 text-left">
              <div className="shrink-0 flex flex-col items-center md:items-start justify-center relative z-10 border-b md:border-b-0 md:border-r border-[#D4AF37]/20 pb-2 md:pb-0 md:pr-5 w-full md:w-auto">
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: '16px',
                    color: '#D4AF37',
                    letterSpacing: '0.1em',
                    lineHeight: '1.2',
                    display: 'block'
                  }}
                  className="uppercase text-center md:text-left relative z-10 whitespace-nowrap"
                >
                  GARANTIA 7 DIAS
                </h3>
              </div>

              <p
                style={{
                  fontFamily: "var(--font-sans), 'Manrope', sans-serif",
                  fontStyle: 'italic',
                  fontSize: '9px',
                  lineHeight: '12px',
                  color: '#f8eeb7',
                  opacity: 0.9
                }}
                className="font-light flex-1 text-justify relative z-10"
              >
                Você terá 7 dias de garantia para acessar e avaliar o conteúdo. Se, por QUALQUER MOTIVO, decidir que não era o que esperava, basta solicitar o reembolso e receberá 100% do seu dinheiro. Sem burocracia. O risco é meu, não seu!
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }, []);

  return (
    <section ref={sectionRef} id="oferta-section" className="relative py-4 sm:py-8 bg-satin-onyx overflow-hidden select-none">
      
      {memoizedBackground}

      <div className="container relative z-10 px-6 sm:px-12 max-w-4xl mx-auto">
        
        {/* Sales Jewelry Box Container */}
        <div 
          id="oferta-box" 
          className="p-5 sm:p-8 md:p-10 rounded-none bg-transparent text-center relative transition-all duration-700 overflow-hidden"
          style={{boxShadow: 'none'}}
        >
          
          {memoizedImageStack}

          <h2 
            className="hidden sm:block font-editorial-title text-2xl md:text-3xl uppercase tracking-widest mb-3 title-gold-gradient"
          >
            Porque Eles Perdem o Interesse
          </h2>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeAngle}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {/* Superbonus secret lines */}
              <div className="py-2.5 px-4 bg-[#D4AF37]/5 border border-[#D4AF37]/25 inline-flex items-center justify-center mb-3 max-w-full mx-auto mt-0 max-w-[508px] w-full min-h-[72px] h-auto text-center">
                <p className="font-editorial-sub text-[16px] sm:text-[16px] text-[#F3E5AB] font-extrabold tracking-wide">
                  {currentOffer.bonusTitle}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {memoizedOfferDetails}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeAngle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative overflow-hidden p-4 bg-[#D4AF37]/[0.01] border border-dashed border-[#D4AF37]/25 text-left max-w-[600px] mx-auto mb-4"
              style={{ marginTop: '8px' }}
            >
              <p 
                className="font-sans text-[#f8eeb7] leading-relaxed font-light relative z-10 text-justify italic"
                style={{ fontSize: '11px' }}
              >
                {currentOffer.comparison}
              </p>
              {/* Subtle white reflection sheen passing through */}
              <motion.div
                className="absolute inset-y-0 w-1/2 pointer-events-none bg-gradient-to-r from-transparent via-white/12 to-transparent -skew-x-12 z-0"
                initial={{ x: '-150%' }}
                animate={isVisible ? { x: '250%' } : { x: '-150%' }}
                transition={{
                  repeat: isVisible ? Infinity : 0,
                  repeatType: "loop",
                  duration: 3.5,
                  ease: "easeInOut",
                  repeatDelay: 4
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Secure Kiwify Checkout CTA Link with generous size and shine animation */}
          <div className="mt-4 text-center">
            {/* Elegant 12-hour Countdown Timer */}
            <div 
              className="mb-3.5 flex flex-col items-center justify-center"
              style={{ marginTop: '4px' }}
            >
              
              {/* LABEL ACIMA */}
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginBottom: '12px',
                  marginTop: '3px'
                }}
              >
                {/* Ponto piscante (dot) */}
                <span 
                  className="blink-dot-premium"
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#c9933a'
                  }}
                />
                <span 
                  style={{
                    fontSize: '10px',
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: 'rgba(201,147,58,0.5)',
                    fontWeight: 400,
                    fontFamily: 'Inter, sans-serif'
                  }}
                >
                  A oferta expira em
                </span>
              </div>

              {/* DÍGITOS */}
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                {/* BLOCO HORAS */}
                <div 
                  style={{
                    background: 'rgba(201,147,58,0.08)',
                    border: '1px solid rgba(201,147,58,0.2)',
                    padding: '10px 16px',
                    textAlign: 'center',
                    minWidth: '58px',
                    borderRadius: '0px'
                  }}
                >
                  <span 
                    id="th"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '28px',
                      fontWeight: 700,
                      color: '#f2ece0',
                      lineHeight: 1,
                      fontVariantNumeric: 'tabular-nums'
                    }}
                  >
                    {displayHours}
                  </span>
                  <div 
                    style={{
                      fontSize: '8px',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'rgba(242,236,224,0.25)',
                      marginTop: '4px'
                    }}
                  >
                    horas
                  </div>
                </div>

                {/* SEPARADOR */}
                <span 
                  style={{
                    fontSize: '22px',
                    fontWeight: 700,
                    color: 'rgba(201,147,58,0.3)',
                    marginBottom: '14px'
                  }}
                >
                  :
                </span>

                {/* BLOCO MINUTOS */}
                <div 
                  style={{
                    background: 'rgba(201,147,58,0.08)',
                    border: '1px solid rgba(201,147,58,0.2)',
                    padding: '10px 16px',
                    textAlign: 'center',
                    minWidth: '58px',
                    borderRadius: '0px'
                  }}
                >
                  <span 
                    id="tm"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '28px',
                      fontWeight: 700,
                      color: '#f2ece0',
                      lineHeight: 1,
                      fontVariantNumeric: 'tabular-nums'
                    }}
                  >
                    {displayMinutes}
                  </span>
                  <div 
                    style={{
                      fontSize: '8px',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'rgba(242,236,224,0.25)',
                      marginTop: '4px'
                    }}
                  >
                    minutos
                  </div>
                </div>

                {/* SEPARADOR */}
                <span 
                  style={{
                    fontSize: '22px',
                    fontWeight: 700,
                    color: 'rgba(201,147,58,0.3)',
                    marginBottom: '14px'
                  }}
                >
                  :
                </span>

                {/* BLOCO SEGUNDOS */}
                <div 
                  style={{
                    background: 'rgba(201,147,58,0.08)',
                    border: '1px solid rgba(201,147,58,0.2)',
                    padding: '10px 16px',
                    textAlign: 'center',
                    minWidth: '58px',
                    borderRadius: '0px'
                  }}
                >
                  <span 
                    id="ts"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '28px',
                      fontWeight: 700,
                      color: '#f2ece0',
                      lineHeight: 1,
                      fontVariantNumeric: 'tabular-nums'
                    }}
                  >
                    {displaySeconds}
                  </span>
                  <div 
                    style={{
                      fontSize: '8px',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'rgba(242,236,224,0.25)',
                      marginTop: '4px'
                    }}
                  >
                    segundos
                  </div>
                </div>
              </div>
            </div>

            {/* Texto de urgência pré-CTA */}
            <div className="max-w-[540px] mx-auto mb-5 text-left flex flex-col gap-3" style={{ marginTop: '8px' }}>
              <p className="font-sans text-[#FAF9F6]/80 text-[13px] leading-relaxed font-light">
                Eu vou te dizer exatamente o que fazer pra esse homem não conseguir mais te tirar da cabeça.
              </p>
              <p className="font-sans text-[#FAF9F6]/80 text-[13px] leading-relaxed font-light">
                Mas preciso te avisar: Essa página vai sair do ar. E quando sair, o preço promocional some junto.{' '}
                <strong className="text-[#F3E5AB] font-medium">Não é gatilho. Não é marketing.</strong>
              </p>
              <p className="font-sans text-[#FAF9F6]/80 text-[13px] leading-relaxed font-light">
                Você pode fechar essa aba agora e continuar esperando ele te dar valor. Ou pode tomar{' '}
                <strong className="text-[#F3E5AB] font-medium">a única decisão que vai mudar absolutamente tudo.</strong>
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.a
                key={activeAngle}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
                id="checkout-cta-btn"
                href={MAIN_CHECKOUT_URL}
                target="_self"
                rel="noopener noreferrer"
                onClick={() => {
                  setIsRedirecting(true);
                  try { firePixelEvent('InitiateCheckout'); } catch {}
                }}
                className="btn-glitter-gold w-full text-center block cursor-pointer"
                style={{ marginTop: '19px' }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
                  {isRedirecting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                      </svg>
                      Redirecionando...
                    </>
                  ) : currentOffer.ctaText}
                </span>
              </motion.a>
            </AnimatePresence>
            
            {memoizedBottomPanel}
          </div>

        </div>

      </div>
    </section>
  );
};

export default React.memo(OfferCheckout, (prev, next) => {
  // Só re-renderiza se as props realmente mudaram
  return prev.secondsRemaining === next.secondsRemaining
      && prev.activeAngle === next.activeAngle;
});
