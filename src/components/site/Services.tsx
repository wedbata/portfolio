import { Code2, Palette, Server, Check } from "lucide-react";
import { services } from "./data";

const icons = [Code2, Palette, Server];

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
            Services
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">What I can build for you</h2>
          <p className="mt-4 text-muted-foreground">
            Three ways to work together — pick one, or let Vibe Code handle the whole journey from
            sketch to live domain.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[i]!;
            return (
              <article
                key={s.title}
                className="reveal glass group relative overflow-hidden rounded-3xl p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-glow"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="absolute inset-x-0 -top-24 h-40 bg-gradient-brand opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-30" />
                <div className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-brand text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="relative mt-5 text-xl font-semibold">{s.title}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
                <ul className="relative mt-5 space-y-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 shrink-0 text-secondary" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
