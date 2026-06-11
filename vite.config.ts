import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
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
