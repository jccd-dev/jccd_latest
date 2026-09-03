import { ajmpInventory } from "./ajmp-inventory";
import { vetdatalynx } from "./vetdatalynx";
import { whisperNote } from "./whisper-note";
import type { Project } from "./types";

export type { Project, ProjectScreenshot, ProjectStatus, ProjectText } from "./types";

export const projects: readonly Project[] = [vetdatalynx, whisperNote, ajmpInventory];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectTechnologies(project: Pick<Project, "techStack">) {
  return project.techStack.flatMap(({ technologies }) => technologies);
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return index === -1 ? undefined : projects[(index + 1) % projects.length];
}
