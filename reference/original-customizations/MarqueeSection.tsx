import { useEffect, useRef, useState } from "react";
import MarqueeTile from "./MarqueeTile";

const TECH_STACK = [
  "Python", "Java", "JavaScript", "SQL", "Flask", "FastAPI", "Node.js",
  "React.js", "Tailwind CSS", "TensorFlow", "Keras",
  "Scikit-learn", "OpenCV", "Gemini API", "OpenAI API", "RAG",
  "MongoDB", "MySQL", "Docker", "Git", "Power BI",
];

const ROW1_COUNT = 11;
const ROW2_COUNT = 10;

function tripled(count: number, startIndex: number) {
  const base = Array.from({ length: count }, (_, i) => startIndex + i);
  return [...base, ...base, ...base];
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const value =
        (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(value);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const row1 = tripled(ROW1_COUNT, 0);
  const row2 = tripled(ROW2_COUNT, ROW1_COUNT);

  return (
    <section
      ref={sectionRef}
      style={{ background: "transparent" }}
      className="pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
    >
      <p
        className="text-center uppercase tracking-[0.3em] mb-8"
        style={{ color: "#aa9371", fontSize: "0.8rem" }}
      >
        Tech I Work With
      </p>
      <div
        className="flex gap-3 mb-3"
        style={{
          transform: `translateX(${offset - 200}px)`,
          willChange: "transform",
        }}
      >
        {row1.map((idx, i) => (
          <MarqueeTile key={`r1-${i}`} index={idx} label={TECH_STACK[idx % TECH_STACK.length]} />
        ))}
      </div>
      <div
        className="flex gap-3"
        style={{
          transform: `translateX(${-(offset - 200)}px)`,
          willChange: "transform",
        }}
      >
        {row2.map((idx, i) => (
          <MarqueeTile key={`r2-${i}`} index={idx} label={TECH_STACK[idx % TECH_STACK.length]} />
        ))}
      </div>
    </section>
  );
}
