import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Expoente para curvar a barra de progresso (avança rápido no início, devagar no fim)
// 0.35 faz com que a barra chegue em ~50% quando o vídeo tem apenas ~8% de avanço real!
const PROGRESS_CURVE_EXPONENT = 0.35; 

interface PlayerProps {
  src: string;
}

export function VturbPlayer({ src }: PlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [maxWatchedTime, setMaxWatchedTime] = useState(0);
  const [isControlsVisible, setIsControlsVisible] = useState(false);

  // Acelera a barra visualmente
  const getVisualProgress = (real: number) => Math.pow(real, PROGRESS_CURVE_EXPONENT);
  // Converte o clique na barra visual em tempo real para permitir voltar o vídeo corretamente
  const getRealProgress = (visual: number) => Math.pow(visual, 1 / PROGRESS_CURVE_EXPONENT);

  useEffect(() => {
    // Tenta iniciar o vídeo silencioso assim que carrega (Efeito GIF)
    if (videoRef.current) {
        videoRef.current.play().then(() => {
            setIsPlaying(true);
        }).catch(err => {
            console.log("Autoplay bloqueado pelo navegador", err);
        });
    }
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
        let t = videoRef.current.currentTime;
        setCurrentTime(t);
        // Só registra o progresso linear depois da interação inicial
        if (hasInteracted && t > maxWatchedTime) {
            setMaxWatchedTime(t);
        }
    }
  };

  const handleInitialClick = (e: React.MouseEvent) => {
    // Se o usuário ainda não ativou o som
    if (!hasInteracted) {
      setHasInteracted(true);
      setIsMuted(false);
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.currentTime = 0; // Reinicia o VSL!
        setMaxWatchedTime(0);
        videoRef.current.play();
        setIsPlaying(true);
      }
    } else {
        // Se já interagiu, clica no meio da tela pausa/dá play
        togglePlay(e);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!document.fullscreenElement) {
        containerRef.current?.requestFullscreen().catch(err => {
           console.error(`Erro ao ativar tela cheia: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    // Bloqueia arrastar antes da interação inicial
    if (!hasInteracted || !videoRef.current || duration === 0) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const visualPct = clickX / rect.width;
    
    // Converte a %. visual para %. real de tempo
    const realPct = getRealProgress(visualPct);
    const requestedTime = realPct * duration;
    
    // Regra rígida: Não pode pular pra frente, apenas para onde já foi assistido, ou no máximo voltar.
    // É isso que cria a retenção no modelo "VTurb".
    if (requestedTime <= maxWatchedTime) {
       videoRef.current.currentTime = requestedTime;
       setCurrentTime(requestedTime);
    } else {
       // Se o usuário clicar para ir para a frente, nós travamos ele no ponto máximo assistido
       videoRef.current.currentTime = maxWatchedTime;
       setCurrentTime(maxWatchedTime);
    }
  };

  // Cálculos visuais
  const progressVisualPct = duration > 0 ? getVisualProgress(currentTime / duration) * 100 : 0;
  const maxWatchedVisualPct = duration > 0 ? getVisualProgress(maxWatchedTime / duration) * 100 : 0;

  return (
    <div 
        ref={containerRef}
        className="relative w-full max-w-5xl mx-auto bg-black rounded-lg sm:rounded-xl overflow-hidden shadow-2xl aspect-video group font-sans" 
        onMouseEnter={() => setIsControlsVisible(true)}
        onMouseLeave={() => setIsControlsVisible(false)}
        onClick={handleInitialClick}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover cursor-pointer"
        autoPlay
        muted // Obrigatório pro autoplay de início
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
        onEnded={() => setIsPlaying(false)}
        loop={!hasInteracted} // Loop infinito se ainda não foi interagido (como um GIF)
      />

      {/* Overlay: Botão gigante estimulando o primeiro clique para áudio */}
      <AnimatePresence>
        {!hasInteracted && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 flex items-start justify-center pt-6 sm:pt-10 cursor-pointer z-10"
            >
            <motion.div 
                animate={{ scale: [1, 1.04, 1] }} 
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="bg-[#24d924]/90 hover:bg-[#24d924] text-white px-5 py-2.5 sm:px-8 sm:py-4 rounded-full flex items-center gap-3 font-semibold shadow-2xl text-sm sm:text-base border border-white/20 transition-colors"
                onClick={handleInitialClick}
            >
                <VolumeX size={20} className="sm:w-6 sm:h-6" />
                <span>Seu vídeo já começou. <br className="sm:hidden" />Clique para ouvir!</span>
            </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback central Play/Pause após interação */}
      <AnimatePresence>
        {hasInteracted && !isPlaying && (
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none z-10"
            >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center shadow-lg border border-white/30">
                    <Play size={40} className="ml-2 w-8 h-8 sm:w-10 sm:h-10" fill="currentColor" />
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Barra de Controles Inferior */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-12 pb-4 px-4 sm:px-6 transition-opacity duration-300 z-20 ${
          hasInteracted && (isControlsVisible || !isPlaying) ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={e => e.stopPropagation()} 
      >
        <div className="flex flex-col gap-3">
            {/* Barra de Progresso Manipulada Psicológica */}
            <div 
                className={`relative h-1.5 sm:h-2 rounded-full cursor-pointer group/bar ${hasInteracted ? 'bg-white/20' : 'bg-transparent'}`}
                onClick={handleSeek}
            >
                {/* Visualização de até onde o usuário chegou (Opcional, sutil) */}
                {hasInteracted && (
                    <div 
                        className="absolute top-0 left-0 bottom-0 bg-white/30 rounded-full"
                        style={{ width: `${maxWatchedVisualPct}%` }}
                    />
                )}
                
                {/* Progresso Atual (Vermelho ou Cor Dominante da Marca) */}
                {hasInteracted && (
                    <div 
                        className="absolute top-0 left-0 bottom-0 bg-[#00dd00] sm:bg-[#24d924] rounded-full transition-all duration-100 ease-linear"
                        style={{ width: `${progressVisualPct}%` }}
                    >
                        {/* Indicador ("Bolinha") */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 rounded-full bg-white scale-0 group-hover/bar:scale-100 transition-transform shadow-lg" />
                    </div>
                )}
            </div>

            {/* Controles: Play/Pause, Volume, Tempo e Tela Cheia */}
            {hasInteracted && (
                <div className="flex items-center justify-between text-white mt-1">
                    <div className="flex items-center gap-4 sm:gap-6">
                        <button onClick={togglePlay} className="hover:scale-110 transition-transform focus:outline-none">
                            {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" />}
                        </button>
                        
                        <button onClick={toggleMute} className="hover:scale-110 transition-transform focus:outline-none hidden sm:block">
                            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </button>
                        
                        {/* Apenas o tempo atual é mostrado - o tempo total é escondido intencionalmente */}
                        <span className="text-xs sm:text-sm font-medium font-mono text-zinc-300 pointer-events-none w-12">
                            {formatTime(currentTime)}
                        </span>
                    </div>
                    
                    <button 
                    onClick={toggleFullscreen} 
                    className="hover:scale-110 transition-transform focus:outline-none"
                    title="Tela cheia"
                    >
                        <Maximize size={20} />
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
