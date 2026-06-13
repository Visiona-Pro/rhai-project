#!/bin/bash
# Normaliza o áudio dos vídeos para o padrão web (-14 LUFS) sem re-encodar o vídeo
# e sobe as versões corrigidas no R2 com nome novo (evita cache antigo na CDN).
set -e

echo "== 1/4 Normalizando áudio do VSL =="
ffmpeg -i ./VSL_web.mp4 -c:v copy -af "loudnorm=I=-14:TP=-1.5:LRA=11" -c:a aac -b:a 96k -movflags +faststart ./VSL_web_v2.mp4 -y

echo "== 2/4 Normalizando áudio do UPSELL =="
ffmpeg -i ./UPSELL_web.mp4 -c:v copy -af "loudnorm=I=-14:TP=-1.5:LRA=11" -c:a aac -b:a 128k -movflags +faststart ./UPSELL_web_v2.mp4 -y

echo "== 3/4 Subindo VSL_web_v2.mp4 =="
npx wrangler r2 object put rhaiane-videos/VSL_web_v2.mp4 --file ./VSL_web_v2.mp4 --remote

echo "== 4/4 Subindo UPSELL_web_v2.mp4 =="
npx wrangler r2 object put rhaiane-videos/UPSELL_web_v2.mp4 --file ./UPSELL_web_v2.mp4 --remote

echo "== Concluído. Agora rode: vercel --prod =="
