import { CursorBadge, Parallax } from "@/components/project-motion";
import type { Project } from "@/lib/data/projects";
import Image from "next/image";
import Link from "next/link";

export const workHeadingClass =
  "text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.03em]";

// `featured` is the full-width landing card: wider cover, parallax, and the status column.
export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const cover = project.screenshots[0];
  const image = cover && (
    <Image
      src={cover.src}
      alt=""
      fill
      sizes={
        featured
          ? "(min-width: 1440px) 1392px, 100vw"
          : "(min-width: 768px) 50vw, 100vw"
      }
      className="object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.03]"
    />
  );

  return (
    <article>
      <Link
        href={`/projects/${project.slug}`}
        className="group block rounded-tile outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        <div
          className={`relative overflow-hidden rounded-tile bg-muted ${featured ? "aspect-video md:aspect-2/1" : "aspect-16/10"}`}
          style={{ backgroundColor: project.tileColor }}
        >
          {featured ? (
            <Parallax className="absolute inset-x-0 -inset-y-[7%]">
              {image}
            </Parallax>
          ) : (
            image
          )}
          <CursorBadge label="View project" />
        </div>
        <div className="mt-4 flex flex-col gap-5 md:flex-row md:justify-between md:gap-10">
          <div>
            <h3 className="text-lg font-medium">{project.title}</h3>
            <p className="mt-0.5 max-w-2xl text-pretty leading-snug text-muted-foreground">
              {project.tagline ?? project.shortDescription}
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {project.techStack[0]?.technologies.map((name) => (
                <li
                  key={name}
                  className="rounded-sm bg-muted px-2 py-1 text-sm leading-none text-muted-foreground"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
          {featured && project.status && (
            <p className="shrink-0 border-l border-border pl-4 md:w-64">
              <span className="block text-3xl leading-none tracking-[-0.03em] md:text-4xl">
                {project.status}
              </span>
              <span className="mt-3 block text-sm text-muted-foreground">
                {project.type}
              </span>
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}
