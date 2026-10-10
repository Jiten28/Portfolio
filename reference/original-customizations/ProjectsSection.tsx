import ProjectCard, { type ProjectData } from "./ProjectCard";
import FadeIn from "./FadeIn";
import { Link } from "react-router-dom";

const projects: ProjectData[] = [
  {
    number: "01",
    slug: "cindrix-ai",
    category: "Personal",
    name: "Cindrix-AI",
    impact: "Generative AI assistant with persistent memory, RAG, and voice interaction, built on a modular Flask backend.",
    stack: ["Python", "Flask", "Gemini API", "RAG", "Three.js"],
    githubUrl: "https://github.com/Jiten28/Cindrix",
    demoUrl: "https://cindrix-ai.onrender.com/",
    palette: ["#494d54", "#aa9371"],
  },
  {
    number: "02",
    slug: "agrivision-xai",
    category: "Research -- IIIT Ranchi",
    name: "AgriVision-XAI",
    impact: "Explainable plant-disease detection with EfficientNetB0 + CBAM, Grad-CAM, and TFLite deployment.",
    stack: ["Python", "EfficientNetB0", "Grad-CAM", "TensorFlow Lite", "Streamlit"],
    githubUrl: "https://github.com/Jiten28/AgriVision-XAI",
    palette: ["#d6c6ac", "#2a2c30"],
  },
  {
    number: "03",
    slug: "wonderful-crown",
    category: "Personal",
    name: "Wonderful Crown",
    impact: "ML-powered healthcare platform for symptom-based disease prediction with confidence scoring and report exports.",
    stack: ["Python", "Flask", "Scikit-learn", "SQLAlchemy"],
    githubUrl: "https://github.com/Jiten28/Wonderful-Crown",
    demoUrl: "https://wonderful-crown.onrender.com",
    palette: ["#aa9371", "#000000"],
  },
];

export default function ProjectsSection() {
  return (
    <section
      className="relative z-10 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-20"
      style={{ background: "transparent" }}
    >
      <h2
        className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-4"
        style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
      >
        Featured Work
      </h2>
      <p className="text-center mb-16 sm:mb-20 md:mb-24" style={{ color: "#D7E2EA", opacity: 0.6 }}>
        A few highlights -- see the full list on the projects page.
      </p>

      <div className="max-w-6xl mx-auto">
        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - 1 - i) * 0.03;
          return (
            <ProjectCard key={project.number} project={project} index={i} targetScale={targetScale} />
          );
        })}
      </div>

      <FadeIn>
        <div className="flex justify-center mt-8">
          <Link
            to="/projects"
            className="glow-button rounded-full border-2 font-medium uppercase tracking-widest px-8 py-3 text-sm cursor-pointer"
            style={{ borderColor: "#D7E2EA", color: "#D7E2EA" }}
          >
            View all projects
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}
