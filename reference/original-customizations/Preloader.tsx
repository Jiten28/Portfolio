import { motion } from "framer-motion";

const dotColors = ["#d6c6ac", "#aa9371", "#494d54"];

export default function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center"
      style={{ background: "#000000" }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="relative" style={{ width: 64, height: 64 }}>
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        >
          {dotColors.map((color, i) => {
            const angle = (i / dotColors.length) * 2 * Math.PI - Math.PI / 2;
            const radius = 26;
            const x = 32 + radius * Math.cos(angle) - 6;
            const y = 32 + radius * Math.sin(angle) - 6;
            return (
              <motion.span
                key={color}
                className="absolute rounded-full"
                style={{
                  width: 12,
                  height: 12,
                  left: x,
                  top: y,
                  background: color,
                }}
                animate={{ scale: [1, 0.55, 1] }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * (1.4 / dotColors.length),
                }}
              />
            );
          })}
        </motion.div>
      </div>

      <p
        className="hero-heading font-medium uppercase tracking-[0.3em] mt-6"
        style={{ fontSize: "0.85rem" }}
      >
        Jiten Kumar
      </p>
    </motion.div>
  );
}
