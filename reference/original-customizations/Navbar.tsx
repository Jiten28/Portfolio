import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import FadeIn from "./FadeIn";

const navLinks = [
  { label: "About", to: "/#about" },
  { label: "Skills", to: "/skills" },
  { label: "Projects", to: "/projects" },
  { label: "CV", to: "/cv" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [line, setLine] = useState({ left: 0, width: 0, opacity: 0 });

  const moveLine = (i: number) => {
    const el = linkRefs.current[i];
    const nav = navRef.current;
    if (!el || !nav) return;
    const elRect = el.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    setLine({ left: elRect.left - navRect.left, width: elRect.width, opacity: 1 });
  };

  return (
    <FadeIn delay={0} y={-20}>
      <nav
        ref={navRef}
        onMouseLeave={() => setLine((l) => ({ ...l, opacity: 0 }))}
        className="flex justify-between px-6 md:px-10 py-5 md:py-6 relative z-30"
        style={{
          background: "rgba(20,21,23,0.5)",
          backdropFilter: "blur(14px) saturate(140%)",
          WebkitBackdropFilter: "blur(14px) saturate(140%)",
          borderBottom: "1px solid rgba(215,226,234,0.1)",
        }}
      >
        {navLinks.map((link, i) => (
          <Link
            key={link.label}
            ref={(el) => {
              linkRefs.current[i] = el;
            }}
            to={link.to}
            onMouseEnter={() => moveLine(i)}
            className="uppercase tracking-wider font-medium transition-opacity duration-200 hover:opacity-70 text-sm md:text-lg lg:text-[1.4rem] cursor-pointer"
            style={{ color: "#D7E2EA" }}
          >
            {link.label}
          </Link>
        ))}
        <span
          style={{
            position: "absolute",
            bottom: 0,
            left: line.left,
            width: line.width,
            height: 2,
            background: "linear-gradient(90deg, #aa9371, #d6c6ac)",
            opacity: line.opacity,
            transition: "left 0.35s cubic-bezier(0.65,0,0.35,1), width 0.35s cubic-bezier(0.65,0,0.35,1), opacity 0.25s ease",
            pointerEvents: "none",
          }}
        />
      </nav>
    </FadeIn>
  );
}
