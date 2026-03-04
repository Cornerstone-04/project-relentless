import type { FormSectionProps } from "@/types";
import { motion } from "framer-motion";

export function FormSection({
  number,
  title,
  children,
  delay = 0,
}: FormSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-5"
    >
      <div className="flex items-center gap-4">
        <span className="font-['Bebas_Neue'] text-3xl text-accent/40">
          {number}
        </span>
        <h2 className="font-['Bebas_Neue'] text-2xl tracking-wide">{title}</h2>
        <div className="flex-1 h-px bg-border" />
      </div>
      {children}
    </motion.section>
  );
}
