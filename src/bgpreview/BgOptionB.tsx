import { useEffect, useRef } from "react";

export default function BgOptionB() {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const idleTimer = useRef<number>();
  const running = useRef(false);
  const raf = useRef<number>();

  useEffect(() => {
    const box = boxRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = box.clientWidth;
      canvas.height = box.clientHeight;
    };
    resize();

    const angle = (115 * Math.PI) / 180;
    const dirX = Math.cos(angle);
    const dirY = Math.sin(angle);
    const perpX = -dirY;
    const perpY = dirX;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(214,198,172,0.4)";
      ctx.lineWidth = 1.3;
      const spacing = 46;
      const diag = Math.sqrt(w * w + h * h) + spacing * 2;
      const cx = w / 2;
      const cy = h / 2;
      const numLines = Math.ceil((diag * 2) / spacing);

      for (let i = -numLines / 2; i < numLines / 2; i++) {
        const offset = i * spacing;
        const baseX = cx + perpX * offset;
        const baseY = cy + perpY * offset;
        ctx.beginPath();
        let started = false;
        for (let t = -diag; t <= diag; t += 16) {
          let px = baseX + dirX * t;
          let py = baseY + dirY * t;
          const dx = px - mouse.current.x;
          const dy = py - mouse.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const radius = 150;
          if (dist < radius) {
            const falloff = 1 - dist / radius;
            const push = falloff * falloff * 30;
            const sign = dx * perpX + dy * perpY >= 0 ? 1 : -1;
            px += perpX * push * sign;
            py += perpY * push * sign;
          }
          if (px < -30 || px > w + 30 || py < -30 || py > h + 30) continue;
          if (!started) {
            ctx.moveTo(px, py);
            started = true;
          } else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }
    };

    const loop = () => {
      draw();
      if (running.current) raf.current = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (!running.current) {
        running.current = true;
        raf.current = requestAnimationFrame(loop);
      }
      window.clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(() => {
        running.current = false;
        if (raf.current) cancelAnimationFrame(raf.current);
      }, 400);
    };

    draw();

    const handleMove = (e: MouseEvent) => {
      const rect = box.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      startLoop();
    };
    const handleLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
      startLoop();
    };

    box.addEventListener("mousemove", handleMove);
    box.addEventListener("mouseleave", handleLeave);
    window.addEventListener("resize", resize);

    return () => {
      box.removeEventListener("mousemove", handleMove);
      box.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("resize", resize);
      if (raf.current) cancelAnimationFrame(raf.current);
      window.clearTimeout(idleTimer.current);
    };
  }, []);

  return (
    <div ref={boxRef} style={{ position: "relative", width: "100%", height: "100%", background: "#000" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0 }} />
    </div>
  );
}
