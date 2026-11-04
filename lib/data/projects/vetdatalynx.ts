import type { Project } from "./types";

export const vetdatalynx = {
  slug: "vetdatalynx",
  title: "VetdataLynx",
  shortDescription:
    "A veterinary clinic management platform that keeps patient care, appointments, inventory, billing, and daily operations in one system.",
  tagline: "Every patient visit connected, from appointment to invoice.",
  audience:
    "Veterinary teams who keep clinical records and clinic administration together.",
  tileColor: "#2a7a5e",
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
      src: "https://res.cloudinary.com/df3ak7hgk/image/upload/v1790337967/vetdatalynx_1_edqjor.png",
      alt: "VetdataLynx landing page, “Elevate Your Veterinary Clinic with Seamless Tools”, with a Book a Demo button and a dashboard preview",
      title: "Landing page",
      description:
        "The VetdataLynx landing page with a login, a demo booking button and an overview of the clinic management tools.",
    },
    {
      src: "https://res.cloudinary.com/df3ak7hgk/image/upload/v1790337967/vetdatalynx_4_gb9a0g.png",
      alt: "VetdataLynx dashboard on desktop and mobile with sales summary, top services chart, inventory and appointment counts",
      title: "Dashboard and Inventory",
      description:
        "The dashboard shows sales, top services, inventory and appointments for a veterinary clinic.",
    },
    {
      src: "https://res.cloudinary.com/df3ak7hgk/image/upload/v1790337967/vetdatalynx_2_i1clly.png",
      alt: "VetdataLynx transaction sales report and inventory items list for veterinary clinic management",
      title: "Reports and Inventory",
      description:
        "Sales trends, business performance reports and the inventory item list.",
    },
    {
      src: "https://res.cloudinary.com/df3ak7hgk/image/upload/v1790337967/vetdatalynx_3_kia773.png",
      alt: "VetdataLynx usable forms page with printable veterinary consent and waiver forms, beside the clinic dashboard",
      title: "Usable Forms",
      description:
        "Ready-made clinic forms such as consent and waiver documents, generated with or without data.",
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
