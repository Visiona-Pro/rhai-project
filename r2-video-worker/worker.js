// Worker de proteção dos vídeos no R2.
// - Só serve os arquivos da lista (bucket não fica exposto)
// - Bloqueia hotlink: referer de outro site recebe 403
//   (referer vazio é permitido — extensões de privacidade removem o header)
// - Suporta Range requests (seek do player)

const ALLOWED_FILES = new Set(['VSL_web_v2.mp4', 'UPSELL_web_v2.mp4']);

const ALLOWED_REFERER_HOSTS = (host) =>
  host === 'rhaiane.com.br' ||
  host.endsWith('.rhaiane.com.br') ||
  host.endsWith('.vercel.app') || // previews da Vercel
  host === 'localhost';

export default {
  async fetch(request, env) {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    const key = decodeURIComponent(new URL(request.url).pathname.slice(1));
    if (!ALLOWED_FILES.has(key)) {
      return new Response('Not Found', { status: 404 });
    }

    const referer = request.headers.get('Referer');
    if (referer) {
      let allowed = false;
      try {
        allowed = ALLOWED_REFERER_HOSTS(new URL(referer).hostname);
      } catch {}
      if (!allowed) return new Response('Forbidden', { status: 403 });
    }

    const object = await env.VIDEOS.get(key, {
      range: request.headers,
      onlyIf: request.headers,
    });
    if (object === null) return new Response('Not Found', { status: 404 });

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('etag', object.httpEtag);
    headers.set('Accept-Ranges', 'bytes');
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');

    if (!('body' in object) || !object.body) {
      // Precondição (If-None-Match etc.) não satisfeita
      return new Response(null, { status: 304, headers });
    }

    if (object.range) {
      const start = object.range.offset ?? 0;
      const length = object.range.length ?? object.size - start;
      headers.set('Content-Range', `bytes ${start}-${start + length - 1}/${object.size}`);
      headers.set('Content-Length', String(length));
      return new Response(object.body, { status: 206, headers });
    }

    headers.set('Content-Length', String(object.size));
    return new Response(object.body, { status: 200, headers });
  },
};
