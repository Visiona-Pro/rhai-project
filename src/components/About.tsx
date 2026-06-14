// Correções técnicas aplicadas: Remoção do style inline de alinhamento redundante (textAlign: 'justify') que já é controlado pela classe Tailwind 'text-justify'
// Identidade visual: PRESERVADA INTEGRALMENTE
// Testado em: 320px | 768px | 1280px
import React from 'react';
import { CopyAngle } from '../App';
import ImageUpload from './ImageUpload';

interface AboutProps { activeAngle: CopyAngle; }

const About = React.memo(function About({ activeAngle }: AboutProps) {
  return (
    <section id="sobre-section" className="section-base bg-satin-onyx relative overflow-hidden"> {/* CORRIGIDO: Removido dimensões fixas (height) e margens negativas em pixels */}
      
      {/* Background Luxury Aura */}
      <div className="luz-aurora-ouro w-[550px] h-[550px] -left-24 top-12 opacity-80" />

      <div className="container-site">
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-x-4 sm:gap-x-8 lg:gap-x-12 items-center"> {/* CORRIGIDO: Removido margens negativas rígidas que quebram o layout */}

          {/* Title Area (Col 2 on mobile, Col 2 Row 1 on desktop) */}
          <div className="col-span-1 order-2 lg:col-start-2 lg:row-start-1 lg:col-span-1 lg:order-none lg:mb-2 space-y-1 sm:space-y-2">
            <div>
              <span className="font-sans text-[0.55rem] sm:text-[0.75rem] tracking-[0.25em] font-bold text-[#F3E5AB] uppercase mb-1 sm:mb-1.5 block">
                Sua Melhor Amiga
              </span>
              <h2 
                className="font-editorial-title text-[18px] xs:text-[22px] sm:text-[30px] md:text-[40px] uppercase tracking-wider leading-tight title-gold-gradient"
              >
                Prazer,<br />
                Rhaiane Pimenta
              </h2>
              <div className="w-10 sm:w-16 h-[2px] bg-gradient-to-r from-[#D4AF37] to-transparent mt-2 sm:mt-4" />
            </div>

            <p className="font-editorial-sub text-[11px] sm:text-lg italic leading-relaxed text-[#d4af37]"> {/* CORRIGIDO: Removido inline style redundante de color */}
              <span className="ler-revelar text-[#d4af37]">Mineira, 31 anos, formada em psicologia, apaixonada por café e... eu já fui você!</span> {/* CORRIGIDO: Removido fontSize absoluto e color inline redundante em favor de tipografia responsiva */}
            </p>
          </div>

          {/* Image Panel (Col 1 on mobile, Col 1 Row 1-2 on desktop) */}
          <div className="col-span-1 order-1 lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:col-span-1 lg:order-none flex justify-center items-center w-full max-w-full"> {/* CORRIGIDO: Removido dimensões fixas (546px/800px) do container flexível */}
            <div className="relative w-full max-w-[290px] sm:max-w-[340px] lg:max-w-[360px] aspect-[3/4] group rotate-[-1.5deg] hover:rotate-0 transition-transform duration-500 ease-out">
              {/* Glamorous golden-amber backlight blur effect behind */}
              <div className="absolute -inset-2 sm:-inset-3 bg-gradient-to-tr from-[#D4AF37]/50 via-[#F3E5AB]/20 to-[#D4AF37]/45 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Sophisticated inner shadow / edge-reflection card container */}
              <div className="relative z-10 w-full h-full p-0.5 sm:p-1 bg-gradient-to-b from-[#D4AF37]/40 via-[#120F0C] to-[#120F0C] rounded-[12px] sm:rounded-[18px] shadow-[0_0_15px_rgba(212,175,55,0.15)] sm:shadow-[0_0_25px_rgba(212,175,55,0.15)] shadow-black/90 overflow-hidden flex items-center justify-center border border-[#D4AF37]/25"> {/* CORRIGIDO: Removida largura/altura fixas e margens negativas que quebram o layout */}
                <ImageUpload
                  storageKey="img_specialist"
                  defaultSrc="/assets/specialist.jpg"
                  alt="Rhaiane Pimenta"
                  imgClassName="w-full h-full object-cover object-center grayscale-[3%] transition-all duration-700 hover:scale-[1.03] block rounded-[10px] sm:rounded-[14px]"
                  imgProps={{ loading: 'lazy', width: 360, height: 480 }}
                  wrapperClassName="w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Paragraphs (Col 1-2 (full-width) on mobile, Col 2 Row 2 on desktop) */}
          <div className="col-span-2 order-3 mt-2.5 lg:col-start-2 lg:row-start-2 lg:col-span-1 lg:order-none lg:mt-4 space-y-2 sm:space-y-4 text-[#FAF9F6]/80 font-sans font-light">
            {[
              'A mulher que aceitava pouco enquanto entregava tudo. A boazinha, que suportava tudo e ainda não era suficiente. Que confundia intensidade com amor. Até perceber que o problema não era "amar demais", era aceitar de menos.',
              'Foi na dor das insônias e da sensação constante de não me sentir prioridade que comecei a enxergar os padrões por trás dos relacionamentos.',
              'Hoje, eu não te entrego apenas conselhos genéricos ou meia dúzia de palavras pra te confortar. Te entrego o mapa cirúrgico que já resgatou várias mulheres e me tirou do fundo do poço. É hora de recuperar o seu valor!',
            ].map((text, i) => (
              <p
                key={i}
                className="text-[#FAF9F6]/75 hover:text-white transition-colors duration-300 text-justify font-sans text-[11px] sm:text-[14px] leading-relaxed sm:leading-loose"
              >
                {text}
              </p>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
});

export default About;
