import FadeIn from "./FadeIn";

const stats = [
  { value: "1M+", label: "Records analyzed in production analytics" },
  { value: "90%+", label: "Validation accuracy on deployed ML models" },
  { value: "5", label: "Internships across AI/ML and full-stack roles" },
  { value: "150+", label: "DSA problems solved on LeetCode" },
];

export default function StatsStrip() {
  return (
    <section style={{ background: "#000000" }} className="px-5 sm:px-8 md:px-10 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
        {stats.map((s, i) => (
          <FadeIn key={s.value} delay={i * 0.08}>
            <div className="text-center md:text-left" style={{ borderTop: "1px solid rgba(215,226,234,0.15)", paddingTop: "1.25rem" }}>
              <div
                className="hero-heading font-black leading-none"
                style={{ fontSize: "clamp(2.2rem, 5vw, 3.4rem)" }}
              >
                {s.value}
              </div>
              <div
                className="uppercase tracking-wide mt-2"
                style={{ color: "#D7E2EA", opacity: 0.65, fontSize: "0.8rem" }}
              >
                {s.label}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
