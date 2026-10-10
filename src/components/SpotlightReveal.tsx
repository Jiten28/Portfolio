import { useRef, type ReactNode } from "react";
import {
  motion, useMotionValue, useSpring, useTransform, useReducedMotion,
  type MotionValue,
} from "framer-motion";

// Deliberately scattered, like the original hero — not a uniform text grid.
const phrases = [
  { text: "Neural Networks", top: "12%", left: "6%" },
  { text: "React.js", top: "19%", left: "31%" },
  { text: "Python Developer", top: "10%", left: "44%" },
  { text: "Generative AI", top: "15%", left: "64%" },
  { text: "LLM Apps", top: "24%", left: "87%" },
  { text: "AI / ML Engineer", top: "27%", left: "12%" },
  { text: "TensorFlow", top: "75%", left: "6%" },
  { text: "Flask API", top: "84%", left: "25%" },
  { text: "RAG Pipelines", top: "73%", left: "48%" },
  { text: "Deep Learning", top: "85%", left: "65%" },
  { text: "Computer Vision", top: "77%", left: "86%" },
];
function RevealPhrase({ phrase, x, y, active }: {
  phrase: typeof phrases[number]; x: MotionValue<number>;
  y: MotionValue<number>; active: MotionValue<number>;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const proximity = useTransform([x, y, active], ([px, py, isActive]: number[]) => {
    const el = ref.current;
    if (!el || !isActive) return 0;
    const cx = el.offsetLeft + (parseFloat(phrase.left) > 80 ? -el.offsetWidth / 2 : el.offsetWidth / 2);
    const cy = el.offsetTop + el.offsetHeight / 2;
    return Number(Math.hypot(px - cx, py - cy) < 110);
  });
  const glow = useSpring(proximity, { stiffness: 220, damping: 28 });
  const opacity = useTransform(glow, [0, 0.4, 1], [0.13, 0.85, 1]);
  const shadow = useTransform(glow, value => `0 0 ${value * 18}px rgba(254,244,227,${value * 0.7})`);
  return <motion.span ref={ref} style={{ top: phrase.top, left: phrase.left,
    transform: parseFloat(phrase.left) > 80 ? "translateX(-100%)" : undefined,
    opacity, textShadow: shadow }}>{phrase.text}</motion.span>;
}
export default function SpotlightReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(-1000), y = useMotionValue(-1000), active = useMotionValue(0);
  return <div ref={ref} className="spotlight-shell flex flex-col flex-1 relative"
    onPointerMove={e => {
      if (reduced || e.pointerType !== "mouse" || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      x.set(e.clientX - r.left); y.set(e.clientY - r.top); active.set(1);
    }} onPointerLeave={() => active.set(0)}>
    {!reduced && <div className="spotlight-reveal" aria-hidden="true">
      {phrases.map(phrase => <RevealPhrase key={phrase.text} phrase={phrase} x={x} y={y} active={active} />)}
    </div>}
    {children}
  </div>;
}
