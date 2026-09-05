import type { Project } from "./types";

export const eaglesNexus = {
  slug: "eagles-nexus",
  title: "Eagles Nexus",
  shortDescription:
    "A membership platform for managing records, subscriptions, donations, communications, reports, and administrative access.",
  type: "Web application",
  status: "In development",
  overview: [
    "Eagles Nexus is a custom web platform developed for a membership-based organization to bring its member records and day-to-day administrative workflows into one centralized system.",
    "As part of the development team, I worked primarily across the full-stack side of the project while also handling much of the communication with the client, translating feedback into technical changes, resolving issues, and managing the production deployment.",
  ],
  problem: [
    "The organization needed a more centralized way to manage member information and the operational work connected to it. Membership records, advertisements, donations, subscriptions, feedback, notifications, and reports needed to work together instead of being handled through disconnected processes.",
    "The project also evolved as the client reviewed each phase. New requirements, revisions, and feature requests had to be introduced without disrupting existing workflows or creating inconsistencies in the shared membership data.",
  ],
  role: {
    title: "Full-stack development and production delivery",
    responsibilities: [
      "Full-stack application development",
      "Database and system setup",
      "Feature implementation",
      "Client requirements and feedback coordination",
      "Roles and permissions",
      "Testing and bug fixing",
      "Production deployment",
      "Change and revision implementation",
    ],
  },
  solution: [
    "We developed Eagles Nexus around a shared membership system where member records connect naturally with subscriptions, donations, advertisements, communication, feedback, and reporting features.",
    "On my side, I focused on implementing and connecting features across the application, working with the database and backend workflows, handling client feedback and revisions, and making sure changes continued to work with the rest of the platform.",
    "Administrative access is controlled through defined roles and permissions so users only have access to the records and actions relevant to their responsibilities. After each round of development and review, changes were tested and refined before I handled the platform's production deployment.",
  ],
  features: [
    {
      title: "Member management",
      description:
        "Maintain member information and give authorized administrators tools to browse, search, and update records.",
    },
    {
      title: "Roles and permissions",
      description:
        "Control access to administrative functions using defined user roles and permission boundaries.",
    },
    {
      title: "Advertisements",
      description:
        "Manage advertisements and provide member-facing access to active advertisement content.",
    },
    {
      title: "Donations and subscriptions",
      description:
        "Support organization workflows related to donations and member subscriptions.",
    },
    {
      title: "Dashboard and reports",
      description:
        "Give administrators a working view of information and reports produced by the platform's modules.",
    },
    {
      title: "Member directory and search",
      description:
        "Provide member browsing and expanded search across authorized member records.",
    },
    {
      title: "Notifications and messaging",
      description:
        "Support in-application notifications and communication workflows.",
    },
    {
      title: "Feedback management",
      description:
        "Collect and manage feedback submitted through the platform.",
    },
  ],
  screenshots: [
    {
      src: "https://res.cloudinary.com/df3ak7hgk/image/upload/v1788574460/mockup_1_fpciqh.png",
      alt: "Eagles Nexus mockup 1",
      title: "Eagles Nexus Mockup 1",
      description: "A mockup of the Eagles Nexus web application",
    },
    {
      src: "https://res.cloudinary.com/df3ak7hgk/image/upload/v1788574460/mockup_2_ourmrj.png",
      alt: "Eagles Nexus mockup 2",
      title: "Eagles Nexus Mockup 2",
      description: "A mockup of the Eagles Nexus web application",
    },
    {
      src: "https://res.cloudinary.com/df3ak7hgk/image/upload/v1788574460/mockup_3_wymg8l.png",
      alt: "Eagles Nexus mockup 3",
      title: "Eagles Nexus Mockup 3",
      description: "A mockup of the Eagles Nexus web application",
    },
    {
      src: "https://res.cloudinary.com/df3ak7hgk/image/upload/v1788574461/mockup_6_l4jbhy.png",
      alt: "Eagles Nexus mockup 4",
      title: "Eagles Nexus Mockup 4",
      description: "A mockup of the Eagles Nexus web application",
    },
    {
      src: "https://res.cloudinary.com/df3ak7hgk/image/upload/v1788574461/mockup_4_cls1hx.png",
      alt: "Eagles Nexus mockup 5",
      title: "Eagles Nexus Mockup 5",
      description: "A mockup of the Eagles Nexus web application",
    },
    {
      src: "https://res.cloudinary.com/df3ak7hgk/image/upload/v1788574462/mockup_5_o8po9r.png",
      alt: "Eagles Nexus mockup 6",
      title: "Eagles Nexus Mockup 6",
      description: "A mockup of the Eagles Nexus web application",
    },
  ],
  techStack: [
    {
      category: "Web Application",
      technologies: ["Next.js", "Tanstack Query", "Supabase", "JavaScript"],
    },
    { category: "Data", technologies: ["PostgresSQL", "Redis"] },
    { category: "Interface", technologies: ["Tailwind CSS", "Shadcn UI"] },
    {
      category: "Delivery",
      technologies: ["GitHub Actions", "CICD", "Linux", "Docker"],
    },
  ],
  outcome: [
    "The core membership platform and its approved feature additions were developed through multiple review, feedback, and revision cycles with the client.",
    "The platform now covers the organization's main membership and administrative workflows and has been deployed and prepared for production use.",
  ],
} satisfies Project;
