/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { VturbPlayer } from './components/VturbPlayer';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 pb-20 selection:bg-green-100">
      {/* Header Falso para Ambientar a VSL */}
      <header className="w-full bg-white shadow-sm h-14 sm:h-16 flex items-center justify-between px-4 sm:px-8 border-b border-zinc-200">
         <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-zinc-800">
            <div className="w-8 h-8 rounded bg-green-500 rounded-lg flex items-center justify-center text-white">
                <span className="text-sm">V$L</span>
            </div>
            DigitalGrowth
         </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-12 sm:pt-20 text-center">
        {/* Headline / Copi de Marketing */}
        <motion.p 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-green-600 font-extrabold tracking-widest uppercase text-xs sm:text-sm mb-4"
        >
          Apresentação Gratuita e Exclusiva
        </motion.p>
        
        <motion.h1 
           initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
           className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-8 text-black leading-tight sm:leading-tight tracking-tight px-2 sm:px-12"
        >
          Descubra o <span className="text-green-600 underline decoration-green-300 underline-offset-4">método não revelado</span> para dobrar a retenção dos seus vídeos de vendas hoje.
        </motion.h1>
        
        {/* Container do Vídeo Player - VTurb Style */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
           className="relative shadow-2xl shadow-green-900/10 rounded-xl ring-1 ring-black/5"
        >
            <VturbPlayer src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
        </motion.div>
        
        <motion.p 
           initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
           className="text-zinc-500 text-sm mt-8 font-medium"
        >
          🔒 Certifique-se de assistir até o final. Seus dados estão seguros.
        </motion.p>
      </main>
    </div>
  );
}
