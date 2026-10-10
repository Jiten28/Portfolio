import { useRef, useState } from "react";
import { Github, ExternalLink, Trophy, Maximize2 } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import ImageLightbox from "./ImageLightbox";
import type { PortfolioProject } from "../data/projects";
export default function ProjectCard({
  project,
  index,
}: {
  project: PortfolioProject;
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1 - (2 - index) * 0.03],
  );
  const images = project.workImages ?? [
    project.previewImage ?? `/projects/${project.slug}.webp`,
  ];
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <article
      ref={ref}
      className={`featured-item ${project.slug === "founderpilot-ai" ? "founder-feature" : ""}`}
      style={{ "--stack-top": `${100 + index * 20}px` } as React.CSSProperties}
      aria-labelledby={`featured-${project.slug}`}
    >
      <motion.div
        style={{ scale: reduced ? 1 : scale }}
        className="featured-card glow-card rounded-[28px] sm:rounded-[40px] border p-5 sm:p-7 md:p-8"
      >
        <div className="featured-card-header">
          <div className="flex items-start gap-4 md:gap-6">
            <span aria-hidden="true" className="featured-number font-black">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <p
                className="text-xs sm:text-sm uppercase tracking-widest mb-2"
                style={{ color: "#b7a17e" }}
              >
                {project.category}
              </p>
              <h3
                id={`featured-${project.slug}`}
                className="font-medium uppercase text-xl sm:text-3xl mb-3"
              >
                {project.name}
              </h3>
              <p
                className="max-w-xl text-base leading-relaxed"
                style={{ color: "#b9c3ca" }}
              >
                {project.featuredSummary}
              </p>
              {project.achievement && (
                <p className="achievement mt-3">
                  <Trophy size={16} aria-hidden="true" />
                  {project.achievement}
                </p>
              )}
            </div>
          </div>
          <div className="featured-actions">
            <div className="flex flex-wrap gap-2">
              <a
                className="outline-button"
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.name} source code`}
              >
                <Github size={16} aria-hidden="true" />
                Code
              </a>
              {project.demoUrl && (
                <a
                  className="outline-button filled"
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.name} live demo`}
                >
                  <ExternalLink size={16} aria-hidden="true" />
                  Demo
                </a>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {project.stack.map((t) => (
                <span key={t} className="tech-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="featured-images">
          {images.map((image, i) => (
            <button
              key={image}
              className={`screenshot-button screenshot-${i}`}
              onClick={() => setSelected(i)}
              aria-label={`Enlarge ${project.name} screenshot ${i + 1}`}
            >
              <img
                src={image}
                alt={`${project.name} ${i === 2 ? "main interface" : i === 0 ? "project interface" : "feature interface"}`}
                width={1200}
                height={800}
                loading="lazy"
                decoding="async"
              />
              <span className="screenshot-zoom" aria-hidden="true">
                <Maximize2 size={15} />
              </span>
            </button>
          ))}
        </div>
        {project.demoNote && (
          <p
            className="text-sm mt-4 leading-relaxed"
            style={{ color: "#aab5be" }}
          >
            {project.demoNote}
          </p>
        )}
      </motion.div>
      {selected !== null && (
        <ImageLightbox
          images={images}
          index={selected}
          title={project.name}
          onIndex={setSelected}
          onClose={() => setSelected(null)}
        />
      )}
    </article>
  );
}
