import React from 'react';
import { Link } from 'react-router-dom';
import ImageUpload from './ImageUpload';
import logoImg from '../assets/images/regenerated_image_1780461859488.webp';

const Footer = React.memo(function Footer() {
  return (
    <footer id="footer-section" className="bg-satin-onyx border-t border-[#D4AF37]/15 py-3 text-center select-none text-[#f8eeb7]">
      <div className="container px-6 sm:px-12 max-w-4xl mx-auto flex flex-col items-center gap-2">
        
        {/* Brand Logo Centered */}
        <ImageUpload
          storageKey="img_logo"
          defaultSrc={logoImg}
          alt="Rhaiane Pimenta"
          imgClassName="h-8 w-auto object-contain brightness-110 grayscale hover:grayscale-0 transition duration-300"
          imgProps={{
            loading: 'lazy',
            width: '160',
            height: '40',
            decoding: 'async',
          }}
        />

        {/* Consumer Legal Disclosure block */}
        <div className="space-y-1 max-w-2xl text-[0.62rem] sm:text-[0.68rem] font-sans leading-relaxed tracking-wider py-2 border-y border-white/[0.04] text-gray-400">
          <p className="text-[9px] sm:text-[11px] not-italic">
            Conteúdo educativo e informativo. Não substitui psicoterapia, diagnóstico ou atendimento profissional. Para cuidado em saúde mental, procure um profissional habilitado.
          </p>
        </div>

        {/* Links and Copyrights */}
        <div className="flex flex-col sm:flex-row gap-2 items-center justify-center w-full text-[0.65rem] tracking-widest uppercase mt-1 text-gray-500 font-medium">
          <span className="text-[9px] sm:text-[0.65rem]">
            © {new Date().getFullYear()} RHAIANE PIMENTA • TODOS OS DIREITOS RESERVADOS
          </span>
          <span className="hidden sm:inline text-gray-700">•</span>
          <Link
            to="/privacidade"
            className="text-[9px] sm:text-[0.65rem] text-gray-600 hover:text-[#c4a34f] transition-colors"
          >
            POLÍTICA DE PRIVACIDADE
          </Link>
        </div>

      </div>
    </footer>
  );
});

export default Footer;
