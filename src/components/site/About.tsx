import { useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import george from "@/assets/george.jpg.asset.json";

const stats = [
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 25, suffix: "+", label: "Projects Delivered" },
  { value: 15, suffix: "+", label: "Happy Clients" },
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min((t - start) / 1400, 1);
          setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="text-gradient font-display text-4xl font-bold">
      {n}
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="reveal relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-3 rounded-[2rem] bg-gradient-brand opacity-40 blur-2xl" />
          <img
            src={george.url}
            alt="Portrait of George, front-end developer at Vibe Code Internet Service"
            loading="lazy"
            className="relative aspect-4/5 w-full rounded-[1.75rem] border border-border object-cover object-top"
          />
        </div>

        <div className="reveal">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
            About me
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Front-end developer, founder of Vibe Code
          </h2>
          <div className="mt-5 space-y-4 leading-relaxed text-muted-foreground">
            <p>
              I'm George, a front-end developer based in Cairo working with clients across Egypt and
              South Sudan. I fell into this work by rebuilding a friend's shop page over a weekend —
              and I've been obsessed with the gap between a good idea and a fast, usable interface
              ever since.
            </p>
            <p>
              My day-to-day is React, Next.js and Tailwind CSS, with a stubborn focus on
              performance: small bundles, real mobile testing, and layouts that hold up on a 320px
              screen and a 4K monitor alike.
            </p>
            <p>
              I founded Vibe Code Internet Service to give small businesses one place for the whole
              stack of going online — design, build, hosting, domains and the maintenance that keeps
              it all running after launch.
            </p>
          </div>

          <div className="mt-9 grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="glass rounded-2xl p-4 text-center">
                <CountUp value={s.value} suffix={s.suffix} />
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</p>
              </div>
            ))}
          </div>

          <a
            href="/george-cv.txt"
            download
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
          >
            <Download className="h-4 w-4" />
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
}
