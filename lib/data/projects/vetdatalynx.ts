import type { Project } from "./types";

export const vetdatalynx = {
  slug: "vetdatalynx",
  title: "Vetdatalynx",
  shortDescription:
    "A clinic operations platform for patient records, appointments, inventory, and billing.",
  type: "Web application",
  status: "Live",
  links: {
    live: "https://vetdatalynx.com",
  },
  overview:
    "Vetdatalynx brings the administrative work surrounding veterinary care into one application. Clinic teams can manage patient information, appointments, inventory, and billing without separating those workflows across unrelated tools.",
  problem:
    "Daily clinic operations depend on connected patient and business records. The project needed a consistent system for managing clinical information, schedules, stock levels, and billing from one place.",
  role: {
    title: "Web development and database architecture",
    responsibilities: ["Web development", "Database architecture", "UI and UX design"],
  },
  solution:
    "The application centralizes core clinic workflows while keeping each operational area clear and accessible. Shared records connect patient care, appointment scheduling, inventory monitoring, and billing within the same system.",
  features: [
    {
      title: "Patient records",
      description: "Maintain clinical and administrative patient information in one system.",
    },
    {
      title: "Appointment reminders",
      description: "Support scheduling with automated reminders for upcoming appointments.",
    },
    {
      title: "Inventory tracking",
      description: "Monitor available stock and surface low-stock items before they affect operations.",
    },
    {
      title: "Billing and invoicing",
      description: "Keep billing workflows connected to the same operational records.",
    },
  ],
  screenshots: [
    {
      src: "https://res.cloudinary.com/df3ak7hgk/image/upload/v1774689377/Screenshot_2026-03-28_171524_ebxyfg.png",
      alt: "Vetdatalynx clinic operations interface",
      title: "Clinic operations",
      description: "The application brings patient and administrative workflows into one interface.",
    },
  ],
  techStack: [
    { category: "Application", technologies: ["PHP", "Laravel", "Livewire", "JavaScript"] },
    { category: "Data", technologies: ["MySQL"] },
    { category: "Interface", technologies: ["Tailwind CSS"] },
    { category: "Delivery", technologies: ["Git Actions", "Linux"] },
  ],
  outcome:
    "The resulting application keeps patient records, appointments, inventory, and billing within one operational system.",
} satisfies Project;
