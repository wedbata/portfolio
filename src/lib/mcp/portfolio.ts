// Plain, public portfolio data for MCP tools (no asset imports — import-safe).
export const projects = [
  {
    title: "JubaDelivery",
    category: "E-Commerce",
    description:
      "Multi-vendor food and parcel delivery platform with live order tracking and mobile-money checkout.",
    tags: ["React", "Tailwind", "Stripe", "REST API"],
    link: "https://github.com/WedBata",
  },
  {
    title: "Ireneo School Admin",
    category: "Web App",
    description:
      "School management system handling enrolment, attendance, grading and term report generation.",
    tags: ["Next.js", "TypeScript", "Charts"],
    link: "https://github.com/WedBata",
  },
  {
    title: "Vibe Code Agency Site",
    category: "Landing Page",
    description:
      "Marketing site for Vibe Code Internet Service — services, pricing and lead capture in one scroll.",
    tags: ["HTML5", "CSS3", "JavaScript"],
    link: "https://github.com/WedBata",
  },
  {
    title: "SaaS Dashboard",
    category: "Web App",
    description:
      "Analytics platform with role-based views, exportable reports and real-time KPI widgets.",
    tags: ["React", "Recharts", "REST API"],
    link: "https://github.com/WedBata",
  },
  {
    title: "Restaurant Booking",
    category: "Web App",
    description:
      "Online reservation system with table availability, SMS confirmation and an owner dashboard.",
    tags: ["Next.js", "Tailwind", "Calendar"],
    link: "https://github.com/WedBata",
  },
  {
    title: "Portfolio V1",
    category: "Landing Page",
    description:
      "The first iteration of George's personal site — hand-coded, 100 Lighthouse performance score.",
    tags: ["HTML5", "CSS3", "GSAP"],
    link: "https://github.com/WedBata",
  },
] as const;

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
      "From wireframe to clickable prototype. User-centred flows designed in Figma, then built exactly as approved.",
    points: ["Wireframing", "Prototyping", "Design systems"],
  },
  {
    title: "Internet Solutions",
    description:
      "The Vibe Code speciality: hosting, domains, deployment pipelines and ongoing maintenance.",
    points: ["Hosting & domains", "Deployment", "Maintenance"],
  },
] as const;

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
] as const;

export const tools = ["VS Code", "GitHub", "Vercel", "Figma"] as const;

export const contact = {
  name: "George",
  role: "Front-End Developer",
  business: "Vibe Code Internet Service",
  location: "Cairo, Egypt",
  email: "itechwau@gmail.com",
  phone: "+20 155 833 4908",
  whatsapp: "https://wa.me/201558334908",
  github: "https://github.com/WedBata",
  linkedin: "https://www.linkedin.com/in/wedbata",
  twitter: "https://twitter.com/WedBata",
  availability: "Available for freelance projects",
} as const;
