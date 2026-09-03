import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  getNextProject,
  type Project,
  type ProjectText,
} from "@/lib/data/projects";

function TextContent({
  content,
  className = "space-y-5 font-pp-neue-montreal text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8",
}: {
  content: ProjectText;
  className?: string;
}) {
  const paragraphs = typeof content === "string" ? [content] : content;

  return (
    <div className={className}>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-border py-16 sm:py-20">
      <h2 className="mb-8 text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
        {title}
      </h2>
      {children}
    </section>
  );
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex min-h-12 items-center gap-2 rounded-xs border border-border px-5 text-sm font-medium outline-none transition-[background-color,color,transform] duration-150 hover:bg-foreground hover:text-background active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background motion-reduce:transition-none motion-reduce:active:transform-none"
    >
      {children}
      <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
    </a>
  );
}

function hasDeploymentContent(project: Project) {
  const deployment = project.deployment;
  return Boolean(
    deployment?.description ||
    deployment?.technologies?.length ||
    deployment?.responsibilities?.length,
  );
}

function hasPostLaunchContent(project: Project) {
  const postLaunch = project.postLaunch;
  return Boolean(postLaunch?.description || postLaunch?.responsibilities?.length);
}

function ProjectHeader({ project }: { project: Project }) {
  return (
    <header className="pb-14 pt-14 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24">
      <div className="grid items-end gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-8">
          {project.type && (
            <p className="mb-5 font-pp-neue-montreal text-sm text-muted-foreground">
              {project.type}
            </p>
          )}
          <h1 className="max-w-5xl text-5xl font-medium leading-[0.95] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
            {project.title}
          </h1>
          <p className="mt-7 max-w-2xl font-pp-neue-montreal text-xl leading-8 text-foreground/80 sm:text-2xl sm:leading-9">
            {project.shortDescription}
          </p>
        </div>

        <div className="border-t border-border pt-7 lg:col-span-4">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-7 font-pp-neue-montreal text-sm">
            <div>
              <dt className="text-muted-foreground">Role</dt>
              <dd className="mt-2 leading-5 text-foreground">{project.role.title}</dd>
            </div>
            {project.status && (
              <div>
                <dt className="text-muted-foreground">Status</dt>
                <dd className="mt-2 text-foreground">{project.status}</dd>
              </div>
            )}
            {project.year && (
              <div>
                <dt className="text-muted-foreground">Year</dt>
                <dd className="mt-2 text-foreground">{project.year}</dd>
              </div>
            )}
          </dl>

          {(project.links?.live || project.links?.source) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.live && (
                <ExternalLink href={project.links.live}>Live site</ExternalLink>
              )}
              {project.links.source && (
                <ExternalLink href={project.links.source}>Source</ExternalLink>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function PrimaryScreenshot({ project }: { project: Project }) {
  const screenshot = project.screenshots[0];

  return (
    <figure>
      <div className="relative aspect-[4/3] overflow-hidden rounded-xs border border-border bg-muted sm:aspect-video">
        <Image
          src={screenshot.src}
          alt={screenshot.alt}
          fill
          priority
          sizes="(min-width: 1440px) 1340px, calc(100vw - 2rem)"
          className="object-cover object-top"
        />
      </div>
      {(screenshot.title || screenshot.description) && (
        <figcaption className="mt-4 grid gap-1 font-pp-neue-montreal text-sm text-muted-foreground sm:grid-cols-2 sm:gap-8">
          {screenshot.title && <span className="text-foreground/80">{screenshot.title}</span>}
          {screenshot.description && <span>{screenshot.description}</span>}
        </figcaption>
      )}
    </figure>
  );
}

function ChapterNavigation({ project }: { project: Project }) {
  return (
    <aside className="hidden lg:col-span-3 lg:block">
      <nav aria-label="Case study chapters" className="sticky top-28">
        <ul className="space-y-3 font-pp-neue-montreal text-sm text-muted-foreground">
          <li><a className="transition-colors hover:text-foreground" href="#overview">Overview</a></li>
          <li><a className="transition-colors hover:text-foreground" href="#problem">Problem</a></li>
          <li><a className="transition-colors hover:text-foreground" href="#responsibility">Responsibility</a></li>
          <li><a className="transition-colors hover:text-foreground" href="#solution">Solution</a></li>
          <li><a className="transition-colors hover:text-foreground" href="#product">Product</a></li>
          <li><a className="transition-colors hover:text-foreground" href="#engineering">Engineering</a></li>
          {hasDeploymentContent(project) && <li><a className="transition-colors hover:text-foreground" href="#deployment">Deployment</a></li>}
          {hasPostLaunchContent(project) && <li><a className="transition-colors hover:text-foreground" href="#post-launch">Post-launch</a></li>}
          {Boolean(project.challenges?.length) && <li><a className="transition-colors hover:text-foreground" href="#challenges">Challenges</a></li>}
          <li><a className="transition-colors hover:text-foreground" href="#outcome">Outcome</a></li>
          {project.learnings && <li><a className="transition-colors hover:text-foreground" href="#learnings">Learnings</a></li>}
        </ul>
      </nav>
    </aside>
  );
}

function AdditionalScreenshots({ project }: { project: Project }) {
  const screenshots = project.screenshots.slice(1);
  if (screenshots.length === 0) return null;

  return (
    <div className="mt-14 space-y-12">
      {screenshots.map((screenshot) => (
        <figure key={screenshot.src}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xs border border-border bg-muted sm:aspect-video">
            <Image
              src={screenshot.src}
              alt={screenshot.alt}
              fill
              sizes="(min-width: 1024px) 760px, calc(100vw - 2rem)"
              className="object-cover object-top"
            />
          </div>
          {(screenshot.title || screenshot.description) && (
            <figcaption className="mt-4 font-pp-neue-montreal text-sm leading-6 text-muted-foreground">
              {screenshot.title && <span className="mr-3 text-foreground/80">{screenshot.title}</span>}
              {screenshot.description}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

export function ProjectDetails({ project }: { project: Project }) {
  const nextProject = getNextProject(project.slug);

  return (
    <article className="min-h-[100dvh] bg-background text-foreground">
      <div className="mx-auto max-w-[1400px] px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <Link
          href="/#projects"
          className="inline-flex min-h-11 items-center gap-2 rounded-xs font-pp-neue-montreal text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={1.75} />
          Back to projects
        </Link>

        <ProjectHeader project={project} />
        <PrimaryScreenshot project={project} />

        <div className="grid gap-12 pt-20 sm:pt-28 lg:grid-cols-12 lg:pt-36">
          <ChapterNavigation project={project} />

          <div className="lg:col-span-8 lg:col-start-5 xl:col-span-7">
            <Section id="overview" title="Overview">
              <TextContent content={project.overview} />
            </Section>

            <Section id="problem" title="Problem">
              <TextContent content={project.problem} />
            </Section>

            <Section id="responsibility" title="Responsibility">
              <p className="max-w-2xl font-pp-neue-montreal text-lg leading-8 text-foreground/85">
                {project.role.title}
              </p>
              <ul className="mt-8 grid gap-x-8 sm:grid-cols-2" aria-label="Project responsibilities">
                {project.role.responsibilities.map((responsibility) => (
                  <li key={responsibility} className="border-t border-border py-4 font-pp-neue-montreal text-sm text-foreground/80">
                    {responsibility}
                  </li>
                ))}
              </ul>
            </Section>

            <Section id="solution" title="Solution">
              <TextContent content={project.solution} />
            </Section>

            <Section id="product" title="Product">
              <div className="grid gap-x-10 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <article key={feature.title} className="border-t border-border py-6">
                    <h3 className="text-xl font-medium tracking-[-0.025em]">{feature.title}</h3>
                    <p className="mt-3 font-pp-neue-montreal text-sm leading-6 text-muted-foreground">
                      {feature.description}
                    </p>
                  </article>
                ))}
              </div>
              <AdditionalScreenshots project={project} />
            </Section>

            <Section id="engineering" title="Engineering">
              <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {project.techStack.map((group) => (
                  <div key={group.category} className="border-t border-border pt-5">
                    <h3 className="text-base font-medium">{group.category}</h3>
                    <p className="mt-3 font-pp-neue-montreal text-sm leading-6 text-muted-foreground">
                      {group.technologies.join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            {project.deployment && hasDeploymentContent(project) && (
              <Section id="deployment" title="Deployment">
                {project.deployment.description && <TextContent content={project.deployment.description} />}
                {project.deployment.technologies && project.deployment.technologies.length > 0 && (
                  <p className="mt-8 font-pp-neue-montreal text-sm leading-6 text-muted-foreground">
                    {project.deployment.technologies.join(", ")}
                  </p>
                )}
                {project.deployment.responsibilities && project.deployment.responsibilities.length > 0 && (
                  <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
                    {project.deployment.responsibilities.map((responsibility) => (
                      <li key={responsibility} className="border-t border-border py-4 font-pp-neue-montreal text-sm text-foreground/80">
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                )}
              </Section>
            )}

            {project.postLaunch && hasPostLaunchContent(project) && (
              <Section id="post-launch" title="Post-launch">
                {project.postLaunch.description && <TextContent content={project.postLaunch.description} />}
                {project.postLaunch.responsibilities && project.postLaunch.responsibilities.length > 0 && (
                  <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
                    {project.postLaunch.responsibilities.map((responsibility) => (
                      <li key={responsibility} className="border-t border-border py-4 font-pp-neue-montreal text-sm text-foreground/80">
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                )}
              </Section>
            )}

            {project.challenges && project.challenges.length > 0 && (
              <Section id="challenges" title="Engineering challenges">
                <div className="space-y-10">
                  {project.challenges.map((item) => (
                    <article key={item.title}>
                      <h3 className="text-xl font-medium">{item.title}</h3>
                      <p className="mt-4 font-pp-neue-montreal leading-7 text-muted-foreground">{item.challenge}</p>
                      {item.solution && <p className="mt-3 font-pp-neue-montreal leading-7 text-foreground/80">{item.solution}</p>}
                    </article>
                  ))}
                </div>
              </Section>
            )}

            <Section id="outcome" title="Outcome">
              <TextContent
                content={project.outcome}
                className="space-y-5 font-pp-neue-montreal text-2xl font-medium leading-9 tracking-[-0.03em] text-foreground/90 sm:text-4xl sm:leading-[1.2]"
              />
            </Section>

            {project.learnings && (
              <Section id="learnings" title="What I learned">
                <TextContent content={project.learnings} />
              </Section>
            )}
          </div>
        </div>

        {nextProject && (
          <footer className="mt-16 border-t border-border pt-10 sm:mt-24">
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex min-h-20 items-end justify-between gap-8 rounded-xs outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              <span>
                <span className="block font-pp-neue-montreal text-sm text-muted-foreground">Next project</span>
                <span className="mt-2 block text-3xl font-medium tracking-[-0.04em] sm:text-5xl">{nextProject.title}</span>
              </span>
              <ArrowUpRight aria-hidden="true" className="mb-2 size-7 shrink-0 transition-transform duration-150 [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-1 [@media(hover:hover)_and_(pointer:fine)]:group-hover:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover:transform-none" strokeWidth={1.5} />
            </Link>
          </footer>
        )}
      </div>
    </article>
  );
}
