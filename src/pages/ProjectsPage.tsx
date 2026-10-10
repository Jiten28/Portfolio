import { useState } from "react";
import { Github, ExternalLink, Trophy, Search, Maximize2 } from "lucide-react";
import ContactFooter from "../components/ContactFooter";
import ImageLightbox from "../components/ImageLightbox";
import { projects, type PortfolioProject } from "../data/projects";
const filters = ["All", "AI / ML", "GenAI", "Full-Stack / Web", "Utilities"];
function ProjectCard({ project }: { project: PortfolioProject }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const image = `/projects/${project.slug}.webp`;
  const gallery = project.galleryImages ?? [image];
  return (
    <article className="glow-card gallery-card h-full rounded-[28px] border p-5 sm:p-6 flex flex-col gap-4">
      <button
        className="gallery-image-button"
        aria-label={`Enlarge ${project.name} project image`}
        onClick={() => {
          setSelected(0);
          setOpen(true);
        }}
      >
        <img
          src={image}
          alt={`${project.name} project preview`}
          width={720}
          height={405}
          loading="lazy"
          decoding="async"
        />
        <span className="screenshot-zoom" aria-hidden="true">
          <Maximize2 size={15} />
        </span>
      </button>
      {project.imageCaption && (
        <p className="text-xs leading-relaxed" style={{ color: "#aab5be" }}>
          {project.imageCaption}
        </p>
      )}
      <div className="flex-1">
        <p
          className="uppercase tracking-widest text-xs mb-2"
          style={{ color: "#b7a17e" }}
        >
          {project.category}
        </p>
        <h2 className="font-medium uppercase text-xl mb-3">{project.name}</h2>
        {project.achievement && (
          <p className="achievement mb-3">
            <Trophy size={15} aria-hidden="true" />
            {project.achievement}
          </p>
        )}
        <p
          className="text-base leading-relaxed mb-4"
          style={{ color: "#b9c3ca" }}
        >
          {project.desc}
        </p>
        {project.contribution && (
          <p
            className="text-sm mb-4 leading-relaxed"
            style={{ color: "#d6c6ac" }}
          >
            {project.contribution}
          </p>
        )}
        <div className="flex flex-wrap gap-2">
          {project.stack.map((t) => (
            <span key={t} className="tech-tag">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-auto pt-2">
        {project.githubUrl && (
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
        )}
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
      {project.demoNote && (
        <p className="text-sm leading-relaxed" style={{ color: "#aab5be" }}>
          {project.demoNote}
        </p>
      )}
      {open && (
        <ImageLightbox
          images={gallery}
          index={selected}
          title={project.name}
          onIndex={setSelected}
          onClose={() => setOpen(false)}
        />
      )}
    </article>
  );
}
export default function ProjectsPage() {
  const [filter, setFilter] = useState("All"),
    [search, setSearch] = useState("");
  const shown = projects.filter(
    (p) =>
      (filter === "All" || p.group === filter) &&
      `${p.name} ${p.category} ${p.stack.join(" ")}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  return (
    <>
      <div className="px-5 sm:px-8 md:px-10 py-16 sm:py-20">
        <h1
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-10"
          style={{ fontSize: "clamp(2.8rem,10vw,130px)" }}
        >
          Projects
        </h1>
        <div className="max-w-6xl mx-auto mb-8">
          <div
            className="project-filters flex flex-wrap gap-2 justify-center"
            role="group"
            aria-label="Filter projects"
          >
            {filters.map((f) => (
              <button
                key={f}
                aria-pressed={f === filter}
                className={`filter-button ${f === filter ? "selected" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <label className="project-search">
            <Search size={18} aria-hidden="true" />
            <span className="sr-only">
              Search projects by name or technology
            </span>
            <input
              type="search"
              placeholder="Search projects or technologies"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <p
            aria-live="polite"
            className="text-sm mt-5 text-center"
            style={{ color: "#aab5be" }}
          >
            {shown.length} {shown.length === 1 ? "project" : "projects"}
          </p>
        </div>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {shown.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
        {!shown.length && (
          <div className="text-center py-16">
            <p className="mb-5">No projects match that search.</p>
            <button
              className="outline-button"
              onClick={() => {
                setSearch("");
                setFilter("All");
              }}
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
      <ContactFooter />
    </>
  );
}
