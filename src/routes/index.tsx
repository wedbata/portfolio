import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Portfolio } from "@/components/site/Portfolio";
import { Skills } from "@/components/site/Skills";
import { Testimonials } from "@/components/site/Testimonials";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { useReveal } from "@/components/site/useReveal";

const title = "George | Front-End Developer & Vibe Code Founder";
const description =
  "George builds fast, responsive websites in Cairo — React, Next.js and Tailwind, plus hosting and domains through Vibe Code Internet Service.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://itechwau.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "George",
          jobTitle: "Front-End Developer",
          url: "https://itechwau.lovable.app/",
          email: "mailto:itechwau@gmail.com",
          address: { "@type": "PostalAddress", addressLocality: "Cairo", addressCountry: "EG" },
          sameAs: [
            "https://github.com/WedBata",
            "https://www.linkedin.com/in/wedbata",
            "https://twitter.com/WedBata",
          ],
          worksFor: { "@type": "Organization", name: "Vibe Code Internet Service" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Vibe Code Internet Service",
          description:
            "Front-end development, UI/UX design, hosting and domain solutions for growing businesses.",
          url: "https://itechwau.lovable.app/",
          email: "itechwau@gmail.com",
          telephone: "+20 155 833 4908",
          founder: { "@type": "Person", name: "George" },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Cairo",
            addressCountry: "EG",
          },
          areaServed: "Cairo, Egypt",
        }),
      },
    ],
  }),
  component: Index,
});

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-gradient-brand text-primary-foreground shadow-glow transition-all ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

function Index() {
  useReveal();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Skills />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
