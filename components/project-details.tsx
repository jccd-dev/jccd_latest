import { ArrowLeft, ArrowUpRight, CornerDownRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { ChapterNavigation } from "@/components/project-chapters";
import { ProjectGallery } from "@/components/project-gallery";
import { ProjectReveal, ProjectStatement } from "@/components/project-motion";
import {
  getNextProject,
  type Project,
  type ProjectText,
} from "@/lib/data/projects";

function TextContent({
  content,
  statement = false,
}: {
  content: ProjectText;
  statement?: boolean;
}) {
  const paragraphs = typeof content === "string" ? [content] : content;

  return (
    <div className="space-y-6">
      {paragraphs.map((paragraph, index) =>
        statement && index === 0 ? (
          <ProjectStatement key={paragraph} text={paragraph} />
        ) : (
          <p
            key={paragraph}
            className="max-w-3xl font-pp-neue-montreal text-lg leading-[1.05] tracking-[-0.015em] text-muted-foreground sm:text-xl"
          >
            {paragraph}
          </p>
        ),
      )}
    </div>
  );
}

function Responsibilities({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-7 grid gap-x-10 gap-y-3 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 font-pp-neue-montreal text-base leading-5 text-muted-foreground"
        >
          <CornerDownRight
            aria-hidden="true"
            className="mt-1 size-4 shrink-0 text-foreground"
            strokeWidth={1.5}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-xs bg-foreground px-5 text-sm font-medium text-background outline-none hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background motion-safe:transition-transform motion-safe:duration-150 motion-safe:active:scale-[0.98]"
    >
      {children}
      <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
    </a>
  );
}

function ProjectHeader({ project }: { project: Project }) {
  return (
    <header className="pb-10 pt-8 sm:pb-14 sm:pt-12">
      <ProjectReveal>
        <h1 className="max-w-6xl wrap-break-words text-[clamp(3rem,9vw,9rem)] font-medium leading-[1.05] tracking-[-0.065em]">
          {project.title}
        </h1>
        <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="max-w-2xl text-pretty font-pp-neue-montreal text-xl leading-[1.2] tracking-tight text-foreground/85 sm:text-2xl">
              {project.shortDescription}
            </p>
            {(project.links?.live || project.links?.source) && (
              <div className="mt-7 flex flex-wrap gap-3">
                {project.links.live && (
                  <ExternalLink href={project.links.live}>
                    Live site
                  </ExternalLink>
                )}
                {project.links.source && (
                  <ExternalLink href={project.links.source}>
                    Source
                  </ExternalLink>
                )}
              </div>
            )}
          </div>
          <dl className="grid grid-cols-2 content-start gap-x-6 gap-y-5 border-t border-border pt-5 font-pp-neue-montreal text-sm lg:col-span-4 lg:col-start-9">
            <div className="col-span-2">
              <dt className="text-muted-foreground">Role</dt>
              <dd className="mt-1 leading-5">{project.role.title}</dd>
            </div>
            {project.type && (
              <div>
                <dt className="text-muted-foreground">Project</dt>
                <dd className="mt-1 leading-5">{project.type}</dd>
              </div>
            )}
            {project.status && (
              <div>
                <dt className="text-muted-foreground">Status</dt>
                <dd className="mt-1">{project.status}</dd>
              </div>
            )}
            {project.year && (
              <div>
                <dt className="text-muted-foreground">Year</dt>
                <dd className="mt-1">{project.year}</dd>
              </div>
            )}
          </dl>
        </div>
      </ProjectReveal>
    </header>
  );
}

export function ProjectDetails({ project }: { project: Project }) {
  const nextProject = getNextProject(project.slug);
  const primaryScreenshot = project.screenshots[0];
  const additionalScreenshots = project.screenshots.slice(1);
  const { deployment, postLaunch } = project;
  const chapters: { id: string; title: string; content: ReactNode }[] = [
    {
      id: "overview",
      title: "Overview",
      content: <TextContent content={project.overview} statement />,
    },
    {
      id: "problem",
      title: "Problem",
      content: <TextContent content={project.problem} />,
    },
    {
      id: "responsibility",
      title: "Responsibility",
      content: (
        <>
          <p className="max-w-3xl text-2xl leading-[1.2] tracking-tight sm:text-3xl">
            {project.role.title}
          </p>
          <Responsibilities items={project.role.responsibilities} />
        </>
      ),
    },
    {
      id: "solution",
      title: "Solution",
      content: <TextContent content={project.solution} />,
    },
  ];

  if (project.features.length || additionalScreenshots.length) {
    chapters.push({
      id: "product",
      title: "Product",
      content: (
        <>
          {additionalScreenshots.length > 0 && (
            <ProjectGallery
              key={project.slug}
              screenshots={additionalScreenshots}
            />
          )}
          {project.features.length > 0 && (
            <div
              className={`grid gap-x-10 gap-y-8 sm:grid-cols-2 ${additionalScreenshots.length ? "mt-12" : ""}`}
            >
              {project.features.map((feature) => (
                <article key={feature.title}>
                  <h3 className="text-xl font-medium tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="mt-3 max-w-md font-pp-neue-montreal text-base leading-5 text-muted-foreground">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          )}
        </>
      ),
    });
  }
  if (project.techStack.length) {
    chapters.push({
      id: "engineering",
      title: "Engineering",
      content: (
        <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {project.techStack.map((group) => (
            <div key={group.category}>
              <dt className="text-sm text-muted-foreground">
                {group.category}
              </dt>
              <dd className="mt-3 text-xl leading-[1.2] tracking-tight sm:text-2xl">
                {group.technologies.join(" / ")}
              </dd>
            </div>
          ))}
        </dl>
      ),
    });
  }
  if (
    deployment &&
    (deployment.description ||
      deployment.technologies?.length ||
      deployment.responsibilities?.length)
  ) {
    chapters.push({
      id: "deployment",
      title: "Deployment",
      content: (
        <>
          {deployment.description && (
            <TextContent content={deployment.description} />
          )}
          {Boolean(deployment.technologies?.length) && (
            <p className="mt-6 text-lg tracking-tight">
              {deployment.technologies?.join(" / ")}
            </p>
          )}
          {Boolean(deployment.responsibilities?.length) && (
            <Responsibilities items={deployment.responsibilities ?? []} />
          )}
        </>
      ),
    });
  }
  if (
    postLaunch &&
    (postLaunch.description || postLaunch.responsibilities?.length)
  ) {
    chapters.push({
      id: "post-launch",
      title: "Post-launch",
      content: (
        <>
          {postLaunch.description && (
            <TextContent content={postLaunch.description} />
          )}
          {Boolean(postLaunch.responsibilities?.length) && (
            <Responsibilities items={postLaunch.responsibilities ?? []} />
          )}
        </>
      ),
    });
  }
  if (project.challenges?.length) {
    chapters.push({
      id: "challenges",
      title: "Challenges",
      content: (
        <div className="space-y-8">
          {project.challenges.map((item) => (
            <article key={item.title}>
              <h3 className="text-2xl tracking-tight">{item.title}</h3>
              <p className="mt-4 font-pp-neue-montreal text-lg leading-[1.3] text-muted-foreground">
                {item.challenge}
              </p>
              {item.solution && (
                <p className="mt-3 font-pp-neue-montreal text-lg leading-[1.3]">
                  {item.solution}
                </p>
              )}
            </article>
          ))}
        </div>
      ),
    });
  }
  chapters.push({
    id: "outcome",
    title: "Outcome",
    content: <TextContent content={project.outcome} statement />,
  });
  if (project.learnings) {
    chapters.push({
      id: "learnings",
      title: "Learnings",
      content: <TextContent content={project.learnings} />,
    });
  }

  return (
    <article className="min-h-dvh bg-background text-foreground">
      <div className="container mx-auto px-4 pb-20 pt-28 lg:px-6">
        <Link
          href="/#projects"
          className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={1.75} />
          Back to projects
        </Link>
        <ProjectHeader project={project} />
        {primaryScreenshot && (
          <ProjectReveal>
            <figure className="relative aspect-4/3 max-h-[75dvh] w-full overflow-hidden rounded-sm bg-muted sm:aspect-video">
              <Image
                src={primaryScreenshot.src}
                alt={primaryScreenshot.alt}
                fill
                priority
                sizes="(min-width: 1440px) 1340px, calc(100vw - 2rem)"
                className="object-contain"
              />
            </figure>
          </ProjectReveal>
        )}

        <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-[minmax(10rem,1fr)_minmax(0,4fr)] lg:items-start lg:gap-16">
          <ChapterNavigation
            key={project.slug}
            chapters={chapters.map(({ id, title }) => ({ id, title }))}
          />
          <div className="mt-8 min-w-0 lg:mt-0">
            {chapters.map(({ id, title, content }) => (
              <section
                key={id}
                id={id}
                aria-labelledby={`${id}-title`}
                className="scroll-mt-40 border-t border-border pb-14 pt-7 sm:pb-20 sm:pt-8 lg:scroll-mt-28"
              >
                <h2
                  id={`${id}-title`}
                  className="mb-7 text-3xl font-medium leading-[1.05] tracking-[-0.045em] sm:mb-9 sm:text-4xl"
                >
                  {title}
                </h2>
                {content}
              </section>
            ))}
          </div>
        </div>

        {nextProject && (
          <footer className="mt-8 border-t border-border pt-10 sm:mt-12">
            <ProjectReveal>
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group grid items-end gap-6 outline-none focus-visible:ring-2 focus-visible:ring-ring sm:grid-cols-[1fr_auto]"
              >
                <span>
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CornerDownRight aria-hidden="true" className="size-4" />
                    Next project
                  </span>
                  <span className="mt-4 block break-words text-[clamp(2.5rem,7vw,7rem)] font-medium leading-[1.05] tracking-[-0.06em]">
                    {nextProject.title}
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-10 sm:size-16 motion-safe:transition-transform motion-safe:duration-200 [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-1 [@media(hover:hover)_and_(pointer:fine)]:group-hover:-translate-y-1 motion-reduce:transform-none"
                  strokeWidth={1}
                />
              </Link>
            </ProjectReveal>
          </footer>
        )}
      </div>
    </article>
  );
}
