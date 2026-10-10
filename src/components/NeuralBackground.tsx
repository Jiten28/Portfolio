import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
// Sparse, connected constellations: explicit branches, not an all-pairs mesh.
const constellations = [
  {
    nodes: [
      [-0.9, 0.45],
      [-0.55, -0.4],
      [-0.05, 0.08],
      [0.4, -0.5],
      [0.95, 0.25],
      [-0.15, 0.65],
      [0.5, 0.8],
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [2, 5],
      [5, 6],
    ],
  },
  {
    nodes: [
      [-0.6, -0.75],
      [0.55, -0.6],
      [-0.22, -0.12],
      [0.02, 0],
      [0.28, 0.12],
      [-0.55, 0.7],
      [0.65, 0.65],
      [0.9, -0.25],
    ],
    edges: [
      [0, 2],
      [2, 3],
      [3, 4],
      [4, 1],
      [2, 5],
      [4, 6],
      [1, 7],
    ],
  },
  {
    nodes: [
      [-0.8, -0.4],
      [-0.25, -0.7],
      [0.35, -0.35],
      [0.8, 0.05],
      [0.3, 0.5],
      [-0.3, 0.7],
      [-0.65, 0.15],
      [0.05, 0.05],
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 0],
      [2, 7],
      [7, 4],
    ],
  },
  {
    nodes: [
      [-0.9, -0.4],
      [-0.45, -0.2],
      [-0.05, -0.5],
      [0.4, -0.25],
      [0.7, 0.2],
      [0.4, 0.7],
      [-0.3, 0.55],
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [1, 6],
    ],
  },
];
export default function NeuralBackground() {
  const ref = useRef<HTMLCanvasElement>(null),
    reduced = useReducedMotion();
  useEffect(() => {
    const canvas = ref.current,
      ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let width = 0,
      height = 0,
      raf = 0,
      last = 0,
      active = false;
    const pointer = { x: 0, y: 0 },
      shift = { x: 0, y: 0 };
    const stars = Array.from({ length: 330 }, () => ({
      x: Math.random(),
      y: Math.random(),
      phase: Math.random() * Math.PI * 2,
      size: Math.random() < 0.09 ? 1.5 : 0.7,
    }));
    const resize = () => {
      width = innerWidth;
      height = innerHeight;
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const paint = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const small = width < 768;
      const targetX = active && !reduced ? (pointer.x / width - 0.5) * -22 : 0,
        targetY = active && !reduced ? (pointer.y / height - 0.5) * -22 : 0;
      shift.x += (targetX - shift.x) * 0.08;
      shift.y += (targetY - shift.y) * 0.08;
      for (const s of stars.slice(0, small ? 130 : 330)) {
        ctx.fillStyle = `rgba(214,198,172,${reduced ? 0.27 : 0.23 + 0.12 * Math.sin(time / 1900 + s.phase)})`;
        ctx.beginPath();
        ctx.arc(s.x * width, s.y * height, s.size, 0, Math.PI * 2);
        ctx.fill();
      }
      const centers = small
        ? [
            [0.2, 0.23],
            [0.77, 0.77],
          ]
        : [
            [0.12, 0.24],
            [0.84, 0.21],
            [0.18, 0.78],
            [0.81, 0.77],
          ];
      const size = Math.min(width, height) * (small ? 0.23 : 0.19);
      centers.forEach(([cx, cy], cluster) => {
        const { nodes, edges } = constellations[cluster];
        const pts = nodes.map(([x, y]) => ({
          x: cx * width + (cluster % 2 ? -x : x) * size + shift.x,
          y: cy * height + y * size + shift.y,
        }));
        for (const [a, b] of edges) {
          const p = pts[a],
            q = pts[b];
          const glow =
            active && !reduced
              ? Math.max(
                  0,
                  1 -
                    Math.hypot(
                      (p.x + q.x) / 2 - pointer.x,
                      (p.y + q.y) / 2 - pointer.y,
                    ) /
                      190,
                )
              : 0;
          ctx.strokeStyle = `rgba(214,198,172,${0.095 + glow * 0.38})`;
          ctx.lineWidth = 0.7 + glow * 0.7;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
        pts.forEach((p, i) => {
          const glow =
            active && !reduced
              ? Math.max(
                  0,
                  1 - Math.hypot(p.x - pointer.x, p.y - pointer.y) / 180,
                )
              : 0;
          const anchor = i === 1 || i === 4;
          const radius = (anchor ? 2 : 1.2) + glow * 1.6;
          if (anchor || glow > 0.2) {
            const halo = ctx.createRadialGradient(
              p.x,
              p.y,
              0,
              p.x,
              p.y,
              12 + glow * 8,
            );
            halo.addColorStop(0, `rgba(230,213,182,${0.12 + glow * 0.15})`);
            halo.addColorStop(1, "rgba(230,213,182,0)");
            ctx.fillStyle = halo;
            ctx.fillRect(p.x - 22, p.y - 22, 44, 44);
          }
          ctx.fillStyle = `rgba(254,244,227,${(anchor ? 0.6 : 0.35) + glow * 0.35})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
          ctx.fill();
          if (anchor) {
            ctx.strokeStyle = `rgba(214,198,172,${0.2 + glow * 0.2})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x - 5, p.y);
            ctx.lineTo(p.x + 5, p.y);
            ctx.moveTo(p.x, p.y - 5);
            ctx.lineTo(p.x, p.y + 5);
            ctx.stroke();
          }
        });
      });
    };
    const draw = (t: number) => {
      if (document.hidden) return;
      if (t - last > 32) {
        paint(t);
        last = t;
      }
      raf = requestAnimationFrame(draw);
    };
    const visibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduced) raf = requestAnimationFrame(draw);
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && !reduced) {
        active = true;
        pointer.x = e.clientX;
        pointer.y = e.clientY;
      }
    };
    const leave = () => {
      active = false;
    };
    const onResize = () => {
      resize();
      if (reduced) paint(0);
    };
    resize();
    paint(0);
    if (!reduced) raf = requestAnimationFrame(draw);
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [reduced]);
  return <canvas ref={ref} className="neural-background" aria-hidden="true" />;
}
