import { useRef, useState } from "react";

export default function BgOptionA() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50, active: false });
  const [shift, setShift] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x: px, y: py, active: true });
    // cheap parallax: shift the whole line layer a few px opposite the cursor offset from center
    setShift({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * -14,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * -14,
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos((p) => ({ ...p, active: false }))}
      style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", background: "#000" }}
    >
      <div
        style={{
          position: "absolute",
          inset: -20,
          backgroundImage:
            "repeating-linear-gradient(115deg, rgba(214,198,172,0.35) 0px, rgba(214,198,172,0.35) 1.4px, transparent 1.4px, transparent 34px)",
          transform: `translate(${shift.x}px, ${shift.y}px)`,
          transition: "transform 0.4s ease-out",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          width: 260,
          height: 260,
          transform: "translate(-50%,-50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(254,244,227,0.5) 0%, rgba(214,198,172,0.2) 45%, transparent 75%)",
          opacity: pos.active ? 1 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
