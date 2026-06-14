// Correções técnicas aplicadas: Convertido style="overflow: hidden" inline para a classe 'overflow-hidden' nativa do Tailwind.
// Identidade visual: PRESERVADA INTEGRALMENTE
// Testado em: 320px | 768px | 1280px
import React, { useState } from 'react';
import { FAQS } from '../data';

function renderAnswer(text: string): React.ReactNode {
  return text.split(/(<strong>.*?<\/strong>)/g).map((part, i) => {
    const match = part.match(/^<strong>(.*?)<\/strong>$/);
    return match ? <strong key={i}>{match[1]}</strong> : part;
  });
}

const FAQ = React.memo(function FAQ() {
  const [openId, setOpenId] = useState<string>('');

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  return (
    <section id="faq-section" className="relative py-4 sm:py-6 bg-satin-onyx border-t border-[#D4AF37]/15 overflow-hidden">
      
      {/* Creative Background "?" decoration layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        {/* Main giant background elegant gold-tinted "?" */}
        <span className="absolute -right-24 -bottom-32 font-editorial-title text-[380px] sm:text-[520px] md:text-[600px] font-black text-transparent bg-clip-text bg-gradient-to-tr from-[#D4AF37]/8 via-[#D4AF37]/3 to-transparent leading-none select-none rotate-12">
          ?
        </span>
        {/* Secondary subtle floating elegant "?" on the top-left */}
        <span className="absolute -left-16 top-12 font-editorial-title text-[200px] sm:text-[300px] font-black text-transparent bg-clip-text bg-gradient-to-bl from-[#D4AF37]/5 via-transparent to-transparent leading-none select-none -rotate-12">
          ?
        </span>
        {/* Subtle center background light query glyph */}
        <div className="absolute inset-0 flex items-center justify-center translate-y-4 opacity-40">
          <span className="font-editorial-title text-[150px] sm:text-[250px] md:text-[320px] font-extralight text-[#D4AF37]/3 select-none leading-none animate-pulse" style={{ animationDuration: '6s' }}>
            ?
          </span>
        </div>
      </div>
      
      {/* Decorative luxury abstract radial shadows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative z-10 px-4 sm:px-8 max-w-2xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-4"> {/* ESPAÇO: mb-6 → mb-4 */}
          <h2 
            className="font-editorial-title text-[30px] sm:text-[34px] uppercase tracking-wider mb-4 leading-tight title-gold-gradient"
          >
            Dúvidas Frequentes
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-2" />
        </div>

        {/* Dynamic FAQ List with glass-luxury */}
        <div className="space-y-2">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`border rounded-none transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-[#D4AF37] bg-black/80 shadow-[0_4px_25px_rgba(212,175,55,0.05)]'
                    : 'border-white/5 bg-[#0C0A08]/60 hover:border-[#D4AF37]/30'
                }`}
              >
                {/* Accordion Trigger Trigger */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  type="button"
                  className="w-full flex items-center justify-between py-2.5 px-4 sm:py-3 sm:px-4 cursor-pointer text-left focus:outline-none select-none border-none bg-transparent group"
                >
                  <span className="font-sans text-[11px] tracking-wider font-bold uppercase block pr-4 transition-colors duration-200 text-[#F3E5AB]">
                    {faq.question}
                  </span>
                  
                  {/* Toggle Caret */}
                  <svg
                    className={`w-3 h-3 text-[#D4AF37] transition-transform duration-500 flex-shrink-0 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* Animated Answer Box Description */}
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[350px] border-t border-[#D4AF37]/15 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="py-2.5 px-4 sm:py-3 sm:px-4 bg-black/45 text-left border-t border-white/[0.04]">
                    <p className="font-sans text-xs sm:text-[0.88rem] text-[#f8eeb7] leading-relaxed font-light">
                      {renderAnswer(faq.answer)}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
});

export default FAQ;
