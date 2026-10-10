import { useEffect, useRef, useState, type ReactNode } from "react";
export default function Deferred({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setReady(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "500px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ minHeight: ready ? undefined : 480 }}>
      {ready ? (
        children
      ) : (
        <p className="sr-only">
          GitHub activity loads as you approach this section.
        </p>
      )}
    </div>
  );
}
