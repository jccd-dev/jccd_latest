"use client";

import { ProjectCard } from "@/components/project-card";
import { clientWork, personalWork, projects } from "@/lib/data/projects";
import { useState } from "react";

const filters = [
  { label: "All", items: projects },
  { label: "Client work", items: clientWork },
  { label: "Personal", items: personalWork },
];

export function WorkGrid() {
  const [active, setActive] = useState(0);

  return (
    <>
      <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-1">
        {filters.map(({ label }, index) => (
          <button
            key={label}
            type="button"
            aria-pressed={index === active}
            onClick={() => setActive(index)}
            className="min-h-10 rounded-full px-4 text-muted-foreground outline-none transition-colors duration-200 ease-out hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-pressed:bg-foreground aria-pressed:text-background motion-reduce:transition-none"
          >
            {label}
          </button>
        ))}
      </div>
      <ul className="mt-6 grid gap-x-3 gap-y-12 md:grid-cols-2 md:gap-y-16">
        {filters[active].items.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </>
  );
}
