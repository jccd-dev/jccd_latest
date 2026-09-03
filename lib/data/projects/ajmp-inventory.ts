import type { Project } from "./types";

export const ajmpInventory = {
  slug: "ajmp-inventory",
  title: "AJ&P",
  shortDescription:
    "An inventory and order management system for distributing veterinary products across clinics.",
  type: "Inventory web application",
  status: "Live",
  links: {
    live: "https://ajmp.vetdatalynx.com/user-clinic/login",
  },
  overview:
    "AJ&P supports the distribution of veterinary products across clinics. The application centralizes inventory control, order tracking, clinic distribution, and reporting in one operational system.",
  problem:
    "Product distribution requires accurate stock records and clear order status across multiple clinics. The project needed a central place to manage inventory movement and the order lifecycle.",
  role: {
    title: "Web development and inventory workflows",
    responsibilities: ["Web development", "Inventory workflow development", "UI and UX design"],
  },
  solution:
    "The system connects inventory records with ordering and clinic distribution. Teams can track available products, follow orders through their lifecycle, and review operational reports from the same application.",
  features: [
    {
      title: "Inventory control",
      description: "Maintain centralized product and stock records for veterinary distribution.",
    },
    {
      title: "Order tracking",
      description: "Follow orders through each stage of the distribution workflow.",
    },
    {
      title: "Clinic distribution",
      description: "Coordinate product movement across the clinics served by the system.",
    },
    {
      title: "Reporting",
      description: "Review inventory and order information through operational reports.",
    },
  ],
  screenshots: [
    {
      src: "https://res.cloudinary.com/df3ak7hgk/image/upload/v1754572366/Screenshot_2025-08-07_13-11-51_ynxm0z.png",
      alt: "AJ&P inventory and order management interface",
      title: "Inventory operations",
      description: "Centralized inventory and order information for veterinary product distribution.",
    },
  ],
  techStack: [
    { category: "Application", technologies: ["PHP", "Laravel", "Livewire", "JavaScript"] },
    { category: "Data", technologies: ["MySQL"] },
    { category: "Interface", technologies: ["Tailwind CSS"] },
    { category: "Delivery", technologies: ["Git Actions", "Linux"] },
  ],
  outcome:
    "The application brings inventory, ordering, clinic distribution, and reporting into one management workflow.",
} satisfies Project;
