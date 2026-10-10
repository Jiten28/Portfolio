import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

export interface ProjectData {
  number: string;
  slug: string;
  category: string;
  name: string;
  impact: string;
  stack: string[];
  githubUrl: string;
  demoUrl?: string;
  palette: [string, string];
}

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  targetScale: number;
}

function SlotImage({
  src,
  height,
  colors,
}: {
  src: string;
  height: string;
  colors: [string, string];
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="frame-hover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] w-full"
        style={{
          height,
          background: `linear-gradient(150deg, ${colors[0]}, ${colors[1]})`,
        }}
      />
    );
  }

  return (
    <img
      src={src}
      alt=""
      onError={() => setFailed(true)}
      className="frame-hover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] w-full object-cover"
      style={{ height }}
    />
  );
}

function TechTag({ label }: { label: string }) {
  return (
    <span
      className="rounded-full px-3 py-1 text-xs uppercase tracking-wide select-none"
      style={{ border: "1px solid rgba(215,226,234,0.35)", color: "#D7E2EA", cursor: "default" }}
    >
      {label}
    </span>
  );
}

function LinkButton({
  href,
  icon,
  label,
  filled = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  filled?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="glow-button rounded-full border-2 font-medium uppercase tracking-widest px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm inline-flex items-center gap-2 cursor-pointer"
      style={
        filled
          ? { background: "#D7E2EA", color: "#0C0C0C", borderColor: "#D7E2EA" }
          : { borderColor: "#D7E2EA", color: "#D7E2EA" }
      }
    >
      {icon}
      {label}
    </a>
  );
}

export default function ProjectCard({ project, index, targetScale }: ProjectCardProps) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-[85vh] flex items-center justify-center sticky top-24 md:top-32"
    >
      <motion.div
        style={{ scale, top: `${index * 28}px` }}
        className="relative w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] p-4 sm:p-6 md:p-8"
      >
        <div
          className="glow-card rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 p-4 sm:p-6 md:p-8"
          style={{ borderColor: "#D7E2EA", background: "#0C0C0C" }}
        >
          {/* Top row */}
          <div className="flex items-start justify-between flex-wrap gap-4 mb-5">
            <div className="flex items-start gap-4 md:gap-6">
              <span
                className="font-black"
                style={{ fontSize: "clamp(3rem, 10vw, 140px)", color: "#D7E2EA", lineHeight: 1 }}
              >
                {project.number}
              </span>
              <div className="pt-1 md:pt-3">
                <div
                  className="uppercase tracking-widest text-xs sm:text-sm mb-1"
                  style={{ color: "#D7E2EA", opacity: 0.6 }}
                >
                  {project.category}
                </div>
                <div
                  className="font-medium uppercase"
                  style={{ color: "#D7E2EA", fontSize: "clamp(1.2rem, 3vw, 2.2rem)" }}
                >
                  {project.name}
                </div>
                <p
                  className="mt-2 max-w-md"
                  style={{ color: "#D7E2EA", opacity: 0.7, fontSize: "0.9rem" }}
                >
                  {project.impact}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-3">
              <div className="flex gap-2">
                <LinkButton href={project.githubUrl} icon={<Github size={16} />} label="Code" />
                {project.demoUrl && (
                  <LinkButton
                    href={project.demoUrl}
                    icon={<ExternalLink size={16} />}
                    label="Demo"
                    filled
                  />
                )}
              </div>
              <div className="flex flex-wrap gap-2 justify-end max-w-xs">
                {project.stack.map((t) => (
                  <TechTag key={t} label={t} />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom row: image grid */}
          <div className="flex gap-3 sm:gap-4">
            <div className="flex flex-col gap-3 sm:gap-4" style={{ width: "40%" }}>
              <SlotImage
                src={`/work/${project.slug}-1.png`}
                height="clamp(130px, 16vw, 230px)"
                colors={project.palette}
              />
              <SlotImage
                src={`/work/${project.slug}-2.png`}
                height="clamp(160px, 22vw, 340px)"
                colors={[project.palette[1], project.palette[0]]}
              />
            </div>
            <div style={{ width: "60%" }}>
              <SlotImage
                src={`/work/${project.slug}-3.png`}
                height="clamp(300px, 39vw, 590px)"
                colors={[project.palette[0], "#2a2c30"]}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
