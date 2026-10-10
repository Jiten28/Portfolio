import { Suspense, lazy } from "react";
import { MotionConfig } from "framer-motion";
import { Routes, Route, Navigate } from "react-router-dom";
import NeuralBackground from "./components/NeuralBackground";
import Navbar from "./components/Navbar";
import RouteEffects from "./components/RouteEffects";
import HomePage from "./pages/HomePage";
const SkillsPage = lazy(() => import("./pages/SkillsPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const CVPage = lazy(() => import("./pages/CVPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="portfolio-app">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <NeuralBackground />
        <RouteEffects />
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          <Suspense
            fallback={
              <div className="route-loading" role="status">
                Loading page…
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/cv" element={<CVPage />} />
              <Route
                path="/about"
                element={<Navigate to="/#about" replace />}
              />
              <Route
                path="/project"
                element={<Navigate to="/projects" replace />}
              />
              <Route path="/resume" element={<Navigate to="/cv" replace />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </MotionConfig>
  );
}
