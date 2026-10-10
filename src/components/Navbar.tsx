import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
const links = [
  { label: "About", to: "/#about" },
  { label: "Skills", to: "/skills" },
  { label: "Projects", to: "/projects" },
  { label: "CV", to: "/cv" },
];
export default function Navbar() {
  const location = useLocation(),
    reduced = useReducedMotion();
  const [hover, setHover] = useState<string | null>(null);
  const active = links.find((l) =>
    l.to.includes("#")
      ? location.pathname === "/" && location.hash === "#about"
      : location.pathname === l.to,
  )?.to;
  return (
    <header className="site-header">
      <nav
        aria-label="Main navigation"
        className="site-nav"
        onMouseLeave={() => setHover(null)}
      >
        <Link to="/" className="nav-brand" aria-label="Jiten Kumar — Home">
          <span className="brand-frame">
            <img src="/favicon.svg" width="44" height="44" alt="" />
          </span>
        </Link>
        <div className="nav-links">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className={active === l.to ? "active" : ""}
              aria-current={
                active === l.to
                  ? l.to.includes("#")
                    ? "location"
                    : "page"
                  : undefined
              }
              onMouseEnter={() => setHover(l.to)}
              onFocus={() => setHover(l.to)}
              onBlur={() => setHover(null)}
            >
              {l.label}
              {(hover ?? active) === l.to && (
                <motion.span
                  className="nav-indicator"
                  layoutId="nav-indicator"
                  transition={{
                    duration: reduced ? 0 : 0.28,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  aria-hidden="true"
                />
              )}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
