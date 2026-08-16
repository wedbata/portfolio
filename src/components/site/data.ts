import juba from "@/assets/proj-jubadelivery.jpg";
import school from "@/assets/proj-school.jpg";
import agency from "@/assets/proj-agency.jpg";
import saas from "@/assets/proj-saas.jpg";
import restaurant from "@/assets/proj-restaurant.jpg";
import portfolio from "@/assets/proj-portfolio.jpg";

export type Category = "Web App" | "Landing Page" | "E-Commerce";

export const projects: {
  title: string;
  description: string;
  image: string;
  category: Category;
  tags: string[];
  demo: string;
  github: string;
}[] = [
  {
    title: "JubaDelivery",
    description:
      "Multi-vendor food and parcel delivery platform with live order tracking and mobile-money checkout.",
    image: juba,
    category: "E-Commerce",
    tags: ["React", "Tailwind", "Stripe", "REST API"],
    demo: "https://github.com/WedBata",
    github: "https://github.com/WedBata",
  },
  {
    title: "Ireneo School Admin",
    description:
      "School management system handling enrolment, attendance, grading and term report generation.",
    image: school,
    category: "Web App",
    tags: ["Next.js", "TypeScript", "Charts"],
    demo: "https://github.com/WedBata",
    github: "https://github.com/WedBata",
  },
  {
    title: "Vibe Code Agency Site",
    description:
      "Marketing site for Vibe Code Internet Service — services, pricing and lead capture in one scroll.",
    image: agency,
    category: "Landing Page",
    tags: ["HTML5", "CSS3", "JavaScript"],
    demo: "https://github.com/WedBata",
    github: "https://github.com/WedBata",
  },
  {
    title: "SaaS Dashboard",
    description:
      "Analytics platform with role-based views, exportable reports and real-time KPI widgets.",
    image: saas,
    category: "Web App",
    tags: ["React", "Recharts", "REST API"],
    demo: "https://github.com/WedBata",
    github: "https://github.com/WedBata",
  },
  {
    title: "Restaurant Booking",
    description:
      "Online reservation system with table availability, SMS confirmation and an owner dashboard.",
    image: restaurant,
    category: "Web App",
    tags: ["Next.js", "Tailwind", "Calendar"],
    demo: "https://github.com/WedBata",
    github: "https://github.com/WedBata",
  },
  {
    title: "Portfolio V1",
    description:
      "The first iteration of my personal site — hand-coded, 100 Lighthouse performance score.",
    image: portfolio,
    category: "Landing Page",
    tags: ["HTML5", "CSS3", "GSAP"],
    demo: "https://github.com/WedBata",
    github: "https://github.com/WedBata",
  },
];

export const skills = [
  { name: "HTML5", level: 95 },
  { name: "CSS3", level: 92 },
  { name: "JavaScript", level: 90 },
  { name: "React", level: 88 },
  { name: "Next.js", level: 82 },
  { name: "Tailwind CSS", level: 93 },
  { name: "Git", level: 85 },
  { name: "Figma", level: 78 },
  { name: "REST APIs", level: 84 },
];

export const tools = ["VS Code", "GitHub", "Vercel", "Figma"];

export const testimonials = [
  {
    name: "Achol Deng",
    role: "Operations Lead",
    company: "JubaDelivery",
    rating: 5,
    quote:
      "George rebuilt our storefront in three weeks. Orders went up 40% and the checkout finally works on every phone our riders use.",
  },
  {
    name: "Fr. Ireneo Santos",
    role: "Head of School",
    company: "Ireneo Academy",
    rating: 5,
    quote:
      "He understood our reporting rules better than our own staff. Term reports that took a week now take an afternoon.",
  },
  {
    name: "Mariam Hassan",
    role: "Founder",
    company: "Nile Bites Cairo",
    rating: 5,
    quote:
      "Clear communication, fast delivery and a booking site that looks better than the big chains. Vibe Code is my first call now.",
  },
];

export const services = [
  {
    title: "Front-End Development",
    description:
      "Production React and Next.js interfaces — component systems, responsive layouts and accessibility baked in from the first commit.",
    points: ["React & Next.js", "Responsive design", "Performance tuning"],
  },
  {
    title: "UI/UX Design",
    description:
      "From wireframe to clickable prototype. I design user-centred flows in Figma, then build exactly what was approved.",
    points: ["Wireframing", "Prototyping", "Design systems"],
  },
  {
    title: "Internet Solutions",
    description:
      "The Vibe Code speciality: hosting, domains, deployment pipelines and ongoing maintenance so your site never goes quiet.",
    points: ["Hosting & domains", "Deployment", "Maintenance"],
  },
];
