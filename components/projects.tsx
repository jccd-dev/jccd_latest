"use client";

import { projects, type Project } from "@/lib/data/projects";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const ProjectDossier = ({ project, index }: { project: Project; index: number }) => {
  const reduceMotion = useReducedMotion();
  const href = `/projects/${project.slug}`;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, transform: "translateY(24px)" }}
      whileInView={{ opacity: 1, transform: "translateY(0)" }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: 0.6,
        delay: reduceMotion ? 0 : index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="overflow-hidden rounded-sm border border-border bg-foreground/[0.015] dark:bg-accent/10"
    >
      <div className="grid gap-10 p-6 md:grid-cols-12 md:p-10 lg:p-12">
        <div className="md:col-span-5">
          <h3 className="text-3xl font-medium leading-none tracking-[-0.045em] sm:text-4xl">
            <Link
              href={href}
              className="rounded-xs outline-none transition-opacity hover:opacity-65 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              {project.title}
            </Link>
          </h3>
          <p className="mt-4 max-w-md font-pp-neue-montreal text-base leading-6 text-muted-foreground">
            {project.description}
          </p>
        </div>

        <div className="md:col-span-5 md:col-start-8">
          <dl className="grid gap-6 font-pp-neue-montreal text-sm sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            <div>
              <dt className="text-muted-foreground">Role</dt>
              <dd className="mt-1 text-foreground">Full-stack development</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Built with</dt>
              <dd className="mt-1 text-foreground">
                {project.technologies.slice(0, 5).join(", ")}
              </dd>
            </div>
          </dl>

          <Link
            href={href}
            className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-xs text-sm font-medium underline decoration-border underline-offset-8 outline-none transition-[opacity,transform] duration-150 hover:opacity-65 active:translate-y-px focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            View case study
            <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
          </Link>
        </div>
      </div>

      <div className="grid gap-2 p-2 pt-0 md:grid-cols-[2fr_1fr_1fr]">
        <Link
          href={href}
          className="group relative block aspect-[16/10] overflow-hidden rounded-xs bg-muted outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:aspect-[16/9]"
        >
          <Image
            src={project.image}
            alt={`${project.title} interface overview`}
            fill
            sizes="(min-width: 768px) 66vw, 100vw"
            className="object-cover object-top transition-transform duration-700 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none [@media(hover:hover)]:group-hover:scale-[1.02]"
          />
        </Link>

        <div className="relative hidden overflow-hidden rounded-xs bg-muted md:block">
          <Image
            src={project.image}
            alt=""
            fill
            sizes="17vw"
            className="scale-[1.65] object-cover object-left"
          />
        </div>

        <div className="relative hidden overflow-hidden rounded-xs bg-muted md:block">
          <Image
            src={project.image}
            alt=""
            fill
            sizes="17vw"
            className="scale-[1.65] object-cover object-right"
          />
        </div>
      </div>
    </motion.article>
  );
};

const Projects = () => (
  <section id="projects" className="w-full py-32 md:py-48">
    <div className="container mx-auto px-4 lg:px-6">
      <header className="mb-14 max-w-2xl md:mb-20">
        <h2 className="text-4xl font-medium leading-none tracking-[-0.045em] sm:text-5xl">
          Selected work
        </h2>
        <p className="mt-5 max-w-xl font-pp-neue-montreal text-base leading-6 text-muted-foreground sm:text-lg">
          Full-stack products built for real operations, from veterinary care to AI-assisted communication.
        </p>
      </header>

      <div className="grid gap-6 md:gap-8">
        {projects.map((project, index) => (
          <ProjectDossier key={project.slug} project={project} index={index} />
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
