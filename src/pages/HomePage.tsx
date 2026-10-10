import { Suspense, lazy } from "react";
import HeroSection from "../components/HeroSection";
import ProjectsSection from "../components/ProjectsSection";
import AboutSection from "../components/AboutSection";
import MarqueeSection from "../components/MarqueeSection";
import ContactFooter from "../components/ContactFooter";
import Deferred from "../components/Deferred";
const GitHubStats = lazy(() => import("../components/GitHubStats"));
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <MarqueeSection />
      <Deferred>
        <Suspense
          fallback={
            <p className="text-center py-12">Loading GitHub activity…</p>
          }
        >
          <GitHubStats />
        </Suspense>
      </Deferred>
      <ContactFooter />
    </>
  );
}
