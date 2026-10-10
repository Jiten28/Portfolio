import { Link } from "react-router-dom";
import FadeIn from "./FadeIn";
import ContactButton from "./ContactButton";
import SpotlightReveal from "./SpotlightReveal";
export default function HeroSection() {
  return (
    <section
      className="hero-section flex flex-col relative"
      aria-labelledby="hero-title"
    >
      <SpotlightReveal>
        <div className="hero-copy flex-1 flex flex-col justify-center items-center relative z-10 px-5">
          <FadeIn y={24}>
            <h1
              id="hero-title"
              className="hero-heading hero-name font-black uppercase leading-none tracking-tight text-center"
            >
              Hi, I'm Jiten
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="hero-role text-center">
              AI/ML Engineer <span aria-hidden="true">&</span>
              <span className="sr-only">and</span> Full-Stack Developer
            </p>
            <p className="hero-intro text-center">
              Building explainable ML, GenAI applications, and practical web
              products.
            </p>
          </FadeIn>
        </div>
        <div className="hero-bottom relative z-10 px-6 md:px-10 pb-8">
          <Link className="hero-work-link" to="/#featured">
            Explore selected work <span aria-hidden="true">↘</span>
          </Link>
          <span className="spotlight-hint" aria-hidden="true">
            Move your cursor. Discover what I build.
          </span>
          <ContactButton />
        </div>
      </SpotlightReveal>
    </section>
  );
}
