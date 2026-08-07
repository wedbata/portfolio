import { useEffect, useRef, useState } from "react";
import { Code, Github, Figma, Rocket } from "lucide-react";
import { skills, tools } from "./data";

const toolIcons = [Code, Github, Rocket, Figma];

export function Skills() {
  const [on, setOn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="skills" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Skills</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">The toolkit</h2>
        </div>

        <div ref={ref} className="mt-14 grid gap-x-10 gap-y-6 md:grid-cols-2">
          {skills.map((s, i) => (
            <div key={s.name}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{s.name}</span>
                <span className="text-muted-foreground">{s.level}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-brand transition-[width] duration-1000 ease-out"
                  style={{ width: on ? `${s.level}%` : "0%", transitionDelay: `${i * 70}ms` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="reveal mt-14 flex flex-wrap justify-center gap-4">
          {tools.map((t, i) => {
            const Icon = toolIcons[i]!;
            return (
              <div
                key={t}
                className="glass flex items-center gap-2.5 rounded-2xl px-5 py-3 text-sm font-medium transition-transform hover:-translate-y-1"
              >
                <Icon className="h-4 w-4 text-secondary" />
                {t}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}