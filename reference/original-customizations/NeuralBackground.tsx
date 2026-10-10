import { useEffect, useRef } from "react";

interface Node {
  x: number; // 0-1 normalized
  y: number; // 0-1 normalized
}

interface AmbientStar {
  x: number;
  y: number;
  size: number;
  phase: number;
  speed: number;
}

const NODE_COUNT = 110;
const CONNECT_DIST = 150;
const GLOW_DIST = 190;
const PARALLAX_STRENGTH = 26;
const STAR_BASE_COUNT = 500;
const STAR_MAX_COUNT = 1400;


function getContentHeight(): number {
  const el = document.getElementById("page-content");
  // Measure the actual route content, not document.documentElement --
  // the canvas itself is absolutely positioned and would otherwise be
  // included in scrollHeight, inflating on every navigation and never
  // shrinking back down on shorter pages.
  if (el) return Math.max(el.scrollHeight, window.innerHeight);
  return window.innerHeight;
}

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const nodesRef = useRef<Node[]>([]);
  const starsRef = useRef<AmbientStar[]>([]);
  const rafRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = getContentHeight();

    const resize = () => {
      width = window.innerWidth;
      height = getContentHeight();
      canvas.width = width;
      canvas.height = height;
    };
    resize();

    if (nodesRef.current.length === 0) {
      // scale node count with page area so density stays consistent on tall pages
      const area = width * height;
      const baseArea = 1280 * 900;
      const count = Math.min(190, Math.round(NODE_COUNT * Math.max(1, area / baseArea)));
      const arr: Node[] = [];
      for (let i = 0; i < count; i++) {
        arr.push({ x: Math.random(), y: Math.random() });
      }
      nodesRef.current = arr;
    }

    if (starsRef.current.length === 0) {
      // ambient starfield -- cheap (no pairwise distance checks), scales
      // more generously than the constellation nodes so tall pages still
      // feel full instead of empty near the bottom
      const area = width * height;
      const baseArea = 1280 * 900;
      const starCount = Math.min(
        STAR_MAX_COUNT,
        Math.round(STAR_BASE_COUNT * Math.max(1, area / baseArea))
      );
      const stars: AmbientStar[] = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random(),
          y: Math.random(),
          size: Math.random() < 0.12 ? 1.8 : 1,
          phase: Math.random() * Math.PI * 2,
          speed: 0.6 + Math.random() * 1.2,
        });
      }
      starsRef.current = stars;
    }

    const handleMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY + window.scrollY };
    };
    const handleLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseleave", handleLeave);

    const draw = () => {
      const newWidth = window.innerWidth;
      const newHeight = getContentHeight();
      if (newWidth !== width || newHeight !== height) {
        width = newWidth;
        height = newHeight;
        canvas.width = width;
        canvas.height = height;
      }

      ctx.clearRect(0, 0, width, height);

      // ambient starfield -- cheap O(n) twinkle, gives galaxy-like density
      const t = performance.now() / 1000;
      for (const s of starsRef.current) {
        const twinkle = 0.35 + 0.35 * Math.sin(t * s.speed + s.phase);
        ctx.beginPath();
        ctx.arc(s.x * width, s.y * height, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(214,198,172,${twinkle})`;
        ctx.fill();
      }

      const mxNorm = mouse.current.x / width - 0.5;
      const myNorm = mouse.current.y / height - 0.5;
      const shiftX = -mxNorm * PARALLAX_STRENGTH;
      const shiftY = -myNorm * PARALLAX_STRENGTH;

      const pts = nodesRef.current.map((n) => ({
        x: n.x * width + shiftX,
        y: n.y * height + shiftY,
      }));

      // Only check connections within a local grid bucket for performance
      // on pages with many nodes -- simple O(n^2) is fine up to a few
      // hundred nodes, which covers even tall pages comfortably.
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const midX = (pts[i].x + pts[j].x) / 2;
            const midY = (pts[i].y + pts[j].y) / 2;
            const cdx = midX - mouse.current.x;
            const cdy = midY - mouse.current.y;
            const cursorDist = Math.sqrt(cdx * cdx + cdy * cdy);
            const glow = Math.max(0, 1 - cursorDist / GLOW_DIST);
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(214,198,172,${0.06 + glow * 0.5})`;
            ctx.lineWidth = 1 + glow * 1.2;
            ctx.stroke();
          }
        }
      }

      for (const p of pts) {
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const glow = Math.max(0, 1 - dist / GLOW_DIST);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6 + glow * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(254,244,227,${0.28 + glow * 0.6})`;
        ctx.fill();
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
