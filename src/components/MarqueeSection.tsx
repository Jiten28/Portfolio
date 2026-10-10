import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useAnimationFrame,
  useMotionValue,
  useInView,
} from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
const tech = [
  "Python",
  "Java",
  "JavaScript",
  "SQL",
  "Flask",
  "FastAPI",
  "Node.js",
  "React.js",
  "Tailwind CSS",
  "TensorFlow",
  "Keras",
  "Scikit-learn",
  "OpenCV",
  "Gemini API",
  "OpenAI API",
  "RAG",
  "MongoDB",
  "MySQL",
  "Docker",
  "Git",
  "Power BI",
];
const palettes = [
  ["#494d54", "#2a2c30"],
  ["#aa9371", "#494d54"],
  ["#d6c6ac", "#aa9371"],
  ["#2a2c30", "#000000"],
];
function TechRow({
  items,
  row,
  reduced,
  paused,
}: {
  items: string[];
  row: number;
  reduced: boolean | null;
  paused: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null),
    group = useRef<HTMLDivElement>(null),
    cycle = useRef(0),
    travel = useRef(0);
  const x = useMotionValue(0),
    inView = useInView(ref, { margin: "100px" });
  useEffect(() => {
    const el = group.current;
    if (!el) return;
    const measure = () => {
      cycle.current = el.getBoundingClientRect().width + 12;
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  useAnimationFrame((_, delta) => {
    if (reduced || paused || !inView || document.hidden || !cycle.current)
      return;
    travel.current += Math.min(delta, 50) * 0.035;
    const offset = travel.current % cycle.current;
    x.set(row === 0 ? offset - cycle.current : -offset);
  });
  const tiles = (copy: number) => (
    <div ref={copy === 0 ? group : undefined} className="tech-cycle" key={copy}>
      {items.map((t, i) => {
        const [c1, c2] = palettes[(i + (row ? 11 : 0)) % 4];
        return (
          <div
            key={t}
            className="tech-tile"
            style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
          >
            {t}
          </div>
        );
      })}
    </div>
  );
  return (
    <motion.div ref={ref} className="tech-row" style={{ x: reduced ? 0 : x }}>
      {tiles(0)}
      {!reduced && tiles(1)}
    </motion.div>
  );
}
export default function MarqueeSection() {
  const ref = useRef<HTMLElement>(null),
    reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x1 = useTransform(scrollYProgress, [0, 1], [-120, 0]),
    x2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  return (
    <section
      ref={ref}
      aria-labelledby="tech-title"
      className="pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden tech-section"
    >
      <div className="tech-heading">
        <h2
          id="tech-title"
          className="uppercase tracking-[.3em] text-sm"
          style={{ color: "#b7a17e" }}
        >
          Tech I work with
        </h2>
        {!reduced && (
          <button
            type="button"
            className="tech-pause"
            aria-label={
              paused ? "Resume tech animation" : "Pause tech animation"
            }
            aria-pressed={paused}
            onClick={() => setPaused(!paused)}
          >
            {paused ? (
              <Play size={14} aria-hidden="true" />
            ) : (
              <Pause size={14} aria-hidden="true" />
            )}
          </button>
        )}
      </div>
      <ul className="sr-only">
        {tech.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <div aria-hidden="true" className={reduced ? "tech-static" : ""}>
        {[tech.slice(0, 11), tech.slice(11)].map((items, row) => (
          <motion.div
            key={row}
            style={{ x: reduced ? 0 : row === 0 ? x1 : x2 }}
          >
            <TechRow
              items={items}
              row={row}
              reduced={reduced}
              paused={paused}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
