import { motion } from "motion/react";
import { Calendar, Eye, Compass, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Benefit {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

const benefitsData = [
  {
    id: 1,
    title: "4 encontros exclusivos",
    description: "Voltados para clareza emocional, posicionamento e construção de uma nova mulher.",
    icon: Calendar,
  },
  {
    id: 2,
    title: "Leitura estratégica",
    description: "A maioria das mulheres sabe o que não quer, mas não sabe o que deve mudar.",
    icon: Eye,
  },
  {
    id: 3,
    title: "Posicionamento e presença",
    description: "Ajustes de comunicação, postura, limites e valor.",
    icon: Compass,
  },
  {
    id: 4,
    title: "Direcionamento personalizado",
    description: "Você não estará sozinha para \"aplicar\". Você receberá orientações pontuais.",
    icon: Target,
  },
] as const satisfies Benefit[];

export default function BenefitList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 my-2">
      {benefitsData.map((benefit, index) => {
        const Icon = benefit.icon;
        return (
          <motion.div
            key={benefit.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-25px" }}
            transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
            className="flex items-start gap-2 p-1.5 rounded-lg hover:bg-white/[0.03] transition-all duration-300 group min-w-0"
          >
            {/* Symbol badge with spinning highlight border and thinner borders */}
            <div className="flex-shrink-0 glowing-orbit-container group-hover:scale-110 transition-all duration-300">
              <div className="glowing-orbit-light" />
              <div className="glowing-orbit-inner">
                <Icon
                  size={11}
                  strokeWidth={2}
                  className="text-[#e7c279]"
                />
              </div>
            </div>

            {/* Content text */}
            <div className="space-y-0.5 min-w-0">
              <h4 className="font-serif text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider">
                {benefit.title}
              </h4>
              <p className="text-[10px] text-white leading-normal font-sans text-justify">
                {benefit.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
