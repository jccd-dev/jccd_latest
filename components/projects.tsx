"use client";

import { projects, type Project } from "@/lib/data/projects";
import { projectDetails } from "@/lib/data/projectDetails";
import { CornerDownRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const ProjectDossier = ({ project, index }: { project: Project; index: number }) => {
  const reduceMotion = useReducedMotion();
  const href = `/projects/${project.slug}`;
  const images = projectDetails.find(({ slug }) => slug === project.slug)?.images ?? [project.image];
  const marqueeImages = Array.from(
    { length: Math.max(3, images.length) },
    (_, imageIndex) => images[imageIndex % images.length],
  );

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
      className="overflow-hidden rounded-lg border border-border bg-foreground/[0.015] dark:bg-accent/10"
    >
      <div className="grid min-h-72 gap-10 p-6 md:grid-cols-12 md:p-10 lg:min-h-80 lg:p-12">
        <div className="md:col-span-7">
          <h3 className="text-3xl font-medium leading-none tracking-[-0.045em] sm:text-4xl">
            <Link
              href={href}
              className="rounded-xs outline-none transition-opacity hover:opacity-65 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              {project.title}
            </Link>
          </h3>

          <ul aria-label="Technologies" className="mt-7 flex max-w-2xl flex-wrap gap-2">
            {project.technologies.slice(0, 5).map((technology) => (
              <li
                key={technology}
                className="rounded-xs bg-muted px-3 py-1.5 font-pp-neue-montreal text-sm text-muted-foreground"
              >
                {technology}
              </li>
            ))}
          </ul>

          <p className="mt-7 max-w-xl font-pp-neue-montreal text-base leading-6 text-foreground/85 sm:text-lg sm:leading-7">
            {project.description}
          </p>
        </div>

        <div className="md:col-span-5 md:flex md:justify-end">
          <Link
            href={href}
            className="inline-flex min-h-12 items-center gap-2 self-start rounded-xs bg-foreground px-5 text-sm font-medium text-background outline-none transition-transform duration-150 ease-out active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background motion-reduce:transition-none motion-reduce:active:transform-none"
          >
            <CornerDownRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
            View Case Study
          </Link>
        </div>
      </div>

      <Link
        href={href}
        aria-label={`View ${project.title} case study`}
        className="project-marquee block overflow-hidden p-2 pt-0 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
      >
        <div
          className="project-marquee-track"
          style={{ animationDuration: `${marqueeImages.length * 8}s` }}
        >
          {[false, true].map((duplicate) => (
            <div
              key={duplicate ? "duplicate" : "original"}
              className="project-marquee-group"
              aria-hidden={duplicate || undefined}
            >
              {marqueeImages.map((image, imageIndex) => (
                <div
                  key={`${image}-${imageIndex}`}
                  className="group relative aspect-[4/3] w-[clamp(18rem,38vw,34rem)] shrink-0 overflow-hidden rounded-xs bg-muted"
                >
                  <Image
                    src={image}
                    alt={duplicate ? "" : `${project.title} interface view ${imageIndex + 1}`}
                    fill
                    sizes="(min-width: 768px) 38vw, 18rem"
                    className="object-cover object-top transition-transform duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.02]"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </Link>
    </motion.article>
  );
};

const Projects = () => {
  const reduceMotion = useReducedMotion();

  return (
  <section id="projects" className="w-full py-32 md:py-48">
    <div className="container mx-auto px-4 lg:px-6">
      <motion.header
        className="mb-14 max-w-2xl md:mb-20"
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-4xl font-medium leading-none tracking-[-0.045em] sm:text-5xl">
          Selected work
        </h2>
        <motion.p
          className="mt-5 max-w-xl font-pp-neue-montreal text-base leading-6 text-muted-foreground sm:text-lg"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Full-stack products built for real operations, from veterinary care to AI-assisted communication.
        </motion.p>
      </motion.header>

      <div className="grid gap-6 md:gap-8">
        {projects.map((project, index) => (
          <ProjectDossier key={project.slug} project={project} index={index} />
        ))}
      </div>
    </div>
  </section>
  );
};

export default Projects;
