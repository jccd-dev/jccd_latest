import type { Project } from "./types";

export const critterHub = {
  slug: "critterhub",
  title: "CritterHub",
  shortDescription:
    "Appointments, services, billing, and inventory for groomers and smaller veterinary clinics, developed and maintained for a veterinary software client.",
  tagline: "Daily clinic tools without the full veterinary suite.",
  audience:
    "Groomers and smaller clinics that mainly need appointments, services, billing, and inventory.",
  tileColor: "#123c2e",
  type: "Web application",
  status: "Live",
  links: {
    live: "https://critter-hub.vetdatalynx.com",
  },
  overview: [
    "CritterHub is a production web application I developed for the same client behind VetdataLynx. While VetdataLynx was built around the broader needs of a veterinary clinic, CritterHub was created for a more focused market.",
    "Groomers and smaller clinics that mainly need the day-to-day tools around appointments, services, billing, and inventory without the larger scope of a full veterinary management system.",
  ],
  problem: [
    "VetdataLynx covered a wide range of veterinary operations, but that scope was more than some smaller clinics and grooming businesses needed. The client wanted another product that could serve those businesses without carrying over every workflow and feature from the larger platform.",
    "The challenge was deciding what was actually useful for that audience and keeping the application focused enough for simpler operations while still covering the parts of the business they use every day.",
  ],
  role: {
    title: "Web development, deployment, and maintenance",
    responsibilities: [
      "Web application development",
      "Production deployment",
      "Bug fixing",
      "Application maintenance",
    ],
  },
  solution: [
    "I built CritterHub as a more focused alternative to VetdataLynx rather than trying to fit both types of businesses into the same product. The application keeps the operational features that still make sense for groomers and smaller clinics while leaving out the broader veterinary workflows they are less likely to use.",
    "I also handled the production deployment and continue to maintain the application, so my involvement covers both the build itself and the work needed to keep the deployed product ready for use.",
  ],
  features: [
    {
      title: "Appointment management",
      description:
        "Manage bookings, schedules, and appointment details for grooming and clinic services.",
    },
    {
      title: "Grooming services management",
      description:
        "Create and manage grooming services, pricing, and the service options offered to customers.",
    },
    {
      title: "Billing management",
      description:
        "Handle customer charges, service payments, and billing records within the same system.",
    },
    {
      title: "Inventory management",
      description:
        "Track products and supplies, monitor stock levels, and keep inventory records organized.",
    },
    {
      title: "Role-based access control",
      description:
        "Control what users can access and manage based on their assigned roles and responsibilities.",
    },
    {
      title: "Custom landing pages",
      description:
        "Provide each subscriber with a customizable public-facing page for their business and services.",
    },
  ],
  screenshots: [
    {
      src: "https://res.cloudinary.com/df3ak7hgk/image/upload/v1788574535/mockup_1_lvod90.png",
      alt: "Critter Hub pet grooming management software landing page, reports dashboard and mobile dashboard shown together",
      title: "Landing page and dashboards",
      description:
        "Critter Hub's landing page, financial reports and mobile dashboard for pet grooming and pet-care clinics.",
    },
    {
      src: "https://res.cloudinary.com/df3ak7hgk/image/upload/v1788574536/mockup_2_kj21wn.png",
      alt: "Three Critter Hub mobile screens: the studio dashboard, an inventory item detail page and the landing page",
      title: "Mobile screens",
      description:
        "The dashboard, inventory item details and landing page, all designed for phones.",
    },
    {
      src: "https://res.cloudinary.com/df3ak7hgk/image/upload/v1788574536/mockup_3_tw9xbf.png",
      alt: "Critter Hub landing page settings with a live preview, beside the monthly financial reports page",
      title: "Landing page settings",
      description:
        "Teams customise their public booking page with a live preview, and track monthly financials.",
    },
    {
      src: "https://res.cloudinary.com/df3ak7hgk/image/upload/v1788574537/mockup_4_cowxi6.png",
      alt: "Critter Hub landing page in a browser, headline “keeps every pet visit on track” with a Today at the clinic appointment panel",
      title: "Landing page",
      description:
        "The public landing page shows today's appointments and invites grooming teams to start free.",
    },
    {
      src: "https://res.cloudinary.com/df3ak7hgk/image/upload/v1788574539/mockup_5_egioow.png",
      alt: "Critter Hub inventory item details page on mobile showing SKU, selling price, stock quantity and unit",
      title: "Inventory item details",
      description:
        "An inventory item with its SKU, price, stock and unit, readable on a phone.",
    },
    {
      src: "https://res.cloudinary.com/df3ak7hgk/image/upload/v1788574538/mockup_6_cois9c.png",
      alt: "Critter Hub studio dashboard on a laptop and phone showing appointments, completed visits, unassigned bookings and paid sales",
      title: "Studio dashboard",
      description:
        "The dashboard summarises today's appointments, workload and paid sales on desktop and mobile.",
    },
  ],
  techStack: [
    {
      category: "Web Application",
      technologies: ["PHP", "Laravel", "Livewire", "JavaScript", "Inertia"],
    },
    {
      category: "Data",
      technologies: ["MySQL"],
    },
    {
      category: "Interface",
      technologies: ["Tailwind CSS", "Shadcn UI"],
    },
    {
      category: "Delivery",
      technologies: ["GitHub Actions", "CICD", "Linux", "Docker"],
    },
  ],
  deployment: {
    description:
      "I moved CritterHub into client's VPS production environment and remained responsible for the application after launch.",
    responsibilities: ["Production deployment", "Release support"],
  },
  postLaunch: {},
  outcome: [
    "CritterHub was completed and deployed as a production-ready platform tailored to groomers and smaller veterinary clinics.",
    "The client now has a more focused alternative to VetdataLynx, covering the essential operational workflows without the complexity of a larger veterinary management system.",
  ],
} satisfies Project;
