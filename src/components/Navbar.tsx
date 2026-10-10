import { useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
const links = [
  { label: "About", to: "/#about" },
  { label: "Skills", to: "/skills" },
  { label: "Projects", to: "/projects" },
  { label: "CV", to: "/cv" },
];
export default function Navbar() {
  const location = useLocation(),
    reduced = useReducedMotion();
  const [preview, setPreview] = useState<string | null>(null);
  const [line, setLine] = useState({ x: 0, width: 0, opacity: 0 });
  const group = useRef<HTMLDivElement>(null);
  const anchors = useRef(new Map<string, HTMLAnchorElement>());
  const active = links.find((l) =>
    l.to.includes("#")
      ? location.pathname === "/" && location.hash === "#about"
      : location.pathname === l.to,
  )?.to;
  const selected = preview ?? active;
  useLayoutEffect(() => {
    let disposed = false;
    // All coordinates are relative to the same fixed-height nav group.
    // A single persistent element slides horizontally; no shared-layout
    // projection can interpolate document scroll offsets into its Y position.
    const measure = () => {
      if (disposed) return;
      const parent = group.current,
        anchor = selected ? anchors.current.get(selected) : undefined;
      if (!parent || !anchor) {
        setLine((prev) => ({ ...prev, opacity: 0 }));
        return;
      }
      const r = anchor.getBoundingClientRect(),
        base = parent.getBoundingClientRect();
      const next = {
        x: r.left - base.left + 3,
        width: Math.max(0, r.width - 6),
        opacity: 1,
      };
      setLine((prev) =>
        prev.x === next.x &&
        prev.width === next.width &&
        prev.opacity === next.opacity
          ? prev
          : next,
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (group.current) observer.observe(group.current);
    window.addEventListener("resize", measure);
    void document.fonts?.ready.then(measure);
    return () => {
      disposed = true;
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [selected, location.pathname, location.hash]);
  return (
    <header className="site-header">
      <nav
        aria-label="Main navigation"
        className="site-nav"
        onMouseLeave={() => setPreview(null)}
      >
        <Link to="/" className="nav-brand" aria-label="Jiten Kumar — Home">
          <span className="brand-frame">
            <img src="/favicon.svg" width="44" height="44" alt="" />
          </span>
        </Link>
        <div ref={group} className="nav-links">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              ref={(el) => {
                if (el) anchors.current.set(l.to, el);
                else anchors.current.delete(l.to);
              }}
              className={active === l.to ? "active" : ""}
              aria-current={
                active === l.to
                  ? l.to.includes("#")
                    ? "location"
                    : "page"
                  : undefined
              }
              onMouseEnter={() => setPreview(l.to)}
              onFocus={() => setPreview(l.to)}
              onBlur={() => setPreview(null)}
              onClick={() => setPreview(null)}
            >
              {l.label}
            </Link>
          ))}
          <span
            className="nav-indicator"
            aria-hidden="true"
            style={{
              width: line.width,
              transform: `translate3d(${line.x}px,0,0)`,
              opacity: line.opacity,
              transition: reduced ? "none" : undefined,
            }}
          />
        </div>
      </nav>
    </header>
  );
}
