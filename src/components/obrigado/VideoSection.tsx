import { motion } from "motion/react";

export default function ObrigadoVideoSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative px-4 pt-6 pb-2 max-w-3xl mx-auto z-10 w-full"
      aria-label="Vídeo de apresentação da oferta"
    >
      <video
        src="/VSL.mp4"
        className="w-full aspect-video"
        controls
        playsInline
      />
    </motion.section>
  );
}
