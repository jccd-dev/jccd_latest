import type { Project } from "./types";

export const whisperNote = {
  slug: "ai-task-manager",
  title: "Whisper Note",
  shortDescription:
    "An AI message builder that turns rough notes and voice input into clear, structured messages.",
  type: "AI web application",
  status: "Live",
  links: {
    live: "https://whisper-note-kappa.vercel.app/",
    source: "https://github.com/jccd-dev/whisper-note",
  },
  overview:
    "Whisper Note helps people turn rough text and voice notes into messages that are easier to send. It uses AI to reorganize the original input while preserving the user's intended context and tone.",
  problem:
    "Voice notes and quickly written drafts often contain the right ideas in an unclear order. Reworking them into a concise message adds friction before the message can be shared.",
  role: {
    title: "Frontend development and AI integration",
    responsibilities: ["Frontend development", "AI integration"],
  },
  solution:
    "The application accepts voice or text input, identifies its context, and produces a structured message. Tone controls let the user adjust the result before copying or sharing it.",
  features: [
    {
      title: "Voice-to-text input",
      description: "Capture rough ideas through speech before transforming them into a message.",
    },
    {
      title: "Context-aware rewriting",
      description: "Reorganize the input into a clearer message without losing its original intent.",
    },
    {
      title: "Tone selection",
      description: "Adjust the generated message for formal, casual, and other communication styles.",
    },
    {
      title: "One-click sharing",
      description: "Move the finished message into the user's preferred communication channel.",
    },
  ],
  screenshots: [
    {
      src: "https://res.cloudinary.com/df3ak7hgk/image/upload/v1750581312/scrnli_V4oqAfbFhEVa2d_lainf7.png",
      alt: "Whisper Note message builder interface",
      title: "Message builder",
      description: "Voice and text input are transformed into a structured message for review.",
    },
  ],
  techStack: [
    { category: "Frontend", technologies: ["Next.js", "TypeScript", "Tailwind CSS"] },
    { category: "AI", technologies: ["OpenAI API"] },
    { category: "Hosting", technologies: ["Vercel"] },
  ],
  outcome:
    "Whisper Note provides one focused workflow for turning unstructured input into a message that is ready to review and share.",
} satisfies Project;
