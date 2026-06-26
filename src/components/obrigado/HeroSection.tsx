import { motion } from "motion/react";

export default function ObrigadoHeroSection() {
  return (
    <section
      aria-label="Confirmação de compra"
      className="ob-header-section relative flex flex-col items-center text-center px-4 pt-3 pb-0 max-w-3xl mx-auto z-10 w-full"
    >
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="select-none"
      >
        PARABÉNS POR DAR ESSE PASSO<br />
        <em className="ob-gold-brushed-text">Agora vem a parte que muda tudo.</em>
      </motion.h1>
    </section>
  );
}
