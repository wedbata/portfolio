import { Github, Linkedin, Twitter, MessageCircle } from "lucide-react";
import { scrollToId } from "./useReveal";

const quick = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Portfolio", id: "portfolio" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" },
];

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/WedBata" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/wedbata" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com/WedBata" },
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/201558334908" },
];

export function Footer() {
  return (
    <footer className="border-t border-border py-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-3">
        <div>
          <p className="text-gradient font-display text-lg font-bold">&lt; Vibe Code /&gt;</p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Building Digital Experiences That Connect — design, development and hosting for growing
            businesses.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Quick links</h3>
          <ul className="mt-4 grid grid-cols-2 gap-2">
            {quick.map((q) => (
              <li key={q.id}>
                <button
                  onClick={() => scrollToId(q.id)}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {q.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Follow</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-xl border border-border transition-all hover:-translate-y-1 hover:bg-muted"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <a
            href="mailto:itechwau@gmail.com"
            className="mt-4 block text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            itechwau@gmail.com
          </a>
        </div>
      </div>

      <p className="mt-12 text-center text-xs text-muted-foreground">
        © 2026 Vibe Code Internet Service. Crafted by George.
      </p>
    </footer>
  );
}