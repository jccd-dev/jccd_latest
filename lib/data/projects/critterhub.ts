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
    "CritterHub is a production web application I developed for the same client behind VetDataLynx. My responsibility did not stop at feature work: I also handled its production delivery and continue to maintain the deployed application.",
    "The project represents the full lifecycle of client work, from building the application to supporting it after people began using it in production.",
  ],
  problem: [
    "The client needed a separate application taken from development into a stable production environment. That required more than completing the initial build because issues and requested changes would continue to surface through real use.",
    "The work therefore had to cover delivery and ongoing support as part of the product, not as disconnected handoff tasks.",
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
    "I handled the application across development and production delivery, keeping responsibility for the working product rather than ending at a code handoff.",
    "After release, I continued fixing bugs and maintaining the system as issues and changes were identified through day-to-day use.",
  ],
  features: [],
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
      "I moved CritterHub into its production environment and remained responsible for the application after launch.",
    responsibilities: ["Production deployment", "Release support"],
  },
  postLaunch: {
    description:
      "I continue to support the live application, resolve bugs, and make maintenance changes based on issues found after release.",
    responsibilities: ["Bug fixes", "Application maintenance"],
  },
  outcome: [
    "CritterHub is live in production and remains under active maintenance.",
    "The project moved from application development into an ongoing client engagement covering deployment, fixes, and post-launch support.",
  ],
} satisfies Project;
