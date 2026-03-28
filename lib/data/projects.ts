export interface Project {
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string; // Cloudinary URL or public_id
  cloudinaryPublicId?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  features?: string[];
}

export const projects: Project[] = [
  {
    slug: "vetdatalynx",
    title: "Vetdatalynx",
    description: "Empowering Vet Clinics with Smart, Simple Solution.",
    fullDescription:
      "Designed to streamline clinic operations, helping to focus on providing the best care for pet patients. This comprehensive system handles patient records, appointment scheduling, and inventory management with ease.",
    image:
      "https://res.cloudinary.com/df3ak7hgk/image/upload/v1774689377/Screenshot_2026-03-28_171524_ebxyfg.png",
    cloudinaryPublicId: "Screenshot_2026-03-28_171524_ebxyfg",
    technologies: [
      "PHP",
      "Laravel",
      "MySQL",
      "Tailwind CSS",
      "Javascript",
      "Livewire",
      "Git Actions",
      "Linux",
    ],
    liveUrl: "https://vetdatalynx.com",
    features: [
      "Real-time patient record management",
      "Automated appointment reminders",
      "Inventory tracking and low-stock alerts",
      "Integrated billing and invoicing",
    ],
  },
  {
    slug: "ai-task-manager",
    title: "AI Task Manager",
    description: "A simple fun AI app message maker using OpenAI",
    fullDescription:
      "Whisper Note is an AI-powered message builder that helps users craft perfect messages from simple voice notes or rough text. It utilizes OpenAI's cutting-edge models to transform disorganized thoughts into structured, professional communications.",
    image:
      "https://res.cloudinary.com/df3ak7hgk/image/upload/v1750581312/scrnli_V4oqAfbFhEVa2d_lainf7.png",
    cloudinaryPublicId: "scrnli_V4oqAfbFhEVa2d_lainf7",
    technologies: [
      "Next.js",
      "OpenAI API",
      "TypeScript",
      "Tailwind CSS",
      "Vercel",
    ],
    liveUrl: "https://whisper-note-kappa.vercel.app/",
    githubUrl: "https://github.com/jccd-dev/whisper-note",
    features: [
      "Voice-to-text transformation",
      "Context-aware message rewriting",
      "Multiple tone selections (Formal, Casual, etc.)",
      "One-click sharing to various platforms",
    ],
  },
  {
    slug: "ajmp-inventory",
    title: "AJ&P",
    description:
      "A web-based Inventory and Order Management System for veterinary products.",
    fullDescription:
      "A specialized platform for managing veterinary product distribution. Focuses on organization, streamlining inventory tracking, and facilitating product distribution efficiency across multiple clinics.",
    image:
      "https://res.cloudinary.com/df3ak7hgk/image/upload/v1754572366/Screenshot_2025-08-07_13-11-51_ynxm0z.png",
    cloudinaryPublicId: "Screenshot_2025-08-07_13-11-51_ynxm0z",
    technologies: [
      "PHP",
      "Laravel",
      "MySQL",
      "Tailwind CSS",
      "Javascript",
      "Livewire",
      "Git Actions",
      "Linux",
    ],
    liveUrl: "https://ajmp.vetdatalynx.com/user-clinic/login",
    features: [
      "Centralized inventory control",
      "Order lifecycle tracking",
      "Clinic distribution management",
      "Detailed reporting and analytics",
    ],
  },
];
