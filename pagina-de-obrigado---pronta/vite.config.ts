import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import {defineConfig} from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(() => {
  let appUrl: string;

  if (process.env.APP_URL) {
    appUrl = process.env.APP_URL;
  } else if (process.env.VITE_VERCEL_URL) {
    const raw = process.env.VITE_VERCEL_URL;
    appUrl = raw.startsWith('http') ? raw : `https://${raw}`;
  } else if (!process.env.CI && process.env.NODE_ENV !== 'production') {
    // Desenvolvimento local apenas — nunca em CI ou produção
    appUrl = 'http://localhost:3000';
  } else {
    throw new Error(
      'CONFIGURAÇÃO INCOMPLETA: A variável de ambiente "APP_URL" é obrigatória para o build de produção.\n' +
      'Como configurar:\n' +
      '1. No painel do seu provedor (Vercel, Netlify, Railway, Cloud Run), acesse Variáveis de Ambiente.\n' +
      '2. Adicione: APP_URL = https://seu-dominio.com\n' +
      '3. Faça um novo deploy.'
    );
  }

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: "html-transform",
        transformIndexHtml(html) {
          const gaId = process.env.VITE_GA_TRACKING_ID || "G-XXXXXXXXXX";
          const pixelId = process.env.VITE_META_PIXEL_ID || "XXXXXXXXXXXXXXX";
          return html
            .replace(/%APP_URL%/g, appUrl)
            .replace(/%VITE_GA_TRACKING_ID%/g, gaId)
            .replace(/%VITE_META_PIXEL_ID%/g, pixelId);
        }
      }
    ],
    define: {
      "process.env.APP_URL": JSON.stringify(appUrl),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: false,           // desabilita sourcemaps em produção (não expor código-fonte)
      minify: 'esbuild',          // usa esbuild (já no devDeps) para minificação rápida
      chunkSizeWarningLimit: 600, // avisa se qualquer chunk passar de 600 KB
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-motion': ['motion'],
            'vendor-lucide': ['lucide-react'],
          }
        }
      }
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
