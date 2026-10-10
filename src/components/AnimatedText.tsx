import { useRef, type CSSProperties } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
function Word({ word, index, total, progress }: {word: string; index: number; total: number; progress: MotionValue<number>}) {
  const opacity = useTransform(progress, [index / total, (index + 1) / total], [0.55, 1]);
  return <motion.span style={{opacity}} className="inline-block">{word}</motion.span>;
}
// Original scroll reveal, optimized to animate words without splitting line wraps.
export default function AnimatedText({text, className = "", style}: {text: string; className?: string; style?: CSSProperties}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const {scrollYProgress} = useScroll({target: ref, offset: ["start 0.85", "end 0.35"]});
  const words = text.trim().split(/\s+/);
  return <p ref={ref} className={className} style={style}>
    {reduced ? text : <><span className="sr-only">{text}</span><span aria-hidden="true">{words.map((word, index) => <span key={index}><Word word={word} index={index} total={words.length} progress={scrollYProgress} />{index < words.length - 1 ? " " : ""}</span>)}</span></>}
  </p>;
}
