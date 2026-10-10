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
    let cancelled = false;

    async function load() {
      try {
        const [userRes, reposRes, contribRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}`),
          fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100`),
          fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`),
        ]);

        if (!userRes.ok) throw new Error("user fetch failed");
        const user = await userRes.json();
        const repos = reposRes.ok ? await reposRes.json() : [];
        const totalStars = Array.isArray(repos)
          ? repos.reduce((sum: number, r: { stargazers_count?: number }) => sum + (r.stargazers_count || 0), 0)
          : 0;

        let totalContributions = 0;
        if (contribRes.ok) {
          const contribData = await contribRes.json();
          totalContributions = contribData?.total?.lastYear ?? 0;
        }

        if (!cancelled) {
          setStats({
            publicRepos: user.public_repos ?? 0,
            totalStars,
            totalContributions,
          });
        }
      } catch {
        if (!cancelled) setError(true);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const tiles = stats
    ? [
        { value: `${stats.totalContributions}`, label: "Contributions this year" },
        { value: `${stats.publicRepos}`, label: "Public repositories" },
        { value: `${stats.totalStars}`, label: "Total stars earned" },
      ]
    : [];

  return (
    <section style={{ background: "transparent" }} className="px-5 sm:px-8 md:px-10 py-16 sm:py-20">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-10">
        <FadeIn delay={0}>
          <p
            className="uppercase tracking-[0.3em] text-center"
            style={{ color: "#aa9371", fontSize: "0.8rem" }}
          >
            From GitHub -- github.com/{USERNAME}
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="overflow-x-auto max-w-full">
            <GitHubCalendar
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
                    style={{ color: "#D7E2EA", opacity: 0.6, fontSize: "0.75rem" }}
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
