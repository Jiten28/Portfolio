import { useEffect, useRef } from "react";

const LINE_SPACING = 42;
const LINE_ANGLE_DEG = 115;
const POINT_STEP = 14;
const RIPPLE_RADIUS = 220;
const MAX_DISPLACEMENT = 34;

export default function RippleLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = document.documentElement.scrollHeight;

    const resize = () => {
      width = window.innerWidth;
      height = document.documentElement.scrollHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();

    const handleMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY + window.scrollY };
    };
    const handleLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseleave", handleLeave);
    window.addEventListener("scroll", () => {
      // no-op: canvas is document-height, scroll doesn't need a redraw trigger
    }, { passive: true });

    const angleRad = (LINE_ANGLE_DEG * Math.PI) / 180;
    const dirX = Math.cos(angleRad);
    const dirY = Math.sin(angleRad);
    // perpendicular unit vector, used to offset parallel lines and to
    // displace points outward when a ripple pushes them
    const perpX = -dirY;
    const perpY = dirX;

    const draw = () => {
      const newWidth = window.innerWidth;
      const newHeight = document.documentElement.scrollHeight;
      if (newWidth !== width || newHeight !== height) {
        width = newWidth;
        height = newHeight;
        canvas.width = width;
        canvas.height = height;
      }

      const diag = Math.sqrt(width * width + height * height) + LINE_SPACING * 2;

      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "rgba(214,198,172,0.34)";
      ctx.lineWidth = 1.3;

      const cx = width / 2;
      const cy = height / 2;
      const numLines = Math.ceil((diag * 2) / LINE_SPACING);

      for (let i = -numLines / 2; i < numLines / 2; i++) {
        const offset = i * LINE_SPACING;
        const baseX = cx + perpX * offset;
        const baseY = cy + perpY * offset;

        ctx.beginPath();
        let started = false;

        for (let t = -diag; t <= diag; t += POINT_STEP) {
          let px = baseX + dirX * t;
          let py = baseY + dirY * t;

          const dx = px - mouse.current.x;
          const dy = py - mouse.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < RIPPLE_RADIUS) {
            const falloff = 1 - dist / RIPPLE_RADIUS;
            const push = falloff * falloff * MAX_DISPLACEMENT;
            // push points away from the cursor along the line's own
            // perpendicular, so straight lines bow into a curve
            const awaySign = dx * perpX + dy * perpY >= 0 ? 1 : -1;
            px += perpX * push * awaySign;
            py += perpY * push * awaySign;
          }

          if (px < -50 || px > width + 50 || py < -50 || py > height + 50) {
            if (started) {
              started = false;
            }
            continue;
          }

          if (!started) {
            ctx.moveTo(px, py);
            started = true;
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 pointer-events-none"
      style={{ zIndex: -1, background: "#000000" }}
      aria-hidden="true"
    />
  );
}
