import { useId, useState } from "react";
import {
  Code2,
  Server,
  LayoutGrid,
  Brain,
  Sparkles,
  Eye,
  Package,
  BarChart3,
  Database,
  Cloud,
  ChevronDown,
} from "lucide-react";
import FadeIn from "../components/FadeIn";
import ContactFooter from "../components/ContactFooter";

const skillCategories = [
  {
    label: "Languages",
    icon: Code2,
    items: ["Python", "Java", "JavaScript", "SQL"],
  },
  {
    label: "Backend",
    icon: Server,
    items: [
      "Flask",
      "FastAPI",
      "Node.js",
      "Express.js",
      "REST APIs",
      "Authentication",
    ],
  },
  {
    label: "Frontend",
    icon: LayoutGrid,
    items: ["React.js", "Tailwind CSS", "HTML", "CSS", "Vite"],
  },
  {
    label: "ML & Data Science",
    icon: Brain,
    items: [
      "CNN",
      "LSTM",
      "Transfer Learning",
      "NLP",
      "Time-Series Forecasting",
      "Model Evaluation",
    ],
  },
  {
    label: "Generative AI",
    icon: Sparkles,
    items: [
      "Gemini API",
      "OpenAI API",
      "RAG",
      "Prompt Engineering",
      "LLM Applications",
    ],
  },
  {
    label: "Computer Vision",
    icon: Eye,
    items: ["OpenCV", "Image Classification", "TensorFlow Lite"],
  },
  {
    label: "Libraries",
    icon: Package,
    items: [
      "TensorFlow",
      "Keras",
      "Scikit-learn",
      "Streamlit",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
    ],
  },
  {
    label: "Data & Visualization",
    icon: BarChart3,
    items: [
      "EDA",
      "Feature Engineering",
      "Statistical Analysis",
      "A/B Testing",
      "Power BI",
      "Excel",
    ],
  },
  {
    label: "Databases & DevOps",
    icon: Database,
    items: [
      "MySQL",
      "MongoDB",
      "SQLite",
      "Firebase",
      "Docker",
      "CI/CD",
      "MLflow",
      "DVC",
    ],
  },
  {
    label: "Tools & Cloud",
    icon: Cloud,
    items: ["Git", "GitHub", "Google Cloud", "VS Code", "Jupyter", "Postman"],
  },
];

const experience = [
  {
    role: "Data Science & Analytics Intern",
    org: "Amdox Technologies -- Hyderabad, India",
    dates: "April 2026 -- August 2026",
    points: [
      "Built NeuralRetail, a retail analytics platform in Python and Power BI analyzing 1M+ transaction records; automated dashboards for sales trends, customer segmentation, and inventory KPIs.",
      "Built MediVerse AI, an ML-powered healthcare recommendation platform, and developed an AI chatbot (Gemini API, Flask, REST APIs) for symptom intake and conversational triage support.",
    ],
  },
  {
    role: "AI/ML Research Intern",
    org: "IIIT Ranchi -- Hybrid",
    dates: "May 2026 -- August 2026",
    points: [
      "Developing AgriVision-XAI, a next-generation plant disease detection system using deep learning, transfer learning, and computer vision.",
      "Enhancing model accuracy, generalization, and deployment readiness through architecture optimization and research-driven evaluation.",
    ],
  },
  {
    role: "AI/ML Intern",
    org: "CodexIntern -- Hyderabad, India",
    dates: "April 2025 -- October 2025",
    points: [
      "Built the initial version of Nimbus AI, a conversational assistant using the Gemini API with persistent memory, voice interaction, and automated task workflows.",
      "Designed a modular Flask backend integrating multiple third-party APIs (weather, web search, crypto) for context-aware, multi-turn conversations.",
    ],
  },
  {
    role: "Full Stack Developer Intern",
    org: "EliteTech -- Remote",
    dates: "December 2024 -- January 2025",
    points: [
      "Developed responsive full-stack web applications using React.js, Express.js, MongoDB, and REST APIs.",
      "Implemented authentication, CRUD operations, and API integration while collaborating on testing and deployment.",
    ],
  },
  {
    role: "Machine Learning Engineer (Freelance)",
    org: "College-Commissioned Competition Project -- Hyderabad, India",
    dates: "May 2024 -- December 2024",
    points: [
      "Built an end-to-end CNN-based crop disease classification system on 70K+ labelled images, achieving 90%+ validation accuracy.",
      "Owned the full ML pipeline using MLflow and DVC, with a CI/CD pipeline automating deployment to a client-ready inference service.",
    ],
  },
];

function SkillCard({
  category,
  isOpen,
  onToggle,
}: {
  category: (typeof skillCategories)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = category.icon;
  const id = useId();
  return (
    <div
      className="glow-card rounded-[20px] border transition-colors duration-300 overflow-hidden"
      style={{
        borderColor: isOpen
          ? "rgba(214,198,172,0.6)"
          : "rgba(215,226,234,0.18)",
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))",
      }}
    >
      <button
        type="button"
        id={`${id}-trigger`}
        aria-expanded={isOpen}
        aria-controls={`${id}-panel`}
        onClick={onToggle}
        className="flex w-full items-center justify-between p-5 text-left min-h-[64px]"
      >
        <div className="flex items-center gap-3">
          <Icon size={20} color="#aa9371" />
          <span
            className="uppercase tracking-wide font-medium text-sm"
            style={{ color: "#D7E2EA" }}
          >
            {category.label}
          </span>
        </div>
        <ChevronDown
          size={18}
          color="#D7E2EA"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
            opacity: 0.6,
          }}
        />
      </button>
      <div
        id={`${id}-panel`}
        aria-labelledby={`${id}-trigger`}
        hidden={!isOpen}
      >
        <div className="flex flex-wrap gap-2 px-5 pb-5">
          {category.items.map((item) => (
            <span
              key={item}
              className="rounded-full px-3 py-1 text-xs select-none"
              style={{
                border: "1px solid rgba(215,226,234,0.3)",
                color: "#D7E2EA",
                cursor: "default",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SkillsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div style={{ background: "transparent" }}>
      <div className="px-5 sm:px-8 md:px-10 py-16 sm:py-20 md:py-24">
        <FadeIn>
          <h1
            className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-4"
            style={{ fontSize: "clamp(2.8rem, 10vw, 130px)" }}
          >
            Skills
          </h1>
        </FadeIn>
        <FadeIn delay={0.05}>
          <p
            className="text-center mb-14 sm:mb-16"
            style={{ color: "#D7E2EA", opacity: 0.75 }}
          >
            Tap a category to see what's inside.
          </p>
        </FadeIn>

        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-4 mb-24 sm:mb-32">
          {skillCategories.map((cat, i) => (
            <FadeIn key={cat.label} delay={(i % 6) * 0.05}>
              <SkillCard
                category={cat}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-14 sm:mb-16"
            style={{ fontSize: "clamp(2rem, 7vw, 90px)" }}
          >
            Experience
          </h2>
        </FadeIn>

        <div className="max-w-3xl mx-auto flex flex-col relative">
          <div
            className="absolute left-[7px] top-2 bottom-2 w-px"
            style={{ background: "rgba(215,226,234,0.15)" }}
          />
          {experience.map((e, i) => (
            <FadeIn key={e.role} delay={i * 0.08}>
              <div className="py-6 pl-8 relative">
                <div
                  className="absolute left-0 top-8 w-3.5 h-3.5 rounded-full"
                  style={{ background: "#0C0C0C", border: "2px solid #aa9371" }}
                />
                <div className="flex flex-wrap justify-between items-baseline gap-2 mb-1">
                  <h3
                    className="font-medium uppercase"
                    style={{ color: "#D7E2EA", fontSize: "1.1rem" }}
                  >
                    {e.role}
                  </h3>
                  <span
                    className="text-xs uppercase tracking-wide"
                    style={{ color: "#aa9371" }}
                  >
                    {e.dates}
                  </span>
                </div>
                <p
                  className="text-sm mb-3"
                  style={{ color: "#D7E2EA", opacity: 0.6 }}
                >
                  {e.org}
                </p>
                <ul className="space-y-1.5">
                  {e.points.map((p) => (
                    <li
                      key={p}
                      className="text-sm leading-relaxed"
                      style={{ color: "#D7E2EA", opacity: 0.75 }}
                    >
                      -- {p}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      <ContactFooter />
    </div>
  );
}
