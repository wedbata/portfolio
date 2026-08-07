import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { scrollToId } from "./useReveal";

const links = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Portfolio", id: "portfolio" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const current = links
        .map((l) => ({ id: l.id, el: document.getElementById(l.id) }))
        .filter((x) => x.el)
        .reduce((acc, x) => (x.el!.getBoundingClientRect().top <= 120 ? x.id : acc), "home");
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? "glass shadow-lg" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 lg:flex lg:justify-between">
        <button
          onClick={() => go("home")}
          className="min-w-0 truncate text-left font-display text-lg font-bold tracking-tight"
        >
          <span className="text-gradient">&lt; Vibe Code /&gt;</span>
        </button>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className={`relative text-sm font-medium transition-colors hover:text-foreground ${
                  active === l.id ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {l.label}
                {active === l.id && (
                  <span className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-gradient-brand" />
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={() => go("contact")}
            className="hidden rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5 lg:inline-flex"
          >
            Hire Me
          </button>
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-background/70 backdrop-blur-sm transition-opacity lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-dvh w-72 max-w-[85vw] flex-col gap-2 border-l border-border bg-surface p-6 transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="mb-4 grid h-10 w-10 shrink-0 place-items-center self-end rounded-xl border border-border"
        >
          <X className="h-5 w-5" />
        </button>
        {links.map((l) => (
          <button
            key={l.id}
            onClick={() => go(l.id)}
            className="rounded-xl px-3 py-3 text-left text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {l.label}
          </button>
        ))}
        <button
          onClick={() => go("contact")}
          className="mt-4 rounded-full bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground"
        >
          Hire Me
        </button>
      </aside>
    </header>
  );
}