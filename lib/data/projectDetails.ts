export interface ProjectDetail {
  slug: string;
  title: string;
  subtitle: string;
  services: string[];
  overview: string;
  images: string[];
}

export const projectDetails: ProjectDetail[] = [
  {
    slug: "vetdatalynx",
    title: "Streamlining Veterinary Care Systems",
    subtitle: "Empowering Vet Clinics with Smart, Simple Solution.",
    services: ["UI/UX Design", "Web Development", "Database Architecture"],
    overview:
      "Designed to streamline clinic operations, helping professionals focus on providing the best care for pet patients. This comprehensive system handles patient records, appointment scheduling, and inventory management with ease.",
    images: [
      "https://res.cloudinary.com/df3ak7hgk/image/upload/v1774689377/Screenshot_2026-03-28_171524_ebxyfg.png",
      "https://res.cloudinary.com/df3ak7hgk/image/upload/v1774689377/Screenshot_2026-03-28_171524_ebxyfg.png",
    ],
  },
  {
    slug: "ai-task-manager",
    title: "AI Task Manager",
    subtitle: "A simple fun AI app message maker using OpenAI",
    services: ["AI Integration", "Frontend Development"],
    overview:
      "Whisper Note is an AI-powered message builder that helps users craft perfect messages from simple voice notes or rough text. It utilizes OpenAI's cutting-edge models to transform disorganized thoughts into structured, professional communications.",
    images: [
      "https://res.cloudinary.com/df3ak7hgk/image/upload/v1750581312/scrnli_V4oqAfbFhEVa2d_lainf7.png",
      "https://res.cloudinary.com/df3ak7hgk/image/upload/v1750581312/scrnli_V4oqAfbFhEVa2d_lainf7.png",
      "https://images.unsplash.com/photo-1774246714923-0375b6f1e0e9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    slug: "ajmp-inventory",
    title: "AJ&P Inventory Management",
    subtitle: "A web-based Inventory and Order Management System",
    services: ["Web Development", "Inventory System", "UX Design"],
    overview:
      "A specialized platform for managing veterinary product distribution. Focuses on organization, streamlining inventory tracking, and facilitating product distribution efficiency across multiple clinics.",
    images: [
      "https://res.cloudinary.com/df3ak7hgk/image/upload/v1754572366/Screenshot_2025-08-07_13-11-51_ynxm0z.png",
      "https://res.cloudinary.com/df3ak7hgk/image/upload/v1754572366/Screenshot_2025-08-07_13-11-51_ynxm0z.png",
    ],
  },
];
