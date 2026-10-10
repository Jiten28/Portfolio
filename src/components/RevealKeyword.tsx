import { useRef } from "react";
import { useGlassCursor } from "./GlassCursorContext";

const REVEAL_RADIUS = 110;

interface RevealKeywordProps {
  text: string;
  top: string;
  left: string;
}

export default function RevealKeyword({ text, top, left }: RevealKeywordProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const cursor = useGlassCursor();

  let revealed = false;
  if (cursor.active && ref.current) {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dist = Math.hypot(cursor.clientX - cx, cursor.clientY - cy);
    revealed = dist < REVEAL_RADIUS;
  }

  return (
    <span
      ref={ref}
      className={`reveal-keyword ${revealed ? "revealed" : ""}`}
      style={{ top, left }}
    >
      {text}
    </span>
  );
}
