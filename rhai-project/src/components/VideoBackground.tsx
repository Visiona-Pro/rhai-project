import { useRef, useEffect } from 'react';

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.load();
    v.play().catch(() => {});
    // Fallback para iOS que bloqueia autoplay até primeiro toque
    const onTouch = () => { v.play().catch(() => {}); };
    document.addEventListener('touchstart', onTouch, { once: true });
    const deny = (e: Event) => e.preventDefault();
    document.addEventListener('enterpictureinpicture', deny);
    return () => {
      document.removeEventListener('touchstart', onTouch);
      document.removeEventListener('enterpictureinpicture', deny);
    };
  }, []);

  return (
    <div className="vbg" aria-hidden="true">
      <video
        ref={videoRef}
        className="vbg-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        controlsList="nodownload nofullscreen noremoteplayback"
        tabIndex={-1}
        onContextMenu={e => e.preventDefault()}
      >
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>
      {/* Escudo transparente — intercepta qualquer evento antes de chegar ao <video> */}
      <div className="vbg-shield" />
      <div className="vbg-fade-top" />
      <div className="vbg-fade-bottom" />
    </div>
  );
}
