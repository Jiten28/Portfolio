import FadeIn from "./FadeIn";

const services = [
  {
    number: "01",
    name: "Machine Learning",
    desc: "Building and training CNN, LSTM, and transfer-learning models for classification, forecasting, and computer vision, with rigorous evaluation and tuning.",
  },
  {
    number: "02",
    name: "Generative AI",
    desc: "Designing LLM-powered assistants and RAG pipelines using Gemini and OpenAI APIs, with persistent memory, voice interaction, and multi-turn context.",
  },
  {
    number: "03",
    name: "Full-Stack Development",
    desc: "Shipping end-to-end web apps with React, Flask, Node.js, and REST APIs -- from authentication and databases to responsive, production-ready UI.",
  },
  {
    number: "04",
    name: "Computer Vision",
    desc: "Developing real-time detection and recognition systems with OpenCV and deep learning, deployed with TensorFlow Lite for edge and mobile use.",
  },
  {
    number: "05",
    name: "Data & Analytics",
    desc: "Turning raw data into decisions with Python, Power BI, and statistical analysis -- automated dashboards, EDA, and feature engineering at scale.",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="skills"
      className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
      style={{ background: "#FFFFFF" }}
    >
      <h2
        className="font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
        style={{ color: "#0C0C0C", fontSize: "clamp(3rem, 12vw, 160px)" }}
      >
        Skills
      </h2>

      <div className="max-w-5xl mx-auto">
        {services.map((s, i) => (
          <FadeIn key={s.number} delay={i * 0.1}>
            <div
              className="flex items-start gap-6 md:gap-10 py-8 sm:py-10 md:py-12"
              style={{ borderTop: i === 0 ? "1px solid rgba(12,12,12,0.15)" : "none", borderBottom: "1px solid rgba(12,12,12,0.15)" }}
            >
              <span
                className="font-black shrink-0"
                style={{ fontSize: "clamp(3rem, 10vw, 140px)", color: "#0C0C0C", lineHeight: 1 }}
              >
                {s.number}
              </span>
              <div className="flex flex-col gap-2 pt-2">
                <h3
                  className="font-medium uppercase"
                  style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)", color: "#0C0C0C" }}
                >
                  {s.name}
                </h3>
                <p
                  className="font-light leading-relaxed max-w-2xl"
                  style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)", color: "#0C0C0C", opacity: 0.6 }}
                >
                  {s.desc}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
