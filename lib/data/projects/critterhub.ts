import type { Project } from "./types";

export const critterHub = {
  slug: "critterhub",
  title: "CritterHub",
  shortDescription:
    "A production web application I developed, deployed, and continue to maintain for a veterinary software client.",
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
      title: "Appointment Management",
      description:
        "Manage bookings, schedules, and appointment details for grooming and clinic services.",
    },
    {
      title: "Grooming Services Management",
      description:
        "Create and manage grooming services, pricing, and the service options offered to customers.",
    },
    {
      title: "Billing Management",
      description:
        "Handle customer charges, service payments, and billing records within the same system.",
    },
    {
      title: "Inventory Management",
      description:
        "Track products and supplies, monitor stock levels, and keep inventory records organized.",
    },
    {
      title: "Role-based Access Control",
      description:
        "Control what users can access and manage based on their assigned roles and responsibilities.",
    },
    {
      title: "Custom Landing Pages",
      description:
        "Provide each subscriber with a customizable public-facing page for their business and services.",
    },
  ],
  screenshots: [
    {
      src: "https://res.cloudinary.com/df3ak7hgk/image/upload/v1788574535/mockup_1_lvod90.png",
      alt: "Criter Hub mockup 1",
      title: "CritterHub Mockup 1",
      description: "A mockup of the CritterHub web application",
    },
    {
      src: "https://res.cloudinary.com/df3ak7hgk/image/upload/v1788574536/mockup_2_kj21wn.png",
      alt: "Criter Hub mockup 2",
      title: "CritterHub Mockup 2",
      description: "A mockup of the CritterHub web application",
    },
    {
      src: "https://res.cloudinary.com/df3ak7hgk/image/upload/v1788574536/mockup_3_tw9xbf.png",
      alt: "Criter Hub mockup 3",
      title: "CritterHub Mockup 3",
      description: "A mockup of the CritterHub web application",
    },
    {
      src: "https://res.cloudinary.com/df3ak7hgk/image/upload/v1788574537/mockup_4_cowxi6.png",
      alt: "Criter Hub mockup 4",
      title: "CritterHub Mockup 4",
      description: "A mockup of the CritterHub web application",
    },
    {
      src: "https://res.cloudinary.com/df3ak7hgk/image/upload/v1788574539/mockup_5_egioow.png",
      alt: "Criter Hub mockup 5",
      title: "CritterHub Mockup 5",
      description: "A mockup of the CritterHub web application",
    },
    {
      src: "https://res.cloudinary.com/df3ak7hgk/image/upload/v1788574538/mockup_6_cois9c.png",
      alt: "Criter Hub mockup 6",
      title: "CritterHub Mockup 6",
      description: "A mockup of the CritterHub web application",
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
