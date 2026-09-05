import type { Project } from "./types";

export const aparador = {
  slug: "aparador",
  title: "Aparador",
  shortDescription:
    "A virtual wardrobe for organizing clothes, building outfits, planning looks, and generating AI try-ons from pieces you already own.",
  type: "Web application / PWA",
  status: "Live",
  links: {
    live: "https://aparador.cloud",
  },
  overview: [
    "Aparador is my personal product built around a virtual wardrobe. It lets people organize their clothes, combine pieces into outfits, generate AI virtual try-ons, save looks, and plan what to wear.",
    "I built the product end to end, including the interface, data model, AI workflows, authentication, subscriptions, credits, deployment pipeline, and server setup. That gave me room to shape the product around one idea: AI suggestions are more useful when they start with clothes the user already owns.",
  ],
  problem: [
    "Owning clothes does not make it easy to remember every piece or decide what works together. Outfit planning often means searching through photos, relying on memory, or repeatedly trying things on without a clear view of the whole wardrobe.",
    "Most outfit inspiration is also disconnected from what is available at home. Aparador needed to make a user's own wardrobe the source for building, suggesting, saving, and planning looks.",
  ],
  role: {
    title: "Product development, full-stack engineering, and deployment",
    responsibilities: [
      "Product development",
      "Full-stack web development",
      "Database design",
      "AI integration",
      "Authentication and account flows",
      "Credit and subscription system",
      "Production deployment",
      "CI/CD",
      "Server and infrastructure management",
      "Application maintenance",
    ],
  },
  solution: [
    "Aparador turns a clothing collection into a digital wardrobe that feeds the rest of the product. Users can assemble outfits manually, ask for suggestions based on available pieces, or generate a visual try-on from a model photo and selected clothes.",
    "Saved looks and the planner make those results reusable instead of leaving them as one-off generations. Credits track AI usage, while subscription limits control how much clothing and how many looks an account can store.",
  ],
  features: [
    {
      title: "Virtual wardrobe",
      description:
        "Upload and organize clothing items so the same wardrobe can be used across outfit building, suggestions, and virtual try-ons.",
    },
    {
      title: "AI virtual try-on",
      description:
        "Select a model photo and wardrobe pieces to generate a visual preview of an outfit.",
    },
    {
      title: "Outfit builder",
      description:
        "Combine pieces from the wardrobe into a look, then save it or use it as the basis for a generated preview.",
    },
    {
      title: "AI outfit suggestions",
      description:
        "Use AI-assisted chat to suggest outfit combinations based on clothing available in the user's wardrobe.",
    },
    {
      title: "Planner",
      description:
        "Assign saved looks ahead of time instead of rebuilding the same outfit later.",
    },
    {
      title: "Collections",
      description:
        "Keep assembled and generated looks together so they can be revisited or planned.",
    },
    {
      title: "Credits and subscriptions",
      description:
        "Manage AI usage through credits while subscription tiers control wardrobe and collection limits.",
    },
  ],
  screenshots: [
    {
      src: "https://res.cloudinary.com/df3ak7hgk/image/upload/v1788573911/mockup_1_akpvam.png",
      alt: "Aparador mockup 1",
      title: "Aparador Mockup 1",
      description: "A mockup of the Aparador web application",
    },
    {
      src: "https://res.cloudinary.com/df3ak7hgk/image/upload/v1788573911/mockup_2_ednjbp.png",
      alt: "Aparador mockup 2",
      title: "Aparador Mockup 2",
      description: "A mockup of the Aparador web application",
    },
    {
      src: "https://res.cloudinary.com/df3ak7hgk/image/upload/v1788573911/mockup_3_pazgq7.png",
      alt: "Aparador mockup 3",
      title: "Aparador Mockup 3",
      description: "A mockup of the Aparador web application",
    },
    {
      src: "https://res.cloudinary.com/df3ak7hgk/image/upload/v1788573911/mockup_4_snwq91.png",
      alt: "Aparador mockup 4",
      title: "Aparador Mockup 4",
      description: "A mockup of the Aparador web application",
    },
    {
      src: "https://res.cloudinary.com/df3ak7hgk/image/upload/v1788573911/mockup_5_suzofu.png",
      alt: "Aparador mockup 5",
      title: "Aparador Mockup 5",
      description: "A mockup of the Aparador web application",
    },
    {
      src: "https://res.cloudinary.com/df3ak7hgk/image/upload/v1788573912/mockup_6_fpjkjn.png",
      alt: "Aparador mockup 6",
      title: "Aparador Mockup 6",
      description: "A mockup of the Aparador web application",
    },
  ],
  techStack: [
    {
      category: "Application",
      technologies: [
        "Next.js",
        "TypeScript",
        "Express.js",
        "Tailwind CSS",
        "Clerk",
      ],
    },
    { category: "Data", technologies: ["PostgreSQL", "Neon", "Redis"] },
    {
      category: "Infrastructure",
      technologies: [
        "Docker",
        "Nginx",
        "Cloudflare",
        "GitHub Actions",
        "Linux",
      ],
    },
    {
      category: "Services",
      technologies: ["Resend", "Cloudflare Images", "Fal.ai", "Google Cloud"],
    },
  ],
  deployment: {
    description:
      "I deployed Aparador as a containerized application behind Nginx and Cloudflare, with GitHub Actions handling delivery to a Linux server. The production setup also connects the application to Neon, Redis, Clerk, Resend, and Cloudflare Images.",
    technologies: ["Docker", "Nginx", "Cloudflare", "GitHub Actions", "Linux"],
    responsibilities: [
      "Production deployment",
      "CI/CD",
      "Server and infrastructure management",
    ],
  },
  postLaunch: {
    description:
      "Because Aparador is my own product, development continues after release. I maintain the application and the infrastructure behind its AI, account, subscription, and credit workflows.",
    responsibilities: [
      "Application maintenance",
      "Infrastructure maintenance",
      "Product iteration",
    ],
  },
  outcome: [
    "I took Aparador from a personal idea to a live product at aparador.cloud.",
    "The released application includes the wardrobe, outfit builder, AI suggestions and try-ons, planner, saved collections, authentication, subscriptions, credits, and the infrastructure required to run them.",
  ],
} satisfies Project;
