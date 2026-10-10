import { useRef } from "react";
import { useGlassCursor } from "./GlassCursorContext";

const GLOW_RADIUS = 130;

interface GlowHeadingProps {
  text: string;
  className: string;
  style?: React.CSSProperties;
}

export default function GlowHeading({ text, className, style }: GlowHeadingProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cursor = useGlassCursor();

  // Soft, feathered mask (not a hard clip) so the glow fades out naturally
  // instead of showing a visible circular edge.
  let maskImage = "radial-gradient(circle 0px at -999px -999px, black, transparent)";
  if (cursor.active && wrapRef.current) {
    const rect = wrapRef.current.getBoundingClientRect();
    const x = cursor.clientX - rect.left;
    const y = cursor.clientY - rect.top;
    maskImage = `radial-gradient(circle ${GLOW_RADIUS}px at ${x}px ${y}px, black 0%, transparent 75%)`;
  }

  return (
    <div ref={wrapRef} className="relative">
      {/* base layer -- normal gradient heading, completely unchanged */}
      <h1 className={className} style={style}>
        {text}
      </h1>

      {/* glow layer -- a true text-shadow glow on the same glyphs, only
          visible where the soft radial mask allows it through */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          WebkitMaskImage: maskImage,
          maskImage,
          transition: cursor.active ? "none" : "opacity 0.3s ease-out",
          opacity: cursor.active ? 1 : 0,
        }}
      >
        <h1
          className={className}
          style={{
            ...style,
            color: "transparent",
            WebkitTextFillColor: "transparent",
            background: "none",
            textShadow:
              "0 0 12px #fef4e3, 0 0 28px #d6c6ac, 0 0 55px #aa9371",
          }}
        >
          {text}
        </h1>
      </div>
    </div>
  );
}
