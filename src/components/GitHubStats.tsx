import { useEffect, useState } from "react";
import GitHubCalendar from "react-github-calendar";
import FadeIn from "./FadeIn";

const USERNAME = "Jiten28";

interface Stats {
  publicRepos: number;
  totalStars: number;
  totalContributions: number;
}

export default function GitHubStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    let disposed = false;
    const timeout = setTimeout(() => {
      if (!disposed) setError(true);
      controller.abort();
    }, 12000);
    async function load() {
      try {
        try {
          const cached = sessionStorage.getItem("jiten-github-stats-v2");
          if (cached) {
            const entry = JSON.parse(cached);
            if (Date.now() - entry.at < 15 * 60 * 1000) {
              setStats(entry.stats);
              return;
            }
          }
        } catch {
          /* Cache is optional. Continue to the network when storage is unavailable. */
        }
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}`, {
            signal: controller.signal,
          }),
          fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100`, {
            signal: controller.signal,
          }),
        ]);
        if (!userRes.ok || !reposRes.ok) throw new Error("GitHub unavailable");
        const user = await userRes.json();
        let repos = await reposRes.json();
        // Follow pagination only when needed, so the star count does not stop at 100 repositories.
        for (let page = 2; repos.length === (page - 1) * 100; page++) {
          const res = await fetch(
            `https://api.github.com/users/${USERNAME}/repos?per_page=100&page=${page}`,
            { signal: controller.signal },
          );
          if (!res.ok) throw new Error("GitHub pagination unavailable");
          repos = repos.concat(await res.json());
        }
        const next = {
          publicRepos: user.public_repos,
          totalStars: repos.reduce(
            (sum: number, r: { stargazers_count: number }) =>
              sum + r.stargazers_count,
            0,
          ),
          totalContributions: 0,
        };
        if (!controller.signal.aborted) {
          setStats(next);
          try {
            sessionStorage.setItem(
              "jiten-github-stats-v2",
              JSON.stringify({ at: Date.now(), stats: next }),
            );
          } catch {
            /* Storage may be unavailable in private browsing. */
          }
        }
      } catch {
        if (!disposed) setError(true);
      } finally {
        clearTimeout(timeout);
      }
    }
    load();
    return () => {
      disposed = true;
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  const tiles = stats
    ? [
        { value: `${stats.publicRepos}`, label: "Public repositories" },
        { value: `${stats.totalStars}`, label: "Total stars earned" },
      ]
    : [];

  return (
    <section
      style={{ background: "transparent" }}
      className="px-5 sm:px-8 md:px-10 py-16 sm:py-20"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-10">
        <h2 className="sr-only">GitHub activity</h2>
        <FadeIn delay={0}>
          <p
            className="uppercase tracking-[0.3em] text-center"
            style={{ color: "#aa9371", fontSize: "0.875rem" }}
          >
            From GitHub -- github.com/{USERNAME}
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="w-full">
          <div
            className="github-calendar-wrapper overflow-x-auto max-w-full"
            tabIndex={0}
            role="region"
            aria-label="GitHub contribution calendar; scroll horizontally to see more months"
          >
            <GitHubCalendar
              errorMessage="GitHub activity is temporarily unavailable."
              labels={{
                totalCount: "{{count}} contributions in the last 12 months",
              }}
              username={USERNAME}
              blockSize={12}
              blockMargin={4}
              fontSize={14}
              colorScheme="dark"
              theme={{
                dark: ["#1b1c1e", "#494d54", "#82878c", "#aa9371", "#d6c6ac"],
              }}
            />
          </div>
        </FadeIn>

        {error && (
          <p className="text-sm text-center" style={{ color: "#b9c3ca" }}>
            GitHub statistics are temporarily unavailable.{" "}
            <a
              className="underline"
              href={`https://github.com/${USERNAME}`}
              target="_blank"
              rel="noreferrer"
            >
              View my profile
            </a>
            .
          </p>
        )}
        {!error && stats && (
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap justify-center gap-10 sm:gap-16">
              {tiles.map((t) => (
                <div key={t.label} className="text-center">
                  <div
                    className="hero-heading font-black leading-none"
                    style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}
                  >
                    {t.value}
                  </div>
                  <div
                    className="uppercase tracking-wide mt-1"
                    style={{
                      color: "#D7E2EA",
                      opacity: 0.75,
                      fontSize: "0.875rem",
                    }}
                  >
                    {t.label}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
