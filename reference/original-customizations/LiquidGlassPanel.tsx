import { motion } from "framer-motion";

interface LiquidGlassPanelProps {
  size?: number;
  duration?: number;
  top?: string;
}

// A frosted glass blob that drifts back and forth across the section.
// backdrop-filter references the feTurbulence/feDisplacementMap filter
// from GlassFilters, so the straight lines behind it visibly ripple as
// it passes over them -- the "wiggle" effect from the reference image.
export default function LiquidGlassPanel({
  size = 380,
  duration = 14,
  top = "50%",
}: LiquidGlassPanelProps) {
  return (
    <motion.div
      className="pointer-events-none absolute rounded-[46%_54%_60%_40%/50%_45%_55%_50%]"
      style={{
        width: size,
        height: size * 0.75,
        top,
        translateY: "-50%",
        backdropFilter: "url(#glass-distortion) blur(3px) brightness(1.08)",
        WebkitBackdropFilter: "url(#glass-distortion) blur(3px) brightness(1.08)",
        border: "1px solid rgba(254,244,227,0.35)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.45), inset 0 1px 1px rgba(254,244,227,0.4)",
        background:
          "linear-gradient(135deg, rgba(214,198,172,0.06), rgba(73,77,84,0.04))",
      }}
      initial={{ left: "-20%" }}
      animate={{ left: ["-20%", "105%", "-20%"] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
