import React, { useRef } from 'react';
import { PAIN_CARDS } from '../data';
import { motion, useInView } from 'motion/react';

export default function PainPoints() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: "100px", once: true });

  return (
    <section ref={sectionRef} id="diagnostico-section" className="section-base bg-satin-onyx relative overflow-hidden"> {/* CORRIGIDO: Removido height fixo de 773px */}
      
      {/* Luzes douradas ambientais animadas */}
      <motion.div 
        className="luz-aurora-ouro w-[500px] h-[300px] -top-12 -left-20 opacity-60"
        animate={isInView ? {
          x: [0, 30, -15, 0],
          y: [0, -25, 15, 0],
          scale: [1, 1.1, 0.95, 1],
        } : { x: 0, y: 0, scale: 1 }}
        transition={{
          repeat: Infinity,
          duration: 15,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="luz-aurora-ouro w-[400px] h-[400px] bottom-10 -right-20 opacity-40"
        animate={isInView ? {
          x: [0, -25, 25, 0],
          y: [0, 30, -20, 0],
          scale: [1, 0.95, 1.1, 1],
        } : { x: 0, y: 0, scale: 1 }}
        transition={{
          repeat: Infinity,
          duration: 18,
          ease: "easeInOut"
        }}
      />

      {/* Vagalumes / Reflexos dourados sofisticados em movimento */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-[#D4AF37]/65 via-[#dfc686]/45 to-transparent blur-xl"
          style={{ left: '5%', top: '15%', willChange: 'transform, opacity' }}
          animate={isInView ? {
            x: [0, 160, 40, 240, 0],
            y: [0, 180, 80, 220, 0],
            scale: [0.9, 1.6, 1.1, 1.8, 0.9],
            opacity: [0.35, 0.75, 0.4, 0.85, 0.35]
          } : { x: 0, y: 0, scale: 1, opacity: 0.35 }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute w-32 h-32 rounded-full bg-gradient-to-b from-[#e8d39e]/55 via-[#D4AF37]/35 to-transparent blur-2xl"
          style={{ left: '85%', top: '10%', willChange: 'transform, opacity' }}
          animate={isInView ? {
            x: [0, -160, -40, -220, 0],
            y: [0, 180, 60, 245, 0],
            scale: [1.1, 0.8, 1.5, 1.0, 1.1],
            opacity: [0.3, 0.65, 0.35, 0.75, 0.3]
          } : { x: 0, y: 0, scale: 1.1, opacity: 0.3 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-[#8f6a27]/60 via-[#D4AF37]/45 to-transparent blur-lg"
          style={{ left: '25%', top: '75%', willChange: 'transform, opacity' }}
          animate={isInView ? {
            x: [0, 220, 80, -80, 0],
            y: [0, -180, -40, -200, 0],
            scale: [1.0, 1.5, 0.9, 1.4, 1.0],
            opacity: [0.4, 0.8, 0.35, 0.7, 0.4]
          } : { x: 0, y: 0, scale: 1.0, opacity: 0.4 }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute w-28 h-28 rounded-full bg-gradient-to-tr from-[#D4AF37]/50 via-[#ffffff]/25 to-transparent blur-xl"
          style={{ left: '75%', top: '85%', willChange: 'transform, opacity' }}
          animate={isInView ? {
            x: [0, -220, 40, -120, 0],
            y: [0, -180, -260, -60, 0],
            scale: [1.2, 0.9, 1.6, 1.1, 1.2],
            opacity: [0.35, 0.7, 0.45, 0.8, 0.35]
          } : { x: 0, y: 0, scale: 1.2, opacity: 0.35 }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container-site"> {/* CORRIGIDO: Removido margem negativa, altura fixa md:h e margens laterais estáticas */}

        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-5"> {/* ESPAÇO: mb-6 sm:mb-8 → mb-4 sm:mb-5 */} {/* CORRIGIDO: Removida altura e largura do cabeçalho fixa em pixel */}
          <h2 
            className="font-editorial-title text-[30px] sm:text-[36px] uppercase tracking-wider mb-4 leading-tight title-gold-gradient"
          >
            Você se reconhece aqui?
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto my-3" />
        </div>

        {/* Grid de cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-6xl mx-auto"> {/* CORRIGIDO: Substituídas dimensões rígidas de pixel (width: 1150px, height) por classes responsivas nativas para grids */}
          {PAIN_CARDS.map((card) => (
            <div
              key={card.id}
              className="glass-luxury-interactive p-6 sm:p-8 flex flex-col gap-5 relative overflow-hidden group border border-[#996515]/30 rounded-none shadow-[2px_4px_15px_rgba(0,0,0,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.08)] transform hover:-translate-y-2.5 transition-all duration-300"
            >
              {/* Barra inferior hover */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Fio de luz decorativo interno de topo */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Header: Titulo e Numeração Lado a Lado (Escrito na frente do número) */}
              <div className="flex items-start justify-between gap-4 relative">
                <h3 className="font-editorial-title text-[#FFF] uppercase tracking-widest leading-snug flex-1">
                  <span className="ler-revelar text-[16px]">{card.title}</span>
                </h3>

                <div className="relative w-11 h-11 flex-shrink-0 flex items-center justify-center">
                  {/* Premium Static Gold Backlight Aura - completely stationary, pure high-quality light glow */}
                  <span className="absolute -inset-2 rounded-full bg-[#D4AF37]/25 blur-[10px] opacity-90 pointer-events-none" />
                  <span className="absolute inset-0 rounded-full bg-[#D4AF37]/35 blur-[4px] opacity-100 pointer-events-none" />
                  
                  {/* Main high-intensity premium glowing bullet */}
                  <div className="relative w-11 h-11 rounded-full bg-gradient-to-b from-[#1e1913] to-[#0b0908] border-2 border-[#D4AF37] flex items-center justify-center font-serif text-sm font-extrabold text-[#FFFDF4] shadow-[0_0_15px_rgba(212,175,55,0.5)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.8)] group-hover:scale-105 transition-all duration-300 z-10">
                    {/* Inner gold concentric boundary line to add extreme depth and craft refinement */}
                    <div className="absolute inset-[2px] rounded-full border border-[#D4AF37]/25 pointer-events-none" />
                    {card.icon}
                  </div>
                </div>
              </div>

              {/* Texto */}
              <div className="space-y-3">
                {/* Linha fina decoradora */}
                <div className="w-1/3 h-[1px] bg-[#D4AF37]/15 my-2" />

                <p className="font-sans text-[13px] text-[#f8eeb7] font-light text-justify" style={{ lineHeight: '18px' /* Custom condensed card body height */ }}>
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mensagem Estratégica abaixo dos quadros */}
        <div className="mt-6 text-center max-w-2xl mx-auto px-4 z-10 relative"> {/* ESPAÇO: mt-12 → mt-6 */}
          <p className="font-sans text-[13px] text-[#F5F1E8]/90 leading-relaxed font-light italic">
            Se qualquer um desses pontos te pegou... <span className="font-semibold text-white">não é azar, nem dedo podre!</span> É <span className="font-semibold text-white">padrão</span>. E <span className="text-[#D4AF37] font-bold">tem saída</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
