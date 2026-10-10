import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const details: Record<string, [string, string]> = {
  "/": [
    "AI/ML Engineer & Full-Stack Developer",
    "Jiten Kumar’s portfolio: explainable AI, GenAI applications, and full-stack products. Explore selected work, experience, and contact details.",
  ],
  "/projects": [
    "Projects",
    "Explore Jiten Kumar’s AI/ML, GenAI, and full-stack projects, including AgriVision-XAI, Cindrix-AI, and FounderPilot AI.",
  ],
  "/skills": [
    "Skills & Experience",
    "Explore Jiten Kumar’s technical skills and research, data science, and full-stack development experience.",
  ],
  "/cv": [
    "CV",
    "View Jiten Kumar’s CV, or open and download the PDF.",
  ],
};
export default function RouteEffects() {
  const location = useLocation();
  useEffect(() => {
    const info = details[location.pathname] ?? [
      "Page not found",
      "The requested portfolio page could not be found.",
    ];
    document.title = `Jiten Kumar | ${info[0]}`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", info[1]);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", document.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", info[1]);
    const url = `https://jitenkumarportfolio.netlify.app${location.pathname === "/" ? "/" : location.pathname}`;
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", url);
    document
      .querySelector('meta[property="og:url"]')
      ?.setAttribute("content", url);
    // Reset pathname navigation before jumping to a hash after lazy route content appears.
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    let observer: MutationObserver | undefined;
    let timer: number | undefined;
    let raf = requestAnimationFrame(() => {
      const jump = () => {
        if (!location.hash) return true;
        let id: string;
        try {
          id = decodeURIComponent(location.hash.slice(1));
        } catch {
          return true;
        }
        const target = document.getElementById(id);
        if (!target) return false;
        target.scrollIntoView({ behavior: "auto", block: "start" });
        return true;
      };
      if (!jump()) {
        observer = new MutationObserver(() => {
          if (jump()) observer?.disconnect();
        });
        observer.observe(document.getElementById("main-content")!, {
          childList: true,
          subtree: true,
        });
        timer = window.setTimeout(() => observer?.disconnect(), 5000);
      }
    });
    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
      clearTimeout(timer);
    };
  }, [location.pathname, location.hash]);
  return null;
}
