import React, { useEffect, useRef } from 'react';

// VSL principal (VTurb SmartPlayer). O tracking/conversão é configurado no
// painel da VTurb e roda automaticamente quando o player.js carrega.
const PLAYER_ID = 'vid-6a3e32059f8674db4f7af436';
const PLAYER_SCRIPT =
  'https://scripts.converteai.net/e85958fe-722c-4d23-a4d2-19fb8f182a4a/players/6a3e32059f8674db4f7af436/v4/player.js';

const PLAYER_HTML = `<vturb-smartplayer id="${PLAYER_ID}" style="display: block; margin: 0 auto; width: 100%; max-width: 400px;"><div class="vturb-player-placeholder" style="position: relative; width: 100%; padding: 177.77777777777777% 0 0; z-index: 0; background-color: black;"></div></vturb-smartplayer>`;

interface VturbSmartPlayerProps {
  /** Recebe o tempo atual do vídeo (em segundos) a cada atualização. */
  onTimeUpdate?: (seconds: number) => void;
  /** Impede que o usuário pause o vídeo — retoma automaticamente ao detectar pausa. */
  disablePause?: boolean;
}

export default function VturbSmartPlayer({ onTimeUpdate, disablePause }: VturbSmartPlayerProps) {
  // Injeta o loader do player apenas uma vez por página.
  useEffect(() => {
    const loaderId = `vturb-loader-${PLAYER_ID}`;
    if (document.getElementById(loaderId)) return;
    const s = document.createElement('script');
    s.id = loaderId;
    s.src = PLAYER_SCRIPT;
    s.async = true;
    document.head.appendChild(s);
  }, []);

  // Liga o callback de tempo ao evento 'timeupdate' do smartplayer (usado para
  // liberar o restante da página após X segundos na página de aula gratuita).
  const cbRef = useRef(onTimeUpdate);
  cbRef.current = onTimeUpdate;

  useEffect(() => {
    if (!onTimeUpdate) return;
    let attached = false;
    const interval = window.setInterval(() => {
      if (attached) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sp = (window as any).smartplayer;
      const instances = sp?.instances;
      if (!instances || !instances.length) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const inst = instances.find((i: any) => i && i.video) || instances[0];
      if (inst && typeof inst.on === 'function') {
        attached = true;
        inst.on('timeupdate', () => {
          const t = inst.video?.currentTime ?? 0;
          cbRef.current?.(t);
        });
        window.clearInterval(interval);
      }
    }, 500);

    return () => window.clearInterval(interval);
  }, [onTimeUpdate]);

  useEffect(() => {
    if (!disablePause) return;
    let attached = false;
    const interval = window.setInterval(() => {
      if (attached) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const inst = ((window as any).smartplayer?.instances ?? []).find((i: any) => i?.video) ;
      if (!inst?.video) return;
      attached = true;
      window.clearInterval(interval);
      inst.video.addEventListener('pause', () => {
        inst.video.play().catch(() => {});
      });
    }, 500);
    return () => window.clearInterval(interval);
  }, [disablePause]);

  return <div dangerouslySetInnerHTML={{ __html: PLAYER_HTML }} />;
}
