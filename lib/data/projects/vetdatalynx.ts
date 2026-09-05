import type { Project } from "./types";

export const vetdatalynx = {
  slug: "vetdatalynx",
  title: "VetdataLynx",
  shortDescription:
    "A veterinary clinic management platform that keeps patient care, appointments, inventory, billing, and daily operations in one system.",
  type: "Web application",
  status: "Live",
  links: {
    live: "https://vetdatalynx.com",
  },
  overview: [
    "VetDataLynx is a clinic management system built around the records and workflows veterinary teams use every day. It brings client and patient information, appointments, inventory, billing, prescriptions, and reporting into one application.",
    "My work spans the application, database architecture, interface implementation, production deployment, and ongoing maintenance. The product has to support both clinical records and the administrative work surrounding each patient visit.",
  ],
  problem: [
    "Veterinary clinics need medical and operational data to stay connected. A patient visit can touch an appointment, medical history, a prescription, medicine stock, an invoice, and a payment, so separating those records creates extra work for clinic staff.",
    "The system also needs to serve people with different responsibilities. Staff must be able to reach the records and tools required for their work without exposing every administrative function to every account.",
  ],
  role: {
    title: "Web development and database architecture",
    responsibilities: [
      "Web development",
      "Database architecture",
      "UI and UX implementation",
      "Production deployment",
      "Application maintenance",
    ],
  },
  solution: [
    "I built the application around shared clinic records rather than separate tools for each task. Patient information carries into appointments, prescriptions, inventory activity, billing, and reports, giving staff one consistent place to follow the work around a visit.",
    "Roles and permissions keep administrative access controlled, while reminders, low-stock visibility, receipts, and reports cover the recurring tasks that keep the clinic moving.",
  ],
  features: [
    {
      title: "Client and patient records",
      description:
        "Manage pet profiles, owner information, medical history, vaccinations, and related patient records.",
    },
    {
      title: "Appointment management",
      description:
        "Manage clinic appointments and send automated email or SMS reminders based on the available plan.",
    },
    {
      title: "Inventory management",
      description:
        "Track medicines and clinic stock, monitor usage, and identify items that need restocking.",
    },
    {
      title: "Billing and payments",
      description:
        "Create invoices, record payments, issue receipts, and keep billing connected to clinic operations.",
    },
    {
      title: "Veterinarian tools",
      description:
        "Provide veterinarian access to patient information and support digital prescription workflows.",
    },
    {
      title: "Reports and access control",
      description:
        "Provide operational reporting together with role and permission controls for clinic staff.",
    },
  ],
  screenshots: [
    {
      src: "https://res.cloudinary.com/df3ak7hgk/image/upload/v1774689377/Screenshot_2026-03-28_171524_ebxyfg.png",
      alt: "Vetdatalynx clinic operations interface",
      title: "Clinic operations",
      description:
        "One of the operational views used for managing veterinary clinic records and workflows.",
    },
  ],
  techStack: [
    {
      category: "Application",
      technologies: ["PHP", "Laravel", "Livewire", "JavaScript"],
    },
    { category: "Data", technologies: ["MySQL"] },
    { category: "Interface", technologies: ["Tailwind CSS"] },
    { category: "Delivery", technologies: ["GitHub Actions", "Linux"] },
  ],
  deployment: {
    description:
      "I took part in moving VetDataLynx from development into a Linux production environment and set up GitHub Actions to support repeatable delivery. Deployment work remains connected to application changes, so releases and infrastructure are maintained as part of the same product.",
    technologies: ["GitHub Actions", "Linux"],
    responsibilities: [
      "Production deployment",
      "Release workflow",
      "Server maintenance",
    ],
  },
  postLaunch: {
    description:
      "The work continued after launch. I maintain the application, fix issues found through real clinic use, and update existing workflows as the product changes.",
    responsibilities: [
      "Application maintenance",
      "Bug fixes",
      "Workflow updates",
    ],
  },
  outcome: [
    "VetDataLynx is live and used as an active veterinary clinic management application.",
    "Patient records, appointments, inventory, prescriptions, billing, payments, reporting, and staff access now live in one connected product that I continue to support.",
  ],
} satisfies Project;
