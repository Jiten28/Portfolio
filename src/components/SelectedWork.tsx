import { useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import FadeIn from "./FadeIn";

interface SelectedProject {
  name: string;
  slug: string;
  blurb: string;
  githubUrl: string;
  demoUrl: string;
  palette: [string, string];
}

const selectedWork: SelectedProject[] = [
  {
    name: "Cindrix-AI",
    slug: "cindrix-ai",
    blurb: "Generative AI assistant with persistent memory, RAG, and a Three.js particle-sphere UI.",
    githubUrl: "https://github.com/Jiten28/Cindrix",
    demoUrl: "https://cindrix-ai.onrender.com/",
    palette: ["#494d54", "#aa9371"],
  },
  {
    name: "Wonderful Crown",
    slug: "wonderful-crown",
    blurb: "Full-stack AI healthcare platform for symptom-based disease prediction and reporting.",
    githubUrl: "https://github.com/Jiten28/Wonderful-Crown",
    demoUrl: "https://wonderful-crown.onrender.com",
    palette: ["#d6c6ac", "#2a2c30"],
  },
  {
    name: "ToDo List App",
    slug: "todo-list-application",
    blurb: "React + Vite task manager -- 90% user satisfaction, sub-1-second load time.",
    githubUrl: "https://github.com/Jiten28/ToDo-List",
    demoUrl: "https://to-do-list-six-ecru-67.vercel.app",
    palette: ["#aa9371", "#000000"],
  },
];

function WorkImageSlot({ src, palette }: { src: string; palette: [string, string] }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="frame-hover w-full h-20 sm:h-24 rounded-lg"
        style={{ background: `linear-gradient(150deg, ${palette[0]}, ${palette[1]})`, opacity: 0.5 }}
      />
    );
  }

  return (
    <img
      src={src}
      alt=""
      onError={() => setFailed(true)}
      className="frame-hover w-full h-20 sm:h-24 object-cover rounded-lg"
    />
  );
}

function ImageStrip({ slug, palette }: { slug: string; palette: [string, string] }) {
  return (
    <div className="grid grid-cols-3 gap-1.5">
      {[1, 2, 3].map((n) => (
        <WorkImageSlot key={n} src={`/work/${slug}-${n}.png`} palette={palette} />
      ))}
    </div>
  );
}

export default function SelectedWork() {
  return (
    <div className="max-w-4xl mx-auto mt-20 sm:mt-28 w-full">
      <FadeIn>
        <p className="uppercase tracking-[0.3em] text-center mb-10" style={{ color: "#aa9371", fontSize: "0.8rem" }}>
          Selected Work
        </p>
      </FadeIn>
      <div className="grid sm:grid-cols-3 gap-5">
        {selectedWork.map((p, i) => (
          <FadeIn key={p.name} delay={i * 0.1}>
            <div
              className="glow-card rounded-[18px] border p-4 flex flex-col gap-3 h-full"
              style={{ borderColor: "rgba(215,226,234,0.18)", background: "rgba(255,255,255,0.02)" }}
            >
              <ImageStrip slug={p.slug} palette={p.palette} />
              <div className="flex-1">
                <h3 className="font-medium uppercase text-sm mb-1" style={{ color: "#D7E2EA" }}>
                  {p.name}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "#D7E2EA", opacity: 0.65 }}>
                  {p.blurb}
                </p>
              </div>
              <div className="flex gap-2">
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="glow-button rounded-full border font-medium uppercase tracking-widest px-3 py-1.5 text-[0.65rem] inline-flex items-center gap-1.5 cursor-pointer"
                  style={{ borderColor: "rgba(215,226,234,0.4)", color: "#D7E2EA" }}
                >
                  <Github size={12} />
                  Code
                </a>
                <a
                  href={p.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="glow-button rounded-full font-medium uppercase tracking-widest px-3 py-1.5 text-[0.65rem] inline-flex items-center gap-1.5 cursor-pointer"
                  style={{ background: "#D7E2EA", color: "#0C0C0C" }}
                >
                  <ExternalLink size={12} />
                  Live
                </a>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
