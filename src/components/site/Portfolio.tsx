import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "./data";

const filters = ["All", "Web App", "Landing Page", "E-Commerce"] as const;

export function Portfolio() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const shown = projects.filter((p) => filter === "All" || p.category === filter);

  return (
    <section id="portfolio" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
            Portfolio
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Selected work</h2>
          <p className="mt-4 text-muted-foreground">
            Real products shipped for real clients — delivery platforms, school systems and business
            sites.
          </p>
        </div>

        <div className="reveal mt-10 flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                filter === f
                  ? "bg-gradient-brand text-primary-foreground shadow-glow"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <article
              key={p.title}
              className="glass group flex flex-col overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-glow"
            >
              <div className="relative overflow-hidden">
                <img
                  src={p.image}
                  alt={`${p.title} project preview`}
                  loading="lazy"
                  width={1024}
                  height={640}
                  className="aspect-16/10 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="glass absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-medium">
                  {p.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-muted px-2.5 py-1 text-[11px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex gap-2">
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-gradient-brand px-4 py-2 text-xs font-semibold text-primary-foreground"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                  </a>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-semibold transition-colors hover:bg-muted"
                  >
                    <Github className="h-3.5 w-3.5" /> GitHub
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
