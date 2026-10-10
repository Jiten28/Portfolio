import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  depth: number; // 0 = far, 1 = near -- controls parallax strength and size
  size: number;
}

export default function BgOptionC() {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const box = boxRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = box.clientWidth;
      canvas.height = box.clientHeight;
    };
    resize();

    if (particlesRef.current.length === 0) {
      const arr: Particle[] = [];
      for (let i = 0; i < 70; i++) {
        arr.push({
          x: Math.random(),
          y: Math.random(),
          depth: Math.random(),
          size: 1 + Math.random() * 2,
        });
      }
      particlesRef.current = arr;
    }

    let raf: number;
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const mxNorm = mouse.current.x / w - 0.5;
      const myNorm = mouse.current.y / h - 0.5;

      for (const p of particlesRef.current) {
        // parallax: far particles (low depth) move less, near particles move more
        const parallaxStrength = p.depth * 40;
        const px = p.x * w - mxNorm * parallaxStrength;
        const py = p.y * h - myNorm * parallaxStrength;

        const dx = px - mouse.current.x;
        const dy = py - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const glow = Math.max(0, 1 - dist / 160);

        const size = p.size * (1 + p.depth) * (1 + glow * 1.8);
        const alpha = 0.25 + p.depth * 0.35 + glow * 0.5;

        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(214,198,172,${Math.min(alpha, 1)})`;
        ctx.fill();

        if (glow > 0.3) {
          ctx.beginPath();
          ctx.arc(px, py, size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(254,244,227,${glow * 0.15})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const handleMove = (e: MouseEvent) => {
      const rect = box.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };

    box.addEventListener("mousemove", handleMove);
    box.addEventListener("mouseleave", handleLeave);
    window.addEventListener("resize", resize);

    return () => {
      box.removeEventListener("mousemove", handleMove);
      box.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={boxRef} style={{ position: "relative", width: "100%", height: "100%", background: "#000" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0 }} />
    </div>
  );
}
