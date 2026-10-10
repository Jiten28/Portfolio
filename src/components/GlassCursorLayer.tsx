import { useRef, useState, type ReactNode } from "react";
import { GlassCursorContext } from "./GlassCursorContext";

interface GlassCursorLayerProps {
  children: ReactNode;
}

// Tracks the cursor and broadcasts its raw position via context so sibling
// effects (glow heading, hidden keyword reveals) can react to the same
// pointer. The background's own ripple/distortion is handled globally by
// RippleLines now, so this no longer renders its own visual lens.
export default function GlassCursorLayer({ children }: GlassCursorLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ clientX: -9999, clientY: -9999, active: false });

  const handleMove = (e: React.MouseEvent) => {
    setCursor({ clientX: e.clientX, clientY: e.clientY, active: true });
  };

  const handleLeave = () => {
    setCursor((c) => ({ ...c, active: false }));
  };

  return (
    <div
      ref={ref}
      className="relative"
      style={{ overflowX: "clip" }}
      onMouseMove={handleMove}
      onMouseEnter={() => setCursor((c) => ({ ...c, active: true }))}
      onMouseLeave={handleLeave}
    >
      <GlassCursorContext.Provider value={cursor}>{children}</GlassCursorContext.Provider>
    </div>
  );
}
