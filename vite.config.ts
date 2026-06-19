import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

const criticalCSS = '*,*::before,*::after{box-sizing:border-box}body{margin:0;background:#020202;color:#FAF9F6;font-family:Inter,Manrope,system-ui,sans-serif}#root{min-height:100vh}';

const asyncCSSPlugin = {
  name: 'async-css',
  apply: 'build' as const,
  enforce: 'post' as const,
  transformIndexHtml(html: string) {
    let result = html;

    // Inject critical CSS inline
    result = result.replace('</head>', `  <style>${criticalCSS}</style>\n</head>`);

    // Convert Vite-injected stylesheet links to async preload pattern
    result = result.replace(
      /<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/g,
      (_, href) =>
        `<link rel="preload" as="style" crossorigin href="${href}">\n    <link rel="stylesheet" media="print" data-activate crossorigin href="${href}">\n    <noscript><link rel="stylesheet" href="${href}"></noscript>`,
    );

    // Inject css-activate.js before </body>
    result = result.replace('</body>', `  <script defer src="/css-activate.js"></script>\n</body>`);

    return result;
  },
};

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      asyncCSSPlugin,
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      // Gera chunks separados para melhor cache no browser
      rollupOptions: {
        output: {
          manualChunks: {
            // Separa React do resto para cache independente
            'react-vendor': ['react', 'react-dom'],
            // Separa Motion (heavy library ~140KB) em chunk próprio
            'motion-vendor': ['motion'],
            // Separa Lucide icons em chunk próprio
            'lucide-vendor': ['lucide-react'],
          },
        },
      },
      // Aumenta o limite de aviso de chunk (padrão 500KB é muito baixo)
      chunkSizeWarningLimit: 800,
      // Minificação agressiva
      minify: 'esbuild' as const,
      // Inline assets menores que 2KB diretamente no JS (evita requests HTTP)
      assetsInlineLimit: 2048,
      // Gera sourcemaps para debugging em produção (desative se não precisar)
      sourcemap: false,
      // CSS code splitting — CSS crítico inline, resto lazy
      cssCodeSplit: true,
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      headers: {
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      },
    },
  };
});
