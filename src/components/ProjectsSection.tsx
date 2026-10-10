import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import { featuredProjects } from "../data/projects";
export default function ProjectsSection() {
  return (
    <section
      id="featured"
      className="relative z-10 px-5 sm:px-8 md:px-10 pt-16 sm:pt-24 pb-20"
      aria-labelledby="featured-title"
    >
      <h2
        id="featured-title"
        className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-5"
        style={{ fontSize: "clamp(3rem,10vw,130px)" }}
      >
        Featured Work
      </h2>
      <p
        className="text-center mb-8 sm:mb-14 text-base"
        style={{ color: "#aab5be" }}
      >
        Research, GenAI, and a nationally ranked hackathon project.
      </p>
      <div className="max-w-6xl mx-auto featured-stack">
        {featuredProjects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
      <div className="flex justify-center relative mt-16">
        <Link to="/projects" className="outline-button px-8">
          View all projects
        </Link>
      </div>
    </section>
  );
}
