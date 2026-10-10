import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
}

export default function BgOptionD() {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const nodesRef = useRef<Node[]>([]);

  useEffect(() => {
    const box = boxRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = box.clientWidth;
      canvas.height = box.clientHeight;
    };
    resize();

    if (nodesRef.current.length === 0) {
      const arr: Node[] = [];
      for (let i = 0; i < 34; i++) {
        arr.push({ x: Math.random(), y: Math.random() });
      }
      nodesRef.current = arr;
    }

    let raf: number;
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // whole layer parallax-shifts opposite the cursor, like it has depth
      const mxNorm = mouse.current.x / w - 0.5;
      const myNorm = mouse.current.y / h - 0.5;
      const shiftX = -mxNorm * 24;
      const shiftY = -myNorm * 24;

      const pts = nodesRef.current.map((n) => ({
        x: n.x * w + shiftX,
        y: n.y * h + shiftY,
      }));

      // connect nearby nodes
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const midX = (pts[i].x + pts[j].x) / 2;
            const midY = (pts[i].y + pts[j].y) / 2;
            const cdx = midX - mouse.current.x;
            const cdy = midY - mouse.current.y;
            const cursorDist = Math.sqrt(cdx * cdx + cdy * cdy);
            const glow = Math.max(0, 1 - cursorDist / 180);
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(214,198,172,${0.08 + glow * 0.5})`;
            ctx.lineWidth = 1 + glow * 1.2;
            ctx.stroke();
          }
        }
      }

      // draw nodes
      for (const p of pts) {
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const glow = Math.max(0, 1 - dist / 180);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2 + glow * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(254,244,227,${0.4 + glow * 0.6})`;
        ctx.fill();
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
