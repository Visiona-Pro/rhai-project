import { motion } from "motion/react";
import { CircleCheck } from "lucide-react";

export default function ObrigadoTopBar() {
  return (
    <motion.div
      role="banner"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="ob-top-bar sticky top-0 left-0 w-full flex items-center justify-center gap-2 z-50 select-none shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
      id="purchase-confirmation-bar"
    >
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="flex items-center mr-0.5"
      >
        <CircleCheck className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
      </motion.div>
      <span className="font-sans">
        COMPRA CONFIRMADA • LEIA COM ATENÇÃO
      </span>
    </motion.div>
  );
}
