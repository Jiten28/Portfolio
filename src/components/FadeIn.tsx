import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
interface Props {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
}
export default function FadeIn({
  children,
  delay = 0,
  duration = 0.55,
  x = 0,
  y = 24,
  className = "",
}: Props) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "40px", amount: 0 }}
      transition={
        reduced
          ? { duration: 0 }
          : { delay, duration, ease: [0.25, 0.1, 0.25, 1] }
      }
    >
      {children}
    </motion.div>
  );
}
