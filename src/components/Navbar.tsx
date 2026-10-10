import { Link, useLocation } from "react-router-dom";
const links = [
  { label: "About", to: "/#about" },
  { label: "Skills", to: "/skills" },
  { label: "Projects", to: "/projects" },
  { label: "CV", to: "/cv" },
];
export default function Navbar() {
  const location = useLocation();
  const active = links.find((l) =>
    l.to.includes("#")
      ? location.pathname === "/" && location.hash === "#about"
      : location.pathname === l.to,
  )?.to;
  return (
    <header className="site-header">
      <nav aria-label="Main navigation" className="site-nav">
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
            >
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
