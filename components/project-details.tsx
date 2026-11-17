import { ArrowLeft, ArrowUpRight, CornerDownRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { ChapterNavigation } from "@/components/project-chapters";
import { ProjectGallery } from "@/components/project-gallery";
import { ProjectStatement, Reveal } from "@/components/project-motion";
import {
  getNextProject,
  type Project,
  type ProjectText,
} from "@/lib/data/projects";

const bodyClass = "text-lg leading-[1.4] text-foreground/80";

function TextContent({
  content,
  statement = false,
  highlight = false,
}: {
  content: ProjectText;
  statement?: boolean;
  highlight?: boolean;
}) {
  const paragraphs = typeof content === "string" ? [content] : content;

  return (
    <div className="space-y-5">
      {paragraphs.map((paragraph, index) => {
        if (index > 0 || (!statement && !highlight)) {
          return (
            <p key={paragraph} className={`max-w-[65ch] ${bodyClass}`}>
              {paragraph}
            </p>
          );
        }
        if (statement) {
          return <ProjectStatement key={paragraph} text={paragraph} />;
        }
        return (
          <p
            key={paragraph}
            className="text-pretty rounded-tile bg-muted p-6 text-xl leading-[1.25] tracking-[-0.01em] sm:p-8 sm:text-2xl"
          >
            {paragraph}
          </p>
        );
      })}
    </div>
  );
}

function DetailRows({
  rows,
}: {
  rows: readonly { label: string; content: ReactNode }[];
}) {
  return (
    <dl className="border-b border-border">
      {rows.map(({ label, content }) => (
        <div
          key={label}
          className="grid gap-2 border-t border-border py-5 sm:grid-cols-5 sm:gap-8"
        >
          <dt className="text-lg leading-6 tracking-[-0.01em] sm:col-span-2">
            {label}
          </dt>
          <dd className="leading-snug text-foreground/80 sm:col-span-3">
            {content}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Responsibilities({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-6 border-b border-border sm:columns-2 sm:gap-8">
      {items.map((item) => (
        <li
          key={item}
          className="break-inside-avoid border-t border-border py-3 leading-snug"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function ProjectHeader({ project }: { project: Project }) {
  const { live, source } = project.links ?? {};
  const facts = [
    { label: "Role", value: project.role.title },
    { label: "Project", value: project.type },
    { label: "Status", value: project.status },
    { label: "Year", value: project.year },
  ].filter(({ value }) => value);
  const links = [
    { label: "Live site", href: live },
    { label: "Source", href: source },
  ].filter(({ href }) => href);

  return (
    <header className="pb-8 pt-6 sm:pb-10 sm:pt-8">
      <h1 className="wrap-break-word text-[clamp(3rem,8vw,5.5rem)] leading-none tracking-[-0.035em]">
        {project.title}
      </h1>
      <p className="mt-5 max-w-2xl text-pretty text-lg leading-snug sm:text-xl">
        {project.shortDescription}
      </p>
      <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-border py-5 sm:mt-10 sm:grid-flow-col sm:auto-cols-fr sm:grid-cols-none sm:gap-0 sm:divide-x sm:divide-border">
        {facts.map(({ label, value }) => (
          <div
            key={label}
            className={`sm:px-5 sm:first:pl-0 ${label === "Role" ? "col-span-2 sm:col-span-1" : ""}`}
          >
            <dt className="text-sm text-muted-foreground">{label}</dt>
            <dd className="mt-1 leading-5">{value}</dd>
          </div>
        ))}
        {links.length > 0 && (
          <div className="sm:px-5">
            <dt className="text-sm text-muted-foreground">Project link</dt>
            {links.map(({ label, href }) => (
              <dd key={label} className="mt-1 leading-5">
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-xs outline-none transition-opacity duration-150 hover:opacity-65 focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {label}
                  <span className="sr-only"> (opens in a new tab)</span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4"
                    strokeWidth={1.75}
                  />
                </a>
              </dd>
            ))}
          </div>
        )}
      </dl>
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
      content: <TextContent content={project.problem} highlight />,
    },
    {
      id: "responsibility",
      title: "Responsibility",
      content: <Responsibilities items={project.role.responsibilities} />,
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
            <div className={additionalScreenshots.length ? "mt-10" : ""}>
              <DetailRows
                rows={project.features.map(({ title, description }) => ({
                  label: title,
                  content: description,
                }))}
              />
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
        <DetailRows
          rows={project.techStack.map(({ category, technologies }) => ({
            label: category,
            content: technologies.join(" / "),
          }))}
        />
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
            <p className={`mt-5 ${bodyClass}`}>
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
        <DetailRows
          rows={project.challenges.map(({ title, challenge, solution }) => ({
            label: title,
            content: (
              <>
                {challenge}
                {solution && (
                  <span className="mt-2 block text-foreground">{solution}</span>
                )}
              </>
            ),
          }))}
        />
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
    <article className="min-h-dvh">
      <div className="page-container pb-20 pt-24 md:pt-28">
        <Link
          href="/#projects"
          className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground outline-none transition-colors duration-150 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={1.75} />
          Back to projects
        </Link>
        <ProjectHeader project={project} />
        {primaryScreenshot && (
          <figure className="relative aspect-video w-full overflow-hidden rounded-tile bg-muted">
            <Image
              src={primaryScreenshot.src}
              alt={primaryScreenshot.alt}
              fill
              priority
              sizes="(min-width: 1440px) 1392px, calc(100vw - 2rem)"
              className="object-cover"
            />
          </figure>
        )}

        <div className="relative mt-10 lg:mt-20 lg:grid lg:grid-cols-[12rem_minmax(0,1fr)] lg:items-start lg:gap-16">
          <ChapterNavigation
            key={project.slug}
            chapters={chapters.map(({ id, title }) => ({ id, title }))}
          />
          <div className="mt-10 min-w-0 lg:mt-0">
            {chapters.map(({ id, title, content }) => (
              <section
                key={id}
                id={id}
                aria-labelledby={`${id}-title`}
                className="scroll-mt-28 pb-14 sm:pb-20"
              >
                <h2
                  id={`${id}-title`}
                  className="mb-6 text-3xl leading-[1.05] tracking-[-0.03em] sm:mb-7 sm:text-4xl"
                >
                  {title}
                </h2>
                {content}
              </section>
            ))}
          </div>
        </div>

        {nextProject && (
          <footer className="border-t border-border pt-8">
            <Reveal>
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group grid items-end gap-4 outline-none focus-visible:ring-2 focus-visible:ring-ring sm:grid-cols-[1fr_auto]"
              >
                <span>
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CornerDownRight aria-hidden="true" className="size-4" />
                    Next project
                  </span>
                  <span className="mt-3 block wrap-break-word text-[clamp(2.5rem,6vw,4.5rem)] leading-none tracking-[-0.035em]">
                    {nextProject.title}
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-10 sm:size-14 motion-safe:transition-transform motion-safe:duration-200 [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-1 [@media(hover:hover)_and_(pointer:fine)]:group-hover:-translate-y-1 motion-reduce:transform-none"
                  strokeWidth={1}
                />
              </Link>
            </Reveal>
          </footer>
        )}
      </div>
    </article>
  );
}
