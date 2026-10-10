import FadeIn from "./FadeIn";
import AnimatedText from "./AnimatedText";
export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative px-5 sm:px-8 md:px-10 py-20 sm:py-28"
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-8 sm:gap-10 relative z-10">
        <FadeIn>
          <h2
            id="about-title"
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: "clamp(3rem, 10vw, 130px)" }}
          >
            About me
          </h2>
        </FadeIn>
        <FadeIn>
          <div className="about-copy text-center space-y-5">
            <AnimatedText
              text={
                "I'm Jiten Kumar, an AI/ML engineer and full-stack developer based in Hyderabad. I turn ideas into practical products\u2014from explainable computer vision and GenAI applications to the web interfaces that make them useful."
              }
            />
            <AnimatedText
              text={
                "My experience spans research at IIIT Ranchi, data science and analytics, and full-stack development. I work primarily with Python, React, Flask, and FastAPI, with a focus on understandable models and reliable user experiences."
              }
            />
            <AnimatedText
              text={
                "At the national-level Hacklabify hackathon, our FounderPilot AI project placed sixth. I contributed to the frontend and selected AI features, helping turn startup inputs into actionable guidance."
              }
            />
            <AnimatedText
              text={
                "I'm open to AI/ML and full-stack opportunities, freelance projects, and thoughtful collaborations."
              }
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
