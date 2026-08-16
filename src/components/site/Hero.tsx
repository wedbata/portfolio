import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { scrollToId } from "./useReveal";

const FULL = "Building Digital Experiences That Connect";

export function Hero() {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setTyped(FULL.slice(0, i));
      if (i >= FULL.length) clearInterval(t);
    }, 45);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" className="relative overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-32">
      {/* animated gradient mesh */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-float-slow absolute -left-24 top-10 h-80 w-80 rounded-full bg-primary/30 blur-[110px]" />
        <div
          className="animate-float-slow absolute right-0 top-40 h-96 w-96 rounded-full bg-secondary/25 blur-[120px]"
          style={{ animationDelay: "3s" }}
        />
        <div
          className="animate-float-slow absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-accent/25 blur-[110px]"
          style={{ animationDelay: "6s" }}
        />
      </div>

      <div className="mx-auto max-w-4xl px-5 text-center">
        <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-secondary" />
          Available for freelance projects
        </span>

        <h1 className="mt-7 text-4xl font-bold leading-[1.1] sm:text-6xl lg:text-7xl">
          <span className="text-gradient">{typed}</span>
          <span className="animate-caret ml-1 inline-block h-[0.9em] w-[3px] translate-y-[0.1em] bg-secondary align-middle" />
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Hi, I'm George — Front-End Developer at Vibe Code Internet Service. I craft fast,
          responsive, and stunning websites.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => scrollToId("portfolio")}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
          >
            View My Work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => scrollToId("contact")}
            className="glass rounded-full px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-muted"
          >
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
}
