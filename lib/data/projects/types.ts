export type ProjectText = string | readonly string[];
type NonEmptyArray<T> = readonly [T, ...T[]];

export type ProjectStatus = "Live" | "Completed" | "Maintaining" | "Private";

export interface ProjectScreenshot {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  type?: string;
  status?: ProjectStatus;
  year?: string;
  links?: {
    live?: string;
    source?: string;
  };
  overview: ProjectText;
  problem: ProjectText;
  role: {
    title: string;
    responsibilities: NonEmptyArray<string>;
  };
  solution: ProjectText;
  features: NonEmptyArray<{
    title: string;
    description: string;
  }>;
  screenshots: NonEmptyArray<ProjectScreenshot>;
  techStack: NonEmptyArray<{
    category: string;
    technologies: readonly string[];
  }>;
  deployment?: {
    description?: ProjectText;
    technologies?: readonly string[];
    responsibilities?: readonly string[];
  };
  postLaunch?: {
    description?: ProjectText;
    responsibilities?: readonly string[];
  };
  outcome: ProjectText;
  challenges?: readonly {
    title: string;
    challenge: string;
    solution?: string;
  }[];
  learnings?: ProjectText;
}
