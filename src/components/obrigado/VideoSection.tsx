import { motion } from "motion/react";

// TODO: substituir PANDA_VIDEO_EMBED_URL pelo embed do Panda Video do vídeo de upsell
const PANDA_VIDEO_EMBED_URL = "";

export default function ObrigadoVideoSection() {
  if (!PANDA_VIDEO_EMBED_URL) {
    return (
      <section className="relative px-4 pt-6 pb-2 max-w-3xl mx-auto z-10 w-full">
        <div className="aspect-video w-full rounded-xl bg-[#0a0a0a] border border-[#c4a34f]/20 flex items-center justify-center">
          <p className="text-[#c4a34f]/50 text-sm font-sans">Vídeo de upsell em breve</p>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative px-4 pt-6 pb-2 max-w-3xl mx-auto z-10 w-full"
      aria-label="Vídeo de apresentação da oferta"
    >
      <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl border border-[#c4a34f]/15">
        <iframe
          src={PANDA_VIDEO_EMBED_URL}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
          title="Vídeo de upsell — Rhaiane Pimenta"
        />
      </div>
    </motion.section>
  );
}
