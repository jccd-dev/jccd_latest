import { ActionLink } from "@/components/action-link";
import {
  CursorBadge,
  Parallax,
  Reveal,
  TextReveal,
} from "@/components/project-motion";
import {
  clientWork,
  getProjectTechnologies,
  personalWork,
  type Project,
} from "@/lib/data/projects";
import {
  Boxes,
  CalendarDays,
  ChartColumn,
  HandCoins,
  LayoutTemplate,
  Layers,
  PawPrint,
  Scissors,
  ShieldCheck,
  Shirt,
  Sparkles,
  Stethoscope,
  Users,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background";

// The four features each bento shows, picked so sibling products read differently.
const featureIcons: Record<string, Record<string, LucideIcon>> = {
  "eagles-nexus": {
    "Member management": Users,
    "Roles and permissions": ShieldCheck,
    "Donations and subscriptions": HandCoins,
    "Dashboard and reports": ChartColumn,
  },
  critterhub: {
    "Appointment management": CalendarDays,
    "Grooming services management": Scissors,
    "Role-based access control": ShieldCheck,
    "Custom landing pages": LayoutTemplate,
  },
  vetdatalynx: {
    "Client and patient records": PawPrint,
    "Inventory management": Boxes,
    "Veterinarian tools": Stethoscope,
    "Reports and access control": ChartColumn,
  },
  aparador: {
    "Virtual wardrobe": Shirt,
    "AI virtual try-on": WandSparkles,
    "Outfit builder": Layers,
    "AI outfit suggestions": Sparkles,
  },
};

const ProjectBento = ({ project }: { project: Project }) => {
  const cover = project.screenshots[0];
  const href = `/projects/${project.slug}`;
  const icons = featureIcons[project.slug] ?? {};

  return (
    <article className="mt-16 first-of-type:mt-10 md:mt-24 md:first-of-type:mt-12">
      <TextReveal
        as="h4"
        text={[`${project.title}.`, project.tagline].filter(Boolean).join(" ")}
        highlight={`${project.title}.`}
        className="max-w-[26em] text-[clamp(1.625rem,3.2vw,2.25rem)] leading-[1.1] tracking-[-0.025em]"
      />
      <p className="mt-2 text-sm text-muted-foreground">
        {getProjectTechnologies(project)
          .slice(0, 4)
          .map((name) => `#${name.replaceAll(" ", "")}`)
          .join(" ")}
      </p>

      <div className="mt-6 grid gap-3 md:mt-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <Link
            href={href}
            aria-label={`View ${project.title} case study`}
            className={`group relative flex h-full flex-col rounded-tile bg-neutral-800 p-2.5 text-white transition-transform duration-150 ease-out active:scale-[0.99] motion-reduce:transition-none motion-reduce:active:transform-none ${focusRing}`}
            style={{ backgroundColor: project.tileColor }}
          >
            <div className="relative aspect-video flex-1 overflow-hidden rounded-lg">
              {cover && (
                <Parallax className="absolute inset-x-0 -inset-y-[7%]">
                  <Image
                    src={cover.src}
                    alt={cover.alt}
                    fill
                    sizes="(min-width: 1024px) 660px, 100vw"
                    className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.03]"
                  />
                </Parallax>
              )}
            </div>
            <div className="flex items-center justify-between gap-4 px-2 pb-1 pt-3.5">
              <p>{project.type}</p>
              <p className="shrink-0">{project.status}</p>
            </div>
            <CursorBadge label="View project" />
          </Link>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-5">
          <div className="flex h-full flex-col gap-6 rounded-tile bg-muted p-2.5">
            <div className="flex flex-1 items-center rounded-lg bg-background p-5 md:p-7">
              <p className="text-pretty text-lg leading-snug md:text-xl">
                {project.shortDescription}
              </p>
            </div>
            <div className="flex flex-col gap-5 px-2.5 pb-2.5">
              <dl className="grid gap-3 leading-snug">
                <div>
                  <dt className="text-sm text-muted-foreground">Role</dt>
                  <dd className="mt-0.5 text-pretty">{project.role.title}</dd>
                </div>
                {project.audience && (
                  <div>
                    <dt className="text-sm text-muted-foreground">Built for</dt>
                    <dd className="mt-0.5 text-pretty">{project.audience}</dd>
                  </div>
                )}
              </dl>
              <div className="self-end">
                <ActionLink href={href}>
                  Learn more
                  <span className="sr-only"> about {project.title}</span>
                </ActionLink>
              </div>
            </div>
          </div>
        </Reveal>

        <ul className="grid grid-cols-2 gap-3 lg:col-span-12 lg:grid-cols-4">
          {project.features
            .filter(({ title }) => title in icons)
            .map(({ title, description }, index) => {
              const Icon = icons[title] ?? Sparkles;

              return (
                <li key={title}>
                  <Reveal delay={index * 0.06} className="h-full">
                    <div className="flex h-full flex-col gap-5 rounded-tile bg-muted p-4 sm:p-5 lg:gap-10">
                      <Icon
                        aria-hidden="true"
                        className="size-7"
                        strokeWidth={1.25}
                      />
                      <div>
                        <h5 className="leading-snug">{title}</h5>
                        <p className="mt-1.5 hidden text-pretty leading-snug text-muted-foreground sm:block">
                          {description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
        </ul>
      </div>
    </article>
  );
};

const groups: {
  id: string;
  title: string;
  description: string;
  items: readonly Project[];
  action?: ReactNode;
}[] = [
  {
    id: "client-work",
    title: "Client work",
    description:
      "Systems built for clients, from first release through deployment and ongoing support.",
    items: clientWork,
  },
  {
    id: "personal-work",
    title: "Personal projects",
    description: "Products I design, build, and run myself.",
    items: personalWork,
    action: (
      <ActionLink href="https://github.com/jccd-dev" external>
        GitHub
      </ActionLink>
    ),
  },
];

const Projects = () => (
  <section id="projects" className="page-container pb-28 pt-8 md:pb-40">
    <TextReveal
      as="h2"
      text="Selected work"
      className="text-[clamp(2.75rem,7vw,5.5rem)] leading-none tracking-[-0.035em]"
    />

    {groups.map(({ id, title, description, items, action }) => (
      <section
        key={id}
        aria-labelledby={id}
        className="mt-16 first-of-type:mt-10 md:mt-28 md:first-of-type:mt-14"
      >
        <Reveal>
          <div className="grid gap-5 rounded-tile bg-muted p-6 md:grid-cols-12 md:items-end md:p-7">
            <h3
              id={id}
              className="scroll-mt-28 text-3xl leading-none tracking-[-0.03em] md:col-span-5 md:text-4xl"
            >
              {title}
            </h3>
            <p className="max-w-sm text-pretty leading-snug text-muted-foreground md:col-span-4">
              {description}
            </p>
            <div className="md:col-span-3 md:justify-self-end">{action}</div>
          </div>
        </Reveal>
        {items.map((project) => (
          <ProjectBento key={project.slug} project={project} />
        ))}
      </section>
    ))}
  </section>
);

export default Projects;
