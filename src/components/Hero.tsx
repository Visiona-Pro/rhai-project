import React from 'react';
import { VturbPlayer } from './obrigado/VturbPlayer';
import { motion, AnimatePresence } from 'motion/react';
import { CopyAngle } from '../App';
import ImageUpload from './ImageUpload';


interface HeroProps {
  onCtaClick: () => void;
  activeAngle: CopyAngle;
}

// Estilos extraídos para fora do componente — criados uma vez, nunca recriados
const STYLES = {
  heroBadgeLabel: {
    top: '-6px', left: '16px', fontSize: '9.5px', letterSpacing: '0.2em',
    color: '#c9933a', backgroundColor: '#07070a', paddingLeft: '8px',
    paddingRight: '8px', fontFamily: "'Inter', sans-serif",
    fontWeight: 'bold', textTransform: 'uppercase', lineHeight: '1',
  } as React.CSSProperties,
  heroBadgeText: {
    fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '12px',
    color: 'rgba(242,236,224,0.65)', lineHeight: '1.5',
    fontStyle: 'normal', maxWidth: '100%', width: '100%',
  } as React.CSSProperties,
  trustBadgeItem: {
    fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '9.5px',
    color: 'rgba(242,236,224,0.45)', letterSpacing: '0.04em', whiteSpace: 'nowrap',
  } as React.CSSProperties,
} as const;

// Partículas discretas: tamanho máximo 4px, movimento lento
const PARTICLES: { left: string; w: string; animStyle: React.CSSProperties }[] = [
  { left: '8%',  w: '3px', animStyle: { left: '8%',  bottom: '-20px', width: '3px', height: '3px', animation: 'luxuryFloat 18s ease-in-out 0s infinite'   } },
  { left: '22%', w: '2px', animStyle: { left: '22%', bottom: '-20px', width: '2px', height: '2px', animation: 'luxuryFloat 14s ease-in-out 3s infinite'   } },
  { left: '40%', w: '4px', animStyle: { left: '40%', bottom: '-20px', width: '4px', height: '4px', animation: 'luxuryFloat 22s ease-in-out 1.5s infinite' } },
  { left: '62%', w: '2px', animStyle: { left: '62%', bottom: '-20px', width: '2px', height: '2px', animation: 'luxuryFloat 16s ease-in-out 5s infinite'   } },
  { left: '82%', w: '3px', animStyle: { left: '82%', bottom: '-20px', width: '3px', height: '3px', animation: 'luxuryFloat 20s ease-in-out 2s infinite'   } },
];

const Hero = React.memo(function Hero({ onCtaClick, activeAngle }: HeroProps) {
  const [isEditMode, setIsEditMode] = React.useState<boolean>(() => {
    // Modo de edição disponível apenas em desenvolvimento
    if (!import.meta.env.DEV) return false;
    if (typeof window !== 'undefined') {
      const searchParam = new URLSearchParams(window.location.search).get('edit');
      if (searchParam === '1') {
        localStorage.setItem('image_edit_mode', 'true');
        return true;
      }
      return localStorage.getItem('image_edit_mode') === 'true';
    }
    return false;
  });

  const DEFAULT_BG = "https://viraojogo.mvmlp.com/assets/hero-woman-C7RthVUp.jpg";
  const [heroBg, setHeroBg] = React.useState<string>(DEFAULT_BG);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const saved = localStorage.getItem('img_hero_bg');
    if (saved) {
      setHeroBg(saved);
    }

    const handleModeChange = () => {
      setIsEditMode(localStorage.getItem('image_edit_mode') === 'true');
    };
    
    const handleStorageChange = () => {
      const updated = localStorage.getItem('img_hero_bg');
      if (updated) {
        setHeroBg(updated);
      } else {
        setHeroBg(DEFAULT_BG);
      }
    };

    window.addEventListener('image_edit_mode_changed', handleModeChange);
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('image_edit_mode_changed', handleModeChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleHeroBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Configurar temporariamente o URL object para visualização instantânea
    const url = URL.createObjectURL(file);
    setHeroBg(url);

    // Salvar base64 compactada no localStorage para persistência permanente e segura
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Limita a largura/altura máxima para 1200px para economizar muito espaço
        const MAX_DIM = 1200;
        if (width > MAX_DIM || height > MAX_DIM) {
          if (width > height) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          } else {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          // Comprimir para JPEG com qualidade de 0.65 (excelente equilíbrio)
          const base64Compressed = canvas.toDataURL('image/jpeg', 0.65);
          try {
            localStorage.setItem('img_hero_bg', base64Compressed);
            setHeroBg(base64Compressed); // Atualiza com a versão persistida definitiva
            window.dispatchEvent(new Event('storage'));
          } catch (err) {
            console.error('Erro de limite de armazenamento ao salvar imagem do Hero:', err);
            // Backup com resolução ainda menor para garantir que salve
            try {
              const miniCanvas = document.createElement('canvas');
              miniCanvas.width = Math.round(width / 2);
              miniCanvas.height = Math.round(height / 2);
              const miniCtx = miniCanvas.getContext('2d');
              if (miniCtx) {
                miniCtx.drawImage(img, 0, 0, miniCanvas.width, miniCanvas.height);
                const superCompressed = miniCanvas.toDataURL('image/jpeg', 0.4);
                localStorage.setItem('img_hero_bg', superCompressed);
                setHeroBg(superCompressed);
                window.dispatchEvent(new Event('storage'));
              }
            } catch (retryErr) {
              console.error('Falha na tentativa de recuperação de salvamento do Hero:', retryErr);
            }
          }
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const resetHeroBg = () => {
    setHeroBg(DEFAULT_BG);
    if (fileInputRef.current) fileInputRef.current.value = '';
    try {
      localStorage.removeItem('img_hero_bg');
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      console.error(err);
    }
  };

  const copyMap = {
    attention: {
      badge:    'Psicologia Cognitiva Masculina · Exclusivo',
      h1a:      'Porque Eles Perdem',
      h1b:      'o Interesse',
      sub:      '… e como virar o jogo sem se humilhar. Assista e entenda:',
      desc:     'No começo, ele mandava mensagem. Corria atrás. Investia. Depois esfriou do nada! Você não fez nada de errado. Só nunca te explicaram como a mente masculina funciona.',
      cta:      'Ativar o Protocolo Agora',
    },
    whatsapp: {
      badge:    'Psicologia Cognitiva Masculina · Exclusivo',
      h1a:      'O Erro Sutil que Faz',
      h1b:      'Ele Perder o Interesse',
      sub:      'Mandar "bom dia" e receber o silêncio é a prova de que você perdeu as rédeas da relação.',
      desc:     'Acesse o único compilado estratégico que traduz o que eles pensam mas nunca revelam — e domine o posicionamento magnético para reverter o desinteresse imediatamente.',
      cta:      'Dar um Basta nas Migalhas',
    },
    unequal: {
      badge:    'Psicologia Cognitiva Masculina · Exclusivo',
      h1a:      'O Deslize Oculto que',
      h1b:      'Faz Ele Sumir',
      sub:      '... e a engrenagem exata para reverter o desinteresse in menos de 48 horas, sem joguinhos.',
      desc:     'Você se esforça ao máximo, entrega tudo e acaba com a sensação de que quanto mais você faz, menos ele te valoriza. Este treinamento revela o erro estrutural por trás do sumiço masculino.',
      cta:      'Instalar o Efeito Ímã Agora',
    },
  };

  const c = copyMap[activeAngle] ?? copyMap.attention;

  return (
    <header
      id="hero-section"
      className="relative flex items-start justify-center overflow-hidden bg-black text-white min-h-screen pt-4 sm:pt-6 pb-6 sm:pb-10"
    >
      {/* Fundo cinematográfico */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1080}
          className="w-full h-full object-cover object-[55%_24%] sm:object-[35%_24%] opacity-[0.46] brightness-[0.88] contrast-[1.12]"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,169,107,0.05)_0%,transparent_70%)] pointer-events-none" />
      </div>



      {/* Luzes douradas dinâmicas ambientais do Hero */}
      <div className="luz-aurora-ouro w-[550px] h-[550px] -top-24 -left-40 opacity-70" />
      <div className="luz-aurora-ouro w-[450px] h-[450px] bottom-12 right-12 opacity-30" />

      {/* Partículas discretas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="champagne-sparkle absolute"
            style={p.animStyle}
          />
        ))}
      </div>

      {/* Logo removed as requested */}

      {/* Conteúdo */}
      <div
        className="container-site relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col gap-3 sm:gap-4 justify-start"
      >

        {/* H1 no início da página - sem alteração de col, tamanho ou formatação */}
        <div className="w-full text-left relative">
          {/* Brilho sutil no fundo do título */}
          <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-96 h-28 bg-gradient-to-r from-[#D4AF37]/[0.12] to-transparent rounded-full blur-3xl pointer-events-none z-0" />
          
          <AnimatePresence mode="wait">
            <motion.h1
              key={activeAngle + '-h1'}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="font-editorial-title gold-brushed-text uppercase text-3xl sm:text-4xl md:text-5xl lg:text-5xl tracking-tight leading-[1.15] drop-shadow-lg relative z-10"
              style={{
                filter: 'drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.8)) drop-shadow(0px 0px 14px rgba(212, 175, 55, 0.4)) drop-shadow(0px 0px 30px rgba(253, 244, 195, 0.15))'
              }}
            >
              {c.h1a}
              <span className="block mt-2 font-black">{c.h1b}</span>
            </motion.h1>
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 lg:gap-10 items-start"> {/* CORRIGIDO: Removido dimensões fixas de pixel (width, height, margin) do container do grid */}

          {/* Coluna esquerda — copy */}
          <div
            className="flex flex-col gap-4 sm:gap-5 text-left w-full max-w-full"
          > {/* CORRIGIDO: Removido dimensões fixas (height: 619px, width: 608px) do painel esquerdo */}

            {/* Subtítulo */}
            <AnimatePresence mode="wait">
              <motion.p
                key={activeAngle + '-sub'}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-editorial-sub text-[19px] text-[#F3E5AB] max-w-xl leading-relaxed italic pr-4"
              >
                {/* CORRIGIDO: Removido inline style com dimensões absolutas e margens negativas que causavam desalinhamentos drásticos */}
                <span className="ler-revelar block">
                  {c.sub}
                </span>
              </motion.p>
            </AnimatePresence>

            {/* Linha decorativa */}
            <div
              className="w-16 h-[2px] bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-transparent"
              style={{ marginTop: '-19px' }}
            />

            {/* Vídeo — apenas mobile */}
            <div className="block md:hidden w-full">
              <div
                className="relative mx-auto"
                style={{ width: 'min(284px, 100%)', aspectRatio: '284/484' }}
              >
                <div className="absolute -inset-16 bg-[radial-gradient(circle,rgba(255,255,255,0.10)_0%,rgba(240,240,240,0.04)_50%,transparent_80%)] rounded-full blur-[45px] z-0 pointer-events-none luz-branca-movimento" />
                <div className="absolute -inset-8 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,transparent_70%)] rounded-full blur-[35px] z-0 pointer-events-none luz-branca-movimento" style={{ animationDelay: '-3s', animationDuration: '8s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[145%] h-[145%] bg-[radial-gradient(circle,rgba(196,163,79,0.06)_0%,transparent_70%)] blur-[55px] z-0 pointer-events-none luz-branca-movimento" style={{ animationDelay: '-1.5s', animationDuration: '14s' }} />
                <div className="relative z-10 w-full h-full border border-[#c4a34f]/50 overflow-hidden rounded-none">
                  <VturbPlayer
                    src="https://rhaiane-videos-guard.rhaiane-media.workers.dev/VSL_hd.mp4"
                    containerClassName="relative w-full h-full bg-black overflow-hidden group font-sans"
                    disablePause
                  />
                </div>
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-12 bg-[#c4a34f]/10 rounded-full blur-[30px] pointer-events-none z-0" />
              </div>
            </div>

            {/* Descrição — apenas desktop */}
            <AnimatePresence mode="wait">
              <motion.p
                key={activeAngle + '-desc'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, delay: 0.15 }}
                className="hidden md:block font-sans text-[0.82rem] sm:text-[0.9rem] text-[#FAF9F6]/75 max-w-xl font-light whitespace-pre-line text-justify mb-1.5 sm:mb-2.5"
                style={{ maxWidth: '400px', width: '100%', fontSize: '13px', lineHeight: '18px' }}
              >
                {c.desc}
              </motion.p>
            </AnimatePresence>

            {/* Badge Protocolo 48h */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.8, ease: 'easeOut' }}
              className="relative rounded-none max-w-full"
              style={{
                background: 'linear-gradient(rgba(201,147,58,0.04), rgba(201,147,58,0.04)), #07070a',
                border: '1px solid rgba(201,147,58,0.25)',
                padding: '14px 18px',
                boxShadow: 'none',
                minHeight: '72px',
                height: 'auto',
                maxWidth: '380px',
                width: '100%',
              }}
            >
              <div
                className="absolute"
                style={STYLES.heroBadgeLabel}
              >
                PROTOCOLO 48 HORAS
              </div>
              <p
                style={STYLES.heroBadgeText}
              >
                Sem se humilhar ou implorar. A estratégia que ensina como <strong style={{ color: '#f2ece0', fontWeight: 500 }}>despertar o interesse dele (novamente)</strong> em <strong style={{ color: '#f2ece0', fontWeight: 500 }}>menos de 48h</strong>.
              </p>
            </motion.div>

            {/* CTA */}
            {/* CORRIGIDO: Limpadas as larguras fixas de 550px, alturas fixas e margens esquerdas rígidas (marginLeft de 60px) que quebravam no mobile */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.05, ease: 'easeOut' }}
              className="flex flex-col gap-3 items-start w-full max-w-full"
              style={{ marginTop: '22px' }}
            >
              {/* CORRIGIDO: Convertidos estilos inline estéticos de bordas e raio para classes nativas ou simplificadas, sem dimensões fixas */}
              <button
                id="hero-cta-btn"
                type="button"
                onClick={onCtaClick}
                className="btn-glitter-gold w-full animate-none mb-0.5"
              >
                <span className="relative z-10 flex items-center justify-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
                  {c.cta}
                </span>
              </button>

              {/* Trust badges below button */}
              <div className="flex flex-row items-center justify-between mt-3.5 sm:mt-4 px-0.5 w-full max-w-[300px] mx-auto sm:mx-0" style={{ lineHeight: '1' /* Align elements strictly to line baseline limit */ }}>
                <div className="flex items-center gap-[3px]" style={STYLES.trustBadgeItem}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#c9933a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                  <span>Acesso imediato</span>
                </div>
                <div className="flex items-center gap-[3px]" style={STYLES.trustBadgeItem}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#c9933a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <span>Compra segura</span>
                </div>
                <div className="flex items-center gap-[3px]" style={STYLES.trustBadgeItem}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#c9933a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <path d="m9 11 2 2 4-4"/>
                  </svg>
                  <span>7 dias de garantia</span>
                </div>
              </div>
            </motion.div>
          </div>
 
          {/* Coluna direita — vídeo (desktop only) */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:flex justify-center w-full max-w-full mt-2.5 md:mt-0 lg:-mt-2"
          >
            <div 
              className="relative mx-auto"
              style={{
                width: 'min(284px, 100%)',
                aspectRatio: '284/484'
              }}
            >
              {/* Brilhos suaves por trás do vídeo */}
              <div className="absolute -inset-16 bg-[radial-gradient(circle,rgba(255,255,255,0.10)_0%,rgba(240,240,240,0.04)_50%,transparent_80%)] rounded-full blur-[45px] z-0 pointer-events-none luz-branca-movimento" />
              <div className="absolute -inset-8 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,transparent_70%)] rounded-full blur-[35px] z-0 pointer-events-none luz-branca-movimento" style={{ animationDelay: '-3s', animationDuration: '8s' }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[145%] h-[145%] bg-[radial-gradient(circle,rgba(196,163,79,0.06)_0%,transparent_70%)] blur-[55px] z-0 pointer-events-none luz-branca-movimento" style={{ animationDelay: '-1.5s', animationDuration: '14s' }} />

              <div className="relative z-10 w-full h-full border border-[#c4a34f]/50 overflow-hidden rounded-none">
                <VturbPlayer
                  src="https://rhaiane-videos-guard.rhaiane-media.workers.dev/VSL_hd.mp4"
                  containerClassName="relative w-full h-full bg-black overflow-hidden group font-sans"
                  disablePause
                />
              </div>

              {/* Glow dourado sutil embaixo */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-12 bg-[#c4a34f]/10 rounded-full blur-[30px] pointer-events-none z-0" />
            </div>
          </motion.div>

        </div>
      </div>
    </header>
  );
});

export default Hero;
