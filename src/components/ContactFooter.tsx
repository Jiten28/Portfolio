import { Github, Linkedin, Mail, FileDown, ExternalLink } from "lucide-react";
import FadeIn from "./FadeIn";
import ContactButton from "./ContactButton";

export default function ContactFooter() {
  return (
    <footer
      id="contact"
      className="px-5 sm:px-8 md:px-10 py-24 sm:py-28 md:py-36 flex flex-col items-center text-center gap-8"
      style={{ background: "transparent" }}
    >
      <FadeIn delay={0} y={30}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 9vw, 120px)" }}
        >
          Let&apos;s Work Together
        </h2>
      </FadeIn>

      <FadeIn delay={0.1} y={20}>
        <p
          className="max-w-md"
          style={{ color: "#D7E2EA", opacity: 0.75, fontSize: "1.05rem" }}
        >
          Open to internships, freelance ML/full-stack work, and collaborations.
          Reach out or grab the full resume below.
        </p>
      </FadeIn>

      <FadeIn delay={0.2} y={20}>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
          <ContactButton />
          <a
            href="/Jiten_Kumar_CV.pdf"
            download
            className="glow-button rounded-full border-2 font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-xs sm:text-sm inline-flex items-center gap-2 cursor-pointer"
            style={{ borderColor: "#D7E2EA", color: "#D7E2EA" }}
          >
            <FileDown size={16} />
            CV
          </a>
          <a
            href="https://jiten-creative-co.netlify.app/"
            target="_blank"
            rel="noreferrer"
            className="outline-button"
          >
            <ExternalLink size={16} aria-hidden="true" />
            Freelance Website
          </a>
        </div>
      </FadeIn>

      <FadeIn delay={0.3} y={20}>
        <div className="flex items-center gap-4 mt-4">
          <a
            href="https://github.com/Jiten28"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="social-icon cursor-pointer"
          >
            <Github size={18} />
          </a>
          <a
            href="https://linkedin.com/in/jiten-kumar-85a03217a"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="social-icon cursor-pointer"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="mailto:work.jiten282003@gmail.com"
            aria-label="Email"
            className="social-icon cursor-pointer"
          >
            <Mail size={18} />
          </a>
        </div>
      </FadeIn>

      <p
        className="mt-10 text-sm uppercase tracking-widest"
        style={{ color: "#D7E2EA", opacity: 0.7 }}
      >
        &copy; {new Date().getFullYear()} Jiten Kumar -- Hyderabad, India
      </p>
    </footer>
  );
}
