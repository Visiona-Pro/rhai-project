import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Curva psicológica: barra visual avança rápido no início, desacelera no fim
const PROGRESS_CURVE_EXPONENT = 0.35;

interface PlayerProps {
  src: string;
  poster?: string;
  onVideoEnded?: () => void;
  onTimeUpdate?: (time: number) => void;
  containerClassName?: string;
  /** Remove pausa e mudo após o play — o vídeo toca até o fim */
  disablePause?: boolean;
}

export function VturbPlayer({ src, poster, onVideoEnded, onTimeUpdate, containerClassName, disablePause }: PlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [maxWatchedTime, setMaxWatchedTime] = useState(0);
  const [isControlsVisible, setIsControlsVisible] = useState(false);

  const getVisualProgress = (real: number) => Math.pow(real, PROGRESS_CURVE_EXPONENT);
  const getRealProgress = (visual: number) => Math.pow(visual, 1 / PROGRESS_CURVE_EXPONENT);

  useEffect(() => {
    videoRef.current?.play().then(() => setIsPlaying(true)).catch(() => {});
  }, []);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const t = videoRef.current.currentTime;
    setCurrentTime(t);
    if (hasInteracted && t > maxWatchedTime) setMaxWatchedTime(t);
    onTimeUpdate?.(t);
  };

  const handleInitialClick = (e: React.MouseEvent) => {
    // O botão e o container compartilham este handler; sem isto o clique
    // no botão borbulha e dispara o handler duas vezes.
    e.stopPropagation();
    if (!hasInteracted) {
      setHasInteracted(true);
      setIsMuted(false);
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.volume = 1;
        videoRef.current.currentTime = 0;
        setMaxWatchedTime(0);
        videoRef.current.play().catch(() => {
          // Se o browser bloquear o play com som, mantém mudo tocando
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => {});
          }
        });
        setIsPlaying(true);
      }
    } else if (!disablePause) {
      togglePlay(e);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    onVideoEnded?.();
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!hasInteracted || !videoRef.current || duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const visualPct = clickX / rect.width;
    const requestedTime = getRealProgress(visualPct) * duration;
    const target = Math.min(requestedTime, maxWatchedTime);
    videoRef.current.currentTime = target;
    setCurrentTime(target);
  };

  const progressVisualPct = duration > 0 ? getVisualProgress(currentTime / duration) * 100 : 0;
  const maxWatchedVisualPct = duration > 0 ? getVisualProgress(maxWatchedTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className={containerClassName ?? "relative w-full max-w-5xl mx-auto bg-black rounded-lg sm:rounded-xl overflow-hidden shadow-2xl aspect-video group font-sans"}
      onMouseEnter={() => setIsControlsVisible(true)}
      onMouseLeave={() => setIsControlsVisible(false)}
      onClick={handleInitialClick}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover cursor-pointer"
        autoPlay
        muted
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
        onEnded={handleEnded}
        loop={!hasInteracted}
      />

      {/* Feedback central Play/Pause */}
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

      {/* Barra de controles */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-12 pb-4 px-4 sm:px-6 transition-opacity duration-300 z-20 ${
          hasInteracted && (isControlsVisible || !isPlaying) ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex flex-col gap-3">
          <div
            className={`relative h-1.5 sm:h-2 rounded-full cursor-pointer group/bar ${hasInteracted ? 'bg-white/20' : 'bg-transparent'}`}
            onClick={handleSeek}
          >
            {hasInteracted && (
              <div
                className="absolute top-0 left-0 bottom-0 bg-white/30 rounded-full"
                style={{ width: `${maxWatchedVisualPct}%` }}
              />
            )}
            {hasInteracted && (
              <div
                className="absolute top-0 left-0 bottom-0 bg-[#c4a34f] rounded-full transition-all duration-100 ease-linear"
                style={{ width: `${progressVisualPct}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 rounded-full bg-white scale-0 group-hover/bar:scale-100 transition-transform shadow-lg" />
              </div>
            )}
          </div>

          {hasInteracted && (
            <div className="flex items-center justify-between text-white mt-1">
              <div className="flex items-center gap-4 sm:gap-6">
                {!disablePause && (
                  <button onClick={togglePlay} className="hover:scale-110 transition-transform focus:outline-none">
                    {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" />}
                  </button>
                )}
                {!disablePause && (
                  <button onClick={toggleMute} className="hover:scale-110 transition-transform focus:outline-none hidden sm:block">
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                )}
                <span className="text-xs sm:text-sm font-medium font-mono text-zinc-300 pointer-events-none w-12">
                  {formatTime(currentTime)}
                </span>
              </div>
              <button onClick={toggleFullscreen} className="hover:scale-110 transition-transform focus:outline-none" title="Tela cheia">
                <Maximize size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
