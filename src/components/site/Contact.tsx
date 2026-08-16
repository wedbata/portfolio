import { useState, type FormEvent } from "react";
import { z } from "zod";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Github,
  Linkedin,
  Twitter,
  MessageCircle,
} from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100, "Name is too long"),
  email: z.string().trim().email("Enter a valid email address").max(255),
  subject: z.string().trim().min(3, "Add a short subject").max(150),
  message: z.string().trim().min(10, "Tell me a bit more (10+ characters)").max(1000),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const fields = [
  { name: "name", label: "Name", placeholder: "Achol Deng", type: "text" },
  { name: "email", label: "Email", placeholder: "you@company.com", type: "email" },
  { name: "subject", label: "Subject", placeholder: "New website for my shop", type: "text" },
] as const;

const socials = [
  { icon: Github, label: "GitHub @WedBata", href: "https://github.com/WedBata" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/wedbata" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com/WedBata" },
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/201558334908" },
];

export function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const next: Errors = {};
      parsed.error.issues.forEach((i) => {
        const key = i.path[0] as keyof Errors;
        if (!next[key]) next[key] = i.message;
      });
      setErrors(next);
      setSent(false);
      return;
    }
    setErrors({});
    setSent(true);
    form.reset();
  };

  return (
    <section id="contact" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Contact</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Let's Build Something Amazing Together
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tell me about your project and I'll reply within one business day.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <form onSubmit={onSubmit} noValidate className="reveal glass rounded-3xl p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              {fields.map((f) => (
                <div key={f.name} className={f.name === "subject" ? "sm:col-span-2" : ""}>
                  <label htmlFor={f.name} className="mb-2 block text-sm font-medium">
                    {f.label}
                  </label>
                  <input
                    id={f.name}
                    name={f.name}
                    type={f.type}
                    placeholder={f.placeholder}
                    maxLength={255}
                    className="w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
                  />
                  {errors[f.name] && (
                    <p className="mt-1.5 text-xs text-destructive">{errors[f.name]}</p>
                  )}
                </div>
              ))}
              <div className="sm:col-span-2">
                <label htmlFor="message" className="mb-2 block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  maxLength={1000}
                  placeholder="What are we building?"
                  className="w-full resize-y rounded-xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-destructive">{errors.message}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
            >
              <Send className="h-4 w-4" /> Send Message
            </button>

            {sent && (
              <p className="mt-4 flex items-center gap-2 rounded-xl border border-secondary/40 bg-secondary/10 px-4 py-3 text-sm text-secondary">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                Thanks! Your message is on its way — I'll get back to you shortly.
              </p>
            )}
          </form>

          <div className="reveal space-y-4">
            <div className="glass space-y-4 rounded-3xl p-6">
              <a href="mailto:itechwau@gmail.com" className="flex items-center gap-3 text-sm">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-brand text-primary-foreground">
                  <Mail className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-muted-foreground">Email</span>
                  <span className="block truncate font-medium">itechwau@gmail.com</span>
                </span>
              </a>
              <a href="tel:+201558334908" className="flex items-center gap-3 text-sm">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-brand text-primary-foreground">
                  <Phone className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-muted-foreground">Phone</span>
                  <span className="block truncate font-medium">+20 155 833 4908</span>
                </span>
              </a>
              <div className="flex items-center gap-3 text-sm">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-brand text-primary-foreground">
                  <MapPin className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-muted-foreground">Location</span>
                  <span className="block truncate font-medium">Cairo, Egypt</span>
                </span>
              </div>
              <div className="flex flex-wrap gap-2 border-t border-border pt-4">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className="grid h-10 w-10 place-items-center rounded-xl border border-border transition-all hover:-translate-y-1 hover:bg-muted"
                  >
                    <s.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="glass overflow-hidden rounded-3xl">
              <iframe
                title="Cairo, Egypt on Google Maps"
                src="https://www.google.com/maps?q=Cairo,Egypt&output=embed"
                loading="lazy"
                className="h-56 w-full border-0 grayscale-[0.4]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
