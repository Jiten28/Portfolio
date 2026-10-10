import { useRef } from "react";
import { useGlassCursor } from "./GlassCursorContext";

const REVEAL_RADIUS = 90;

interface GlitchHeadingProps {
  text: string;
  className: string;
  style?: React.CSSProperties;
}

export default function GlitchHeading({ text, className, style }: GlitchHeadingProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cursor = useGlassCursor();

  let clipPath = "circle(0px at -100px -100px)";
  if (cursor.active && wrapRef.current) {
    const rect = wrapRef.current.getBoundingClientRect();
    const x = cursor.clientX - rect.left;
    const y = cursor.clientY - rect.top;
    clipPath = `circle(${REVEAL_RADIUS}px at ${x}px ${y}px)`;
  }

  return (
    <div ref={wrapRef} className="relative">
      {/* base layer -- normal gradient heading */}
      <h1 className={className} style={style}>
        {text}
      </h1>

      {/* glitch layer -- revealed only inside the lens */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ clipPath, transition: cursor.active ? "none" : "clip-path 0.25s ease-out" }}
      >
        <h1
          className={`${className} glitch-jitter`}
          style={{
            ...style,
            position: "absolute",
            inset: 0,
            fontFamily: "'Courier New', monospace",
            color: "#4fd8ff",
            WebkitTextFillColor: "#4fd8ff",
            mixBlendMode: "screen",
            transform: "translate(2px, 0)",
          }}
        >
          {text}
        </h1>
        <h1
          className={`${className} glitch-jitter-alt`}
          style={{
            ...style,
            position: "absolute",
            inset: 0,
            fontFamily: "'Courier New', monospace",
            color: "#ff4f8f",
            mixBlendMode: "screen",
            transform: "translate(-2px, 0)",
            WebkitTextFillColor: "#ff4f8f",
          }}
        >
          {text}
        </h1>
      </div>
    </div>
  );
}
